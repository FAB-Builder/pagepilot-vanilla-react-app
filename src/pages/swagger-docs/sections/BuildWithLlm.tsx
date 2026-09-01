import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import AiPromptBlock from '../../../components/AiPromptBlock';
import { AI_PROMPT } from '../constants';

/** "Build it with an LLM" — the headline workflow: clone, hand the README to an agent. */
export default function BuildWithLlm() {
  return (
    <Section id="build-with-an-llm" title="Build it with an LLM">
      <AiPromptBlock id="swagger-docs-ai-prompt" prompt={AI_PROMPT} />
      <p>
        The repo's <Code>README.md</Code> is written as <strong>instructions for a coding
        agent</strong>, not just human docs. Everything from its PHASE 0 down tells the agent
        what to ask, how to read a Swagger spec, how to turn it into PagePilot menus and
        pages, and how to write the executors. So the fastest path to a docs site is:
      </p>
      <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <li>
          <strong className="text-ink">1. Clone the repo</strong> and open it in your agent
          of choice (Claude Code in the terminal, Cursor, Windsurf, Copilot agent mode — any
          tool that can read files and run commands).
        </li>
        <li>
          <strong className="text-ink">2. Point the agent at <Code>README.md</Code></strong> —
          e.g. <em>"Read README.md and follow it to wire this template to my Swagger spec."</em>{' '}
          The agent picks up the full operating manual from there.
        </li>
        <li>
          <strong className="text-ink">3. Give it the three inputs</strong> when it asks —
          your Swagger/OpenAPI URL, your PagePilot tenant id, your PagePilot service token
          (see <a href="#credentials" className="text-brand underline underline-offset-2">Credentials</a>{' '}
          below). It derives everything else and shows you a summary to approve.
        </li>
        <li>
          <strong className="text-ink">4. Approve the preview</strong> — the agent renders the
          pages and menu tree locally and prints the plan <em>before</em> writing anything to
          your live tenant. Confirm, and it runs the full generation.
        </li>
        <li>
          <strong className="text-ink">5. Let it write the executors</strong> and wire{' '}
          <Code>lib/constants.ts</Code>, then run <Code>npm run dev</Code> / <Code>npm run
          build</Code> to verify.
        </li>
      </ol>
      <div className="my-3">
        <CodeSnippet
          language="text"
          code={`You: Read README.md and follow it to build docs for this spec.
Agent: I need three things:
       1. Swagger / OpenAPI URL
       2. PagePilot tenant id
       3. PagePilot service token
You: https://petstore.swagger.io/v2/swagger.json
     tenant: <your 24-char hex id>
     token:  (paste via env — PP_TOKEN=... — never in a file)
Agent: Here's the derived plan — 3 tags, 20 operations, 23 pages,
       2 menus, executors for every POST/PUT/PATCH. Approve? [y/N]
You: y
Agent: (generates pages + menus, writes executors, updates constants)`}
        />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        <p>
          <strong className="text-ink">Why this works:</strong> the UI is already built and
          tested — the agent only fills in content and the handful of Phase 4.1 files. It is
          not scaffolding a project from scratch, so the failure surface is small and the
          README calls out every silent trap (see <a href="#gotchas" className="text-brand underline underline-offset-2">Gotchas</a>).
        </p>
      </div>
    </Section>
  );
}
