import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface PagerLink {
  to: string;
  label: string;
}

interface DocsPagerProps {
  prev?: PagerLink;
  next?: PagerLink;
}

const cardClass =
  'flex flex-col gap-1 rounded-xl border border-slate-200 px-4 py-3.5 transition-colors hover:border-brand/40 hover:bg-slate-50 group';

function DocsPager({ prev, next }: DocsPagerProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link to={prev.to} className={cardClass}>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Previous
          </span>
          <span className="text-sm font-semibold text-ink transition-colors group-hover:text-brand">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={next.to} className={`${cardClass} items-end text-right`}>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            Next <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-ink transition-colors group-hover:text-brand">
            {next.label}
          </span>
        </Link>
      )}
    </nav>
  );
}

export default DocsPager;
