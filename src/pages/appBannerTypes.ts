/**
 * App Banner types. The `value` is the internal Page Pilot enum
 * (see appBannerEnumerators in ahd-fe); the `identifier` is the demo
 * banner published for that type and passed to renderAppBanner().
 */
export interface BannerType {
  /** Human label shown in the UI. */
  name: string;
  /** Internal Page Pilot enum value. */
  value: 'simpleBanner' | 'carousel' | 'modal' | 'floater';
  /** Demo identifier — the id of the container the banner renders into. */
  identifier: string;
  /** Short one-line summary. */
  summary: string;
  /** Longer description of how the type behaves. */
  description: string;
  /** When to reach for this type. */
  bestFor: string;
  /** Where it appears on screen. */
  placement: string;
  /** Whether it auto-renders in the live demo (vs. on button click). */
  autoRender: boolean;
}

export const BANNER_TYPES: BannerType[] = [
  {
    name: 'Simple Banner',
    value: 'simpleBanner',
    identifier: 'FAB_BANNER_TYPE_SIMPLE',
    summary: 'A single inline strip rendered into your layout.',
    description:
      'The most common banner. It renders one block of content directly into the container you place in your page — inline, in the normal document flow. It stays where you put it and scrolls with the page.',
    bestFor: 'A promotion, product update, or maintenance notice that sits within the page.',
    placement: 'Inline — wherever you put the container.',
    autoRender: true,
  },
  {
    name: 'Carousel',
    value: 'carousel',
    identifier: 'FAB_BANNER_TYPE_CROUSAL',
    summary: 'A rotating set of slides in one container.',
    description:
      'Cycles through multiple slides inside a single inline container, auto-advancing (or with controls). Each slide can carry its own message, image, and call-to-action.',
    bestFor: 'Several messages competing for the same spot — multiple offers, release notes, or channel-specific announcements.',
    placement: 'Inline — same container, rotating content.',
    autoRender: true,
  },
  {
    name: 'Modal',
    value: 'modal',
    identifier: 'FAB_BANNER_TYPE_MODAL',
    summary: 'An overlay dialog centered above your app.',
    description:
      'Opens as a dialog on top of your app with a backdrop, taking over the screen until the user acts or dismisses it. The highest-attention option — use it sparingly.',
    bestFor: 'A high-priority announcement or a call-to-action you do not want missed.',
    placement: 'Overlay — centered, above all content with a backdrop.',
    autoRender: false,
  },
  {
    name: 'Floater',
    value: 'floater',
    identifier: 'FAB_BANNER_TYPE_FLOATER',
    summary: 'A small element pinned to a corner of the viewport.',
    description:
      'A compact, persistent element that floats over a corner of the screen and stays visible as the user scrolls. Non-blocking — the user can keep working with it on screen.',
    bestFor: 'A persistent, low-friction nudge — a tip, link, or reminder that should linger.',
    placement: 'Fixed — pinned to a viewport corner, follows scroll.',
    autoRender: false,
  },
];
