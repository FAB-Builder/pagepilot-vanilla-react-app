import type { ComponentType, SVGProps } from 'react';
import { ToursIcon, DemosIcon, TooltipsIcon, PagesIcon, ContextHelpMenuIcon, WebinarIcon, FormsIcon, AppBannerIcon } from './components/Icons';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavItem {
  to: string;
  label: string;
  description: string;
  icon: IconComponent;
}

/**
 * Top-level demo sections. Shown as nav links in the header and as
 * cards on the home page. Icons are the same module icons used in the
 * ahd-fe (PagePilot) sidebar — ported in `components/Icons.tsx`.
 */
export const navItems: NavItem[] = [
  {
    to: '/tours',
    label: 'Tours',
    description: 'Step-by-step guided walkthroughs that highlight parts of your UI.',
    icon: ToursIcon,
  },
  {
    to: '/demos',
    label: 'Demos',
    description: 'Interactive product demos embedded into your pages.',
    icon: DemosIcon,
  },
  {
    to: '/tooltips',
    label: 'Tooltips',
    description: 'Contextual hints attached to individual elements.',
    icon: TooltipsIcon,
  },
  {
    to: '/pages',
    label: 'Pages',
    description: 'Standalone page components — starting with the Lead Form that posts to the FabBuilder lead API.',
    icon: PagesIcon,
  },
  {
    to: '/context-help-menu',
    label: 'Context Help Menu',
    description: 'A right-anchored help drawer driven by a Page Pilot menu — configure topics without any code changes.',
    icon: ContextHelpMenuIcon,
  },
  {
    to: '/webinar',
    label: 'Webinar',
    description: 'Create webinars via the Page Pilot dashboard, or use the REST APIs to embed live sessions, calendars, and countdowns in your product.',
    icon: WebinarIcon,
  },
  {
    to: '/forms',
    label: 'Forms',
    description: 'Build and embed custom forms using the Form Builder, then fetch responses via the REST API.',
    icon: FormsIcon,
  },
  {
    to: '/app-banner',
    label: 'App Banner',
    description: 'Render announcement banners — simple, carousel, modal, or floater — into your app by identifier.',
    icon: AppBannerIcon,
  },
];
