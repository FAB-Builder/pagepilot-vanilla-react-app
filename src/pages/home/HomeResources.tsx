import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { NavItem } from '../../navItems';

function HomeResources({ items }: { items: NavItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="py-12 sm:py-14">
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Resources</h2>
      <div className="mt-7 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-slate-50"
            >
              <Icon className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-brand" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{item.label}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default HomeResources;
