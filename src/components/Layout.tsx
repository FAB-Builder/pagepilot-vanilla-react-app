import { NavLink, Outlet, Link } from 'react-router-dom';
import { Search, BookOpen, Compass } from 'lucide-react';
import { navItems } from '../navItems';

function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-violet-500 text-white">
              <Compass size={18} />
            </span>
            <span className="text-[17px] tracking-tight">PagePilot</span>
          </Link>

          <div className="relative hidden flex-1 md:block">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Type keywords..."
              className="h-9 w-full max-w-md rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
            />
          </div>

          <nav className="ml-auto flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'relative px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'font-semibold text-brand after:absolute after:inset-x-3 after:-bottom-[1px] after:h-0.5 after:rounded-full after:bg-brand'
                      : 'text-slate-600 hover:text-slate-900',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="https://pagepilot-docs.fabbuilder.com/"
              target="_blank"
              rel="noreferrer"
              className="ml-2 grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              title="Docs"
            >
              <BookOpen size={18} />
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
