import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { navItems } from '../navItems';

function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="py-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">PagePilot</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
          A developer playground for embedding PagePilot (AHDjs) experiences into a plain React app.
          Explore each component, see it live, and copy the integration code.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/tours"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            Get Started
          </Link>
          <a
            href="https://pagepilot-docs.fabbuilder.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
          >
            Documentation
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-lg hover:shadow-brand/10"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="h-[22px] w-[22px]" />
              </span>
              <span className="text-lg font-bold">{item.label}</span>
              <span className="flex-1 text-sm leading-relaxed text-slate-500">
                {item.description}
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-brand">
                Open demo
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
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
