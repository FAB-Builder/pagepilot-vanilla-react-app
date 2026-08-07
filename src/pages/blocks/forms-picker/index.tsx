import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'picking', label: 'Picking a form' },
  { id: 'size', label: 'Size & alignment' },
  { id: 'responses', label: 'Where responses go' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function FormsPickerBlock() {
  return (
    <DocLayout
      title="Forms"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Forms Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Embeds a form you built in the Form Builder. Pick it from a list — no URLs to copy, no
            embed code to paste.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Forms are authored in the <strong>Form Builder</strong>, a separate part of the
            platform. This block connects one of them to a page: you select a form by name and the
            block embeds its live view URL.
          </p>
          <p>
            You'll find it under <strong>Embeds/Integrations</strong> in the Add Block menu.
          </p>
          <BlockCallout variant="tip" title="Build the form first">
            The picker lists forms that already exist in your workspace. If yours isn't there, open
            the Form Builder and create it — the sidebar has a link that opens the create page
            directly. See the <strong>Forms</strong> module for the full authoring guide.
          </BlockCallout>
        </Section>

        <Section id="picking" title="Picking a form">
          <PropertyCard type="string">
            <strong>Form</strong> — chosen from a dropdown of the forms in your workspace. The
            block stores the form's id and name, and derives the embed URL from them.
          </PropertyCard>
          <BlockCallout variant="info" title="Edits to the form appear automatically">
            The block embeds the form by reference, not by copying it. Change a field in the Form
            Builder and every page embedding that form shows the change — no need to republish the
            page.
          </BlockCallout>
        </Section>

        <Section id="size" title="Size & alignment">
          <PropertyCard type="percent | px" defaultValue="100%">
            <strong>Width</strong>
          </PropertyCard>
          <PropertyCard type="px" defaultValue="500px">
            <strong>Height</strong> — the embedded frame's fixed height.
          </PropertyCard>
          <PropertyCard type="'left' | 'center' | 'right'" defaultValue="left">
            <strong>Alignment</strong> — positions the form in its container. Only visible when the
            width is under 100%.
          </PropertyCard>
          <BlockCallout variant="warning" title="Set the height to fit your longest state">
            The frame can't measure the form inside it, so it won't grow. Size it for the tallest
            state — a long form, or a validation error adding a line under several fields —
            otherwise visitors get a scrollbar inside your page.
          </BlockCallout>
        </Section>

        <Section id="responses" title="Where responses go">
          <p>
            Submissions are collected by the Form Builder, not by the page. View them in the
            responses dashboard for that form, or pull them into your own systems through the Form
            Builder REST API — both are covered in the <strong>Forms</strong> module.
          </p>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Height</strong> is genuinely per-device here — the block stores separate{' '}
            <Code>heightTablet</Code> and <Code>heightMobile</Code> values. That matters, because a
            form that fits in one screen on desktop usually stacks taller on a phone.
          </p>
          <BlockCallout title="Not per-device">
            The selected form, width, and alignment are shared across devices.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
