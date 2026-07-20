import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'layout', label: 'Direction & columns' },
  { id: 'width', label: 'Width & gap' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'alignment', label: 'Alignment & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function ColumnsBlock() {
  return (
    <DocLayout
      title="Columns"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Columns Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Two to five side-by-side columns, each a drop zone for any other blocks. Rendered as a
            real table, which makes it the most robust layout container across email clients.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A new Columns block starts with three horizontal columns and a 16px gap. Each column
            accepts any blocks you drop into it.
          </p>
          <BlockCallout title="Columns vs. Flex Columns vs. Grid">
            <strong>Columns</strong> renders a table — the safest choice, and the one to use when
            the layout must hold up everywhere. <strong>Flex Columns</strong> uses flexbox and can
            wrap. <strong>Grid</strong> gives two-dimensional control with rows as well as
            columns.
          </BlockCallout>
        </Section>

        <Section id="layout" title="Direction & columns">
          <PropertyCard type="'horizontal' | 'vertical'" defaultValue="horizontal">
            <strong>Direction</strong> — <Code>horizontal</Code> places columns side by side;{' '}
            <Code>vertical</Code> stacks them.
          </PropertyCard>
          <PropertyCard type="2 | 3 | 4 | 5" defaultValue="3">
            <strong>Columns</strong> — how many columns the block has.
          </PropertyCard>
          <BlockCallout variant="warning" title="Column count is shared across devices">
            Because the block renders a real <Code>&lt;table&gt;</Code>, a row can't partially
            reflow — you can't have four columns on desktop become two-per-row on mobile without
            restructuring the table. So the per-device lever here is{' '}
            <strong>Direction</strong> (side-by-side vs stacked), not the column count. The count
            is the real column total either way, edited once on Desktop.
          </BlockCallout>
        </Section>

        <Section id="width" title="Width & gap">
          <p>
            These only appear when Direction is <Code>horizontal</Code> — stacked columns are
            always full width.
          </p>
          <PropertyCard type="'fixed' | 'fill' | 'fit'" defaultValue="fill">
            <strong>Width</strong> — <Code>fill</Code> shares the container evenly;{' '}
            <Code>fit</Code> sizes each column to its content; <Code>fixed</Code> reveals a
            per-column width field.
          </PropertyCard>
          <PropertyCard type="per-column widths">
            <strong>Fixed widths</strong> — one value per column, shown when Width is{' '}
            <Code>fixed</Code>.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="16">
            <strong>Gap</strong> — space between columns, in px.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Color</strong> — background behind the columns.
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong>
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> color. Setting it reveals a per-side{' '}
            <strong>Border width</strong> control, defaulting to 1px all round.
          </PropertyCard>
        </Section>

        <Section id="alignment" title="Alignment & spacing">
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Alignment</strong> — how content sits within each column.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Direction</strong>, <strong>Width type</strong>,{' '}
            <strong>fixed widths</strong>, <strong>Gap</strong>, and{' '}
            <strong>Alignment</strong> are all genuinely per-device, stored as{' '}
            <Code>*Tablet</Code> / <Code>*Mobile</Code> props and published as scoped{' '}
            <Code>@media</Code> CSS per block instance. Padding and margin differ per device too.
          </p>
          <BlockCallout variant="tip" title="The standard mobile treatment">
            Set Direction to <Code>vertical</Code> on the Mobile tab. Columns stack, each taking
            full width, and your desktop gap and padding settings are respected rather than
            overridden.
          </BlockCallout>
          <BlockCallout title="Not per-device">
            Column count, background color, radius, and border are shared across devices — hidden
            on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
