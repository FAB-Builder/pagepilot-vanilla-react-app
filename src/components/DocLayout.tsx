import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface DocSection {
  id: string;
  label: string;
}

interface DocLayoutProps {
  /** The page title shown at the top of the left sidebar. */
  title: string;
  /** Section anchors — drive BOTH the left nav and scroll-spy highlighting. */
  sections: DocSection[];
  children: ReactNode;
}

/**
 * Documentation shell. The left sidebar lists the sections of the CURRENT
 * page only (e.g. all the Tours properties), with scroll-spy highlighting —
 * the way antd/Stripe docs scope their side nav to the active component.
 */
function DocLayout({ title, sections, children }: DocLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <span className="mb-3 block px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <nav className="flex flex-col gap-0.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={[
                  'rounded-lg border-l-2 px-3 py-1.5 text-sm transition-colors',
                  activeId === s.id
                    ? 'border-brand bg-brand-tint font-semibold text-brand'
                    : 'border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900',
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
