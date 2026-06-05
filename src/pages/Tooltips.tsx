import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Square, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createAhd, AHD_API_HOST, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';
import PropertyCard from '../components/PropertyCard';

const TOOLTIP_SLUG = '/tooltips';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live demo' },
  { id: 'target-page', label: 'Target Page' },
  { id: 'selector', label: 'Element / Selector' },
  { id: 'trigger', label: 'Trigger behaviour' },
  { id: 'position', label: 'Position' },
  { id: 'backdrop', label: 'Backdrop' },
  { id: 'device-language', label: 'Device & Language' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'show-once', label: 'Show only once' },
  { id: 'styling', label: 'Styling' },
  { id: 'integration', label: 'Integration' },
  { id: 'api', label: 'API reference' },
];

type Status = 'idle' | 'loading' | 'running' | 'error';

function LiveTooltipDemo() {
  const ahdRef = useRef<AhdInstance | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => ahdRef.current?.stop(), []);

  const showTooltips = async () => {
    setError(null);
    setStatus('loading');
    try {
      const ahd = createAhd({ applicationId: DEMO_APPLICATION_ID });
      ahdRef.current = ahd;
      await ahd.initializeSiteMap(false);
      await ahd.showHighlights(TOOLTIP_SLUG, true);
      setStatus('running');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tooltips.');
      setStatus('error');
    }
  };

  const stop = () => {
    ahdRef.current?.stop();
    setStatus('idle');
  };

  return (
    <div id="tooltips-live-demo" className="flex flex-col gap-4">
      <div id="tooltips-live-controls" className="flex items-center gap-3">
        {status === 'running' ? (
          <button
            id="tooltips-stop-button"
            type="button"
            onClick={stop}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand"
          >
            <Square size={15} /> Stop
          </button>
        ) : (
          <button
            id="tooltips-start-button"
            type="button"
            onClick={showTooltips}
            disabled={status === 'loading'}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            <Lightbulb size={15} />
            {status === 'loading' ? 'Loading…' : 'Show Tooltips'}
          </button>
        )}
        {status === 'running' && (
          <span
            id="tooltips-status-running"
            className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
          >
            <CheckCircle2 size={15} /> Tooltips active
          </span>
        )}
        {error && (
          <span
            id="tooltips-status-error"
            className="flex items-center gap-1.5 text-sm font-semibold text-rose-600"
          >
            <AlertCircle size={15} /> {error}
          </span>
        )}
      </div>

      <div
        id="tooltips-demo-stage"
        className="flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6"
      >
        <button
          id="tooltip-new-project"
          type="button"
          className="rounded-lg bg-brand px-3.5 py-2 text-sm text-white"
        >
          + New project
        </button>
        <button
          id="tooltip-invite"
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm"
        >
          Invite members
        </button>
        <button
          id="tooltip-settings"
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm"
        >
          Settings
        </button>
        <div
          id="tooltip-help"
          title="Help"
          className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600"
        >
          ?
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

function Tooltips() {
  return (
    <DocLayout title="Tooltips" sections={SECTIONS}>
      <article id="tooltips-article" className="">
        <header id="tooltips-header" className="mb-8 border-b border-slate-200 pb-6">
          
          <h1 id="tooltips-title" className="mt-1 text-3xl font-bold">
            Tooltips
          </h1>
          <p id="tooltips-intro" className="mt-3 text-lg leading-relaxed text-slate-600">
            A tooltip is a contextual hint anchored to a single element in your UI. It can be
            triggered by a hover, a click, or an icon beacon — giving users just-in-time guidance
            without interrupting their flow.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p id="overview-text">
            Unlike a tour (which walks users through multiple steps), a tooltip is{' '}
            <strong id="overview-single">single-step</strong> and always attached to one DOM
            element. You configure its{' '}
            <strong id="overview-trigger">trigger behaviour</strong> (what makes it appear), its{' '}
            <strong id="overview-placement">placement</strong> relative to the element, and its{' '}
            <strong id="overview-style">visual style</strong>. PagePilot resolves which tooltips to
            show based on the current page slug.
          </p>
        </Section>

        <Section id="live-demo" title="Live demo">
          <p id="live-demo-text">
            Press <strong id="live-demo-cta-text">Show Tooltips</strong> to load the tooltips
            published against the <Code id="live-demo-slug">{TOOLTIP_SLUG}</Code> slug. Hover or
            click the sample buttons below to see them in action.
          </p>
          <DemoBlock
            title="Show tooltips"
            description={
              <>
                Calls <Code id="live-demo-method">showHighlights("{TOOLTIP_SLUG}", true)</Code> after
                initializing the client.
              </>
            }
            code={LIVE_DEMO_CODE}
          >
            <LiveTooltipDemo />
          </DemoBlock>
        </Section>

        <Section id="target-page" title="Target Page">
          <p id="target-page-text">
            The page slug where the tooltip is active. PagePilot matches the visitor's URL path
            against this value; when it matches, the tooltip is registered on the page. It must
            start with a <Code id="target-page-slash">/</Code>.
          </p>
          <PropertyCard type="string" required defaultValue="'/'">
            <span id="target-page-prop">
              URL path the tooltip is bound to, e.g.{' '}
              <Code id="target-page-eg1">/dashboard</Code> or{' '}
              <Code id="target-page-eg2">/settings</Code>. Passed as the first argument to{' '}
              <Code id="target-page-method">showHighlights(slug, refetch)</Code>.
            </span>
          </PropertyCard>
          <PropertyCard type="string[]" defaultValue="[]">
            <span id="alt-slugs-prop">
              <strong>Alternative slugs</strong> — additional paths the same tooltip should appear
              on. Useful when the same screen is accessible via multiple routes.
            </span>
          </PropertyCard>
        </Section>

        <Section id="selector" title="Element / Selector">
          <p id="selector-text">
            The CSS selector for the element the tooltip is anchored to. The tooltip card and any
            optional trigger icon are positioned relative to this element.
          </p>
          <PropertyCard type="string" required>
            <span id="selector-prop">
              Any valid CSS selector, e.g. <Code id="selector-eg1">#tooltip-help</Code> or{' '}
              <Code id="selector-eg2">.invite-button</Code>. If the element is absent when the page
              loads, the tooltip is silently skipped.
            </span>
          </PropertyCard>
        </Section>

        <Section id="trigger" title="Trigger behaviour">
          <p id="trigger-text">
            Controls <em>how</em> the tooltip card appears after the trigger activates.
          </p>
          <ApiTable
            rows={[
              {
                property: 'triggerBehaviour',
                description: 'Interaction that opens the tooltip card.',
                type: "'onClick' | 'onHover' | 'onPageLoad'",
                default: "'onPageLoad'",
              },
              {
                property: 'triggerMode',
                description:
                  'What is shown on the element before the card opens. "icon" shows a beacon; "label" shows a text label; "hidden" opens automatically.',
                type: "'icon' | 'label' | 'hidden'",
                default: "'hidden'",
              },
              {
                property: 'triggerIcon.type',
                description: 'Icon variant for the beacon.',
                type: "'help' | 'question' | 'info'",
                default: "'help'",
              },
              {
                property: 'triggerIcon.color',
                description: 'Beacon icon color.',
                type: 'string (hex)',
                default: "'#6366F1'",
              },
              {
                property: 'triggerIcon.isAnimated',
                description: 'Pulse animation on the beacon.',
                type: 'boolean',
                default: 'false',
              },
              {
                property: 'triggerLabel.text',
                description: 'Text shown in a label-mode trigger.',
                type: 'string',
              },
              {
                property: 'delay',
                description: 'Milliseconds to wait before showing the card (onPageLoad only).',
                type: 'number',
                default: '0',
              },
            ]}
          />
        </Section>

        <Section id="position" title="Position">
          <p id="position-text">
            Where the tooltip card is placed relative to its target element.
          </p>
          <PropertyCard
            type="'top' | 'bottom' | 'left' | 'right' | 'center'"
            defaultValue="'bottom'"
          >
            <span id="position-prop">
              PagePilot uses this as the <em>preferred</em> placement. If there is not enough
              viewport space the card automatically flips to the opposite side.
            </span>
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="caret-prop">
              <strong>Caret (isCaret)</strong> — show a small pointer arrow between the card and the
              element.
            </span>
          </PropertyCard>
          <div id="position-grid" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {(['top', 'bottom', 'left', 'right', 'center'] as const).map((p) => (
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
            An optional dimmed overlay behind the target element. Enabling the backdrop focuses the
            visitor's attention on the highlighted element just like a tour step.
          </p>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="backdrop-enabled-prop">
              <strong>isBackdrop</strong> — render the overlay. The target element is cut out and
              remains fully visible.
            </span>
          </PropertyCard>
        </Section>

        <Section id="device-language" title="Device & Language">
          <p id="device-language-text">
            Limit which devices see the tooltip and which localized copy is served.
          </p>
          <PropertyCard type="'desktop' | 'tablet' | 'mobile'" defaultValue="'desktop'">
            <span id="device-prop">Target device for this tooltip.</span>
          </PropertyCard>
          <PropertyCard type="'en' | 'hi'" defaultValue="'en'">
            <span id="language-prop">Language of the tooltip content.</span>
          </PropertyCard>
        </Section>

        <Section id="scheduling" title="Scheduling">
          <p id="scheduling-text">
            Control the window during which the tooltip is served. Outside this window PagePilot
            does not return the tooltip.
          </p>
          <PropertyCard type="Date" defaultValue="now">
            <span id="scheduling-start-prop">
              <strong>Start date</strong> — when the tooltip goes live.
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
            When enabled a visitor sees the tooltip once; on subsequent page loads it is suppressed
            (tracked per <Code id="show-once-visitor">visitorId</Code>).
          </p>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="show-once-prop">Show the tooltip only once per visitor.</span>
          </PropertyCard>
        </Section>

        <Section id="styling" title="Styling">
          <p id="styling-text">
            The tooltip card can be styled independently of your app's CSS.
          </p>
          <ApiTable
            rows={[
              {
                property: 'canvasColor',
                description: 'Background color of the tooltip card.',
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
                description: 'Manual size overrides for the card.',
                type: 'number (px)',
              },
              {
                property: 'iconCloseColor',
                description: 'Color of the close (×) icon.',
                type: 'string (hex)',
                default: "'#64748B'",
              },
              {
                property: 'showCloseIcon',
                description: 'Whether the close icon is visible.',
                type: 'boolean',
                default: 'true',
              },
              {
                property: 'animationType',
                description: 'How the card enters the screen.',
                type: "'instant' | 'fadeIn' | 'slideIn'",
                default: "'fadeIn'",
              },
            ]}
          />
        </Section>

        <Section id="integration" title="Integration">
          <p id="integration-text">
            The same <Code>showHighlights</Code> call used for tours also loads tooltips. PagePilot
            determines what to render based on the published content for the slug.
          </p>
          <DemoBlock
            title="React"
            description="Initialize AHDjs and load tooltips on demand."
            code={BASIC_CODE}
          >
            <div id="integration-react-note" className="text-sm text-slate-600">
              Call <Code id="integration-react-method">showHighlights("{TOOLTIP_SLUG}", true)</Code>{' '}
              after the page mounts to register tooltips for the current slug.
            </div>
          </DemoBlock>
          <DemoBlock
            title="Script tag"
            description="No build step — drop AHDjs into any HTML page."
            code={SCRIPT_TAG_CODE}
            language="html"
          >
            <div id="integration-script-note" className="text-sm text-slate-600">
              Loads AHDjs from a CDN and registers tooltips on page load.
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
                  'Registers and renders all tooltips (and tours) published for the given slug.',
                type: '(slug: string, refetch: boolean) => Promise<void>',
              },
              {
                property: 'stop()',
                description: 'Removes all active tooltips from the page.',
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

export default function ShowTooltipsButton() {
  const ahdRef = useRef(null);

  const showTooltips = async () => {
    const ahdJs = AHDjs(undefined, {
      applicationId: '${DEMO_APPLICATION_ID}',
      apiHost: '${AHD_API_HOST}',
      visitorId: 'visitor-id',
    });
    ahdRef.current = ahdJs;

    await ahdJs.initializeSiteMap(false);
    await ahdJs.showHighlights('${TOOLTIP_SLUG}', true);
  };

  useEffect(() => () => ahdRef.current?.stop(), []);

  return (
    <>
      <button onClick={showTooltips}>Show Tooltips</button>
      <button id="tooltip-new-project">+ New project</button>
      <button id="tooltip-invite">Invite members</button>
    </>
  );
}`;

const BASIC_CODE = `import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

const ahdJs = AHDjs(undefined, {
  applicationId: '${DEMO_APPLICATION_ID}',
  apiHost: '${AHD_API_HOST}',
  visitorId: 'visitor-id',
});

await ahdJs.initializeSiteMap(false);
await ahdJs.showHighlights('${TOOLTIP_SLUG}', true);`;

const SCRIPT_TAG_CODE = `<link rel="stylesheet" href="https://unpkg.com/ahdjs/build/css/index.css" />
<script type="text/javascript" src="https://unpkg.com/ahdjs/build/index.js"></script>
<script>
  const AHDjs = window.AHDjs.default;
  const _ahdJs = new AHDjs(undefined, {
    applicationId: '${DEMO_APPLICATION_ID}',
    apiHost: '${AHD_API_HOST}',
    visitorId: 'visitor-id',
  });
  _ahdJs.initializeSiteMap();
  _ahdJs.showHighlights('${TOOLTIP_SLUG}', true);
</script>`;

export default Tooltips;
