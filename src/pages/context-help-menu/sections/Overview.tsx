import { Section, Code } from '../../../components/DocSection';

function Overview() {
  return (
    <Section id="overview" title="Overview">
      <p>
        The <strong>Context Help Menu</strong> is a right-anchored drawer that gives your users
        instant access to help content without leaving the page. It is driven entirely by a menu
        you create in Page Pilot — no code changes are needed when you add, reorder, or rename topics.
      </p>
      <p>
        You create a menu in{' '}
        <a
          href="https://pagepilot.fabbuilder.com/menu"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
        >
          Page Pilot → Menus
        </a>{' '}
        and give it any name you like — for example <Code>my-help-menu</Code>. You then fetch it
        by that name using the endpoint:
      </p>
      <pre className="rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-700">
        GET /api/tenant/&#123;WORKSPACE_ID&#125;/menu-by-name/&#123;MENU_NAME&#125;
      </pre>
      <p>
        Each menu item can link to a Page Pilot <strong>page</strong> (via its slug). When a user
        clicks the item the drawer fetches and renders that page's content inline.
      </p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Hierarchical — items can nest up to any depth.</li>
        <li>Searchable — built-in search across item names and descriptions.</li>
        <li>Route-aware — opens directly to the topic matching the current URL path.</li>
        <li>Zero-config content updates — edit the page in Page Pilot, the drawer reflects it instantly.</li>
      </ul>
    </Section>
  );
}

export default Overview;
