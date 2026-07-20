import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'editing', label: 'Editing cells' },
  { id: 'structure', label: 'Structure' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function TableBlock() {
  return (
    <DocLayout
      title="Table"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Table Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A real HTML table with an optional header row. Cells are edited directly on the
            canvas; rows, columns, and styling come from the sidebar.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A new Table starts as a 3×3 grid with the first row set as a header. Cell contents are
            stored as a flat array, which is why resizing the table preserves the text that still
            fits inside the new shape.
          </p>
        </Section>

        <Section id="editing" title="Editing cells">
          <p>Two canvas interactions drive most table editing:</p>
          <PropertyCard type="click">
            <strong>Click any cell</strong> to edit its text in place.
          </PropertyCard>
          <PropertyCard type="right-click">
            <strong>Right-click a cell</strong> for a context menu to insert or delete rows and
            columns at that position, or delete the whole table.
          </PropertyCard>
          <BlockCallout variant="tip" title="Resizing keeps what fits">
            Changing the row or column count doesn't clear the table. Content that still falls
            inside the new grid is preserved, and newly created positions come in blank — so
            trimming a column and adding it back loses only that column's text.
          </BlockCallout>
        </Section>

        <Section id="structure" title="Structure">
          <PropertyCard type="number (1–50)" defaultValue="3">
            <strong>Rows</strong>
          </PropertyCard>
          <PropertyCard type="number (1–20)" defaultValue="3">
            <strong>Columns</strong>
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>First row as header</strong> — renders the first row as header cells, which
            pick up the header background and header text color below.
          </PropertyCard>
          <PropertyCard type="percent (1–100)" defaultValue="100%">
            <strong>Width</strong> — the table's width as a percentage of its container. Stored as
            a CSS length string (e.g. <Code>"100%"</Code>).
          </PropertyCard>
          <BlockCallout title="Structure is shared across devices">
            Rows, columns, the header toggle, cell contents, and width always write to the base
            block regardless of which device tab is active — a table can't have a different number
            of columns per device. The whole Structure section is hidden on Tablet/Mobile.
          </BlockCallout>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong> — around the table as a whole.
          </PropertyCard>
          <PropertyCard type="number (0–60)" defaultValue="8">
            <strong>Cell padding</strong> — space inside every cell, in px.
          </PropertyCard>
          <PropertyCard type="number (0–10)" defaultValue="2">
            <strong>Border width</strong> — in px.
          </PropertyCard>
          <PropertyCard type="solid color" defaultValue="#e5e7eb">
            <strong>Border color</strong> — solid only; gradients aren't accepted here.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="#f3f4f6">
            <strong>Header background</strong>
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="#111827">
            <strong>Header text color</strong>
          </PropertyCard>
          <PropertyCard type="font stack">
            <strong>Font family</strong>
          </PropertyCard>
          <PropertyCard type="number (8–48)" defaultValue="14">
            <strong>Font size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="#262626">
            <strong>Text color</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Padding, margin, border color, header colors, font family, font size, and text color
            can differ per device. Each device falls back to <strong>Desktop</strong> when unset;
            Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The whole Structure section — rows, columns, header toggle, width — plus{' '}
            <strong>cell padding</strong> and <strong>border width</strong> are shared across
            devices and hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
