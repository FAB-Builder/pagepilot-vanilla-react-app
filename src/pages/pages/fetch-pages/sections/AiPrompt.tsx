import { Section } from '../../../../components/DocSection';
import AiPromptBlock from '../../../../components/AiPromptBlock';
import { AI_PROMPT } from '../snippets';

function AiPrompt() {
  return (
    <Section id="ai-prompt" title="Integrate using AI">
      <p className="text-sm text-slate-600">
        Want your AI assistant to wire this up? Copy the prompt below into Cursor, Claude, or GitHub
        Copilot and it will fetch the page and its related list, with filtering, for you.
      </p>
      <AiPromptBlock id="fetch-pages-ai-prompt" prompt={AI_PROMPT} />
    </Section>
  );
}

export default AiPrompt;
