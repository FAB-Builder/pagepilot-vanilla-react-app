import { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
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
      /* clipboard unavailable */
    }
  };

  const lines = code.split('\n');

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <div className="flex items-center justify-between bg-[#1e1e2e] px-3.5 py-2">
        <span className="font-mono text-xs text-slate-400">{title ?? language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-white/15 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:bg-white/10"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[#181825] py-3">
        <code className="block font-mono text-[13px] leading-relaxed text-slate-200">
          {lines.map((line, idx) => (
            <span key={idx} className="flex">
              <span className="w-10 flex-none select-none pr-4 text-right text-slate-600">
                {idx + 1}
              </span>
              <span className="whitespace-pre pr-4">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default CodeSnippet;
