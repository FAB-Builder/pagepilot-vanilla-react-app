import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'render-mode', label: 'Inline or floating' },
  { id: 'features', label: 'The feature toggles' },
  { id: 'trigger', label: 'The trigger button' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function AccessibilityToolsBlock() {
  return (
    <DocLayout
      title="Accessibility Tools"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Accessibility Tools Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A visitor-facing accessibility widget — a button that opens a panel of display
            adjustments: high contrast, larger text, link highlighting, and more.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Drop the block on a page and visitors get a control for adapting the page to their own
            needs, without you building any of it. The adjustments apply to the whole page, not
            just the block.
          </p>
          <p>
            You'll find it under <strong>Support/Utility</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="tip" title="This one really is interactive">
            Unlike most blocks, Accessibility Tools ships its own JavaScript alongside the markup,
            so the toggles genuinely work in the published page. No wiring needed on your side.
          </BlockCallout>
          <BlockCallout variant="info" title="It complements a Skip Link, it doesn't replace it">
            This block helps with <em>display</em> preferences. Keyboard navigation is a separate
            concern — see the <strong>Skip Link</strong> block for that.
          </BlockCallout>
        </Section>

        <Section id="render-mode" title="Inline or floating">
          <PropertyCard type="'inline' | 'floating'" defaultValue="floating">
            <strong>Render mode</strong>
          </PropertyCard>
          <p>
            <strong>Floating</strong> pins the trigger to a corner of the viewport, where it stays
            as the visitor scrolls — the usual pattern for an accessibility widget, and reachable
            from anywhere on the page.
          </p>
          <p>
            <strong>Inline</strong> places the trigger in the page flow, wherever you positioned
            the block. Better when you want the control in a specific place, like a footer utility
            row.
          </p>
          <PropertyCard
            type="'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'"
            defaultValue="top-right"
          >
            <strong>Position</strong> — which corner the floating trigger sits in. Ignored in
            inline mode.
          </PropertyCard>
        </Section>

        <Section id="features" title="The feature toggles">
          <p>
            Each option below adds one button to the panel. Turn off anything you don't want
            offered — the panel's groups disappear automatically when all their buttons are off.
          </p>

          <p className="mt-5 font-semibold text-ink">Color</p>
          <PropertyCard type="boolean">
            <strong>High contrast</strong> — increases the contrast of the whole page.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Invert colors</strong> — flips the page to an inverted palette. Images, video
            and iframes are inverted a second time so photos still look correct.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Grayscale</strong> — removes all color saturation.
          </PropertyCard>

          <p className="mt-5 font-semibold text-ink">Text</p>
          <PropertyCard type="boolean">
            <strong>Text size</strong> — adds three buttons (<Code>A-</Code>, <Code>A+</Code>,{' '}
            <Code>A++</Code>) for stepping the page's text size down and up.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Text spacing</strong> — widens letter and word spacing.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Line height</strong> — increases the space between lines.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Highlight links</strong> — makes every link visually obvious, for visitors who
            can't rely on color alone to spot them.
          </PropertyCard>

          <p className="mt-5 font-semibold text-ink">Other</p>
          <PropertyCard type="boolean">
            <strong>Hide images</strong> — strips imagery to reduce visual noise.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Big cursor</strong> — swaps in an enlarged cursor.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Reset all</strong> — adds a button that clears every adjustment at once. Worth
            keeping on; without it a visitor has to remember which toggles they flipped.
          </PropertyCard>
        </Section>

        <Section id="trigger" title="The trigger button">
          <PropertyCard type="string" defaultValue="Accessibility">
            <strong>Trigger text</strong> — the label on the button.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show label text</strong> — turn it off for an icon-only button, which takes up
            far less room in a floating corner.
          </PropertyCard>
          <PropertyCard type="string" defaultValue="Accessibility tools">
            <strong>Trigger label</strong> — the accessible name announced by screen readers. Keep
            this set even when the visible text is hidden, otherwise the button is announced as
            unlabelled.
          </PropertyCard>
          <PropertyCard
            type="'accessibility' | 'universal-access' | 'person' | 'eye' | 'info'"
            defaultValue="accessibility"
          >
            <strong>Icon</strong>
          </PropertyCard>
          <PropertyCard type="color" defaultValue="#2563eb">
            <strong>Trigger background</strong>
          </PropertyCard>
          <PropertyCard type="color" defaultValue="#ffffff">
            <strong>Trigger text color</strong>
          </PropertyCard>
          <PropertyCard type="number" defaultValue="13">
            <strong>Trigger font size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="999">
            <strong>Trigger border radius</strong> — the default is deliberately huge, giving a
            fully rounded pill.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="8 / 14">
            <strong>Trigger padding</strong> and <strong>Trigger margin</strong> — around the
            button itself, distinct from the block's own padding and margin.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            The block's own padding, margin, and alignment can differ per device. Each device falls
            back to <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            Render mode, position, the feature toggles, and every trigger setting are shared across
            devices.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
