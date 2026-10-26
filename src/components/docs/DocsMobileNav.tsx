import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';

interface DocsMobileNavProps {
  moduleLabel?: string;
  title: string;
  children: (close: () => void) => ReactNode;
}

/** Sticky crumb bar + slide-in drawer shown below the lg breakpoint. */
function DocsMobileNav({ moduleLabel, title, children }: DocsMobileNavProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 200);
  };

  return (
    <>
      <div className="sticky top-0 z-20 mb-4 border-b border-slate-200/80 bg-white/95 px-4 py-2 backdrop-blur-md sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="docs-mobile-drawer"
          className="-ml-2 flex min-w-0 items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13.5px] text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <Menu className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex min-w-0 items-center gap-1.5 truncate">
            {moduleLabel && moduleLabel !== title && (
              <>
                {moduleLabel}
                <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" aria-hidden="true" />
              </>
            )}
            <strong className="truncate font-medium text-ink">{title}</strong>
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className={[
              'absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out',
              visible ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            onClick={close}
            aria-hidden="true"
          />
          <div
            id="docs-mobile-drawer"
            className={[
              'scroll-slim absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-white p-4 pb-10 shadow-xl transition-transform duration-200 ease-out',
              visible ? 'translate-x-0' : '-translate-x-full',
            ].join(' ')}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Documentation</span>
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children(close)}
          </div>
        </div>
      )}
    </>
  );
}

export default DocsMobileNav;
