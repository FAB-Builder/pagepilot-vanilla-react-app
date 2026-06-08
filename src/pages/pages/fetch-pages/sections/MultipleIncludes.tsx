import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { MULTIPLE_INCLUDES_CODE } from '../snippets';

function MultipleIncludes() {
  return (
    <Section id="multiple-includes" title="Multiple includes">
      <p>
        Because <Code>includes</Code> is an array, one request can pull in several related lists at
        once — each comes back under its own <Code>key</Code>. A home page, for instance, can return
        a list of recent posts <em>and</em> a list of popular posts in a single round-trip.
      </p>
      <DemoBlock
        title="Request two lists at once"
        description="Each include returns separately — here under data.relatedBlogs and data.popularPosts."
        code={MULTIPLE_INCLUDES_CODE}
        language="js"
      />
      <p className="text-sm text-slate-600">
        FAQs work a little differently — see <Code>Fetch FAQs</Code> next.
      </p>
    </Section>
  );
}

export default MultipleIncludes;
