import type { ReactNode } from 'react';

export const headerIconClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink';

interface HeaderIconButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  children: ReactNode;
}

/** Borderless square icon button used for every utility action in the header. */
function HeaderIconButton({ label, onClick, href, className = '', children }: HeaderIconButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={label}
        className={`${headerIconClass} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`${headerIconClass} ${className}`}
    >
      {children}
    </button>
  );
}

export default HeaderIconButton;
