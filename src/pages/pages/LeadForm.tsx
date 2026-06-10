import {
  LEAD_API_HOST,
  LEAD_APPLICATION_ID,
  leadApiBase,
  CS_GENERAL_SETTINGS_URL,
  FAB_CRM_URL,
} from "../../lib/ahd";
import DocLayout, { type DocSection } from "../../components/DocLayout";
import { Section, Code } from "../../components/DocSection";
import DemoBlock from "../../components/DemoBlock";
import ApiTable from "../../components/ApiTable";
import PropertyCard from "../../components/PropertyCard";
import AiPromptBlock from "../../components/AiPromptBlock";
import { PAGES_SUBMODULES } from "./subModules";

/**
 * Lead Form — a sub-module of "Pages". A contact / lead capture form that
 * posts submissions to the FAB CRM lead API.
 */

// Lead API base, shown in docs/snippets with a placeholder application id.
const LEAD_BASE = leadApiBase(LEAD_APPLICATION_ID);

// Same base, used inside the code snippet strings below.
const LEAD_BASE_SNIPPET = `${LEAD_API_HOST}/tenant/${LEAD_APPLICATION_ID}`;

const SECTIONS: DocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "integration", label: "Integration" },
  { id: "ai-prompt", label: "Integrate using AI" },
  { id: "fields", label: "Form fields" },
  { id: "payload", label: "What gets sent" },
  { id: "recaptcha", label: "Stopping spam" },
  { id: "success", label: "After submitting" },
  { id: "api", label: "API reference" },
];


/** The fields collected by the form — dynamic, so listed not tabled. */
const FORM_FIELDS = [
  { name: "First name", note: "Who the lead is." },
  { name: "Email", note: "Where to reach them." },
  { name: "Phone", note: "An alternate way to contact them." },
  { name: "Company", note: "The company they represent." },
  { name: "Message", note: "What they want to talk to you about." },
];

function LeadForm() {
  return (
    <DocLayout
      title="Lead Form"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1
            className="mt-1 text-3xl font-bold"
            style={{ width: "fit-content" }}
          >
            Lead Form
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            A ready-to-use contact form that captures leads and saves them
            straight to your{" "}
            <a
              href={FAB_CRM_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              FAB CRM dashboard
            </a>
            . Copy it into any React project — there's nothing to install, and
            no backend to set up.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            When a visitor fills in the form and clicks submit, the form sends
            their details to your{" "}
            <a
              href={FAB_CRM_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              FAB CRM dashboard
            </a>
            , where they appear as a new lead. Once it's saved, the form resets
            and thanks the visitor; if anything goes wrong, a short error
            message is shown so they can try again.
          </p>
          <p>
            Every lead is tied to your <strong>application&nbsp;id</strong>, so
            FAB CRM knows which account it belongs to. Copy yours from the CS
            app under{" "}
            <a
              href={CS_GENERAL_SETTINGS_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Page Pilot app → pagepilot.fabbuilder.com/tenant
            </a>{" "}
            and paste it into the form's <Code>LEAD_API</Code> URL in place of{" "}
            <Code>{LEAD_APPLICATION_ID}</Code>.
          </p>
        </Section>

        <Section id="integration" title="Integration">
          <p>
            Getting the form working takes three short steps. Follow them in
            order and you'll be capturing leads in a few minutes.
          </p>

          <ol className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Add the component</strong> — copy
              the <Code>LeadForm</Code> code below into your project, for
              example as <Code>components/LeadForm.tsx</Code>, and render it
              wherever you want the form to appear.
            </li>
            <li>
              <strong className="text-ink">2. Connect your account</strong> —
              open the CS app at{" "}
              <a
                href={CS_GENERAL_SETTINGS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                Page Pilot app → pagepilot.fabbuilder.com/tenant
              </a>
              , copy your application id, and paste it into the{" "}
              <Code>LEAD_API</Code> URL in place of{" "}
              <Code>{LEAD_APPLICATION_ID}</Code>.
            </li>
            <li>
              <strong className="text-ink">3. Label your leads</strong> — set
              the <Code>tags</Code> array (for example <Code>['CX']</Code>) so
              you can tell at a glance which form a lead came from on your FAB
              CRM dashboard.
            </li>
          </ol>

          <p className="text-sm text-slate-600">
            That's all you need for a working form. To stop spam submissions,
            you can also add Google reCAPTCHA — see the <Code>reCAPTCHA</Code>{" "}
            section below.
          </p>

          <h3 className="mt-6 text-base font-semibold text-ink">
            The full component
          </h3>
          <p className="text-sm text-slate-600">
            Copy this in as-is. The list of inputs lives in a single{" "}
            <Code>FIELDS</Code> array near the top, so you can add, remove, or
            rename fields without touching the rest of the code.
          </p>
          <DemoBlock
            title="LeadForm.tsx"
            description="A complete, ready-to-use lead capture form."
            code={COMPONENT_CODE}
          />

          <h3 className="mt-6 text-base font-semibold text-ink">
            Already have a form?
          </h3>
          <p className="text-sm text-slate-600">
            If you've already built your own form, you don't need the component
            above — just call this helper with your form values to send the
            lead.
          </p>
          <DemoBlock
            title="submitLead()"
            description="A small helper that sends a single lead to FAB CRM."
            code={HELPER_CODE}
          />
        </Section>

        <Section id="ai-prompt" title="Integrate using AI">
          <p className="text-sm text-slate-600">
            Prefer to let your AI assistant do the work? Copy the prompt below
            into Cursor, Claude, or GitHub Copilot and it will build the form
            and connect it to FAB CRM for you.
          </p>
          <AiPromptBlock id="pages-ai-prompt" prompt={AI_PROMPT} />
        </Section>

        <Section id="fields" title="Form fields">
          <p>
            Out of the box the form asks for the details below. The fields are
            listed in one place at the top of the component, so you can drop any
            you don't need or add new ones to suit your use case.
          </p>
          <ul className="my-2 space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            {FORM_FIELDS.map((f) => (
              <li
                key={f.name}
                className="flex flex-wrap items-baseline gap-x-2 gap-y-1"
              >
                <span className="font-semibold text-ink">{f.name}</span>
                <span>— {f.note}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="payload" title="What gets sent">
          <p>
            You usually won't need to touch this, but it helps to know what
            leaves the browser. Before sending, the form renames its inputs to
            the names FAB CRM expects (for example <Code>phone</Code> instead of{" "}
            <Code>phoneNumber</Code>) and bundles them up into the request
            below.
          </p>
          <DemoBlock
            title="The request"
            description="How the form's inputs are packaged before they're sent."
            code={PAYLOAD_CODE}
          />
          <p className="text-sm text-slate-600">
            Two extra pieces of information ride along automatically:
          </p>
          <PropertyCard type="string[]" defaultValue="['CX']">
            <span>
              <strong>tags</strong> — a label that helps you group and filter
              leads in FAB CRM.
            </span>
          </PropertyCard>
          <PropertyCard
            type="{ pageUrl: string }"
            defaultValue="window.location.href"
          >
            <span>
              <strong>sourceDetail</strong> — records which page the lead came
              from, so you know where your leads are coming from. Add your own
              tracking details here if you like.
            </span>
          </PropertyCard>
        </Section>

        <Section id="recaptcha" title="Stopping spam (optional)">
          <p>
            Public forms attract bots. If you start seeing junk submissions, add
            Google reCAPTCHA: it quietly checks each submission in the
            background and attaches a one-time <Code>token</Code> to the request
            so FAB CRM can verify it's a real person. This step is optional —
            only add it if your account requires it or you run into spam.
          </p>
          <DemoBlock
            title="Adding reCAPTCHA"
            description="Get a token when the form is submitted, then send it along with the lead."
            code={RECAPTCHA_CODE}
          />
        </Section>

        <Section id="success" title="After submitting">
          <p>
            Here's what the visitor experiences once they hit submit, and how
            the form handles each outcome:
          </p>
          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">It worked</strong> — the lead is
              saved, the form clears, and a thank-you message appears. You can
              also redirect to a thank-you page or track the conversion here.
            </li>
            <li>
              <strong className="text-ink">Something was rejected</strong> — FAB
              CRM sends back a reason, which the form shows beneath the submit
              button so the visitor can fix it.
            </li>
            <li>
              <strong className="text-ink">
                The request didn't reach the server
              </strong>{" "}
              — usually a connection problem; the form shows a "please check
              your connection and try again" message.
            </li>
          </ul>
        </Section>

        <Section id="api" title="API reference">
          <p>
            The technical details, for reference. If you're using the component
            or helper above, this is all handled for you — these tables are here
            for anyone integrating the endpoint directly.
          </p>
          <h3 className="mb-2 mt-4 text-base font-semibold text-ink">
            Endpoint
          </h3>
          <ApiTable
            rows={[
              {
                property: "POST /lead",
                description:
                  "Creates a lead. The base URL is scoped to your application id.",
                type: `${LEAD_BASE}/lead`,
              },
              {
                property: "Content-Type",
                description: "Request body is JSON.",
                type: "application/json",
              },
              {
                property: "query string",
                description:
                  "The flat payload fields, URL-encoded, appended to the URL.",
                type: "?firstName=…&email=…",
              },
            ]}
          />
          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">
            Body fields (under `data`)
          </h3>
          <ApiTable
            rows={[
              {
                property: "firstName",
                description: "Lead's first name.",
                type: "string",
              },
              {
                property: "email",
                description: "Email address.",
                type: "string",
              },
              {
                property: "phone",
                description: "Phone number, digits only.",
                type: "string",
              },
              {
                property: "companyName",
                description: "Company name.",
                type: "string",
              },
              {
                property: "description",
                description: "Combined `${companyName}-${message}` summary.",
                type: "string",
              },
              {
                property: "source",
                description: "Lead source.",
                type: "string",
                default: "'website'",
              },
              {
                property: "messageInfo.text",
                description: "The visitor's free-text message.",
                type: "string",
              },
              {
                property: "tags",
                description: "Lead categories.",
                type: "string[]",
              },
              {
                property: "sourceDetail.pageUrl",
                description: "URL of the page the form was submitted from.",
                type: "string",
              },
              {
                property: "token",
                description: "reCAPTCHA v3 token (optional).",
                type: "string",
              },
            ]}
          />
        </Section>
      </article>
    </DocLayout>
  );
}

/* ------------------------------- Snippets ------------------------------- */

const AI_PROMPT = `You are helping me add a lead capture form to my React app. Build a single, self-contained component called LeadForm that submits to the FAB CRM lead API. Follow every instruction below.

GOAL
Create LeadForm.tsx — a contact form that, on submit, creates a lead in FAB CRM.

API
- Endpoint: const LEAD_API = "${LEAD_BASE_SNIPPET}";
- Replace ${LEAD_APPLICATION_ID} with my workspace/application id (found in the CS app under Settings -> General Settings: ${CS_GENERAL_SETTINGS_URL}).
- Method: POST, header Content-Type: application/json, sent with XMLHttpRequest.

FIELDS (drive these from a single config array so they're easy to change)
- firstName     (label "First Name",   text)
- businessEmail (label "Email",        email)
- phoneNumber   (label "Phone Number", tel)
- companyName   (label "Company Name", text)
- message       (label "Message",      textarea)

ON SUBMIT
1. Build a flat payload that maps the inputs to the API's field names:
     firstName     -> firstName
     phoneNumber   -> phone
     businessEmail -> email
     companyName   -> companyName
     description   -> \`\${companyName}-\${message}\`
     source        -> "website"
2. Build the request body as: { data: { ...payload, messageInfo: { text: message }, tags: ["CX"], sourceDetail: { pageUrl: window.location.href } } }
3. Append the flat payload to the URL as a query string AND send the body as JSON:
     POST \`\${LEAD_API}/lead?\${new URLSearchParams(payload)}\`

STATES & UX
- Track a status: "idle" | "submitting" | "success" | "error".
- While submitting, disable the submit button and show a loading label.
- On status 200: clear the form and show a friendly thank-you message.
- On any other status: read the error message from xhr.responseText (JSON, "message" field) and show it inline.
- On a network error (xhr.onerror): show a generic "check your connection" message.

CONSTRAINTS
- Use plain React with hooks only — no form libraries, no antd, no styled-components.
- Keep it dependency-free apart from React.
- Add short comments explaining each step.`;

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

export default LeadForm;
