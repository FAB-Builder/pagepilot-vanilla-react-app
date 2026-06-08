import { Section, Code } from '../../../../components/DocSection';
import DemoBlock from '../../../../components/DemoBlock';
import ApiTable from '../../../../components/ApiTable';
import { MENU_CODE } from '../snippets';

function FetchMenu() {
  return (
    <Section id="menu" title="Fetch a menu">
      <p>
        Menus you build in Page Pilot (navigation, feature lists, footers, and similar) are fetched
        with the <Code>menu-by-name</Code> entity. Instead of a group or slug, you match a menu by
        its <Code>name</Code>. Each menu include returns its items under your chosen{' '}
        <Code>key</Code>.
      </p>
      <DemoBlock
        title="Fetch menus by name"
        description="Two menu includes — results land under data.headerMenu and data.featureMenu."
        code={MENU_CODE}
        language="js"
      />
      <p>The menu filter accepts:</p>
      <ApiTable
        rows={[
          {
            property: 'name',
            description:
              "The menu's name as set in Page Pilot, e.g. 'code-gen-header-features'. Each menu has a unique name.",
            type: 'string',
          },
        ]}
      />
      <p className="text-sm text-slate-600">
        Because <Code>includes</Code> is an array, you can request a page, its blogs, its FAQs, and
        several menus all in the same call.
      </p>
    </Section>
  );
}

export default FetchMenu;
