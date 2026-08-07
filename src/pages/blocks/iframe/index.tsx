import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'source', label: 'URL & title' },
  { id: 'size', label: 'Size & spacing' },
  { id: 'limits', label: 'What can be embedded' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function IframeBlock() {
  return (
    <DocLayout
      title="Iframe"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Iframe Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Embeds any external page by URL. The general-purpose escape hatch for third-party
            content that has no dedicated block.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Point it at a URL and the block renders an <Code>&lt;iframe&gt;</Code> in the page.
            Maps, dashboards, external forms, embeds from services Page Pilot doesn't integrate
            with directly — anything that publishes an embeddable URL.
          </p>
          <p>
            You'll find it under <strong>Embeds/Integrations</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="tip" title="Check for a dedicated block first">
            Page Pilot has purpose-built blocks for <strong>Video</strong>,{' '}
            <strong>Calendly</strong>, <strong>Forms</strong>, <strong>Demos</strong>, and{' '}
            <strong>App Banners</strong>. Those handle their own URLs and sizing, so reach for the
            Iframe block only when nothing more specific fits.
          </BlockCallout>
        </Section>

        <Section id="source" title="URL & title">
          <PropertyCard type="string">
            <strong>URL</strong> — the page to embed. Use the provider's <em>embed</em> URL where
            one exists; a normal share link often refuses to load in a frame.
          </PropertyCard>
          <PropertyCard type="string">
            <strong>Title</strong> — the frame's accessible name, announced by screen readers to
            describe what the embedded region contains.
          </PropertyCard>
          <BlockCallout variant="warning" title="Always set a title">
            An untitled iframe is announced as just "frame", which tells a screen-reader user
            nothing. A short description — "Office location map", "Q3 sales dashboard" — is enough.
          </BlockCallout>
          <PropertyCard type="boolean">
            <strong>Allow fullscreen</strong> — lets the embedded content request fullscreen. Worth
            enabling for video players, maps, and presentations.
          </PropertyCard>
        </Section>

        <Section id="size" title="Size & spacing">
          <PropertyCard type="percent" defaultValue="100%">
            <strong>Width</strong> — as a percentage of the container.
          </PropertyCard>
          <PropertyCard type="px" defaultValue="800px">
            <strong>Height</strong> — a fixed pixel height.
          </PropertyCard>
          <BlockCallout variant="info" title="Height can't adapt to the content">
            An iframe has no way to measure the page inside it, so it can't grow to fit. The block
            falls back to <Code>800px</Code> if the height is left empty, set to zero, or set to{' '}
            <Code>100vh</Code> — those all produce an unusable frame. Pick a height that suits the
            embedded content and check it at mobile width.
          </BlockCallout>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Alignment</strong> — positions the frame in its container. Only visible when
            the width is under 100%.
          </PropertyCard>
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="limits" title="What can be embedded">
          <p>
            Whether a URL loads in a frame is the <em>other</em> site's decision, not Page Pilot's.
            Many services block framing with an <Code>X-Frame-Options</Code> or{' '}
            <Code>Content-Security-Policy</Code> header, which shows as a blank or error frame with
            nothing you can configure to fix it.
          </p>
          <ul className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Use the embed URL.</strong> Most services publish a
              separate framing-friendly URL — often under <Code>/embed/</Code>.
            </li>
            <li>
              <strong className="text-ink">Test on the published page.</strong> The editor canvas
              and your live site are different origins, so an embed can work in one and not the
              other.
            </li>
            <li>
              <strong className="text-ink">Use HTTPS.</strong> An <Code>http://</Code> URL is
              blocked as mixed content on a secure page.
            </li>
          </ul>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            The block declares a <Code>responsive</Code> slice, so padding, margin, and alignment
            can differ per device. Each device falls back to <strong>Desktop</strong> when unset;
            Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The URL, title, fullscreen toggle, width, and height are shared across devices — a
            fixed height that works on desktop may need to suit mobile too.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
