import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'height', label: 'Height' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function SpacerBlock() {
  return (
    <DocLayout
      title="Spacer"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Spacer Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Blank vertical space. One setting: how tall.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Use a Spacer when you want breathing room that isn't tied to any particular block's
            margin. For a visible separating line, use <strong>Divider</strong> instead.
          </p>
          <BlockCallout variant="tip" title="Spacer vs. margin">
            A block's own margin is usually the better tool — it moves with the block when you
            reorder the page. Reach for a Spacer when the gap belongs to the layout rather than to
            either neighbour.
          </BlockCallout>
        </Section>

        <Section id="height" title="Height">
          <PropertyCard type="number (0–128)" defaultValue="16">
            <strong>Height</strong> — in px, clamped to this range.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Height can differ per device — a 64px gap that works on desktop is often too much on a
            phone. Each device falls back to <strong>Desktop</strong> when unset; Tablet and
            Mobile are independent.
          </p>
        </Section>
      </article>
    </DocLayout>
  );
}
