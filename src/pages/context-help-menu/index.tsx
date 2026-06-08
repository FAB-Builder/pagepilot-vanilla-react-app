import DocLayout, { type DocSection } from '../../components/DocLayout';
import {
  Overview,
  ApiEndpoint,
  MenuStructure,
  ConfigureMenu,
  FetchPageContent,
  RenderItYourself,
  LiveDemo,
  ApiReference,
} from './sections';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live demo' },
  { id: 'api-endpoint', label: 'The API endpoint' },
  { id: 'menu-structure', label: 'Menu structure & types' },
  { id: 'configure-menu', label: 'Configure in Page Pilot' },
  { id: 'fetch-page-content', label: 'Fetch page on item click' },
  { id: 'render-yourself', label: 'Render it yourself' },
  { id: 'api-reference', label: 'API reference' },
];

function ContextHelpMenu() {
  return (
    <DocLayout title="Context Help Menu" sections={SECTIONS}>
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Context Help Menu
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A right-anchored help drawer that surfaces contextual documentation to your users.
            Create any menu in{' '}
            <a
              href="https://pagepilot.fabbuilder.com/menu"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Page Pilot → Menus
            </a>
            , fetch it by name, and render it as a help drawer — no code changes needed when
            you add or rearrange topics.
          </p>
        </header>

        <Overview />
        <LiveDemo />
        <ApiEndpoint />
        <MenuStructure />
        <ConfigureMenu />
        <FetchPageContent />
        <RenderItYourself />
        <ApiReference />
      </article>
    </DocLayout>
  );
}

export default ContextHelpMenu;
