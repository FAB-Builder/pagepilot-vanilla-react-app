import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'target', label: 'Link text & target' },
  { id: 'display', label: 'Display mode' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'placement', label: 'Where to put it' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function SkipLinkBlock() {
  return (
    <DocLayout
      title="Skip Link"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Skip Link Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A "Skip to main content" link that lets keyboard and screen-reader users jump straight
            past your navigation. A small block that does a lot for accessibility.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Someone navigating by keyboard tabs through every link in your header before reaching
            the page content — on every page. A skip link gives them a shortcut: it's the first
            thing focused, and activating it moves straight to the main content.
          </p>
          <p>
            You'll find it under <strong>Support/Utility</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="tip" title="It's a WCAG requirement">
            Providing a way to bypass repeated navigation is{' '}
            <strong>WCAG 2.4.1 Bypass Blocks</strong> (Level A). If accessibility compliance
            matters to your site, this block is one of the cheapest ways to satisfy it.
          </BlockCallout>
        </Section>

        <Section id="target" title="Link text & target">
          <PropertyCard type="string" defaultValue="Skip to main content">
            <strong>Link text</strong> — what the link says when it's visible. Keep it literal;
            this is a functional control, not a place for clever copy.
          </PropertyCard>
          <PropertyCard type="string" defaultValue="main-content">
            <strong>Target ID</strong> — the <Code>id</Code> of the element to jump to. The block
            links to <Code>#</Code> plus this value.
          </PropertyCard>
          <BlockCallout variant="warning" title="The target must actually exist">
            This is the one way to get the block wrong. If nothing on the page has that{' '}
            <Code>id</Code>, the link does nothing when activated. Give your main content container
            a matching id — via the <strong>Container</strong> block's id field, or in your own
            page template if the content lives there.
          </BlockCallout>
        </Section>

        <Section id="display" title="Display mode">
          <PropertyCard type="'focus-only' | 'always-visible'" defaultValue="always-visible">
            <strong>Display mode</strong>
          </PropertyCard>

          <p className="mt-4 font-semibold text-ink">focus-only</p>
          <p>
            The conventional behaviour. The link is positioned off-screen and invisible to sighted
            visitors, but is still in the tab order — so the moment a keyboard user presses Tab, it
            appears pinned near the top-left of the viewport. Tab away and it disappears again.
          </p>
          <BlockCallout variant="info" title="Off-screen, not hidden">
            It's moved out of view rather than given <Code>display: none</Code>. That distinction
            matters: a hidden element is removed from the tab order entirely, which would defeat
            the purpose.
          </BlockCallout>

          <p className="mt-5 font-semibold text-ink">always-visible</p>
          <p>
            The link renders inline like any other element, visible to everyone. Useful on
            documentation and utility pages where an obvious skip control is a feature rather than
            visual clutter.
          </p>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color" defaultValue="#000000">
            <strong>Background</strong>
          </PropertyCard>
          <PropertyCard type="color" defaultValue="#ffffff">
            <strong>Text color</strong>
          </PropertyCard>
          <PropertyCard type="number" defaultValue="14">
            <strong>Font size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="4">
            <strong>Border radius</strong> — in px.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="12 / 8">
            <strong>Background spacing</strong> — horizontal and vertical padding inside the link's
            own background, in px.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="0">
            <strong>Margin spacing</strong> — horizontal and vertical margin around the link.
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Alignment</strong> — only affects <Code>always-visible</Code> mode; in
            focus-only mode the link is pinned to the viewport corner when focused.
          </PropertyCard>
          <BlockCallout title="A focus outline is always drawn">
            Whatever colors you pick, the block renders a high-contrast focus outline when the link
            is focused. Keyboard users must be able to see where they are, so this isn't
            configurable.
          </BlockCallout>
        </Section>

        <Section id="placement" title="Where to put it">
          <p>
            A skip link only works if it's the <strong>first focusable thing on the page</strong>.
            Place the block at the very top of your layout — above the header, navigation, and
            anything else.
          </p>
          <p>
            One per page is enough. Adding several means a keyboard user has to tab through your
            skip links to get past your skip links.
          </p>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Padding, margin, and alignment can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The link text, target id, display mode, and all colors are shared across devices.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
