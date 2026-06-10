import DocLayout, { type DocSection } from '../../components/DocLayout';
import { Section, Code } from '../../components/DocSection';
import DemoBlock from '../../components/DemoBlock';
import ApiTable from '../../components/ApiTable';
import AiPromptBlock from '../../components/AiPromptBlock';
import {
  FORM_BUILDER_FE_BASE,
  FORM_BUILDER_API_BASE,
  FORM_WORKSPACE_ID,
  formBuilderApiBase,
  CS_GENERAL_SETTINGS_URL,
} from '../../lib/ahd';

const API_BASE_SNIPPET = formBuilderApiBase(FORM_WORKSPACE_ID);
const FORM_BUILDER_CREATE_URL = `${FORM_BUILDER_FE_BASE}/tenant/${FORM_WORKSPACE_ID}/form/create`;

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'create-form', label: 'Create a form' },
  { id: 'embed', label: 'Embed a form' },
  { id: 'fetch-forms', label: 'Fetch forms' },
  { id: 'fetch-responses', label: 'Fetch responses' },
  { id: 'delete-form', label: 'Delete a form' },
  { id: 'ai-prompt', label: 'Integrate using AI' },
  { id: 'api', label: 'API reference' },
];

export default function Forms() {
  return (
    <DocLayout title="Forms" sections={SECTIONS}>
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Forms
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Build fully custom forms in the{' '}
            <a
              href={FORM_BUILDER_CREATE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Form Builder
            </a>
            , then embed them in your product or fetch submissions via the REST API — no backend
            required.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Forms is a separate microservice. You design your form visually in the{' '}
            <a
              href={FORM_BUILDER_CREATE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Form Builder UI
            </a>
            , which runs at{' '}
            <Code>cs-app-form-builder-fe.web.app</Code>. Once published, you get a shareable{' '}
            <strong>view URL</strong> you can embed directly in an <Code>&lt;iframe&gt;</Code>, plus
            REST endpoints to list forms, read responses, and delete forms.
          </p>
          <p className="mt-3">
            Every request to the API is scoped to your workspace id — the same id you use across
            the rest of the Page Pilot platform. Copy yours from{' '}
            <a
              href={CS_GENERAL_SETTINGS_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Settings → General Settings
            </a>
            .
          </p>
          <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Build your form</strong> — open the Form Builder,
              drag in fields, configure validation and submit behaviour, then publish.
            </li>
            <li>
              <strong className="text-ink">2. Embed or link it</strong> — drop the view URL into
              an <Code>&lt;iframe&gt;</Code> in your product, or link to it directly.
            </li>
            <li>
              <strong className="text-ink">3. Read responses</strong> — poll the responses endpoint
              to pull submissions into your own pipeline.
            </li>
          </ol>
        </Section>

        <Section id="create-form" title="Create a form">
          <p>
            Forms are created entirely in the browser-based Form Builder — there is no API endpoint
            to create a form programmatically. Open the builder for your workspace:
          </p>
          <DemoBlock
            title="Form Builder URL"
            description="Replace YOUR_WORKSPACE_ID with your workspace id from General Settings."
            code={FORM_BUILDER_URL_SNIPPET}
          />
          <p className="text-sm text-slate-600">
            Inside the builder you can:
          </p>
          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Add fields</strong> — drag in text inputs, email, phone,
              dropdowns, checkboxes, radio groups, date pickers, file uploads, ratings, and more.
            </li>
            <li>
              <strong className="text-ink">Configure validation</strong> — mark fields required,
              set min/max lengths, regex patterns, or custom error messages per field.
            </li>
            <li>
              <strong className="text-ink">Conditional logic</strong> — show or hide fields based
              on the value of another field.
            </li>
            <li>
              <strong className="text-ink">Customise appearance</strong> — set the form title,
              description, button label, success message, and redirect URL after submission.
            </li>
            <li>
              <strong className="text-ink">Publish</strong> — toggle the form status from{' '}
              <Code>draft</Code> → <Code>live</Code> to make it accessible.
            </li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Every saved form gets an <Code>id</Code> that you use in all API calls below.
          </p>
        </Section>

        <Section id="embed" title="Embed a form">
          <p>
            The simplest way to put a form in your product is an <Code>&lt;iframe&gt;</Code>
            pointed at the form's view URL. The view URL follows this pattern:
          </p>
          <DemoBlock
            title="View URL pattern"
            description="The URL that renders the live form — drop this into an iframe src."
            code={VIEW_URL_SNIPPET}
          />
          <p className="text-sm text-slate-600">
            Drop it into an <Code>&lt;iframe&gt;</Code> wherever you need the form:
          </p>
          <DemoBlock
            title="Embed snippet"
            description="A ready-to-paste iframe. Adjust the width/height to fit your layout."
            code={EMBED_SNIPPET}
          />
          <p className="text-sm text-slate-600">
            After a visitor submits, the form shows the success message you configured in the
            builder. If you set a redirect URL in the builder it navigates the iframe there
            instead.
          </p>
        </Section>

        <Section id="fetch-forms" title="Fetch forms">
          <p>
            Use the list endpoint to retrieve all forms for your workspace. This is useful for
            building a form picker, syncing form metadata to your own database, or checking
            which forms are currently live.
          </p>
          <DemoBlock
            title="List forms"
            description="Fetch all forms for your workspace — returns an array of form objects."
            code={LIST_FORMS_SNIPPET}
          />
          <p className="text-sm text-slate-600">
            Each form object in the response includes:
          </p>
          <ApiTable
            rows={[
              { property: '_id', description: 'Unique form id. Use this in all other API calls.', type: 'string' },
              { property: 'name', description: 'Display name set in the builder.', type: 'string' },
              { property: 'status', description: 'Current state of the form.', type: "'draft' | 'live' | 'paused'" },
              { property: 'createdAt', description: 'ISO 8601 timestamp of when the form was created.', type: 'string' },
              { property: 'updatedAt', description: 'ISO 8601 timestamp of the last edit.', type: 'string' },
            ]}
          />
        </Section>

        <Section id="fetch-responses" title="Fetch responses">
          <p>
            Pull submissions for a specific form. Responses are paginated — use{' '}
            <Code>limit</Code> and <Code>offset</Code> to page through them.
          </p>
          <DemoBlock
            title="Fetch responses"
            description="Returns an array of submission objects for the given form id."
            code={FETCH_RESPONSES_SNIPPET}
          />
          <p className="text-sm text-slate-600">
            Each response object contains:
          </p>
          <ApiTable
            rows={[
              { property: '_id', description: 'Unique submission id.', type: 'string' },
              { property: 'formId', description: 'Id of the form the response belongs to.', type: 'string' },
              { property: 'data', description: "Key-value map of field names to the visitor's answers.", type: 'Record<string, any>' },
              { property: 'submittedAt', description: 'ISO 8601 timestamp of when the form was submitted.', type: 'string' },
            ]}
          />
          <p className="mt-3 text-sm text-slate-600">
            You can also view and export responses in the Form Builder dashboard by opening a form
            and navigating to its <strong>Responses</strong> tab.
          </p>
        </Section>

        <Section id="delete-form" title="Delete a form">
          <p>
            Send a <Code>DELETE</Code> request with the form id to permanently remove the form and
            all of its responses. This cannot be undone.
          </p>
          <DemoBlock
            title="Delete a form"
            description="Permanently deletes the form and all its submissions."
            code={DELETE_FORM_SNIPPET}
          />
        </Section>

        <Section id="ai-prompt" title="Integrate using AI">
          <p className="text-sm text-slate-600">
            Copy this prompt into Cursor, Claude, or GitHub Copilot and your AI assistant will
            wire up the list, embed, and responses flow for you.
          </p>
          <AiPromptBlock id="forms-ai-prompt" prompt={AI_PROMPT} />
        </Section>

        <Section id="api" title="API reference">
          <h3 className="mb-2 mt-4 text-base font-semibold text-ink">Base URL</h3>
          <ApiTable
            rows={[
              {
                property: 'Base URL',
                description: 'All endpoints are relative to this. Scoped to your workspace id.',
                type: API_BASE_SNIPPET,
              },
              {
                property: 'Authorization',
                description: 'Pass your session token as a Bearer token in the Authorization header.',
                type: 'Bearer <token>',
              },
            ]}
          />

          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Endpoints</h3>
          <ApiTable
            rows={[
              {
                property: 'GET /form',
                description: 'List all forms for the workspace.',
                type: `${API_BASE_SNIPPET}/form`,
              },
              {
                property: 'GET /form/:id/responses',
                description: 'Fetch paginated submissions for a specific form.',
                type: `${API_BASE_SNIPPET}/form/:id/responses`,
              },
              {
                property: 'DELETE /form/:id',
                description: 'Permanently delete a form and all its responses.',
                type: `${API_BASE_SNIPPET}/form/:id`,
              },
            ]}
          />

          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">
            Query parameters — GET /form/:id/responses
          </h3>
          <ApiTable
            rows={[
              { property: 'limit', description: 'Number of responses to return per page.', type: 'number', default: '10' },
              { property: 'offset', description: 'Number of responses to skip (for pagination).', type: 'number', default: '0' },
            ]}
          />

          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Form status values</h3>
          <ApiTable
            rows={[
              { property: 'draft', description: 'Form is saved but not yet publicly accessible.', type: 'string' },
              { property: 'live', description: 'Form is published and accepting responses.', type: 'string' },
              { property: 'paused', description: 'Form is temporarily not accepting new responses.', type: 'string' },
            ]}
          />
        </Section>
      </article>
    </DocLayout>
  );
}

/* -------------------------------- Snippets -------------------------------- */

const FORM_BUILDER_URL_SNIPPET = `// Open this URL in a browser to launch the Form Builder for your workspace.
// Replace YOUR_WORKSPACE_ID with the id from Settings → General Settings.
const FORM_BUILDER_URL = '${FORM_BUILDER_FE_BASE}/tenant/YOUR_WORKSPACE_ID/form/create';`;

const VIEW_URL_SNIPPET = `// Pattern: ${FORM_BUILDER_FE_BASE}/tenant/{workspaceId}/form/{formId}/view
//
// workspaceId — your workspace id (Settings → General Settings)
// formId      — the _id returned by GET /form

const viewUrl = \`${FORM_BUILDER_FE_BASE}/tenant/\${workspaceId}/form/\${formId}/view\`;`;

const EMBED_SNIPPET = `// Drop this wherever you want the form to appear in your UI.
// Adjust the height to match the number of fields in your form.

function FormEmbed({ workspaceId, formId }) {
  const src = \`${FORM_BUILDER_FE_BASE}/tenant/\${workspaceId}/form/\${formId}/view\`;

  return (
    <iframe
      src={src}
      title="Contact form"
      width="100%"
      height="600"
      style={{ border: 'none' }}
      allow="camera"           // only needed if your form has a file-upload field
    />
  );
}`;

const LIST_FORMS_SNIPPET = `// Replace YOUR_WORKSPACE_ID and YOUR_AUTH_TOKEN.
const API_BASE = '${FORM_BUILDER_API_BASE}/tenant/YOUR_WORKSPACE_ID';

async function listForms() {
  const res = await fetch(\`\${API_BASE}/form\`, {
    headers: { Authorization: 'Bearer YOUR_AUTH_TOKEN' },
  });
  const data = await res.json();
  // data is an array of form objects: [{ _id, name, status, createdAt, … }, …]
  return data;
}`;

const FETCH_RESPONSES_SNIPPET = `// Replace YOUR_WORKSPACE_ID, YOUR_AUTH_TOKEN, and FORM_ID.
const API_BASE = '${FORM_BUILDER_API_BASE}/tenant/YOUR_WORKSPACE_ID';

async function fetchResponses(formId, { limit = 10, offset = 0 } = {}) {
  const url = new URL(\`\${API_BASE}/form/\${formId}/responses\`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('offset', String(offset));

  const res = await fetch(url.toString(), {
    headers: { Authorization: 'Bearer YOUR_AUTH_TOKEN' },
  });
  const data = await res.json();
  // data is an array: [{ _id, formId, data: { fieldName: value, … }, submittedAt }, …]
  return data;
}

// Example — page through all responses 20 at a time:
async function* allResponses(formId) {
  const PAGE = 20;
  let offset = 0;
  while (true) {
    const page = await fetchResponses(formId, { limit: PAGE, offset });
    if (!page.length) break;
    yield* page;
    if (page.length < PAGE) break;
    offset += PAGE;
  }
}`;

const DELETE_FORM_SNIPPET = `// Replace YOUR_WORKSPACE_ID, YOUR_AUTH_TOKEN, and FORM_ID.
const API_BASE = '${FORM_BUILDER_API_BASE}/tenant/YOUR_WORKSPACE_ID';

async function deleteForm(formId) {
  const res = await fetch(\`\${API_BASE}/form/\${formId}\`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer YOUR_AUTH_TOKEN' },
  });
  if (!res.ok) throw new Error(\`Delete failed: \${res.status}\`);
  // Form and all its responses are permanently removed.
}`;

const AI_PROMPT = `You are helping me integrate the Page Pilot Forms microservice into my React app.

GOAL
1. Fetch the list of live forms for my workspace and render them as cards.
2. When the user clicks a card, open an iframe pointing at that form's view URL.
3. Add a "Responses" button that fetches and displays the latest 20 submissions for the selected form.

API
- Base: ${FORM_BUILDER_API_BASE}/tenant/YOUR_WORKSPACE_ID
  (replace YOUR_WORKSPACE_ID with the id from CS app → Settings → General Settings: ${CS_GENERAL_SETTINGS_URL})
- List forms:        GET  /form
- Fetch responses:   GET  /form/:id/responses?limit=20&offset=0
- Delete a form:     DELETE /form/:id
- Embed URL pattern: ${FORM_BUILDER_FE_BASE}/tenant/YOUR_WORKSPACE_ID/form/:id/view

AUTH
All requests need: Authorization: Bearer YOUR_AUTH_TOKEN

COMPONENTS TO BUILD
1. FormList — fetches GET /form, filters to status === 'live', renders a card grid.
   Each card shows name, status badge, and two buttons: "Open" and "Responses".
2. FormEmbed — renders an <iframe src={viewUrl}> at 100% width, 600px height, no border.
3. FormResponses — fetches GET /form/:id/responses?limit=20&offset=0 and renders a table
   with columns: Submission ID, Submitted At, and one column per field in data.

CONSTRAINTS
- Plain React with hooks — no form libraries, no extra dependencies beyond React.
- Fetch with the native fetch API; handle loading and error states.
- Keep each component in its own file.`;
