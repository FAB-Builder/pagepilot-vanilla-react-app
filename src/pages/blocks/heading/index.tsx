import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';
import CaseStudyCallout from '../../../components/CaseStudyCallout';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'content', label: 'Content & level' },
  { id: 'link', label: 'Link mode' },
  { id: 'color', label: 'Colors' },
  { id: 'typography', label: 'Typography & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
  { id: 'animation', label: 'Animation' },
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

        <CaseStudyCallout compact />

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

        <Section id="animation" title="Animation">
          <p>
            This block can animate into view. Set it up in the{' '}
            <strong>Animation</strong> section of the sidebar.
          </p>
          <PropertyCard type="enum" defaultValue="none">
            <strong>Type</strong> — <Code>fade-in</Code>, <Code>slide-left</Code>,{' '}
            <Code>slide-right</Code>, <Code>slide-up</Code>, <Code>slide-down</Code>,{' '}
            <Code>zoom-in</Code> or <Code>bounce</Code>.
          </PropertyCard>
          <PropertyCard type="enum" defaultValue="load">
            <strong>Trigger</strong> — <Code>load</Code> plays immediately;{' '}
            <Code>scroll</Code> waits until the element enters the viewport;{' '}
            <Code>hover</Code> and <Code>click</Code> play on interaction.
          </PropertyCard>
          <PropertyCard type="enum" defaultValue="medium">
            <strong>Speed</strong> — <Code>slow</Code> (1.2s), <Code>medium</Code> (0.7s) or{' '}
            <Code>fast</Code> (0.35s).
          </PropertyCard>
          <PropertyCard type="number (0–10000)" defaultValue="0">
            <strong>Delay</strong> — milliseconds before it plays. Use it to stagger several
            elements.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Disable on mobile</strong> — skips the animation at mobile width.
          </PropertyCard>
          <BlockCallout variant="warning" title="Animations need a runtime script">
            Motion is powered by <Code>pagePilotAnimation.js</Code>. Tick it in the Publish
            dialog&apos;s <strong>Scripts &amp; Styles</strong> tab, or load it from your app shell
            if you inject the HTML yourself — see{' '}
            <a className="text-brand hover:underline" href="/pagepilot-vanilla-react-app/pages/runtime-scripts">
              Runtime Scripts &amp; Animations
            </a>
            . Without it the element renders normally, just without the motion.
          </BlockCallout>
          <BlockCallout variant="tip" title="Nothing shifts">
            Animations only use <Code>transform</Code> and <Code>opacity</Code>, so they can never
            reflow the page. Visitors with reduced-motion enabled get no animation automatically.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
