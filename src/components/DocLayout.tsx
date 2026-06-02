import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import { navItems } from '../navItems';

interface DocSection {
  id: string;
  label: string;
}

interface DocLayoutProps {
  /** On-page section anchors shown in the right-hand "On this page" rail. */
  sections?: DocSection[];
  children: ReactNode;
}

/**
 * Three-column documentation shell (like antd's docs):
 *  - left: section navigation (Tours / App Banner / Demos / Tooltips)
 *  - center: the page content
 *  - right: on-this-page anchors
 */
function DocLayout({ sections = [], children }: DocLayoutProps) {
  return (
    <div className="doc">
      <aside className="doc-sidebar">
        <span className="doc-sidebar-heading">Components</span>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'doc-side-link doc-side-link--active' : 'doc-side-link'
              }
            >
              <span aria-hidden>{item.emoji}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="doc-content">{children}</div>

      {sections.length > 0 && (
        <aside className="doc-toc">
          <span className="doc-toc-heading">On this page</span>
          <nav>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="doc-toc-link">
                {s.label}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}

export default DocLayout;
