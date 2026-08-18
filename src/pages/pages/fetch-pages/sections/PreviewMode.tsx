import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import {
  PREVIEW_FETCH_CODE,
  PREVIEW_REACT_CODE,
  PREVIEW_NEXT_NOTE_CODE,
} from '../snippets';

/**
 * Documents the `?mode=preview` convention: when a page URL carries it, the
 * site fetches that slug from the API at runtime instead of showing its
 * statically built copy.
 */
function PreviewMode() {
  return (
    <Section id="preview-mode" title="Preview mode (?mode=preview)">
      <p>
        Most sites build their Page Pilot content into static pages, so visitors get fast, cached
        HTML. The trade-off: after you edit a page in Page Pilot, the live site keeps serving the
        old build until it rebuilds.
      </p>
      <p>
        <strong>Preview mode</strong> is the escape hatch. Add <Code>?mode=preview</Code> to any page
        URL and your site fetches that slug from the API right then, showing the latest saved
        content &mdash; including edits that are still drafts. Page Pilot gives you this URL in the
        publish dialog, next to the normal live URL.
      </p>
      <p>
        Nothing changes for real visitors: without the query parameter, the static page renders
        exactly as before, so caching and SEO are untouched.
      </p>

      <h3 className="pt-2 text-base font-semibold text-slate-800">1. Fetch without the live filter</h3>
      <p>
        The only API difference is <Code>includes</Code>. Normally you pass{' '}
        <Code>{`[{ filter: { status: 'live' } }]`}</Code> so drafts never leak to visitors. In
        preview, pass an empty array so unpublished content comes back too.
      </p>
      <DemoBlock
        title="fetchPageBySlug with a preview flag"
        description="Same endpoint; preview just drops the status filter."
        code={PREVIEW_FETCH_CODE}
      />

      <h3 className="pt-2 text-base font-semibold text-slate-800">2. Detect the flag and swap content</h3>
      <p>
        Read the query string after mount, and only fetch when preview is on. The statically built
        page renders first; the live copy replaces it once the request resolves.
      </p>
      <DemoBlock
        title="React: swap in live content when previewing"
        description="Reads window.location.search in useEffect, then re-renders with the fetched page."
        code={PREVIEW_REACT_CODE}
      />

      <h3 className="pt-2 text-base font-semibold text-slate-800">Next.js gotcha</h3>
      <p>
        If your site is on Next.js App Router, resist the obvious{' '}
        <Code>useSearchParams()</Code>. Any component using it opts its whole route out of static
        prerendering unless you wrap it in <Code>&lt;Suspense&gt;</Code>, which breaks{' '}
        <Code>next build</Code>. Reading <Code>window.location.search</Code> inside{' '}
        <Code>useEffect</Code> avoids that entirely and behaves the same.
      </p>
      <DemoBlock
        title="Why not useSearchParams()"
        description="The prerender error this avoids."
        code={PREVIEW_NEXT_NOTE_CODE}
      />

      <p className="text-sm text-slate-600">
        Note: preview URLs are meant for authors reviewing changes, not for public links. Because
        they bypass the <Code>status: 'live'</Code> filter, anyone with the URL can see drafts of
        that page.
      </p>
    </Section>
  );
}

export default PreviewMode;
