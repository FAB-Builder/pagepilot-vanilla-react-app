import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { CSS_LEAK_BEFORE, CSS_LEAK_AFTER, OWN_CSS_OVERRIDE_CODE, OWN_CSS_FILE } from '../snippets';

function RenderContent() {
  return (
    <Section id="render-content" title="Rendering page content safely">
      <p>
        <strong>The issue:</strong> a page's body (<Code>editor</Code> /{' '}
        <Code>sections[].content</Code>) is raw HTML from the Page Pilot editor, and it ships with
        its own embedded <Code>&lt;style&gt;</Code> blocks. Render it with{' '}
        <Code>dangerouslySetInnerHTML</Code> straight into your page and those styles share the same
        document as your app's CSS — either side can win. In practice this shows up as your global
        reset or a sticky header breaking on pages with content, or your Tailwind classes silently
        overriding the content's intended styling.
      </p>
      <DemoBlock title="Before — same document, styles collide" code={CSS_LEAK_BEFORE} language="tsx" />
      <p>
        <strong>The fix:</strong> mount the content in a Shadow DOM instead of the light DOM. It's a
        real style boundary in both directions — nothing leaks either way.
      </p>
      <DemoBlock title="After — isolated in a shadow root" code={CSS_LEAK_AFTER} language="tsx" />
      <p>
        <strong>Trade-off:</strong> your own Tailwind classes / <Code>prose</Code> wrapper around the
        content also stop reaching in, since Shadow DOM blocks inherited styling from outside (CSS
        custom properties like <Code>var(--foo)</Code> are the one exception — those still pierce
        the boundary). If the content needs baseline typography, inject a small stylesheet as a{' '}
        <Code>&lt;style&gt;</Code> tag inside the shadow root before the HTML, e.g. by{' '}
        <Code>fetch()</Code>-ing a static CSS file once and caching the promise.
      </p>
      <p>
        Always sanitize with <Code>DOMPurify</Code> before assigning to <Code>innerHTML</Code> —
        Shadow DOM isolates styling, it is not an XSS sandbox.
      </p>
      <p>
        <strong>Overriding Page Pilot's own styling:</strong> isolation cuts both ways — your app's
        CSS can no longer reach in either, so you can't override the content's look from outside
        like normal. Instead, load your own stylesheet <em>into</em> the same shadow root, after the
        content, so it loads last and wins.
      </p>
      <DemoBlock
        title="Load your own stylesheet into the shadow root, after the content"
        code={OWN_CSS_OVERRIDE_CODE}
        language="tsx"
      />
      <DemoBlock
        title="public/pagePilotOverrides.css"
        description="Plain CSS, no build step. Only targets elements Page Pilot actually renders — h1-h6, p, table, a, code, img — since it's scoped inside this content's shadow root."
        code={OWN_CSS_FILE}
        language="css"
      />
    </Section>
  );
}

export default RenderContent;
