import { ArrowUpRight } from 'lucide-react';

const FABBUILDER_URL = 'https://fabbuilder.com/';

/**
 * Highlights fabbuilder.com as a real, in-production example of a site whose
 * every page is authored in Page Pilot. Used on the Pages docs so readers can
 * see the end result rather than only the API that produces it.
 *
 * `compact` drops the stat strip — for pages where the case study is a
 * supporting aside rather than the point being made.
 */
export default function CaseStudyCallout({ compact = false }: { compact?: boolean }) {
  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-indigo-200 bg-indigo-50">
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
            Built with Page Pilot
          </span>
          <a
            href={FABBUILDER_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            fabbuilder.com
            <ArrowUpRight size={14} />
          </a>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          The FabBuilder marketing site is built <strong className="text-ink">entirely</strong> with
          Page Pilot pages — every screen you see there, from the landing page to the blog, is
          authored in the visual editor and pulled in through the same API this page documents. No
          page-specific React components, no CMS templates to maintain.
        </p>

        {!compact && (
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-indigo-200 bg-white p-3">
              <dt className="text-xs font-semibold text-muted">Every route</dt>
              <dd className="mt-0.5 text-sm text-slate-600">
                One Next.js catch-all renders the whole site from page slugs.
              </dd>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-white p-3">
              <dt className="text-xs font-semibold text-muted">Every layout</dt>
              <dd className="mt-0.5 text-sm text-slate-600">
                Built from the same blocks documented in this reference.
              </dd>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-white p-3">
              <dt className="text-xs font-semibold text-muted">Every deploy</dt>
              <dd className="mt-0.5 text-sm text-slate-600">
                Rebuilt only when an editor changes something.
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
