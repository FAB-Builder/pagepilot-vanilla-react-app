import DocLayout, { type DocSection } from '../../components/DocLayout';
import { Section, Code } from '../../components/DocSection';
import { PAGEPILOT_MENUS_URL } from '../../lib/ahd';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'create-menu', label: 'Create a menu' },
  { id: 'drag-and-drop', label: 'Drag and drop' },
  { id: 'item-colours', label: 'Green vs grey items' },
  { id: 'validate-slugs', label: 'Validate slugs' },
  { id: 'slug-changes', label: 'When a page slug changes' },
  { id: 'consume', label: 'Consume a menu' },
  { id: 'api', label: 'API reference' },
];

const AdminLink = ({ children }: { children: React.ReactNode }) => (
  <a
    href={PAGEPILOT_MENUS_URL}
    target="_blank"
    rel="noreferrer"
    className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
  >
    {children}
  </a>
);

export default function Menus() {
  return (
    <DocLayout title="Menus" sections={SECTIONS}>
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Menus
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Build navigation trees in <AdminLink>Page Pilot → Menus</AdminLink> with a
            drag-and-drop builder, link each item to a page by slug, then fetch the whole tree as
            JSON — no deploy needed when the navigation changes.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A menu is a named, nested tree of items. Each item carries a <Code>name</Code> (the
            label) and an optional <Code>href</Code> — the slug of a Page Pilot page that opens
            when the item is clicked. Items without an <Code>href</Code> act as category headings.
          </p>
          <p className="mt-3">
            Menus are authored in the admin UI and read by your app over a single unauthenticated
            endpoint, so you can restructure navigation without shipping code.
          </p>
          <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Create the menu</strong> — give it a name, add items,
              drag them into the shape you want.
            </li>
            <li>
              <strong className="text-ink">2. Link items to pages</strong> — set each item's href
              to a published page slug. The builder colours the item so you can see at a glance
              whether the link resolves.
            </li>
            <li>
              <strong className="text-ink">3. Fetch it in your app</strong> — call{' '}
              <Code>/menu-by-name/&#123;MENU_NAME&#125;</Code> and render{' '}
              <Code>response.configuration</Code>.
            </li>
          </ol>
        </Section>

        <Section id="create-menu" title="Create a menu">
          <p>
            Open <AdminLink>Page Pilot → Menus</AdminLink> and create a new menu. A menu needs:
          </p>
          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Name</strong> — the identifier you pass to the API. Keep
              it stable; renaming it breaks any app fetching by the old name.
            </li>
            <li>
              <strong className="text-ink">Items</strong> — each with a label and an optional href.
            </li>
          </ul>
          <p className="mt-3">
            Item hrefs must match a page slug <strong>exactly</strong>, including any group prefix.
            If a page lives in the <Code>guide</Code> group and its slug is{' '}
            <Code>guide/getting-started</Code>, the menu href must be{' '}
            <Code>guide/getting-started</Code> — not <Code>getting-started</Code>. Leading slashes
            are not accepted.
          </p>
        </Section>

        <Section id="drag-and-drop" title="Drag and drop">
          <p>
            The builder is a drag-and-drop tree. Every drop rewrites the whole structure, so what
            you see is exactly what gets saved.
          </p>
          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Drag vertically</strong> — reorder items within the same
              level.
            </li>
            <li>
              <strong className="text-ink">Drag horizontally</strong> — indent an item under the one
              above it to nest it. The parent gains a <Code>children</Code> array.
            </li>
          </ul>
          <p className="mt-3">
            There is no depth limit — you can nest as deep as your navigation needs. Each node keeps
            the same shape at every level: <Code>&#123; id, name, href, children &#125;</Code>.
          </p>
        </Section>

        <Section id="item-colours" title="Green vs grey items">
          <p>
            The colour of an item in the builder is a <strong>link-integrity indicator</strong> — it
            says nothing about whether the item is published, enabled, or visible.
          </p>
          <div className="my-4 space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-emerald-500" />
              <div className="text-sm text-slate-600">
                <strong className="text-ink">Green</strong> — the item's <Code>href</Code> matches
                an existing page slug. The link resolves.
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-slate-400" />
              <div className="text-sm text-slate-600">
                <strong className="text-ink">Grey</strong> — no page has that slug. Usually a typo,
                a page that was deleted or renamed, a category-only item with no href, or an
                external URL.
              </div>
            </div>
          </div>
          <p>
            The check is an exact string match of the item's href against the list of known page
            slugs, which the admin refreshes whenever a page is created, updated, or deleted. A
            grey item still saves and still ships — it will simply 404 when a user clicks it, so
            treat grey as something to fix before publishing.
          </p>
        </Section>

        <Section id="validate-slugs" title="Validate slugs">
          <p>
            Rather than eyeballing colours one item at a time, use{' '}
            <strong>Validate Slugs</strong> in the menu form to bulk-check a list. Paste one slug
            per line and the dialog splits the results into two buckets, filterable by tab
            (All / Found / Not Found):
          </p>
          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Found</strong> — the slug resolves to a real page.
            </li>
            <li>
              <strong className="text-ink">Not Found</strong> — no page has that slug.
            </li>
          </ul>
          <p className="mt-3">
            Slugs must be entered without a leading slash — <Code>guide/foo</Code>, not{' '}
            <Code>/guide/foo</Code>. The dialog rejects leading slashes with an inline error.
          </p>
          <p>
            This is the fastest way to audit a menu after a bulk page migration, or to verify a
            batch of slugs before wiring them into items.
          </p>
        </Section>

        <Section id="slug-changes" title="When a page slug changes">
          <p>
            Because menu items reference pages by slug, renaming a page slug would silently turn
            every referencing item grey. The admin guards against this: when you change a page's
            slug, it first searches all menus for items pointing at the old slug.
          </p>
          <p className="mt-3">
            If any are found, a conflicts dialog lists them and offers to rewrite those items to
            the new slug as part of the save. Accept it unless you have a reason to leave the old
            links in place.
          </p>
        </Section>

        <Section id="consume" title="Consume a menu">
          <p>
            Fetch the menu by name and render <Code>response.configuration</Code> — the root array
            of items. Recurse into <Code>children</Code> for sub-levels.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-700">
{`const PAGEPILOT_API = 'https://pagepilot.fabbuilder.com/api';

async function fetchMenu(workspaceId, menuName) {
  const res = await fetch(
    \`\${PAGEPILOT_API}/tenant/\${workspaceId}/menu-by-name/\${menuName}\`
  );
  if (!res.ok) throw new Error(\`Menu fetch failed: \${res.status}\`);
  const data = await res.json();
  return data.configuration; // root array of menu items
}`}
          </pre>
          <p className="mt-3">
            When a user clicks an item, fetch its linked page with{' '}
            <Code>/pagebypath/&#123;href&#125;</Code> and render the returned sections.
          </p>
        </Section>

        <Section id="api" title="API reference">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="pb-2 pr-6">Field</th>
                  <th className="pb-2 pr-6">Type</th>
                  <th className="pb-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {[
                  ['id', 'string', 'Unique identifier for the menu item.'],
                  ['name', 'string', 'Label shown in your navigation.'],
                  ['href', 'string', 'Slug of the Page Pilot page opened when the item is clicked. Empty for category-only items.'],
                  ['children', 'MenuItem[]', 'Nested sub-items. Empty array for leaf nodes.'],
                ].map(([field, type, desc]) => (
                  <tr key={field}>
                    <td className="py-2 pr-6 font-mono">
                      <Code>{field}</Code>
                    </td>
                    <td className="py-2 pr-6 font-mono text-xs text-slate-500">{type}</td>
                    <td className="py-2">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 mt-6 font-semibold text-slate-800">Endpoint</h3>
          <pre className="overflow-x-auto rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-700">
            GET /api/tenant/&#123;WORKSPACE_ID&#125;/menu-by-name/&#123;MENU_NAME&#125;
          </pre>
          <p className="mt-2">
            <Code>MENU_NAME</Code> is the name you gave the menu in{' '}
            <AdminLink>Page Pilot → Menus</AdminLink>. No authentication is required. Responses are
            safe to cache at the session level.
          </p>
        </Section>
      </article>
    </DocLayout>
  );
}
