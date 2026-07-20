import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'source', label: 'Image source' },
  { id: 'size', label: 'Size' },
  { id: 'appearance', label: 'Radius, rotation & border' },
  { id: 'link', label: 'Link' },
  { id: 'alt', label: 'Alt text & accessibility' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function ImageBlock() {
  return (
    <DocLayout
      title="Image"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Image Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A picture with per-device sizing and — unusually — a genuinely different image source
            per breakpoint, so a wide hero on desktop can become a cropped portrait on mobile.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Images can be uploaded through the media gallery or pasted in as a URL. Almost
            everything about an Image can vary per device: the source itself, the width type, the
            width, the height, and the rotation.
          </p>
        </Section>

        <Section id="source" title="Image source">
          <PropertyCard type="media gallery">
            <strong>Upload media</strong> — opens the media gallery to pick or upload an image.
            The button reads "Replace media" once a non-default image is set.
          </PropertyCard>
          <PropertyCard type="string | null">
            <strong>Media</strong> — paste an image URL directly. Clearing the field stores{' '}
            <Code>null</Code>.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Background color</strong> — behind the image. Desktop-only.
          </PropertyCard>
          <BlockCallout variant="tip" title="A different image per device">
            The media field targets whichever device tab is active. Switch to Mobile, upload a
            different image, and that image is stored as <Code>urlMobile</Code>. In the published
            page this renders as a real <Code>&lt;picture&gt;</Code> element with{' '}
            <Code>&lt;source media&gt;</Code> rules — the browser picks the right file with no
            JavaScript, so the mobile visitor never downloads the desktop image.
          </BlockCallout>
        </Section>

        <Section id="size" title="Size">
          <PropertyCard type="'fixed' | 'fill' | 'fit'" defaultValue="fixed">
            <strong>Width type</strong> — <Code>fixed</Code> is an exact size and reveals the
            width field; <Code>fill</Code> stretches to the container; <Code>fit</Code> hugs the
            image's natural size.
          </PropertyCard>
          <PropertyCard type="number + unit" defaultValue="px">
            <strong>Width</strong> — shown when width type is <Code>fixed</Code>. The unit
            selector switches between <Code>px</Code> and <Code>%</Code>.
          </PropertyCard>
          <PropertyCard type="dimension">
            <strong>Height</strong> — leave unset to preserve the image's aspect ratio.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Radius, rotation & border">
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Text align</strong> — positions the image within its container.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="1 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong> — one value or four independent corners.
          </PropertyCard>
          <PropertyCard type="number (0–360)" defaultValue="0">
            <strong>Rotation</strong> — a degree slider.
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> color. Setting it reveals a per-side{' '}
            <strong>Border width</strong> control, defaulting to 1px all round. Zeroing every side
            resets the border color, so a width-less border doesn't linger invisibly.
          </PropertyCard>
        </Section>

        <Section id="link" title="Link">
          <PropertyCard type="string | null" defaultValue="null">
            <strong>Link</strong> — wraps the image in an anchor. Shared across devices.
          </PropertyCard>
        </Section>

        <Section id="alt" title="Alt text & accessibility">
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Decorative image</strong> — marks the image as purely visual. Turning this on
            disables the alt-text field, because a decorative image should be skipped by screen
            readers rather than described.
          </PropertyCard>
          <PropertyCard type="string" defaultValue='""'>
            <strong>Alt text</strong> — describes the image for screen readers and shows if the
            image fails to load.
          </PropertyCard>
          <BlockCallout variant="tip" title="When to mark decorative">
            If the image adds no information the surrounding text doesn't already carry — a
            divider flourish, a background texture — mark it decorative. If it carries meaning,
            describe what it shows, not that it's a picture.
          </BlockCallout>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Image source</strong>, <strong>width type</strong>, <strong>width</strong>,{' '}
            <strong>height</strong>, and <strong>rotation</strong> are all genuinely per-device,
            stored as dedicated <Code>*Tablet</Code> / <Code>*Mobile</Code> props. Padding,
            margin, and alignment differ per device too. Each device falls back to{' '}
            <strong>Desktop</strong> when unset; Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            Background color, the link URL, the decorative toggle, and alt text stay shared —
            hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
