import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import { PAGES_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'create-basic', label: 'A. Create a basic template' },
  { id: 'create-single', label: 'B. Template with a single variable' },
  { id: 'create-repeat', label: 'C. Template with repetition' },
  { id: 'use-template', label: 'D. Use the template' },
  { id: 'field-types', label: 'Form field reference' },
  { id: 'tips', label: 'Tips & gotchas' },
];

/** Inline token chip so {{ }} reads clearly in prose. */
function Token({ children }: { children: string }) {
  return <Code>{children}</Code>;
}

export default function TemplateVariables() {
  return (
    <DocLayout
      title="Create a Template"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Create a Template
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Build your design once and turn it into a reusable <strong>template</strong>. Add
            fill-in-the-blank <strong>form fields</strong> so anyone can customise the wording —
            and even <strong>repeat whole blocks</strong> — from a simple Variables panel, without
            touching the design.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>This guide has three creation flows, from simple to advanced:</p>
          <ul className="my-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              <strong className="text-ink">A. Basic template</strong> — save any design so you can
              reuse it. No variables.
            </li>
            <li>
              <strong className="text-ink">B. Single variable</strong> — add a{' '}
              <Token>{'{{token}}'}</Token> + a <strong>text</strong> form field so users type one
              value (name, date, price…).
            </li>
            <li>
              <strong className="text-ink">C. Repetition</strong> — add an{' '}
              <strong>array</strong> form field + a repeatable container so users add as many copies
              of a block as they want (FAQs, features, testimonials…).
            </li>
          </ul>
          <p>
            All form fields are declared once, in the <strong>Set template details</strong> dialog
            when you save the template. Users then fill them from the <strong>Variables</strong> tab.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="create-basic" title="A. Create a basic template">
          <p>Start by saving any design as a reusable template.</p>
          <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Design your section</strong> — in the Page Pilot
              editor, build what you want to reuse: text, headings, buttons, images, containers,
              accordions, etc.
            </li>
            <li>
              <strong className="text-ink">2. Open Save as Template</strong> — select the block or
              section, open the <Code>⋯</Code> menu, and choose <strong>Save as template</strong>.
              The <strong>Set template details</strong> dialog opens.
            </li>
            <li>
              <strong className="text-ink">3. Name it</strong> — give the template a name (and
              optional description / category / visibility).
            </li>
            <li>
              <strong className="text-ink">4. Save</strong> — your template now appears in the{' '}
              <strong>Saved Templates</strong> panel, ready to drop onto any page.
            </li>
          </ol>
          <p>
            That's a plain template — same content every time. Next, make parts of it editable with
            form fields.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="create-single" title="B. Template with a single variable">
          <p>
            A single variable lets the user replace one value (e.g. a name) wherever it appears.
            It's two parts: a <strong>token</strong> in the design, and a <strong>text field</strong>{' '}
            in the template dialog.
          </p>

          <p className="mt-4 font-semibold text-ink">Step 1 — Add the token to your design</p>
          <p>
            In a <strong>Text</strong>, <strong>Heading</strong>, or <strong>Button</strong> block,
            type a token with double curly braces where the value should go:
          </p>
          <div className="my-3">
            <CodeSnippet language="text" code={`Welcome back, {{firstName}}!`} />
          </div>
          <p>
            The editor shows a friendly chip like <Token>✎ Add First Name</Token> instead of the raw
            token. You can reuse <Token>{'{{firstName}}'}</Token> in as many blocks as you like — one
            field fills them all.
          </p>

          <p className="mt-5 font-semibold text-ink">Step 2 — Declare the form field</p>
          <ol className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1.</strong> Choose <strong>Save as template</strong> to
              open <strong>Set template details</strong>.
            </li>
            <li>
              <strong className="text-ink">2.</strong> Under <strong>Template Fields</strong> click{' '}
              <strong>Add Field</strong>.
            </li>
            <li>
              <strong className="text-ink">3.</strong> Set <strong>ID</strong> = <Code>firstName</Code>{' '}
              (must match the token), <strong>Name</strong> = <Code>First Name</Code> (label the user
              sees), <strong>Type</strong> = <strong>Text</strong>.
            </li>
            <li>
              <strong className="text-ink">4.</strong> <strong>Save</strong>. The template now carries
              a "First Name" field.
            </li>
          </ol>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p>
              <strong className="text-ink">Result:</strong> whoever uses this template sees a{' '}
              <strong>First Name</strong> box in the Variables tab. Whatever they type replaces every{' '}
              <Token>{'{{firstName}}'}</Token> on the page.
            </p>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="create-repeat" title="C. Template with repetition">
          <p>
            Repetition lets a user add <em>many copies</em> of a block, each with its own content —
            the FAQ pattern. It uses a special <Token>{'{{this.field}}'}</Token> token and an{' '}
            <strong>Array (repeatable)</strong> form field bound to a container.
          </p>

          <p className="mt-4 font-semibold text-ink">Step 1 — Build the repeatable block</p>
          <ol className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1.</strong> Put the content you want repeated inside a{' '}
              <strong>Container</strong> (e.g. an Accordion).
            </li>
            <li>
              <strong className="text-ink">2.</strong> Inside it, use <strong>per-copy</strong>{' '}
              tokens — note the <Token>this.</Token> prefix: accordion title{' '}
              <Token>{'{{this.question}}'}</Token>, body <Token>{'{{this.answer}}'}</Token>.
            </li>
            <li>
              <strong className="text-ink">3.</strong> Keep shared parts (like an "FAQs" heading)
              <em> outside</em> the repeatable container — nest the repeatable content in an{' '}
              <em>inner</em> container.
            </li>
          </ol>
          <div className="my-3">
            <p className="mb-2 text-sm font-medium text-ink">Recommended structure:</p>
            <CodeSnippet
              language="text"
              code={`Outer Container
  ├─ Heading "FAQs"          ← shown once (shared)
  └─ Inner Container          ← repeats: one copy per FAQ
       └─ Accordion
            ├─ Title:  {{this.question}}
            └─ Body:   {{this.answer}}`}
            />
          </div>

          <p className="mt-5 font-semibold text-ink">Step 2 — Declare the array field + repeater</p>
          <ol className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1.</strong> <strong>Save as template</strong> →{' '}
              <strong>Set template details</strong> → <strong>Add Field</strong>.
            </li>
            <li>
              <strong className="text-ink">2.</strong> Set <strong>ID</strong> = <Code>faqs</Code>,{' '}
              <strong>Name</strong> = <Code>FAQs</Code>, <strong>Type</strong> ={' '}
              <strong>Array (repeatable)</strong>.
            </li>
            <li>
              <strong className="text-ink">3.</strong> In <strong>Repeat which block?</strong> pick
              the container to repeat — the <em>inner</em> one, so the heading stays put.
            </li>
            <li>
              <strong className="text-ink">4.</strong> Add the <strong>row sub-fields</strong> that
              match your <Token>{'{{this.}}'}</Token> tokens: <Code>question</Code> → "Question",{' '}
              <Code>answer</Code> → "Answer".
            </li>
            <li>
              <strong className="text-ink">5.</strong> <strong>Save</strong>.
            </li>
          </ol>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p>
              <strong className="text-ink">Result:</strong> users see a <strong>FAQs</strong> field
              in the Variables tab with <strong>Block 1</strong> (Question + Answer) and an{' '}
              <strong>Add Block</strong> button. Each <strong>Add Block</strong> drops a full copy of
              the inner container on the page with its own question and answer — the heading is never
              duplicated.
            </p>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="use-template" title="D. Use the template">
          <p>However you created it, a user fills it the same way:</p>
          <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Apply</strong> — open the{' '}
              <strong>Saved Templates</strong> panel and pick your template (<strong>Choose design</strong>{' '}
              or <strong>Add this section</strong>). Page Pilot switches to the{' '}
              <strong>Variables</strong> tab automatically.
            </li>
            <li>
              <strong className="text-ink">2. Fill single variables</strong> — type into each field;
              the canvas updates live.
            </li>
            <li>
              <strong className="text-ink">3. Add repeated blocks</strong> — for an array field, fill{' '}
              <strong>Block 1</strong>, then click <strong>Add Block</strong> for more copies. Remove
              a copy with its trash icon.
            </li>
            <li>
              <strong className="text-ink">4. Publish</strong> — values are baked into the published
              page; the editable copy keeps the fields so you can change them later.
            </li>
          </ol>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="field-types" title="Form field reference">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">Field type</th>
                  <th className="px-4 py-3 font-semibold">Token in design</th>
                  <th className="px-4 py-3 font-semibold">What the user gets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="px-4 py-3"><strong>Text</strong></td>
                  <td className="px-4 py-3"><Token>{'{{id}}'}</Token></td>
                  <td className="px-4 py-3">One input box; its value replaces the token everywhere.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><strong>Array (repeatable)</strong></td>
                  <td className="px-4 py-3">
                    <Token>{'{{this.subField}}'}</Token> inside the chosen container
                  </td>
                  <td className="px-4 py-3">
                    A repeatable block — <strong>Add Block</strong> clones the container; each copy
                    has its own sub-field values.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Every field has an <strong>ID</strong> (matches the token) and a <strong>Name</strong>{' '}
            (the label users see). An array field also has <strong>row sub-fields</strong> (one per{' '}
            <Token>{'{{this.}}'}</Token> token) and a <strong>Repeat which block?</strong> selection.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="tips" title="Tips & gotchas">
          <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              Tokens work only in <strong>Text</strong>, <strong>Heading</strong>, and{' '}
              <strong>Button</strong> blocks — not in rich-text (MDX/HTML) blocks.
            </li>
            <li>
              The field <strong>ID</strong> must match the token exactly (case-sensitive):{' '}
              <Token>{'{{firstName}}'}</Token> needs ID <Code>firstName</Code>.
            </li>
            <li>
              Use <Token>{'{{name}}'}</Token> for a single value;{' '}
              <Token>{'{{this.name}}'}</Token> only inside a repeatable container.
            </li>
            <li>
              <strong>Adding a copy duplicates my heading?</strong> You repeated the outer container.
              Move the heading to the outer container and the repeatable content to an{' '}
              <em>inner</em> container, then pick the inner one in{' '}
              <strong>Repeat which block?</strong>.
            </li>
            <li>
              Deleting a repeated block from the canvas also removes its entry from the Variables tab
              automatically.
            </li>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}
