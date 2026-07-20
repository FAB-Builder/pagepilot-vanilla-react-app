import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'motion', label: 'Motion' },
  { id: 'items', label: 'Items' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function MarqueeBlock() {
  return (
    <DocLayout
      title="Marquee"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Marquee Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Continuously scrolling content — a logo strip, a ticker of testimonials, a rolling
            list of features. Each item is a drop zone for any blocks.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A new Marquee starts with three items scrolling left. Content repeats seamlessly, so
            the strip never shows a gap as it loops. Up to thirty items.
          </p>
          <BlockCallout variant="warning" title="Motion and accessibility">
            Continuously moving content is difficult for some visitors to read and can trigger
            discomfort for people sensitive to motion. Turn on <strong>Pause on hover</strong> so
            readers can stop the movement, and keep marquees short.
          </BlockCallout>
        </Section>

        <Section id="motion" title="Motion">
          <PropertyCard type="'left' | 'right' | 'up' | 'down'" defaultValue="left">
            <strong>Direction</strong> — which way content travels. Vertical directions turn the
            marquee into a scrolling column.
          </PropertyCard>
          <PropertyCard type="number (5–200)" defaultValue="40">
            <strong>Speed</strong> — higher is faster.
          </PropertyCard>
          <PropertyCard type="number (2–6)" defaultValue="2">
            <strong>Repeat</strong> — how many copies of the item set are rendered back to back.
            More copies fill a wider viewport without a visible gap.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Pause on hover</strong> — stops the animation while the pointer is over the
            marquee.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Fade edges</strong> — softens the left and right edges so items appear to fade
            in and out rather than being cut off.
          </PropertyCard>
          <PropertyCard type="number (0–200)" defaultValue="32">
            <strong>Item gap</strong> — space between items, in px.
          </PropertyCard>
        </Section>

        <Section id="items" title="Items">
          <p>
            The Items section lists each item with a delete button. <strong>Add item</strong>{' '}
            appends a new empty one; the control disables at thirty items, and delete disappears
            when only one is left. Item content is built on the canvas.
          </p>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null">
            <strong>Background</strong>
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Border</strong> color. Setting it reveals a{' '}
            <strong>Border width</strong> control with <strong>top and bottom only</strong> —
            content scrolls endlessly past the left and right edges, so a side border would read
            as an arbitrary cut through moving content. Setting both rails to zero clears the
            border color.
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong>
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Speed</strong>, <strong>pause on hover</strong>,{' '}
            <strong>fade edges</strong>, <strong>item gap</strong>, background, border color,
            radius, padding, and margin can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            Direction, repeat count, the item list, and border width are shared across devices —
            hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
