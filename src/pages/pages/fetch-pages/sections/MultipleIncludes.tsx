import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { MULTIPLE_INCLUDES_CODE } from '../snippets';

function MultipleIncludes() {
  return (
    <Section id="multiple-includes" title="Multiple includes">
      <p>
        Because <Code>includes</Code> is an array, one request can pull in several related lists at
        once — each comes back under its own <Code>key</Code>. A page can return its blog list{' '}
        <em>and</em> its FAQs in a single round-trip, for example.
      </p>
      <DemoBlock
        title="Request several lists at once"
        description="Each include returns separately — here under data.relatedBlogs and data.faqs."
        code={MULTIPLE_INCLUDES_CODE}
        language="js"
      />
      <p className="text-sm text-slate-600">
        Different content uses a different <Code>entity</Code> — FAQs (<Code>Fetch FAQs</Code>) and
        menus (<Code>Fetch a menu</Code>) are covered next.
      </p>
    </Section>
  );
}

export default MultipleIncludes;
