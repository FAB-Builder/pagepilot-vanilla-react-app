export interface ApiRow {
  property: string;
  description: string;
  type: string;
  default?: string;
}

interface ApiTableProps {
  rows: ApiRow[];
}

/** Ant-Design-style API reference table. */
function ApiTable({ rows }: ApiTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-slate-500">
            <th className="whitespace-nowrap border-b border-slate-200 px-4 py-2.5 font-semibold">
              Property
            </th>
            <th className="border-b border-slate-200 px-4 py-2.5 font-semibold">Description</th>
            <th className="whitespace-nowrap border-b border-slate-200 px-4 py-2.5 font-semibold">
              Type
            </th>
            <th className="whitespace-nowrap border-b border-slate-200 px-4 py-2.5 font-semibold">
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.property} className="align-top last:[&>td]:border-b-0">
              <td className="border-b border-slate-200 px-4 py-2.5">
                <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  {row.property}
                </code>
              </td>
              <td className="border-b border-slate-200 px-4 py-2.5 leading-relaxed text-slate-600">
                {row.description}
              </td>
              <td className="border-b border-slate-200 px-4 py-2.5">
                <code className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[13px] text-emerald-700">
                  {row.type}
                </code>
              </td>
              <td className="border-b border-slate-200 px-4 py-2.5">
                {row.default ? (
                  <code className="font-mono text-[13px] text-slate-700">{row.default}</code>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApiTable;
