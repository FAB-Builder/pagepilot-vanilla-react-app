import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'source', label: 'Image & alt text' },
  { id: 'size-shape', label: 'Size & shape' },
  { id: 'layout', label: 'Alignment & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function AvatarBlock() {
  return (
    <DocLayout
      title="Avatar"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Avatar Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A small profile image in a circle, square, or rounded square — for testimonials, team
            listings, and author bylines.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Avatar is deliberately simpler than Image: a fixed square size, a shape, and an image.
            New blocks are seeded with a generated placeholder avatar so the block is visible
            before you set a real picture.
          </p>
        </Section>

        <Section id="source" title="Image & alt text">
          <PropertyCard type="media gallery">
            <strong>Upload media</strong> — opens the media gallery. Reads "Replace media" once a
            non-placeholder image is set.
          </PropertyCard>
          <PropertyCard type="string">
            <strong>Media</strong> — paste an image URL directly.
          </PropertyCard>
          <PropertyCard type="string">
            <strong>Alt text</strong> — usually the person's name.
          </PropertyCard>
        </Section>

        <Section id="size-shape" title="Size & shape">
          <PropertyCard type="number (32–256)" defaultValue="64">
            <strong>Size</strong> — in px. The avatar is always square, so this sets both
            dimensions.
          </PropertyCard>
          <PropertyCard type="'circle' | 'square' | 'rounded'" defaultValue="circle">
            <strong>Shape</strong> — how the image is masked. New blocks are created as{' '}
            <Code>circle</Code>; the block's own fallback if the prop is ever missing is{' '}
            <Code>square</Code>.
          </PropertyCard>
        </Section>

        <Section id="layout" title="Alignment & spacing">
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Text align</strong> — positions the avatar in its container.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            Alignment and padding can differ per device. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout variant="warning" title="Avatar has no per-device image or size">
            Unlike Image and Logo, Avatar does <strong>not</strong> support a different picture or
            size per breakpoint — the image, alt text, size, and shape are all shared, and both
            the Appearance and Size sections are hidden on the Tablet/Mobile tabs.
          </BlockCallout>
          <p>
            The reason is structural: Avatar comes from an external package that renders its own{' '}
            <Code>&lt;img&gt;</Code> internally, leaving no seam to inject the{' '}
            <Code>&lt;picture&gt;</Code> element that per-device image swapping needs. Image and
            Logo are locally owned, which is why they can do it.
          </p>
          <BlockCallout variant="tip" title="If you need a per-device avatar">
            Use the <strong>Image</strong> block with a circular radius instead — you lose the
            shape presets but gain per-device source and width.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
