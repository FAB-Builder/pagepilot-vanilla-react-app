import { Construction } from 'lucide-react';
import DocLayout from './DocLayout';

interface ComingSoonProps {
  title: string;
  description: string;
}

function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <DocLayout title={title} sections={[{ id: 'overview', label: 'Overview' }]}>
      <article className="max-w-3xl">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            Components
          </span>
          <h1 className="mt-1 text-3xl font-bold">{title}</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">{description}</p>
        </header>
        <section id="overview" className="scroll-mt-24">
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-500">
              <Construction size={28} />
            </span>
            <h2 className="mt-4 text-lg font-bold">Demo coming soon</h2>
            <p className="mt-1 text-sm text-slate-500">This section is being built out next.</p>
          </div>
        </section>
      </article>
    </DocLayout>
  );
}

export default ComingSoon;
