import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'variants', label: 'Variants' },
  { id: 'value', label: 'Value & label' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'text', label: 'Text & spacing' },
  { id: 'variables', label: 'Driving it with a variable' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function ProgressBlock() {
  return (
    <DocLayout
      title="Progress"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Progress Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A progress indicator that fills to a value out of a maximum — as a horizontal bar or a
            circular ring. Useful for completion states, goal tracking, and quota meters.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            The block takes a <strong>value</strong> and a <strong>max</strong>, works out the
            percentage, and draws it. A new Progress block starts as a linear bar at{' '}
            <Code>60 / 100</Code> with the percentage label shown.
          </p>
          <p>
            You'll find it under <strong>Support/Utility</strong> in the Add Block menu.
          </p>
          <BlockCallout title="Built for static HTML">
            The published page is plain markup with inline styles and SVG — no JavaScript. That
            means the bar renders correctly anywhere the page is embedded, but it also can't
            animate <em>on scroll</em> or count up on load. It draws at its final value
            immediately.
          </BlockCallout>
        </Section>

        <Section id="variants" title="Variants">
          <p>
            <strong>Progress type</strong> switches the shape. Each variant exposes its own size
            controls in the Progress Bar section, so switching type changes which options you see.
          </p>
          <PropertyCard type="'linear' | 'circular'" defaultValue="linear">
            <strong>Progress type</strong>
          </PropertyCard>

          <p className="mt-5 font-semibold text-ink">Linear</p>
          <p>
            A full-width horizontal bar with the label underneath. Supports the striped and
            animated options below, which the circular variant doesn't.
          </p>

          <p className="mt-4 font-semibold text-ink">Circular</p>
          <p>
            An SVG ring that fills clockwise from the top, with the label centred inside it. Sized
            by diameter and stroke thickness rather than height.
          </p>

          <BlockCallout variant="info" title="A third variant exists in the data">
            The block's schema also defines a <Code>steps</Code> variant — a row of dots that fill
            as progress advances, controlled by a <Code>steps</Code> count. Its option is currently
            commented out of the sidebar, so it can't be selected in the editor. Documents that
            already carry <Code>variant: 'steps'</Code> still render correctly.
          </BlockCallout>
        </Section>

        <Section id="value" title="Value & label">
          <PropertyCard type="number | string" defaultValue="60">
            <strong>Value</strong> — the current amount. Clamped between <Code>0</Code> and{' '}
            <Code>Max</Code> when rendered, so a value above the maximum shows as full rather than
            overflowing.
          </PropertyCard>
          <PropertyCard type="number | string" defaultValue="100">
            <strong>Max</strong> — what counts as 100%. Forced to at least <Code>1</Code> to avoid
            dividing by zero.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show value</strong> — toggles the text label. When off, the bar or ring renders
            on its own and the format option is hidden.
          </PropertyCard>
          <PropertyCard type="'percent' | 'fraction'" defaultValue="percent">
            <strong>Label format</strong> — <Code>percent</Code> shows <Code>60%</Code> (rounded to
            a whole number); <Code>fraction</Code> shows <Code>60/100</Code>, keeping one decimal
            place if the value isn't a whole number.
          </PropertyCard>
          <BlockCallout variant="tip" title="Screen readers always get the real numbers">
            Whatever you choose here, the block renders a proper{' '}
            <Code>role="progressbar"</Code> with <Code>aria-valuenow</Code>,{' '}
            <Code>aria-valuemin</Code> and <Code>aria-valuemax</Code>. Turning the visible label off
            doesn't hide the value from assistive technology.
          </BlockCallout>
        </Section>

        <Section id="appearance" title="Appearance">
          <p>Both variants share the two colors:</p>
          <PropertyCard type="color | null" defaultValue="#e5e7eb">
            <strong>Track color</strong> — the unfilled background.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="#3F73FF">
            <strong>Fill color</strong> — the filled portion.
          </PropertyCard>

          <p className="mt-5 font-semibold text-ink">Linear only</p>
          <PropertyCard type="number (2–60)" defaultValue="12">
            <strong>Bar height</strong> — in px.
          </PropertyCard>
          <PropertyCard type="number (0–40)" defaultValue="6">
            <strong>Bar radius</strong> — corner rounding, in px. Set it to half the bar height for
            a fully rounded pill.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Striped</strong> — overlays a diagonal stripe pattern on the filled portion.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Animated</strong> — scrolls those stripes continuously. Turning this on applies
            the stripe pattern too, so it reads as animated even if Striped is off.
          </PropertyCard>

          <p className="mt-5 font-semibold text-ink">Circular only</p>
          <PropertyCard type="number (40–320)" defaultValue="96">
            <strong>Circle size</strong> — the ring's diameter, in px.
          </PropertyCard>
          <PropertyCard type="number (2–40)" defaultValue="8">
            <strong>Stroke width</strong> — ring thickness, in px.
          </PropertyCard>

          <BlockCallout variant="warning" title="Where the animation actually runs">
            The animated stripes come from a CSS keyframe the block injects alongside itself. In
            the editor and on a normally-loaded published page it animates; where the HTML is
            injected into a host page in a way that strips or ignores the injected style, it
            degrades to a static striped bar. The bar's position is never affected — only the
            movement. The animation is also disabled automatically for visitors who have{' '}
            <Code>prefers-reduced-motion</Code> set.
          </BlockCallout>
        </Section>

        <Section id="text" title="Text & spacing">
          <PropertyCard type="color | null" defaultValue="#262626">
            <strong>Text color</strong> — the label's color.
          </PropertyCard>
          <PropertyCard type="font stack">
            <strong>Font family</strong>
          </PropertyCard>
          <PropertyCard type="number" defaultValue="13">
            <strong>Font size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="font weight">
            <strong>Font weight</strong>
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Alignment</strong> — positions the whole indicator within its container. For
            the circular variant this is how you centre the ring; a linear bar spans the full width,
            so alignment has no visible effect on it.
          </PropertyCard>
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong> — around the block as a whole.
          </PropertyCard>
        </Section>

        <Section id="variables" title="Driving it with a variable">
          <p>
            <strong>Value</strong> and <strong>Max</strong> are text fields, not number steppers,
            specifically so you can put a template token in them:
          </p>
          <div className="my-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-700">
            Value: <span className="text-brand">&#123;&#123;user.lessonsCompleted&#125;&#125;</span>
            <br />
            Max: <span className="text-brand">&#123;&#123;course.totalLessons&#125;&#125;</span>
          </div>
          <p>
            The token resolves at render time and is then read as a number. Type a plain number and
            it's stored as a number; type anything containing <Code>&#123;&#123;</Code> and it's
            kept as a string for the variable system to substitute later.
          </p>
          <BlockCallout variant="warning" title="Unresolved tokens fall back">
            If a token resolves to something that isn't a number — because the variable is missing
            or empty — the block falls back to <Code>0</Code> for Value and <Code>100</Code> for
            Max, rendering an empty bar rather than breaking the layout.
          </BlockCallout>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Font size, font family, font weight, alignment, padding, and margin can differ per
            device. Each device falls back to <strong>Desktop</strong> when unset; Tablet and Mobile
            are independent.
          </p>
          <BlockCallout title="Not per-device">
            The entire <strong>Progress</strong> section — type, value, max, show value, label
            format, striped, animated — is shared across devices and hidden on the Tablet/Mobile
            tabs. Colors and the size controls (bar height and radius, circle size, stroke width)
            are shared too.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
