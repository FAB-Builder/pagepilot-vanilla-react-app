import { Search } from 'lucide-react';
import { openSearch } from '../../lib/searchCommand';

interface SearchTriggerProps {
  variant?: 'field' | 'icon';
  size?: 'md' | 'lg';
  className?: string;
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

const FIELD_SIZES = {
  md: 'gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[13px]',
  lg: 'gap-3 rounded-xl bg-white px-4 py-3.5 text-[15px] shadow-card',
};

function SearchTrigger({ variant = 'field', size = 'md', className = '' }: SearchTriggerProps) {
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search the documentation"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-ink ${className}`}
      >
        <Search size={16} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search the documentation"
      className={`flex w-full items-center whitespace-nowrap border border-slate-200 leading-none text-slate-400 transition-colors hover:border-slate-300 ${FIELD_SIZES[size]} ${className}`}
    >
      <Search className={size === 'lg' ? 'h-5 w-5 shrink-0' : 'h-4 w-4 shrink-0'} aria-hidden="true" />
      {size === 'lg' ? 'Search the documentation…' : 'Search docs…'}
      <kbd
        aria-hidden="true"
        className="ml-auto rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] leading-none text-slate-500"
      >
        {isMac ? '⌘ K' : 'Ctrl K'}
      </kbd>
    </button>
  );
}

export default SearchTrigger;
