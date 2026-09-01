import { Section, Code } from '../../../components/DocSection';
import { PAGEPILOT_URL } from '../constants';

export default function Credentials() {
  return (
    <Section id="credentials" title="Credentials you must supply">
      <p>
        You supply <strong>exactly three things</strong>. Everything else is derived and
        confirmed back to you in one summary. All three come from your own{' '}
        <a
          href={PAGEPILOT_URL}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
        >
          PagePilot
        </a>{' '}
        account — sign up, your workspace has a tenant id, and you generate a service token
        there. They cannot be issued for you; never guess a tenant id or reuse one from an
        example.
      </p>
      <div className="scroll-slim my-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-slate-50 text-left text-ink">
            <tr>
              <th className="px-4 py-3 font-semibold">Input</th>
              <th className="px-4 py-3 font-semibold">Example</th>
              <th className="px-4 py-3 font-semibold">Used for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600">
            <tr>
              <td className="px-4 py-3 font-medium text-ink">Swagger / OpenAPI URL</td>
              <td className="px-4 py-3">
                <Code>https://petstore.swagger.io/v2/swagger.json</Code>
              </td>
              <td className="px-4 py-3">
                The spec you document. A config URL, a Swagger UI URL, or a raw{' '}
                <Code>.json</Code> — the agent resolves it to the raw spec(s).
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-ink">PagePilot tenant id</td>
              <td className="px-4 py-3">a 24-character hex id</td>
              <td className="px-4 py-3">
                Scopes every write (<Code>/api/tenant/&#123;tenantId&#125;/…</Code>) and
                becomes <Code>APPLICATION_ID</Code> in <Code>lib/constants.ts</Code>.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-ink">PagePilot service token</td>
              <td className="px-4 py-3">a Bearer JWT</td>
              <td className="px-4 py-3">
                Sent as <Code>Authorization: Bearer &lt;token&gt;</Code> on every menu / page
                write. Environment-only, for the generator run.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600">
        Don't have a tenant id or token yet? Get them from{' '}
        <a
          href={PAGEPILOT_URL}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
        >
          pagepilot.fabbuilder.com
        </a>
        .
      </p>
    </Section>
  );
}
