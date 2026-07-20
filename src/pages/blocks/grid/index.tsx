import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'layout-mode', label: 'Layout mode' },
  { id: 'presets', label: 'Bento presets' },
  { id: 'custom', label: 'Custom layout' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function GridBlock() {
  return (
    <DocLayout
      title="Grid"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Grid Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Two-dimensional layout — columns and rows — either built from a ready-made bento
            preset or configured cell by cell.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A new Grid starts as 2×2 with four empty cells. Each cell is a drop zone for any
            blocks. Where <strong>Columns</strong> and <strong>Flex Columns</strong> arrange
            things in one dimension, Grid controls both axes.
          </p>
        </Section>

        <Section id="layout-mode" title="Layout mode">
          <PropertyCard type="'preset' | 'custom'">
            <strong>Layout mode</strong> — a toggle at the top of the panel that switches between
            picking a ready-made bento arrangement and configuring rows/columns yourself. The
            relevant section opens automatically when you switch.
          </PropertyCard>
        </Section>

        <Section id="presets" title="Bento presets">
          <p>
            Preset mode shows a gallery of bento-grid arrangements, each previewed as a small
            diagram. Clicking one applies its full cell layout — including cells that span
            multiple columns or rows.
          </p>
          <BlockCallout variant="warning" title="Applying a preset replaces the grid">
            A preset overwrites the current cell structure. Content in cells that no longer exist
            in the new arrangement is lost — apply presets before filling the grid, not after.
          </BlockCallout>
        </Section>

        <Section id="custom" title="Custom layout">
          <p>Custom mode exposes the grid's dimensions directly:</p>
          <PropertyCard type="number (min 1)" defaultValue="2">
            <strong>Columns</strong>
          </PropertyCard>
          <PropertyCard type="number (min 1)" defaultValue="2">
            <strong>Rows</strong>
          </PropertyCard>
          <PropertyCard type="number" defaultValue="16">
            <strong>Column gap</strong> and <strong>Row gap</strong> — in px.
          </PropertyCard>
          <PropertyCard type="'top' | 'middle' | 'bottom'" defaultValue="middle">
            <strong>Vertical align</strong> — how content sits within each cell.
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Horizontal align</strong>
          </PropertyCard>
          <BlockCallout title="Switching from preset to custom resets placement">
            Preset grids position each cell explicitly (column start, row start, spans), which the
            Columns/Rows steppers can't safely resize. Switching to custom mode drops that
            explicit placement and rebuilds a plain columns × rows grid so the steppers take over
            again.
          </BlockCallout>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Color</strong> — background behind the grid.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong>
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> color. Setting it reveals a per-side{' '}
            <strong>Border width</strong> control, defaulting to 1px all round.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Columns</strong> is genuinely per-device via <Code>columnsCount</Code> /{' '}
            <Code>columnsCountTablet</Code> / <Code>columnsCountMobile</Code>, published as real{' '}
            <Code>@media</Code> CSS. <strong>Mobile defaults to a single column</strong> even when
            you haven't set it — a multi-column grid almost never works on a phone. Background,
            padding, margin, radius, and border also differ per device.
          </p>
          <BlockCallout title="Not per-device">
            Rows, gaps, both alignment controls, and the whole preset gallery are shared across
            devices. On the Tablet/Mobile tabs the layout-mode toggle is hidden and only the
            Columns stepper remains editable.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
