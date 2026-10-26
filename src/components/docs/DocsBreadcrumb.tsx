import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { NavItem } from '../../navItems';

interface DocsBreadcrumbProps {
  module?: NavItem;
  title: string;
}

function DocsBreadcrumb({ module, title }: DocsBreadcrumbProps) {
  const showTitle = !module || module.label !== title;

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500">
      <Link to="/" className="transition-colors hover:text-ink">
        Docs
      </Link>
      {module && (
        <>
          <ChevronRight className="h-3 w-3 text-slate-400" aria-hidden="true" />
          {showTitle ? (
            <Link to={module.to} className="transition-colors hover:text-ink">
              {module.label}
            </Link>
          ) : (
            <span aria-current="page" className="font-medium text-brand">
              {module.label}
            </span>
          )}
        </>
      )}
      {showTitle && (
        <>
          <ChevronRight className="h-3 w-3 text-slate-400" aria-hidden="true" />
          <span aria-current="page" className="font-medium text-brand">
            {title}
          </span>
        </>
      )}
    </nav>
  );
}

export default DocsBreadcrumb;
