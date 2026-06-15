import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  const { hash } = useLocation();
  const initialId = hash ? hash.slice(1) : sections[0]?.id;
  const [activeId, setActiveId] = useState(initialId);
  // On mount scroll to the hash section, after the DOM is painted.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const scrollRoot = document.querySelector('main') as HTMLElement | null;

    const attempt = (tries: number) => {
      const el = document.getElementById(id);
      if (el && scrollRoot) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
      } else if (tries > 0) {
        setTimeout(() => attempt(tries - 1), 150);
      }
    };
    attempt(5);
  }, [hash]);

  useEffect(() => {
    const scrollRoot = document.querySelector('main') as HTMLElement | null;
    if (!scrollRoot) return;

    // The line near the top of the viewport that decides the active section.
    const TRIGGER_OFFSET = 120;

    let ticking = false;

    const update = () => {
      ticking = false;

      const els = sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => Boolean(el));
      if (!els.length) return;

      // If we're scrolled to (or near) the bottom, the last section is active
      // even if it never reaches the trigger line — short trailing sections
      // can't scroll all the way to the top.
      const atBottom =
        scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - 2;
      if (atBottom) {
        setActiveId(els[els.length - 1].id);
        return;
      }

      const rootTop = scrollRoot.getBoundingClientRect().top;

      // Active = the last section whose top has crossed the trigger line.
      let current = els[0].id;
      for (const el of els) {
        const top = el.getBoundingClientRect().top - rootTop;
        if (top <= TRIGGER_OFFSET) current = el.id;
        else break;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    scrollRoot.addEventListener('scroll', onScroll, { passive: true });
    // When no hash, set active section based on current scroll position immediately.
    // When there's a hash, the hash effect handles the initial activeId.
    if (!hash) update();

    return () => scrollRoot.removeEventListener('scroll', onScroll);
  }, [sections, hash]);

  return (
    <div className="flex gap-6 lg:gap-10">
      {/* Left rail: sub-modules + on-this-page sections for the current page */}
      <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
        {/* fixed so it never scrolls with the content */}
        <div className="fixed top-14 w-56 pb-6 pr-2 pt-6 xl:w-64">
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
                    window.history.replaceState(null, '', `#${s.id}`);
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
      <div className="min-w-0 w-0 flex-1 overflow-x-hidden">{children}</div>

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
