import { Section } from '../../../components/DocSection';
import AiPromptBlock from '../../../components/AiPromptBlock';
import { PAGEPILOT_API_HOST, PAGEPILOT_APP_URL } from '../../../lib/ahd';

const AI_PROMPT = `You are helping me add a Context Help Menu drawer to my React app using the Page Pilot API. Follow every instruction below.

OVERVIEW
- I have a menu created in Page Pilot (${PAGEPILOT_APP_URL}) with a name I will provide.
- The drawer fetches that menu by name, renders a hierarchical tree, and loads page content when an item is clicked.

API BASE
const PAGEPILOT_API = "${PAGEPILOT_API_HOST}/tenant/YOUR_WORKSPACE_ID";
- Replace YOUR_WORKSPACE_ID with my workspace id (found in Page Pilot → Settings → General).

STEP 1 — Fetch the menu tree
- GET \`\${PAGEPILOT_API}/menu-by-name/\${menuName}\`
- Response: { configuration: HelpItem[] }
- Each HelpItem has: id, name, href (page slug), children (HelpItem[])
- Cache the result in localStorage with a 1-hour TTL so the API is not called on every open.

STEP 2 — Fetch page content on item click
- When the user clicks an item that has an href, fetch:
  GET \`\${PAGEPILOT_API}/pagebypath/\${item.href.replace(/^\\/+/, '')}\`
- Response: { name, sections: [{ id, content }] }
- Each section.content is an HTML string — sanitize with DOMPurify before rendering.

DELIVERABLE
Write a React component called ContextHelpDrawer that:
1. Accepts props: open (boolean), onClose (() => void), menuName (string).
2. On open, loads the menu from localStorage cache or fetches it.
3. Shows a searchable, expandable tree of menu items.
4. On item click (if item.href exists), fetches the page and renders its sections as sanitized HTML.
5. Has a back button to return to the menu list.
6. Renders into document.body via createPortal so it is not clipped by overflow:hidden parents.
7. Uses only React, DOMPurify, and fetch — no extra dependencies.
Add short comments explaining each step.`;

function AiPrompt() {
  return (
    <Section id="ai-prompt" title="Integrate using AI">
      <p>
        Want your AI assistant to wire up the Context Help Menu drawer in your codebase? Copy the
        prompt below into Cursor, Claude, or GitHub Copilot and it will build the full drawer for
        you — menu fetch, localStorage caching, search, page content loading, and portal rendering.
      </p>
      <AiPromptBlock id="context-help-menu-ai-prompt" prompt={AI_PROMPT} />
    </Section>
  );
}

export default AiPrompt;
