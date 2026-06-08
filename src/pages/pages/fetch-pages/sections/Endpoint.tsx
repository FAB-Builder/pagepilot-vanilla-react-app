import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { BASIC_CODE } from '../snippets';

function Endpoint() {
  return (
    <Section id="endpoint" title="The endpoint">
      <p>
        Send a <Code>POST</Code> to <Code>/pagebyslug/&#123;slug&#125;</Code> with a JSON body. The
        body is where you describe what related content to pull in (see <Code>includes</Code> below).
        At its simplest, with no body, it just returns the page.
      </p>
      <DemoBlock
        title="Fetch a single page"
        description="Returns the page that matches the slug."
        code={BASIC_CODE}
      />
      <p className="text-sm text-slate-600">
        The response contains the matched page under <Code>page</Code>, plus a key for each include
        you requested.
      </p>
    </Section>
  );
}

export default Endpoint;
