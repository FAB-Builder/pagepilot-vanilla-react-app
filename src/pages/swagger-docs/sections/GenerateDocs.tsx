import { Section, Code } from '../../../components/DocSection';

export default function GenerateDocs() {
  return (
    <Section id="generate" title="Generate the docs">
      <p>
        The agent writes a <strong>throwaway generator script</strong> (Python or Node, kept
        in a scratch directory — not part of the deliverable) because a 20-operation spec is
        23 page upserts plus a menu write, each ~20–30 s against a live tenant. It must be
        resumable. Execution order:
      </p>
      <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <li>
          <strong className="text-ink">1. Ask</strong> for the three inputs and wait.
        </li>
        <li>
          <strong className="text-ink">2. <Code>npm install</Code></strong> in the repo (or a
          copy of it).
        </li>
        <li>
          <strong className="text-ink">3. Preview run</strong> — render page HTML to a local
          folder and print the plan (operation list, derived hosts / groups / slugs, menu
          tree, which operations get executors) <em>without</em> writing anything remote.
          Confirm before step 4.
        </li>
        <li>
          <strong className="text-ink">4. Run for real</strong> — creates every page
          (operation pages <em>and</em> one overview page per tag) <em>and</em> both menus, in
          one pass. Pages first, menus second. Saves a manifest after every page.
        </li>
        <li>
          <strong className="text-ink">5. Set <Code>lib/constants.ts</Code></strong> — tenant
          id, <Code>API_BASE_URL</Code>, site name / description, company, external links.
        </li>
        <li>
          <strong className="text-ink">6. Write the executors</strong> (see below) and wire
          each into the <Code>EXECUTORS</Code> map.
        </li>
        <li>
          <strong className="text-ink">7. Check routes match your groups</strong> — default{' '}
          <Code>guide</Code> needs no change; a new group follows the four-names rule.
        </li>
        <li>
          <strong className="text-ink">8. Verify</strong> with <Code>npm run dev</Code> then{' '}
          <Code>npm run build</Code>.
        </li>
      </ol>
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        <p>
          <strong className="text-ink">Pages and the menu are ONE job.</strong> A run that
          produces pages and no menu has produced a site with an empty sidebar. Never stop
          after the pages and wait to be asked for the menu.
        </p>
      </div>
    </Section>
  );
}
