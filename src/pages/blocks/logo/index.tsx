import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'source', label: 'Logo source' },
  { id: 'icon-library', label: 'Icon library' },
  { id: 'size', label: 'Size' },
  { id: 'appearance', label: 'Radius & border' },
  { id: 'link', label: 'Link' },
  { id: 'alt', label: 'Alt text & accessibility' },
  { id: 'responsive', label: 'Per-device behaviour' },
  { id: 'animation', label: 'Animation' },
];

export default function LogoBlock() {
  return (
    <DocLayout
      title="Logo"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Logo Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A small branded image — your logo or an icon from the built-in library — with
            per-device source and width, usually linked back to your home page.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Logo behaves much like Image but is tuned for marks rather than photos: it defaults to
            a 60px width, offers an icon library alongside uploads, and puts the link URL front
            and centre.
          </p>
        </Section>

        <Section id="source" title="Logo source">
          <PropertyCard type="media gallery">
            <strong>Upload media</strong> — pick or upload an image. Reads "Replace media" once
            something is set.
          </PropertyCard>
          <PropertyCard type="string | null">
            <strong>Media</strong> — paste a URL directly. Clearing it stores <Code>null</Code>.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Background color</strong> — Desktop-only.
          </PropertyCard>
        </Section>

        <Section id="icon-library" title="Icon library">
          <p>
            <strong>Icon library</strong> opens a picker of built-in icons. Choosing one stores it
            as an inline data URI rather than a hosted file, so it renders without an extra
            network request.
          </p>
          <PropertyCard type="color | null">
            <strong>Icon fill color</strong> — only appears once an icon is chosen. Changing it
            re-renders the icon at the new color and re-stores the data URI.
          </PropertyCard>
          <BlockCallout title="Uploads and icons are mutually exclusive">
            Uploading an image clears the icon selection for that device, and picking an icon
            replaces the image. Each device holds one or the other, never both.
          </BlockCallout>
        </Section>

        <Section id="size" title="Size">
          <PropertyCard type="number" defaultValue="60">
            <strong>Width</strong> — in px. Height follows the aspect ratio.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Radius & border">
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Text align</strong> — positions the logo in its container.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong>
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> color.
          </PropertyCard>
        </Section>

        <Section id="link" title="Link">
          <PropertyCard type="string | null">
            <strong>URL</strong> — where clicking the logo goes. Accepts a full URL or a
            site-relative path starting with <Code>/</Code>. Shared across devices.
          </PropertyCard>
        </Section>

        <Section id="alt" title="Alt text & accessibility">
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Decorative</strong> — marks the logo as purely visual and disables the
            alt-text field.
          </PropertyCard>
          <PropertyCard type="string" defaultValue='""'>
            <strong>Alt text</strong> — e.g. "Acme Inc."
          </PropertyCard>
          <BlockCallout variant="warning" title="A linked logo should not be decorative">
            If the logo links somewhere, it needs alt text — otherwise screen-reader users hit a
            link with no accessible name. Reserve the decorative toggle for unlinked marks that
            repeat information already in the text.
          </BlockCallout>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Logo source</strong> (image or icon, including icon fill color) and{' '}
            <strong>width</strong> are genuinely per-device via <Code>urlTablet</Code> /{' '}
            <Code>urlMobile</Code> and <Code>widthTablet</Code> / <Code>widthMobile</Code>, so the
            published page swaps them with real <Code>&lt;picture&gt;</Code> and{' '}
            <Code>@media</Code> rules. Alignment, padding, margin, radius, and border color also
            differ per device.
          </p>
          <BlockCallout title="Not per-device">
            Background color, the link URL, the decorative toggle, and alt text are shared and
            hidden on the Tablet/Mobile tabs.
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
