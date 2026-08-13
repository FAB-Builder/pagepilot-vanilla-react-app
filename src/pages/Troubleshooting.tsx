import DocLayout, { type DocSection } from '../components/DocLayout';
import CodeSnippet from '../components/CodeSnippet';
import { AHD_API_HOST } from '../lib/ahd';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'nothing-showing', label: 'Nothing is showing at all' },
  { id: 'tours-tooltips', label: 'Tours & Tooltips' },
  { id: 'app-banner', label: 'App Banner' },
  { id: 'demos', label: 'Demos' },
  { id: 'context-help-menu', label: 'Context Help Menu' },
  { id: 'render-content', label: 'Rendering page content safely' },
  { id: 'spa-routing', label: 'SPA routing (React Router)' },
  { id: 'caching', label: 'Stale or cached content' },
  { id: 'testing', label: 'Testing without affecting visitors' },
];

const CHECKLIST_CODE = `import { useEffect } from 'react';
import AHDjs from 'ahdjs';

useEffect(() => {
  const ahdJs = new AHDjs(undefined, {
    applicationId: 'YOUR_APPLICATION_ID',
    apiHost: '${AHD_API_HOST}',
    visitorId: 'visitor-id',
    showProgressbar: false,
  });

  (async () => {
    await ahdJs.initializeSiteMap();
    await ahdJs.showHighlights('/target-page', true);
  })();
}, []);`;

const CLEANUP_CODE = `const ahdRef = useRef<AhdInstance | null>(null);

useEffect(() => {
  let cancelled = false;

  (async () => {
    const ahd = createAhd({ applicationId: 'YOUR_APPLICATION_ID' });
    ahdRef.current = ahd;
    await ahd.initializeSiteMap(false);
    if (!cancelled) await ahd.showHighlights('/target-page', true);
  })();

  return () => {
    cancelled = true;
    ahdRef.current?.stop();
  };
}, []);`;

const BANNER_DIV_CODE = `function AppBannerSlot() {
  useEffect(() => {
    (async () => {
      const ahd = AHDjsService.getInstance().init('visitor-id', 'YOUR_APPLICATION_ID');
      await ahd.initializeSiteMap(false);
      await ahd.renderAppBanner('FAB_BANNER_TYPE_SIMPLE', true);
    })();
  }, []);

  return <div id="FAB_BANNER_TYPE_SIMPLE" />;
}`;

const CSS_LEAK_BEFORE = `import DOMPurify from 'dompurify';

function PageContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}`;

const CSS_LEAK_AFTER = `import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

function PageContent({ html }: { html: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const root = hostRef.current.shadowRoot ?? hostRef.current.attachShadow({ mode: 'open' });
    root.innerHTML = DOMPurify.sanitize(html);
  }, [html]);

  return <div ref={hostRef} />;
}`;

const OWN_CSS_OVERRIDE_CODE = `import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

function PageContent({ html }: { html: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const root = hostRef.current.shadowRoot ?? hostRef.current.attachShadow({ mode: 'open' });
    root.innerHTML = DOMPurify.sanitize(html);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pagePilotOverrides.css';
    root.appendChild(link);
  }, [html]);

  return <div ref={hostRef} />;
}`;

const OWN_CSS_FILE = `h1, h2, h3 { font-family: 'Inter', sans-serif; }
a { color: #4f46e5; }
table { border: 1px solid #e2e8f0; }`;

const ROUTER_EFFECT_CODE = `// A minimal effect that re-runs showHighlights on every
// navigation, so tours/tooltips register for the page you land on —
// not just the one the app started on.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createAhd } from '../lib/ahd';

function TourGate() {
  const location = useLocation();
  const ahd = createAhd({ applicationId: 'YOUR_APPLICATION_ID' });

  useEffect(() => {
    (async () => {
      await ahd.initializeSiteMap(false);
      await ahd.showHighlights(location.pathname, true);
    })();
  }, [location.pathname]);

  return null;
}`;

function Troubleshooting() {
  return (
    <DocLayout title="Troubleshooting" sections={SECTIONS}>
      <article className="">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold">Troubleshooting</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Fixes for the problems people actually hit wiring Page Pilot into a React app —{' '}
            <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              ahdjs
            </code>{' '}
            not rendering, tours/tooltips missing after a route change, and banners showing stale
            content. Each entry names the likely cause and the exact fix.
          </p>
        </header>

        <section id="overview" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">Overview</h2>
          <p className="leading-relaxed text-slate-600">
            Tours, Tooltips, and App Banners are all delivered by the same{' '}
            <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              ahdjs
            </code>{' '}
            client — one instance, created once with your{' '}
            <code className="font-mono text-[13px]">applicationId</code>. Almost every integration
            bug in a React app comes down to one of three things: the client is created more than
            once with different config, a method is called before its target element exists in the
            DOM, or nothing re-runs the fetch when React Router changes the page without a full
            reload.
          </p>
        </section>

        <section id="nothing-showing" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Nothing is showing at all
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            Work through this before anything more specific below.
          </p>
          <ol className="mt-2 space-y-3 leading-relaxed text-slate-600">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                1
              </span>
              <span>
                <strong>Check the browser console.</strong> A thrown error inside{' '}
                <code className="font-mono text-[13px]">initializeSiteMap()</code> or{' '}
                <code className="font-mono text-[13px]">showHighlights()</code> stops everything
                after it — since these are awaited calls, an unhandled rejection silently ends the
                setup with nothing rendered and no visible message unless you're looking at the
                console.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                2
              </span>
              <span>
                <strong>Confirm </strong>
                <code className="font-mono text-[13px]">applicationId</code>
                <strong> is real, not a leftover placeholder</strong> like{' '}
                <code className="font-mono text-[13px]">'YOUR_APPLICATION_ID'</code>. Copy it fresh
                from Page Pilot → Site Integration.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                3
              </span>
              <span>
                <strong>Confirm the target page slug matches the current route, and starts with{' '}
                <code className="font-mono text-[13px]">/</code>.</strong> Page Pilot matches by
                path only — <code className="font-mono text-[13px]">/pricing</code>, not the full
                URL and not <code className="font-mono text-[13px]">pricing</code> without the
                leading slash.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                4
              </span>
              <span>
                <strong>Confirm the content is Live in Page Pilot</strong>, not Draft. Draft content
                is never sent to the running client.
              </span>
            </li>
          </ol>
          <div className="mt-4">
            <CodeSnippet code={CHECKLIST_CODE} language="tsx" />
          </div>
        </section>

        <section id="tours-tooltips" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Tours &amp; Tooltips
          </h2>

          <h3 className="mt-6 font-semibold text-slate-800">
            A step targets the wrong element, or nothing at all
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            <code className="font-mono text-[13px]">showHighlights()</code> looks up the target
            selector at call time; if no match, the step still renders centered instead of anchored
            rather than being skipped. Most common cause: calling{' '}
            <code className="font-mono text-[13px]">showHighlights()</code> from a component that
            mounts before its target (e.g. behind a conditional render, or arrives after an API
            response). Fix: call it from the{' '}
            <code className="font-mono text-[13px]">useEffect</code> of the component that's
            actually last to render the target elements.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Tour/tooltip keeps running after I navigate away, or errors after unmount
          </h3>
          <p className="mt-2 mb-3 leading-relaxed text-slate-600">
            Both init calls are async; guard with a <code className="font-mono text-[13px]">cancelled</code>{' '}
            flag and call <code className="font-mono text-[13px]">.stop()</code> in the effect's
            cleanup function.
          </p>
          <CodeSnippet code={CLEANUP_CODE} language="tsx" />

          <h3 className="mt-6 font-semibold text-slate-800">
            Tested it once, and now it never shows again
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            "Show only once" is tracked per <code className="font-mono text-[13px]">visitorId</code>,
            not a parameter of <code className="font-mono text-[13px]">showHighlights()</code>. For
            repeated testing, use a different <code className="font-mono text-[13px]">visitorId</code>{' '}
            or a private/incognito window; check <code className="font-mono text-[13px]">visitorId</code>{' '}
            isn't hardcoded to the same placeholder for every visitor.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Tour/tooltip appears twice, or step content looks duplicated
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            Usually the client/<code className="font-mono text-[13px]">showHighlights()</code> was
            called more than once without stopping the previous run — e.g. called in both a parent
            layout and a child page, or fast refresh re-running an effect without matching cleanup.
            Keep one place responsible for calling{' '}
            <code className="font-mono text-[13px]">showHighlights()</code> per navigation, always
            paired with <code className="font-mono text-[13px]">.stop()</code> on cleanup.
          </p>
        </section>

        <section id="app-banner" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">App Banner</h2>

          <h3 className="mt-6 font-semibold text-slate-800">
            Banner never renders, no error either
          </h3>
          <p className="mt-2 mb-3 leading-relaxed text-slate-600">
            <code className="font-mono text-[13px]">renderAppBanner(identifier, refetch)</code>{' '}
            renders into an existing <code className="font-mono text-[13px]">{'<div id="{identifier}" />'}</code>{' '}
            — it does not create it. If the div isn't in the DOM yet (behind a conditional render, or
            the parent mounts before children), the call succeeds but paints nowhere. Check the{' '}
            <code className="font-mono text-[13px]">id</code> matches exactly, including casing.
          </p>
          <CodeSnippet code={BANNER_DIV_CODE} language="tsx" />

          <h3 className="mt-6 font-semibold text-slate-800">
            Banner works on one page, not another that reuses the same component
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            The singleton pattern{' '}
            <code className="font-mono text-[13px]">
              AHDjsService.getInstance().init(visitorId, applicationId)
            </code>{' '}
            only creates a new client when <code className="font-mono text-[13px]">visitorId</code>/
            <code className="font-mono text-[13px]">applicationId</code> actually change. Bug case:
            different parts of the app pass slightly different values (placeholder vs real id) → two
            clients that don't share cache/state.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Banner shows on desktop but not mobile (or the reverse)
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            Banners can be scoped to a device in Page Pilot; check the Device setting rather than
            assuming it's broken, and note resizing a desktop browser isn't the same as real device
            emulation.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            A modal-type banner never appears, but the call doesn't error
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            Simple/carousel/floater banners render into the container div; a{' '}
            <code className="font-mono text-[13px]">modal</code> banner is the exception — it
            renders as a page-level overlay and doesn't need/use a container div. If you copied the
            "add a div" pattern while switching to modal, that div is simply unused.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Second banner on the same page doesn't show, or overwrites the first
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            Each call targets one identifier/container; multiple banners (e.g. mobile/desktop pair)
            each need their own div and their own call. Run calls in parallel with{' '}
            <code className="font-mono text-[13px]">Promise.all()</code> rather than sequential
            awaits.
          </p>
        </section>

        <section id="demos" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">Demos</h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            Demos aren't delivered through the <code className="font-mono text-[13px]">ahdjs</code>{' '}
            client — they're a plain <code className="font-mono text-[13px]">{'<iframe>'}</code>{' '}
            pointed at <code className="font-mono text-[13px]">pagepilot-demo-viewer-prod.web.app</code>
            , so failure modes differ.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Iframe shows blank, or a permanent loading state
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            Check <code className="font-mono text-[13px]">tid</code> (workspace id) and{' '}
            <code className="font-mono text-[13px]">did</code> (demo record id) in the iframe{' '}
            <code className="font-mono text-[13px]">src</code> are correct — a wrong/missing id
            fails invisibly inside the iframe's own app. Also confirm demo status; a share-link URL
            hardcodes <code className="font-mono text-[13px]">status=live</code>, so an unpublished
            (draft) demo won't load there even if it looks fine in the editor.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Want to hide the embed wrapper until the demo is actually ready
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            The iframe posts status events via a <code className="font-mono text-[13px]">message</code>{' '}
            listener: <code className="font-mono text-[13px]">DEMO_LOAD_STARTED</code>,{' '}
            <code className="font-mono text-[13px]">DEMO_LOADING</code>,{' '}
            <code className="font-mono text-[13px]">DEMO_STATUS</code> (carries{' '}
            <code className="font-mono text-[13px]">status: 'live' | 'draft'</code>),{' '}
            <code className="font-mono text-[13px]">DEMO_LOADED</code>. Check you're filtering on{' '}
            <code className="font-mono text-[13px]">event.data.source === 'pagepilot-demo-viewer'</code>{' '}
            (otherwise the handler fires for unrelated postMessage traffic); remove the listener in
            the effect's cleanup function.
          </p>
        </section>

        <section id="context-help-menu" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Context Help Menu
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            Not part of the <code className="font-mono text-[13px]">ahdjs</code> client — two plain
            REST calls: <code className="font-mono text-[13px]">GET /menu-by-name/{'{name}'}</code>{' '}
            for the menu tree, then <code className="font-mono text-[13px]">GET /pagebypath/{'{slug}'}</code>{' '}
            for a linked page's content on click.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Menu loads empty, or the fetch 404s
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            <code className="font-mono text-[13px]">menu-by-name</code> matches the exact menu name
            from Page Pilot → Menus — check typos/trailing whitespace; confirm the workspace id
            segment in the URL isn't a placeholder.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Clicking a menu item shows a blank page panel
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            <code className="font-mono text-[13px]">pagebypath</code> expects the page's slug (the{' '}
            <code className="font-mono text-[13px]">href</code> stored on the menu item), not a full
            URL. If the page was renamed/slug changed after the menu item was created, the link can
            point to a stale slug.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">Rendering the returned page content</h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            Each section's <code className="font-mono text-[13px]">content</code> field is raw HTML
            — always sanitize (e.g. <code className="font-mono text-[13px]">DOMPurify.sanitize()</code>
            ) before setting it as <code className="font-mono text-[13px]">innerHTML</code> /{' '}
            <code className="font-mono text-[13px]">dangerouslySetInnerHTML</code>. If styling looks
            stripped, check whether the sanitizer's default config removes{' '}
            <code className="font-mono text-[13px]">style</code> attributes/tags. If instead the
            content's own styling collides with app CSS, see "Rendering page content safely" below.
          </p>
        </section>

        <section id="render-content" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Rendering page content safely
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            <strong>The issue:</strong> a page's body (from{' '}
            <code className="font-mono text-[13px]">sections[].content</code>, or the Context Help
            Menu's page content) is raw HTML from the Page Pilot editor with embedded{' '}
            <code className="font-mono text-[13px]">{'<style>'}</code> blocks. Rendering it with{' '}
            <code className="font-mono text-[13px]">dangerouslySetInnerHTML</code> directly shares
            the document with the app's CSS — either side can win; shows up as global reset/sticky
            header breaking, or Tailwind classes silently overriding content styling.
          </p>
          <p className="mb-2 text-sm font-medium text-slate-700">
            Before — same document, styles collide
          </p>
          <CodeSnippet code={CSS_LEAK_BEFORE} language="tsx" />

          <p className="mt-6 mb-4 leading-relaxed text-slate-600">
            <strong>The fix:</strong> mount content in a Shadow DOM instead of the light DOM — a real
            style boundary in both directions.
          </p>
          <p className="mb-2 text-sm font-medium text-slate-700">
            After — isolated in a shadow root
          </p>
          <CodeSnippet code={CSS_LEAK_AFTER} language="tsx" />

          <p className="mt-6 leading-relaxed text-slate-600">
            <strong>Trade-off:</strong> the app's own Tailwind/prose wrapper also stops reaching in,
            since Shadow DOM blocks inherited styling from outside (CSS custom properties like{' '}
            <code className="font-mono text-[13px]">var(--foo)</code> are the exception — they still
            pierce the boundary). If baseline typography is needed, inject a small stylesheet as a{' '}
            <code className="font-mono text-[13px]">{'<style>'}</code> tag inside the shadow root
            before the HTML (e.g. <code className="font-mono text-[13px]">fetch()</code> a static CSS
            file once and cache the promise).
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Reminder: always sanitize with <code className="font-mono text-[13px]">DOMPurify</code>{' '}
            before assigning to <code className="font-mono text-[13px]">innerHTML</code> — Shadow DOM
            isolates styling, it is not an XSS sandbox.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">
            Overriding Page Pilot's own styling
          </h3>
          <p className="mt-2 mb-4 leading-relaxed text-slate-600">
            Isolation cuts both ways — the app's CSS can't reach in either, so you can't override the
            content's look from outside normally. Instead, load your own stylesheet <em>into</em> the
            same shadow root, after the content, so it loads last and wins.
          </p>
          <p className="mb-2 text-sm font-medium text-slate-700">
            Load your own stylesheet into the shadow root, after the content
          </p>
          <CodeSnippet code={OWN_CSS_OVERRIDE_CODE} language="tsx" />
          <p className="mt-4 mb-2 text-sm font-medium text-slate-700">
            public/pagePilotOverrides.css
          </p>
          <CodeSnippet code={OWN_CSS_FILE} language="css" />
          <p className="mt-4 leading-relaxed text-slate-600">
            Plain CSS, no build step. Only targets elements Page Pilot actually renders — h1–h6, p,
            table, a, code, img — since it's scoped inside this content's shadow root.
          </p>
        </section>

        <section id="spa-routing" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            SPA routing (React Router)
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            The gotcha most specific to SPAs and most commonly missed: calling{' '}
            <code className="font-mono text-[13px]">showHighlights()</code> once in the root
            component's <code className="font-mono text-[13px]">useEffect</code> only registers
            content for whichever route the app loaded on first. React Router navigates without a
            full reload, so nothing automatically re-checks Page Pilot for the new route's
            tours/tooltips/banners unless you explicitly re-run it on every navigation.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-slate-600">
            Re-run the fetch on every route change by watching{' '}
            <code className="font-mono text-[13px]">location.pathname</code> from{' '}
            <code className="font-mono text-[13px]">useLocation()</code>:
          </p>
          <CodeSnippet code={ROUTER_EFFECT_CODE} language="tsx" />
        </section>

        <section id="caching" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Stale or cached content
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            The client caches fetches in the visitor's browser so repeat page loads don't refetch.
            If a published change still shows old content, checklist:
          </p>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
            <li>Confirm the change was actually published (status Live), not just saved as a draft.</li>
            <li>
              Pass <code className="font-mono text-[13px]">true</code> for the{' '}
              <code className="font-mono text-[13px]">refetch</code> argument —{' '}
              <code className="font-mono text-[13px]">showHighlights(slug, true)</code> /{' '}
              <code className="font-mono text-[13px]">renderAppBanner(identifier, true)</code> —
              during development/testing so you're not fighting your own browser cache.
            </li>
            <li>
              Test in a private/incognito window, which starts with no cache, rather than a regular
              profile that may hold an older cached response.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-slate-600">
            If it's still stale in a genuinely fresh incognito window well after publishing, that's
            worth reporting rather than assuming it's a local caching artifact.
          </p>
        </section>

        <section id="testing" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Testing without affecting visitors
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            "Show only once" and cached content are tied to the browser being tested in, not Page
            Pilot config — the fastest clean slate is a fresh environment, not toggling dashboard
            settings.
          </p>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
            <li>Use a private/incognito window for each test pass.</li>
            <li>
              Or clear browser site data for the domain between tests (DevTools → Application →
              Clear storage) to keep using the regular window.
            </li>
            <li>
              Pass a distinct <code className="font-mono text-[13px]">visitorId</code> when
              repeatedly testing "show once" behavior, so each run looks like a new visitor.
            </li>
          </ul>
        </section>
      </article>
    </DocLayout>
  );
}

export default Troubleshooting;
