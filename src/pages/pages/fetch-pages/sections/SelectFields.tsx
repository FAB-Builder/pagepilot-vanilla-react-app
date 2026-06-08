import { Section, Code } from '../../../../components/DocSection';
import ApiTable from '../../../../components/ApiTable';

function SelectFields() {
  return (
    <Section id="select" title="Select fields">
      <p>
        <Code>select</Code> is a field projection — set a field to <Code>1</Code> to include it.
        Requesting only what you need keeps responses small and fast. These are the fields the blog
        index asks for:
      </p>
      <ApiTable
        rows={[
          { property: 'title / name', description: 'The page title.', type: 'string' },
          {
            property: 'slug',
            description: 'Unique slug — use it to link to the full page.',
            type: 'string',
          },
          {
            property: 'metaDescription',
            description: 'Short summary, handy for cards and SEO.',
            type: 'string',
          },
          { property: 'tags', description: 'Tags for filtering and display.', type: 'string[]' },
          { property: 'groups', description: 'Groups the page belongs to.', type: 'string[]' },
          { property: 'thumbnailImage', description: 'Card / hero image URL.', type: 'string' },
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

export default SelectFields;
