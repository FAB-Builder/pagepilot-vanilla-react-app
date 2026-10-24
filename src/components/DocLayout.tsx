import type { ComponentType, ReactNode, SVGProps } from 'react';
import { useLocation } from 'react-router-dom';
import { docsNavFlat, findCurrentModule } from '../docsNav';
import { useScrollSpy } from '../hooks/useScrollSpy';
import DocsNav from './docs/DocsNav';
import DocsToc from './docs/DocsToc';
import DocsBreadcrumb from './docs/DocsBreadcrumb';
import DocsPager, { type PagerLink } from './docs/DocsPager';
import DocsMobileNav from './docs/DocsMobileNav';
import SearchTrigger from './search/SearchTrigger';

export interface DocSection {
  id: string;
  label: string;
}

export interface SubModule {
  /** Route to navigate to, e.g. "/pages/lead-form". */
  to: string;
  /** Label shown in the left rail. */
  label: string;
  /**
   * Optional glyph rendered before the label. Block sub-modules pass the same
   * icon the editor shows in its Add Block menu; other modules omit it.
   */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

interface DocLayoutProps {
  /** The page title — used in the breadcrumb and the mobile crumb bar. */
  title: string;
  /** Section anchors — drive the "On this page" list and scroll-spy highlighting. */
  sections: DocSection[];
  /** Sub-pages of the current module (e.g. "Pages" → Fetch Pages), nested in the sidebar. */
  subModules?: SubModule[];
  /** Kept for API compatibility; the module name now comes from the route. */
  subModulesLabel?: string;
  children: ReactNode;
}

function getSiblings(pathname: string, subModules?: SubModule[]) {
  const list: PagerLink[] =
    subModules && subModules.some((sm) => sm.to === pathname)
      ? subModules.map(({ to, label }) => ({ to, label }))
      : docsNavFlat.map(({ to, label }) => ({ to, label }));
  const index = list.findIndex((link) => link.to === pathname);
  if (index === -1) return {};
  return { prev: list[index - 1], next: list[index + 1] };
}

/**
 * Three-column documentation shell: grouped module nav on the left, the page
 * in the middle (breadcrumb + content + prev/next), and "On this page" on the
 * right. Below lg the nav collapses into a drawer behind a sticky crumb bar.
 */
function DocLayout({ title, sections, subModules, children }: DocLayoutProps) {
  const { pathname } = useLocation();
  const currentModule = findCurrentModule(pathname);
  const { activeId, scrollToSection, scrollToTop } = useScrollSpy(sections);
  const { prev, next } = getSiblings(pathname, subModules);

  return (
    <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <DocsMobileNav moduleLabel={currentModule?.label} title={title}>
        {(close) => (
          <>
            <SearchTrigger className="mb-5" />
            <DocsNav
              currentModulePath={currentModule?.to}
              subModules={subModules}
              onNavigate={close}
            />
            {sections.length > 0 && (
              <div className="mt-6 border-t border-slate-200 pt-5">
                <DocsToc
                  sections={sections}
                  activeId={activeId}
                  onSelect={(id) => {
                    scrollToSection(id);
                    close();
                  }}
                  onBackToTop={() => {
                    scrollToTop();
                    close();
                  }}
                />
              </div>
            )}
          </>
        )}
      </DocsMobileNav>

      <aside
        id="doc-left-rail"
        className="sticky top-0 hidden h-[calc(100vh-3.5rem)] flex-col self-start border-r border-slate-200 lg:flex"
      >
        <div className="px-4 pb-3 pt-5">
          <SearchTrigger />
        </div>
        <div className="scroll-slim min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-10 pt-2">
          <DocsNav currentModulePath={currentModule?.to} subModules={subModules} />
        </div>
      </aside>

      <div className="min-w-0 px-4 pb-24 pt-2 sm:px-6 lg:px-8 lg:pt-10">
        <div className="mx-auto max-w-[82rem] xl:grid xl:grid-cols-[minmax(0,54rem)_14rem] xl:justify-between xl:gap-10">
          <div className="mx-auto w-full min-w-0 max-w-[54rem] overflow-x-hidden xl:mx-0">
            <DocsBreadcrumb module={currentModule} title={title} />
            <div className="doc-content mt-5">{children}</div>
            <DocsPager prev={prev} next={next} />
          </div>

          <aside id="doc-right-rail" className="hidden xl:block">
            <div className="scroll-slim sticky top-10 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
              <DocsToc
                sections={sections}
                activeId={activeId}
                onSelect={scrollToSection}
                onBackToTop={scrollToTop}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default DocLayout;
