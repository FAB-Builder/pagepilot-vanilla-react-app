import { navItems, type NavItem } from '../../navItems';
import { BLOCKS_SUBMODULES } from '../blocks/subModules';
import { PAGES_SUBMODULES } from '../pages/subModules';

export interface HomeGroup {
  title: string;
  blurb: string;
  items: NavItem[];
}

const GROUPS: { title: string; blurb: string; routes: string[] }[] = [
  {
    title: 'Content & pages',
    blurb: 'Author pages in the visual editor and pull them into your app.',
    routes: ['/pages', '/blocks', '/forms'],
  },
  {
    title: 'Navigation',
    blurb: 'Menus and in-product help, configured without code changes.',
    routes: ['/menus', '/context-help-menu'],
  },
  {
    title: 'Onboarding & engagement',
    blurb: 'Guide, announce, and show your product in action.',
    routes: ['/tours', '/tooltips', '/demos', '/app-banner', '/webinar'],
  },
];

const byRoute = new Map(navItems.map((item) => [item.to, item]));
const grouped = new Set(GROUPS.flatMap((g) => g.routes));

export const HOME_GROUPS: HomeGroup[] = GROUPS.map(({ routes, ...group }) => ({
  ...group,
  items: routes.map((route) => byRoute.get(route)).filter((item): item is NavItem => Boolean(item)),
})).filter((group) => group.items.length > 0);

/** Modules not claimed by a group, so a new nav item can never silently disappear. */
export const HOME_RESOURCES: NavItem[] = navItems.filter((item) => !grouped.has(item.to));

export const MODULE_COUNTS: Record<string, string> = {
  '/blocks': `${BLOCKS_SUBMODULES.length} blocks`,
  '/pages': `${PAGES_SUBMODULES.length} guides`,
};

export const POPULAR_LINKS = [
  { to: '/pages/fetch-pages', label: 'Fetch Pages' },
  { to: '/pages/ai-prompts', label: 'AI Prompts' },
  { to: '/tours', label: 'Tours' },
  { to: '/app-banner', label: 'App Banner' },
  { to: '/troubleshooting', label: 'Troubleshooting' },
];
