import { Section, Code } from '../../../../components/DocSection';
import ApiTable from '../../../../components/ApiTable';

function Includes() {
  return (
    <Section id="includes" title="Includes">
      <p>
        <Code>includes</Code> is an array — each entry pulls in a related list of pages alongside the
        main page. You can request several at once (for example a blogs list and an FAQs list). Each
        include is shaped like this:
      </p>
      <ApiTable
        rows={[
          {
            property: 'key',
            description:
              'The name the results are returned under in the response, e.g. data.relatedBlogs.',
            type: 'string',
          },
          {
            property: 'entity',
            description:
              'What to fetch. "pages" for pages (blogs, landing pages…); "faq-group-list" for FAQ groups.',
            type: "'pages' | 'faq-group-list'",
            default: "'pages'",
          },
          {
            property: 'filter',
            description: 'Which records to include — narrow the list by group, slug, and status.',
            type: '{ groups, slug, status, orderBy }',
          },
          {
            property: 'select',
            description: 'Which fields to return for each record (see Select fields).',
            type: 'Record<string, 1>',
          },
          {
            property: 'limit',
            description: 'Maximum number of records to return for this include.',
            type: 'number',
          },
        ]}
      />
    </Section>
  );
}

export default Includes;
