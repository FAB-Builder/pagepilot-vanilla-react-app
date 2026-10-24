import { useState } from 'react';
import { Sparkles, Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from './Toast';
import OpenInAssistants from './ai/OpenInAssistants';

interface AiPromptBlockProps {
  /** The full prompt copied to the clipboard / shown when expanded. */
  prompt: string;
  /** Optional id prefix so multiple blocks on a page stay unique. */
  id?: string;
  /** Card heading; pass null when the surrounding section already names it. */
  title?: string | null;
  description?: string;
}

/**
 * "Integrate using AI" block. A ready-made, step-by-step prompt the user can
 * copy, or open directly in Claude, ChatGPT, Copilot, Cursor or Gemini.
 */
function AiPromptBlock({
  prompt,
  id = 'ai-prompt',
  title = 'Integrate using AI',
  description = 'Copy this prompt into your AI assistant and let it wire Page Pilot into your codebase, step by step.',
}: AiPromptBlockProps) {
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
    <div id={id} className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
            <Sparkles size={17} />
          </div>
          <div className={title ? '' : 'self-center'}>
            {title && <p className="text-sm font-semibold text-ink">{title}</p>}
            <p className={`text-sm leading-relaxed text-slate-500 ${title ? 'mt-0.5' : ''}`}>
              {description}
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
          {copied ? 'Prompt copied' : 'Copy prompt'}
        </button>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <OpenInAssistants prompt={prompt} />
        <button
          id={`${id}-toggle`}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex shrink-0 items-center gap-1.5 self-start text-xs font-medium text-brand transition-colors hover:text-brand-dark sm:self-center"
        >
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {open ? 'Hide prompt' : 'Preview prompt'}
        </button>
      </div>

      {open && (
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap border-t border-slate-200 bg-slate-900 px-5 py-4 font-mono text-[12.5px] leading-relaxed text-slate-100">
          {prompt}
        </pre>
      )}
    </div>
  );
}

export default AiPromptBlock;
