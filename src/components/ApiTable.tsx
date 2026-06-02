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
    <div className="api-table-wrap">
      <table className="api-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.property}>
              <td>
                <code>{row.property}</code>
              </td>
              <td>{row.description}</td>
              <td>
                <code className="api-type">{row.type}</code>
              </td>
              <td>{row.default ? <code>{row.default}</code> : <span className="api-dash">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApiTable;
