import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import ApiTable from '../../../../components/ApiTable';
import EndpointBuilder from '../builder/EndpointBuilder';
import { LIST_PAGES_CODE, LIST_PAGES_RESPONSE, LIST_SLUGS_NEXT_CODE } from '../snippets';

function ListPages() {
  return (
    <Section id="list-pages" title="Fetch a list of pages">
      <p>
        To list pages — a blog index, a sitemap, or every route to pre-render — send a{' '}
        <Code>GET</Code> to <Code>/client/page</Code>. All options are plain query parameters.
        Build your endpoint below, then copy the URL or the code.
      </p>

      <EndpointBuilder />

      <h3 className="pt-2 text-base font-semibold text-ink">What each parameter does</h3>
      <ApiTable
        rows={[
          {
            property: 'filter[groups][]',
            description: 'Only pages in this group. Repeat it for more groups.',
            type: 'string',
          },
          {
            property: 'filter[status]',
            description: 'live = published, draft = unpublished. Leave out for both.',
            type: "'live' | 'draft'",
          },
          {
            property: 'includeSections',
            description: 'Send false for lists — otherwise every page includes its full HTML.',
            type: 'boolean',
            default: 'true',
          },
          {
            property: 'select',
            description: 'Fields to return, separated by spaces.',
            type: 'string',
          },
          {
            property: 'orderBy',
            description: 'field_DESC (newest first) or field_ASC.',
            type: 'string',
          },
          {
            property: 'limit / offset',
            description: 'Page size and how many to skip. No limit = every match.',
            type: 'number',
          },
        ]}
      />

      <DemoBlock
        title="The same request in code"
        description="A minimal helper — swap in your workspace id and group."
        code={LIST_PAGES_CODE}
        language="js"
      />
      <DemoBlock
        title="Response"
        description={
          <>
            <Code>rows</Code> are the pages; <Code>count</Code> is the total before{' '}
            <Code>limit</Code>/<Code>offset</Code> — use it for pagination.
          </>
        }
        code={LIST_PAGES_RESPONSE}
        language="json"
      />
      <DemoBlock
        title="Pre-render every slug (Next.js)"
        description="How the British Paints website builds one route per blog post."
        code={LIST_SLUGS_NEXT_CODE}
      />
      <p className="text-sm text-slate-600">
        Need the list <em>and</em> a page in the same request? Use the <Code>includes</Code> option
        of <Code>/pagebyslug</Code> instead (see below).
      </p>
    </Section>
  );
}

export default ListPages;
