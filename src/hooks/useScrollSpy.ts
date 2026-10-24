import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { DocSection } from '../components/DocLayout';

const TRIGGER_OFFSET = 120;

const getScrollRoot = () => document.querySelector('main') as HTMLElement | null;

/**
 * Tracks which doc section is under the top of the <main> scroll area and
 * scrolls to a section by id, keeping the URL hash in sync.
 */
export function useScrollSpy(sections: DocSection[]) {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState(hash ? hash.slice(1) : sections[0]?.id);

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const attempt = (tries: number) => {
      const el = document.getElementById(id);
      if (el && getScrollRoot()) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
      } else if (tries > 0) {
        setTimeout(() => attempt(tries - 1), 150);
      }
    };
    attempt(5);
  }, [hash]);

  useEffect(() => {
    const scrollRoot = getScrollRoot();
    if (!scrollRoot) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const els = sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => Boolean(el));
      if (!els.length) return;

      const atBottom =
        scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - 2;
      if (atBottom) {
        setActiveId(els[els.length - 1].id);
        return;
      }

      const rootTop = scrollRoot.getBoundingClientRect().top;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - rootTop <= TRIGGER_OFFSET) current = el.id;
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
    if (!hash) update();
    return () => scrollRoot.removeEventListener('scroll', onScroll);
  }, [sections, hash]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  const scrollToTop = useCallback(() => {
    getScrollRoot()?.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  return { activeId, scrollToSection, scrollToTop };
}
