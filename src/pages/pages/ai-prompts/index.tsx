import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import AiPromptBlock from '../../../components/AiPromptBlock';
import { PAGES_SUBMODULES } from '../subModules';
import { CONTENT_PROMPTS } from './prompts';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'How to use' },
  ...CONTENT_PROMPTS.map(({ id, title }) => ({ id, label: title })),
];

export default function AiPrompts() {
  return (
    <DocLayout
      title="AI Prompts"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            AI Prompts
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Ready-made prompts for building Page Pilot content into your app. Pick what you're
            building, copy its prompt, and paste it into Claude, ChatGPT, Cursor, or GitHub Copilot.
          </p>
        </header>

        <Section id="overview" title="How to use">
          <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>
              Each prompt is self-contained: it carries the endpoint, the request body, the response
              shape, and what to deliver, so the assistant doesn't need to read these docs.
            </li>
            <li>
              Run it from inside your project so the assistant can match your framework, folder
              structure, and existing components.
            </li>
            <li>
              Replace the placeholder workspace id with yours, and swap in your own group, slug, and
              menu names where the prompt asks for them.
            </li>
          </ul>
        </Section>

        {CONTENT_PROMPTS.map(({ id, title, description, prompt }) => (
          <Section key={id} id={id} title={title}>
            <AiPromptBlock
              id={`${id}-prompt`}
              title={null}
              description={description}
              prompt={prompt}
            />
          </Section>
        ))}
      </article>
    </DocLayout>
  );
}
