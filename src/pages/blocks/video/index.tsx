import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'source', label: 'Video source' },
  { id: 'youtube', label: 'YouTube URL variant' },
  { id: 'size', label: 'Size' },
  { id: 'appearance', label: 'Radius & border' },
  { id: 'alt', label: 'Alt text' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

const VIDEO_EXTENSIONS = [
  '.mp4',
  '.webm',
  '.ogg',
  '.mov',
  '.avi',
  '.mkv',
  '.flv',
  '.wmv',
  '.m4v',
];

export default function VideoBlock() {
  return (
    <DocLayout
      title="Video"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Video Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            An embedded video — an uploaded file, a direct video URL, or a YouTube/Vimeo link —
            with per-device width and height.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Video accepts either a hosted video file or a link to a streaming provider. The block
            validates what you paste so a mistyped or non-video URL doesn't silently render an
            empty player.
          </p>
        </Section>

        <Section id="source" title="Video source">
          <PropertyCard type="media gallery">
            <strong>Upload video</strong> — opens the media gallery filtered to video files.
          </PropertyCard>
          <PropertyCard type="string | null">
            <strong>Media</strong> — paste a video URL. Validation runs when you leave the field:
            an invalid URL is rejected with an error and the previous value is restored.
          </PropertyCard>

          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">What counts as valid</h3>
          <p>
            YouTube (<Code>youtube.com</Code>, <Code>youtu.be</Code>) and{' '}
            <Code>vimeo.com</Code> links are always accepted. Otherwise the URL must point at a
            recognised video file extension:
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {VIDEO_EXTENSIONS.map((ext) => (
              <span
                key={ext}
                className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600"
              >
                {ext}
              </span>
            ))}
          </div>
          <BlockCallout variant="warning" title="Image URLs are rejected outright">
            A URL containing an image extension (<Code>.jpg</Code>, <Code>.png</Code>,{' '}
            <Code>.gif</Code>, <Code>.svg</Code>, <Code>.webp</Code>…) fails validation even if it
            also matches a video pattern — pasting an image into the Video block is nearly always
            a mistake, so it's blocked rather than rendered broken.
          </BlockCallout>
          <PropertyCard type="color | null">
            <strong>Background color</strong> — behind the player.
          </PropertyCard>
        </Section>

        <Section id="youtube" title="YouTube URL variant">
          <p>
            The Add Block menu lists a separate <strong>YouTube URL</strong> entry. It creates the
            same Video block with an internal <Code>name: 'youtube'</Code> marker; the only
            difference in the sidebar is that the upload button is hidden, since a YouTube video
            is linked rather than uploaded. Every other control behaves identically.
          </p>
        </Section>

        <Section id="size" title="Size">
          <PropertyCard type="dimension" defaultValue="100%">
            <strong>Width</strong> — accepts px or a percentage.
          </PropertyCard>
          <PropertyCard type="dimension" defaultValue="unset">
            <strong>Height</strong> — accepts px or a percentage. Left unset, the player keeps its
            natural aspect ratio.
          </PropertyCard>
        </Section>

        <Section id="appearance" title="Radius & border">
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Text align</strong> — positions the player in its container.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
          <PropertyCard type="number | per-corner" defaultValue="0">
            <strong>Radius</strong>
          </PropertyCard>
          <PropertyCard type="color | null" defaultValue="null">
            <strong>Border</strong> color. Setting it reveals a per-side{' '}
            <strong>Border width</strong> control, defaulting to 1px all round.
          </PropertyCard>
        </Section>

        <Section id="alt" title="Alt text">
          <PropertyCard type="string" defaultValue='""'>
            <strong>Alt text</strong> — describes the video for assistive technology.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Width</strong> and <strong>height</strong> are genuinely per-device via{' '}
            <Code>widthTablet</Code> / <Code>widthMobile</Code> and{' '}
            <Code>heightTablet</Code> / <Code>heightMobile</Code>, published as real{' '}
            <Code>@media</Code> CSS. Alignment, padding, margin, radius, and border also differ
            per device.
          </p>
          <BlockCallout title="Not per-device">
            The video source itself is shared across devices — the whole Appearance section is
            hidden on the Tablet/Mobile tabs. One video plays everywhere; only its box changes.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
