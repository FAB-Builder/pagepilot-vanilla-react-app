import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'editing', label: 'Editing the text' },
  { id: 'ai', label: 'Generate with AI' },
  { id: 'style', label: 'Background & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function TextBlock() {
  return (
    <DocLayout
      title="Text"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Text Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            The general-purpose rich-text block. Content is written directly on the canvas with a
            floating formatting toolbar; the sidebar carries only the layout and styling controls
            that toolbar doesn't cover.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Text is the block you reach for most. It holds inline-styled HTML — bold, italic,
            links, lists, colors — authored in place rather than in a sidebar field.
          </p>
        </Section>

        <Section id="editing" title="Editing the text">
          <p>
            <strong>Double-click the block on the canvas</strong> to start editing. A formatting
            toolbar appears while the block is selected.
          </p>
          <BlockCallout title="There is no sidebar content field — by design">
            Earlier versions had a second rich-text editor in the sidebar alongside the canvas
            one. Two editing surfaces bound to the same field raced against each other and broke
            undo/redo, so the sidebar editor was removed. The canvas is the only place text is
            edited.
          </BlockCallout>
        </Section>

        <Section id="ai" title="Generate with AI">
          <p>
            The sidebar has an AI prompt field that generates rich text for this block. Describe
            what you want and press <strong>Generate</strong>; the result replaces the block's
            current content.
          </p>
          <PropertyCard type="prompt">
            <strong>AI prompt</strong> — a three-row textarea. Generation is aware of the page
            it sits on: the request carries the page name, title, slug, meta title, meta
            description, meta keywords, and any stored page research, so the copy matches the
            page's subject and tone.
          </PropertyCard>
          <PropertyCard type="speech-to-text">
            <strong>Voice input</strong> — a microphone button inside the prompt field where the
            browser supports speech recognition. Dictation only runs while the prompt field has
            focus, so it stops automatically when you click away. Each finished phrase is
            appended to what's already there, so you can dictate in several passes.
          </PropertyCard>
          <PropertyCard type="image upload">
            <strong>Reference images</strong> — attach images to send along with the prompt as
            additional context. Attached file names are listed under the button.
          </PropertyCard>
          <BlockCallout variant="warning" title="Generation replaces existing content">
            The generated text overwrites whatever is in the block. Copy anything you want to
            keep before generating.
          </BlockCallout>
        </Section>

        <Section id="style" title="Background & spacing">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Background</strong> — solid color or gradient behind the text, with a hex
            readout next to the swatch.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
          <PropertyCard type="'normal' | 'bold' | numeric">
            <strong>Font weight</strong> — the block-level default weight. Inline bold applied
            with the canvas toolbar still wins over it.
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Text align</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Padding, margin, font weight, and text alignment can each differ per device — switch
            to the Tablet or Mobile tab and set a different value. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent, so Mobile does
            not inherit a value you set on Tablet.
          </p>
          <BlockCallout title="Not per-device">
            The text content itself and the AI generation controls are shared across devices, so
            they're hidden on the Tablet/Mobile tabs. Write the copy once on Desktop.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
