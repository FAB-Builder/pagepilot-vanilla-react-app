import { NavLink, Outlet, Link } from 'react-router-dom';
import { navItems } from '../navItems';

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark">PP</span>
          <span className="brand-name">PagePilot Demo</span>
        </Link>
        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
