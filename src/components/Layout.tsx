import { NavLink, Outlet, Link } from 'react-router-dom';
import { navItems } from '../navItems';

function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur">
        <Link to="/" className="flex items-center gap-2.5 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm text-white">
            PP
          </span>
          <span>PagePilot Demo</span>
        </Link>
        <nav className="flex flex-wrap gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3.5 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-brand-tint font-semibold text-brand'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
