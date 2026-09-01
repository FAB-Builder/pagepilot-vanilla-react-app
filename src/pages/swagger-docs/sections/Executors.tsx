import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';

export default function Executors() {
  return (
    <Section id="executors" title='Executors — the "live API" part'>
      <p>
        An executor is a client React component that renders a form for one endpoint, builds
        the JSON payload live, fires the real request, and shows status + response. It{' '}
        <strong>replaces an external section</strong> at render time. This is the only
        substantial hand-written code in the job.
      </p>
      <ul className="my-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
        <li>
          Build on <Code>components/executor/ExecutorShell.tsx</Code> — it provides{' '}
          <Code>useExecutor()</Code> (request runner, status, JSON/text fallback, error
          precedence, success/error toast) and <Code>&lt;ExecutorShell&gt;</Code> (method
          badge, live URL preview, status pill, payload preview, submit button, response
          pane). Do not re-implement it per endpoint.
        </li>
        <li>
          Each executor contributes only: <Code>"use client"</Code> + one{' '}
          <Code>useState</Code> per input; a <Code>payload</Code> in a <Code>useMemo</Code>{' '}
          that omits empty values; and an <Code>onExecute</Code> callback that substitutes
          live values into the path template and calls <Code>state.execute(url, init)</Code>.
        </li>
        <li>
          One file per endpoint — <Code>&lt;OperationId&gt;Executor.tsx</Code> in{' '}
          <Code>components/executor/</Code>, default- <em>and</em> named-exported. No
          god-component switching on <Code>operationId</Code>.
        </li>
      </ul>
      <div className="my-3">
        <CodeSnippet
          language="tsx"
          code={`// components/SectionContent.tsx — wire each executor by its section identifier
import CreateLeadExecutor from "./executor/CreateLeadExecutor";
import UpdateLeadExecutor from "./executor/UpdateLeadExecutor";

// Each value is the external section's identifier, read back from the
// upsert-page-item response for that page. It is an opaque timestamp id
// unique to that section — never a value you type from an example.
const CREATE_LEAD = "<create-lead section identifier>";
const UPDATE_LEAD = "<update-lead section identifier>";

const EXECUTORS: Record<string, React.ComponentType> = {
  [CREATE_LEAD]: CreateLeadExecutor,
  [UPDATE_LEAD]: UpdateLeadExecutor,
};
// the dispatch itself is already written — one import + one map entry per executor`}
        />
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p>
          <strong className="text-ink">Section identifiers are opaque timestamps</strong> —{' '}
          <Code>section-&#36;&#123;Date.now()&#125;</Code>, minted per section, not derived
          from anything. Read the identifier <em>back</em> from the upsert response (PagePilot
          backfills a fresh one if the field is absent), key the executor on that value, and
          record it in your manifest so regeneration stays stable.
        </p>
      </div>
    </Section>
  );
}
