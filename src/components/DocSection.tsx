import type { ReactNode } from 'react';

/**
 * A titled documentation section with an anchor id (used by DocLayout's
 * scroll-spy) and a divider heading. Shared across doc pages.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="doc-section scroll-mt-24">
      <h2 className="mb-4 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
        {title}
      </h2>
      <div className="space-y-4 text-[15.5px] leading-7 text-slate-600">{children}</div>
    </section>
  );
}

/** Inline code chip used throughout the docs. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-px font-mono text-[0.84em] font-medium text-slate-800">
      {children}
    </code>
  );
}
