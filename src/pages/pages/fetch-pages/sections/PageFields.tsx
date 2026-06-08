import { Section, Code } from '../../../../components/DocSection';
import ApiTable from '../../../../components/ApiTable';

function PageFields() {
  return (
    <Section id="page-fields" title="What you can fetch">
      <p>
        The fields you get back are <strong>dynamic</strong> — you choose them with{' '}
        <Code>pageSelect.select</Code> (for the page itself) and each include's <Code>select</Code>{' '}
        (for related lists). Request only what you need. Below are the most useful fields a page
        exposes:
      </p>
      <ApiTable
        rows={[
          { property: 'title', description: 'The page title.', type: 'string' },
          {
            property: 'metaTitle',
            description: 'SEO title for the <title> tag — falls back to title if unset.',
            type: 'string',
          },
          {
            property: 'metaDescription',
            description: 'SEO meta description / summary used in cards and search results.',
            type: 'string',
          },
          {
            property: 'metaImageUrl',
            description: 'Social / Open Graph image URL — the preview image when shared.',
            type: 'string',
          },
          {
            property: 'metaKeywords',
            description: 'SEO keywords for the page.',
            type: 'string | string[]',
          },
          {
            property: 'slug',
            description: 'Unique slug — use it to link to the full page.',
            type: 'string',
          },
          { property: 'tags', description: 'Tags for filtering and display.', type: 'string[]' },
          { property: 'groups', description: 'Groups the page belongs to.', type: 'string[]' },
          { property: 'thumbnailImage', description: 'Card / hero image URL.', type: 'string' },
          {
            property: 'editor / sections',
            description: 'The page body content (use sectionSelect: { content: 1 } to fetch it).',
            type: 'object',
          },
          {
            property: 'head / bodyBottom',
            description: 'Custom code injected into <head> or before </body>.',
            type: 'string',
          },
          {
            property: 'metadata',
            description: 'Any custom fields you added to the page.',
            type: 'object',
          },
          {
            property: 'createdAt / updatedAt',
            description: 'Timestamps, useful for sorting.',
            type: 'string (ISO date)',
          },
        ]}
      />
    </Section>
  );
}

export default PageFields;
