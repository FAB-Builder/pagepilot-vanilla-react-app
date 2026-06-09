import { useEffect, useRef, useState } from 'react';
import {
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  CircleDot,
  Info,
} from 'lucide-react';
import { createAhd, AHD_API_HOST, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';
import PropertyCard from '../components/PropertyCard';
import AiPromptBlock from '../components/AiPromptBlock';

const TOOLTIP_SLUG = '/tooltips';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live demo' },
  { id: 'integration', label: 'Integration' },
  { id: 'ai-prompt', label: 'Integrate using AI' },
  { id: 'target-page', label: 'Target Page' },
  { id: 'selector', label: 'Element / Selector' },
  { id: 'trigger', label: 'Trigger behaviour' },
  { id: 'position', label: 'Position' },
  { id: 'backdrop', label: 'Backdrop' },
  { id: 'device-language', label: 'Device & Language' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'show-once', label: 'Show only once' },
  { id: 'styling', label: 'Styling' },
  { id: 'api', label: 'API reference' },
];

type Status = 'idle' | 'loading' | 'running' | 'error';

function LiveTooltipDemo() {
  const ahdRef = useRef<AhdInstance | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const showTooltips = async () => {
      setError(null);
      setStatus('loading');
      try {
        const ahd = createAhd({ applicationId: DEMO_APPLICATION_ID });
        ahdRef.current = ahd;
        await ahd.initializeSiteMap(false);
        await ahd.showHighlights(TOOLTIP_SLUG, true);
        if (!cancelled) setStatus('running');
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load tooltips.');
        setStatus('error');
      }
    };

    showTooltips();

    return () => {
      cancelled = true;
      ahdRef.current?.stop();
    };
  }, []);

  return (
    <div id="tooltips-live-demo" className="flex flex-col gap-4">
      <div id="tooltips-live-controls" className="flex items-center gap-3">
        {status === 'loading' && (
          <span
            id="tooltips-status-loading"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500"
          >
            <Lightbulb size={15} /> Loading tooltips…
          </span>
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
  <code id={id} className="inline-block max-w-full break-all rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
    {children}
  </code>
);

function Tooltips() {
  return (
    <DocLayout title="Tooltips" sections={SECTIONS}>
      <article id="tooltips-article" className="">
        <header id="tooltips-header" className="mb-8 border-b border-slate-200 pb-6">
          
          <h1 id="tooltips-title" className="mt-1 text-3xl font-bold" style={{width:"fit-content"}}>
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
            The tooltips published against the <Code id="live-demo-slug">{TOOLTIP_SLUG}</Code> slug
            load <strong id="live-demo-cta-text">automatically</strong> as soon as you open this
            page — exactly as they would on a real route. Hover or click the sample buttons below to
            see them in action.
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

        <Section id="integration" title="Integration">
          <p id="integration-text">
            Tooltips use the exact same SDK call as tours —{' '}
            <Code id="integration-method">showHighlights(slug, true)</Code>. PagePilot looks up
            everything published for that slug (tooltips and tours) and renders it. So if you've
            already wired PagePilot for tours, tooltips work with no extra code.
          </p>

          <ol
            id="integration-steps"
            className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600"
          >
            <li>
              <strong className="text-ink">1. Install</strong> — add the package with{' '}
              <Code id="integration-step-install">npm install ahdjs</Code> (or load it from a CDN
              via a script tag).
            </li>
            <li>
              <strong className="text-ink">2. Configure</strong> — create the client with your{' '}
              <Code id="integration-step-appid">applicationId</Code> and pass the logged-in user's
              id as <Code id="integration-step-visitor">visitorId</Code> (used for "show only once"
              tracking).
            </li>
            <li>
              <strong className="text-ink">3. Run on mount</strong> — call{' '}
              <Code id="integration-step-init">initializeSiteMap()</Code> then{' '}
              <Code id="integration-step-show">showHighlights("{TOOLTIP_SLUG}", true)</Code> once
              the target elements exist on the page.
            </li>
          </ol>

          <h3 id="integration-react-heading" className="mt-6 text-base font-semibold text-ink">
            React / framework app (npm)
          </h3>
          <p id="integration-react-text" className="text-sm text-slate-600">
            Call <Code id="integration-react-method">showHighlights("{TOOLTIP_SLUG}", true)</Code>{' '}
            after the page mounts to register every tooltip published for that slug.
          </p>
          <DemoBlock
            title="Initialize and load tooltips"
            description="Runs once when the component mounts; cleans up on unmount."
            code={BASIC_CODE}
          />

          <h3 id="integration-script-heading" className="mt-6 text-base font-semibold text-ink">
            Plain HTML (script tag)
          </h3>
          <p id="integration-script-text" className="text-sm text-slate-600">
            No build step. Drop this into the <Code id="integration-head">&lt;head&gt;</Code> of any
            page where the tooltips should appear.
          </p>
          <DemoBlock
            title="CDN script tag"
            description="Loads AHDjs from unpkg and registers tooltips on page load."
            code={SCRIPT_TAG_CODE}
            language="html"
          />
        </Section>

        <Section id="ai-prompt" title="Integrate using AI">
          <p id="ai-prompt-text" className="text-sm text-slate-600">
            Don't want to wire it by hand? Hand this prompt to Cursor, Claude, or GitHub Copilot —
            it covers install, config, and the{' '}
            <Code id="ai-prompt-call">showHighlights</Code> call so tooltips load on the right page.
          </p>
          <AiPromptBlock id="tooltips-ai-prompt" prompt={AI_PROMPT} />
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
            Two settings work together: <strong>Trigger Behaviour</strong> decides{' '}
            <em>which interaction</em> opens the tooltip card, and{' '}
            <strong>Trigger Label and Icons</strong> decides <em>what the visitor sees</em> on the
            element beforehand to discover it.
          </p>
          <ApiTable
            rows={[
              {
                property: 'triggerBehaviour',
                description:
                  'Interaction that opens the tooltip card. "onPageLoad" is only available for tooltips.',
                type: "'onClick' | 'onHover' | 'onMouseEnter' | 'onMouseLeave' | 'onPageLoad'",
                default: "'onClick'",
              },
              {
                property: 'triggerMode',
                description:
                  'How users discover the tooltip. "icon" shows an icon/beacon; "label" shows a text label; "noIcon" attaches the trigger to the element itself with no marker.',
                type: "'icon' | 'noIcon' | 'label'",
                default: "'noIcon'",
              },
              {
                property: 'triggerIcon.type',
                description: 'Icon variant shown when triggerMode is "icon" (see styles below).',
                type: "'warning' | 'helpIcon' | 'beacon' | 'info'",
                default: "'helpIcon'",
              },
              {
                property: 'triggerIcon.color',
                description: 'Icon / beacon color.',
                type: 'string (hex)',
                default: "'#6366F1'",
              },
              {
                property: 'triggerIcon.isAnimated',
                description: 'Pulse animation — only applies to the "beacon" icon type.',
                type: 'boolean',
                default: 'false',
              },
              {
                property: 'triggerLabel.text',
                description: 'Text shown when triggerMode is "label".',
                type: 'string',
              },
              {
                property: 'triggerLabel.color',
                description: 'Text color of the label trigger.',
                type: 'string (hex)',
                default: "'#FFFFFF'",
              },
              {
                property: 'triggerLabel.background',
                description: 'Background color of the label trigger.',
                type: 'string (hex)',
                default: "'#000000'",
              },
              {
                property: 'delay',
                description: 'Milliseconds to wait before showing the card.',
                type: 'number',
                default: '300',
              },
            ]}
          />

          <h3 id="trigger-icon-styles-heading" className="mb-3 mt-6 text-base font-semibold text-ink">
            Icon styles
          </h3>
          <p id="trigger-icon-styles-text" className="mb-3">
            When <Code id="trigger-icon-mode">triggerMode</Code> is{' '}
            <Code id="trigger-icon-icon">'icon'</Code>, pick one of four beacon styles. The{' '}
            <strong>Animated Beacon</strong> toggle is only shown for the{' '}
            <Code id="trigger-icon-beacon">beacon</Code> style.
          </p>
          <div
            id="trigger-icon-grid"
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {(
              [
                { type: 'warning', label: 'Warning', Icon: AlertTriangle },
                { type: 'helpIcon', label: 'Help', Icon: HelpCircle },
                { type: 'beacon', label: 'Beacon', Icon: CircleDot },
                { type: 'info', label: 'Info', Icon: Info },
              ] as const
            ).map(({ type, label, Icon }) => (
              <div
                key={type}
                id={`trigger-icon-option-${type}`}
                className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-4 text-center"
              >
                <Icon size={22} className="text-brand" />
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <code className="font-mono text-[11px] text-slate-400">{type}</code>
              </div>
            ))}
          </div>
        </Section>

        <Section id="position" title="Position">
          <p id="position-text">
            Where the tooltip card is placed relative to its target element.
          </p>
          <PropertyCard
            type="'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'center'"
            defaultValue="'right'"
          >
            <span id="position-prop">
              Stored as <Code id="position-preferred">preferredPosition</Code>. PagePilot uses it as
              the <em>preferred</em> placement — if there is not enough viewport space the card
              automatically flips to the opposite side. Available placements depend on the anchor
              element's room on screen.
            </span>
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <span id="caret-prop">
              <strong>Caret (isCaret)</strong> — show a small pointer arrow between the card and the
              element.
            </span>
          </PropertyCard>
          <div id="position-grid" className="mt-4 grid grid-cols-3 gap-2">
            {(
              [
                'top-left',
                'top',
                'top-right',
                'left',
                'center',
                'right',
                'bottom-left',
                'bottom',
                'bottom-right',
              ] as const
            ).map((p) => (
              <div
                key={p}
                id={`position-option-${p}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-4 text-center text-sm font-medium text-slate-700"
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
                property: 'closeIconPosition',
                description: 'Where the close icon sits on the card.',
                type: "'left' | 'center' | 'right'",
                default: "'right'",
              },
              {
                property: 'animationType',
                description:
                  'How the card enters the screen. "slide" supports a direction (slideDown / slideLeft / slideRight).',
                type: "'instant' | 'fadeIn' | 'slide' | 'slideDown' | 'slideLeft' | 'slideRight'",
                default: "'fadeIn'",
              },
              {
                property: 'dismissSettings',
                description: 'How the visitor is allowed to close the tooltip card.',
                type: "'onOutSideClick' | 'dismissButtonClickOnly' | 'buttonClickOnly'",
                default: "'onOutSideClick'",
              },
            ]}
          />
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

const AI_PROMPT = `Do the following steps automatically:

Install the ahdjs npm package.

Import AHDjs and its CSS (ahdjs/build/css/index.css) in the application entry file (prefer index.js or main.tsx).

Initialize AHDjs with the following configuration:

applicationId: "YOUR_APPLICATION_ID"

apiHost: "${AHD_API_HOST}"

visitorId: "visitor-id"

showProgressbar: false

Call:

initializeSiteMap()

showHighlights("target-page", true) //  Replace 'target-page' with the actual Target Page where you want to show tooltips.

Ensure the initialization runs only once when the app loads (use useEffect if needed).

Add brief comments explaining what each step does.`;

const LIVE_DEMO_CODE = `import { useEffect, useRef } from 'react';
import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

// Tooltips load automatically when the route mounts — no button needed.
export default function TooltipsPage() {
  const ahdRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const ahdJs = AHDjs(undefined, {
        applicationId: '${DEMO_APPLICATION_ID}',
        apiHost: '${AHD_API_HOST}',
        visitorId: 'visitor-id',
      });
      ahdRef.current = ahdJs;

      await ahdJs.initializeSiteMap(false);
      if (!cancelled) await ahdJs.showHighlights('${TOOLTIP_SLUG}', true);
    })();

    return () => {
      cancelled = true;
      ahdRef.current?.stop();
    };
  }, []);

  return (
    <>
      <button id="tooltip-new-project">+ New project</button>
      <button id="tooltip-invite">Invite members</button>
    </>
  );
}`;

const BASIC_CODE = `import { useEffect, useRef } from 'react';
import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

export function useTooltips(slug) {
  const ahdRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const ahdJs = AHDjs(undefined, {
        applicationId: 'YOUR_APPLICATION_ID',
        apiHost: '${AHD_API_HOST}',
        // Pass the logged-in user's id from your auth system so PagePilot
        // can track "show only once" per user. e.g. currentUser.id
        visitorId: currentUser.id,
      });
      ahdRef.current = ahdJs;

      await ahdJs.initializeSiteMap(false);
      if (!cancelled) await ahdJs.showHighlights(slug, true);
    })();

    // Clean up tooltips when the component unmounts.
    return () => {
      cancelled = true;
      ahdRef.current?.stop();
    };
  }, [slug]);
}

// Usage: call it on the page where the tooltips are published.
// useTooltips('${TOOLTIP_SLUG}');`;

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
