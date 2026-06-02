import { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  /** Optional language label shown in the snippet header. */
  language?: string;
  /** Optional title shown above the code block. */
  title?: string;
}

function CodeSnippet({ code, language = 'tsx', title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable (e.g. non-secure context); ignore.
    }
  };

  const lines = code.split('\n');

  return (
    <div className="snippet">
      <div className="snippet-bar">
        <span className="snippet-lang">{title ?? language}</span>
        <button type="button" className="snippet-copy" onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="snippet-code">
        <code>
          {lines.map((line, idx) => (
            <span className="snippet-line" key={idx}>
              <span className="snippet-line-no">{idx + 1}</span>
              <span className="snippet-line-text">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default CodeSnippet;
