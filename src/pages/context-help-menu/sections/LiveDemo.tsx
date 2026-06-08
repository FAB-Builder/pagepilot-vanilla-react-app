import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp, ChevronLeft, X, HelpCircle, Loader2, AlertCircle, FileX } from 'lucide-react';
import { Section } from '../../../components/DocSection';
import { pagePilotApiBase } from '../../../lib/ahd';

const BRAND = '#4f46e5';
const BRAND_TINT = '#eef2ff';
const GREY_200 = '#e5e7eb';
const GREY_500 = '#6b7280';
const GREY_700 = '#374151';
const GREY_900 = '#111827';

const API_BASE = pagePilotApiBase('64d2b934c6cfdc96aa3734c5');
const MENU_API = `${API_BASE}/menu-by-name/fab-docs-site`;
const CACHE_KEY = 'pp_help_menu_fab_docs_site';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour — same as ahd-fe useStickyState

interface HelpItem {
  id: string;
  name: string;
  description?: string;
  href?: string;
  children: HelpItem[];
}

interface PageSection { id: string; content: string; }
interface PageContent { id?: string; name?: string; editor?: string; sections?: PageSection[]; }

function flattenItems(items: HelpItem[]): HelpItem[] {
  return items.flatMap((item) => [item, ...flattenItems(item.children ?? [])]);
}

function readCache(): HelpItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY); return null; }
    return data;
  } catch { return null; }
}

function writeCache(data: HelpItem[]) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch { /* ignore */ }
}

/* ── Recursive menu tree ── */
function MenuTree({
  items, activeId, expanded, onSelect, onToggle, depth = 0,
}: {
  items: HelpItem[];
  activeId: string;
  expanded: Set<string>;
  onSelect: (item: HelpItem) => void;
  onToggle: (id: string) => void;
  depth?: number;
}) {
  return (
    <>
      {items.map((item) => {
        const hasChildren = (item.children ?? []).length > 0;
        const isExpanded = expanded.has(item.id);
        const isActive = activeId === item.id;

        return (
          <div key={item.id}>
            {depth === 0 ? (
              <div style={{ borderBottom: `1px solid ${GREY_200}` }}>
                <div
                  onClick={() => onSelect(item)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px', cursor: 'pointer',
                    backgroundColor: isActive ? BRAND_TINT : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isActive ? BRAND_TINT : 'transparent'; }}
                >
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: isActive ? BRAND : GREY_700 }}>
                    {item.name}
                  </span>
                  {hasChildren && (
                    <span
                      onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}
                      style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </span>
                  )}
                </div>
                {hasChildren && isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10, backgroundColor: '#f9fafb', borderRadius: 8, margin: '0 8px 8px' }}>
                    <MenuTree items={item.children} activeId={activeId} expanded={expanded} onSelect={onSelect} onToggle={onToggle} depth={depth + 1} />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div
                  onClick={() => onSelect(item)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 6, cursor: 'pointer',
                    color: isActive ? BRAND : '#4b5563',
                    backgroundColor: isActive ? BRAND_TINT : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontWeight: isActive ? 500 : 400, fontSize: 13,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isActive ? BRAND_TINT : 'transparent'; }}
                >
                  <span style={{ flex: 1, fontSize: 13, color: isActive ? BRAND : '#4b5563' }}>{item.name}</span>
                  {hasChildren && (
                    <span onClick={(e) => { e.stopPropagation(); onToggle(item.id); }} style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </span>
                  )}
                </div>
                {hasChildren && isExpanded && (
                  <div style={{ paddingLeft: 10, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <MenuTree items={item.children} activeId={activeId} expanded={expanded} onSelect={onSelect} onToggle={onToggle} depth={depth + 1} />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

/* ── Drawer ── */
function HelpDrawerDemo({ onClose }: { onClose: () => void }) {
  const cached = readCache();
  const [menuItems, setMenuItems] = useState<HelpItem[]>(cached ?? []);
  const [menuLoading, setMenuLoading] = useState(!cached);
  const [menuError, setMenuError] = useState<string | null>(null);

  const [activeId, setActiveId] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');

  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Fetch menu only if not cached
  useEffect(() => {
    if (cached) return;
    fetch(MENU_API)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data) => {
        const items = data.configuration ?? [];
        setMenuItems(items);
        writeCache(items);
        setMenuLoading(false);
      })
      .catch((err) => { setMenuError(err.message); setMenuLoading(false); });
  }, []);

  const allItems = flattenItems(menuItems);
  const activeItem = allItems.find((it) => it.id === activeId);

  // Fetch page content when item with href is selected
  useEffect(() => {
    if (!activeItem?.href) { setPageContent(null); setPageError(null); return; }
    setPageLoading(true); setPageContent(null); setPageError(null);
    const slug = activeItem.href.replace(/^\/+/, '');
    fetch(`${API_BASE}/pagebypath/${slug}`)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data) => { setPageContent(data); setPageLoading(false); })
      .catch((err) => { setPageError(err.message); setPageLoading(false); });
  }, [activeId]);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleSelect = (item: HelpItem) => {
    setActiveId(item.id);
    if ((item.children ?? []).length > 0)
      setExpanded((prev) => new Set([...prev, item.id]));
  };

  const handleBack = () => { setActiveId(''); setPageContent(null); setPageError(null); };

  const filtered = query.trim()
    ? allItems.filter((it) =>
        it.name.toLowerCase().includes(query.toLowerCase()) ||
        it.description?.toLowerCase().includes(query.toLowerCase()))
    : menuItems;

  const showContent = !!activeId && !!activeItem?.href;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 1300, background: 'rgba(0,0,0,0.35)', display: 'flex', justifyContent: 'flex-end' }}
    >
      <div style={{ position: 'relative', width: 'min(35vw, 480px)', minWidth: 320, height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)' }}>

        {/* Close — absolute top-right of panel */}
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: 8, right: 12, zIndex: 999, background: 'transparent', border: 'none', cursor: 'pointer', color: BRAND, display: 'flex', alignItems: 'center', padding: 4 }}
        >
          <X size={18} />
        </button>

        {showContent ? (
          /* ── Content view ── */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header with back */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#fff', borderBottom: `1px solid ${GREY_200}`, padding: '10px 48px 10px 12px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 46 }}>
              <button
                type="button"
                onClick={handleBack}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2, flexShrink: 0, lineHeight: 1 }}
              >
                <ChevronLeft size={20} strokeWidth={2.5} color={BRAND} />
              </button>
              <span style={{ fontSize: 16, fontWeight: 600, color: GREY_900, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeItem?.name}
              </span>
            </div>

            {/* Content body */}
            <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f9fafb' }}>
              {pageLoading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', gap: 12 }}>
                  <Loader2 size={28} color={BRAND} className="animate-spin" />
                </div>
              )}
              {pageError && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 32px', gap: 12, textAlign: 'center' }}>
                  <AlertCircle size={40} color="#f87171" />
                  <p style={{ fontSize: 14, color: '#dc2626', margin: 0 }}>Error loading content: {pageError}</p>
                  <button
                    onClick={() => { const id = activeId; setActiveId(''); setTimeout(() => setActiveId(id), 0); }}
                    style={{ padding: '9px 22px', background: BRAND, color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
                  >
                    Retry
                  </button>
                </div>
              )}
              {!pageLoading && !pageError && pageContent && (
                <div style={{ fontSize: 15, lineHeight: 1.7, color: GREY_700, padding: 16 }}>
                  {pageContent.sections?.map((sec) => (
                    <div key={sec.id} dangerouslySetInnerHTML={{ __html: sec.content }} />
                  ))}
                </div>
              )}
              {!pageLoading && !pageError && !pageContent && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 32px', gap: 12, textAlign: 'center' }}>
                  <FileX size={40} color="#d1d5db" />
                  <p style={{ fontSize: 14, color: GREY_500, margin: 0 }}>No content available for this topic.</p>
                  {activeItem?.href && <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Reference: {activeItem.href}</p>}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── Menu list view ── */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Title */}
            <div style={{ padding: '16px 48px 8px 16px' }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: GREY_900 }}>Help &amp; Support</span>
            </div>

            {/* Search */}
            <div style={{ borderBottom: `1px solid ${GREY_200}`, background: '#fff', position: 'sticky', top: 0, zIndex: 20 }}>
              <div style={{ padding: '10px 14px' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    style={{
                      width: '100%', padding: '8px 32px 8px 32px',
                      border: `1px solid ${GREY_200}`, borderRadius: 6, fontSize: 14,
                      background: `#fff url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>') no-repeat 8px center`,
                      outline: 'none', color: GREY_900, boxSizing: 'border-box',
                    }}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', fontSize: 18, color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}
                    >×</button>
                  )}
                </div>
              </div>
            </div>

            {/* Section label */}
            <span style={{ padding: '10px 0 7px 15px', borderBottom: `1px solid ${GREY_200}`, color: GREY_700, display: 'block', fontSize: 13, fontWeight: 500 }}>
              {query ? `Search Results (${filtered.length})` : 'All Topics'}
            </span>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }}>
              {menuLoading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '40px 20px', color: '#9ca3af' }}>
                  <Loader2 size={18} color={BRAND} className="animate-spin" /> Loading…
                </div>
              )}
              {menuError && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#dc2626', fontSize: 14 }}>
                  Failed to load: {menuError}
                </div>
              )}
              {!menuLoading && !menuError && filtered.length === 0 && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: GREY_500 }}>
                  <p style={{ marginBottom: 16, fontSize: 14 }}>No results for "{query}"</p>
                  <button onClick={() => setQuery('')} style={{ padding: '8px 16px', background: BRAND, color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' }}>Clear search</button>
                </div>
              )}
              {!menuLoading && !menuError && filtered.length > 0 && (
                query.trim() ? (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      style={{ borderBottom: `1px solid ${GREY_200}`, padding: '10px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: activeId === item.id ? BRAND : GREY_700 }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {item.name}
                    </div>
                  ))
                ) : (
                  <MenuTree items={filtered} activeId={activeId} expanded={expanded} onSelect={handleSelect} onToggle={toggleExpand} />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ── Page entry ── */
function LiveDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="live-demo" title="Live demo">
      <p>
        Click the button to open the Context Help Menu drawer. It fetches the live{' '}
        <strong>fab-docs-site</strong> menu from Page Pilot — click any item to load its full
        page content inline, exactly as the built-in ahd-fe drawer does.
      </p>
      <p>
        The menu is cached in <strong>localStorage</strong> for 1 hour (same as ahd-fe) so the
        API is only called once per session.
      </p>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
        >
          <HelpCircle size={16} />
          Open Help Drawer
        </button>
      </div>
      {open && <HelpDrawerDemo onClose={() => setOpen(false)} />}
    </Section>
  );
}

export default LiveDemo;
