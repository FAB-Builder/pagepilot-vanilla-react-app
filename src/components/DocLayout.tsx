import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../navItems';

export interface DocSection {
  id: string;
  label: string;
}

interface DocLayoutProps {
  /** The page title shown above the section list. */
  title: string;
  /** Section anchors — drive BOTH the left nav and scroll-spy highlighting. */
  sections: DocSection[];
  children: ReactNode;
}

/**
 * Ant-Design-style documentation shell. The left rail shows the component
 * list at top, then the sections of the CURRENT page with scroll-spy
 * highlighting.
 */
function DocLayout({ title, sections, children }: DocLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-72px 0px -70% 0px', threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[256px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="scroll-slim sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto pb-6 pr-2">
          {/* Component list */}
          <span className="mb-2 block px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted/70">
            Components
          </span>
          <nav className="mb-6 flex flex-col gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[13px] transition-colors',
                      isActive
                        ? 'bg-brand-tint font-semibold text-brand'
                        : 'font-medium text-slate-600 hover:bg-slate-100 hover:text-ink',
                    ].join(' ')
                  }
                >
                  <Icon size={15} className={undefined} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* On-this-page sections for the current component */}
          <span className="mb-2 block border-t border-slate-200/80 px-3 pt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted/70">
            {title}
          </span>
          <nav className="flex flex-col">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={[
                  'border-l-2 py-1.5 pl-4 pr-2 text-[13px] transition-colors',
                  activeId === s.id
                    ? 'border-brand font-semibold text-brand'
                    : 'border-slate-200 text-muted hover:border-slate-300 hover:text-ink',
                ].join(' ')}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default DocLayout;
