import type { ReactNode } from 'react';
import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import ApiTable from '../../../components/ApiTable';
import { PAGES_SUBMODULES } from '../subModules';
import {
  SCRIPT_TAGS,
  NEXT_APP_ROUTER,
  REACT_SPA,
  DANGEROUS_HTML,
  RE_INIT,
  CSP,
  ANIMATION_MARKUP,
} from './snippets';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Why scripts are needed' },
  { id: 'which', label: 'Which block needs which' },
  { id: 'enabling', label: 'Turning them on' },
  { id: 'embedding', label: 'Loading them yourself' },
  { id: 'dynamic', label: 'Content that loads late' },
  { id: 'animations', label: 'Animations' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

function Note({
  tone = 'default',
  label,
  children,
}: {
  tone?: 'default' | 'warn';
  label: string;
  children: ReactNode;
}) {
  const styles =
    tone === 'warn' ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white';
  return (
    <div className={`my-4 rounded-xl border p-4 text-sm text-slate-600 ${styles}`}>
      <strong className="text-ink">{label}</strong> {children}
    </div>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <p className="mt-6 mb-2 font-semibold text-ink">{children}</p>;
}

export default function RuntimeScripts() {
  return (
    <DocLayout
      title="Runtime Scripts & Animations"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Runtime Scripts &amp; Animations
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Tabs, carousels, pagination, timers and animations need JavaScript to actually do
            something once published. Page Pilot hosts one small script per feature — this page
            covers when they're needed, how to include them, and what to do when your app injects
            the HTML itself.
          </p>
          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <p className="text-sm font-semibold text-ink">Applies to everything you publish</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Not just Pages. The same blocks — and therefore the same scripts — are available
              inside <strong>Tours</strong>, <strong>Tooltips</strong>,{' '}
              <strong>App Banners</strong>, <strong>Demos</strong> and <strong>FAQs</strong>. Every
              one of those has the same <strong>Scripts &amp; Styles</strong> tab in its publish
              dialog.
            </p>
          </div>
        </header>

        {/* ================================================================ */}
        <Section id="overview" title="Why scripts are needed">
          <p>
            Everything Page Pilot publishes — a page, a tour step, a tooltip, an app banner, a demo
            — is <strong>static HTML</strong>. Most blocks need nothing more than that: text,
            images, layout and even per-device styling are all handled by markup and CSS.
          </p>
          <p>
            But some blocks are interactive. A carousel has to respond to a click on the arrow. A
            tab has to swap panels. Those behaviours can't be expressed in CSS, so Page Pilot ships
            a small script for each one, hosted at:
          </p>
          <div className="my-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-700">
            https://pagepilot.fabbuilder.com/scripts/
          </div>
          <p>
            Each script is independent and only touches its own blocks — it finds them by data
            attributes in the markup. Include only the ones your page actually uses.
          </p>
          <Note label="Blocks degrade rather than break.">
            Without its script a carousel still shows its first slide and a tab still shows its
            first panel — you get a static version of the block, not an empty gap or an error.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="which" title="Which block needs which script">
          <ApiTable
            rows={[
              {
                property: 'pagePilotTabs.js',
                description:
                  'Tabs block — panel switching, keyboard navigation, and smooth scroll-to-section for tabs set to "Scroll to selected section".',
                type: 'Tabs',
              },
              {
                property: 'pagePilotCarousel.js',
                description:
                  'Carousel block — arrows, dots, autoplay and touch swipe.',
                type: 'Carousel',
              },
              {
                property: 'pagePilotPagination.js',
                description:
                  'Pagination block — page numbers, prev/next, and URL sync (?page=2) for deep links.',
                type: 'Pagination',
              },
              {
                property: 'pagePilotTimer.js',
                description:
                  'Timer block — makes the countdown actually tick. Without it the timer renders the time remaining as at page load and stays there.',
                type: 'Timer',
              },
              {
                property: 'pagePilotAnimation.js',
                description:
                  'Any animated block — entrance and scroll animations on Image, Container, Button, Avatar, Logo, Heading and Text.',
                type: 'Animations',
              },
              {
                property: 'pagePilotDemoScale.js',
                description:
                  'Demo block — scales the embedded demo to fit its container.',
                type: 'Demo',
              },
            ]}
          />
          <Note label="Accessibility Tools is the exception.">
            That block bundles its own JavaScript inline with its markup, so it needs no separate
            script and no publish option.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="enabling" title="Turning them on">
          <p>
            Open the <strong>Publish</strong> dialog and switch to the{' '}
            <strong>Scripts &amp; Styles</strong> tab. Page Pilot scans the content and lists a
            checkbox only for the scripts it actually needs — content with no carousel never shows
            the carousel option.
          </p>
          <p>
            Each row shows the script's URL with a copy button. Leave the boxes ticked and the
            script tags go into the published HTML for you.
          </p>
          <Note label="Same tab wherever you publish.">
            Pages, Tours, Tooltips, App Banners, Demos and FAQs all share this behaviour — if the
            content contains an interactive block, the matching option appears. A tour step with a
            carousel in it needs the carousel script exactly as a page would.
          </Note>
          <Note tone="warn" label="Ticking the box is not always enough.">
            If your application renders the page by injecting raw HTML, those injected{' '}
            <Code>&lt;script&gt;</Code> tags will not run — see the next section. This is the
            single most common reason a carousel "doesn't work" on a live site.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="embedding" title="Loading them yourself">
          <H3>The problem</H3>
          <p>
            Browsers deliberately ignore <Code>&lt;script&gt;</Code> tags inserted through{' '}
            <Code>innerHTML</Code>. If you fetch a page's HTML and render it with{' '}
            <Code>dangerouslySetInnerHTML</Code> — the normal pattern when embedding Page Pilot
            content in your own app — the markup appears but the script never executes.
          </p>
          <CodeSnippet code={DANGEROUS_HTML} language="tsx" title="the gotcha" />
          <p>
            The fix is simple: keep injecting the HTML exactly as you do now, and load the script
            once from your own app shell instead.
          </p>

          <Note tone="warn" label="This affects SDK-rendered content too.">
            Tours, tooltips and app banners are injected into your app by AHDjs at runtime, which
            means their markup also arrives through the DOM rather than a page load. If a tour step
            contains a carousel or an animated block, load that script from your app shell — the
            same fix, for the same reason.
          </Note>

          <H3>Plain HTML</H3>
          <CodeSnippet code={SCRIPT_TAGS} language="html" title="index.html" />

          <H3>Next.js</H3>
          <CodeSnippet code={NEXT_APP_ROUTER} language="tsx" title="app/layout.tsx" />

          <H3>React (Vite, CRA, any SPA)</H3>
          <CodeSnippet code={REACT_SPA} language="tsx" title="App.tsx" />
          <Note label="Load once, at app level.">
            Don't load these inside a component that mounts per page — you'd add a duplicate tag on
            every navigation. The guard in the example above makes that harmless, but app-level is
            still the right place.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="dynamic" title="Content that loads late">
          <p>
            A common worry: the script loads at startup, but your page content arrives afterwards
            — from a fetch, a client-side route change, or a modal opening. Does the block still
            get wired up?
          </p>
          <p>
            <strong>Yes, automatically.</strong> Every script attaches a{' '}
            <Code>MutationObserver</Code> to the document and re-runs its initialisation whenever
            new nodes appear. Elements it has already handled are skipped, so re-binding costs
            almost nothing.
          </p>
          <CodeSnippet code={RE_INIT} language="tsx" title="nothing extra to do" />
          <Note label="No init function to call.">
            There's no <Code>window.PagePilot*.init()</Code> API — the scripts are self-contained
            and self-rebinding. If a block isn't working after a route change, the cause is
            something else; see Troubleshooting.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="animations" title="Animations">
          <p>
            Seven blocks — <strong>Image</strong>, <strong>Container</strong>,{' '}
            <strong>Button</strong>, <strong>Avatar</strong>, <strong>Logo</strong>,{' '}
            <strong>Heading</strong> and <strong>Text</strong> — have an animation section in their
            sidebar. All of them are driven by the single{' '}
            <Code>pagePilotAnimation.js</Code> script.
          </p>

          <H3>Options</H3>
          <ApiTable
            rows={[
              {
                property: 'type',
                description:
                  'fade-in, slide-left, slide-right, slide-up, slide-down, zoom-in, or bounce. Set to none to disable.',
                type: 'enum',
                default: 'none',
              },
              {
                property: 'trigger',
                description:
                  'load — plays immediately. scroll — plays when the element enters the viewport. hover / click — plays on interaction.',
                type: 'enum',
                default: 'load',
              },
              {
                property: 'speed',
                description: 'slow (1.2s), medium (0.7s), or fast (0.35s).',
                type: 'enum',
                default: 'medium',
              },
              {
                property: 'delay',
                description:
                  'Milliseconds to wait before playing, up to 10000. Useful for staggering several elements.',
                type: 'number',
                default: '0',
              },
              {
                property: 'disableOnMobile',
                description:
                  'Skips the animation at mobile width, where entrance motion is often more distracting than useful.',
                type: 'boolean',
                default: 'false',
              },
            ]}
          />

          <H3>How it renders</H3>
          <p>
            The editor writes your settings onto the element as data attributes. The stylesheet
            defines the motion; the script reads the attributes and applies the timing.
          </p>
          <CodeSnippet code={ANIMATION_MARKUP} language="html" title="published markup" />

          <Note label="Nothing shifts on the page.">
            Animations only ever use <Code>transform</Code> and <Code>opacity</Code> — never width,
            height or margin — so playing one can't reflow the page or push content around.
          </Note>

          <H3>Without the script</H3>
          <p>
            This is the one case worth understanding properly. Elements set to animate on{' '}
            <strong>scroll</strong>, <strong>hover</strong> or <strong>click</strong> would
            normally start hidden, waiting for their trigger — so if the script never loaded, they
            would stay invisible forever.
          </p>
          <p>
            To prevent that, the "start hidden" rule is scoped behind a class that{' '}
            <em>only the script itself adds</em>, once it has loaded and bound. No script means the
            rule never applies and every element simply renders in its normal, visible state.
          </p>
          <Note label="So a missing animation script costs you the animation, not the content.">
            Worth knowing when deciding whether to bother including it — a page without it looks
            static, never broken.
          </Note>

          <H3>Reduced motion</H3>
          <p>
            Visitors who have asked their operating system to reduce motion get no animations. This
            is handled for you and isn't configurable.
          </p>
        </Section>

        {/* ================================================================ */}
        <Section id="troubleshooting" title="Troubleshooting">
          <H3>The block renders but doesn't respond</H3>
          <p>
            The script isn't running. Open your browser's Network tab and check whether the{' '}
            <Code>pagePilot*.js</Code> request appears and returns 200. If it isn't there at all,
            you're hitting the <Code>innerHTML</Code> problem — load the script from your app shell
            instead.
          </p>

          <H3>Works in preview, not on the live site</H3>
          <p>
            Page Pilot's own preview renders the page directly, so injected script tags run
            normally. Your application probably embeds the HTML instead. Same fix as above.
          </p>

          <H3>Blocked by Content-Security-Policy</H3>
          <p>
            If your site sets a CSP header, it must allow the Page Pilot script host. A blocked
            script shows as a console error naming the directive that rejected it.
          </p>
          <CodeSnippet code={CSP} language="bash" title="CSP header" />

          <H3>Animations never play</H3>
          <p>
            Check the trigger first — an element set to <Code>scroll</Code> only animates when
            scrolled into view, so one already visible on load may look like it did nothing. Then
            check <Code>disableOnMobile</Code>, and whether the visitor has reduced motion enabled.
          </p>

          <H3>Works on first load, breaks after navigating</H3>
          <p>
            The scripts re-bind on DOM changes automatically, so this usually means the script tag
            was removed along with the previous page's markup — a sign it was loaded inside a
            per-page component rather than the app shell.
          </p>
        </Section>
      </article>
    </DocLayout>
  );
}
