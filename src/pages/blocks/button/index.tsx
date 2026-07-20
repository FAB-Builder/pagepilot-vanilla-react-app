import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import CodeSnippet from '../../../components/CodeSnippet';
import { BlockCallout as Callout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'action-types', label: 'Action types' },
  { id: 'label', label: 'Label & text' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'hover', label: 'Hover state' },
  { id: 'size-width', label: 'Size & width' },
  { id: 'wrapper-spacing', label: 'Wrapper spacing & alignment' },
  { id: 'icon', label: 'Icon' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

interface ActionTypeRow {
  value: string;
  label: string;
  description: string;
}

const ACTION_TYPES: ActionTypeRow[] = [
  {
    value: 'link',
    label: 'Link',
    description:
      'Navigates to a URL. Renders as an <a> tag. Reveals an "Open in new tab" toggle (on by default) alongside the URL field.',
  },
  {
    value: 'onNextStep',
    label: 'Next step',
    description:
      'Advances to the next step of the current tour/tooltip flow. The default action for new buttons.',
  },
  {
    value: 'onPrevStep',
    label: 'Previous step',
    description: 'Goes back to the previous step of the current flow.',
  },
  {
    value: 'onCloseStep',
    label: 'Close',
    description: 'Dismisses the current tour, tooltip, or modal.',
  },
  {
    value: 'goToStep',
    label: 'Go to step',
    description:
      'Jumps directly to a specific step number. Reveals a "Step No." text field — the value is written into data-goto-step on the rendered button.',
  },
  {
    value: 'postMessageEvent',
    label: 'Button click (postMessage)',
    description:
      'Fires a window.postMessage event with a custom name. Reveals an "Event" text field — the value is written into data-post-message-event, letting the host page listen for it.',
  },
];

const ICON_OPTIONS = [
  'arrow-left',
  'arrow-narrow-down',
  'arrow-narrow-down-left',
  'arrow-narrow-down-right',
  'arrow-narrow-left',
  'arrow-narrow-right',
  'arrow-narrow-up',
  'arrow-narrow-up-left',
  'arrow-narrow-up-right',
  'arrow-right',
  'chevron-down',
  'chevron-down-double',
  'chevron-left',
  'chevron-left-double',
  'chevron-right',
  'chevron-right-double',
  'chevron-up',
  'chevron-up-double',
];

export default function ButtonBlock() {
  return (
    <DocLayout title="Button" sections={SECTIONS} subModules={BLOCKS_SUBMODULES} subModulesLabel="Blocks">
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Button Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A clickable call-to-action block. Beyond simple links, it can drive tour/tooltip
            navigation, jump to an arbitrary step, or fire a custom event the host page listens
            for — all without writing code.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Every Button has three concerns you configure independently in the sidebar:{' '}
            <strong>what it does</strong> (the action type), <strong>how it looks</strong>{' '}
            (background, border, radius, hover state), and <strong>how it's sized</strong>{' '}
            (width type, size preset — both of which can differ per device).
          </p>
          <p>
            Optionally it can carry a leading or trailing icon next to the label, and its text
            color, background, and border all support solid colors or CSS gradients.
          </p>
        </Section>

        <Section id="action-types" title="Action types">
          <p>
            The <strong>Type</strong> dropdown at the top of the sidebar picks what happens on
            click. Switching action types clears the fields that only apply to the previous type
            (e.g. leaving "Link" clears the URL; leaving "Go to step" clears the step number).
          </p>
          <div className="mt-4 space-y-3">
            {ACTION_TYPES.map((a) => (
              <div key={a.value} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Code>{a.value}</Code>
                  <span className="text-sm font-semibold text-ink">{a.label}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.description}</p>
              </div>
            ))}
          </div>
          <Callout variant="tip" title="Reading the action on the published page">
            Every rendered button carries <Code>data-action</Code> (and, where relevant,{' '}
            <Code>data-goto-step</Code> / <Code>data-post-message-event</Code> plus a JSON{' '}
            <Code>data-action-payload</Code>) as HTML attributes — the runtime reads these to
            decide what to do on click.
          </Callout>

          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">
            Use case: "Button click" (postMessage)
          </h3>
          <p>
            Set the action to <strong>Button click</strong>, give it an event name (e.g.{' '}
            <Code>checkout-clicked</Code>), and the runtime fires a{' '}
            <Code>window.postMessage</Code> with that name whenever the button is clicked — from
            inside an embedded PagePilot tour, tooltip, or page. Your host app listens for it and
            reacts (open a modal, track an analytics event, redirect, etc.) without any coupling
            to PagePilot internals.
          </p>

          <CodeSnippet
            title="React hook"
            code={`import { useEffect } from 'react';

function useAhdButtonClick(eventName: string, onClick: () => void) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'ahd-button-click' && event.data.event === eventName) {
        onClick();
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [eventName, onClick]);
}

// Usage inside a component:
function CheckoutPage() {
  useAhdButtonClick('checkout-clicked', () => {
    setCheckoutModalOpen(true);
  });

  return <div>{/* ...embedded PagePilot content... */}</div>;
}`}
          />

          <Callout title="Payload shape">
            The exact wrapper (<Code>type</Code>, field names) is set by the AHD runtime script
            embedded on your page — confirm the live shape with a quick{' '}
            <Code>console.log(event.data)</Code> in your listener before wiring up production
            logic.
          </Callout>
        </Section>

        <Section id="label" title="Label & text">
          <p>Controls in the "Button Label" section:</p>
          <PropertyCard type="string" defaultValue='""'>
            <strong>Content</strong> — the visible button text.
          </PropertyCard>
          <PropertyCard type="string" defaultValue="empty">
            <strong>Accessible label</strong> — sets <Code>aria-label</Code>. If left empty and
            the button has no text but does have an icon, the icon name is used as a fallback
            label automatically.
          </PropertyCard>
          <PropertyCard type="color | gradient">
            <strong>Font color</strong> — solid hex/rgb or a gradient. A contrast warning appears
            automatically when the text color is too close to the button background.
          </PropertyCard>
          <p className="mt-3">
            Font size, family, and weight are shared with other text blocks via the standard
            typography controls. Text alignment controls how the label sits inside the button
            (left / center / right).
          </p>
        </Section>

        <Section id="appearance" title="Appearance">
          <p>Controls in the "Appearance" section — all shared across devices (not per-device):</p>
          <PropertyCard type="color | gradient" defaultValue="none">
            <strong>Background</strong> — solid or gradient. Gradients render via{' '}
            <Code>backgroundImage</Code> so they aren't clipped like a flat{' '}
            <Code>backgroundColor</Code> would be.
          </PropertyCard>
          <PropertyCard type="number | per-corner">
            <strong>Radius</strong> — a single value or four independent corner values.
          </PropertyCard>
          <PropertyCard type="color | gradient" defaultValue="none">
            <strong>Border</strong> color. A gradient border is rendered as an outer wrapper div
            with the gradient as its background and the actual button inset inside it (CSS{' '}
            <Code>border-image</Code> doesn't support radius, so this is the workaround).
          </PropertyCard>
          <PropertyCard type="per-side thickness" defaultValue="0 on all sides">
            <strong>Thickness</strong> — border width per side. Setting any side above 0
            auto-fills the border color to <Code>transparent</Code> if none is set yet, so the
            border becomes visible immediately.
          </PropertyCard>
        </Section>

        <Section id="hover" title="Hover state">
          <p>
            An optional "Hover State" section lets you override background and text color on{' '}
            <Code>:hover</Code>. Both are optional independently — set only background, only
            text, or both. Rendered as a scoped <Code>&lt;style&gt;</Code> tag next to the
            button, so it works in the static published HTML without any JS.
          </p>
        </Section>

        <Section id="size-width" title="Size & width">
          <p>The "Size" section has two independent controls:</p>
          <PropertyCard type="'fixed' | 'fill' | 'fit'" defaultValue="fit">
            <strong>Width type</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <Code>fit</Code> — button hugs its content (default).
              </li>
              <li>
                <Code>fill</Code> — button stretches to 100% of its container (internally also
                sets <Code>fullWidth</Code> on desktop).
              </li>
              <li>
                <Code>fixed</Code> — button is exactly the given pixel width; reveals a width
                field.
              </li>
            </ul>
          </PropertyCard>
          <PropertyCard type="'x-small' | 'small' | 'medium' | 'large'" defaultValue="medium">
            <strong>Size</strong> — a padding preset (vertical/horizontal px):{' '}
            <Code>x-small</Code> 4/8, <Code>small</Code> 8/12, <Code>medium</Code> 12/20,{' '}
            <Code>large</Code> 16/32.
          </PropertyCard>
        </Section>

        <Section id="wrapper-spacing" title="Wrapper spacing & alignment">
          <p>
            Below the Size section, the block also exposes a <strong>Text align</strong> and{' '}
            <strong>Padding</strong> pair that target the outer wrapper the button sits in — not
            the button itself. This is what positions and spaces the button within its column or
            container.
          </p>
          <PropertyCard type="'left' | 'center' | 'right'">
            <strong>Wrapper text align</strong> (<Code>style.textAlign</Code>) — where the button
            sits horizontally inside its container. Separate from the "Text align" control in the{' '}
            <Code>Button Label</Code> section (<Code>buttonTextAlign</Code>), which positions the
            label + icon inside the button itself.
          </PropertyCard>
          <PropertyCard type="per-side spacing" defaultValue="0 on all sides">
            <strong>Padding</strong> (<Code>style.padding</Code>) — space around the button
            wrapper, independent of the button's own internal padding (which comes from the{' '}
            <Code>Size</Code> preset).
          </PropertyCard>
        </Section>

        <Section id="icon" title="Icon">
          <p>
            Toggle "Icon" on to add a small chevron/arrow glyph next to the label, aligned{' '}
            <Code>left</Code> or <Code>right</Code>. Available icons:
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ICON_OPTIONS.map((k) => (
              <span
                key={k}
                className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600"
              >
                {k}
              </span>
            ))}
          </div>
          <p className="mt-3">
            The icon inherits the button's text color (including gradient text colors) unless a
            separate stroke color is computed for contrast.
          </p>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Width type</strong> and <strong>Size</strong> can both differ per device —
            switch to the Tablet or Mobile tab in the sidebar and set a different value. Each
            device falls back to <strong>Desktop</strong> when unset — Tablet and Mobile are
            independent, so Mobile does not inherit a value you set on Tablet. This is real{' '}
            <Code>@media</Code>-driven CSS in the published page, not just an editor preview
            trick — the block emits its own scoped breakpoint rules for width and padding.
          </p>
          <Callout title="Not per-device">
            Colors, border, radius, icon, and the label text itself stay shared across all
            devices by design — they're hidden on the Tablet/Mobile tabs so there's no confusion
            about where an edit is stored.
          </Callout>
        </Section>
      </article>
    </DocLayout>
  );
}
