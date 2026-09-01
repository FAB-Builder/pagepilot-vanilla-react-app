import DocLayout from '../../components/DocLayout';
import { Code } from '../../components/DocSection';
import { GithubIcon } from '../../components/Icons';
import { REPO_URL, SECTIONS } from './constants';
import {
  Overview,
  BuildWithLlm,
  HowItWorks,
  CloneAndRun,
  Credentials,
  TokenSafety,
  Derived,
  GenerateDocs,
  Structure,
  Executors,
  Constants,
  Verify,
  Gotchas,
} from './sections';

/**
 * "Create a documentation site using PagePilot" — a standalone guide for the
 * `swagger-documentation-template` repo: clone it, hand its README to an LLM
 * agent with three inputs, and it generates a live, hand-testable API docs
 * site backed by PagePilot as the CMS.
 *
 * Each section is its own component under `./sections`; this file only wires
 * the shell and the render order. Section order here should match `SECTIONS`
 * in `./constants` (which drives the left-nav order and scroll-spy).
 */
export default function SwaggerDocs() {
  return (
    <DocLayout title="Create a Docs Site" sections={SECTIONS}>
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Create a documentation site using PagePilot
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              <Code>swagger-documentation-template</Code>
            </a>{' '}
            is a ready-built Next.js documentation site that turns any Swagger / OpenAPI spec
            into a browsable API reference — with <strong>live executors</strong> that fire the
            real API from inside the docs. Content is not MDX on disk: menus, pages and sections
            are stored in <strong>PagePilot</strong> and fetched at runtime.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            The headline feature: <strong>you don't build the site by hand.</strong> You clone the
            repo, hand its <Code>README.md</Code> to an LLM coding agent (Claude Code, Cursor,
            etc.) with three inputs, and the agent generates the whole thing — menus, pages,
            executors — against your PagePilot workspace.
          </p>
          <div className="mt-5">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
            >
              <GithubIcon className="h-4 w-4" />
              Template repo
            </a>
          </div>
        </header>

        <BuildWithLlm />
        <Overview />
        <HowItWorks />
        <CloneAndRun />
        <Credentials />
        <TokenSafety />
        <Derived />
        <GenerateDocs />
        <Structure />
        <Executors />
        <Constants />
        <Verify />
        <Gotchas />
      </article>
    </DocLayout>
  );
}
