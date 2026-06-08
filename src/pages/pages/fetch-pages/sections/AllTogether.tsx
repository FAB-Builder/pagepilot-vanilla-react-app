import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { COMBINED_CODE } from '../snippets';

function AllTogether() {
  return (
    <Section id="all-together" title="Everything in one request">
      <p>
        You don't need separate calls for each type of content. List a <Code>pages</Code> include, a{' '}
        <Code>faq-group-list</Code> include, and a <Code>menu-by-name</Code> include together, and a
        single request returns them all — each under its own <Code>key</Code>.
      </p>
      <DemoBlock
        title="Fetch page + blogs + FAQs + menu"
        description="One call returns data.page, data.relatedBlogs, data.faqs and data.headerMenu."
        code={COMBINED_CODE}
      />
      <p className="text-sm text-slate-600">
        The function returns a tidy object — <Code>pageInfo</Code>, <Code>blogs</Code>,{' '}
        <Code>faqs</Code>, and <Code>headerMenu</Code> — ready to drop into your page.
      </p>
    </Section>
  );
}

export default AllTogether;
