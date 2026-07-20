import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'editing', label: 'Editing the markdown' },
  { id: 'style', label: 'Background & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function MarkdownBlock() {
  return (
    <DocLayout
      title="Markdown"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Markdown Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Authors content as Markdown and renders it to HTML. Useful when you're pasting in
            content that is already written in Markdown.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            The block stores both the Markdown source and the rendered HTML. A new block starts
            with <Code>**Enter** your _Markdown_ text here</Code> so the formatting is visible
            immediately.
          </p>
          <BlockCallout variant="warning" title="A legacy block">
            Markdown and Quill Editor are legacy text blocks. Workspaces with the legacy-text-block
            cutoff enabled will not see either in the Add Block menu — for those,{' '}
            <strong>Text</strong> is the block to use. Existing Markdown blocks keep working.
          </BlockCallout>
        </Section>

        <Section id="editing" title="Editing the markdown">
          <p>
            <strong>Double-click the block on the canvas</strong> to edit. As with the Text block,
            the sidebar has no content field: it previously hosted a second Markdown editor, which
            raced against the canvas editor over the same field, so it was removed.
          </p>
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
            The Markdown content itself is shared across all devices.
          </p>
        </Section>
      </article>
    </DocLayout>
  );
}
