import { ArrowUp } from 'lucide-react';
import type { DocSection } from '../DocLayout';

interface DocsTocProps {
  sections: DocSection[];
  activeId?: string;
  onSelect: (id: string) => void;
  onBackToTop: () => void;
}

function DocsToc({ sections, activeId, onSelect, onBackToTop }: DocsTocProps) {
  return (
    <nav aria-label="On this page">
      {sections.length >= 2 && (
        <>
          <p className="mb-3 text-[13px] font-semibold text-ink">On this page</p>
          <div className="border-l border-slate-200">
            {sections.map((s) => (
              <a
                key={s.id}
                id={`section-link-${s.id}`}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(s.id);
                }}
                className={[
                  '-ml-px block border-l-2 py-1.5 pl-4 pr-2 text-[13px] leading-snug transition-colors',
                  activeId === s.id
                    ? 'border-brand font-medium text-brand'
                    : 'border-transparent text-slate-500 hover:text-ink',
                ].join(' ')}
              >
                {s.label}
              </a>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={onBackToTop}
          className="inline-flex items-center gap-2 text-[13px] text-slate-500 transition-colors hover:text-ink"
        >
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          Back to top
        </button>
      </div>
    </nav>
  );
}

export default DocsToc;
