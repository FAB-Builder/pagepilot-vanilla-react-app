import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'list-type', label: 'List type & markers' },
  { id: 'numbering', label: 'Numbering' },
  { id: 'items', label: 'Items' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

const UNORDERED_MARKERS = ['disc', 'circle', 'square', 'dash', 'arrow', 'check', 'cross', 'none'];
const ORDERED_MARKERS = [
  'decimal',
  'decimal-zero',
  'lower-alpha',
  'upper-alpha',
  'lower-roman',
  'upper-roman',
];

export default function ListBlock() {
  return (
    <DocLayout
      title="List"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            List Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A bulleted or numbered list with its own items array, marker styles, and spacing
            controls — edited as structured rows in the sidebar rather than as free text.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Unlike a list typed inside a Text block, the List block stores each item as a separate
            entry. That means you can reorder, add, and delete items with dedicated controls, and
            style the markers independently of the item text.
          </p>
          <p>
            A new List block starts as an unordered list with three placeholder items and{' '}
            <Code>disc</Code> markers.
          </p>
        </Section>

        <Section id="list-type" title="List type & markers">
          <PropertyCard type="'unordered' | 'ordered'" defaultValue="unordered">
            <strong>List type</strong> — switching type also resets the marker to that type's
            default (<Code>disc</Code> for unordered, <Code>decimal</Code> for ordered), so you
            never end up with a bullet style on a numbered list.
          </PropertyCard>
          <PropertyCard type="marker style" defaultValue="disc">
            <strong>Marker</strong> — the available options depend on the list type.
          </PropertyCard>

          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Unordered markers</h3>
          <div className="flex flex-wrap gap-1.5">
            {UNORDERED_MARKERS.map((m) => (
              <span
                key={m}
                className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600"
              >
                {m}
              </span>
            ))}
          </div>

          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Ordered markers</h3>
          <div className="flex flex-wrap gap-1.5">
            {ORDERED_MARKERS.map((m) => (
              <span
                key={m}
                className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600"
              >
                {m}
              </span>
            ))}
          </div>

          <BlockCallout variant="tip" title="The none marker">
            Choosing <Code>none</Code> renders the items with no bullet at all — handy for a
            plain stack of lines that still benefits from consistent item spacing. Marker color
            and marker size controls hide themselves when <Code>none</Code> is selected, since
            there's nothing to style.
          </BlockCallout>
        </Section>

        <Section id="numbering" title="Numbering">
          <p>These two controls only appear for ordered lists:</p>
          <PropertyCard type="number (0–9999)" defaultValue="1">
            <strong>Start number</strong> — the value the first item counts from. Useful when a
            list continues across a break in the page.
          </PropertyCard>
          <PropertyCard type="'.' | ')'" defaultValue=".">
            <strong>Number suffix</strong> — whether numbers render as <Code>1.</Code> or{' '}
            <Code>1)</Code>.
          </PropertyCard>
        </Section>

        <Section id="items" title="Items">
          <p>
            Each item is a text field with three controls beside it: <strong>move up</strong>,{' '}
            <strong>move down</strong>, and <strong>delete</strong>. The move buttons disable at
            the ends of the list, and delete disables when only one item remains — a List block
            always has at least one item.
          </p>
          <p>
            <strong>Add item</strong> at the bottom appends a new placeholder row.
          </p>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Marker color</strong> — colors the bullets or numbers independently of the
            item text. Hidden when the marker is <Code>none</Code>.
          </PropertyCard>
          <PropertyCard type="number (1–200)" defaultValue="16">
            <strong>Marker size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="number (0–64)" defaultValue="8">
            <strong>Item gap</strong> — vertical space between items, in px.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Color</strong> and <strong>Background</strong> — item text color and the
            block's background.
          </PropertyCard>
          <PropertyCard type="font stack">
            <strong>Font family</strong>
          </PropertyCard>
          <PropertyCard type="number" defaultValue="16">
            <strong>Font size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="'normal' | 'bold' | numeric">
            <strong>Font weight</strong>
          </PropertyCard>
          <PropertyCard type="number (1–3)" defaultValue="1.5">
            <strong>Line height</strong> — clamped to this range, so items stay legible.
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Alignment</strong>
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="8 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Font size</strong>, <strong>alignment</strong>, <strong>padding</strong>, and{' '}
            <strong>margin</strong> can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent, so Mobile does
            not inherit a value you set on Tablet.
          </p>
          <BlockCallout title="Not per-device">
            List type, markers, numbering, the items themselves, marker size, item gap, colors,
            font family, font weight, and line height are all shared across devices — they're
            hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
