import type { SubModule } from '../../components/DocLayout';

/**
 * Sub-modules of the "Blocks" module — one per visual editor block from the
 * ahd-fe email-builder package. The left rail lists these; each is its own
 * route under /blocks. Add new blocks here as they're documented.
 */
export const BLOCKS_SUBMODULES: SubModule[] = [{ to: '/blocks/button', label: 'Button' }];

/** Where /blocks should land by default. */
export const BLOCKS_DEFAULT = BLOCKS_SUBMODULES[0].to;
