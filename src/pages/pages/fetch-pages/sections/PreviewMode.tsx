import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { BlockCallout } from '../../../blocks/shared/BlockCallout';
import ApiTable from '../../../../components/ApiTable';
import {
  PREVIEW_FETCH_CODE,
  PREVIEW_REACT_CODE,
  PREVIEW_NEXT_NOTE_CODE,
} from '../snippets';

/**
 * Documents the `?mode=preview` convention: when a page URL carries it, the
 * site fetches that slug from the API at runtime instead of serving the copy
 * baked into its static build.
 */
function PreviewMode() {
  return (
    <Section id="preview-mode" title="Preview mode">
      <p>
        <strong>The problem:</strong> most sites build Page Pilot content into static pages, so
        visitors get fast, cached HTML. The trade-off is staleness â€” edit a page in Page Pilot and
        the live site keeps serving the previous build until it redeploys. Authors have no way to
        see how a change actually looks on the real site until then.
      </p>
      <p>
        <strong>The fix:</strong> a query parameter that opts one page view out of the static copy.
        Append <Code>?mode=preview</Code> to any page URL and your site fetches that slug from the
        API at runtime, rendering the latest saved content â€” including edits still in draft. Page
        Pilot hands authors this URL in the publish dialog, next to the normal live URL.
      </p>
      <p>
        Nothing changes for real visitors. Without the parameter the static page renders exactly as
        before, so caching, build output, and SEO are untouched.
      </p>

      <ApiTable
        rows={[
          {
            property: 'mode',
            description:
              'Query parameter on any page URL. When set to "preview", the page is fetched from the API at runtime instead of served from the static build.',
            type: "'preview'",
            default: 'â€”',
          },
          {
            property: 'includes',
            description:
              'Request body field. Pass an empty array in preview so the status filter is dropped and unpublished content is returned.',
            type: 'object[]',
            default: "[{ filter: { status: 'live' } }]",
          },
        ]}
      />

      <p>
        <strong>Step 1 â€” fetch without the live filter.</strong> The endpoint is the same one you
        already use. The only difference is <Code>includes</Code>: normally you pass{' '}
        <Code>{`[{ filter: { status: 'live' } }]`}</Code> so drafts never reach visitors, but in
        preview you pass an empty array so unpublished content comes back too.
      </p>
      <DemoBlock
        title="fetchPageBySlug with a preview flag"
        description="Same endpoint as always â€” preview just drops the status filter."
        code={PREVIEW_FETCH_CODE}
        language="js"
      />

      <p>
        <strong>Step 2 â€” detect the flag and swap the content.</strong> Read the query string after
        mount and fetch only when preview is on. The statically built page paints first, then the
        live copy replaces it once the request resolves, so there is no blank screen while the
        request is in flight.
      </p>
      <DemoBlock
        title="Swap in live content when previewing"
        description="Reads window.location.search inside useEffect, then re-renders with the fetched page."
        code={PREVIEW_REACT_CODE}
        language="tsx"
      />

      <BlockCallout title="Next.js: do not reach for useSearchParams()" variant="warning">
        On the App Router, any component calling <Code>useSearchParams()</Code> opts its entire
        route out of static prerendering unless it sits inside a <Code>&lt;Suspense&gt;</Code>{' '}
        boundary â€” and <Code>next build</Code> fails outright with{' '}
        <em>"useSearchParams() should be wrapped in a suspense boundary"</em>. Reading{' '}
        <Code>window.location.search</Code> inside <Code>useEffect</Code> sidesteps the bailout
        entirely and behaves identically.
      </BlockCallout>
      <DemoBlock
        title="The prerender error this avoids"
        code={PREVIEW_NEXT_NOTE_CODE}
        language="js"
      />

      <BlockCallout title="Preview URLs expose drafts" variant="info">
        Because preview bypasses the <Code>status: 'live'</Code> filter, anyone holding the URL can
        read unpublished content for that page. Treat these links as internal review tools, not as
        something to share publicly or list in a sitemap.
      </BlockCallout>
    </Section>
  );
}

export default PreviewMode;

