
import DocLayout, { type DocSection } from '../components/DocLayout';
import CodeSnippet from '../components/CodeSnippet';
import AiPromptBlock from '../components/AiPromptBlock';
import { AHD_API_HOST } from '../lib/ahd';

/** Left-sidebar sections — scoped to Troubleshooting, in reading order. */
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

const FIX_RENDER_CONTENT_AI_PROMPT = `You are helping me fix a bug in how my React app renders raw HTML content from the Page Pilot API. Follow every instruction below.

THE BUG
- Content comes from Page Pilot as a raw HTML string (e.g. GET /pagebypath/{slug} returns { sections: [{ content }] }).
- That HTML ships with its own embedded <style> tags. My component renders it with dangerouslySetInnerHTML
  straight into the page, so those styles share the same document as my app's CSS — either side can win.
  This shows up as a broken layout, a broken sticky header, or my own Tailwind classes silently
  overriding the content's intended styling.

FIND AND FIX
Find the component in my codebase that renders this Page Pilot content (search for
\`dangerouslySetInnerHTML\` near a \`content\` or \`html\` prop, or a fetch to \`/pagebypath/\`). Rewrite it
so it becomes a component called RenderContent({ html }: { html: string }) that:

1. Sanitizes the HTML with DOMPurify.sanitize() before it ever touches the DOM. Shadow DOM isolates
   styling only — it is not an XSS sandbox, so sanitization is still required.

2. Mounts the sanitized content in a Shadow DOM instead of the light DOM, so styles cannot leak in
   either direction:
   - Use a ref on a host <div>.
   - In a useEffect, get \`host.shadowRoot ?? host.attachShadow({ mode: 'open' })\` and set
     \`root.innerHTML\` to the sanitized HTML.
   - Guard against double-attaching on the first render with an \`isFirstRender\` ref: if it's the
     first render and \`host.shadowRoot\` already exists, skip re-attaching.

3. Also renders a declarative shadow root for first paint, so there's real content visible before
   hydration/JS runs instead of an empty div:
   - On the host div, set \`suppressHydrationWarning\`.
   - Use \`dangerouslySetInnerHTML\` with \`<template shadowrootmode="open">\${sanitizedHtml}</template>\`.

4. Supports loading a baseline/override stylesheet INTO the shadow root (not the outer document),
   for cases where the content needs consistent typography or I want to override Page Pilot's own
   styling from the outside (which normal CSS can no longer do once it's isolated in shadow DOM):
   - Build the shadow content as \`<link rel="stylesheet" href="/my-overrides.css">\${sanitizedHtml}\`
     — the stylesheet goes BEFORE the content string, not after, so the content's own inline <style>
     tags still win on conflicts (later rules win at equal specificity) while my stylesheet fills in
     everything the content doesn't already style.

DELIVERABLE
Replace my existing component with a single, complete RenderContent.tsx implementing all 4 points
above. Add short comments only where the reasoning isn't obvious from the code (e.g. why the
isFirstRender guard exists, why the stylesheet goes before the content).`;

const CHECKLIST_CODE = `// main.tsx — confirm this actually runs and doesn't throw
import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

const ahdJs = AHDjs(undefined, {
  applicationId: 'YOUR_APPLICATION_ID', // from Page Pilot → Site Integration
  apiHost: '${AHD_API_HOST}',
  visitorId: currentUser.id, // stable per-user id, not a placeholder
  showProgressbar: false,
});

await ahdJs.initializeSiteMap(false);
await ahdJs.showHighlights('/your-target-page', true); // must start with "/"`;

const ROUTER_WATCH_CODE = `// A minimal effect hook that re-runs showHighlights on every
// navigation, so tours/tooltips register for the page you land on —
// not just the one the app started on.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createAhd } from '@/lib/ahd';

export function ShowHighlightsOnRouteChange() {
  const location = useLocation();
  const ahd = createAhd({ applicationId: 'YOUR_APPLICATION_ID' });

  useEffect(() => {
    const initAndShow = async () => {
      await ahd.initializeSiteMap(false);
      await ahd.showHighlights(location.pathname, true);
    };
    initAndShow();
  }, [location.pathname]);

  return null;
}`;

const BANNER_DIV_CODE = `// App component or page component
import { useEffect } from 'react';
import AHDjsService from '@/services/AHDjsService';

export function MyPage() {
  useEffect(() => {
    const initBanner = async () => {
      const ahdJs = AHDjsService.getInstance().init(currentUser.id, 'YOUR_APPLICATION_ID');
      // forceRefresh = true bypasses this visitor's local cache for this call
      await ahdJs.renderAppBanner('FAB_BANNER_TYPE_SIMPLE', true);
    };
    initBanner();
  }, []);

  return (
    <>
      {/* The id MUST match the identifier exactly, and this element must
          already be in the DOM before renderAppBanner() runs. */}
      <div id="FAB_BANNER_TYPE_SIMPLE" />
      {/* rest of page */}
    </>
  );
}`;

const CSS_LEAK_BEFORE = `import DOMPurify from 'dompurify';

interface Props {
  html: string;
}

export function RenderContent({ html }: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
  );
}`;

const CSS_LEAK_AFTER = `import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

interface Props {
  html: string;
}

export function RenderContent({ html }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const safeHtml = DOMPurify.sanitize(html);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Skip re-attaching on first mount: the declarative shadow root below
    // (shadowrootmode="open") is already there from server-rendered HTML.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (host.shadowRoot) return;
    }
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = safeHtml;
  }, [safeHtml]);

  return (
    <div
      ref={hostRef}
      suppressHydrationWarning
      // Declarative shadow DOM: gives first paint real content before
      // hydration/JS runs, instead of an empty div until useEffect fires.
      dangerouslySetInnerHTML={{
        __html: \`<template shadowrootmode="open">\${safeHtml}</template>\`,
      }}
    />
  );
}`;

const OWN_CSS_OVERRIDE_CODE = `import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

interface Props {
  html: string;
}

export function RenderContent({ html }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  // Your stylesheet goes BEFORE the content in the string, so the
  // content's own <style> tags come after and win the cascade.
  const shadowHtml = \`<link rel="stylesheet" href="/pagePilotOverrides.css">\${DOMPurify.sanitize(html)}\`;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (host.shadowRoot) return;
    }
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = shadowHtml;
  }, [shadowHtml]);

  return (
    <div
      ref={hostRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: \`<template shadowrootmode="open">\${shadowHtml}</template>\`,
      }}
    />
  );
}`;

const OWN_CSS_FILE = `h1, h2, h3 { font-family: 'Inter', sans-serif; }
a { color: #4f46e5; }
table { border: 1px solid #e2e8f0; }`;

export default function Troubleshooting() {
  return (
    <DocLayout title="Troubleshooting" sections={SECTIONS}>
      <article id="troubleshooting-article">
        <header id="troubleshooting-header" className="mb-8 border-b border-slate-200 pb-6">
          <h1 id="troubleshooting-title" className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Troubleshooting
          </h1>
          <p id="troubleshooting-intro" className="mt-3 text-lg leading-relaxed text-slate-600">
            Fixes for the problems people actually hit wiring Page Pilot into a React app —{' '}
            <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              ahdjs
            </code>{' '}
            not rendering, tours/tooltips missing after a route change, and banners showing stale content. Each entry
            names the likely cause and the exact fix.
          </p>
        </header>

        {/* Overview */}
        <section id="overview" className="mb-12 scroll-mt-24">
          <h2 id="overview-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Overview
          </h2>
          <div id="overview-body" className="space-y-3 leading-relaxed text-slate-600">
            <p id="overview-text">
              Tours, Tooltips, and App Banners are all delivered by the same{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                ahdjs
              </code>{' '}
              client — one instance, created once with your{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                applicationId
              </code>
              . Almost every integration bug in a React app comes down to one of three things: the client is created
              more than once with different config, a method is called before its target element exists in the DOM, or
              nothing re-runs the fetch when React Router changes the page without a full reload.
            </p>
          </div>
        </section>

        {/* Nothing is showing at all */}
        <section id="nothing-showing" className="mb-12 scroll-mt-24">
          <h2 id="nothing-showing-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Nothing is showing at all
          </h2>
          <div id="nothing-showing-body" className="space-y-3 leading-relaxed text-slate-600">
            <p id="nothing-showing-text">Work through this before anything more specific below.</p>
            <ol id="nothing-showing-steps" className="my-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                  1
                </span>
                <span>
                  <strong className="text-ink">Check the browser console.</strong> A thrown error inside{' '}
                  <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                    initializeSiteMap()
                  </code>{' '}
                  or{' '}
                  <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                    showHighlights()
                  </code>{' '}
                  stops everything after it — since these are awaited calls, an unhandled rejection silently ends the
                  setup with nothing rendered and no visible message unless you're looking at the console.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                  2
                </span>
                <span>
                  <strong className="text-ink">
                    Confirm{' '}
                    <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                      applicationId
                    </code>{' '}
                    is real, not a leftover placeholder
                  </strong>{' '}
                  like{' '}
                  <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                    'YOUR_APPLICATION_ID'
                  </code>
                  . Copy it fresh from Page Pilot → Site Integration.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                  3
                </span>
                <span>
                  <strong className="text-ink">
                    Confirm the target page slug matches the current route, and starts with{' '}
                    <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                      /
                    </code>
                    .
                  </strong>{' '}
                  Page Pilot matches by path only —{' '}
                  <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                    /pricing
                  </code>
                  , not the full URL and not{' '}
                  <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                    pricing
                  </code>{' '}
                  without the leading slash.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                  4
                </span>
                <span>
                  <strong className="text-ink">Confirm the content is Live in Page Pilot</strong>, not Draft. Draft
                  content is never sent to the running client.
                </span>
              </li>
            </ol>
            <CodeSnippet code={CHECKLIST_CODE} language="tsx" />
          </div>
        </section>

        {/* Tours & Tooltips */}
        <section id="tours-tooltips" className="mb-12 scroll-mt-24">
          <h2 id="tours-tooltips-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Tours & Tooltips
          </h2>
          <div id="tours-tooltips-body" className="space-y-6 leading-relaxed text-slate-600">
            <div id="tt-timing" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">A step targets the wrong element, or nothing at all</h3>
              <p className="mt-2 text-sm">
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  showHighlights()
                </code>{' '}
                looks up the target element's selector at call time. If it doesn't find a match, that step still
                renders — just centered on screen instead of anchored, rather than being skipped — which reads as "the
                tooltip is in the wrong place" rather than an obvious error. The most common cause in a React app is
                calling{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  showHighlights()
                </code>{' '}
                from an effect that runs before the actual target element does (e.g. it's rendered by a child
                component in a conditional, or arrives after an API response). Call it from the{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  useEffect
                </code>{' '}
                of the component that's actually the last one to render the target elements — not necessarily the
                top-level page.
              </p>
            </div>

            <div id="tt-unmount" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Tour/tooltip keeps running after I navigate away, or errors after unmount</h3>
              <p className="mt-2 text-sm">
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  initializeSiteMap()
                </code>{' '}
                and{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  showHighlights()
                </code>{' '}
                are both async. If the component unmounts (route change) before they resolve, code that runs
                afterward can touch elements that are already gone. Guard with a mounted flag and always call{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  .stop()
                </code>{' '}
                in the useEffect cleanup:
              </p>
              <CodeSnippet
                code={`let ahd: AhdInstance | null = null;

useEffect(() => {
  let isMounted = true;

  const initAndShow = async () => {
    ahd = createAhd({ applicationId: 'YOUR_APPLICATION_ID' });
    await ahd.initializeSiteMap(false);
    if (isMounted) await ahd.showHighlights('/target-page', true);
  };

  initAndShow();

  return () => {
    isMounted = false;
    ahd?.stop();
  };
}, []);`}
                language="tsx"
              />
            </div>

            <div id="tt-once" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Tested it once, and now it never shows again</h3>
              <p className="mt-2 text-sm">
                "Show only once" is a per-tour/per-tooltip setting in Page Pilot, tracked against the{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  visitorId
                </code>{' '}
                you pass when creating the client — not a parameter of{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  showHighlights()
                </code>
                . For repeated testing, either use a different{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  visitorId
                </code>{' '}
                each time or test in a private/incognito window. Also double-check{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  visitorId
                </code>{' '}
                isn't accidentally hardcoded to the same placeholder string for every visitor in your app — if it is,
                "once per visitor" effectively becomes "once, ever."
              </p>
            </div>

            <div id="tt-duplicate" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Tour/tooltip appears twice, or step content looks duplicated</h3>
              <p className="mt-2 text-sm">
                Usually means the client was created and{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  showHighlights()
                </code>{' '}
                called more than once for the same page without stopping the previous run first — often from calling
                setup in both a parent layout and a child page, or from Hot Module Reload during development re-running{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  useEffect
                </code>{' '}
                without a matching cleanup function. Keep one place in your app responsible for calling{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  showHighlights()
                </code>{' '}
                per navigation (see <a href="#spa-routing" className="text-brand hover:underline">SPA routing</a> below),
                and always pair it with{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  .stop()
                </code>{' '}
                on cleanup.
              </p>
            </div>
          </div>
        </section>

        {/* App Banner */}
        <section id="app-banner" className="mb-12 scroll-mt-24">
          <h2 id="app-banner-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            App Banner
          </h2>
          <div id="app-banner-body" className="space-y-6 leading-relaxed text-slate-600">
            <div id="ab-container" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Banner never renders, no error either</h3>
              <p className="mt-2 text-sm">
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  renderAppBanner(identifier, refetch)
                </code>{' '}
                renders into an existing{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  &lt;div id="{'{identifier}'}" /&gt;
                </code>{' '}
                — it does not create that element for you. If the div isn't in the DOM yet when the call runs
                (common if it's behind a conditional, or the call fires from a parent that mounts before its children),
                the call succeeds but there's nowhere to paint into. Double-check the{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  id
                </code>{' '}
                on the div matches the identifier <em>exactly</em>, including casing.
              </p>
              <CodeSnippet code={BANNER_DIV_CODE} language="tsx" />
            </div>

            <div id="ab-multi-client" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Banner works on one page, not another that reuses the same component</h3>
              <p className="mt-2 text-sm">
                If you're using a singleton pattern like{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  AHDjsService.getInstance().init(visitorId, applicationId)
                </code>
                , the singleton only creates a <em>new</em> underlying client when{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  visitorId
                </code>{' '}
                or{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  applicationId
                </code>{' '}
                actually change — calling{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  init()
                </code>{' '}
                again with the same values reuses the existing client, which is intentional and fine. The bug case is
                the opposite: if different parts of your app pass slightly different values (a placeholder id in one
                component, the real one in another), you end up with two different underlying clients that don't share
                cache or state.
              </p>
            </div>

            <div id="ab-device" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Banner shows on desktop but not mobile (or the reverse)</h3>
              <p className="mt-2 text-sm">
                Banners can be scoped to a device (desktop / tablet / mobile) in Page Pilot. If it's configured for one
                device and you're testing on another — including by resizing a desktop browser window rather than using
                real device emulation — it will correctly not appear. Check the banner's Device setting before assuming
                it's broken.
              </p>
            </div>

            <div id="ab-modal-no-div" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">
                A{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  modal
                </code>
                -type banner never appears, but the call doesn't error
              </h3>
              <p className="mt-2 text-sm">
                Simple, carousel, and floater banners all render into the{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  &lt;div id="{'{identifier}'}" /&gt;
                </code>{' '}
                container you provide. A{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  modal
                </code>{' '}
                banner is the one exception — it renders as a page-level overlay and does <em>not</em> need (or use) a
                matching container div. If you copied the same "add a div with this id" pattern from a simple banner
                while switching a banner's type to modal in Page Pilot, that div is simply unused — the call itself is
                still correct. Confirm the banner's{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  type
                </code>{' '}
                in Page Pilot matches what you expect, and don't rely on an empty container div to prove a modal banner
                is broken.
              </p>
            </div>

            <div id="ab-refetch-args" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Second banner on the same page doesn't show, or overwrites the first</h3>
              <p className="mt-2 text-sm">
                Each call to{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  renderAppBanner()
                </code>{' '}
                targets one identifier and one container. If you have multiple banners on a page (e.g. a mobile and a
                desktop variant, as in a mobile/desktop banner pair), each needs its own{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  &lt;div id="..." /&gt;
                </code>{' '}
                and its own call with that banner's own identifier — calling{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  renderAppBanner()
                </code>{' '}
                once with the wrong identifier, or reusing one container id for two different banners, means only one
                ever renders. Run the calls in parallel with{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  Promise.all()
                </code>{' '}
                rather than sequentially awaiting each one, so a slow or failed fetch for one banner doesn't delay the
                other.
              </p>
            </div>
          </div>
        </section>

        {/* Demos */}
        <section id="demos" className="mb-12 scroll-mt-24">
          <h2 id="demos-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Demos
          </h2>
          <div id="demos-body" className="space-y-6 leading-relaxed text-slate-600">
            <p id="demos-text">
              Demos are the one experience that isn't delivered through the{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                ahdjs
              </code>{' '}
              client at all — they're a plain{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                &lt;iframe&gt;
              </code>{' '}
              pointed at a separate viewer app{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                pagepilot-demo-viewer-prod.web.app
              </code>
              , so the failure modes are different from Tours/Tooltips/Banners.
            </p>

            <div id="demos-blank" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Iframe shows blank, or a permanent loading state</h3>
              <p className="mt-2 text-sm">
                Check that{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  tid
                </code>{' '}
                (your workspace id) and{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  did
                </code>{' '}
                (the demo record id) in the iframe{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  src
                </code>{' '}
                are both correct — a wrong or missing id fails inside the iframe's own app, invisibly to your page.
                Also confirm the demo's status; the share-link URL hardcodes{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  status=live
                </code>
                , so an unpublished (draft) demo won't load there even though it may look fine inside the Page Pilot
                editor.
              </p>
            </div>

            <div id="demos-visibility" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Want to hide the embed wrapper until the demo is actually ready</h3>
              <p className="mt-2 text-sm">
                The iframe posts status events you can listen for with a{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  message
                </code>{' '}
                event listener:{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  DEMO_LOAD_STARTED
                </code>
                ,{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  DEMO_LOADING
                </code>
                ,{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  DEMO_STATUS
                </code>{' '}
                (carries a{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  status: 'live' | 'draft'
                </code>{' '}
                field), and{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  DEMO_LOADED
                </code>
                . If your visibility logic isn't reacting, check you're filtering on{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  event.data.source === 'pagepilot-demo-viewer'
                </code>{' '}
                — without that guard your handler also fires for unrelated{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  postMessage
                </code>{' '}
                traffic from browser extensions or other embedded iframes on the page, and remember to remove the
                listener in the useEffect cleanup so it doesn't keep firing after the component using it is gone.
              </p>
            </div>
          </div>
        </section>

        {/* Context Help Menu */}
        <section id="context-help-menu" className="mb-12 scroll-mt-24">
          <h2 id="context-help-menu-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Context Help Menu
          </h2>
          <div id="context-help-menu-body" className="space-y-6 leading-relaxed text-slate-600">
            <p id="context-help-menu-text">
              The help menu is also not part of the{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                ahdjs
              </code>{' '}
              client — it's two plain REST calls you make yourself:{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                GET /menu-by-name/{'{name}'}
              </code>{' '}
              to fetch the menu tree, then{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                GET /pagebypath/{'{slug}'}
              </code>{' '}
              to fetch a linked page's content when an item is clicked.
            </p>

            <div id="chm-empty" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Menu loads empty, or the fetch 404s</h3>
              <p className="mt-2 text-sm">
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  menu-by-name
                </code>{' '}
                matches on the menu's exact name as configured in Page Pilot → Menus — check for typos or trailing
                whitespace copied from the dashboard. Also confirm the workspace id segment in the URL path is your
                real workspace id, not a placeholder.
              </p>
            </div>

            <div id="chm-blank-page" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Clicking a menu item shows a blank page panel</h3>
              <p className="mt-2 text-sm">
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  pagebypath
                </code>{' '}
                expects the page's slug (the{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  href
                </code>{' '}
                value stored on the menu item), not a full URL. If the page was renamed or its slug changed after the
                menu item was created, the link can point at a slug that no longer resolves — re-check the menu item's
                target in Page Pilot rather than assuming the fetch code is wrong.
              </p>
            </div>

            <div id="chm-sanitize" className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="font-semibold text-ink">Rendering the returned page content</h3>
              <p className="mt-2 text-sm">
                Each section's{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  content
                </code>{' '}
                field is raw HTML — always sanitize it (e.g. with{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  DOMPurify.sanitize()
                </code>
                ) before setting it as{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  innerHTML
                </code>{' '}
                or binding it with React's{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  dangerouslySetInnerHTML
                </code>
                . If styling looks stripped or broken after rendering, check whether your sanitizer's default config is
                removing{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  style
                </code>{' '}
                attributes or tags along with anything genuinely unsafe — that's a sanitizer configuration choice, not
                a Page Pilot content problem. If instead the content's own styling is colliding with your app's CSS, see{' '}
                <a href="#render-content" className="text-brand hover:underline">
                  Rendering page content safely
                </a>{' '}
                below.
              </p>
            </div>
          </div>
        </section>

        {/* Rendering page content safely */}
        <section id="render-content" className="mb-12 scroll-mt-24">
          <h2 id="render-content-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Rendering page content safely
          </h2>
          <div id="render-content-body" className="space-y-3 leading-relaxed text-slate-600">
            <p id="render-content-text">
              <strong className="text-ink">The issue:</strong> a page's body (from{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                sections[].content
              </code>
              , or the Context Help Menu's page content above) is raw HTML from the Page Pilot editor, and it ships with
              its own embedded{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                &lt;style&gt;
              </code>{' '}
              blocks. Render it with{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                dangerouslySetInnerHTML
              </code>{' '}
              straight into your page and those styles share the same document as your app's CSS — either side can
              win. In practice this shows up as your global reset or a sticky header breaking on pages with content, or
              your Tailwind classes silently overriding the content's intended styling.
            </p>
            <CodeSnippet title="Before — same document, styles collide" code={CSS_LEAK_BEFORE} language="tsx" />
            <p>
              <strong className="text-ink">The fix:</strong> mount the content in a Shadow DOM instead of the light
              DOM. It's a real style boundary in both directions — nothing leaks either way.
            </p>
            <CodeSnippet title="After — isolated in a shadow root" code={CSS_LEAK_AFTER} language="tsx" />
            <p>
              <strong className="text-ink">Trade-off:</strong> your own Tailwind classes /{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                prose
              </code>{' '}
              wrapper around the content also stop reaching in, since Shadow DOM blocks inherited styling from outside
              (CSS custom properties like{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                var(--foo)
              </code>{' '}
              are the one exception — those still pierce the boundary). If the content needs baseline typography, inject
              a small stylesheet as a{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                &lt;style&gt;
              </code>{' '}
              tag inside the shadow root before the HTML, e.g. by{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                fetch()
              </code>
              -ing a static CSS file once and caching the promise.
            </p>
            <p>
              Always sanitize with{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                DOMPurify
              </code>{' '}
              before assigning to{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                innerHTML
              </code>{' '}
              — Shadow DOM isolates styling, it is not an XSS sandbox.
            </p>
            <p>
              <strong className="text-ink">Overriding Page Pilot's own styling:</strong> isolation cuts both ways — your
              app's CSS can no longer reach in either, so you can't override the content's look from outside like normal.
              Instead, load your own stylesheet <em>into</em> the same shadow root, placed before the content in the
              markup. CSS specificity being equal, later rules win — so putting your stylesheet first means the
              content's own inline <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">style</code>{' '}
              tags still win where they conflict, while your rules fill in everything the content doesn't already style.
            </p>
            <CodeSnippet
              title="Load your own stylesheet into the shadow root, before the content"
              code={OWN_CSS_OVERRIDE_CODE}
              language="tsx"
            />
            <CodeSnippet
              title="public/pagePilotOverrides.css"
              code={OWN_CSS_FILE}
              language="css"
            />
            <p className="text-sm text-slate-500">
              Plain CSS, no build step. Only targets elements Page Pilot actually renders — h1–h6, p, table, a, code,
              img — since it's scoped inside this content's shadow root.
            </p>
            <p>
              <strong className="text-ink">Or have AI fix it for you:</strong> hand this prompt to Cursor, Claude,
              or GitHub Copilot and it will rewrite your content-rendering component to add sanitizing, shadow DOM
              mounting, a declarative shadow root for first paint, and the override stylesheet.
            </p>
            <AiPromptBlock id="render-content-ai-fix-prompt" prompt={FIX_RENDER_CONTENT_AI_PROMPT} />
          </div>
        </section>

        {/* SPA routing */}
        <section id="spa-routing" className="mb-12 scroll-mt-24">
          <h2 id="spa-routing-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            SPA routing (React Router)
          </h2>
          <div id="spa-routing-body" className="space-y-3 leading-relaxed text-slate-600">
            <p id="spa-routing-text">
              This is the gotcha most specific to single-page apps, and the one people miss most often: calling{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                showHighlights()
              </code>{' '}
              once in your root component's{' '}
              <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                useEffect
              </code>{' '}
              only registers content for whichever route the app happened to load on first. React Router then navigates
              between pages without a full reload, so nothing automatically re-checks Page Pilot for the new route's
              tours, tooltips, or banners unless you explicitly re-run the call on every navigation.
            </p>
            <p>Re-run the fetch on every route change by watching the pathname with useLocation():</p>
            <CodeSnippet code={ROUTER_WATCH_CODE} language="tsx" />
          </div>
        </section>

        {/* Stale or cached content */}
        <section id="caching" className="mb-12 scroll-mt-24">
          <h2 id="caching-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Stale or cached content
          </h2>
          <div id="caching-body" className="space-y-3 leading-relaxed text-slate-600">
            <p id="caching-text">
              The client caches what it fetches in the visitor's browser so repeat page loads don't re-fetch every time.
              If you publish a change in Page Pilot and still see the old version:
            </p>
            <ul className="my-3 list-disc space-y-2 pl-5 text-sm">
              <li>Confirm the change was actually published (status Live), not just saved as a draft.</li>
              <li>
                Pass{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  true
                </code>{' '}
                for the{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  refetch
                </code>{' '}
                argument —{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  showHighlights(slug, true)
                </code>{' '}
                /{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  renderAppBanner(identifier, true)
                </code>{' '}
                — during development and testing so you're not fighting your own browser's cache while iterating.
              </li>
              <li>
                Test in a private/incognito window, which starts with no cache at all, rather than your regular browser
                profile which may be holding an older cached response.
              </li>
            </ul>
            <p>
              If it's still stale in a genuinely fresh incognito window well after publishing, that's worth reporting
              rather than assuming it's a local caching artifact.
            </p>
          </div>
        </section>

        {/* Testing without affecting visitors */}
        <section id="testing" className="mb-12 scroll-mt-24">
          <h2 id="testing-heading" style={{ width: 'fit-content' }} className="mb-4 pb-2 text-xl font-bold">
            Testing without affecting visitors
          </h2>
          <div id="testing-body" className="space-y-3 leading-relaxed text-slate-600">
            <p id="testing-text">
              "Show only once" and cached content are both tied to the browser you're testing in, not to your Page Pilot
              configuration — so the fastest way to get a clean slate is a fresh environment, not toggling settings back
              and forth in the dashboard.
            </p>
            <ul className="my-3 list-disc space-y-2 pl-5 text-sm">
              <li>Use a private/incognito window for each test pass.</li>
              <li>
                Or clear your browser's site data for your domain between tests (DevTools → Application → Clear storage)
                if you'd rather keep using your regular window.
              </li>
              <li>
                Pass a distinct{' '}
                <code className="inline-block rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  visitorId
                </code>{' '}
                when testing "show once" behavior repeatedly, so each test run looks like a new visitor.
              </li>
            </ul>
          </div>
        </section>
      </article>
    </DocLayout>
  );
}
