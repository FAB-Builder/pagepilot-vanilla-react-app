import {
  LEAD_API_HOST,
  LEAD_APPLICATION_ID,
  leadApiBase,
  CS_GENERAL_SETTINGS_URL,
} from '../lib/ahd';
import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';
import PropertyCard from '../components/PropertyCard';
import AiPromptBlock from '../components/AiPromptBlock';

/**
 * "Pages" module — standalone page-level components. The first one is the
 * Lead Form: a contact / lead capture form that posts submissions to the
 * FabBuilder lead API.
 */

// Lead API base, shown in docs/snippets with a placeholder application id.
const LEAD_BASE = leadApiBase(LEAD_APPLICATION_ID);

// Same base, used inside the code snippet strings below.
const LEAD_BASE_SNIPPET = `${LEAD_API_HOST}/tenant/${LEAD_APPLICATION_ID}`;

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'integration', label: 'Integration' },
  { id: 'ai-prompt', label: 'Integrate using AI' },
  { id: 'fields', label: 'Form fields' },
  { id: 'payload', label: 'Request payload' },
  { id: 'recaptcha', label: 'reCAPTCHA' },
  { id: 'success', label: 'Success & errors' },
  { id: 'api', label: 'API reference' },
];

/* ------------------------------- Layout -------------------------------- */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">{title}</h2>
      <div className="space-y-3 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
    {children}
  </code>
);

/** The fields collected by the form — dynamic, so listed not tabled. */
const FORM_FIELDS = [
  { name: 'firstName', note: "Visitor's first name. Sent as `firstName`." },
  { name: 'businessEmail', note: 'Email address. Sent as `email`.' },
  { name: 'phoneNumber', note: 'Phone number. Sent as `phone`.' },
  { name: 'companyName', note: 'Company name. Folded into `description`.' },
  { name: 'message', note: 'Free-text enquiry. Sent inside `messageInfo.text`.' },
];

function Pages() {
  return (
    <DocLayout title="Lead Form" sections={SECTIONS}>
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted/70">
            Pages
          </span>
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Lead Form
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A self-contained contact / lead capture form that posts submissions to the FabBuilder
            lead API. Drop it into any React app — it has no dependencies beyond React.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            The Lead Form collects a visitor's name, email, phone, company, and message, then sends
            it to the lead endpoint at <Code>{`${LEAD_BASE}/lead`}</Code> using an{' '}
            <Code>XMLHttpRequest</Code>. On success it clears and shows a thank-you state; on failure
            it surfaces the server error inline.
          </p>
          <p>
            The endpoint is scoped to your <strong>application id</strong> — replace{' '}
            <Code>{LEAD_APPLICATION_ID}</Code> in the URL with yours. You can find it in the CS app
            under{' '}
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
        </Section>

        <Section id="integration" title="Integration">
          <p>
            Drop the component into any page. It has no external runtime dependency beyond React; the
            request is sent with a plain <Code>XMLHttpRequest</Code>.
          </p>

          <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Copy the component</strong> — drop{' '}
              <Code>LeadForm</Code> into your <Code>components/</Code> (or <Code>pages/</Code>)
              folder.
            </li>
            <li>
              <strong className="text-ink">2. Set your application id</strong> — replace{' '}
              <Code>{LEAD_APPLICATION_ID}</Code> in <Code>LEAD_API</Code> with your own. Get it from
              the CS app at{' '}
              <a
                href={CS_GENERAL_SETTINGS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                Settings → General Settings
              </a>
              .
            </li>
            <li>
              <strong className="text-ink">3. Tag your leads</strong> — set the <Code>tags</Code>{' '}
              array (e.g. <Code>['CX']</Code>) so leads are categorised on the dashboard.
            </li>
            <li>
              <strong className="text-ink">4. (Optional) Add reCAPTCHA</strong> — generate a token
              and add it to the payload as <Code>token</Code> (see the reCAPTCHA section).
            </li>
          </ol>

          <h3 className="mt-6 text-base font-semibold text-ink">React component (copy-paste)</h3>
          <p className="text-sm text-slate-600">
            The complete component. The fields are driven by a config array, so add or remove inputs
            by editing it.
          </p>
          <DemoBlock
            title="LeadForm.tsx"
            description="Collects the fields and posts the lead via XMLHttpRequest."
            code={COMPONENT_CODE}
          />

          <h3 className="mt-6 text-base font-semibold text-ink">Just the API call</h3>
          <p className="text-sm text-slate-600">
            If you already have a form, you only need this submit helper.
          </p>
          <DemoBlock
            title="submitLead()"
            description="Builds the payload and posts it via XMLHttpRequest."
            code={HELPER_CODE}
          />
        </Section>

        <Section id="ai-prompt" title="Integrate using AI">
          <p className="text-sm text-slate-600">
            Hand this prompt to Cursor, Claude, or GitHub Copilot to scaffold the Lead Form and wire
            the API call in your own codebase.
          </p>
          <AiPromptBlock id="pages-ai-prompt" prompt={AI_PROMPT} />
        </Section>

        <Section id="fields" title="Form fields">
          <p>
            The form is built from a <strong>dynamic field config</strong> — add, remove, or reorder
            fields by editing the config array. Each field maps to an API key as noted.
          </p>
          <ul className="my-2 space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            {FORM_FIELDS.map((f) => (
              <li key={f.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <Code>{f.name}</Code>
                <span>— {f.note}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="payload" title="Request payload">
          <p>
            The form fields are mapped to the API's field names and split across the query string and
            the JSON body. The flat <Code>payload</Code> object is sent <em>both</em> as the query
            string and nested under <Code>data</Code> in the body.
          </p>
          <DemoBlock
            title="Field mapping → request"
            description="How the inputs become the request to /lead."
            code={PAYLOAD_CODE}
          />
          <PropertyCard type="string[]" defaultValue="['CX']">
            <span>
              <strong>tags</strong> — categorises the lead on the dashboard.
            </span>
          </PropertyCard>
          <PropertyCard type="{ pageUrl: string }" defaultValue="window.location.href">
            <span>
              <strong>sourceDetail</strong> — where the lead came from; includes the current page
              URL. Merge in any tracking params you want to capture.
            </span>
          </PropertyCard>
        </Section>

        <Section id="recaptcha" title="reCAPTCHA (optional)">
          <p>
            To protect the endpoint with Google reCAPTCHA v3, generate a token on submit and send it
            as <Code>token</Code> in the payload. Wire it in only if your endpoint enforces it.
          </p>
          <DemoBlock
            title="Adding reCAPTCHA v3"
            description="Generate a token on submit, then include it in the payload."
            code={RECAPTCHA_CODE}
          />
        </Section>

        <Section id="success" title="Success & errors">
          <p>
            On a <Code>2xx</Code> response the form clears and shows a success state. You can also
            redirect to a thank-you route or fire a conversion event in the success branch.
          </p>
          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Success</strong> — reset the form, show a thank-you
              message (or redirect / fire a conversion event).
            </li>
            <li>
              <strong className="text-ink">Server error</strong> — parse{' '}
              <Code>xhr.responseText</Code> and show the message inline.
            </li>
            <li>
              <strong className="text-ink">Network error</strong> — the <Code>xhr.onerror</Code>{' '}
              handler fires; show a generic "check your connection" message.
            </li>
          </ul>
        </Section>

        <Section id="api" title="API reference">
          <h3 className="mb-2 mt-2 text-base font-semibold text-ink">Endpoint</h3>
          <ApiTable
            rows={[
              {
                property: 'POST /lead',
                description: 'Creates a lead. The base URL is scoped to your application id.',
                type: `${LEAD_BASE}/lead`,
              },
              {
                property: 'Content-Type',
                description: 'Request body is JSON.',
                type: 'application/json',
              },
              {
                property: 'query string',
                description: 'The flat payload fields, URL-encoded, appended to the URL.',
                type: '?firstName=…&email=…',
              },
            ]}
          />
          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">Body fields (under `data`)</h3>
          <ApiTable
            rows={[
              { property: 'firstName', description: "Lead's first name.", type: 'string' },
              { property: 'email', description: 'Email address.', type: 'string' },
              { property: 'phone', description: 'Phone number, digits only.', type: 'string' },
              { property: 'companyName', description: 'Company name.', type: 'string' },
              {
                property: 'description',
                description: 'Combined `${companyName}-${message}` summary.',
                type: 'string',
              },
              { property: 'source', description: 'Lead source.', type: 'string', default: "'website'" },
              {
                property: 'messageInfo.text',
                description: "The visitor's free-text message.",
                type: 'string',
              },
              { property: 'tags', description: 'Lead categories.', type: 'string[]' },
              {
                property: 'sourceDetail.pageUrl',
                description: 'URL of the page the form was submitted from.',
                type: 'string',
              },
              { property: 'token', description: 'reCAPTCHA v3 token (optional).', type: 'string' },
            ]}
          />
        </Section>
      </article>
    </DocLayout>
  );
}

/* ------------------------------- Snippets ------------------------------- */

const AI_PROMPT = `Do the following steps automatically:

Create a React "Lead Form" component (LeadForm.tsx) driven by a dynamic field config:
- firstName
- businessEmail
- phoneNumber
- companyName
- message (textarea)

On submit, POST the lead to the FabBuilder lead API (replace ${LEAD_APPLICATION_ID} with your application id, found in the CS app under Settings -> General Settings at ${CS_GENERAL_SETTINGS_URL}):

const LEAD_API = "${LEAD_BASE_SNIPPET}";

Map the fields to this flat payload:
  firstName  -> firstName
  phoneNumber-> phone
  businessEmail -> email
  companyName -> companyName
  description -> \`\${companyName}-\${message}\`
  source -> "website"

Send the payload BOTH as a URL query string and nested under "data" in the JSON body. The body should also include:
  messageInfo: { text: message }
  tags: ["CX"]
  sourceDetail: { pageUrl: window.location.href }

Send the request with an XMLHttpRequest: method POST, Content-Type application/json.

On status 200, clear the form and show a success/thank-you message.
On any other status, parse xhr.responseText and show the message inline.

Add brief comments explaining each step. Use plain React (hooks).`;

const COMPONENT_CODE = `import { useState } from 'react';

// Replace ${LEAD_APPLICATION_ID} with your application id.
const LEAD_API = '${LEAD_BASE_SNIPPET}';

// Dynamic field config — add / remove / reorder inputs here.
const FIELDS = [
  { name: 'firstName',     label: 'First Name',   type: 'text' },
  { name: 'businessEmail', label: 'Email',        type: 'email' },
  { name: 'phoneNumber',   label: 'Phone Number', type: 'tel' },
  { name: 'companyName',   label: 'Company Name', type: 'text' },
  { name: 'message',       label: 'Message',      textarea: true },
];

const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.name, '']));

export default function LeadForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const payload = {
      firstName: values.firstName,
      phone: values.phoneNumber,
      email: values.businessEmail,
      companyName: values.companyName,
      description: \`\${values.companyName}-\${values.message}\`,
      source: 'website',
    };
    const body = {
      data: {
        ...payload,
        messageInfo: { text: values.message },
        tags: ['CX'],
        sourceDetail: { pageUrl: window.location.href },
      },
    };

    const qs = new URLSearchParams(payload).toString();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', \`\${LEAD_API}/lead?\${qs}\`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        setStatus('success');
        setValues(EMPTY);
      } else {
        const data = JSON.parse(xhr.responseText || '{}');
        setStatus('error');
        setError(data.message || 'Submission failed. Please try again.');
      }
    };

    xhr.onerror = () => {
      setStatus('error');
      setError('Network error. Please check your connection and try again.');
    };

    xhr.send(JSON.stringify(body));
  };

  if (status === 'success') return <p>Thanks — we got your details!</p>;

  return (
    <form onSubmit={onSubmit}>
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name}>{f.label}</label>
          {f.textarea ? (
            <textarea id={f.name} name={f.name} value={values[f.name]} onChange={onChange} />
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type || 'text'}
              value={values[f.name]}
              onChange={onChange}
            />
          )}
        </div>
      ))}
      {error && <p>{error}</p>}
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}`;

const HELPER_CODE = `// Replace ${LEAD_APPLICATION_ID} with your application id.
const LEAD_API = '${LEAD_BASE_SNIPPET}';

// Builds the payload and posts a single lead via XMLHttpRequest.
// Resolves on status 200, rejects otherwise.
export function submitLead(values, { tags = ['CX'], token } = {}) {
  const payload = {
    firstName: values.firstName,
    phone: values.phoneNumber,
    email: values.businessEmail,
    companyName: values.companyName,
    description: \`\${values.companyName}-\${values.message}\`,
    source: 'website',
    ...(token ? { token } : {}),
  };

  const body = {
    data: {
      ...payload,
      messageInfo: { text: values.message },
      tags,
      sourceDetail: { pageUrl: window.location.href },
    },
  };

  return new Promise((resolve, reject) => {
    const qs = new URLSearchParams(payload).toString();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', \`\${LEAD_API}/lead?\${qs}\`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText || '{}'));
      } else {
        const data = JSON.parse(xhr.responseText || '{}');
        reject(new Error(data.message || 'Submission failed'));
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(JSON.stringify(body));
  });
}`;

const PAYLOAD_CODE = `// Form input → API field mapping
const payload = {
  firstName:   values.firstName,            // firstName  -> firstName
  phone:       values.phoneNumber,          // phoneNumber -> phone
  email:       values.businessEmail,        // businessEmail -> email
  companyName: values.companyName,          // companyName -> companyName
  description: \`\${values.companyName}-\${values.message}\`,
  source:      'website',
  // token:    gReCaptchaToken,             // optional reCAPTCHA token
};

// Sent BOTH as the query string AND nested under "data" in the body.
const body = {
  data: {
    ...payload,
    messageInfo: { text: values.message },  // message -> messageInfo.text
    tags: ['CX'],
    sourceDetail: { pageUrl: window.location.href },
  },
};

const qs = new URLSearchParams(payload).toString();
const xhr = new XMLHttpRequest();
xhr.open('POST', \`\${LEAD_API}/lead?\${qs}\`, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(body));`;

const RECAPTCHA_CODE = `import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function LeadFormWithCaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) return; // not ready yet

    // Generate a v3 token for this action…
    const token = await executeRecaptcha('enquiryFormSubmit');

    // …and include it in the payload.
    await submitLead(values, { token });
  };

  // …render the same form, calling onSubmit
}

// Wrap your app once with the provider:
// <GoogleReCaptchaProvider reCaptchaKey="YOUR_SITE_KEY">
//   <App />
// </GoogleReCaptchaProvider>`;

export default Pages;
