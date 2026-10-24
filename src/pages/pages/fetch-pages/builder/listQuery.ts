import { LEAD_APPLICATION_ID, PAGEPILOT_API_HOST } from '../../../../lib/ahd';

export type PageStatus = 'live' | 'draft' | 'any';
export type SortDirection = 'DESC' | 'ASC';

export interface ListQuery {
  workspaceId: string;
  groups: string;
  status: PageStatus;
  fields: string[];
  sortField: string;
  sortDirection: SortDirection;
  limit: string;
  offset: string;
  includeSections: boolean;
}

export const FIELD_OPTIONS = [
  'slug',
  'name',
  'title',
  'metaDescription',
  'thumbnailImage',
  'tags',
  'groups',
  'createdAt',
  'updatedAt',
];

export const SORT_FIELDS = ['createdAt', 'updatedAt', 'name', 'title'];

export const DEFAULT_QUERY: ListQuery = {
  workspaceId: LEAD_APPLICATION_ID,
  groups: 'blogs',
  status: 'live',
  fields: ['slug', 'name', 'title'],
  sortField: 'createdAt',
  sortDirection: 'DESC',
  limit: '20',
  offset: '0',
  includeSections: false,
};

export const isPlaceholderWorkspace = (id: string) => !id.trim() || id === LEAD_APPLICATION_ID;

const splitGroups = (groups: string) =>
  groups
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean);

/** Ordered [key, value] pairs, in the order a reader would expect to see them. */
export function buildParams(query: ListQuery): [string, string][] {
  const params: [string, string][] = splitGroups(query.groups).map((g) => ['filter[groups][]', g]);
  if (query.status !== 'any') params.push(['filter[status]', query.status]);
  if (!query.includeSections) params.push(['includeSections', 'false']);
  if (query.fields.length) params.push(['select', query.fields.join(' ')]);
  params.push(['orderBy', `${query.sortField}_${query.sortDirection}`]);
  if (query.limit.trim()) params.push(['limit', query.limit.trim()]);
  if (query.offset.trim() && query.offset.trim() !== '0') params.push(['offset', query.offset.trim()]);
  return params;
}

/** Readable, valid URL: brackets stay literal, everything else is percent-encoded. */
export function buildListUrl(query: ListQuery): string {
  const base = `${PAGEPILOT_API_HOST}/tenant/${query.workspaceId.trim() || LEAD_APPLICATION_ID}/client/page`;
  const qs = buildParams(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return qs ? `${base}?${qs}` : base;
}

export function buildFetchCode(query: ListQuery): string {
  return `const url = '${buildListUrl(query)}';

const res = await fetch(url);
const data = await res.json();

console.log(data.count); // total matching pages
console.log(data.rows);  // the pages themselves`;
}
