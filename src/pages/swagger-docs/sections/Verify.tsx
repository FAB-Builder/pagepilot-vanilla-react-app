import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';

export default function Verify() {
  return (
    <Section id="verify" title="Verify end to end">
      <p>
        Run <Code>npm run dev</Code> and confirm the sidebar renders from the API, clicking a
        menu item loads its page with no 404 (the href/slug join is right), a group header
        opens its overview page, search finds operations, and one executor completes a real
        round-trip. Then run <Code>npm run build</Code> — a build that emits no documentation
        routes means the pages were never grouped or never published.
      </p>
      <div className="my-3">
        <CodeSnippet
          language="bash"
          code={`# spot-check the menu ↔ page join from the API
curl -H "Authorization: Bearer $PP_TOKEN" \\
  "$API_HOST/api/tenant/$TENANT/menu-by-name/guide-left-menu"

curl -X POST -H "Authorization: Bearer $PP_TOKEN" -H "Content-Type: application/json" \\
  -d '{"search":{"href":"guide/<tag>/<operation>"}}' \\
  "$API_HOST/api/tenant/$TENANT/search-menu-tree"

# confirm every page is grouped and published
curl -s -H "Authorization: Bearer $PP_TOKEN" \\
  "$API_HOST/api/tenant/$TENANT/page?limit=1000&offset=0" \\
  | jq '[.rows[] | {slug, groups, status, isActive}] | group_by(.status)'`}
        />
      </div>
    </Section>
  );
}
