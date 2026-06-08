import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { PAGES_SUBMODULES } from '../subModules';
import {
  Overview,
  Endpoint,
  FullExample,
  Includes,
  MultipleIncludes,
  FetchFaqs,
  Filter,
  SelectFields,
  PageSelect,
  AiPrompt,
  ApiReference,
  PageFields,
} from './sections';

/**
 * Fetch Pages — a sub-module of "Pages". Documents how to read pages (blogs,
 * FAQs, landing pages, etc.) published in Page Pilot from your own app.
 *
 * The page is composed of one component per doc section (see ./sections); the
 * code snippets live in ./snippets.
 */

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'endpoint', label: 'The endpoint' },
  { id: 'example', label: 'Full example' },
  { id: 'includes', label: 'Includes' },
  { id: 'multiple-includes', label: 'Multiple includes' },
  { id: 'faqs', label: 'Fetch FAQs' },
  { id: 'filter', label: 'Filter' },
  { id: 'select', label: 'Select fields' },
  { id: 'page-select', label: 'Page select' },
  { id: 'ai-prompt', label: 'Integrate using AI' },
  { id: 'api', label: 'API reference' },
  { id: 'page-fields', label: 'What you can fetch' },
];

function FetchPages() {
  return (
    <DocLayout
      title="Fetch Pages"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Fetch Pages List using Page Pilot API
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Read content you've published in Page Pilot — blog posts, FAQs, landing pages, and more —
            straight from your own app with a single API call. Pull one page by its slug and, in the
            same request, fetch related lists of pages filtered by group and status.
          </p>
        </header>

        <Overview />
        <Endpoint />
        <FullExample />
        <Includes />
        <MultipleIncludes />
        <FetchFaqs />
        <Filter />
        <SelectFields />
        <PageSelect />
        <AiPrompt />
        <ApiReference />
        <PageFields />
      </article>
    </DocLayout>
  );
}

export default FetchPages;
