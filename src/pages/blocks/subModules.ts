import type { SubModule } from '../../components/DocLayout';
import { BLOCK_ICONS } from './shared/BlockIcons';

/**
 * Sub-modules of the "Blocks" module — one per visual editor block from the
 * ahd-fe email-builder package. The left rail lists these; each is its own
 * route under /blocks. Add new blocks here as they're documented.
 *
 * Ordered to mirror the `category` grouping in the editor's Add Block menu
 * (ahd-fe: AddBlockMenu/buttons.tsx) — Text/Content first, then Actions.
 */
const ENTRIES: SubModule[] = [
  // Text/Content
  { to: '/blocks/heading', label: 'Heading' },
  { to: '/blocks/text', label: 'Text' },
  { to: '/blocks/list', label: 'List' },
  { to: '/blocks/table', label: 'Table' },
  { to: '/blocks/markdown', label: 'Markdown' },
  { to: '/blocks/quill', label: 'Quill Editor' },
  // Actions/Controls
  { to: '/blocks/button', label: 'Button' },
  { to: '/blocks/button-group', label: 'Button Group' },
  { to: '/blocks/accordion', label: 'Accordion' },
  { to: '/blocks/tabs', label: 'Tabs' },
  { to: '/blocks/stepper', label: 'Stepper' },
  // Media
  { to: '/blocks/image', label: 'Image' },
  { to: '/blocks/logo', label: 'Logo' },
  { to: '/blocks/video', label: 'Video' },
  { to: '/blocks/avatar', label: 'Avatar' },
  // Layout/Structure
  { to: '/blocks/container', label: 'Container' },
  { to: '/blocks/columns', label: 'Columns' },
  { to: '/blocks/flex-columns', label: 'Flex Columns' },
  { to: '/blocks/grid', label: 'Grid' },
  { to: '/blocks/carousel', label: 'Carousel' },
  { to: '/blocks/pagination', label: 'Pagination' },
  { to: '/blocks/marquee', label: 'Marquee' },
  { to: '/blocks/divider', label: 'Divider' },
  { to: '/blocks/spacer', label: 'Spacer' },
  { to: '/blocks/html', label: 'HTML' },
];

/**
 * Icons are attached by route rather than repeated on every entry above, so the
 * list stays readable and an entry can never drift from its glyph.
 */
export const BLOCKS_SUBMODULES: SubModule[] = ENTRIES.map((entry) => ({
  ...entry,
  icon: BLOCK_ICONS[entry.to],
}));

/** Where /blocks should land by default. */
export const BLOCKS_DEFAULT = BLOCKS_SUBMODULES[0].to;
