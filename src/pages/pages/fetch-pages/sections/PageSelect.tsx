import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import ApiTable from '../../../../components/ApiTable';
import { PAGE_SELECT_CODE } from '../snippets';

function PageSelect() {
  return (
    <Section id="page-select" title="Page select">
      <p>
        Each include has its own <Code>select</Code> for the records it returns. To choose which
        fields come back for the <strong>main page itself</strong>, use <Code>pageSelect</Code>, which
        sits next to <Code>includes</Code> in the request body. Like <Code>select</Code>, set a field
        to <Code>1</Code> to include it.
      </p>
      <DemoBlock
        title="Select the page's own fields"
        description="pageSelect.select picks page fields; pageSelect.sectionSelect picks section fields."
        code={PAGE_SELECT_CODE}
        language="js"
      />
      <p>It has two parts:</p>
      <ApiTable
        rows={[
          {
            property: 'pageSelect.select',
            description:
              'Which top-level page fields to return (title, meta fields, head/body code, etc.). See "What you can fetch".',
            type: 'Record<string, 1>',
          },
          {
            property: 'pageSelect.sectionSelect',
            description:
              "Which fields of the page's content sections to return — most often { content: 1 } to get the body.",
            type: 'Record<string, 1>',
          },
        ]}
      />
      <p className="text-sm text-slate-600">
        Omit <Code>pageSelect</Code> entirely to get the page's default fields. See{' '}
        <Code>What you can fetch</Code> for the full list of available fields.
      </p>
    </Section>
  );
}

export default PageSelect;
