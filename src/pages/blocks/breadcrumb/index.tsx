import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'items', label: 'Trail items' },
  { id: 'separator', label: 'Separator' },
  { id: 'home', label: 'Home link' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'collapse', label: 'Mobile collapsing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function BreadcrumbBlock() {
  return (
    <DocLayout
      title="Breadcrumb"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Breadcrumb Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A navigation trail showing where the current page sits in your site's hierarchy —
            <Code>Home › Docs › Getting started</Code>. Each step links back up the tree.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            The trail is a list of items you author yourself, in order, ending with the current
            page. It renders as a real <Code>&lt;nav aria-label="Breadcrumb"&gt;</Code>, so screen
            readers announce it as navigation rather than a run of loose links.
          </p>
          <p>
            You'll find it under <strong>Layout/Structure</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="tip" title="The last item is the current page">
            The final item is rendered with <Code>aria-current="page"</Code> and, by default,
            without a link — you're already there. Turning{' '}
            <strong>Link current item</strong> on makes it clickable anyway.
          </BlockCallout>
        </Section>

        <Section id="items" title="Trail items">
          <p>
            Items are managed as a list in the sidebar — add, remove, and reorder them to match
            your hierarchy. Each item carries three things:
          </p>
          <PropertyCard type="string">
            <strong>Label</strong> — the visible text for this step.
          </PropertyCard>
          <PropertyCard type="string">
            <strong>Href</strong> — where the step links to. Use a page slug for internal links.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Text color</strong> — a per-item override. Leave it unset and the item uses the
            block-wide text color below.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Link current item</strong> — when on, the last item is a link too.
          </PropertyCard>
        </Section>

        <Section id="separator" title="Separator">
          <p>The character drawn between items.</p>
          <PropertyCard type="'slash' | 'chevron' | 'dot' | 'pipe' | 'custom'" defaultValue="chevron">
            <strong>Separator style</strong> — <Code>slash</Code> (<Code>/</Code>),{' '}
            <Code>chevron</Code> (<Code>›</Code>), <Code>dot</Code> (<Code>·</Code>),{' '}
            <Code>pipe</Code> (<Code>|</Code>), or <Code>custom</Code>.
          </PropertyCard>
          <PropertyCard type="string">
            <strong>Custom separator</strong> — your own character or short string. Only used when
            the style above is set to <Code>custom</Code>.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Separator color</strong> — falls back to the block's text color when unset.
          </PropertyCard>
          <BlockCallout title="Separators are decorative">
            They're marked <Code>aria-hidden</Code>, so a screen reader reads out the trail as a
            clean list of destinations instead of announcing a slash between every step.
          </BlockCallout>
        </Section>

        <Section id="home" title="Home link">
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Show home icon</strong> — prepends a house icon as the first step, before your
            authored items.
          </PropertyCard>
          <PropertyCard type="string" defaultValue="/">
            <strong>Home link</strong> — where that icon points.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color" defaultValue="#595959">
            <strong>Text color</strong> — applies to every item that has no per-item override.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Current item color</strong> — colors the last item separately, so the page
            you're on can stand out from the links above it.
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
          <PropertyCard type="px" defaultValue="8px">
            <strong>Item gap</strong> — space between each item and its separator.
          </PropertyCard>
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong> — around the block as a whole.
          </PropertyCard>
        </Section>

        <Section id="collapse" title="Mobile collapsing">
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Collapse on mobile</strong>
          </PropertyCard>
          <p>
            A deep trail wraps awkwardly on a narrow screen. With this on, the middle steps are
            hidden at mobile width and replaced by an ellipsis (<Code>…</Code>), keeping the{' '}
            <strong>first</strong> and <strong>last</strong> items visible — enough to show both
            the root and where you are now.
          </p>
          <BlockCallout title="Needs more than two items to do anything">
            The ellipsis only appears when the trail has more than two items — with two or fewer
            there are no middle steps to hide.
          </BlockCallout>
          <BlockCallout variant="info" title="Done in CSS, not by re-rendering">
            The collapse is a scoped <Code>@media</Code> rule the block emits alongside itself, so
            it works in the static published page with no JavaScript. All items are always present
            in the HTML — they're only hidden visually.
          </BlockCallout>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            The block declares a <Code>responsive</Code> slice, so padding, margin, and the other
            style properties can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Content is shared">
            The trail items themselves — labels, hrefs, and per-item colors — are authored once and
            shared across every device.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
