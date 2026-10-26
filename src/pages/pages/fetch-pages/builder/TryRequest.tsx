import { useState } from 'react';
import { Loader2, Play } from 'lucide-react';

interface TryRequestProps {
  url: string;
  disabled: boolean;
}

type Result =
  | { kind: 'ok'; status: number; count: number; body: string }
  | { kind: 'error'; message: string };

const PREVIEW_ROWS = 3;

/** Runs the built request in the browser and shows the count plus the first few rows. */
function TryRequest({ url, disabled }: TryRequestProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const send = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setResult({ kind: 'error', message: `Request failed with status ${res.status}.` });
        return;
      }
      const data = await res.json();
      const rows: unknown[] = data.rows ?? [];
      setResult({
        kind: 'ok',
        status: res.status,
        count: data.count ?? rows.length,
        body: JSON.stringify(
          { count: data.count, rows: rows.slice(0, PREVIEW_ROWS) },
          null,
          2,
        ),
      });
    } catch {
      setResult({
        kind: 'error',
        message: 'Network error — check the workspace id and your connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={send}
          disabled={disabled || loading}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
          Send request
        </button>
        {disabled && (
          <span className="text-xs text-slate-500">Enter your workspace id to try it live.</span>
        )}
        {result?.kind === 'ok' && (
          <span className="text-xs text-slate-500">
            <span className="font-semibold text-emerald-600">{result.status} OK</span> ·{' '}
            {result.count} matching pages · showing the first {PREVIEW_ROWS}
          </span>
        )}
      </div>

      {result?.kind === 'error' && (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
          {result.message}
        </p>
      )}
      {result?.kind === 'ok' && (
        <pre className="scroll-slim mt-3 max-h-80 overflow-auto rounded-xl bg-slate-900 p-4 font-mono text-[12.5px] leading-relaxed text-slate-200">
          <code className="whitespace-pre break-normal">{result.body}</code>
        </pre>
      )}
    </div>
  );
}

export default TryRequest;
