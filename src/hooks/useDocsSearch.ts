import { useMemo } from 'react';
import { SEARCH_INDEX, type SearchEntry } from '../searchIndex';

const MAX_RESULTS = 12;
const DEFAULT_RESULTS = SEARCH_INDEX.filter((entry) => entry.description).slice(0, 8);

function scoreEntry(entry: SearchEntry, q: string): number {
  const title = entry.title.toLowerCase();
  const module = entry.module.toLowerCase();
  const keywords = entry.keywords?.toLowerCase() ?? '';

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (module.includes(q)) return 40;
  if (keywords.includes(q)) return 20;
  return 0;
}

/** Ranked search results; with an empty query, the top-level modules. */
export function useDocsSearch(query: string): SearchEntry[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DEFAULT_RESULTS;
    return SEARCH_INDEX.map((entry) => ({ entry, score: scoreEntry(entry, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((r) => r.entry);
  }, [query]);
}
