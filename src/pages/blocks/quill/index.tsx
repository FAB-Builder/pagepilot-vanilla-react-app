import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'editing', label: 'Editing the content' },
  { id: 'ai', label: 'Generate with AI' },
  { id: 'style', label: 'Background & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function QuillBlock() {
  return (
    <DocLayout
      title="Quill Editor"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Quill Editor Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A rich-text block edited through a Quill editor embedded in the sidebar, rather than
            on the canvas.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <BlockCallout variant="warning" title="A legacy block">
            Quill Editor and Markdown are legacy text blocks. Workspaces with the
            legacy-text-block cutoff enabled won't see either in the Add Block menu — use{' '}
            <strong>Text</strong> instead, which edits inline on the canvas. Existing Quill blocks
            keep working.
          </BlockCallout>
        </Section>

        <Section id="editing" title="Editing the content">
          <p>
            Unlike Text and Markdown, the Quill block keeps its editor <strong>in the sidebar</strong>.
            Select the block and the full Quill toolbar appears at the top of the panel.
          </p>
        </Section>

        <Section id="ai" title="Generate with AI">
          <p>
            Below the editor is an AI prompt field. Describe the content you want and press{' '}
            <strong>Generate</strong> to replace the block's content.
          </p>
          <PropertyCard type="prompt">
            <strong>AI prompt</strong> — generation is page-aware: the request carries the page
            name, title, slug, meta title, meta description, meta keywords, and any stored page
            research.
          </PropertyCard>
          <PropertyCard type="image upload">
            <strong>Reference images</strong> — attach images as extra context for the prompt.
            Attached file names are listed under the button.
          </PropertyCard>
          <BlockCallout variant="warning" title="Generation replaces existing content">
            Generated content overwrites whatever is in the block. Copy anything you want to keep
            first.
          </BlockCallout>
        </Section>

        <Section id="style" title="Background & spacing">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Background</strong> — solid color or gradient, with a hex readout.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
          <PropertyCard type="'normal' | 'bold' | numeric">
            <strong>Font weight</strong>
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Text align</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Padding, margin, font weight, and text alignment can differ per device. Each device
            falls back to <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
            The content itself is shared across all devices.
          </p>
        </Section>
      </article>
    </DocLayout>
  );
}
