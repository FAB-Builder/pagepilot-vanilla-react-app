import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'orientation', label: 'Orientation & behaviour' },
  { id: 'items', label: 'Tab items' },
  { id: 'active-tab', label: 'Active tab' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function TabsBlock() {
  return (
    <DocLayout
      title="Tabs"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Tabs Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A tabbed panel — up to ten tabs, each with its own content area that accepts any
            blocks. Can run horizontally across the top or vertically down the side.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A new Tabs block starts with three tabs in <strong>vertical</strong> orientation. Each
            tab's content area is a drop zone: build the panel on the canvas with whatever blocks
            you need.
          </p>
        </Section>

        <Section id="orientation" title="Orientation & behaviour">
          <PropertyCard type="'horizontal' | 'vertical'" defaultValue="vertical">
            <strong>Orientation</strong> — <Code>horizontal</Code> puts the tab strip above the
            content; <Code>vertical</Code> puts it alongside.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Sticky nav</strong> — only shown for vertical orientation. Keeps the tab list
            pinned in view while the content panel scrolls, which matters when panels are long.
          </PropertyCard>
          <PropertyCard
            type="'showSelectedSection' | 'scrollToSelectedSection'"
            defaultValue="showSelectedSection"
          >
            <strong>Behaviour</strong> — <Code>showSelectedSection</Code> swaps the visible panel
            on click, the classic tab behaviour. <Code>scrollToSelectedSection</Code> keeps all
            sections in the page and scrolls to the chosen one, turning the tab strip into a jump
            navigation.
          </PropertyCard>
        </Section>

        <Section id="items" title="Tab items">
          <p>
            The <strong>Tab items</strong> section lists each tab's label with a delete button
            beside it. <strong>Add tab</strong> appends a new one, auto-named{' '}
            <Code>Tab N</Code>.
          </p>
          <PropertyCard type="max 10 tabs">
            <strong>Limit</strong> — the add control disables once you reach ten tabs.
          </PropertyCard>
          <PropertyCard type="min 1 tab">
            <strong>Delete</strong> — the delete button hides when only one tab is left; a Tabs
            block always keeps at least one.
          </PropertyCard>
        </Section>

        <Section id="active-tab" title="Active tab">
          <p>Styling that applies only to the currently selected tab:</p>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Color</strong> — the active tab's text/accent color.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="unset">
            <strong>Font size</strong> — lets the active tab render larger than the inactive ones.
            Left blank, it matches the base font size.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show border</strong> — the indicator border marking which tab is selected.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> — color of the tab strip's border.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Tab text</strong> — color of inactive tab labels.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="14">
            <strong>Font size</strong>, plus <strong>font family</strong> and{' '}
            <strong>font weight</strong> for the tab labels.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="0">
            <strong>Tab gap</strong> — space between tabs in the strip, in px.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="0">
            <strong>Content gap</strong> — space between the tab strip and the content panel, in
            px.
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong>
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Orientation</strong> is genuinely per-device — stored as{' '}
            <Code>orientationTablet</Code> / <Code>orientationMobile</Code> with real{' '}
            <Code>@media</Code> CSS, so it survives publishing rather than only previewing in the
            editor. Active-tab color and font size, tab text color, border color, font size, tab
            gap, content gap, padding, and margin also differ per device.
          </p>
          <BlockCallout variant="tip" title="Vertical on desktop, horizontal on mobile">
            A vertical tab strip eats horizontal space that phones don't have. Setting Orientation
            to <Code>horizontal</Code> on the Mobile tab is the usual fix.
          </BlockCallout>
          <BlockCallout title="Not per-device">
            Tab labels, the add/remove controls, sticky nav, behaviour, radius, font family, and
            font weight are shared across devices and hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
