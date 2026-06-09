import type { ReactNode } from 'react';

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">{title}</h2>
      <div className="space-y-3 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export const Code = ({ children }: { children: ReactNode }) => (
  <code className="inline-block max-w-full break-all rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
    {children}
  </code>
);

export function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-brand/20 bg-brand-tint px-4 py-3 text-sm text-slate-700">
      {children}
    </div>
  );
}
