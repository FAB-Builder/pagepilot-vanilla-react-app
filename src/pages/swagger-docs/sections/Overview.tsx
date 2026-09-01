import { Section, Code } from '../../../components/DocSection';

export default function Overview() {
  return (
    <Section id="overview" title="Overview">
      <p>
        The repository is a <strong>template plus an operating manual</strong>. The UI —
        layout, navbar, sidebar, search, theming, shadow-DOM content rendering, the docs
        routes — is already built and works. You do not redesign or re-scaffold it.
      </p>
      <p>
        You hand the repo's <Code>README.md</Code> to any capable coding agent along with
        three inputs (a Swagger URL, a PagePilot tenant id, a PagePilot service token). The
        agent reads the spec, creates the PagePilot menus and pages that mirror it, and
        writes one React <strong>executor</strong> component per live endpoint. Everything
        else in the template stays untouched.
      </p>
      <ul className="my-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
        <li>
          <strong className="text-ink">Ships one documentation group</strong> —{' '}
          <Code>guide</Code>. Add more only when explicitly needed.
        </li>
        <li>
          <strong className="text-ink">Ships an empty executor folder</strong> —{' '}
          <Code>components/executor/</Code> contains only <Code>ExecutorShell.tsx</Code> (the
          shared request runner); executors are generated per spec.
        </li>
        <li>
          <strong className="text-ink">Ships an empty <Code>EXECUTORS</Code> map</strong> in{' '}
          <Code>components/SectionContent.tsx</Code> for you to fill.
        </li>
      </ul>
    </Section>
  );
}
