export interface NavItem {
  to: string;
  label: string;
  description: string;
  emoji: string;
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
    emoji: '🧭',
  },
  {
    to: '/app-banner',
    label: 'App Banner',
    description: 'Announcement banners rendered anywhere in your app.',
    emoji: '📣',
  },
  {
    to: '/demos',
    label: 'Demos',
    description: 'Interactive product demos embedded into your pages.',
    emoji: '🎬',
  },
  {
    to: '/tooltips',
    label: 'Tooltips',
    description: 'Contextual hints attached to individual elements.',
    emoji: '💡',
  },
];
