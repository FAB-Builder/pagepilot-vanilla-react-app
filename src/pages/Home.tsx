import { Link } from 'react-router-dom';
import { navItems } from '../navItems';

function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold">PagePilot Vanilla React Demo</h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-500">
          A playground showing how to embed PagePilot (AHDjs) experiences into a plain React app.
          Pick a section below to see it in action and grab the integration code.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-lg hover:shadow-brand/10"
          >
            <span className="text-2xl" aria-hidden>
              {item.emoji}
            </span>
            <span className="text-base font-bold">{item.label}</span>
            <span className="flex-1 text-sm leading-relaxed text-slate-500">
              {item.description}
            </span>
            <span className="text-sm font-semibold text-brand">Open demo →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Home;
