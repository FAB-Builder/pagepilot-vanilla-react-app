import { Link, useLocation } from 'react-router-dom';
import { HEADER_LINKS } from './headerLinks';

function HeaderNav() {
  const { pathname } = useLocation();

  return (
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
      {HEADER_LINKS.map((link) => {
        const active = link.isActive(pathname);
        return (
          <Link
            key={link.label}
            to={link.to}
            aria-current={active ? 'page' : undefined}
            className={[
              'rounded-lg px-3 py-1.5 text-[13.5px] font-medium transition-colors',
              active ? 'text-ink' : 'text-slate-500 hover:text-ink',
            ].join(' ')}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default HeaderNav;
