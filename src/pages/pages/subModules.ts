import type { SubModule } from '../../components/DocLayout';

/**
 * Sub-modules of the "Pages" module. The left rail lists these; each is its
 * own route under /pages. Add new page components here as they're built.
 */
export const PAGES_SUBMODULES: SubModule[] = [
  { to: '/pages/lead-form', label: 'Lead Form' },
  { to: '/pages/fetch-pages', label: 'Fetch Pages' },
];

/** Where /pages should land by default. */
export const PAGES_DEFAULT = PAGES_SUBMODULES[0].to;
