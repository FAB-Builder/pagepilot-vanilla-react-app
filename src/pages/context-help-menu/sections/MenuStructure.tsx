import { Section, Code } from '../../../components/DocSection';

function MenuStructure() {
  return (
    <Section id="menu-structure" title="Menu structure">
      <p>
        The API response has a <Code>configuration</Code> array — the root menu items. Each item
        can have a <Code>children</Code> array for nested sections, with no depth limit.
      </p>
      <p>Key fields on each item:</p>
      <ul className="ml-4 list-disc space-y-1">
        <li>
          <Code>name</Code> — label shown in the drawer.
        </li>
        <li>
          <Code>href</Code> — slug of a Page Pilot page. When clicked the drawer fetches and
          renders that page's content. Items without an <Code>href</Code> act as category headers.
        </li>
        <li>
          <Code>children</Code> — nested sub-items. Empty array for leaf nodes.
        </li>
        <li>
          <Code>depth</Code> — <Code>0</Code> for root items, increments for each nesting level.
        </li>
        <li>
          <Code>index</Code> — sort order within the parent. Lower values appear first.
        </li>
      </ul>
    </Section>
  );
}

export default MenuStructure;
