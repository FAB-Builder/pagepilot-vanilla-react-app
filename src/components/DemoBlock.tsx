import { useState, type ReactNode } from 'react';
import CodeSnippet from './CodeSnippet';

interface DemoBlockProps {
  title: string;
  description?: ReactNode;
  /** The live, interactive preview. */
  children: ReactNode;
  /** The source code shown when the user expands the snippet. */
  code: string;
  language?: string;
}

/**
 * An Ant-Design-style demo card: a live preview on top, a meta strip with the
 * title/description, and a "Show code" toggle revealing the source.
 */
function DemoBlock({ title, description, children, code, language = 'tsx' }: DemoBlockProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="demo-block">
      <div className="demo-block-preview">{children}</div>

      <div className="demo-block-meta">
        <span className="demo-block-title">{title}</span>
        {description && <p className="demo-block-desc">{description}</p>}
      </div>

      <div className="demo-block-toolbar">
        <button
          type="button"
          className="demo-block-toggle"
          onClick={() => setShowCode((v) => !v)}
          aria-expanded={showCode}
        >
          {showCode ? '⌃ Hide code' : '⌄ Show code'}
        </button>
      </div>

      {showCode && (
        <div className="demo-block-code">
          <CodeSnippet code={code} language={language} />
        </div>
      )}
    </div>
  );
}

export default DemoBlock;
