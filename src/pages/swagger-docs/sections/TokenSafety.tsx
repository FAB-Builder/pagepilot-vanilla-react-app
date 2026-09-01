import { Section, Code } from '../../../components/DocSection';

export default function TokenSafety() {
  return (
    <Section id="token-safety" title="Handling the service token safely">
      <p>
        The published docs site is <strong>static and public</strong>. The token is a Bearer
        header and nothing else — no cookie, no CSRF token, no login call.
      </p>
      <ul className="my-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
        <li>
          Pass it via the <strong>environment</strong> for the generator run only —
          e.g. <Code>PP_TOKEN=… python generate.py</Code>. Never as a literal in a file you
          create or a command you commit.
        </li>
        <li>
          It goes <strong>only</strong> to the PagePilot API host. It must never reach{' '}
          <Code>lib/constants.ts</Code>, the Next.js bundle, a page body, an executor, or a
          git commit.
        </li>
        <li>
          If it is ever pasted into a file or a shared log, treat it as{' '}
          <strong>compromised</strong> and rotate it immediately. A <Code>401</Code> means the
          token is wrong or expired — stop and get a fresh one rather than retrying.
        </li>
      </ul>
    </Section>
  );
}
