import { useState, type ReactNode } from 'react';
import CodeSnippet from './CodeSnippet';

interface DemoBlockProps {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  code: string;
  language?: string;
}

/** Ant-Design-style demo card: live preview, meta strip, "Show code" toggle. */
function DemoBlock({ title, description, children, code, language = 'tsx' }: DemoBlockProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="px-6 py-8">{children}</div>

      <div className="border-t border-dashed border-slate-200 px-6 pb-3 pt-4">
        <span className="text-sm font-semibold">{title}</span>
        {description && <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>}
      </div>

      <div className="flex justify-end px-6 pb-3">
        <button
          type="button"
          onClick={() => setShowCode((v) => !v)}
          aria-expanded={showCode}
          className="rounded-md px-1.5 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand-tint"
        >
          {showCode ? '⌃ Hide code' : '⌄ Show code'}
        </button>
      </div>

      {showCode && (
        <div className="border-t border-slate-200 bg-slate-50 px-6 pb-6 pt-4">
          <CodeSnippet code={code} language={language} />
        </div>
      )}
    </div>
  );
}

export default DemoBlock;
