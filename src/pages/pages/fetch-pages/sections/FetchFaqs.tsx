import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import ApiTable from '../../../../components/ApiTable';
import { FAQS_CODE } from '../snippets';

function FetchFaqs() {
  return (
    <Section id="faqs" title="Fetch FAQs">
      <p>
        FAQs attached to a page are fetched with an include too, but they use a different{' '}
        <Code>entity</Code> — <Code>faq-group-list</Code> — and are matched by the page's{' '}
        <Code>slug</Code> rather than by group. Add the include below to the same request that fetches
        your page, and the FAQs come back under <Code>data.faqs</Code>.
      </p>
      <DemoBlock
        title="Add an FAQs include"
        description="One more entry in includes — its results land under data.faqs."
        code={FAQS_CODE}
        language="js"
      />
      <p>The FAQ filter accepts:</p>
      <ApiTable
        rows={[
          {
            property: 'slug',
            description: 'The page whose FAQs you want — usually the same slug you are fetching.',
            type: 'string',
          },
          {
            property: 'status',
            description: "Only return FAQs with this status. Use 'published' for live FAQs.",
            type: "'published' | 'draft'",
            default: "'published'",
          },
          {
            property: 'orderBy',
            description: 'Keep the order you arranged in Page Pilot, e.g. by the "order" field.',
            type: "'order_ASC' | 'order_DESC'",
            default: "'order_ASC'",
          },
        ]}
      />
    </Section>
  );
}

export default FetchFaqs;
