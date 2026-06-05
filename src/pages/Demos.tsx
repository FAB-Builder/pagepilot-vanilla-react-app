import { useEffect, useRef, useState } from 'react';
import { Play, Square, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createAhd, AHD_API_HOST, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';
import PropertyCard from '../components/PropertyCard';

const DEMO_SLUG = '/demos';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live demo' },
  { id: 'target-page', label: 'Target Page' },
  { id: 'steps', label: 'Steps' },
  { id: 'position', label: 'Position' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'backdrop', label: 'Backdrop' },
  { id: 'device-language', label: 'Device & Language' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'show-once', label: 'Show only once' },
  { id: 'styling', label: 'Styling' },
  { id: 'integration', label: 'Integration' },
  { id: 'api', label: 'API reference' },
];

type Status = 'idle' | 'loading' | 'running' | 'error';

function LiveDemoBlock() {
  const ahdRef = useRef<AhdInstance | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => ahdRef.current?.stop(), []);

  const startDemo = async () => {
    setError(null);
    setStatus('loading');
    try {
      const ahd = createAhd({ applicationId: DEMO_APPLICATION_ID });
      ahdRef.current = ahd;
      await ahd.initializeSiteMap(false);
      await ahd.showHighlights(DEMO_SLUG, true);
      setStatus('running');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start the demo.');
      setStatus('error');
    }
  };

  const stop = () => {
    ahdRef.current?.stop();
    setStatus('idle');
  };

  return (
    <div id="demos-live-demo" className="flex flex-col gap-4">
      <div id="demos-live-controls" className="flex items-center gap-3">
        {status === 'running' ? (
          <button
            id="demos-stop-button"
            type="button"
            onClick={stop}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand"
          >
            <Square size={15} /> Stop Demo
          </button>
        ) : (
          <button
            id="demos-start-button"
            type="button"
            onClick={startDemo}
            disabled={status === 'loading'}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            <Play size={15} />
            {status === 'loading' ? 'Starting…' : 'Start Demo'}
          </button>
        )}
        {status === 'running' && (
          <span
            id="demos-status-running"
            className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
          >
            <CheckCircle2 size={15} /> Demo running
          </span>
        )}
        {error && (
          <span
            id="demos-status-error"
            className="flex items-center gap-1.5 text-sm font-semibold text-rose-600"
          >
            <AlertCircle size={15} /> {error}
          </span>
        )}
      </div>

      <div
        id="demos-demo-stage"
        className="flex flex-wrap items-start gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6"
      >
        <div
          id="demo-feature-analytics"
          className="flex flex-1 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Analytics
          </span>
          <span className="text-2xl font-bold text-ink">12,840</span>
          <span className="text-sm text-slate-500">Page views this week</span>
        </div>
        <div
          id="demo-feature-users"
          className="flex flex-1 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Users
          </span>
          <span className="text-2xl font-bold text-ink">3,201</span>
          <span className="text-sm text-slate-500">Active this month</span>
        </div>
        <div
          id="demo-feature-conversion"
          className="flex flex-1 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Conversion
          </span>
          <span className="text-2xl font-bold text-ink">4.7%</span>
          <span className="text-sm text-slate-500">vs 3.9% last month</span>
        </div>
      </div>
    </div>
  );
}

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

function Demos() {
  return (
    <DocLayout title="Demos" sections={SECTIONS}>
      <article id="demos-article" className="max-w-3xl">
        <header id="demos-header" className="mb-8 border-b border-slate-200 pb-6">
          <span
            id="demos-eyebrow"
            className="text-sm font-semibold uppercase tracking-wide text-brand"
          >
            Components
          </span>
          <h1 id="demos-title" className="mt-1 text-3xl font-bold">
            Demos
          </h1>
          <p id="demos-intro" className="mt-3 text-lg leading-relaxed text-slate-600">
            A demo is a multi-step interactive walkthrough that showcases product features in
            sequence. Each step can highlight a UI element or float freely on screen, and visitors
            navigate through them manually or automatically — making demos ideal for onboarding flows
            and feature announcements.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p id="overview-text">
            Demos share the same step-based structure as tours but are designed for{' '}
            <strong id="overview-showcase">feature showcasing</strong> rather than functional
            guidance. Steps can have{' '}
            <strong id="overview-background">background images</strong> and support{' '}
            <strong id="overview-auto-nav">auto-advance navigation</strong> with configurable
            delays. PagePilot resolves which demo to show based on the current page slug.
          </p>
          <p id="overview-vs-tour">
            <strong>Demo vs. Tour</strong> — use a tour when you need to walk users through an
            actual task in your app; use a demo when you want to present features in a controlled,
            story-like sequence.
          </p>
        </Section>

        <Section id="live-demo" title="Live demo">
          <p id="live-demo-text">
            Press <strong id="live-demo-cta-text">Start Demo</strong> to run the demo published
            against the <Code id="live-demo-slug">{DEMO_SLUG}</Code> slug. It walks through the
            sample feature cards below.
          </p>
          <DemoBlock
            title="Start a demo"
            description={
              <>
                Calls <Code id="live-demo-method">showHighlights("{DEMO_SLUG}", true)</Code> after
                initializing the client.
              </>
            }
            code={LIVE_DEMO_CODE}
          >
            <LiveDemoBlock />
          </DemoBlock>
        </Section>

        <Section id="target-page" title="Target Page">
          <p id="target-page-text">
            The page slug the demo is bound to. PagePilot matches the visitor's URL path against
            this value. It must start with a <Code id="target-page-slash">/</Code>.
          </p>
          <PropertyCard type="string" required defaultValue="'/'">
            <span id="target-page-prop">
              URL path the demo is bound to, e.g. <Code id="target-page-eg1">/dashboard</Code> or{' '}
              <Code id="target-page-eg2">/demos</Code>. First argument to{' '}
              <Code id="target-page-method">showHighlights(slug, refetch)</Code>.
            </span>
          </PropertyCard>
          <PropertyCard type="string[]" defaultValue="[]">
            <span id="alt-slugs-prop">
              <strong>Alternative slugs</strong> — additional paths the same demo should run on.
            </span>
          </PropertyCard>
        </Section>

        <Section id="steps" title="Steps">
          <p id="steps-text">
            A demo is made up of one or more steps. Each step is an independent card that can
            optionally target an element via a selector. Steps are shown in order; visitors advance
            with next / previous controls or automatically.
          </p>
          <ApiTable
            rows={[
              {
                property: 'title',
                description: 'Heading text shown at the top of the step card.',
                type: 'string',
              },
              {
                property: 'content',
                description: 'Body copy for the step (supports rich text).',
                type: 'string | HTML',
              },
              {
                property: 'selector',
                description:
                  'CSS selector of the element to highlight for this step. Omit to float the card freely.',
                type: 'string',
              },
              {
                property: 'backgroundImage',
                description: 'URL of a background image rendered behind the step card.',
                type: 'string (URL)',
              },
              {
                property: 'position',
                description: 'Placement of the card relative to the highlighted element.',
                type: "'top' | 'bottom' | 'left' | 'right' | 'center'",
                default: "'bottom'",
              },
            ]}
          />
        </Section>

        <Section id="position" title="Position">
          <p id="position-text">
            Where each step card sits relative to its highlighted element. When no element selector
            is set, the card is centered in the viewport regardless of this value.
          </p>
          <PropertyCard
            type="'top' | 'bottom' | 'left' | 'right' | 'center'"
            defaultValue="'bottom'"
          >
            <span id="position-prop">
              Preferred placement. Falls back to{' '}
              <Code id="position-fallback">center</Code> when the element is absent.
            </span>
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="caret-prop">
              <strong>Caret (isCaret)</strong> — draw a pointer arrow between the card and the
              target element.
            </span>
          </PropertyCard>
          <div id="position-grid" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {(['top', 'bottom', 'left', 'right', 'center'] as const).map((p) => (
              <div
                key={p}
                id={`demo-position-option-${p}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-4 text-center text-sm font-medium capitalize text-slate-700"
              >
                {p}
              </div>
            ))}
          </div>
        </Section>

        <Section id="navigation" title="Navigation">
          <p id="navigation-text">
            Control how users move between steps.
          </p>
          <ApiTable
            rows={[
              {
                property: 'navigationMode',
                description:
                  '"manual" — the visitor clicks next/previous. "auto" — steps advance automatically after a delay.',
                type: "'manual' | 'auto'",
                default: "'manual'",
              },
              {
                property: 'navigationDelay',
                description: 'Milliseconds between auto-advance steps (auto mode only).',
                type: 'number',
                default: '3000',
              },
              {
                property: 'dismissSettings',
                description: 'How the visitor can close the demo mid-flow.',
                type: "'onOutSideClick' | 'onCloseIcon'",
                default: "'onCloseIcon'",
              },
              {
                property: 'showCloseIcon',
                description: 'Whether the close (×) button is shown on each step.',
                type: 'boolean',
                default: 'true',
              },
            ]}
          />
        </Section>

        <Section id="backdrop" title="Backdrop">
          <p id="backdrop-text">
            The dimmed overlay drawn around the highlighted element. When enabled, all content
            outside the highlighted element is de-emphasized so the visitor focuses on the current
            step.
          </p>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="backdrop-enabled-prop">
              <strong>isBackdrop</strong> — render the backdrop. The target element is cut out and
              remains bright.
            </span>
          </PropertyCard>
        </Section>

        <Section id="device-language" title="Device & Language">
          <p id="device-language-text">
            Restrict the demo to specific device types and serve localized content.
          </p>
          <PropertyCard type="'desktop' | 'tablet' | 'mobile'" defaultValue="'desktop'">
            <span id="device-prop">Device the demo targets.</span>
          </PropertyCard>
          <PropertyCard type="'en' | 'hi'" defaultValue="'en'">
            <span id="language-prop">Language of the demo content.</span>
          </PropertyCard>
        </Section>

        <Section id="scheduling" title="Scheduling">
          <p id="scheduling-text">
            Control the window during which the demo is served. Outside this window PagePilot does
            not return the demo.
          </p>
          <PropertyCard type="Date" defaultValue="now">
            <span id="scheduling-start-prop">
              <strong>Start date</strong> — when the demo goes live.
            </span>
          </PropertyCard>
          <PropertyCard type="Date | null" defaultValue="null">
            <span id="scheduling-end-prop">
              <strong>End date</strong> — when it stops. Leave as <Code>null</Code> to run forever.
            </span>
          </PropertyCard>
        </Section>

        <Section id="show-once" title="Show only once">
          <p id="show-once-text">
            When enabled, a visitor sees the demo a single time. On subsequent page loads it is not
            shown again (tracked per <Code id="show-once-visitor">visitorId</Code>).
          </p>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="show-once-prop">Show the demo only once per visitor.</span>
          </PropertyCard>
        </Section>

        <Section id="styling" title="Styling">
          <p id="styling-text">
            Each step card can be styled independently of your app's CSS.
          </p>
          <ApiTable
            rows={[
              {
                property: 'canvasColor',
                description: 'Background color of the step card.',
                type: 'string (hex)',
                default: "'#FFFFFF'",
              },
              {
                property: 'textColor',
                description: 'Text color inside the card.',
                type: 'string (hex)',
                default: "'#262626'",
              },
              {
                property: 'fontFamily',
                description: 'Font family for the card content.',
                type: 'string',
                default: "'MODERN_SANS'",
              },
              {
                property: 'borderRadius',
                description: 'Card corner radius in pixels.',
                type: 'number',
                default: '8',
              },
              {
                property: 'borderColor',
                description: 'Card border color.',
                type: 'string (hex)',
              },
              {
                property: 'borderWidth',
                description: 'Card border width in pixels.',
                type: 'number',
                default: '0',
              },
              {
                property: 'width / height',
                description: 'Manual size overrides for the step card.',
                type: 'number (px)',
              },
              {
                property: 'iconCloseColor',
                description: 'Color of the close (×) icon.',
                type: 'string (hex)',
                default: "'#64748B'",
              },
              {
                property: 'animationType',
                description: 'How each step card enters the screen.',
                type: "'instant' | 'fadeIn' | 'slideIn'",
                default: "'fadeIn'",
              },
            ]}
          />
        </Section>

        <Section id="integration" title="Integration">
          <p id="integration-text">
            The same <Code>showHighlights</Code> call used for tours and tooltips loads demos.
            PagePilot determines what to render based on the published content for the slug.
          </p>
          <DemoBlock
            title="React"
            description="Initialize AHDjs and start the demo on demand."
            code={BASIC_CODE}
          >
            <div id="integration-react-note" className="text-sm text-slate-600">
              Call <Code id="integration-react-method">showHighlights("{DEMO_SLUG}", true)</Code>{' '}
              after the page mounts to start the demo for the current slug.
            </div>
          </DemoBlock>
          <DemoBlock
            title="Script tag"
            description="No build step — drop AHDjs into any HTML page."
            code={SCRIPT_TAG_CODE}
            language="html"
          >
            <div id="integration-script-note" className="text-sm text-slate-600">
              Loads AHDjs from a CDN and starts the demo on page load.
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
                description: 'Per-visitor identifier used for "show once" tracking.',
                type: 'string',
              },
              {
                property: 'showProgressbar',
                description: 'Whether to show a progress bar across demo steps.',
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
                description: 'Fetches the sitemap before rendering any experience.',
                type: '(refetch: boolean) => Promise<void>',
              },
              {
                property: 'showHighlights(slug, refetch)',
                description:
                  'Renders the demo (or tour / tooltips) published for the given slug.',
                type: '(slug: string, refetch: boolean) => Promise<void>',
              },
              {
                property: 'stop()',
                description: 'Stops the currently running demo.',
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

export default function StartDemoButton() {
  const ahdRef = useRef(null);

  const startDemo = async () => {
    const ahdJs = AHDjs(undefined, {
      applicationId: '${DEMO_APPLICATION_ID}',
      apiHost: '${AHD_API_HOST}',
      visitorId: 'visitor-id',
      showProgressbar: false,
    });
    ahdRef.current = ahdJs;

    await ahdJs.initializeSiteMap(false);
    await ahdJs.showHighlights('${DEMO_SLUG}', true);
  };

  useEffect(() => () => ahdRef.current?.stop(), []);

  return (
    <>
      <button onClick={startDemo}>Start Demo</button>
      <div id="demo-feature-analytics">Analytics card</div>
      <div id="demo-feature-users">Users card</div>
      <div id="demo-feature-conversion">Conversion card</div>
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
await ahdJs.showHighlights('${DEMO_SLUG}', true);`;

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
  _ahdJs.showHighlights('${DEMO_SLUG}', true);
</script>`;

export default Demos;
