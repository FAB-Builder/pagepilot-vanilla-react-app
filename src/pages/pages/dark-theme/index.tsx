import type { ReactNode } from 'react';
import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import { PAGES_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'detection', label: 'How the theme is detected' },
  { id: 'inline', label: 'Rendering inline (innerHTML)' },
  { id: 'iframe', label: 'Rendering in an iframe' },
  { id: 'override', label: 'Force or lock a theme' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
  { id: 'checklist', label: 'Debug checklist' },
];

const Anchor = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
    {children}
  </a>
);

export default function DarkTheme() {
  return (
    <DocLayout
      title="Dark Theme"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Dark Theme
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Page Pilot pages follow your app's light / dark theme automatically. This guide
            explains how the theme is detected and what to check when a page stays light
            inside a dark app (or the other way round).
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A Page Pilot page ships its own light and dark colours. Every page root carries a{' '}
            <Code>data-ahd-theme</Code> attribute that starts as <Code>auto</Code>. A small
            script bundled with the page reads your <strong>host app's</strong> theme and
            rewrites that attribute to a literal <Code>dark</Code> or <Code>light</Code>. It
            keeps watching, so toggling your app's theme updates the page live — no reload.
          </p>
          <p className="mt-2">
            You don't configure anything for the common cases. You only need this guide when
            your app signals its theme in a way the page can't see.
          </p>
        </Section>

        <Section id="detection" title="How the theme is detected">
          <p>
            The page checks <Code>&lt;html&gt;</Code> and <Code>&lt;body&gt;</Code> in this
            order. The first match wins:
          </p>
          <div className="scroll-slim mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-slate-50 text-left text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Signal</th>
                  <th className="px-4 py-3 font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">Opt-out marker</td>
                  <td className="px-4 py-3"><Code>data-ahd-theme-lock</Code> on html/body — page does nothing, you own it</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3">Explicit <Code>color-scheme</Code></td>
                  <td className="px-4 py-3"><Code>style="color-scheme:dark"</Code> or CSS <Code>color-scheme: dark</Code></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">Theme attribute</td>
                  <td className="px-4 py-3">
                    <Code>data-theme</Code>, <Code>data-bs-theme</Code>, <Code>data-color-mode</Code>,{' '}
                    <Code>data-color-scheme</Code>, <Code>data-mui-color-scheme</Code>,{' '}
                    <Code>data-mantine-color-scheme</Code>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">3</td>
                  <td className="px-4 py-3">Class name</td>
                  <td className="px-4 py-3">
                    <Code>dark</Code>, <Code>dark-mode</Code>, <Code>dark-theme</Code>,{' '}
                    <Code>theme-dark</Code>, <Code>night</Code> (and the <Code>light</Code> equivalents)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3">Background luminance</td>
                  <td className="px-4 py-3">Dark computed background on body / html → dark</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">5</td>
                  <td className="px-4 py-3">OS preference</td>
                  <td className="px-4 py-3"><Code>prefers-color-scheme</Code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            An explicit <strong>light</strong> marker also wins: <Code>data-theme="light"</Code>{' '}
            pins the page light even if the visitor's OS is dark.
          </p>
        </Section>

        <Section id="inline" title="Rendering inline (innerHTML / React)">
          <p>
            When you inject the page HTML straight into your app, it shares your document, so
            it sees your <Code>&lt;html&gt;</Code> directly. Make sure your app marks it with
            any signal from the table above — the most common is the Tailwind class:
          </p>
          <div className="my-3">
            <CodeSnippet
              language="ts"
              code={`// when your app toggles theme
document.documentElement.classList.toggle('dark', theme === 'dark');
// or: document.documentElement.setAttribute('data-theme', theme);`}
            />
          </div>
          <p className="text-sm text-slate-600">
            The page's script runs from an <Code>onerror</Code> handler on a hidden image, so it
            works even though <Code>&lt;script&gt;</Code> tags injected via{' '}
            <Code>innerHTML</Code> never execute.
          </p>
        </Section>

        <Section id="iframe" title="Rendering in an iframe">
          <p>
            An iframe is a <strong>separate document</strong>. Your app's{' '}
            <Code>.dark</Code> class lives on the top-level <Code>&lt;html&gt;</Code> and never
            reaches the iframe, so the page stays light. Put the marker on the iframe's own root
            and keep it in sync:
          </p>
          <div className="my-3">
            <CodeSnippet
              language="ts"
              code={`// 1. Build srcDoc with the CURRENT theme on the iframe's <html>
const srcDoc = \`<!doctype html>
<html class="\${theme}" data-theme="\${theme}" data-pp-theme="\${theme}"
      style="color-scheme:\${theme}">
  <head>…</head>
  <body>\${html}
    <script>
      window.addEventListener('message', function (e) {
        if (!e.data || e.data.type !== 'page-frame-theme') return;
        var t = e.data.theme === 'dark' ? 'dark' : 'light';
        var r = document.documentElement;
        r.className = t;
        r.setAttribute('data-theme', t);
        r.setAttribute('data-pp-theme', t);
        r.style.colorScheme = t;
      });
    </script>
  </body>
</html>\`;`}
            />
          </div>
          <div className="my-3">
            <CodeSnippet
              language="ts"
              code={`// 2. Push theme changes to the live iframe (do NOT rebuild srcDoc —
//    that reloads the frame and flickers)
const sendTheme = () =>
  frameRef.current?.contentWindow?.postMessage(
    { type: 'page-frame-theme', theme },
    '*'
  );

useEffect(sendTheme, [theme, srcDoc]);

// 3. Also send once after load so the first paint is correct
<iframe ref={frameRef} srcDoc={srcDoc} onLoad={sendTheme} sandbox="allow-scripts" />`}
            />
          </div>
          <p className="text-sm text-slate-600">
            Keep <Code>sandbox</Code> without <Code>allow-same-origin</Code> and use{' '}
            <Code>postMessage</Code> — that's why the theme is pushed by message rather than by
            reaching into <Code>contentDocument</Code>. If you sanitise the HTML (e.g.
            DOMPurify), make sure the page's <Code>&lt;style&gt;</Code> tag survives.
          </p>
        </Section>

        <Section id="override" title="Force or lock a theme">
          <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              <strong>Force a theme</strong> — set <Code>data-pp-theme="dark"</Code> or{' '}
              <Code>"light"</Code> on any ancestor of the page. The nearest marked element wins.
            </li>
            <li>
              <strong>Drive it yourself</strong> — add <Code>data-ahd-theme-lock</Code> to{' '}
              <Code>&lt;html&gt;</Code> or <Code>&lt;body&gt;</Code>. The page stops auto-detecting;
              set <Code>data-ahd-theme="dark|light"</Code> on the page root yourself.
            </li>
            <li>
              <strong>Always-light region</strong> — mark an element{' '}
              <Code>data-pp-surface="fixed"</Code> to keep its subtree light inside a dark page.
            </li>
          </ul>
        </Section>

        <Section id="troubleshoot" title="Troubleshooting">
          <ul className="my-2 list-disc space-y-3 pl-6 text-sm text-slate-600">
            <li>
              <strong>Page is light in a dark app (iframe)</strong> — the iframe's{' '}
              <Code>&lt;html&gt;</Code> has no theme marker. See{' '}
              <Anchor href="#iframe">Rendering in an iframe</Anchor>. In DevTools, select the
              iframe context and inspect <Code>document.documentElement</Code>.
            </li>
            <li>
              <strong>Page is light in a dark app (inline)</strong> — your app dark-themes with a
              marker we don't read (e.g. a custom <Code>data-skin</Code> attribute). Also set{' '}
              <Code>data-theme</Code> or <Code>.dark</Code> on <Code>&lt;html&gt;</Code>.
            </li>
            <li>
              <strong>Page is dark while the app is light</strong> — the visitor's OS is dark and
              your app sets no marker (step 5 fallback). Set <Code>data-theme="light"</Code> /{' '}
              <Code>.light</Code> on <Code>&lt;html&gt;</Code> to pin it.
            </li>
            <li>
              <strong>Theme doesn't update when toggled</strong> — the page only watches{' '}
              <Code>class</Code>, <Code>style</Code> and the theme attributes on{' '}
              <Code>&lt;html&gt;</Code> / <Code>&lt;body&gt;</Code>. A toggle on a wrapper{' '}
              <Code>&lt;div&gt;</Code> is not seen — use <Code>data-pp-theme</Code> on an ancestor
              of the page, or move the marker to <Code>&lt;html&gt;</Code>.
            </li>
            <li>
              <strong>Iframe flickers on toggle</strong> — <Code>srcDoc</Code> is being rebuilt
              when the theme changes. Keep the build effect dependent on the HTML only and send
              the theme via <Code>postMessage</Code>.
            </li>
            <li>
              <strong>Iframe is light on first load, correct after a toggle</strong> — the message
              was sent before the frame loaded. Post it again in the iframe's{' '}
              <Code>onLoad</Code> and bake the current theme into <Code>srcDoc</Code>.
            </li>
            <li>
              <strong>Page background is dark but the scrollbar / canvas is white</strong> —{' '}
              <Code>color-scheme</Code> isn't set on the root. The page sets it for you unless your
              app already defines its own <Code>color-scheme</Code>; make sure yours matches.
            </li>
            <li>
              <strong>Page theme is frozen at the wrong value</strong> — check for{' '}
              <Code>data-ahd-theme-lock</Code> on <Code>&lt;html&gt;</Code> / <Code>&lt;body&gt;</Code>;
              it disables auto-detection.
            </li>
            <li>
              <strong>Page looks unstyled in the iframe</strong> — your sanitiser stripped the
              page's <Code>&lt;style&gt;</Code> tag, which holds the theme CSS. Allow{' '}
              <Code>style</Code> in the sanitiser's allowed tags.
            </li>
          </ul>
        </Section>

        <Section id="checklist" title="Debug checklist">
          <p>Run these in the browser console (switch to the iframe context if the page is in one):</p>
          <div className="my-3">
            <CodeSnippet
              language="js"
              code={`// What does the page see on its host?
const r = document.documentElement;
console.log({
  class: r.className,
  dataTheme: r.getAttribute('data-theme'),
  ppTheme: r.getAttribute('data-pp-theme'),
  colorScheme: getComputedStyle(r).colorScheme,
  locked: r.hasAttribute('data-ahd-theme-lock'),
});

// What did the page resolve to?  (expect "dark" or "light", not "auto")
document.querySelectorAll('[data-ahd-tpl-root]')
  .forEach(el => console.log(el.getAttribute('data-ahd-theme')));`}
            />
          </div>
          <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              <Code>data-ahd-theme</Code> stuck on <Code>auto</Code> → the theme script didn't
              run or found no signal; the page then follows the OS.
            </li>
            <li>
              <Code>data-ahd-theme</Code> is correct but colours are wrong → a CSS rule in your
              app is overriding the page; inspect the element's computed styles.
            </li>
            <li>
              No <Code>[data-ahd-tpl-root]</Code> found → the page HTML wasn't injected (or was
              sanitised away).
            </li>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}
