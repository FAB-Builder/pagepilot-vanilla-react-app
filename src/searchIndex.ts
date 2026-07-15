import { navItems } from './navItems';

export interface SearchEntry {
  /** Full path to navigate to, including section hash where applicable. */
  to: string;
  /** Matched text shown as the result title. */
  title: string;
  /** Parent module label, shown as a breadcrumb/tag. */
  module: string;
  /** Extra text this entry matches against but doesn't display verbatim. */
  keywords?: string;
}

/**
 * Static search index: one entry per module (matches on label + description)
 * and one entry per doc section (matches on section label, links straight to
 * its anchor). Kept in sync by hand with each page's `SECTIONS` constant —
 * there's no runtime content scan, so a new `<Section>` needs a line here too.
 */
const SECTION_INDEX: Record<string, { id: string; label: string }[]> = {
  '/tours': [
    { id: 'overview', label: 'Overview' },
    { id: 'live-demo', label: 'Live demo' },
    { id: 'integration', label: 'Integration' },
    { id: 'ai-prompt', label: 'Integrate using AI' },
    { id: 'target-page', label: 'Target Page' },
    { id: 'alt-target-page', label: 'Alternative Target Page' },
    { id: 'selector', label: 'Element / Selector' },
    { id: 'position', label: 'Position' },
    { id: 'backdrop', label: 'Backdrop' },
    { id: 'device-language', label: 'Device & Language' },
    { id: 'scheduling', label: 'Scheduling' },
    { id: 'show-once', label: 'Show only once' },
    { id: 'step-style', label: 'Step styling' },
    { id: 'api', label: 'API reference' },
  ],
  '/demos': [
    { id: 'overview', label: 'Overview' },
    { id: 'live-demo', label: 'Live demo' },
    { id: 'integration', label: 'Integration' },
    { id: 'embed-visibility', label: 'Conditional visibility' },
    { id: 'ai-prompt', label: 'Integrate using AI' },
    { id: 'steps', label: 'Steps' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'backdrop', label: 'Backdrop' },
    { id: 'device-language', label: 'Device & Language' },
    { id: 'scheduling', label: 'Scheduling' },
    { id: 'styling', label: 'Step styling' },
  ],
  '/tooltips': [
    { id: 'overview', label: 'Overview' },
    { id: 'live-demo', label: 'Live demo' },
    { id: 'integration', label: 'Integration' },
    { id: 'ai-prompt', label: 'Integrate using AI' },
    { id: 'target-page', label: 'Target Page' },
    { id: 'selector', label: 'Element / Selector' },
    { id: 'trigger', label: 'Trigger behaviour' },
    { id: 'position', label: 'Position' },
    { id: 'backdrop', label: 'Backdrop' },
    { id: 'device-language', label: 'Device & Language' },
    { id: 'scheduling', label: 'Scheduling' },
    { id: 'show-once', label: 'Show only once' },
    { id: 'styling', label: 'Styling' },
    { id: 'api', label: 'API reference' },
  ],
  '/pages/fetch-pages': [
    { id: 'overview', label: 'Overview' },
    { id: 'endpoint', label: 'The endpoint' },
    { id: 'example', label: 'Full example' },
    { id: 'includes', label: 'Includes' },
    { id: 'multiple-includes', label: 'Multiple includes' },
    { id: 'faqs', label: 'Fetch FAQs' },
    { id: 'menu', label: 'Fetch a menu' },
    { id: 'all-together', label: 'Everything at once' },
    { id: 'filter', label: 'Filter' },
    { id: 'select', label: 'Select fields' },
    { id: 'page-select', label: 'Page select' },
    { id: 'ai-prompt', label: 'Integrate using AI' },
    { id: 'api', label: 'API reference' },
    { id: 'page-fields', label: 'What you can fetch' },
  ],
  '/pages/template-variables': [
    { id: 'what-is-a-template', label: 'What is a template?' },
    { id: 'how-variables-work', label: 'How variables work' },
    { id: 'the-dialog', label: 'The template details dialog' },
    { id: 'step-basic', label: '1. Save a basic template' },
    { id: 'step-text-field', label: '2. Add a text variable' },
    { id: 'step-image-field', label: '3. Add an image variable' },
    { id: 'step-number-field', label: '4. Add a number variable' },
    { id: 'step-textarea-field', label: '5. Add a long-text variable' },
    { id: 'step-repeat', label: '6. Add repeatable blocks' },
    { id: 'repeatable-containers', label: '7. Repeat across a grid/columns' },
    { id: 'data-reference', label: '8. Data Reference (JSON / API / Menu)' },
    { id: 'default-values', label: '9. Default values' },
    { id: 'using-variables', label: '10. Filling in variables' },
    { id: 'auto-cleanup', label: '11. Variables & the canvas stay in sync' },
    { id: 'field-reference', label: 'Field type reference' },
    { id: 'tips', label: 'Tips & common questions' },
  ],
  '/pages/link-page-to-menu': [
    { id: 'overview', label: 'Overview' },
    { id: 'create-page', label: '1. Create a page' },
    { id: 'design-page', label: '2. Design your page' },
    { id: 'publish-page', label: '3. Publish the page' },
    { id: 'link-to-menu', label: '4. Link to a menu' },
    { id: 'verify', label: '5. Verify & manage' },
    { id: 'tips', label: 'Tips & things to know' },
  ],
  '/pages/editor-css': [
    { id: 'overview', label: 'Overview' },
    { id: 'when', label: 'When you need this' },
    { id: 'quill', label: 'Quill (Rich Text / HTML)' },
    { id: 'mdx', label: 'MDX (Markdown)' },
    { id: 'both', label: 'Add both at once' },
    { id: 'troubleshoot', label: 'Troubleshooting' },
  ],
  '/pages/external-sections': [
    { id: 'overview', label: 'Overview' },
    { id: 'internal-vs-external', label: 'Internal vs external' },
    { id: 'when', label: 'When to use it' },
    { id: 'create', label: 'Create an external section' },
    { id: 'render', label: 'Render it in your app' },
    { id: 'example', label: 'End-to-end example' },
    { id: 'tips', label: 'Tips & gotchas' },
  ],
  '/context-help-menu': [
    { id: 'overview', label: 'Overview' },
    { id: 'live-demo', label: 'Live demo' },
    { id: 'api-endpoint', label: 'The API endpoint' },
    { id: 'menu-structure', label: 'Menu structure & types' },
    { id: 'configure-menu', label: 'Configure in Page Pilot' },
    { id: 'fetch-page-content', label: 'Fetch page on item click' },
    { id: 'render-yourself', label: 'Render it yourself' },
    { id: 'api-reference', label: 'API reference' },
    { id: 'ai-prompt', label: 'Integrate using AI' },
  ],
  '/webinar': [
    { id: 'overview', label: 'Overview' },
    { id: 'calendar', label: 'Calendar view' },
    { id: 'schedule-api', label: 'Schedule API' },
    { id: 'live-upcoming', label: 'Live & Upcoming API' },
    { id: 'create', label: 'Creating a webinar' },
    { id: 'video', label: 'Uploading a video' },
    { id: 'schedule', label: 'Scheduling' },
    { id: 'recurring', label: 'Recurring webinars' },
    { id: 'late-entry', label: 'Late entry' },
    { id: 'tags', label: 'Tags' },
    { id: 'timeline', label: 'Timeline events' },
    { id: 'messages', label: 'Messages' },
    { id: 'reactions', label: 'Reactions' },
    { id: 'polls-forms', label: 'Polls & forms' },
    { id: 'views', label: 'Viewer count' },
    { id: 'registration', label: 'Registration form' },
    { id: 'cs-channel', label: 'CS Channel' },
    { id: 'share-link', label: 'Shareable link' },
    { id: 'social', label: 'Social sharing' },
    { id: 'status', label: 'Live status' },
  ],
  '/forms': [
    { id: 'overview', label: 'Overview' },
    { id: 'create-form', label: 'Create a form' },
    { id: 'view-form', label: 'View a form' },
    { id: 'edit-form', label: 'Edit a form' },
    { id: 'embed', label: 'Embed a form' },
    { id: 'fetch-forms', label: 'Fetch forms' },
    { id: 'view-responses', label: 'View responses' },
    { id: 'delete-form', label: 'Delete a form' },
    { id: 'ai-prompt', label: 'Integrate using AI' },
    { id: 'api', label: 'API reference' },
  ],
  '/app-banner': [
    { id: 'overview', label: 'Overview' },
    { id: 'integration', label: 'Integration' },
    { id: 'ai-prompt', label: 'Integrate using AI' },
    { id: 'types', label: 'Banner types & demos' },
    { id: 'configure', label: 'Configuring a banner' },
    { id: 'api', label: 'API reference' },
  ],
  '/blocks/button': [
    { id: 'overview', label: 'Overview' },
    { id: 'action-types', label: 'Action types' },
    { id: 'label', label: 'Label & text' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'hover', label: 'Hover state' },
    { id: 'size-width', label: 'Size & width' },
    { id: 'wrapper-spacing', label: 'Wrapper spacing & alignment' },
    { id: 'icon', label: 'Icon' },
    { id: 'responsive', label: 'Per-device behaviour' },
  ],
};

const MODULE_LABEL: Record<string, string> = {
  '/tours': 'Tours',
  '/demos': 'Demos',
  '/tooltips': 'Tooltips',
  '/pages/fetch-pages': 'Fetch Pages',
  '/pages/template-variables': 'Templates & Variables',
  '/pages/link-page-to-menu': 'Link a Page to a Menu',
  '/pages/editor-css': 'Editor Block CSS',
  '/pages/external-sections': 'External Sections',
  '/context-help-menu': 'Context Help Menu',
  '/webinar': 'Webinar',
  '/forms': 'Forms',
  '/app-banner': 'App Banner',
  '/blocks/button': 'Button',
};

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const item of navItems) {
    entries.push({
      to: item.to,
      title: item.label,
      module: item.label,
      keywords: item.description,
    });
  }

  for (const [route, sections] of Object.entries(SECTION_INDEX)) {
    const moduleLabel = MODULE_LABEL[route] ?? route;
    for (const section of sections) {
      entries.push({
        to: `${route}#${section.id}`,
        title: section.label,
        module: moduleLabel,
      });
    }
  }

  return entries;
}

export const SEARCH_INDEX: SearchEntry[] = buildIndex();
