import { useEffect, useRef, useState } from 'react';
import { Play, Square, CheckCircle2, AlertCircle } from 'lucide-react';
import { createAhd, AHD_API_HOST, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';
import PropertyCard from '../components/PropertyCard';

/**
 * The slug a tour is attached to. In PagePilot a "Target Page" is just a
 * slug; the tour for this demo is published against the `/tours` slug.
 */
const TOUR_SLUG = '/tours';

/** Left-sidebar sections — scoped to Tours, in reading order. */
const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live demo' },
  { id: 'target-page', label: 'Target Page' },
  { id: 'alt-target-page', label: 'Alternative Target Page' },
  { id: 'selector', label: 'Element / Selector' },
  { id: 'position', label: 'Position' },
  { id: 'backdrop', label: 'Backdrop' },
  { id: 'device-language', label: 'Device & Language' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'show-once', label: 'Show only once' },
  { id: 'step-style', label: 'Step styling' },
  { id: 'integration', label: 'Integration' },
  { id: 'api', label: 'API reference' },
];

type Status = 'idle' | 'loading' | 'running' | 'error';

function LiveTourDemo() {
  const ahdRef = useRef<AhdInstance | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => ahdRef.current?.stop(), []);

  const startTour = async () => {
    setError(null);
    setStatus('loading');
    try {
      const ahd = createAhd({ applicationId: DEMO_APPLICATION_ID });
      ahdRef.current = ahd;
      await ahd.initializeSiteMap(false);
      await ahd.showHighlights(TOUR_SLUG, true);
      setStatus('running');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start the tour.');
      setStatus('error');
    }
  };

  const stopTour = () => {
    ahdRef.current?.stop();
    setStatus('idle');
  };

  return (
    <div id="tours-live-demo" className="flex flex-col gap-4">
      <div id="tours-live-controls" className="flex items-center gap-3">
        {status === 'running' ? (
          <button
            id="tours-stop-button"
            type="button"
            onClick={stopTour}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand"
          >
            <Square size={15} /> Stop Tour
          </button>
        ) : (
          <button
            id="tours-start-button"
            type="button"
            onClick={startTour}
            disabled={status === 'loading'}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            <Play size={15} />
            {status === 'loading' ? 'Starting…' : 'Start Tour'}
          </button>
        )}
        {status === 'running' && (
          <span
            id="tours-status-running"
            className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
          >
            <CheckCircle2 size={15} /> Tour running
          </span>
        )}
        {error && (
          <span
            id="tours-status-error"
            className="flex items-center gap-1.5 text-sm font-semibold text-rose-600"
          >
            <AlertCircle size={15} /> {error}
          </span>
        )}
      </div>

      {/* Sample target elements. The tour steps point at these selectors. */}
      <div
        id="tours-demo-stage"
        className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5"
      >
        <button
          id="demo-create"
          type="button"
          className="rounded-lg bg-brand px-3.5 py-2 text-sm text-white"
        >
          + Create project
        </button>
        <button
          id="demo-search"
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm"
        >
          Search
        </button>
        <button
          id="demo-settings"
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm"
        >
          Settings
        </button>
        <div
          id="demo-profile"
          title="Profile"
          className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-brand-tint text-sm font-bold text-brand"
        >
          JD
        </div>
      </div>
    </div>
  );
}

/** Reusable section wrapper with an anchor + heading. */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 id={`${id}-heading`} className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
        {title}
      </h2>
      <div id={`${id}-body`} className="space-y-3 leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

const Code = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <code id={id} className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
    {children}
  </code>
);

function Tours() {
  return (
    <DocLayout title="Tours" sections={SECTIONS}>
      <article id="tours-article" className="">
        <header id="tours-header" className="mb-8 border-b border-slate-200 pb-6">
       
          <h1 id="tours-title" className="mt-1 text-3xl font-bold">
            Tours
          </h1>
          <p id="tours-intro" className="mt-3 text-lg leading-relaxed text-slate-600">
            A tour is a step-by-step guided walkthrough. Each step highlights an element on a page
            and shows a tooltip card with content and next / previous controls. PagePilot fetches the
            tour for a given <strong id="tours-intro-target">Target Page</strong> and renders it over
            your real DOM.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p id="overview-text">
            A tour has <strong id="overview-tour-level">tour-level</strong> settings (which pages it
            runs on, scheduling, device) and a list of <strong id="overview-steps">steps</strong>.
            Each step points at an element and controls its own placement and styling. The sections
            below document every property you configure in the PagePilot admin.
          </p>
        </Section>

        <Section id="live-demo" title="Live demo">
          <p id="live-demo-text">
            Press <strong id="live-demo-cta-text">Start Tour</strong> to run the tour published
            against the <Code id="live-demo-slug">{TOUR_SLUG}</Code> slug for this demo app. It
            highlights the sample buttons below.
          </p>
          <DemoBlock
            title="Start a tour"
            description={
              <>
                Calls <Code id="live-demo-method">showHighlights("{TOUR_SLUG}", true)</Code> after
                initializing the client.
              </>
            }
            code={LIVE_DEMO_CODE}
          >
            <LiveTourDemo />
          </DemoBlock>
        </Section>

        <Section id="target-page" title="Target Page">
          <p id="target-page-text">
            The page (slug) where the tour appears. PagePilot matches the visitor's current URL path
            against this slug; when it matches, the tour renders. It must start with a{' '}
            <Code id="target-page-slash">/</Code>.
          </p>
          <PropertyCard type="string" required defaultValue="'/'">
            <span id="target-page-prop">
              The URL path the tour is bound to, e.g. <Code id="target-page-eg1">/dashboard</Code> or{' '}
              <Code id="target-page-eg2">/tours</Code>. In code this is the first argument to{' '}
              <Code id="target-page-method">showHighlights(slug, refetch)</Code>.
            </span>
          </PropertyCard>
        </Section>

        <Section id="alt-target-page" title="Alternative Target Page">
          <p id="alt-target-page-text">
            Additional slugs the same tour should also run on. Useful when the same screen is reached
            via multiple URLs (e.g. <Code id="alt-eg1">/home</Code> and{' '}
            <Code id="alt-eg2">/dashboard</Code>). Each alternative must also start with{' '}
            <Code id="alt-slash">/</Code>.
          </p>
          <PropertyCard type="string[]" defaultValue="[]">
            <span id="alt-target-page-prop">
              A list of extra page slugs. The tour shows if the current URL matches the Target Page{' '}
              <em>or</em> any alternative.
            </span>
          </PropertyCard>
        </Section>

        <Section id="selector" title="Element / Selector">
          <p id="selector-text">
            Per step, the <strong id="selector-element-id">Element ID</strong> (CSS selector) of the
            element to highlight. The tooltip anchors to this element. On this demo page the
            selectors are <Code id="selector-eg-create">#demo-create</Code>,{' '}
            <Code id="selector-eg-search">#demo-search</Code>,{' '}
            <Code id="selector-eg-settings">#demo-settings</Code> and{' '}
            <Code id="selector-eg-profile">#demo-profile</Code>.
          </p>
          <PropertyCard type="string" required>
            <span id="selector-prop">
              Any valid CSS selector. If the element isn't present when the tour runs, that step is
              skipped.
            </span>
          </PropertyCard>
        </Section>

        <Section id="position" title="Position">
          <p id="position-text">Where the tooltip card sits relative to the highlighted element.</p>
          <PropertyCard type="'top' | 'bottom' | 'left' | 'right'" defaultValue="'bottom'">
            <span id="position-prop">
              Placement of the step tooltip. Falls back to <Code id="position-default">bottom</Code>{' '}
              when not set.
            </span>
          </PropertyCard>
          <div id="position-grid" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
              <div
                key={p}
                id={`position-option-${p}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-4 text-center text-sm font-medium capitalize text-slate-700"
              >
                {p}
              </div>
            ))}
          </div>
        </Section>

        <Section id="backdrop" title="Backdrop">
          <p id="backdrop-text">
            The dimmed overlay drawn behind the highlighted element to focus attention. Its color is
            controlled by <Code id="backdrop-prop-name">backdropColor</Code> on the step's layout. A
            cut-out around the target element keeps it bright while the rest of the page is dimmed.
          </p>
          <PropertyCard type="string (hex color)" defaultValue="'#F5F5F5'">
            <span id="backdrop-prop">
              Backdrop / overlay color for the step. Set per step via the step's EmailLayout{' '}
              <Code id="backdrop-layout-prop">backdropColor</Code>.
            </span>
          </PropertyCard>
        </Section>

        <Section id="device-language" title="Device & Language">
          <p id="device-language-text">
            Restrict where the tour shows and which localized content is served.
          </p>
          <PropertyCard type="'desktop' | 'tablet' | 'mobile'" defaultValue="'desktop'">
            <span id="device-prop">Device the tour targets.</span>
          </PropertyCard>
          <PropertyCard type="'en' | 'hi'" defaultValue="'en'">
            <span id="language-prop">Language of the tour content.</span>
          </PropertyCard>
        </Section>

        <Section id="scheduling" title="Scheduling">
          <p id="scheduling-text">
            Control when a tour is live with a start date, an end date, or "run forever". Outside the
            window the tour is not served.
          </p>
          <PropertyCard type="Date" defaultValue="now">
            <span id="scheduling-start-prop">
              <strong>Start date</strong> — when the tour goes live.
            </span>
          </PropertyCard>
          <PropertyCard type="Date | null" defaultValue="null">
            <span id="scheduling-end-prop">
              <strong>End date</strong> — when it stops. Turn on <em>Run forever</em> to leave it
              open.
            </span>
          </PropertyCard>
        </Section>

        <Section id="show-once" title="Show only once">
          <p id="show-once-text">
            When enabled, a visitor sees the tour a single time; once they finish or dismiss it, it
            won't show again for them (tracked per <Code id="show-once-visitor">visitorId</Code>).
          </p>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="show-once-prop">Show the tour only once per visitor.</span>
          </PropertyCard>
        </Section>

        <Section id="step-style" title="Step styling">
          <p id="step-style-text">Each step's tooltip card can be styled independently.</p>
          <ApiTable
            rows={[
              {
                property: 'canvasColor',
                description: 'Background color of the tooltip card.',
                type: 'string',
                default: "'#FFFFFF'",
              },
              {
                property: 'textColor',
                description: 'Text color inside the card.',
                type: 'string',
                default: "'#262626'",
              },
              {
                property: 'fontFamily',
                description: 'Font family for the card content.',
                type: 'string',
                default: "'MODERN_SANS'",
              },
              {
                property: 'borderRadius / borderColor / borderWidth',
                description: 'Card border styling.',
                type: 'string | number',
              },
              {
                property: 'width / height / top / left',
                description: 'Manual size and offset overrides for the card.',
                type: 'string | number',
              },
            ]}
          />
        </Section>

        <Section id="integration" title="Integration">
          <p id="integration-text">
            Install AHDjs, initialize it once, then render the tour for a slug.
          </p>
          <DemoBlock
            title="React"
            description="Initialize AHDjs and render the tour on demand."
            code={BASIC_CODE}
          >
            <div id="integration-react-note" className="text-sm text-slate-600">
              <Code id="integration-react-method">showHighlights("{TOUR_SLUG}", true)</Code> renders
              the tour for the current page.
            </div>
          </DemoBlock>
          <DemoBlock
            title="Script tag"
            description="No build step — drop AHDjs into any HTML page."
            code={SCRIPT_TAG_CODE}
            language="html"
          >
            <div id="integration-script-note" className="text-sm text-slate-600">
              Loads AHDjs from a CDN and runs on load.
            </div>
          </DemoBlock>
        </Section>

        <Section id="api" title="API reference">
          <h3 id="api-constructor-heading" className="mb-2 mt-2 text-base font-semibold text-ink">
            Constructor options
          </h3>
          <ApiTable
            rows={[
              {
                property: 'applicationId',
                description: 'Your PagePilot application ID.',
                type: 'string',
              },
              {
                property: 'apiHost',
                description: 'PagePilot API host.',
                type: 'string',
                default: `'${AHD_API_HOST}'`,
              },
              {
                property: 'visitorId',
                description: 'Identifier used to track tour progress per visitor.',
                type: 'string',
              },
              {
                property: 'showProgressbar',
                description: 'Whether to show a progress bar across tour steps.',
                type: 'boolean',
                default: 'false',
              },
            ]}
          />
          <h3 id="api-methods-heading" className="mb-2 mt-6 text-base font-semibold text-ink">
            Methods
          </h3>
          <ApiTable
            rows={[
              {
                property: 'initializeSiteMap(refetch)',
                description: 'Builds the sitemap before rendering any experience.',
                type: '(refetch: boolean) => Promise<void>',
              },
              {
                property: 'showHighlights(slug, refetch)',
                description: 'Renders the tour / highlights published for the given slug.',
                type: '(slug: string, refetch: boolean) => Promise<void>',
              },
              {
                property: 'stop()',
                description: 'Stops the currently running tour.',
                type: '() => void',
              },
            ]}
          />
        </Section>
      </article>
    </DocLayout>
  );
}

/* ------------------------------- Snippets ------------------------------- */

const LIVE_DEMO_CODE = `import { useEffect, useRef } from 'react';
import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

export default function StartTourButton() {
  const ahdRef = useRef(null);

  const startTour = async () => {
    const ahdJs = AHDjs(undefined, {
      applicationId: '${DEMO_APPLICATION_ID}',
      apiHost: '${AHD_API_HOST}',
      visitorId: 'visitor-id',
      showProgressbar: false,
    });
    ahdRef.current = ahdJs;

    await ahdJs.initializeSiteMap(false);
    await ahdJs.showHighlights('${TOUR_SLUG}', true);
  };

  useEffect(() => () => ahdRef.current?.stop(), []);

  return (
    <>
      <button onClick={startTour}>Start Tour</button>
      <button id="demo-create">+ Create project</button>
      <button id="demo-search">Search</button>
    </>
  );
}`;

const BASIC_CODE = `import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

const ahdJs = AHDjs(undefined, {
  applicationId: '${DEMO_APPLICATION_ID}',
  apiHost: '${AHD_API_HOST}',
  visitorId: 'visitor-id',
  showProgressbar: false,
});

await ahdJs.initializeSiteMap(false);
await ahdJs.showHighlights('${TOUR_SLUG}', true);`;

const SCRIPT_TAG_CODE = `<link rel="stylesheet" href="https://unpkg.com/ahdjs/build/css/index.css" />
<script type="text/javascript" src="https://unpkg.com/ahdjs/build/index.js"></script>
<script>
  const AHDjs = window.AHDjs.default;
  const _ahdJs = new AHDjs(undefined, {
    applicationId: '${DEMO_APPLICATION_ID}',
    apiHost: '${AHD_API_HOST}',
    visitorId: 'visitor-id',
    showProgressbar: false,
  });
  _ahdJs.initializeSiteMap();
  _ahdJs.showHighlights('${TOUR_SLUG}', true);
</script>`;

export default Tours;
