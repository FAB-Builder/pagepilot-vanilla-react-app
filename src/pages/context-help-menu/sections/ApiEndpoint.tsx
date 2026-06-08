import { Section, Code } from '../../../components/DocSection';
import DemoBlock from '../../../components/DemoBlock';
import { FETCH_MENU_CODE } from '../snippets';

function ApiEndpoint() {
  return (
    <Section id="api-endpoint" title="The API endpoint">
      <p>
        Send a <Code>GET</Code> request to:
      </p>
      <pre className="rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-700">
        GET /api/tenant/&#123;WORKSPACE_ID&#125;/menu-by-name/&#123;MENU_NAME&#125;
      </pre>
      <ul className="ml-4 list-disc space-y-1">
        <li>
          <Code>WORKSPACE_ID</Code> — your Page Pilot workspace id. Find it in{' '}
          <strong>Page Pilot → Settings → General</strong>.
        </li>
        <li>
          <Code>MENU_NAME</Code> — the <strong>name</strong> you gave the menu when you created it
          in{' '}
          <a
            href="https://pagepilot.fabbuilder.com/menu"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
          >
            Page Pilot → Menus
          </a>
          . For example, if your menu is named <Code>my-help-menu</Code>, the URL ends with{' '}
          <Code>/menu-by-name/my-help-menu</Code>.
        </li>
      </ul>
      <p>
        No request body is needed. The response is a menu object whose <Code>configuration</Code>{' '}
        field contains the root array of <Code>HelpItem</Code> nodes.
      </p>
      <DemoBlock
        title="Fetch a menu by name"
        description="Replace YOUR_MENU_NAME with the name of your menu in Page Pilot."
        code={FETCH_MENU_CODE}
        language="js"
      />
    </Section>
  );
}

export default ApiEndpoint;
