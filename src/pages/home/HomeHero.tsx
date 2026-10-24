import { Link } from 'react-router-dom';
import SearchTrigger from '../../components/search/SearchTrigger';
import { POPULAR_LINKS } from './homeData';

function HomeHero() {
  return (
    <section className="border-b border-slate-200 px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="home-rise text-sm font-medium text-muted">Page Pilot Documentation</p>
        <h1 className="home-rise home-rise-1 mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-6xl">
          Build in-app experiences with Page Pilot.
        </h1>
        <p className="home-rise home-rise-2 mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Guides, API references and live demos for tours, tooltips, pages, menus and forms in
          your React app.
        </p>

        <div className="home-rise home-rise-3 mx-auto mt-10 max-w-xl">
          <SearchTrigger size="lg" />
        </div>

        <div className="home-rise home-rise-3 mt-6 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm">
          <span className="mr-2 text-muted">Popular:</span>
          {POPULAR_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-3 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
