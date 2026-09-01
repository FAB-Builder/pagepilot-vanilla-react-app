import type { DocSection } from '../../components/DocLayout';

export const REPO_URL = 'https://github.com/FAB-Builder/swagger-documentation-template';
export const PAGEPILOT_URL = 'https://pagepilot.fabbuilder.com/';

/** Anchors that drive both the left nav and scroll-spy highlighting. */
export const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'build-with-an-llm', label: 'Build it with an LLM' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'clone', label: 'Clone & run the template' },
  { id: 'credentials', label: 'Credentials you must supply' },
  { id: 'token-safety', label: 'Handling the service token safely' },
  { id: 'derived', label: 'What the agent derives for you' },
  { id: 'generate', label: 'Generate the docs' },
  { id: 'structure', label: 'Menus & pages structure' },
  { id: 'executors', label: 'Executors — the "live API" part' },
  { id: 'constants', label: 'Wire lib/constants.ts' },
  { id: 'verify', label: 'Verify end to end' },
  { id: 'gotchas', label: 'Gotchas' },
];

/**
 * Ready-made prompt to hand to Claude Code / Cursor / Copilot after cloning
 * the template repo. It defers all the detail to the repo's own README.md,
 * which is written as an operating manual for a coding agent.
 */
export const AI_PROMPT = `You are wiring the "swagger-documentation-template" repo (already cloned into this workspace) to a Swagger/OpenAPI spec. The UI is already built — do NOT redesign, re-scaffold, or modernize it.

1. Read README.md in full and follow it exactly. Everything from PHASE 0 down is written as instructions for you: what to ask, how to read the spec, how to turn it into PagePilot menus and pages, and how to write the executors.

2. Ask me for exactly three things and wait for my answers:
   - Swagger / OpenAPI URL
   - PagePilot tenant id (24-char hex)
   - PagePilot service token (I will pass it via the environment, e.g. PP_TOKEN=... — never write it into a file or a commit)

3. Derive everything else (API host, API_BASE_URL from the spec's servers[0].url / host+basePath, groups, menu names, slugs, which endpoints get executors) and show me one summary block to approve before writing anything remote.

4. Write a throwaway generator script (Python or Node, in a scratch dir). Run it in preview mode first — render pages to a local folder and print the plan (operation list, hosts, groups, slugs, menu tree, executor list). Get my confirmation.

5. Run it for real: create every page (one per operation PLUS one overview page per tag) AND both menus (<group>-left-menu and documentation-top-menu) in one pass — pages first, menus second. Every page needs groups, status: "live" and isActive: true at create time. upsert-page-item matches on id, not slug — read existing pages first. Menu href must equal page slug byte-for-byte, no leading slash. Save a manifest after every page so the run is resumable.

6. Set lib/constants.ts (APPLICATION_ID = tenant id, API_BASE_URL from the spec, SITE_NAME, SITE_DESCRIPTION, COMPANY_NAME, external links). The token never goes here.

7. Hand-write one executor component per live endpoint, building on components/executor/ExecutorShell.tsx. Wire each into the EXECUTORS map in components/SectionContent.tsx, keyed by that section's identifier read back from the upsert response.

8. Verify with npm run dev (sidebar renders, menu items load with no 404, group headers open overview pages, search works, one executor completes a real round-trip), then npm run build (catches missing groups / publish state / missing documentation-top-menu).

Only touch the files listed in the README's Phase 4.1. Confirm before every remote write. Never commit the service token.`;
