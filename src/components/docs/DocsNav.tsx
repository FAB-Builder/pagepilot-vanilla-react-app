import { NavLink } from 'react-router-dom';
import { docsNavGroups } from '../../docsNav';
import type { SubModule } from '../DocLayout';

interface DocsNavProps {
  currentModulePath?: string;
  subModules?: SubModule[];
  onNavigate?: () => void;
}

const linkClass = (isActive: boolean) =>
  [
    'flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13.5px] leading-snug transition-colors',
    isActive
      ? 'bg-brand-tint font-medium text-brand'
      : 'text-slate-500 hover:bg-slate-100 hover:text-ink',
  ].join(' ');

/** Grouped module list; the current module expands to show its sub-pages. */
function DocsNav({ currentModulePath, subModules, onNavigate }: DocsNavProps) {
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      {docsNavGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 px-3 text-[13px] font-semibold text-ink">{group.label}</p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const expanded = item.to === currentModulePath && subModules && subModules.length > 0;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onNavigate}
                    className={({ isActive }) => linkClass(isActive && !expanded)}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-80" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>

                  {expanded && (
                    <ul className="mb-2 ml-5 mt-1 flex flex-col gap-0.5 border-l border-slate-200 pl-2">
                      {subModules.map((sm) => (
                        <li key={sm.to}>
                          <NavLink
                            to={sm.to}
                            onClick={onNavigate}
                            className={({ isActive }) => linkClass(isActive)}
                          >
                            {sm.icon && <sm.icon className="h-4 w-4 shrink-0 opacity-80" />}
                            <span className="truncate">{sm.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default DocsNav;
