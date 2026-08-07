import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'url', label: 'Getting your booking URL' },
  { id: 'settings', label: 'Settings' },
  { id: 'size', label: 'Size & spacing' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function CalendlyBlock() {
  return (
    <DocLayout
      title="Calendly"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Calendly Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Embeds a Calendly booking page so visitors can schedule a meeting without leaving your
            site.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Paste your Calendly scheduling link and the block renders the booking interface inline.
            Visitors pick a slot and confirm in place; the booking is handled entirely by Calendly.
          </p>
          <p>
            You'll find it under <strong>Embeds/Integrations</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="info" title="A focused Iframe block">
            Under the hood this is the same embedding mechanism as the <strong>Iframe</strong>{' '}
            block, pre-set for Calendly. Use this one for scheduling links — the defaults suit
            Calendly's layout — and the generic Iframe block for anything else.
          </BlockCallout>
        </Section>

        <Section id="url" title="Getting your booking URL">
          <ol className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1.</strong> Sign in to Calendly and open the event type
              you want people to book.
            </li>
            <li>
              <strong className="text-ink">2.</strong> Copy its scheduling link — it looks like{' '}
              <Code>https://calendly.com/your-name/30min</Code>.
            </li>
            <li>
              <strong className="text-ink">3.</strong> Paste it into the block's <strong>URL</strong>{' '}
              field.
            </li>
          </ol>
          <BlockCallout variant="tip" title="Link to a specific event, not your profile">
            Your profile URL lists every event type and makes the visitor choose. Linking straight
            to the event you want booked removes a step.
          </BlockCallout>
        </Section>

        <Section id="settings" title="Settings">
          <PropertyCard type="string">
            <strong>URL</strong> — your Calendly scheduling link.
          </PropertyCard>
          <PropertyCard type="string">
            <strong>Title</strong> — the accessible name for the embedded region, announced by
            screen readers. Something like "Book a demo" works well.
          </PropertyCard>
          <PropertyCard type="boolean">
            <strong>Allow fullscreen</strong>
          </PropertyCard>
        </Section>

        <Section id="size" title="Size & spacing">
          <PropertyCard type="percent" defaultValue="100%">
            <strong>Width</strong> — as a percentage of the container.
          </PropertyCard>
          <PropertyCard type="px" defaultValue="800px">
            <strong>Height</strong> — a fixed pixel height.
          </PropertyCard>
          <BlockCallout variant="warning" title="Give it enough height">
            Calendly's calendar needs vertical room. Too short and visitors get a cramped
            scrolling frame inside your page — the most common problem with this block. Around{' '}
            <Code>700px</Code> is a reasonable starting point; check it at mobile width, where the
            layout stacks and needs more.
          </BlockCallout>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Alignment</strong> — only visible when the width is under 100%.
          </PropertyCard>
          <PropertyCard type="per-side spacing">
            <strong>Padding</strong> and <strong>Margin</strong>
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            The block declares a <Code>responsive</Code> slice, so padding, margin, and alignment
            can differ per device. Each device falls back to <strong>Desktop</strong> when unset;
            Tablet and Mobile are independent.
          </p>
          <BlockCallout title="Not per-device">
            The URL, title, fullscreen toggle, width, and height are shared across devices.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
