import { Construction } from 'lucide-react';
import DocLayout from '../../components/DocLayout';
import { PAGES_SUBMODULES } from './subModules';

/**
 * Fetch Pages — a sub-module of "Pages". Placeholder until the docs are built.
 */
function FetchPages() {
  return (
    <DocLayout
      title="Fetch Pages"
      sections={[{ id: 'overview', label: 'Overview' }]}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted/70">
            Pages
          </span>
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Fetch Pages
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Documentation for fetching pages is being built out next.
          </p>
        </header>
        <section id="overview" className="scroll-mt-24">
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-500">
              <Construction size={28} />
            </span>
            <h2 className="mt-4 text-lg font-bold">Coming soon</h2>
            <p className="mt-1 text-sm text-slate-500">This section is being built out next.</p>
          </div>
        </section>
      </article>
    </DocLayout>
  );
}

export default FetchPages;
