import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'background', label: 'Background & border' },
  { id: 'size', label: 'Size & alignment' },
  { id: 'link', label: 'Link' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'responsive', label: 'Per-device behaviour' },
  { id: 'animation', label: 'Animation' },
];

const HTML_TAGS = ['div', 'section', 'article', 'nav', 'aside', 'header', 'footer', 'main'];

export default function ContainerBlock() {
  return (
    <DocLayout
      title="Container"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Container Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A general-purpose wrapper — background, border, sizing, an optional link, and a
            choice of semantic HTML tag. The building block for page sections.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Container holds any other blocks and gives them a shared background, border, width,
            and padding. It's what you reach for when you want a visually distinct band or card on
            the page.
          </p>
        </Section>

        <Section id="background" title="Background & border">
          <PropertyCard type="media gallery">
            <strong>Add background image</strong> — opens the media gallery. Desktop-only.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="#ffffff">
            <strong>Color</strong> — background color. Desktop-only.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>No repeat</strong> — controls whether a background image tiles. On means{' '}
            <Code>no-repeat</Code>; off means <Code>repeat</Code>.
          </PropertyCard>
          <PropertyCard type="'cover' | 'contain' | …">
            <strong>Background size</strong> — how the image scales to fill the container.
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong>
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> color. Setting it reveals a per-side{' '}
            <strong>Border width</strong> control, defaulting to 1px all round.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="size" title="Size & alignment">
          <PropertyCard type="'fixed' | 'fill' | 'fit'" defaultValue="fit">
            <strong>Width</strong> — <Code>fit</Code> hugs the content, <Code>fill</Code> takes
            the full container width, <Code>fixed</Code> uses an exact value. The unit selector
            switches between <Code>px</Code> and <Code>%</Code>.
          </PropertyCard>
          <PropertyCard type="number | null" defaultValue="null">
            <strong>Height</strong> — in px. Leave empty to size to content.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Overflow</strong> — whether content that exceeds a fixed height is visible or
            clipped.
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Horizontal align</strong> — where the container sits in its parent. Hidden
            when Width is <Code>fill</Code>, since a full-width container has nowhere to move.
          </PropertyCard>
        </Section>

        <Section id="link" title="Link">
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Enable link</strong> — makes the whole container clickable. Turning it on
            reveals the URL and target controls.
          </PropertyCard>
          <PropertyCard type="string | null">
            <strong>Link URL</strong> — accepts <Code>{'{{tokens}}'}</Code>, substituted with
            template variables when the page is generated.
          </PropertyCard>
          <PropertyCard type="'_blank' | '_self'" defaultValue="_blank">
            <strong>Open in new tab</strong>
          </PropertyCard>
        </Section>

        <Section id="accessibility" title="Accessibility">
          <PropertyCard type="HTML tag" defaultValue="div">
            <strong>HTML tag</strong> — the element the container renders as. Choosing a
            meaningful tag gives screen-reader users landmarks to navigate by, rather than an
            undifferentiated pile of <Code>div</Code>s.
          </PropertyCard>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {HTML_TAGS.map((t) => (
              <span
                key={t}
                className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600"
              >
                &lt;{t}&gt;
              </span>
            ))}
          </div>
          <PropertyCard type="string | null">
            <strong>Accessible label</strong> — names the landmark, e.g. "Primary navigation".
            Particularly worth setting when a page has more than one <Code>nav</Code> or{' '}
            <Code>aside</Code>, so they can be told apart.
          </PropertyCard>
          <BlockCallout variant="tip" title="Use one main per page">
            <Code>main</Code> should wrap the page's primary content and appear only once.{' '}
            <Code>header</Code>, <Code>footer</Code>, and <Code>nav</Code> can repeat, but each
            benefits from its own accessible label.
          </BlockCallout>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Width type</strong>, <strong>width</strong>, <strong>height</strong>, and{' '}
            <strong>horizontal alignment</strong> are per-device via <Code>*Tablet</Code> /{' '}
            <Code>*Mobile</Code> props. Border color, background size, background repeat, padding,
            margin, and overflow also differ per device.
          </p>
          <BlockCallout title="Not per-device">
            The background image and color, radius, the whole Link section, and the whole
            Accessibility section are shared across devices — the background upload and color
            picker only render on the Desktop tab.
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
