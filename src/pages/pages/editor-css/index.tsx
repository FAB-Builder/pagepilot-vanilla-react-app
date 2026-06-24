import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import { PAGES_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'when', label: 'When you need this' },
  { id: 'quill', label: 'Quill (Rich Text / HTML)' },
  { id: 'mdx', label: 'MDX (Markdown)' },
  { id: 'both', label: 'Add both at once' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
];

export default function EditorCss() {
  return (
    <DocLayout
      title="Editor Block CSS"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Editor Block CSS
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            If your Page Pilot page uses the <strong>Rich Text (Quill)</strong> or{' '}
            <strong>Markdown (MDX)</strong> block, those blocks render HTML that relies on
            the editor's own stylesheet. Add the matching CSS to your app so the content
            looks right — without it, formatting (alignment, lists, headings, code blocks,
            tables) won't display correctly.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Most Page Pilot blocks (text, headings, buttons, images, containers) are fully
            self-styled — they render with inline styles and need nothing extra. Two blocks
            are different because they're powered by third-party editors that ship their own
            CSS:
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">Block</th>
                  <th className="px-4 py-3 font-semibold">Powered by</th>
                  <th className="px-4 py-3 font-semibold">CSS you must add</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="px-4 py-3"><strong>Rich Text / HTML</strong></td>
                  <td className="px-4 py-3">Quill (snow theme)</td>
                  <td className="px-4 py-3"><Code>quill.snow.css</Code></td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><strong>Markdown</strong></td>
                  <td className="px-4 py-3">MDXEditor</td>
                  <td className="px-4 py-3"><Code>@mdxeditor/editor/style.css</Code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="when" title="When you need this">
          <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              You render a Page Pilot page in your own app and it contains a{' '}
              <strong>Rich Text / HTML</strong> block → add the <strong>Quill</strong> CSS.
            </li>
            <li>
              The page contains a <strong>Markdown</strong> block → add the{' '}
              <strong>MDX</strong> CSS.
            </li>
            <li>
              Not sure which blocks are used? It's safe to add <strong>both</strong> — see{' '}
              <a href="#both" className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">Add both at once</a>.
            </li>
          </ul>
          <p className="mt-2">
            If your page only uses standard blocks (text, heading, button, image, container,
            accordion, grid…), you don't need any of this.
          </p>
        </Section>

        <Section id="quill" title="Quill — Rich Text / HTML block">
          <p>
            The Rich Text block uses <strong>Quill (snow theme)</strong>. Its output uses
            classes like <Code>.ql-editor</Code>, <Code>.ql-align-center</Code>, and list /
            indent classes that need <Code>quill.snow.css</Code> to render.
          </p>

          <p className="mt-4 font-semibold text-ink">Option A — npm (bundlers: Vite, Webpack, Next.js)</p>
          <p>Install Quill and import its snow stylesheet once, near your app entry:</p>
          <div className="my-3">
            <CodeSnippet language="bash" code={`npm install quill`} />
          </div>
          <div className="my-3">
            <CodeSnippet
              language="ts"
              code={`// e.g. in src/main.tsx / App entry
import 'quill/dist/quill.snow.css';`}
            />
          </div>
          <p className="text-sm text-slate-600">
            Using <Code>react-quill</Code>? The same file is re-exported at{' '}
            <Code>react-quill/dist/quill.snow.css</Code>.
          </p>

          <p className="mt-5 font-semibold text-ink">Option B — CDN (plain HTML, no bundler)</p>
          <p>Drop the stylesheet link into your page <Code>&lt;head&gt;</Code>:</p>
          <div className="my-3">
            <CodeSnippet
              language="html"
              code={`<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/[email protected]/dist/quill.snow.css"
/>`}
            />
          </div>
          <p className="text-sm text-slate-600">
            Page Pilot's Rich Text block is built on <strong>Quill 1.3.x</strong>, so pin the
            CSS to a 1.x version (e.g. <Code>1.3.7</Code>) to match the markup exactly.
          </p>
        </Section>

        <Section id="mdx" title="MDX — Markdown block">
          <p>
            The Markdown block uses <strong>MDXEditor</strong>, which ships a single
            stylesheet covering its rendered prose (headings, lists, code blocks, tables,
            blockquotes).
          </p>

          <p className="mt-4 font-semibold text-ink">npm (bundlers)</p>
          <div className="my-3">
            <CodeSnippet language="bash" code={`npm install @mdxeditor/editor`} />
          </div>
          <div className="my-3">
            <CodeSnippet
              language="ts"
              code={`// e.g. in src/main.tsx / App entry
import '@mdxeditor/editor/style.css';`}
            />
          </div>

          <p className="mt-4 font-semibold text-ink">CDN (plain HTML)</p>
          <p>
            The published stylesheet is served from the package's <Code>dist</Code> on any npm
            CDN:
          </p>
          <div className="my-3">
            <CodeSnippet
              language="html"
              code={`<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@mdxeditor/[email protected]/dist/style.css"
/>`}
            />
          </div>
          <p className="text-sm text-slate-600">
            Page Pilot uses <strong>@mdxeditor/editor 3.x</strong>. Pin a matching 3.x version
            for consistent styling.
          </p>
        </Section>

        <Section id="both" title="Add both at once">
          <p>
            If your pages can contain either block (or you're not sure), include both
            stylesheets. They're scoped to their own class names and don't conflict.
          </p>
          <div className="my-3">
            <CodeSnippet
              language="ts"
              code={`// Bundler — import once at your app entry
import 'quill/dist/quill.snow.css';
import '@mdxeditor/editor/style.css';`}
            />
          </div>
          <div className="my-3">
            <CodeSnippet
              language="html"
              code={`<!-- Plain HTML — add both to <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/[email protected]/dist/quill.snow.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdxeditor/[email protected]/dist/style.css" />`}
            />
          </div>
        </Section>

        <Section id="troubleshoot" title="Troubleshooting">
          <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              <strong>Rich text looks unstyled / left-aligned only</strong> — the Quill CSS
              isn't loaded. Add <Code>quill.snow.css</Code> (alignment, lists, and indents
              come from it).
            </li>
            <li>
              <strong>Markdown headings/lists/code look like plain text</strong> — the MDX CSS
              isn't loaded. Add <Code>@mdxeditor/editor/style.css</Code>.
            </li>
            <li>
              <strong>Import works locally but breaks the build</strong> — make sure your
              bundler handles CSS imports (Vite/Next/Webpack do by default), or switch to the
              CDN <Code>&lt;link&gt;</Code> approach.
            </li>
            <li>
              <strong>Version mismatch</strong> — pin the CSS to the major version Page Pilot
              uses (Quill <strong>1.x</strong>, MDXEditor <strong>3.x</strong>); a mismatched
              major can shift class names.
            </li>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}
