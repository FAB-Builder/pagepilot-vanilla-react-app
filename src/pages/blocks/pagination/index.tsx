import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import PropertyCard from '../../../components/PropertyCard';
import { BlockCallout } from '../shared/BlockCallout';
import { BLOCKS_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'behavior', label: 'Behaviour' },
  { id: 'layout', label: 'Grid layout' },
  { id: 'paging', label: 'Paging controls' },
  { id: 'responsive', label: 'Per-device behaviour' },
];

export default function PaginationBlock() {
  return (
    <DocLayout
      title="Pagination"
      sections={SECTIONS}
      subModules={BLOCKS_SUBMODULES}
      subModulesLabel="Blocks"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Pagination Block
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A grid of cells sliced into pages, with page-number controls beneath it. One grid —
            you decide how many of its cells make up a single page.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            The mental model is <strong>one grid, sliced into pages</strong>. You build a single
            grid of cells and set how many cells fill one page; the block shows that many at a
            time and pages through the rest. A new Pagination block starts as a 2×2 grid with all
            four cells on one page.
          </p>
        </Section>

        <Section id="behavior" title="Behaviour">
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show numbers</strong> — the numbered page links.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Show prev/next</strong> — the step-back and step-forward controls.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="false">
            <strong>Show first/last</strong> — jump-to-end controls.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Sync URL</strong> — writes the current page into the URL as a query parameter
            (<Code>page</Code> by default), so a specific page can be linked to and survives a
            refresh.
          </PropertyCard>
          <PropertyCard type="boolean" defaultValue="true">
            <strong>Scroll to top on change</strong> — returns the visitor to the top of the grid
            when they change page, rather than leaving them mid-scroll.
          </PropertyCard>
        </Section>

        <Section id="layout" title="Grid layout">
          <PropertyCard type="number (1–12)" defaultValue="2">
            <strong>Columns</strong>
          </PropertyCard>
          <PropertyCard type="number (1–24)" defaultValue="2">
            <strong>Rows</strong>
          </PropertyCard>
          <PropertyCard type="number (1–100)" defaultValue="4">
            <strong>Cells per page</strong> — how many cells make up one page. This is pagination
            logic rather than a visual property, so it stays the same on every device.
          </PropertyCard>
          <PropertyCard type="number (0–120)">
            <strong>Column gap</strong> and <strong>Row gap</strong> — in px.
          </PropertyCard>
        </Section>

        <Section id="paging" title="Paging controls">
          <PropertyCard type="number (5–50)" defaultValue="7">
            <strong>Max visible pages</strong> — how many page numbers show before the list
            truncates. Keeps a 40-page set from rendering forty links.
          </PropertyCard>
          <PropertyCard
            type="'left' | 'center' | 'right' | 'space-between'"
            defaultValue="center"
          >
            <strong>Control align</strong> — where the paging controls sit beneath the grid.
          </PropertyCard>
        </Section>

        <Section id="responsive" title="Per-device behaviour">
          <p>
            <strong>Columns</strong> and <strong>Rows</strong> are genuinely per-device via{' '}
            <Code>columnsCount</Code> / <Code>columnsCountTablet</Code> /{' '}
            <Code>columnsCountMobile</Code> (and the matching row keys), published as real{' '}
            <Code>@media</Code> CSS. Mobile defaults to a single column when unset.
          </p>
          <BlockCallout title="Not per-device">
            The whole Behaviour section, cells-per-page, both gaps, and the whole Paging section
            are shared across devices — hidden on the Tablet/Mobile tabs. Only Columns and Rows
            remain editable there.
          </BlockCallout>
        </Section>
      </article>
    </DocLayout>
  );
}
