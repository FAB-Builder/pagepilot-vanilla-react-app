import { Section, Code } from '../../../components/DocSection';

export default function Derived() {
  return (
    <Section id="derived" title="What the agent derives for you">
      <p>
        You are asked for three things. The agent works out the rest and states its choices
        back for approval in a single block:
      </p>
      <div className="scroll-slim my-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-slate-50 text-left text-ink">
            <tr>
              <th className="px-4 py-3 font-semibold">Thing</th>
              <th className="px-4 py-3 font-semibold">How it's derived</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600">
            <tr>
              <td className="px-4 py-3 font-medium text-ink">PagePilot API host</td>
              <td className="px-4 py-3">
                Default <Code>https://pagepilot.fabbuilder.com</Code>.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-ink">
                API base URL (<Code>API_BASE_URL</Code>)
              </td>
              <td className="px-4 py-3">
                Read from the spec — <Code>servers[0].url</Code> (OpenAPI 3), or{' '}
                <Code>schemes[0]://</Code> + <Code>host</Code> + <Code>basePath</Code>{' '}
                (Swagger 2). Never invented. This is the URL executors call.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-ink">Documentation groups</td>
              <td className="px-4 py-3">
                Default to the single <Code>guide</Code> group. Add another only on request.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-ink">Menu names</td>
              <td className="px-4 py-3">
                <Code>&lt;group&gt;-left-menu</Code> per group, plus{' '}
                <Code>documentation-top-menu</Code>.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-ink">Slugs</td>
              <td className="px-4 py-3">
                <Code>&lt;group&gt;/&lt;tag-kebab&gt;/&lt;operation-kebab&gt;</Code> — no
                leading slash.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-ink">Which endpoints get executors</td>
              <td className="px-4 py-3">
                Every <Code>POST</Code>/<Code>PUT</Code>/<Code>PATCH</Code>, plus{' '}
                <Code>GET</Code>s worth exploring. Never <Code>DELETE</Code> unless you ask.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600">
        If the URL you give is a config that lists several specs, the agent fetches it, lists
        the spec groups it found, and asks which to document — the one mid-flight question
        worth stopping for.
      </p>
    </Section>
  );
}
