import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'code', label: 'Code block' },
  { id: 'typography', label: 'Typography & color' },
  { id: 'layout', label: 'Alignment & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function HtmlBlock() {
  return (
    <DocLayout
      title="HTML"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            HTML Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Raw HTML, written in a code editor and rendered as-is. The escape hatch for markup no
            other block produces.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Reach for HTML when you need markup the visual blocks don't offer — a third-party
            embed snippet, a custom table, or a structure you already have as HTML. For ordinary
            rich text, the <strong>Text</strong> block is easier to maintain.
          </p>
        </Section>

        <Section id="code" title="Code block">
          <PropertyCard type="string">
            <strong>Code block</strong> — a syntax-highlighted editor holding the block's markup.
            A new block starts with{' '}
            <Code>&lt;strong&gt;Enter your HTML content here&lt;/strong&gt;</Code>.
          </PropertyCard>
          <BlockCallout variant="warning" title="Your markup renders unchanged">
            Whatever you write here goes into the page as-is. Malformed markup can break the
            surrounding layout, and anything you paste from an external source runs with the same
            trust as the rest of your page — read it before you paste it.
          </BlockCallout>
        </Section>

        <Section id="typography" title="Typography & color">
          <p>
            These set defaults on the block's wrapper; inline styles in your own markup override
            them.
          </p>
          <PropertyCard type="font stack">
            <strong>Font family</strong> — falls back to the document's root font when unset.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="16">
            <strong>Font size</strong>
          </PropertyCard>
          <PropertyCard type="color">
            <strong>Color</strong> — the text color, with a hex readout.
          </PropertyCard>
        </Section>

        <Section id="layout" title="Alignment & spacing">
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="null">
            <strong>Text align</strong>
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Font size, alignment, padding, and margin can differ per device. Each device falls
            back to <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The markup itself, font family, and text color are shared across devices and hidden on
            the Tablet/Mobile tabs. For per-device behaviour inside your own markup, write your
            own <Code>@media</Code> rules in a <Code>&lt;style&gt;</Code> tag in the code block.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
