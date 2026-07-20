import type { ReactNode } from 'react';

/**
 * Tinted callout box used across the block documentation pages.
 * Extracted from the Button page so every block doc shares one implementation.
 */
export function BlockCallout({
  title,
  children,
  variant = 'info',
}: {
  title?: string;
  children: ReactNode;
  variant?: 'info' | 'tip' | 'warning';
}) {
  const colors = {
    info: 'border-blue-200 bg-blue-50 text-blue-900',
    tip: 'border-green-200 bg-green-50 text-green-900',
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
  };
  return (
    <div className={`my-4 rounded-xl border p-4 text-sm ${colors[variant]}`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

export default BlockCallout;
