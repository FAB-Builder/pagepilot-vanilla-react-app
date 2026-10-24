import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import CodeSnippet from '../../../../components/CodeSnippet';
import BuilderField, { inputClass } from './BuilderField';
import FieldChips from './FieldChips';
import UrlPreview from './UrlPreview';
import TryRequest from './TryRequest';
import {
  DEFAULT_QUERY,
  FIELD_OPTIONS,
  SORT_FIELDS,
  buildFetchCode,
  buildListUrl,
  isPlaceholderWorkspace,
  type ListQuery,
  type PageStatus,
  type SortDirection,
} from './listQuery';

/** Interactive builder for GET /client/page — fill the form, copy a complete endpoint. */
function EndpointBuilder() {
  const [query, setQuery] = useState<ListQuery>(DEFAULT_QUERY);
  const set = <K extends keyof ListQuery>(key: K, value: ListQuery[K]) =>
    setQuery((q) => ({ ...q, [key]: value }));

  const url = useMemo(() => buildListUrl(query), [query]);
  const code = useMemo(() => buildFetchCode(query), [query]);

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">Endpoint builder</p>
          <p className="text-xs text-slate-500">Pick your filters — the URL and code update as you type.</p>
        </div>
        <button
          type="button"
          onClick={() => setQuery(DEFAULT_QUERY)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      <div className="grid gap-5 px-5 py-5 sm:grid-cols-2">
        <BuilderField
          label="Workspace id"
          htmlFor="eb-workspace"
          hint="Found in Page Pilot. Required to send a live request."
        >
          <input
            id="eb-workspace"
            value={query.workspaceId}
            onChange={(e) => set('workspaceId', e.target.value)}
            onFocus={(e) => isPlaceholderWorkspace(e.target.value) && e.target.select()}
            className={`${inputClass} font-mono`}
            spellCheck={false}
          />
        </BuilderField>

        <BuilderField label="Groups" htmlFor="eb-groups" hint="Comma-separated, e.g. blogs, news.">
          <input
            id="eb-groups"
            value={query.groups}
            onChange={(e) => set('groups', e.target.value)}
            placeholder="blogs"
            className={inputClass}
          />
        </BuilderField>

        <BuilderField label="Status" htmlFor="eb-status">
          <select
            id="eb-status"
            value={query.status}
            onChange={(e) => set('status', e.target.value as PageStatus)}
            className={inputClass}
          >
            <option value="live">live — published only</option>
            <option value="draft">draft — unpublished only</option>
            <option value="any">any — no status filter</option>
          </select>
        </BuilderField>

        <BuilderField label="Sort by" htmlFor="eb-sort">
          <div className="flex gap-2">
            <select
              id="eb-sort"
              value={query.sortField}
              onChange={(e) => set('sortField', e.target.value)}
              className={inputClass}
            >
              {SORT_FIELDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <select
              aria-label="Sort direction"
              value={query.sortDirection}
              onChange={(e) => set('sortDirection', e.target.value as SortDirection)}
              className={`${inputClass} w-40`}
            >
              <option value="DESC">Newest / Z–A</option>
              <option value="ASC">Oldest / A–Z</option>
            </select>
          </div>
        </BuilderField>

        <BuilderField label="Limit" htmlFor="eb-limit" hint="Leave empty to return every match.">
          <input
            id="eb-limit"
            type="number"
            min={1}
            value={query.limit}
            onChange={(e) => set('limit', e.target.value)}
            placeholder="all"
            className={inputClass}
          />
        </BuilderField>

        <BuilderField label="Offset" htmlFor="eb-offset" hint="Skip this many pages — for pagination.">
          <input
            id="eb-offset"
            type="number"
            min={0}
            value={query.offset}
            onChange={(e) => set('offset', e.target.value)}
            className={inputClass}
          />
        </BuilderField>

        <BuilderField label="Fields to return" className="sm:col-span-2">
          <FieldChips
            options={FIELD_OPTIONS}
            selected={query.fields}
            onChange={(fields) => set('fields', fields)}
          />
        </BuilderField>

        <label className="flex items-start gap-2.5 sm:col-span-2">
          <input
            type="checkbox"
            checked={query.includeSections}
            onChange={(e) => set('includeSections', e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-600">
            Include section HTML
            <span className="block text-xs text-slate-400">
              Off by default — page bodies make list responses very large.
            </span>
          </span>
        </label>
      </div>

      <div className="space-y-4 border-t border-slate-200 bg-slate-50 px-5 py-5">
        <UrlPreview url={url} />
        <TryRequest url={url} disabled={isPlaceholderWorkspace(query.workspaceId)} />
        <CodeSnippet code={code} language="js" />
      </div>
    </div>
  );
}

export default EndpointBuilder;
