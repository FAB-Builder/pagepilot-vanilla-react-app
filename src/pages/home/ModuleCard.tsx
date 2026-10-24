import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { NavItem } from '../../navItems';
import { MODULE_COUNTS } from './homeData';

function ModuleCard({ item }: { item: NavItem }) {
  const Icon = item.icon;
  const count = MODULE_COUNTS[item.to];

  return (
    <Link
      to={item.to}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-slate-300"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-ink transition-colors duration-200 group-hover:text-brand">
          <Icon className="h-5 w-5" />
        </span>
        {count && <span className="text-xs font-medium text-muted">{count}</span>}
      </div>

      <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-ink">{item.label}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>

      <span className="mt-5 inline-flex items-center gap-0.5 text-sm font-medium text-brand">
        Learn more
        <ChevronRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

export default ModuleCard;
