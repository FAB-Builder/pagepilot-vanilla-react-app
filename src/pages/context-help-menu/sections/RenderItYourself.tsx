import { Section, Code } from '../../../components/DocSection';
import DemoBlock from '../../../components/DemoBlock';
import { FULL_DRAWER_CODE } from '../snippets';

function RenderItYourself() {
  return (
    <Section id="render-yourself" title="Render it yourself">
      <p>
        If you are not using the AHDjs SDK you can fetch the menu and render a drawer entirely in
        your own code. The example below is framework-agnostic React — adapt the styling to match
        your design system.
      </p>
      <DemoBlock
        title="Minimal help drawer (no SDK)"
        description="Replace YOUR_WORKSPACE_ID and YOUR_MENU_NAME with your actual values."
        code={FULL_DRAWER_CODE}
        language="tsx"
      />
      <p>
        For production use you will want to add:
      </p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Session-level caching so the menu is not re-fetched on every open.</li>
        <li>
          A second fetch when an item is clicked — <Code>GET /pagebypath/&#123;href&#125;</Code> —
          to load the article content.
        </li>
        <li>Fuzzy search across <Code>item.name</Code> and <Code>item.description</Code>.</li>
      </ul>
      <p>
        Or use the built-in drawer provided by AHDjs (see <strong>Live demo</strong> below) which
        handles all of this for you.
      </p>
    </Section>
  );
}

export default RenderItYourself;
