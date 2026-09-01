import { Section, Code } from '../../../components/DocSection';

export default function HowItWorks() {
  return (
    <Section id="how-it-works" title="How it works">
      <p>Three moving parts, all fetched from PagePilot at runtime:</p>
      <ul className="my-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
        <li>
          <strong className="text-ink">Menus</strong> drive the sidebar and top nav. Two are
          required: <Code>&lt;group&gt;-left-menu</Code> (sidebar) and{' '}
          <Code>documentation-top-menu</Code> (top nav).
        </li>
        <li>
          <strong className="text-ink">Pages</strong>, fetched by slug, supply the HTML body.
          One page per operation, plus one overview page per spec tag, plus a{' '}
          <Code>getting-started</Code> page per group.
        </li>
        <li>
          <strong className="text-ink">External page sections</strong> are replaced at render
          time by React executor components — the forms that let a reader fire the real API.
        </li>
      </ul>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p>
          <strong className="text-ink">The menu ↔ page join is a literal string match on the
          slug.</strong>{' '}
          A menu node's <Code>href</Code> must equal the page's <Code>slug</Code> byte for
          byte, with <strong>no leading slash</strong>. Pages are stored as{' '}
          <Code>guide/leads/create-lead</Code>, so menu items are too. Adding a{' '}
          <Code>/</Code> produces a sidebar that renders perfectly and 404s on every click.
        </p>
      </div>
    </Section>
  );
}
