import { Section } from '../../../../components/DocSection';
import ApiTable from '../../../../components/ApiTable';
import { PP_BASE } from '../snippets';

function ApiReference() {
  return (
    <Section id="api" title="API reference">
      <p>The technical details for direct integration.</p>
      <h3 className="mb-2 mt-4 text-base font-semibold text-ink">Endpoint</h3>
      <ApiTable
        rows={[
          {
            property: 'POST /pagebyslug/{slug}',
            description: 'Fetch a page by slug, plus any related lists you include.',
            type: `${PP_BASE}/pagebyslug/{slug}`,
          },
          {
            property: 'Content-Type',
            description: 'Request body is JSON.',
            type: 'application/json',
          },
        ]}
      />
      <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Request body</h3>
      <ApiTable
        rows={[
          {
            property: 'data.includes',
            description: 'Array of related lists to fetch alongside the page.',
            type: 'Include[]',
            default: '[]',
          },
          {
            property: 'includes[].key',
            description: 'Response key the list is returned under.',
            type: 'string',
          },
          {
            property: 'includes[].entity',
            description: 'Entity to fetch.',
            type: "'pages'",
          },
          {
            property: 'includes[].filter.groups',
            description: 'Restrict to these groups.',
            type: 'string[]',
          },
          {
            property: 'includes[].filter.status',
            description: 'Restrict to this status.',
            type: "'live' | 'draft'",
          },
          {
            property: 'includes[].select',
            description: 'Fields to return per page (field: 1).',
            type: 'Record<string, 1>',
          },
          {
            property: 'includes[].limit',
            description: 'Max number of records for this include.',
            type: 'number',
          },
          {
            property: 'data.pageSelect.select',
            description: 'Which fields to return for the main page (see "What you can fetch").',
            type: 'Record<string, 1>',
          },
          {
            property: 'data.pageSelect.sectionSelect',
            description: "Which fields to return for the page's sections, e.g. { content: 1 }.",
            type: 'Record<string, 1>',
          },
        ]}
      />
      <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Response</h3>
      <ApiTable
        rows={[
          { property: 'page', description: 'The page that matched the slug.', type: 'object' },
          {
            property: '[key]',
            description: 'One array per include, named by its key (e.g. relatedBlogs).',
            type: 'object[]',
          },
        ]}
      />
    </Section>
  );
}

export default ApiReference;
