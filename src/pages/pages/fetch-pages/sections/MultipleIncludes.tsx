import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { MULTIPLE_INCLUDES_CODE } from '../snippets';

function MultipleIncludes() {
  return (
    <Section id="multiple-includes" title="Multiple includes">
      <p>
        Because <Code>includes</Code> is an array, one request can pull in several related lists at
        once — each under its own <Code>key</Code>. A home page, for instance, can return its own
        content plus a list of blog posts <em>and</em> a list of FAQs in a single round-trip.
      </p>
      <p>
        Note the second include below uses a different <Code>entity</Code>,{' '}
        <Code>faq-group-list</Code>, and a different filter shape: FAQs are matched by the page{' '}
        <Code>slug</Code> with <Code>status: 'published'</Code> and an <Code>orderBy</Code> to
        control their order.
      </p>
      <DemoBlock
        title="Fetch blogs AND FAQs together"
        description="Two includes in one request — results come back under data.relatedBlogs and data.faqs."
        code={MULTIPLE_INCLUDES_CODE}
      />
    </Section>
  );
}

export default MultipleIncludes;
