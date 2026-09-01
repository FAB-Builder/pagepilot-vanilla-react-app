import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';

export default function Structure() {
  return (
    <Section id="structure" title="Menus & pages structure">
      <p>
        A spec <strong>tag</strong> becomes a sidebar group with its own overview page
        (<Code>&lt;group&gt;/&lt;tag&gt;</Code>); each operation gets its own page
        (<Code>&lt;group&gt;/&lt;tag&gt;/&lt;operation&gt;</Code>). Page count is{' '}
        <strong>operations + tags</strong>, plus one <Code>getting-started</Code> per group.
      </p>
      <div className="my-3">
        <CodeSnippet
          language="jsonc"
          code={`// <group>-left-menu configuration — a tree of EachRoute nodes
[
  {
    "id": "aK3mZq",                  // 6 random alphanumerics — NOT a page id
    "name": "Leads",                 // the TAG — a module in the spec
    "href": "guide/leads",           // its OVERVIEW page
    "noLink": false,                 // clickable, because that page exists
    "children": [
      { "id": "Bn7pQr", "name": "Create Lead", "href": "guide/leads/create-lead", "children": [] },
      { "id": "Xy2LmT", "name": "Update Lead", "href": "guide/leads/update-lead", "children": [] }
    ]
  }
]`}
        />
      </div>
      <ul className="my-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
        <li>
          Every page needs <Code>groups: ["&lt;group&gt;"]</Code>,{' '}
          <Code>status: "live"</Code> and <Code>isActive: true</Code>{' '}
          <strong>at create time</strong>. None defaults correctly, and none of the failures
          show up from <Code>pagebypath</Code> in dev — only <Code>npm run build</Code> catches
          them.
        </li>
        <li>
          <Code>upsert-page-item</Code> matches on <Code>id</Code>, not slug. Regeneration
          must <Code>GET /page?limit=1000</Code> first, build a <Code>slug → id</Code> map, and
          pass the existing <Code>id</Code> — or you create duplicate slugs.
        </li>
        <li>
          Menu updates <strong>replace the whole <Code>configuration</Code> tree</strong>.
          Always merge onto the tree you just read; a PUT built from scratch deletes every
          entry you did not regenerate.
        </li>
        <li>
          Internal sections carry <strong>two</strong> representations — write both:{' '}
          <Code>content</Code> (baked HTML the site renders) and{' '}
          <Code>contentMetadata.document</Code> (the block tree PagePilot's editor opens).
          External sections carry only an anchor <Code>div</Code> and an{' '}
          <Code>identifier</Code>, and <strong>no</strong> <Code>contentMetadata</Code>.
        </li>
        <li>
          After creating menus, add each group to <Code>SEARCHABLE_MENUS</Code> in{' '}
          <Code>lib/documentation/routes.ts</Code>.
        </li>
      </ul>
    </Section>
  );
}
