import { AI_ASSISTANTS } from '../../lib/aiAssistants';
import BrandGlyph from './BrandGlyph';

function AiAssistantPills({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {AI_ASSISTANTS.map((assistant) => (
        <li
          key={assistant.id}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700"
        >
          <BrandGlyph icon={assistant.icon} size={16} />
          {assistant.name}
        </li>
      ))}
      <li className="inline-flex items-center rounded-full border border-dashed border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-500">
        + more
      </li>
    </ul>
  );
}

export default AiAssistantPills;
