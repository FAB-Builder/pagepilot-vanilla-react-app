import type { ComponentType, SVGProps } from 'react';
import { ToursIcon, DemosIcon, TooltipsIcon } from './components/Icons';

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
];
