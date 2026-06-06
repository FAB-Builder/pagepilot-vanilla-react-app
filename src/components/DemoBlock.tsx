import { useState, type ReactNode } from 'react';
import { Code2, ChevronUp } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

interface DemoBlockProps {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  code: string;
  language?: string;
}

function DemoBlock({ title, description, children, code, language = 'tsx' }: DemoBlockProps) {
  const [showCode, setShowCode] = useState(true);

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-card">
      {children && (
        <div className="px-6 py-6">{children}</div>
      )}

      <div className="border-t border-dashed border-slate-200 px-6 pb-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-sm font-semibold text-ink">{title}</span>
            {description && (
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowCode((v) => !v)}
            aria-expanded={showCode}
            title={showCode ? 'Hide code' : 'Show code'}
            className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand"
          >
            {showCode ? <ChevronUp size={14} /> : <Code2 size={14} />}
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        </div>
      </div>

      {showCode && (
        <div className="bg-slate-50 px-6 pb-6 pt-4">
          <CodeSnippet code={code} language={language} />
        </div>
      )}
    </div>
  );
}

export default DemoBlock;
