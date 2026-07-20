import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'items', label: 'Items & content' },
  { id: 'behavior', label: 'Behaviour' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'spacing', label: 'Gap & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function AccordionBlock() {
  return (
    <DocLayout
      title="Accordion"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Accordion Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Collapsible sections — each with its own title and content area that can hold any
            other blocks. Good for FAQs and long reference content you want to keep scannable.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            An Accordion item is a pair of drop zones rather than plain text fields: a{' '}
            <strong>title</strong> area and a <strong>content</strong> area, each of which accepts
            any blocks you drop into them. So a title can be a Heading with an icon beside it, and
            the content can be Text plus an Image plus a Button.
          </p>
          <p>A new Accordion starts with a single empty item.</p>
        </Section>

        <Section id="items" title="Items & content">
          <p>
            Items are built on the <strong>canvas</strong>, not in the sidebar — drop blocks into
            an item's title and content zones directly. The sidebar carries only appearance and
            behaviour.
          </p>
          <BlockCallout variant="tip" title="Nesting blocks inside an item">
            Because content areas accept any block, you can nest a Grid or Columns inside an
            accordion panel. Keep an eye on total depth — deeply nested structures get hard to
            select on the canvas.
          </BlockCallout>
        </Section>

        <Section id="behavior" title="Behaviour">
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Default open</strong> — whether items start expanded when the page loads.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Background</strong>
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> color. Setting it reveals a <strong>Border width</strong>{' '}
            control with per-side values, defaulting to 1px on all sides.
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong> — a single value or four independent corner values.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Active border color</strong> — the border color of the currently expanded
            item, so the open section stands out from the closed ones.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Icon color</strong> — the expand/collapse chevron.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="20">
            <strong>Icon size</strong> — in px.
          </PropertyCard>
        </Section>

        <Section id="spacing" title="Gap & spacing">
          <PropertyCard type="number" defaultValue="5">
            <strong>Gap</strong> — vertical space between accordion items, in px.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Gap, padding, and margin can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The entire Appearance section — colors, border, radius, icon color and size — plus the
            default-open toggle are shared across devices and hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
