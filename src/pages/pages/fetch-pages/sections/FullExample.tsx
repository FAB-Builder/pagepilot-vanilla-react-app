import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import { FULL_EXAMPLE_CODE } from '../snippets';

function FullExample() {
  return (
    <Section id="example" title="Full example">
      <p>
        Here's the complete pattern, modelled on the FabBuilder blog index: fetch a page by its slug
        and, in the same request, a list of all <strong>live</strong> pages in the{' '}
        <Code>blogs</Code> group — returning only the fields the grid needs. The slug (
        <Code>website-blogs</Code> below) is <strong>your own page's slug</strong> — swap in
        whichever page you're loading.
      </p>
      <DemoBlock
        title="Fetch a page + a related list"
        description="One request returns the page and a filtered list of related pages."
        code={FULL_EXAMPLE_CODE}
      />
      <p className="text-sm text-slate-600">
        The list comes back under the <Code>key</Code> you chose (<Code>relatedBlogs</Code> here), so
        you can read <Code>data.page</Code> and <Code>data.relatedBlogs</Code> separately.
      </p>
    </Section>
  );
}

export default FullExample;
