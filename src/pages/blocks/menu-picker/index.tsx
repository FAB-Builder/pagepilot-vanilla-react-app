import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'source', label: 'Where the items come from' },
  { id: 'layout', label: 'Layout & slots' },
  { id: 'orientation', label: 'Orientation & position' },
  { id: 'sticky', label: 'Sticky navigation' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function MenuPickerBlock() {
  return (
    <DocLayout
      title="Menu"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Menu Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A full navigation bar built from a Page Pilot menu — with optional logo and
            call-to-action slots, and sticky-on-scroll behaviour you can set per device.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            This is the block for building a site header. It renders a menu's items as navigation,
            and can host other blocks beside them for a logo on the left and a button on the right.
          </p>
          <p>
            You'll find it under <strong>Embeds/Integrations</strong> in the Add Block menu.
          </p>
        </Section>

        <Section id="source" title="Where the items come from">
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Use custom menu</strong> — switches between the two sources below.
          </PropertyCard>

          <p className="mt-5 font-semibold text-ink">Off — pick a saved menu (default)</p>
          <p>
            Choose a menu authored in the <strong>Menus</strong> module. Items are referenced, not
            copied: update the menu there and every page using it reflects the change. Best when
            the same navigation appears across your site.
          </p>

          <p className="mt-4 font-semibold text-ink">On — author items here</p>
          <p>
            Build the list inline on this block — each item a name and a link. The items belong to
            this block alone. Best for a one-off nav that doesn't warrant a saved menu.
          </p>

          <BlockCallout variant="tip" title="Nested items are supported either way">
            Menu items can have children, so a saved menu with sub-items renders as a nested
            structure here. See the <strong>Menus</strong> module for the drag-and-drop builder and
            how link validity (the green/grey colouring) works.
          </BlockCallout>
        </Section>

        <Section id="layout" title="Layout & slots">
          <PropertyCard
            type="'menu-only' | 'logo-menu' | 'menu-cta' | 'logo-menu-cta'"
            defaultValue="menu-only"
          >
            <strong>Nav layout</strong>
          </PropertyCard>
          <p>
            Layouts other than <Code>menu-only</Code> open <strong>slots</strong> either side of
            the navigation, which you fill with ordinary blocks:
          </p>
          <ul className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <Code>logo-menu</Code> — a start slot before the items. Drop a{' '}
              <strong>Logo</strong> or <strong>Image</strong> block in.
            </li>
            <li>
              <Code>menu-cta</Code> — an end slot after the items, for a{' '}
              <strong>Button</strong>.
            </li>
            <li>
              <Code>logo-menu-cta</Code> — both slots: the standard site header.
            </li>
          </ul>
          <BlockCallout variant="info" title="Slots hold real blocks">
            The slots aren't limited to a logo and a button — they accept any block, and more than
            one. That's how you add a search field or a second button without the block needing an
            option for each.
          </BlockCallout>
        </Section>

        <Section id="orientation" title="Orientation & position">
          <PropertyCard type="'horizontal' | 'vertical'" defaultValue="horizontal">
            <strong>Orientation</strong> — a horizontal bar, or a vertical list for a sidebar
            navigation.
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Alignment</strong> — where the items sit within the bar.
          </PropertyCard>
        </Section>

        <Section id="sticky" title="Sticky navigation">
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Sticky nav</strong> — pins the bar to the top of the viewport as the visitor
            scrolls.
          </PropertyCard>
          <BlockCallout variant="tip" title="Sticky is per-device, with cascading fallback">
            This is one of the few settings with real per-device values. Tablet inherits the
            desktop setting unless you override it, and mobile inherits tablet's resolved value.
            So setting it once on desktop applies everywhere — but you can switch it off on mobile
            alone, where a pinned bar eats scarce vertical space.
          </BlockCallout>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color" defaultValue="transparent">
            <strong>Background color</strong> — of the nav bar.
          </PropertyCard>
          <PropertyCard type="color" defaultValue="#000000">
            <strong>Text color</strong> — of the item labels.
          </PropertyCard>
          <PropertyCard type="color">
            <strong>List background color</strong> — behind nested sub-item lists, so a dropdown
            isn't transparent over page content.
          </PropertyCard>
          <PropertyCard type="font stack">
            <strong>Font family</strong>
          </PropertyCard>
          <PropertyCard type="px" defaultValue="14px">
            <strong>Font size</strong>
          </PropertyCard>
          <PropertyCard type="font weight" defaultValue="400">
            <strong>Font weight</strong>
          </PropertyCard>
          <PropertyCard type="px" defaultValue="16px">
            <strong>Item gap</strong> — space between items.
          </PropertyCard>
          <PropertyCard type="css shorthand" defaultValue="8px 16px">
            <strong>Item padding</strong> — inside each item, which sets the clickable area.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show icons</strong> — renders the image set on a menu item, where one exists.
          </PropertyCard>
          <PropertyCard type="px" defaultValue="24px">
            <strong>Icon size</strong>
          </PropertyCard>
          <PropertyCard type="number">
            <strong>Border radius</strong> and <strong>Border</strong> — around the bar.
          </PropertyCard>
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong> — around the block as a whole,
            separate from the per-item padding above.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            The block declares a <Code>responsive</Code> slice, and ships its own scoped media-query
            CSS, so spacing and typography can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset. <strong>Sticky nav</strong> is per-device with the
            cascading fallback described above.
          </p>
          <BlockCallout title="Not per-device">
            The menu source, the items themselves, the layout choice, and the colors are shared
            across devices.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
