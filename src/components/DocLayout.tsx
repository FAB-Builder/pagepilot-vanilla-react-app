import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../navItems';

export interface DocSection {
  id: string;
  label: string;
}

export interface SubModule {
  /** Route to navigate to, e.g. "/pages/lead-form". */
  to: string;
  /** Label shown in the left rail. */
  label: string;
}

interface DocLayoutProps {
  /** The page title shown above the section list. */
  title: string;
  /** Section anchors — drive BOTH the left nav and scroll-spy highlighting. */
  sections: DocSection[];
  /**
   * Optional sub-modules for a parent module (e.g. "Pages" → Lead Form,
   * Fetch Pages). When provided they render as a list in the left rail,
   * above the on-this-page sections.
   */
  subModules?: SubModule[];
  /** Heading shown above the sub-module list. Defaults to the title. */
  subModulesLabel?: string;
  children: ReactNode;
}

/**
 * Ant-Design-style documentation shell. The left rail shows the current
 * page's sub-modules and on-this-page sections (with scroll-spy
 * highlighting); the right rail shows the top-level component list.
 */
function DocLayout({
  title,
  sections,
  subModules,
  subModulesLabel,
  children,
}: DocLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    // The scroll container is the <main> element in Layout — not the window.
    const scrollRoot = document.querySelector('main') as HTMLElement | null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { root: scrollRoot, rootMargin: '0px 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="flex gap-10">
      {/* Left rail: sub-modules + on-this-page sections for the current page */}
      <aside className="hidden w-64 shrink-0 lg:block">
        {/* fixed so it never scrolls with the content */}
        <div className="fixed top-14 w-64 pb-6 pr-2 pt-6">
          {/* Sub-modules of the current module (e.g. Pages → Lead Form) */}
          {subModules && subModules.length > 0 && (
            <>
              <span className="mb-2 block px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted/70">
                {subModulesLabel ?? title}
              </span>
              <nav className="mb-6 flex flex-col gap-0.5">
                {subModules.map((sm) => (
                  <NavLink
                    key={sm.to}
                    to={sm.to}
                    className={({ isActive }) =>
                      [
                        'rounded-md px-3 py-1.5 text-[13px] transition-colors',
                        isActive
                          ? 'bg-brand-tint font-semibold text-brand'
                          : 'font-medium text-slate-600 hover:bg-slate-100 hover:text-ink',
                      ].join(' ')
                    }
                  >
                    {sm.label}
                  </NavLink>
                ))}
              </nav>
            </>
          )}

          {/* On-this-page sections for the current component */}
          <span
            className={[
              'mb-2 block px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted/70',
              subModules && subModules.length > 0
                ? 'border-t border-slate-200/80 pt-5'
                : '',
            ].join(' ')}
          >
            {title}
          </span>
          <nav className="flex flex-col">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(s.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(s.id);
                  }
                }}
                className={[
                  'cursor-pointer border-l-2 py-1.5 pl-4 pr-2 text-[13px] transition-colors',
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

      {/* Center: the page content */}
      <div className="min-w-0 flex-1">{children}</div>

      {/* Right rail: the top-level component list */}
      <aside className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-6 pt-6">
          <span className="mb-2 block px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted/70">
            Components
          </span>
          <nav className="flex flex-col gap-0.5">
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
                  <Icon className="h-[15px] w-[15px] shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default DocLayout;
