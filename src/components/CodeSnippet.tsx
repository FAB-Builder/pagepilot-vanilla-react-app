import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from './Toast';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

function CodeSnippet({ code, language = 'tsx', title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.show('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const lines = code.split('\n');

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 shadow-sm">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#1e1e2e] px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-xs text-slate-400">{title ?? language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy size={13} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="scroll-slim overflow-x-auto bg-[#181825] py-3">
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
