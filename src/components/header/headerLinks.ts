import { docsNavGroups } from '../../docsNav';

export interface HeaderLink {
  label: string;
  to: string;
  isActive: (pathname: string) => boolean;
}

const inModule = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(`${base}/`);

const onboardingPaths =
  docsNavGroups.find((group) => group.label === 'Onboarding')?.items.map((item) => item.to) ?? [];

export const HEADER_LINKS: HeaderLink[] = [
  { label: 'Docs', to: '/', isActive: (p) => p === '/' },
  {
    label: 'Pages',
    to: '/pages',
    isActive: (p) => inModule(p, '/pages') && !inModule(p, '/pages/ai-prompts'),
  },
  { label: 'Blocks', to: '/blocks', isActive: (p) => inModule(p, '/blocks') },
  {
    label: 'Onboarding',
    to: onboardingPaths[0] ?? '/tours',
    isActive: (p) => onboardingPaths.some((base) => inModule(p, base)),
  },
  { label: 'AI Prompts', to: '/pages/ai-prompts', isActive: (p) => inModule(p, '/pages/ai-prompts') },
];
