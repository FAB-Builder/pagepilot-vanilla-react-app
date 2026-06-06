import { Compass, MonitorPlay, Lightbulb, type LucideIcon } from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Top-level demo sections. Shown as nav links in the header and as
 * cards on the home page.
 */
export const navItems: NavItem[] = [
  {
    to: '/tours',
    label: 'Tours',
    description: 'Step-by-step guided walkthroughs that highlight parts of your UI.',
    icon: Compass,
  },
  {
    to: '/demos',
    label: 'Demos',
    description: 'Interactive product demos embedded into your pages.',
    icon: MonitorPlay,
  },
  {
    to: '/tooltips',
    label: 'Tooltips',
    description: 'Contextual hints attached to individual elements.',
    icon: Lightbulb,
  },
];
