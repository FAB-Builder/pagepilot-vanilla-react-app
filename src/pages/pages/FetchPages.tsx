import {
  PAGEPILOT_API_HOST,
  LEAD_APPLICATION_ID,
  pagePilotApiBase,
  PAGEPILOT_APP_URL,
  PAGEPILOT_GROUPS_URL,
} from "../../lib/ahd";
import DocLayout, { type DocSection } from "../../components/DocLayout";
import DemoBlock from "../../components/DemoBlock";
import ApiTable from "../../components/ApiTable";
import PropertyCard from "../../components/PropertyCard";
import AiPromptBlock from "../../components/AiPromptBlock";
import { PAGES_SUBMODULES } from "./subModules";

/**
 * Fetch Pages — a sub-module of "Pages". Documents how to read pages (blogs,
 * FAQs, landing pages, etc.) published in Page Pilot from your own app.
 */

// Workspace-scoped API base, shown in docs/snippets with a placeholder id.
const PP_BASE = pagePilotApiBase(LEAD_APPLICATION_ID);

// Same base, used inside the code snippet strings below.
const PP_BASE_SNIPPET = `${PAGEPILOT_API_HOST}/tenant/${LEAD_APPLICATION_ID}`;

const SECTIONS: DocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "endpoint", label: "The endpoint" },
  { id: "example", label: "Full example" },
  { id: "includes", label: "Includes" },
  { id: "multiple-includes", label: "Multiple includes" },
  { id: "filter", label: "Filter" },
  { id: "select", label: "Select fields" },
  { id: "ai-prompt", label: "Integrate using AI" },
  { id: "api", label: "API reference" },
  { id: "page-fields", label: "What you can fetch" },
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
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
        {title}
      </h2>
      <div className="space-y-3 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
    {children}
  </code>
);

function FetchPages() {
  return (
    <DocLayout
      title="Fetch Pages"
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
            Fetch Pages List using Page Pilot API
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Read content you've published in Page Pilot — blog posts, FAQs,
            landing pages, and more — straight from your own app with a single
            API call. Pull one page by its slug and, in the same request, fetch
            related lists of pages filtered by group and status.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Every piece of content in Page Pilot is a <strong>page</strong> with
            a unique <Code>slug</Code>. To show it on your site you ask Page
            Pilot for that page by its slug. In the same call you can also pull
            in <em>related</em> pages — for example, a blog index page can
            return the page itself plus the list of all published posts.
          </p>
          <p>
            This works the same way the FabBuilder website renders its blog: it
            requests the <Code>website-blogs</Code> page and, alongside it, a
            filtered list of blog pages to show in the grid.
          </p>
          <p>
            Requests are scoped to your <strong>workspace&nbsp;id</strong>.
            Replace <Code>{LEAD_APPLICATION_ID}</Code> in the URL with yours —
            find it in{" "}
            <a
              href={PAGEPILOT_APP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Page Pilot
            </a>
            .
          </p>
        </Section>

        <Section id="endpoint" title="The endpoint">
          <p>
            Send a <Code>POST</Code> to{" "}
            <Code>/pagebyslug/&#123;slug&#125;</Code> with a JSON body. The body
            is where you describe what related content to pull in (see{" "}
            <Code>includes</Code> below). At its simplest, with no body, it just
            returns the page.
          </p>
          <DemoBlock
            title="Fetch a single page"
            description="Returns the page that matches the slug."
            code={BASIC_CODE}
          />
          <p className="text-sm text-slate-600">
            The response contains the matched page under <Code>page</Code>, plus
            a key for each include you requested.
          </p>
        </Section>

        <Section id="example" title="Full example">
          <p>
            Here's the complete pattern, modelled on the FabBuilder blog index:
            fetch a page by its slug and, in the same request, a list of all{" "}
            <strong>live</strong> pages in the <Code>blogs</Code> group —
            returning only the fields the grid needs. The slug (
            <Code>website-blogs</Code> below) is{" "}
            <strong>your own page's slug</strong> — swap in whichever page
            you're loading.
          </p>
          <DemoBlock
            title="Fetch a page + a related list"
            description="One request returns the page and a filtered list of related pages."
            code={FULL_EXAMPLE_CODE}
          />
          <p className="text-sm text-slate-600">
            The list comes back under the <Code>key</Code> you chose (
            <Code>relatedBlogs</Code>
            here), so you can read <Code>data.page</Code> and{" "}
            <Code>data.relatedBlogs</Code> separately.
          </p>
        </Section>

        <Section id="includes" title="Includes">
          <p>
            <Code>includes</Code> is an array — each entry pulls in a related
            list of pages alongside the main page. You can request several at
            once (for example a blogs list and an FAQs list). Each include is
            shaped like this:
          </p>
          <ApiTable
            rows={[
              {
                property: "key",
                description:
                  "The name the results are returned under in the response, e.g. data.relatedBlogs.",
                type: "string",
              },
              {
                property: "entity",
                description:
                  'What to fetch. "pages" for pages (blogs, landing pages…); "faq-group-list" for FAQ groups.',
                type: "'pages' | 'faq-group-list'",
                default: "'pages'",
              },
              {
                property: "filter",
                description:
                  "Which records to include — narrow the list by group, slug, and status.",
                type: "{ groups, slug, status, orderBy }",
              },
              {
                property: "select",
                description:
                  "Which fields to return for each record (see Select fields).",
                type: "Record<string, 1>",
              },
              {
                property: "limit",
                description:
                  "Maximum number of records to return for this include.",
                type: "number",
              },
            ]}
          />
        </Section>

        <Section id="multiple-includes" title="Multiple includes">
          <p>
            Because <Code>includes</Code> is an array, one request can pull in
            several related lists at once — each under its own <Code>key</Code>.
            A home page, for instance, can return its own content plus a list of
            blog posts <em>and</em> a list of FAQs in a single round-trip.
          </p>
          <p>
            Note the second include below uses a different <Code>entity</Code>,{" "}
            <Code>faq-group-list</Code>, and a different filter shape: FAQs are
            matched by the page <Code>slug</Code> with{" "}
            <Code>status: 'published'</Code> and an <Code>orderBy</Code> to
            control their order.
          </p>
          <DemoBlock
            title="Fetch blogs AND FAQs together"
            description="Two includes in one request — results come back under data.relatedBlogs and data.faqs."
            code={MULTIPLE_INCLUDES_CODE}
          />
        </Section>

        <Section id="filter" title="Filter">
          <p>
            The <Code>filter</Code> object decides <em>which</em> pages an
            include returns. The two you'll use most:
          </p>
          <PropertyCard type="string[]" defaultValue="[]">
            <span>
              <strong>groups</strong> — only return pages that belong to these
              groups. Groups are how you organise content in Page Pilot, and{" "}
              <strong>you create your own</strong> — the names here (
              <Code>'blogs'</Code>, <Code>'faqs'</Code>) are just examples; use
              whatever groups you've set up. Manage them in{" "}
              <a
                href={PAGEPILOT_GROUPS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                Page Pilot → Configurations → Groups
              </a>
              .
            </span>
          </PropertyCard>
          <PropertyCard type="'live' | 'draft'" defaultValue="'live'">
            <span>
              <strong>status</strong> — only return pages with this status. Use{" "}
              <Code>'live'</Code> so visitors never see unpublished drafts.
            </span>
          </PropertyCard>
        </Section>

        <Section id="select" title="Select fields">
          <p>
            <Code>select</Code> is a field projection — set a field to{" "}
            <Code>1</Code> to include it. Requesting only what you need keeps
            responses small and fast. These are the fields the blog index asks
            for:
          </p>
          <ApiTable
            rows={[
              {
                property: "title / name",
                description: "The page title.",
                type: "string",
              },
              {
                property: "slug",
                description: "Unique slug — use it to link to the full page.",
                type: "string",
              },
              {
                property: "metaDescription",
                description: "Short summary, handy for cards and SEO.",
                type: "string",
              },
              {
                property: "tags",
                description: "Tags for filtering and display.",
                type: "string[]",
              },
              {
                property: "groups",
                description: "Groups the page belongs to.",
                type: "string[]",
              },
              {
                property: "thumbnailImage",
                description: "Card / hero image URL.",
                type: "string",
              },
              {
                property: "metadata",
                description: "Any custom fields you added to the page.",
                type: "object",
              },
              {
                property: "createdAt / updatedAt",
                description: "Timestamps, useful for sorting.",
                type: "string (ISO date)",
              },
            ]}
          />
        </Section>

        <Section id="ai-prompt" title="Integrate using AI">
          <p className="text-sm text-slate-600">
            Want your AI assistant to wire this up? Copy the prompt below into
            Cursor, Claude, or GitHub Copilot and it will fetch the page and its
            related list, with filtering, for you.
          </p>
          <AiPromptBlock id="fetch-pages-ai-prompt" prompt={AI_PROMPT} />
        </Section>

        <Section id="api" title="API reference">
          <p>The technical details for direct integration.</p>
          <h3 className="mb-2 mt-4 text-base font-semibold text-ink">
            Endpoint
          </h3>
          <ApiTable
            rows={[
              {
                property: "POST /pagebyslug/{slug}",
                description:
                  "Fetch a page by slug, plus any related lists you include.",
                type: `${PP_BASE}/pagebyslug/{slug}`,
              },
              {
                property: "Content-Type",
                description: "Request body is JSON.",
                type: "application/json",
              },
            ]}
          />
          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">
            Request body
          </h3>
          <ApiTable
            rows={[
              {
                property: "data.includes",
                description:
                  "Array of related lists to fetch alongside the page.",
                type: "Include[]",
                default: "[]",
              },
              {
                property: "includes[].key",
                description: "Response key the list is returned under.",
                type: "string",
              },
              {
                property: "includes[].entity",
                description: "Entity to fetch.",
                type: "'pages'",
              },
              {
                property: "includes[].filter.groups",
                description: "Restrict to these groups.",
                type: "string[]",
              },
              {
                property: "includes[].filter.status",
                description: "Restrict to this status.",
                type: "'live' | 'draft'",
              },
              {
                property: "includes[].select",
                description: "Fields to return per page (field: 1).",
                type: "Record<string, 1>",
              },
              {
                property: "includes[].limit",
                description: "Max number of records for this include.",
                type: "number",
              },
              {
                property: "data.pageSelect.select",
                description:
                  'Which fields to return for the main page (see "What you can fetch").',
                type: "Record<string, 1>",
              },
              {
                property: "data.pageSelect.sectionSelect",
                description:
                  "Which fields to return for the page's sections, e.g. { content: 1 }.",
                type: "Record<string, 1>",
              },
            ]}
          />
          <h3 className="mb-2 mt-6 text-base font-semibold text-ink">
            Response
          </h3>
          <ApiTable
            rows={[
              {
                property: "page",
                description: "The page that matched the slug.",
                type: "object",
              },
              {
                property: "[key]",
                description:
                  "One array per include, named by its key (e.g. relatedBlogs).",
                type: "object[]",
              },
            ]}
          />
        </Section>

        <Section id="page-fields" title="What you can fetch">
          <p>
            The fields you get back are <strong>dynamic</strong> — you choose
            them with <Code>pageSelect.select</Code> (for the page itself) and
            each include's <Code>select</Code> (for related lists). Request only
            what you need. Below are the most useful fields a page exposes:
          </p>
          <ApiTable
            rows={[
              {
                property: "title",
                description: "The page title.",
                type: "string",
              },
              {
                property: "metaTitle",
                description:
                  "SEO title for the <title> tag — falls back to title if unset.",
                type: "string",
              },
              {
                property: "metaDescription",
                description:
                  "SEO meta description / summary used in cards and search results.",
                type: "string",
              },
              {
                property: "metaImageUrl",
                description:
                  "Social / Open Graph image URL — the preview image when shared.",
                type: "string",
              },
              {
                property: "metaKeywords",
                description: "SEO keywords for the page.",
                type: "string | string[]",
              },
              {
                property: "slug",
                description: "Unique slug — use it to link to the full page.",
                type: "string",
              },
              {
                property: "tags",
                description: "Tags for filtering and display.",
                type: "string[]",
              },
              {
                property: "groups",
                description: "Groups the page belongs to.",
                type: "string[]",
              },
              {
                property: "thumbnailImage",
                description: "Card / hero image URL.",
                type: "string",
              },
              {
                property: "editor / sections",
                description:
                  "The page body content (use sectionSelect: { content: 1 } to fetch it).",
                type: "object",
              },
              {
                property: "head / bodyBottom",
                description:
                  "Custom code injected into <head> or before </body>.",
                type: "string",
              },
              {
                property: "metadata",
                description: "Any custom fields you added to the page.",
                type: "object",
              },
              {
                property: "createdAt / updatedAt",
                description: "Timestamps, useful for sorting.",
                type: "string (ISO date)",
              },
            ]}
          />
        </Section>
      </article>
    </DocLayout>
  );
}

/* ------------------------------- Snippets ------------------------------- */

const BASIC_CODE = `// Replace ${LEAD_APPLICATION_ID} with your workspace id.
const PAGEPILOT_API = '${PP_BASE_SNIPPET}';

async function fetchPage(slug) {
  const res = await fetch(\`\${PAGEPILOT_API}/pagebyslug/\${slug}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: {} }),
  });

  if (!res.ok) throw new Error(\`Failed to fetch page: \${res.status}\`);

  const data = await res.json();
  return data.page; // the page that matched the slug
}`;

const FULL_EXAMPLE_CODE = `// Replace ${LEAD_APPLICATION_ID} with your workspace id.
const PAGEPILOT_API = '${PP_BASE_SNIPPET}';

// Fetch a page AND a filtered list of related pages in one request.
// 'website-blogs' (slug) and 'blogs' (group) are just examples — pass YOUR
// own. Create groups in Page Pilot → Configurations → Groups.
async function fetchBlogs(slug = 'website-blogs', group = 'blogs') {
  const res = await fetch(\`\${PAGEPILOT_API}/pagebyslug/\${slug}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        includes: [
          {
            key: 'relatedBlogs',          // results land in data.relatedBlogs
            entity: 'pages',
            filter: { groups: [group], status: 'live' },
            select: {
              title: 1,
              name: 1,
              slug: 1,
              metaDescription: 1,
              tags: 1,
              groups: 1,
              thumbnailImage: 1,
              metadata: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ],
      },
    }),
  });

  if (!res.ok) throw new Error(\`Failed to fetch: \${res.status}\`);

  const data = await res.json();
  return {
    pageInfo: data.page || {},        // the index page itself
    blogs: data.relatedBlogs || [],   // the filtered list of posts
  };
}`;

const MULTIPLE_INCLUDES_CODE = `// Replace ${LEAD_APPLICATION_ID} with your workspace id.
const PAGEPILOT_API = '${PP_BASE_SNIPPET}';

// Fetch a page along with TWO related lists — blogs and FAQs — in one request.
async function fetchHome(slug = 'website-home') {
  const res = await fetch(\`\${PAGEPILOT_API}/pagebyslug/\${slug}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        includes: [
          {
            key: 'relatedBlogs',                      // -> data.relatedBlogs
            entity: 'pages',
            filter: { groups: ['blog'], status: 'live' },
            limit: 10,
          },
          {
            key: 'faqs',                              // -> data.faqs
            entity: 'faq-group-list',                 // FAQs use a different entity
            filter: { slug, status: 'published', orderBy: 'order_ASC' },
            limit: 1,
          },
        ],
        // pageSelect controls which fields come back for the page ITSELF.
        pageSelect: {
          select: {
            title: 1,
            metaTitle: 1,
            metaDescription: 1,
            metaImageUrl: 1,
            metaKeywords: 1,
            editor: 1,
            head: 1,
            bodyBottom: 1,
          },
          sectionSelect: { content: 1 },
        },
      },
    }),
  });

  if (!res.ok) throw new Error(\`Failed to fetch: \${res.status}\`);

  const data = await res.json();
  return {
    pageInfo: data.page || {},
    blogs: data.relatedBlogs || [],
    faqs: data.faqs || [],
  };
}`;

const AI_PROMPT = `You are helping me read content from Page Pilot in my app. Write a helper that fetches a page by slug and, in the same request, a related list of pages. Follow every instruction below.

API
- Endpoint: const PAGEPILOT_API = "${PP_BASE_SNIPPET}";
- Replace ${LEAD_APPLICATION_ID} with my workspace id (found in Page Pilot: ${PAGEPILOT_APP_URL}).
- Method: POST, header Content-Type: application/json.

REQUEST
- URL: \`\${PAGEPILOT_API}/pagebyslug/\${slug}\`  (slug is MY page's slug, passed in as an argument — do not hardcode it)
- Body: { data: { includes: [ ... ], pageSelect: { ... } } }
- includes is an ARRAY — support fetching multiple related lists at once, each under its own key. Each include has:
    key:    response key the list is returned under (e.g. "relatedBlogs", "faqs")
    entity: "pages" for pages, or "faq-group-list" for FAQs
    filter: for pages -> { groups: [<group>], status: "live" } (groups are user-created in Page Pilot — pass the group(s) as a parameter, don't hardcode)
            for faqs  -> { slug, status: "published", orderBy: "order_ASC" }
    select: fields to return per record (field: 1)
    limit:  max records to return
- pageSelect controls fields for the PAGE itself:
    pageSelect.select: { title: 1, metaTitle: 1, metaDescription: 1, metaImageUrl: 1, metaKeywords: 1, editor: 1, head: 1, bodyBottom: 1 }
    pageSelect.sectionSelect: { content: 1 }

RESPONSE
- data.page is the page that matched the slug.
- data[key] is each related list (e.g. data.relatedBlogs, data.faqs).

DELIVERABLE
- An async function that takes the page slug (and any group names) as arguments — don't hardcode them — fetches the page plus the related lists (blogs and FAQs), and returns { pageInfo, blogs, faqs }.
- Throw a clear error on a non-OK response.
- Add short comments explaining each step. Use plain JavaScript / fetch — no extra dependencies.`;

export default FetchPages;
