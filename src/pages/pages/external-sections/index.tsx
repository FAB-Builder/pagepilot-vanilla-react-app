import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import { PAGES_SUBMODULES } from '../subModules';

/**
 * External Sections — a sub-module of "Pages". Explains the concept of a
 * section whose markup is NOT authored in the visual editor, but rendered by
 * the host app at runtime into an empty anchor div (`<div id="identifier">`).
 */

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'internal-vs-external', label: 'Internal vs external' },
  { id: 'when', label: 'When to use it' },
  { id: 'create', label: 'Create an external section' },
  { id: 'render', label: 'Render it in your app' },
  { id: 'example', label: 'End-to-end example' },
  { id: 'tips', label: 'Tips & gotchas' },
];

export default function ExternalSections() {
  return (
    <DocLayout
      title="External Sections"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            External Sections
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A page in Page Pilot is built from one or more <strong>sections</strong>. Most are{' '}
            <strong>internal</strong> — designed visually on the canvas. An <strong>external</strong>{' '}
            section is different: it has <em>no</em> editor content. It's a named placeholder that{' '}
            <strong>your own code fills in at runtime</strong>, so you can mix Page Pilot content with
            live, dynamic, or custom React/JS components on the same page.
          </p>
        </header>

        {/* ---------------------------------------------------------------- */}
        <Section id="overview" title="Overview">
          <p>
            Think of a page as an ordered list of sections. When you fetch a page from Page Pilot, you
            get back <Code>pageInfo.sections</Code> — each with a <Code>sectionType</Code> of{' '}
            <Code>internal</Code> or <Code>external</Code>. An <strong>external</strong> section
            carries no HTML to render; instead it carries a unique <strong>identifier</strong> that
            tells <em>your</em> code where to slot in <em>your</em> component.
          </p>
          <p>
            Page Pilot generates that identifier for you in the form{' '}
            <Code>section-&lt;timestamp&gt;</Code> (e.g. <Code>section-1782448678097</Code>). When you
            map over the sections, you render internal ones as-is and swap in your own component
            wherever you find a matching external identifier — a live pricing widget, a personalised
            greeting, a third-party embed. Page Pilot owns the <em>slot</em>; you own the{' '}
            <em>contents</em>.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="internal-vs-external" title="Internal vs external">
          <div className="scroll-slim overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-slate-50 text-left text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">&nbsp;</th>
                  <th className="px-4 py-3 font-semibold">Internal section</th>
                  <th className="px-4 py-3 font-semibold">External section</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">Who builds the content</td>
                  <td className="px-4 py-3">You, visually in the editor</td>
                  <td className="px-4 py-3">Your developers, in code</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">Editor canvas</td>
                  <td className="px-4 py-3">Full drag-and-drop editing</td>
                  <td className="px-4 py-3">Locked — shows a "Client-side section" placeholder</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">What you fetch</td>
                  <td className="px-4 py-3">
                    <Code>section.content</Code> — rendered HTML
                  </td>
                  <td className="px-4 py-3">
                    <Code>section.identifier</Code> — no HTML; you render it
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">Best for</td>
                  <td className="px-4 py-3">Static / marketing content</td>
                  <td className="px-4 py-3">Dynamic / interactive / personalised content</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Both kinds live side by side in the same page and render in the order you arrange them, so
            a single page can be part visually-authored content and part custom-rendered widgets.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="when" title="When to use it">
          <p>Reach for an external section whenever the content can't be authored ahead of time:</p>
          <ul className="my-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Live / dynamic data</strong> — a real-time stock ticker,
              available appointment slots, an order-status panel.
            </li>
            <li>
              <strong className="text-ink">Personalised content</strong> — "Welcome back, Ajay" or a
              dashboard that depends on the logged-in user.
            </li>
            <li>
              <strong className="text-ink">Existing app components</strong> — drop your React/Vue
              component into a Page Pilot layout without rebuilding it on the canvas.
            </li>
            <li>
              <strong className="text-ink">Third-party embeds</strong> — a chat widget, a map, a
              checkout iframe that needs its own scripts.
            </li>
          </ul>
          <p>
            If the content is static and you can build it visually, use an <strong>internal</strong>{' '}
            section instead — it needs no code.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="create" title="Create an external section">
          <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Open the section dropdown</strong> — in the page
              editor, click the section name at the top (e.g. <Code>Section 1</Code>) to open the
              sections list.
            </li>
            <li>
              <strong className="text-ink">2. Add a section</strong> — choose{' '}
              <strong>Add Section</strong>. The <strong>Add Section</strong> dialog opens.
            </li>
            <li>
              <strong className="text-ink">3. Give it a title</strong> — e.g.{' '}
              <Code>Promo Banner</Code>. This is just a label you'll see in the dropdown.
            </li>
            <li>
              <strong className="text-ink">4. Set Section Type → External</strong> — pick the{' '}
              <strong>External</strong> radio option. A note reminds you:{' '}
              <em>"External sections are referenced by a unique identifier. The visual editor canvas
              is locked."</em>
            </li>
            <li>
              <strong className="text-ink">5. Save</strong> — the section is created with an
              auto-generated identifier of the form <Code>section-&lt;timestamp&gt;</Code> (e.g.{' '}
              <Code>section-1782448678097</Code>) and tagged with an <strong>External</strong> chip in
              the dropdown.
            </li>
          </ol>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p>
              <strong className="text-ink">What you'll see:</strong> selecting the external section
              shows a locked <strong>"Client-side section"</strong> placeholder on the canvas instead
              of editing tools — <em>"This section is managed by developers using its identifier."</em>{' '}
              The identifier is displayed there; <strong>copy it</strong> — your code needs it.
            </p>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="render" title="Render it in your app">
          <p>
            Fetch the page by its slug, then <strong>map over <Code>pageInfo.sections</Code></strong>.
            Render each <strong>internal</strong> section's HTML, and when you hit an{' '}
            <strong>external</strong> section, match its <Code>identifier</Code> and render your own
            component in its place:
          </p>
          <div className="my-3">
            <CodeSnippet
              language="tsx"
              code={`// The external section's identifier — copied from the editor.
const SUBSCRIPTION_PLANS = 'section-1782448678097';

{pageInfo.sections.map((section) => {
  // Internal section → render the HTML built on the canvas.
  if (section.sectionType === 'internal') {
    return (
      <div key={section.id} dangerouslySetInnerHTML={{ __html: section.content }} />
    );
  }

  // External section → render your own component for this identifier.
  if (section.sectionType === 'external' && section.identifier === SUBSCRIPTION_PLANS) {
    return <SubscriptionPlans key={section.id} pageInfo={pageInfo} />;
  }

  return null;
})}`}
            />
          </div>
          <p className="text-sm text-slate-600">
            Because you render the sections in order, your component lands exactly where the external
            section sits between the surrounding internal sections.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="example" title="End-to-end example">
          <p>
            A page where the marketing copy is authored in Page Pilot (internal), while a live,
            interactive block — say a pricing or plans widget — is rendered by your app's own
            component (external).
          </p>
          <div className="my-3">
            <p className="mb-2 text-sm font-medium text-ink">In Page Pilot — two sections:</p>
            <CodeSnippet
              language="text"
              code={`Section 1  "Intro"    → internal (designed on the canvas)
Section 2  "Plans"    → external (id: section-1782448678097)`}
            />
          </div>
          <div className="my-3">
            <p className="mb-2 text-sm font-medium text-ink">In your app — fetch, then render:</p>
            <CodeSnippet
              language="tsx"
              code={`// Your external section's identifier (copied from the editor).
const PLANS = 'section-1782448678097';

export default async function MyPage() {
  // Replace with your workspace API host and your page's slug.
  const res = await fetch(\`\${PAGEPILOT_API}/pagebyslug/YOUR_PAGE_SLUG\`);
  const pageInfo = await res.json();

  return (
    <div>
      {pageInfo.sections.map((section) => {
        if (section.sectionType === 'internal') {
          return (
            <div key={section.id} dangerouslySetInnerHTML={{ __html: section.content }} />
          );
        }
        if (section.sectionType === 'external' && section.identifier === PLANS) {
          // Your own component for this section.
          return <YourComponent key={section.id} pageInfo={pageInfo} />;
        }
        return null;
      })}
    </div>
  );
}`}
            />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p>
              <strong className="text-ink">Result:</strong> visitors see the intro copy authored in
              Page Pilot, followed by the live, always-current plans rendered by the app — one page,
              with the content team and the dev team each owning their part.
            </p>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="tips" title="Tips & gotchas">
          <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              The <strong>identifier</strong> is the contract between Page Pilot and your code. Copy
              it exactly from the editor — store it in a constant so the{' '}
              <Code>section.identifier ===</Code> check matches.
            </li>
            <li>
              Always <strong>return <Code>null</Code></strong> for sections you don't recognise, so an
              unmatched external section simply renders nothing.
            </li>
            <li>
              Render <strong>internal</strong> sections with{' '}
              <Code>dangerouslySetInnerHTML</Code> from <Code>section.content</Code>; render{' '}
              <strong>external</strong> ones as your own component.
            </li>
            <li>
              The editor canvas for an external section is <strong>intentionally locked</strong>.
              There's nothing to design there; all its content comes from your app.
            </li>
            <li>
              Need to change the title or switch a section back to internal? Use the{' '}
              <strong>edit</strong> (pencil) action in the sections dropdown.
            </li>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}
