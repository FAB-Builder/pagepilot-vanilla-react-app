import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, CornerDownLeft } from 'lucide-react';
import { SEARCH_INDEX, type SearchEntry } from '../searchIndex';

function normalize(s: string) {
  return s.toLowerCase();
}

function scoreEntry(entry: SearchEntry, q: string): number {
  const title = normalize(entry.title);
  const module = normalize(entry.module);
  const keywords = entry.keywords ? normalize(entry.keywords) : '';

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (module.includes(q)) return 40;
  if (keywords.includes(q)) return 20;
  return 0;
}

function useSearchResults(query: string) {
  return useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return SEARCH_INDEX.map((entry) => ({ entry, score: scoreEntry(entry, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 9)
      .map((r) => r.entry);
  }, [query]);
}

function SearchBar({ autoFocus = false, onNavigate }: { autoFocus?: boolean; onNavigate?: () => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useSearchResults(query);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  function goTo(entry: SearchEntry) {
    const [path, hash] = entry.to.split('#');
    navigate(path);
    if (hash) {
      // Let the route mount before scrolling to the section anchor.
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.history.replaceState(null, '', `#${hash}`);
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      });
    }
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
    onNavigate?.();
  }

  return (
    <div ref={containerRef} className={`relative w-full ${autoFocus ? '' : 'max-w-sm'}`}>
      <div className="relative">
        <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === 'Enter' && results[activeIndex]) {
              goTo(results[activeIndex]);
            } else if (e.key === 'Escape') {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          placeholder="Search docs, modules, sections..."
          aria-label="Search documentation"
          className="h-8 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-14 text-[13px] text-ink placeholder:text-slate-400 outline-none transition-colors focus:border-brand dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X size={14} />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400">
            Ctrl K
          </kbd>
        )}
      </div>

      {open && query && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-96 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-soft dark:border-slate-700 dark:bg-slate-800">
          {results.length === 0 ? (
            <p className="px-3 py-2.5 text-[13px] text-slate-400">No results for "{query}"</p>
          ) : (
            results.map((entry, i) => (
              <button
                key={entry.to}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => goTo(entry)}
                className={[
                  'flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-[13px] transition-colors',
                  i === activeIndex
                    ? 'bg-brand-tint text-brand dark:bg-brand/20 dark:text-white'
                    : 'text-ink dark:text-white',
                ].join(' ')}
              >
                <span className="truncate">{entry.title}</span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="truncate text-[11px] text-slate-400">{entry.module}</span>
                  {i === activeIndex && <CornerDownLeft size={12} className="text-slate-400" />}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
