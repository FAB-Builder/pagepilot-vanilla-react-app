import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'layouts', label: 'Layouts' },
  { id: 'target', label: 'Target date' },
  { id: 'expired', label: 'When it expires' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'ticking', label: 'Making it tick' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function TimerBlock() {
  return (
    <DocLayout
      title="Timer"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Timer Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A countdown to a fixed date and time — for launches, offer deadlines, and event
            starts. Three visual layouts, with configurable behaviour once the deadline passes.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            You set a target date; the block works out the remaining days, hours, minutes and
            seconds and renders them in your chosen layout.
          </p>
          <p>
            You'll find it under <strong>Embeds/Integrations</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="warning" title="The countdown needs a script">
            Page Pilot hosts a small <Code>pagePilotTimer.js</Code> that makes the numbers tick.
            Enable it when publishing, or load it yourself — see{' '}
            <a className="text-brand hover:underline" href="/pagepilot-vanilla-react-app/pages/runtime-scripts">
              Runtime Scripts &amp; Animations
            </a>
            . Without it the timer renders the time remaining at page load and stays there.
          </BlockCallout>
        </Section>

        <Section id="layouts" title="Layouts">
          <PropertyCard
            type="'digitalFlip' | 'circularProgress' | 'textInline'"
            defaultValue="digitalFlip"
          >
            <strong>Layout</strong>
          </PropertyCard>

          <p className="mt-5 font-semibold text-ink">Digital flip</p>
          <p>
            Each unit in its own card — the classic countdown look. The default.
          </p>

          <p className="mt-4 font-semibold text-ink">Circular progress</p>
          <p>
            Each unit as an SVG ring that depletes as time runs out, with the number in the centre.
          </p>

          <p className="mt-4 font-semibold text-ink">Text inline</p>
          <p>
            A single compact line of text. Best when the countdown is a supporting detail rather
            than the focus of the section.
          </p>

          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show labels</strong> — whether to print "Days", "Hours" and so on beneath (or
            beside) each number.
          </PropertyCard>
        </Section>

        <Section id="target" title="Target date">
          <PropertyCard type="ISO date string" defaultValue="24 hours from creation">
            <strong>Target date</strong> — the moment being counted down to. Stored as an ISO
            timestamp.
          </PropertyCard>
          <BlockCallout variant="info" title="Time zones">
            The stored value is an absolute instant, and the remaining time is computed against the
            viewer's own clock. A visitor in another time zone sees the same amount of time
            remaining, not the same wall-clock target.
          </BlockCallout>
        </Section>

        <Section id="expired" title="When it expires">
          <PropertyCard type="'hide' | 'showMessage' | 'showZeros'" defaultValue="showMessage">
            <strong>Expired behaviour</strong> — what to render once the target date has passed.
          </PropertyCard>
          <ul className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <Code>showMessage</Code> — replaces the countdown with your expired message.
            </li>
            <li>
              <Code>hide</Code> — removes the block entirely, leaving no gap in the layout.
            </li>
            <li>
              <Code>showZeros</Code> — keeps the layout but freezes every unit at zero.
            </li>
          </ul>
          <PropertyCard type="string" defaultValue="Offer has ended">
            <strong>Expired message</strong> — used only by <Code>showMessage</Code>.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null">
            <strong>Background color</strong> — behind the timer as a whole.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Number color</strong> — the digits themselves.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Text color</strong> — the unit labels and expired message.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Accent color</strong> — the filled portion of the rings in the circular layout.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Border color</strong>
          </PropertyCard>
          <PropertyCard type="number | per-corner">
            <strong>Border radius</strong> — a single value, or per-corner (
            <Code>topLeft</Code>, <Code>topRight</Code>, <Code>bottomRight</Code>,{' '}
            <Code>bottomLeft</Code>).
          </PropertyCard>
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="ticking" title="Making it tick">
          <p>
            A published page is static HTML, so the markup alone can't update the numbers. The
            countdown is driven by <Code>pagePilotTimer.js</Code>, a small script Page Pilot hosts
            for you.
          </p>
          <p>
            Tick <strong>Inject timer script</strong> in the Publish dialog's{' '}
            <strong>Scripts &amp; Styles</strong> tab and it's included automatically. If your
            application embeds the page by injecting raw HTML, you'll need to load the script from
            your app shell instead — the full explanation is in{' '}
            <a className="text-brand hover:underline" href="/pagepilot-vanilla-react-app/pages/runtime-scripts">
              Runtime Scripts &amp; Animations
            </a>
            .
          </p>
          <p>
            The block tags every unit it renders with data attributes, which is how the script
            finds them:
          </p>
          <div className="my-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-700">
            data-ahd-timer-target
            <br />
            data-ahd-timer-unit="days | hours | minutes | seconds"
            <br />
            data-ahd-timer-show-labels
            <br />
            data-ahd-timer-expired-behavior
          </div>
          <p>
            Everything the countdown needs — the target date and the expiry behaviour — is present
            in the markup, so the script needs no configuration.
          </p>
          <BlockCallout variant="tip" title="Without the script it still renders">
            You get the time remaining as at page load, frozen. For a deadline days or weeks out
            that's often accurate enough. The live tick matters for short countdowns, where a
            visitor is watching the seconds change.
          </BlockCallout>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Padding, margin, and border radius can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The layout, target date, labels toggle, expiry behaviour and message are shared across
            devices, as are all the colors.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
