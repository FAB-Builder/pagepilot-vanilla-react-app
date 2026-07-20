import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'buttons', label: 'Button count' },
  { id: 'layout', label: 'Direction, alignment & gap' },
  { id: 'appearance', label: 'Appearance & accessibility' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function ButtonGroupBlock() {
  return (
    <DocLayout
      title="Button Group"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Button Group Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A container that lays out two to five Button blocks as a set — side by side or
            stacked — with shared alignment and spacing.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Each button inside the group is a real <strong>Button</strong> block: select one on
            the canvas and you get the full Button sidebar — action type, label, colors, size,
            icon. The group itself only controls how those buttons are arranged.
          </p>
          <BlockCallout variant="tip" title="New buttons inherit your brand">
            Buttons added through the group's count control are seeded from your workspace's brand
            button settings, so a new button matches the rest of your page without extra styling.
          </BlockCallout>
        </Section>

        <Section id="buttons" title="Button count">
          <PropertyCard type="2 | 3 | 4 | 5" defaultValue="2">
            <strong>Buttons</strong> — a four-way toggle. Raising the count creates new Button
            child blocks; lowering it removes them from the end of the group.
          </PropertyCard>
          <BlockCallout variant="warning" title="Lowering the count deletes buttons">
            Reducing the count trims buttons from the end of the group and discards their
            configuration. Reorder first if the button you want to keep is last.
          </BlockCallout>
        </Section>

        <Section id="layout" title="Direction, alignment & gap">
          <PropertyCard type="'row' | 'column'" defaultValue="row">
            <strong>Direction</strong> — <Code>row</Code> places buttons side by side;{' '}
            <Code>column</Code> stacks them vertically.
          </PropertyCard>
          <PropertyCard type="'start' | 'center' | 'end' | 'space-between'" defaultValue="start">
            <strong>Alignment</strong> — how the buttons sit within the group's width.{' '}
            <Code>space-between</Code> pushes them to the edges with the free space distributed
            between them.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="12">
            <strong>Gap</strong> — space between buttons, in px.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Appearance & accessibility">
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Color</strong> — background behind the group as a whole, with a hex readout.
          </PropertyCard>
          <PropertyCard type="string | null" defaultValue="null">
            <strong>Accessible label</strong> — names the group for screen readers. Useful when
            the buttons only make sense together ("Plan options", "Article actions"). Clearing the
            field stores <Code>null</Code> rather than an empty string.
          </PropertyCard>
        </Section>

        <Section id="spacing" title="Spacing">
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong> — inside and around the group
            container.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Direction</strong> and <strong>Alignment</strong> are genuinely per-device:
            they're stored as dedicated <Code>directionTablet</Code> /{' '}
            <Code>directionMobile</Code> props with real <Code>@media</Code> CSS, so a group can
            sit in a row on desktop and stack into a column on mobile in the published page — not
            just in the editor preview. Gap, padding, and margin also differ per device.
          </p>
          <BlockCallout variant="tip" title="The most common use">
            Row on desktop, column on mobile. Two buttons side by side get cramped under ~400px;
            switching Direction to <Code>column</Code> on the Mobile tab gives each one full
            width.
          </BlockCallout>
          <BlockCallout title="Not per-device">
            Button count, background color, and the accessible label are shared across devices —
            the group holds the same buttons everywhere. They're hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
