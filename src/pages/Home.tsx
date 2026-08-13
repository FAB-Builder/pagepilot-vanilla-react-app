import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { navItems, type NavItem } from '../navItems';
import { BLOCKS_SUBMODULES } from './blocks/subModules';
import { PAGES_SUBMODULES } from './pages/subModules';
import { PAGEPILOT_APP_URL } from '../lib/ahd';

/**
 * Home page groups the modules by what a reader is trying to do, rather than
 * listing all ten in one flat grid. Each group is defined by the routes it
 * contains, so the cards themselves still come from `navItems` — there's one
 * source of truth for a module's label, description and icon.
 */
const GROUPS: { title: string; blurb: string; routes: string[] }[] = [
  {
    title: 'Content & pages',
    blurb: 'Author pages in the visual editor and pull them into your app.',
    routes: ['/pages', '/blocks', '/forms'],
  },
  {
    title: 'Navigation',
    blurb: 'Menus and in-product help, configured without code changes.',
    routes: ['/menus', '/context-help-menu'],
  },
  {
    title: 'Onboarding & engagement',
    blurb: 'Guide, announce, and show your product in action.',
    routes: ['/tours', '/tooltips', '/demos', '/app-banner', '/webinar'],
  },
];

const byRoute = new Map(navItems.map((item) => [item.to, item]));

/** Small count chip shown on the cards that lead to a sub-module list. */
const COUNTS: Record<string, string> = {
  '/blocks': `${BLOCKS_SUBMODULES.length} blocks`,
  '/pages': `${PAGES_SUBMODULES.length} guides`,
};

function ModuleCard({ item }: { item: NavItem }) {
  const Icon = item.icon;
  const count = COUNTS[item.to];

  return (
    <Link
      to={item.to}
      className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
          <Icon className="h-[22px] w-[22px]" />
        </span>
        {count && (
          <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-muted">
            {count}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <span className="text-base font-bold text-ink">{item.label}</span>
        <span className="text-sm leading-relaxed text-muted">{item.description}</span>
      </div>

      <span className="flex items-center gap-1 text-sm font-semibold text-brand">
        {item.to === '/webinar' ? 'View docs' : item.to === '/troubleshooting' ? 'View' : 'View demo'}
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

function Home() {
  // Anything not claimed by a group still gets rendered, so adding a nav item
  // without touching GROUPS can never make it silently disappear.
  const grouped = new Set(GROUPS.flatMap((g) => g.routes));
  const ungrouped = navItems.filter((item) => !grouped.has(item.to));

  return (
    <div className="mx-auto max-w-7xl">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-12 pt-6 text-center">
        {/* Soft brand glow behind the headline. Decorative only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-tint px-3.5 py-1 text-xs font-semibold text-brand">
            Page Pilot · Developer Playground
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Build smarter in-app experiences
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Explore live demos of Page Pilot components — tours, tooltips, help menus, and more —
            ready to drop into any React application.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              Explore demos
              <ArrowRight size={15} />
            </Link>
            <a
              href={PAGEPILOT_APP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Open Page Pilot
            </a>
          </div>
        </div>
      </section>

      {/* ── Grouped modules ── */}
      {GROUPS.map((group) => {
        const items = group.routes
          .map((route) => byRoute.get(route))
          .filter((item): item is NavItem => Boolean(item));

        if (items.length === 0) return null;

        return (
          <section key={group.title} className="mb-12">
            <div className="mb-5 border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-ink">{group.title}</h2>
              <p className="mt-1 text-sm text-muted">{group.blurb}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ModuleCard key={item.to} item={item} />
              ))}
            </div>
          </section>
        );
      })}

      {ungrouped.length > 0 && (
        <section className="mb-12">
          <div className="mb-5 border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-ink">More</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ungrouped.map((item) => (
              <ModuleCard key={item.to} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
