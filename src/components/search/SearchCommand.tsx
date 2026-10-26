import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDocsSearch } from '../../hooks/useDocsSearch';
import { SEARCH_OPEN_EVENT } from '../../lib/searchCommand';
import type { SearchEntry } from '../../searchIndex';

/**
 * Command-palette style search dialog. Mounted once in Layout; opened with
 * Ctrl/⌘ K, "/", or any SearchTrigger.
 */
function SearchCommand() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const results = useDocsSearch(query);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  const go = useCallback(
    (entry: SearchEntry) => {
      close();
      const [path, hash] = entry.to.split('#');
      navigate(path);
      if (!hash) return;
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.history.replaceState(null, '', `#${hash}`);
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      });
    },
    [close, navigate],
  );

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: globalThis.KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') close();
    };
    window.addEventListener(SEARCH_OPEN_EVENT, onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(SEARCH_OPEN_EVENT, onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onListKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="search-backdrop fixed inset-0 z-[300] flex items-start justify-center bg-black/40 px-4 pb-4 pt-[12vh] backdrop-blur-[3px]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
    >
      <div
        className="search-panel w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          placeholder="Search the docs…"
          aria-label="Search the docs"
          className="block w-full border-0 border-b border-slate-200 bg-transparent px-5 py-4 text-[15px] text-ink outline-none placeholder:text-slate-400"
        />
        <div ref={listRef} className="scroll-slim max-h-[22rem] overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <p className="px-6 py-6 text-center text-[13px] text-slate-400">
              Nothing matches “{query.trim()}”. Try a module or feature name.
            </p>
          ) : (
            results.map((entry, i) => (
              <a
                key={entry.to}
                href={entry.to}
                data-active={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={(e) => {
                  e.preventDefault();
                  go(entry);
                }}
                className={[
                  'flex min-w-0 flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors',
                  i === active ? 'bg-slate-50' : '',
                ].join(' ')}
              >
                <span
                  className={[
                    'text-[9.5px] font-semibold uppercase tracking-[0.11em]',
                    i === active ? 'text-brand' : 'text-slate-400',
                  ].join(' ')}
                >
                  {entry.module}
                </span>
                <span
                  className={[
                    'text-[13.5px] font-semibold leading-snug',
                    i === active ? 'text-ink' : 'text-slate-700',
                  ].join(' ')}
                >
                  {entry.title}
                </span>
                {entry.description && (
                  <span className="truncate text-xs text-slate-500">{entry.description}</span>
                )}
              </a>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default SearchCommand;
