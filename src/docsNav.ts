import { navItems, type NavItem } from './navItems';

export interface DocsNavGroup {
  label: string;
  items: NavItem[];
}

const GROUPS: { label: string; paths: string[] }[] = [
  { label: 'Onboarding', paths: ['/tours', '/tooltips', '/demos', '/app-banner'] },
  {
    label: 'Content',
    paths: ['/pages', '/menus', '/blocks', '/forms', '/webinar', '/context-help-menu'],
  },
  { label: 'Resources', paths: ['/troubleshooting', '/swagger-docs'] },
];

const grouped = new Set(GROUPS.flatMap((g) => g.paths));

/** Sidebar groups for the docs layout. Modules not listed above land in the last group. */
export const docsNavGroups: DocsNavGroup[] = GROUPS.map((group, i) => ({
  label: group.label,
  items: [
    ...group.paths
      .map((path) => navItems.find((item) => item.to === path))
      .filter((item): item is NavItem => Boolean(item)),
    ...(i === GROUPS.length - 1 ? navItems.filter((item) => !grouped.has(item.to)) : []),
  ],
}));

export const docsNavFlat: NavItem[] = docsNavGroups.flatMap((group) => group.items);

export function findCurrentModule(pathname: string): NavItem | undefined {
  return navItems.find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`));
}
