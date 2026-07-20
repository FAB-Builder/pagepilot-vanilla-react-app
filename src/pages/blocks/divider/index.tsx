import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'style', label: 'Line style' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function DividerBlock() {
  return (
    <DocLayout
      title="Divider"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Divider Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A horizontal rule for separating sections. Two settings — color and thickness — plus
            the spacing around it.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Divider is the simplest way to break up a page visually. If you want blank space
            rather than a visible line, use the <strong>Spacer</strong> block instead.
          </p>
        </Section>

        <Section id="style" title="Line style">
          <PropertyCard type="color" defaultValue="#CCCCCC">
            <strong>Color</strong> — the line color, with a hex readout beside the swatch.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="1">
            <strong>Thickness</strong> — line height in px.
          </PropertyCard>
        </Section>

        <Section id="spacing" title="Spacing">
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong> — the space around the line. This
            is usually what you actually want to adjust: a divider with no margin sits tight
            against neighbouring blocks.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Padding and margin can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            Line color and thickness are shared across devices — a divider looks the same
            everywhere, only its spacing changes.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
