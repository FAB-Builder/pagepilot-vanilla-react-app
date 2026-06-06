import { ExternalLink } from 'lucide-react';
import { AHD_API_HOST, DEMO_APPLICATION_ID } from '../lib/ahd';
import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';
import PropertyCard from '../components/PropertyCard';
import AiPromptBlock from '../components/AiPromptBlock';

const DEMO_ID = '6a22c1d7b237c3d4ae94bf2f';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live demo' },
  { id: 'integration', label: 'Integration' },
  { id: 'ai-prompt', label: 'Integrate using AI' },
  { id: 'steps', label: 'Steps' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'backdrop', label: 'Backdrop' },
  { id: 'device-language', label: 'Device & Language' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'styling', label: 'Step styling' },
  { id: 'api', label: 'API reference' },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
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

function Demos() {
  return (
    <DocLayout title="Demos" sections={SECTIONS}>
      <article className="">
        <header className="mb-8 border-b border-slate-200 pb-6">
          
          <h1 className="mt-1 text-3xl font-bold">Demos</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A demo is a multi-step interactive presentation that showcases product features in
            sequence. Demo steps are <strong>not bound to page elements</strong> — they float freely
            as a story-like slideshow. Once published, share it via a <strong>link</strong> or embed
            it anywhere as an <strong>iframe</strong> — no SDK integration required.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A demo has <strong>demo-level settings</strong> (device, language, scheduling) and a list
            of <strong>steps</strong>. Each step is a canvas card with its own content, background
            image, and dimensions. The sections below document every property you configure in the
            PagePilot admin.
          </p>
          <p>
            <strong>Demo vs. Tour</strong> — use a <em>tour</em> to walk users through a real task
            in your app using element selectors. Use a <em>demo</em> for a controlled, self-contained
            presentation that works independently of the page DOM.
          </p>
        </Section>

        <Section id="live-demo" title="Live demo">
          <p>
            The demo below is embedded live — the same iframe your users see after you publish and
            share. Click through it to experience the step-by-step flow.
          </p>
          <div className="mb-3 flex justify-end">
              <a
                href={`https://pagepilot-demo-viewer-prod.web.app//?tid=${DEMO_APPLICATION_ID}&did=${DEMO_ID}&type=demo&status=live`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-brand hover:text-brand"
              >
                <ExternalLink size={14} />
                Show on full page
              </a>
            </div>
            <div
              style={{ position: 'relative', paddingBottom: 'calc(54.75% + 25px)', width: '100%', height: 0 }}
            >
              <iframe
                loading="lazy"
                src={`https://pagepilot-demo-viewer-prod.web.app//?tid=${DEMO_APPLICATION_ID}&did=${DEMO_ID}&type=demo&status=live`}
                allow="fullscreen"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: '1px solid rgba(63,95,172,0.35)',
                  boxShadow: '0px 0px 18px rgba(26,19,72,0.15)',
                  borderRadius: '10px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
        </Section>

        <Section id="integration" title="Integration">
          <p>
            After publishing, PagePilot shows an integration dialog with two options. No SDK or build
            step is required.
          </p>

          <h3 className="mt-6 text-base font-semibold text-ink">Share link</h3>
          <p className="text-sm">
            A direct URL that opens the demo in the PagePilot viewer. Share it in emails, Slack, or
            anywhere.
          </p>
          <DemoBlock
            title="Share link"
            description="Copy from the Share Link tab in the integration dialog after publishing."
            code={SHARE_LINK}
            language="text"
          />
          <ApiTable
            rows={[
              { property: 'tid', description: 'Your PagePilot tenant ID.', type: 'string' },
              { property: 'did', description: 'The demo record ID.', type: 'string' },
              { property: 'type', description: 'Always "demo".', type: "'demo'" },
              { property: 'status', description: 'Always "live".', type: "'live'" },
            ]}
          />

          <h3 className="mt-6 text-base font-semibold text-ink">Embed (iframe)</h3>
          <p className="text-sm">
            Drop this snippet into any HTML page to render the demo inline. Copy it from the{' '}
            <strong>Embed Demo</strong> tab in the integration dialog.
          </p>
          <DemoBlock
            title="Embed code"
            description="Paste into any HTML page — no SDK needed."
            code={EMBED_CODE}
            language="html"
          />
          <p className="text-sm text-slate-600">
            Replace <Code>YOUR_TENANT_ID</Code> and <Code>YOUR_DEMO_ID</Code> with the values shown
            in the PagePilot admin after publishing.
          </p>
        </Section>

        <Section id="ai-prompt" title="Integrate using AI">
          <p className="text-sm text-slate-600">
            Want the embed dropped into the right place automatically? Hand this prompt to Cursor,
            Claude, or GitHub Copilot — it adds the responsive iframe (or share link) to your page.
          </p>
          <AiPromptBlock id="demos-ai-prompt" prompt={AI_PROMPT} />
        </Section>

        <Section id="steps" title="Steps">
          <p>
            A demo is made up of one or more steps. Each step is a full-canvas card that floats on
            screen — <strong>no element selector is needed or used</strong>. Steps are shown in order;
            visitors advance with next / previous controls or automatically.
          </p>
          <ApiTable
            rows={[
              { property: 'title', description: 'Heading text shown at the top of the step card.', type: 'string' },
              { property: 'content', description: 'Body copy for the step (supports rich text / HTML).', type: 'string | HTML' },
              { property: 'backgroundImage', description: 'URL of an image rendered as the step card background.', type: 'string (URL)' },
              { property: 'position', description: 'Placement of the card on screen.', type: "'top' | 'bottom' | 'left' | 'right' | 'center'", default: "'center'" },
              { property: 'width / height', description: 'Canvas dimensions of the step card in pixels.', type: 'number (px)' },
              { property: 'top / left', description: 'Absolute canvas offset for the step card.', type: 'number (px)' },
              { property: 'canvasWidth / canvasHeight', description: 'Reference canvas size used to scale the step proportionally.', type: 'number (px)' },
            ]}
          />
        </Section>

        <Section id="navigation" title="Navigation">
          <p>Control how users move between steps.</p>
          <ApiTable
            rows={[
              { property: 'navigationMode', description: '"manual" — visitor clicks next/previous. "auto" — steps advance automatically after a delay. "both" — auto-advance while still letting the visitor navigate manually.', type: "'manual' | 'auto' | 'both'", default: "'manual'" },
              { property: 'navigationDelay', description: 'Milliseconds between auto-advance steps (auto / both modes only).', type: 'number', default: '3000' },
              { property: 'dismissSettings', description: 'How the visitor can close the demo mid-flow.', type: "'onOutSideClick' | 'dismissButtonClickOnly' | 'buttonClickOnly'", default: "'onOutSideClick'" },
              { property: 'showCloseIcon', description: 'Whether the close (×) button is visible on each step.', type: 'boolean', default: 'true' },
            ]}
          />
        </Section>

        <Section id="backdrop" title="Backdrop">
          <p>
            An optional dimmed overlay behind the step card. Because demo steps don't target specific
            elements, the backdrop dims the entire page behind the floating card.
          </p>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>isBackdrop</strong> — render the full-page dimmed overlay behind the card.
          </PropertyCard>
        </Section>

        <Section id="device-language" title="Device & Language">
          <p>Restrict the demo to a specific device type and serve localised content.</p>
          <PropertyCard type="'desktop' | 'tablet' | 'mobile'" defaultValue="'desktop'">
            <strong>device</strong> — the demo is only served on the matching device type.
          </PropertyCard>
          <PropertyCard type="'en' | 'hi'" defaultValue="'en'">
            <strong>language</strong> — locale of the demo content.
          </PropertyCard>
        </Section>

        <Section id="scheduling" title="Scheduling">
          <p>
            Control the window during which the demo is served. Outside this window PagePilot does not
            return the demo.
          </p>
          <PropertyCard type="Date" defaultValue="now">
            <strong>Start date</strong> — when the demo goes live.
          </PropertyCard>
          <PropertyCard type="Date | null" defaultValue="null">
            <strong>End date</strong> — when it stops. Toggle <strong>Run Forever</strong> to keep it
            active indefinitely.
          </PropertyCard>
          <p className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Demos always run every time a visitor triggers them —{' '}
            <strong>Show only once</strong> is not available for demos.
          </p>
        </Section>

        <Section id="styling" title="Step styling">
          <p>Each step card can be styled independently of your app's CSS.</p>
          <ApiTable
            rows={[
              { property: 'canvasColor', description: 'Background color of the step card.', type: 'string (hex)', default: "'#FFFFFF'" },
              { property: 'textColor', description: 'Text color inside the card.', type: 'string (hex)', default: "'#262626'" },
              { property: 'fontFamily', description: 'Font family for the card content.', type: 'string', default: "'MODERN_SANS'" },
              { property: 'borderRadius', description: 'Card corner radius in pixels.', type: 'number', default: '8' },
              { property: 'borderColor', description: 'Card border color.', type: 'string (hex)' },
              { property: 'borderWidth', description: 'Card border width in pixels.', type: 'number', default: '0' },
              { property: 'iconCloseColor', description: 'Color of the close (×) icon.', type: 'string (hex)', default: "'#64748B'" },
              { property: 'animationType', description: 'How each step card enters the screen. "slide" supports a direction (slideDown / slideLeft / slideRight).', type: "'instant' | 'fadeIn' | 'slide'", default: "'fadeIn'" },
            ]}
          />
        </Section>

        <Section id="api" title="API reference">
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            The SDK is <strong>not required</strong> for demos. Use the share link or embed code
            instead. The methods below are only relevant if you want to trigger a demo
            programmatically from your own code.
          </p>
          <h3 className="mb-2 mt-4 text-base font-semibold text-ink">Constructor options</h3>
          <ApiTable
            rows={[
              { property: 'applicationId', description: 'Your PagePilot application ID.', type: 'string' },
              { property: 'apiHost', description: 'PagePilot API host.', type: 'string', default: `'${AHD_API_HOST}'` },
              { property: 'visitorId', description: 'Per-visitor identifier used for analytics tracking.', type: 'string' },
              { property: 'showProgressbar', description: 'Show a progress bar across demo steps.', type: 'boolean', default: 'false' },
            ]}
          />
          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Methods</h3>
          <ApiTable
            rows={[
              { property: 'initializeSiteMap(refetch)', description: 'Fetches published content. Call once before showHighlights.', type: '(refetch: boolean) => Promise<void>' },
              { property: 'showHighlights(slug, refetch)', description: 'Starts the demo programmatically.', type: '(slug: string, refetch: boolean) => Promise<void>' },
              { property: 'stop()', description: 'Stops the running demo and removes it from the DOM.', type: '() => void' },
            ]}
          />
        </Section>
      </article>
    </DocLayout>
  );
}

/* ------------------------------- Snippets ------------------------------- */

const AI_PROMPT = `Embed a PagePilot demo into my application. Do the following steps automatically:

No npm install or SDK setup is required. PagePilot demos are embedded via an iframe.

Add the following responsive iframe embed to the page where the demo should appear:

<div style="position:relative;padding-bottom:calc(54.75% + 25px);width:100%;height:0;">
  <iframe
    loading="lazy"
    src="https://pagepilot-demo-viewer-prod.web.app/?tid=YOUR_TENANT_ID&did=YOUR_DEMO_ID&type=demo&status=live"
    style="position:absolute;top:0;left:0;width:100%;height:100%;"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

Replace YOUR_TENANT_ID and YOUR_DEMO_ID with the values shown in the PagePilot admin integration dialog after publishing the demo.

If my project uses React or JSX, convert the HTML attributes accordingly (style as an object, frameBorder, allowFullScreen).

Detect my framework (React, Next.js, Vue, plain HTML, etc.) and produce the embed in the correct syntax.`;

const SHARE_LINK = `https://pagepilot-demo-viewer-prod.web.app/?tid=YOUR_TENANT_ID&did=YOUR_DEMO_ID&type=demo&status=live`;

const EMBED_CODE = `<div style="position:relative;padding-bottom:calc(54.75% + 25px);width:100%;height:0;">
  <iframe
    loading="lazy"
    src="https://pagepilot-demo-viewer-prod.web.app/?tid=YOUR_TENANT_ID&did=YOUR_DEMO_ID&type=demo&status=live"
    style="position:absolute;top:0;left:0;width:100%;height:100%;"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>`;

export default Demos;
