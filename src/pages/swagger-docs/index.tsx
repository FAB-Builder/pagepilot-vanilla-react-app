import DocLayout from '../../components/DocLayout';
import { Code } from '../../components/DocSection';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../../components/Icons';
import { REPO_URL, LIVE_EXAMPLE_URL, SECTIONS } from './constants';
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
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink/90 dark:bg-white dark:text-ink dark:hover:bg-slate-200"
            >
              <GithubIcon className="h-4 w-4" />
              Template repo
            </a>
            <a
              href={LIVE_EXAMPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ExternalLink className="h-4 w-4" />
              See a live example
            </a>
          </div>
        </header>

        {/* ---------------------------------------------------------------- */}
        <div className="mb-8 overflow-hidden rounded-xl border border-brand/20 bg-brand-tint/50 dark:border-brand/25 dark:bg-brand/10">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">Built with this template</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <a
                  href={LIVE_EXAMPLE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark dark:hover:text-brand"
                >
                  cx-docs.fabbuilder.com
                </a>{' '}
                is a real API documentation site generated from a Swagger spec using this exact
                repo — same layout, same sidebar-from-PagePilot, same in-page executors. Open it
                to see the finished output before you start.
              </p>
            </div>
            <a
              href={LIVE_EXAMPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:self-center"
            >
              <ExternalLink className="h-4 w-4" />
              Visit the example
            </a>
          </div>
        </div>

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
