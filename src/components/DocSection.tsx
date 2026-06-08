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
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">{title}</h2>
      <div className="space-y-3 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

/** Inline code chip used throughout the docs. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
      {children}
    </code>
  );
}
