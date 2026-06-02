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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {status === 'running' ? (
          <button
            type="button"
            onClick={stopTour}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand"
          >
            <Square size={15} /> Stop Tour
          </button>
        ) : (
          <button
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
          <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
            <CheckCircle2 size={15} /> Tour running
          </span>
        )}
        {error && (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-rose-600">
            <AlertCircle size={15} /> {error}
          </span>
        )}
      </div>

      {/* Sample target elements. The tour steps point at these selectors. */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
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
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">{title}</h2>
      <div className="space-y-3 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
    {children}
  </code>
);

function Tours() {
  return (
    <DocLayout title="Tours" sections={SECTIONS}>
      <article className="max-w-3xl">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            Components
          </span>
          <h1 className="mt-1 text-3xl font-bold">Tours</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A tour is a step-by-step guided walkthrough. Each step highlights an element on a page
            and shows a tooltip card with content and next / previous controls. PagePilot fetches the
            tour for a given <strong>Target Page</strong> and renders it over your real DOM.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A tour has <strong>tour-level</strong> settings (which pages it runs on, scheduling,
            device) and a list of <strong>steps</strong>. Each step points at an element and
            controls its own placement and styling. The sections below document every property you
            configure in the PagePilot admin.
          </p>
        </Section>

        <Section id="live-demo" title="Live demo">
          <p>
            Press <strong>Start Tour</strong> to run the tour published against the{' '}
            <Code>{TOUR_SLUG}</Code> slug for this demo app. It highlights the sample buttons below.
          </p>
          <DemoBlock
            title="Start a tour"
            description={
              <>
                Calls <Code>showHighlights("{TOUR_SLUG}", true)</Code> after initializing the client.
              </>
            }
            code={LIVE_DEMO_CODE}
          >
            <LiveTourDemo />
          </DemoBlock>
        </Section>

        <Section id="target-page" title="Target Page">
          <p>
            The page (slug) where the tour appears. PagePilot matches the visitor's current URL path
            against this slug; when it matches, the tour renders. It must start with a{' '}
            <Code>/</Code>.
          </p>
          <PropertyCard type="string" required defaultValue="'/'">
            The URL path the tour is bound to, e.g. <Code>/dashboard</Code> or <Code>/tours</Code>.
            In code this is the first argument to <Code>showHighlights(slug, refetch)</Code>.
          </PropertyCard>
        </Section>

        <Section id="alt-target-page" title="Alternative Target Page">
          <p>
            Additional slugs the same tour should also run on. Useful when the same screen is reached
            via multiple URLs (e.g. <Code>/home</Code> and <Code>/dashboard</Code>). Each alternative
            must also start with <Code>/</Code>.
          </p>
          <PropertyCard type="string[]" defaultValue="[]">
            A list of extra page slugs. The tour shows if the current URL matches the Target Page{' '}
            <em>or</em> any alternative.
          </PropertyCard>
        </Section>

        <Section id="selector" title="Element / Selector">
          <p>
            Per step, the <strong>Element ID</strong> (CSS selector) of the element to highlight. The
            tooltip anchors to this element. On this demo page the selectors are{' '}
            <Code>#demo-create</Code>, <Code>#demo-search</Code>, <Code>#demo-settings</Code> and{' '}
            <Code>#demo-profile</Code>.
          </p>
          <PropertyCard type="string" required>
            Any valid CSS selector. If the element isn't present when the tour runs, that step is
            skipped.
          </PropertyCard>
        </Section>

        <Section id="position" title="Position">
          <p>Where the tooltip card sits relative to the highlighted element.</p>
          <PropertyCard type="'top' | 'bottom' | 'left' | 'right'" defaultValue="'bottom'">
            Placement of the step tooltip. Falls back to <Code>bottom</Code> when not set.
          </PropertyCard>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
              <div
                key={p}
                className="rounded-lg border border-slate-200 bg-white px-3 py-4 text-center text-sm font-medium capitalize text-slate-700"
              >
                {p}
              </div>
            ))}
          </div>
        </Section>

        <Section id="backdrop" title="Backdrop">
          <p>
            The dimmed overlay drawn behind the highlighted element to focus attention. Its color is
            controlled by <Code>backdropColor</Code> on the step's layout. A cut-out around the
            target element keeps it bright while the rest of the page is dimmed.
          </p>
          <PropertyCard type="string (hex color)" defaultValue="'#F5F5F5'">
            Backdrop / overlay color for the step. Set per step via the step's EmailLayout{' '}
            <Code>backdropColor</Code>.
          </PropertyCard>
        </Section>

        <Section id="device-language" title="Device & Language">
          <p>Restrict where the tour shows and which localized content is served.</p>
          <PropertyCard type="'desktop' | 'tablet' | 'mobile'" defaultValue="'desktop'">
            Device the tour targets.
          </PropertyCard>
          <PropertyCard type="'en' | 'hi'" defaultValue="'en'">
            Language of the tour content.
          </PropertyCard>
        </Section>

        <Section id="scheduling" title="Scheduling">
          <p>
            Control when a tour is live with a start date, an end date, or "run forever". Outside the
            window the tour is not served.
          </p>
          <PropertyCard type="Date" defaultValue="now">
            <strong>Start date</strong> — when the tour goes live.
          </PropertyCard>
          <PropertyCard type="Date | null" defaultValue="null">
            <strong>End date</strong> — when it stops. Turn on <em>Run forever</em> to leave it open.
          </PropertyCard>
        </Section>

        <Section id="show-once" title="Show only once">
          <p>
            When enabled, a visitor sees the tour a single time; once they finish or dismiss it, it
            won't show again for them (tracked per <Code>visitorId</Code>).
          </p>
          <PropertyCard type="boolean" defaultValue="false">
            Show the tour only once per visitor.
          </PropertyCard>
        </Section>

        <Section id="step-style" title="Step styling">
          <p>Each step's tooltip card can be styled independently.</p>
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
          <p>Install AHDjs, initialize it once, then render the tour for a slug.</p>
          <DemoBlock
            title="React"
            description="Initialize AHDjs and render the tour on demand."
            code={BASIC_CODE}
          >
            <div className="text-sm text-slate-600">
              <Code>showHighlights("{TOUR_SLUG}", true)</Code> renders the tour for the current page.
            </div>
          </DemoBlock>
          <DemoBlock
            title="Script tag"
            description="No build step — drop AHDjs into any HTML page."
            code={SCRIPT_TAG_CODE}
            language="html"
          >
            <div className="text-sm text-slate-600">Loads AHDjs from a CDN and runs on load.</div>
          </DemoBlock>
        </Section>

        <Section id="api" title="API reference">
          <h3 className="mb-2 mt-2 text-base font-semibold text-ink">Constructor options</h3>
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
          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Methods</h3>
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
