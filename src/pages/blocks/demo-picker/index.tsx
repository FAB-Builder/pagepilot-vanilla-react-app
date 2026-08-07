import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'picking', label: 'Picking a demo' },
  { id: 'size', label: 'Size & border' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function DemoPickerBlock() {
  return (
    <DocLayout
      title="Demo"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Demo Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Embeds an interactive product demo you've published in Page Pilot, so visitors can
            click through your product without signing up.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Demos are recorded and published in the <strong>Demos</strong> module. This block puts
            one on a page: pick it from a list and the block embeds the published demo viewer.
          </p>
          <p>
            You'll find it under <strong>Embeds/Integrations</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="tip" title="Publish the demo first">
            The picker lists demos from your workspace. A demo that hasn't been published yet won't
            render for visitors even once it's selected — see the <strong>Demos</strong> module for
            the recording and publishing flow.
          </BlockCallout>
          <BlockCallout variant="warning" title="This block needs a runtime script">
            Scaling the embedded demo to fit its container is handled by{' '}
            <Code>pagePilotDemoScale.js</Code>, hosted by Page Pilot. Tick it in the
            Publish dialog&apos;s <strong>Scripts &amp; Styles</strong> tab — and if your app embeds
            the page by injecting raw HTML, load it from your app shell instead. See{' '}
            <a className="text-brand hover:underline" href="/pagepilot-vanilla-react-app/pages/runtime-scripts">
              Runtime Scripts &amp; Animations
            </a>
            . Without it the demo renders unscaled — the block degrades, it does not break.
          </BlockCallout>
        </Section>

        <Section id="picking" title="Picking a demo">
          <PropertyCard type="string">
            <strong>Demo</strong> — chosen from a dropdown of the demos in your workspace. The
            block stores the demo's id and the viewer URL it resolves to.
          </PropertyCard>
          <BlockCallout variant="info" title="Updates flow through automatically">
            The demo is embedded by reference. Re-record or edit it and every page embedding it
            picks up the new version — no need to touch the page.
          </BlockCallout>
        </Section>

        <Section id="size" title="Size & border">
          <PropertyCard type="number | string">
            <strong>Width</strong>
          </PropertyCard>
          <PropertyCard type="number | string">
            <strong>Height</strong>
          </PropertyCard>
          <BlockCallout variant="warning" title="Match your demo's aspect ratio">
            A demo recorded on a wide desktop screen looks wrong squeezed into a tall frame — you
            get letterboxing or a scrollbar. Set the width and height to roughly the proportions
            the demo was captured at.
          </BlockCallout>
          <PropertyCard type="number">
            <strong>Border radius</strong> — in px. A little rounding helps the embed sit naturally
            in a page.
          </PropertyCard>
          <PropertyCard type="color">
            <strong>Border color</strong>
          </PropertyCard>
          <PropertyCard type="number">
            <strong>Border width</strong> — in px. Set to <Code>0</Code> for no border.
          </PropertyCard>
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Alignment</strong> — only visible when the demo is narrower than its container.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            The block declares a <Code>responsive</Code> slice, so padding, margin, and alignment
            can differ per device. Each device falls back to <strong>Desktop</strong> when unset;
            Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The selected demo, width, height, and border settings are shared across devices.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
