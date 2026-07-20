import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'behavior', label: 'Behaviour' },
  { id: 'slides-per-view', label: 'Slides per view' },
  { id: 'slides', label: 'Slides' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function CarouselBlock() {
  return (
    <DocLayout
      title="Carousel"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Carousel Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A horizontally sliding set of panels with arrows, dots, and optional autoplay. Each
            slide is a drop zone for any blocks.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A new Carousel starts with three slides showing three at a time on desktop, two on
            tablet, and one on mobile. Up to twenty slides.
          </p>
        </Section>

        <Section id="behavior" title="Behaviour">
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show arrows</strong> — previous/next controls.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show dots</strong> — the position indicators below the slides.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Loop</strong> — wraps from the last slide back to the first.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Autoplay</strong> — advances slides automatically. Turning it on reveals the
            interval control.
          </PropertyCard>
          <PropertyCard type="number (min 500)" defaultValue="4000">
            <strong>Autoplay interval</strong> — milliseconds between slides, stepped in 500ms
            increments.
          </PropertyCard>
          <PropertyCard type="number (min 0)" defaultValue="400">
            <strong>Transition speed</strong> — milliseconds for the slide animation.
          </PropertyCard>
          <BlockCallout variant="warning" title="Autoplay and accessibility">
            Content that moves on its own is hard to read for some visitors and can be
            disorienting. If you enable autoplay, prefer a slower interval and keep arrows visible
            so people can take control.
          </BlockCallout>
        </Section>

        <Section id="slides-per-view" title="Slides per view">
          <PropertyCard type="number (1–6)" defaultValue="3">
            <strong>Slides per view</strong> — how many slides are visible at once.
          </PropertyCard>
          <PropertyCard type="number" defaultValue="16">
            <strong>Gap</strong> — space between slides, in px.
          </PropertyCard>
        </Section>

        <Section id="slides" title="Slides">
          <p>
            The Slides section lists each slide with a delete button. <strong>Add slide</strong>{' '}
            appends a new empty one; the control disables at twenty slides, and delete disappears
            when only one is left.
          </p>
          <p>Slide content is built on the canvas by dropping blocks into each slide.</p>
        </Section>

        <Section id="appearance" title="Appearance">
          <PropertyCard type="color | null">
            <strong>Arrow color</strong>, <strong>Arrow background</strong>, and{' '}
            <strong>Arrow border</strong>
          </PropertyCard>
          <PropertyCard type="number (16–80)" defaultValue="40">
            <strong>Arrow size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Dot color</strong> and <strong>Active dot color</strong>
          </PropertyCard>
          <PropertyCard type="number (4–24)" defaultValue="8">
            <strong>Dot size</strong> — in px.
          </PropertyCard>
          <PropertyCard type="color | null">
            <strong>Border</strong> and <strong>Background</strong>
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
            <strong>Slides per view</strong> is genuinely per-device via{' '}
            <Code>slidesPerView</Code> / <Code>slidesPerViewTablet</Code> /{' '}
            <Code>slidesPerViewMobile</Code>, published as real <Code>@media</Code> CSS. Slide
            gap, arrow and dot sizes, radius, padding, and margin also differ per device.
          </p>
          <BlockCallout title="Not per-device">
            The whole Behaviour section — arrows, dots, loop, autoplay, transition speed — and the
            slide list itself are shared across devices, hidden on the Tablet/Mobile tabs.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
