import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'content', label: 'Content & level' },
  { id: 'link', label: 'Link mode' },
  { id: 'color', label: 'Colors' },
  { id: 'typography', label: 'Typography & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

const LEVEL_SIZES = [
  { level: 'h1', size: '32px' },
  { level: 'h2', size: '24px' },
  { level: 'h3', size: '20px' },
  { level: 'h4', size: '18px' },
  { level: 'h5', size: '16px' },
  { level: 'h6', size: '14px' },
];

export default function HeadingBlock() {
  return (
    <DocLayout
      title="Heading"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Heading Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A semantic heading (<Code>h1</Code>–<Code>h6</Code>) that can optionally act as a
            link. The heading level drives both page structure for assistive technology and the
            default font size.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            The Heading block renders a real <Code>h1</Code>–<Code>h6</Code> element rather than
            styled text, so screen readers and search engines read your page outline correctly.
            Pick the level for <em>meaning</em> first — one <Code>h1</Code> per page, then{' '}
            <Code>h2</Code> for sections — and adjust the font size separately if the default
            size for that level isn't the look you want.
          </p>
        </Section>

        <Section id="content" title="Content & level">
          <PropertyCard type="string" defaultValue='"Enter your heading text here"'>
            <strong>Content</strong> — the heading text. A three-row textarea, so long headings
            stay readable while editing.
          </PropertyCard>
          <PropertyCard type="'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'" defaultValue="h2">
            <strong>Level</strong> — a six-way toggle. Changes the rendered tag and, unless you
            set an explicit font size, the size that renders.
          </PropertyCard>

          <p className="mt-4">
            When <Code>fontSize</Code> is unset the renderer falls back to a per-level default.
            The sidebar surfaces that same fallback in the font-size field, so the number you see
            is always the size that is actually rendering — never a blank box:
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {LEVEL_SIZES.map((l) => (
              <span
                key={l.level}
                className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600"
              >
                {l.level} → {l.size}
              </span>
            ))}
          </div>
        </Section>

        <Section id="link" title="Link mode">
          <p>
            The <strong>Type</strong> dropdown switches the heading between plain text and a
            link.
          </p>
          <PropertyCard type="'text' | 'link'" defaultValue="text">
            <strong>Type</strong> — choosing <Code>link</Code> reveals a URL field and an
            "Open in new tab" toggle.
          </PropertyCard>
          <PropertyCard type="string | null" defaultValue='""'>
            <strong>URL</strong> — where the heading points. Whitespace-only input is stored as{' '}
            <Code>null</Code>, so clearing the field reliably turns the link back off.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Open in new tab</strong> — adds <Code>target="_blank"</Code> to the rendered
            anchor.
          </PropertyCard>
          <BlockCallout variant="tip" title="Linked headings and accessibility">
            A linked heading still announces as a heading <em>and</em> a link. Keep the text
            descriptive — "Read the pricing guide" beats "Click here", which tells a screen-reader
            user nothing when they jump between headings.
          </BlockCallout>
        </Section>

        <Section id="color" title="Colors">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Text color</strong> — solid color or gradient. Left unset, the heading
            inherits the surrounding text color.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Background color</strong> — fills behind the heading.
          </PropertyCard>
          <p className="mt-3">
            Both show a hex readout next to the swatch so you can copy the exact value into
            another block.
          </p>
        </Section>

        <Section id="typography" title="Typography & spacing">
          <p>Shared typography controls, applied to the heading element itself:</p>
          <PropertyCard type="font stack">
            <strong>Font family</strong> — hidden on the Tablet/Mobile tabs; the family is shared
            across all devices.
          </PropertyCard>
          <PropertyCard type="'normal' | 'bold' | numeric">
            <strong>Font weight</strong>
          </PropertyCard>
          <PropertyCard type="'normal' | 'italic'" defaultValue="normal">
            <strong>Font style</strong>
          </PropertyCard>
          <PropertyCard type="'none' | 'underline' | 'line-through'">
            <strong>Text decoration</strong>
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Text align</strong>
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong> — space inside and around the
            heading.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Font size, weight, style, decoration, alignment, padding, and margin can all differ
            per device — switch to the Tablet or Mobile tab and set a different value. Each device
            falls back to <strong>Desktop</strong> when unset; Tablet and Mobile are independent,
            so Mobile does not inherit a value you set on Tablet.
          </p>
          <BlockCallout title="Not per-device">
            The heading text, level, link URL, colors, and font family stay shared across devices.
            They're hidden on the Tablet/Mobile tabs so there's no ambiguity about where an edit
            is stored.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
