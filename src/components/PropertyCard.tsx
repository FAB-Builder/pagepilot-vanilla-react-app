import type { ReactNode } from 'react';

interface PropertyCardProps {
  /** e.g. "string", "string[]", "'top' | 'bottom' | 'left' | 'right'" */
  type: string;
  required?: boolean;
  defaultValue?: string;
  children: ReactNode;
}

/** A meta strip describing a single tour property (type / required / default). */
function PropertyCard({ type, required, defaultValue, children }: PropertyCardProps) {
  return (
    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-emerald-700">
          {type}
        </span>
        {required ? (
          <span className="rounded-md bg-rose-50 px-2 py-0.5 font-medium text-rose-600">
            required
          </span>
        ) : (
          <span className="rounded-md bg-slate-200 px-2 py-0.5 font-medium text-slate-600">
            optional
          </span>
        )}
        {defaultValue && (
          <span className="text-slate-500">
            default: <code className="font-mono text-slate-700">{defaultValue}</code>
          </span>
        )}
      </div>
      <div className="text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

export default PropertyCard;
