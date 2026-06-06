import { useState } from 'react';
import { Sparkles, Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from './Toast';

interface AiPromptBlockProps {
  /** The full prompt copied to the clipboard / shown when expanded. */
  prompt: string;
  /** Optional id prefix so multiple blocks on a page stay unique. */
  id?: string;
}

/**
 * "Integrate using AI" block. Drops a ready-made, step-by-step prompt the
 * user can hand to Claude / Cursor / Copilot to wire PagePilot into their
 * own codebase. Mirrors the "Copy AI Setup Prompt" affordance from the
 * PagePilot admin (ahd-fe ConfigureDialog), reworked for the docs site.
 */
function AiPromptBlock({ prompt, id = 'ai-prompt' }: AiPromptBlockProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast.show('AI prompt copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div
      id={id}
      className="mb-6 overflow-hidden rounded-xl border border-brand/20 bg-gradient-to-b from-brand-tint/70 to-white shadow-card"
    >
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-white">
            <Sparkles size={17} />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Integrate using AI</p>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
              Copy this prompt into Cursor, Claude, or GitHub Copilot and let it wire PagePilot
              into your codebase, step by step.
            </p>
          </div>
        </div>
        <button
          id={`${id}-copy`}
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-brand px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:self-center"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Prompt copied' : 'Copy AI prompt'}
        </button>
      </div>

      <button
        id={`${id}-toggle`}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 border-t border-brand/15 px-5 py-2.5 text-xs font-medium text-brand transition-colors hover:bg-brand-tint"
      >
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {open ? 'Hide prompt' : 'Preview prompt'}
      </button>

      {open && (
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap border-t border-brand/15 bg-slate-900 px-5 py-4 font-mono text-[12.5px] leading-relaxed text-slate-100">
          {prompt}
        </pre>
      )}
    </div>
  );
}

export default AiPromptBlock;
