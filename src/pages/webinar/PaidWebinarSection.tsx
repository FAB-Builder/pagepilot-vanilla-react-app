import type { ReactNode } from 'react';
import { Section, Code, Step, Note } from './shared';

const WEBINAR_LINK =
  'https://webinar-fab-builder.web.app/?w={{wid}}&type=webinar&l={{id}}';

function SubStep({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
          {n}
        </span>
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="mt-3 space-y-3 text-slate-600">{children}</div>
    </div>
  );
}

export default function PaidWebinarSection() {
  return (
    <Section id="paid-webinar" title="Paid webinar (registration with payment)">
      <p>
        A paid webinar gates access behind a payment instead of a plain registration form.
        The setup spans three products: <strong>Page Pilot</strong> hosts the webinar,
        <strong> Fab CS</strong> supplies the CRM workspace that stores registrants, and the
        <strong> Form Builder</strong> hosts the registration form containing the payment
        section. Complete the steps in order — each one depends on the previous.
      </p>

      <Note>
        <strong>Before you start:</strong> you need a Fab CS account (free tier is enough) and a
        webinar already created in Page Pilot. Payments are collected in <Code>INR</Code> through
        Cashfree using the payment credentials configured on your CS workspace.
      </Note>

      <SubStep n="1" title="Connect the webinar to your CRM workspace">
        <p>
          Open your webinar in{' '}
          <a
            href="https://pagepilot.fabbuilder.com/webinar"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
          >
            Page Pilot → Webinars
          </a>{' '}
          and go to the <strong>Advanced Info → Registration Settings</strong> tab.
        </p>
        <ol className="mt-3 space-y-2">
          <Step n={1}>
            Click <strong>Connect Fab CRM</strong>. A modal opens asking for a{' '}
            <strong>Workspace ID</strong>.
          </Step>
          <Step n={2}>
            Copy your workspace ID from{' '}
            <a
              href="https://cs.fabbuilder.com/settings/general_settings"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Fab CS → Settings → General Settings
            </a>{' '}
            under <em>Account Details</em>, paste it into the modal, and click{' '}
            <strong>Save</strong>.
          </Step>
          <Step n={3}>
            The <strong>Form</strong> and <strong>Channel</strong> dropdowns now populate with
            everything that exists in that workspace.
          </Step>
        </ol>
        <Note>
          This is a one-time setup per workspace. Until the workspace is connected the Form
          dropdown stays empty — there is nothing for Page Pilot to list.
        </Note>
      </SubStep>

      <SubStep n="2" title="Pick an existing form, or start creating a new one">
        <p>
          Still in <strong>Registration Settings</strong>, open the <strong>Form</strong>{' '}
          dropdown.
        </p>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>
            <strong>Already have a paid form?</strong> Select it. The form URL is filled in
            automatically and you can skip to step 5.
          </li>
          <li>
            <strong>Need a new one?</strong> Click the <strong>Create form</strong> link below the
            dropdown. It opens the Form Builder in a new tab, already scoped to the connected
            workspace.
          </li>
        </ul>
        <Note>
          Leave the Page Pilot tab open. You will come back to it in step 5 to select the form you
          are about to build.
        </Note>
      </SubStep>

      <SubStep n="3" title="Create the form in the Form Builder">
        <p>
          The Form Builder opens a four-step wizard. Choices here shape where the payment section
          can go.
        </p>
        <ol className="mt-3 space-y-2">
          <Step n={1}>
            <strong>Form Name</strong> — name the form, for example{' '}
            <Code>Paid Webinar Registration</Code>. Click <strong>Next</strong>.
          </Step>
          <Step n={2}>
            <strong>Target Device</strong> — pick Mobile, Tablet, or Desktop depending on where
            most attendees will register.
          </Step>
          <Step n={3}>
            <strong>Form Type</strong> — choose <strong>Single Form</strong> for a one-page
            registration, or <strong>Multi-Step Form</strong> to split it across steps. If you pick
            multi-step, the <strong>Submit at every step</strong> toggle appears — turn it on to
            persist each step as the attendee progresses.
          </Step>
          <Step n={4}>
            <strong>Select Template</strong> — pick <strong>Start from Scratch</strong> for a blank
            form, or <strong>Webinar Registration</strong> for a pre-filled starting point.
          </Step>
        </ol>
      </SubStep>

      <SubStep n="4" title="Add the payment section">
        <p>
          In the builder, drag a <strong>Payment Section</strong> element onto the canvas and click
          its edit (pencil) icon to configure it.
        </p>

        <h4 className="mt-4 font-semibold text-slate-700">Lead fields come first</h4>
        <p>
          Payment needs the registrant's identity to create the order and the CRM lead. Add text
          inputs named <em>exactly</em>: <Code>firstName</Code>, <Code>lastName</Code>,{' '}
          <Code>email</Code>, <Code>phone</Code>, and <Code>state</Code>. Any of these left out is
          prompted for in a dialog just before checkout — naming them correctly means the attendee
          never sees that extra dialog.
        </p>

        <h4 className="mt-4 font-semibold text-slate-700">Payment section settings</h4>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>
            <strong>Field Name</strong> — a unique key for this payment, for example{' '}
            <Code>webinarFee</Code>.
          </li>
          <li>
            <strong>Text to display</strong> — the button label, for example{' '}
            <Code>Pay Now</Code>.
          </li>
          <li>
            <strong>Is required</strong> — tick this so the form cannot be submitted until the
            payment has completed.
          </li>
          <li>
            <strong>Amount</strong> — the base price in rupees, before discount and GST.
          </li>
          <li>
            <strong>Button Alignment</strong> — Left, Center, or Right.
          </li>
          <li>
            <strong>Description</strong> — appears on the payment order, for example{' '}
            <Code>Test Webinar Payment</Code>.
          </li>
          <li>
            <strong>Discount Mode</strong> — <Code>None</Code>, <Code>Percentage</Code>, or{' '}
            <Code>Flat</Code>. Choosing either non-none option reveals a{' '}
            <strong>Discount %</strong> / <strong>Discount Amount</strong> field.
          </li>
          <li>
            <strong>GST Mode</strong> — <Code>None</Code>, <Code>Included</Code> (18% already
            inside the amount), or <Code>Excluded</Code> (18% added on top).
          </li>
          <li>
            <strong>Breakdown Display</strong> — <Code>Inline in form</Code> shows the
            amount/discount/GST/total rows directly under the section,{' '}
            <Code>Dialog on click</Code> shows them in a confirmation dialog before checkout, and{' '}
            <Code>Off</Code> hides them.
          </li>
        </ul>

        <Note>
          <strong>Place the payment section on the final step.</strong> On a multi-step form it must
          sit on the last step, after the lead fields — the attendee has to have filled in their
          details before an order can be created.
        </Note>

        <h4 className="mt-4 font-semibold text-slate-700">Send attendees into the webinar after paying</h4>
        <p>
          The payment section carries its own <strong>Button Type</strong> and{' '}
          <strong>Link</strong> settings, which control what happens once payment succeeds:
        </p>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>
            Set <strong>Button Type</strong> to <strong>Submit</strong> so the response is saved,
            or to <strong>Go To Webinar</strong> to use the pre-built webinar redirect.
          </li>
          <li>
            For a manual redirect, paste this into the <strong>Link</strong> field:
          </li>
        </ul>
        <div className="mt-2 rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm break-all text-slate-700">
          {WEBINAR_LINK}
        </div>
        <Note>
          <Code>{'{{wid}}'}</Code> is the webinar ID, passed in automatically when Page Pilot opens
          the form. <Code>{'{{id}}'}</Code> is the ID of the submitted response. Both are filled in
          at runtime, after the submit request completes — the redirect always waits for the
          response to be saved first, so the link never carries an empty ID.
        </Note>

        <p className="mt-3">Save and publish the form when the layout is complete.</p>
      </SubStep>

      <SubStep n="5" title="Attach the form back to the webinar">
        <p>
          Return to the Page Pilot tab, reopen the <strong>Form</strong> dropdown, and select the
          form you just published. The <strong>Form URL</strong> is filled in automatically.
        </p>
        <p>
          Optionally pick a <strong>Channel</strong> so every registrant is forwarded into that Fab
          CS channel for reminders and follow-up. Click <strong>Save</strong> on the webinar.
        </p>
      </SubStep>

      <SubStep n="6" title="Verify the flow end to end">
        <p>Open the webinar share link in a private window and walk through it as an attendee:</p>
        <ol className="mt-3 space-y-2">
          <Step n={1}>The registration form loads before the video is accessible.</Step>
          <Step n={2}>
            Fill in the lead fields, reach the payment section, and confirm the breakdown shows the
            amount, discount, GST, and total you configured.
          </Step>
          <Step n={3}>
            Click the pay button. The Cashfree checkout opens in a modal over the form.
          </Step>
          <Step n={4}>
            After a successful payment the section switches to <strong>Payment Submitted</strong>,
            the form response is saved, and only then does the redirect to the webinar fire.
          </Step>
          <Step n={5}>
            Confirm the registration and its payment appear in the Form Builder{' '}
            <strong>Responses</strong> dashboard and in your CS channel.
          </Step>
        </ol>
        <Note>
          If a payment succeeds but the attendee closes the tab before the form is submitted, the
          form warns them on unload and offers to resume from the payment step when they return —
          the completed payment is remembered and is not charged twice.
        </Note>
      </SubStep>
    </Section>
  );
}
