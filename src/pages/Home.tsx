import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { navItems } from "../navItems";

function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* ── Hero ── */}
      <section className="pb-10 pt-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-tint px-3.5 py-1 text-xs font-semibold text-brand mb-5">
          Page Pilot · Developer Playground
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Build smarter in-app experiences
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
          Explore live demos of Page Pilot components — tours, tooltips, help
          menus, and more — ready to drop into any React application.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            Explore demos
            <ArrowRight size={15} />
          </Link>
          <a
            href="https://pagepilot.fabbuilder.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Open Page Pilot
          </a>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Components
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* ── Cards ── */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lg"
            >
              {/* Icon */}
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                <Icon className="h-[22px] w-[22px]" />
              </span>

              {/* Label + description */}
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-base font-bold text-ink">
                  {item.label}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {item.description}
                </span>
              </div>

              {/* Footer CTA */}
              <span className="flex items-center gap-1 text-sm font-semibold text-brand">
                {item.to === '/webinar' ? 'View docs' : 'View demo'}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default Home;
