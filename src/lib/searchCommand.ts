export const SEARCH_OPEN_EVENT = 'docs-search:open';

/** Opens the global search dialog from anywhere (header, sidebar, drawer). */
export function openSearch() {
  window.dispatchEvent(new Event(SEARCH_OPEN_EVENT));
}
