import { AI_ASSISTANTS, assistantUrl, type AiAssistant } from '../../lib/aiAssistants';
import { useToast } from '../Toast';
import BrandGlyph from './BrandGlyph';

/** "Open in" buttons — copy the prompt, then open the assistant with it pre-filled when possible. */
function OpenInAssistants({ prompt }: { prompt: string }) {
  const toast = useToast();

  const open = async (assistant: AiAssistant) => {
    const { url, prefilled } = assistantUrl(assistant, prompt);
    window.open(url, '_blank', 'noopener,noreferrer');
    try {
      await navigator.clipboard.writeText(prompt);
      toast.show(
        prefilled
          ? `Opening ${assistant.name} — prompt also copied`
          : `Prompt copied — paste it into ${assistant.name}`,
      );
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-medium text-slate-500">Open in</span>
      {AI_ASSISTANTS.map((assistant) => (
        <button
          key={assistant.id}
          type="button"
          onClick={() => open(assistant)}
          title={`Open this prompt in ${assistant.name}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-ink"
        >
          <BrandGlyph icon={assistant.icon} size={14} />
          {assistant.name}
        </button>
      ))}
    </div>
  );
}

export default OpenInAssistants;
