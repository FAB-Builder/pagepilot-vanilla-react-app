import { Section, Code } from '../../../components/DocSection';
import DemoBlock from '../../../components/DemoBlock';
import { CONFIGURE_MENU_CODE } from '../snippets';

function ConfigureMenu() {
  return (
    <Section id="configure-menu" title="Configure the menu in Page Pilot">
      <p>
        Any menu you create in Page Pilot can be used as a help drawer — there is nothing special
        about the name. Go to{' '}
        <a
          href="https://pagepilot.fabbuilder.com/menu"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
        >
          Page Pilot → Menus
        </a>{' '}
        to create or edit one.
      </p>
      <ol className="ml-4 list-decimal space-y-2">
        <li>
          Click <strong>Create menu</strong> and give it any name — e.g.{' '}
          <Code>my-help-menu</Code>. Note the name; you will pass it to the API.
        </li>
        <li>
          Add top-level items. Each item has a <strong>Name</strong> (shown in the drawer) and an
          optional <strong>Href</strong> (the slug of a Page Pilot page that opens when clicked).
        </li>
        <li>
          Drag items inside other items to create nested sections — there is no depth limit.
        </li>
        <li>
          <strong>Save.</strong> Changes are reflected on the next fetch (cached for 1 hour per
          session by default).
        </li>
      </ol>
      <p>
        Once the menu is saved, fetch it by name:
      </p>
      <pre className="rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-700">
        GET /api/tenant/YOUR_WORKSPACE_ID/menu-by-name/my-help-menu
      </pre>
      <DemoBlock
        title="Example menu hierarchy"
        description="A two-level structure — root categories with child articles."
        code={CONFIGURE_MENU_CODE}
        language="js"
      />
      <p>
        Items without an <Code>href</Code> act as category headers only — no content is fetched
        when they are clicked.
      </p>
    </Section>
  );
}

export default ConfigureMenu;
