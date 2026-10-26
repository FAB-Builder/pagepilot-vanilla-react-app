import { LEAD_APPLICATION_ID, PAGEPILOT_APP_URL } from '../../../lib/ahd';
import { PP_BASE_SNIPPET } from '../fetch-pages/snippets';

export interface ContentPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

const CONTEXT = `## Context
Page Pilot is a headless CMS. Every piece of content is a **page** with a unique \`slug\`, and pages are organised into **groups** (e.g. "blogs") that the workspace owner creates. My app reads that content over a public REST API — no auth header is needed.

- API base URL: \`${PP_BASE_SNIPPET}\`
- \`${LEAD_APPLICATION_ID}\` is a placeholder workspace id. Read the real id from an environment variable (e.g. \`PAGEPILOT_WORKSPACE_ID\`) and build the base URL from it in ONE config file. If I haven't set it, tell me — it is in Page Pilot at ${PAGEPILOT_APP_URL}.`;

const BEFORE_CODING = `## Before you write any code
1. Inspect my project: framework (Next.js App/Pages Router, Vite + React, Remix, Vue…), TypeScript or JavaScript, router, styling system (Tailwind, CSS modules…), and folder conventions.
2. Search for things I already have — API clients, fetch wrappers, types, card/accordion/nav components, layout, SEO helpers — and reuse them instead of creating duplicates.
3. If something below conflicts with how my project works, follow my project and tell me what you changed and why.
4. If a value I must supply is missing (group name, menu name, route path), ask me instead of guessing.`;

const CODE_RULES = `## Rules
- Use the platform \`fetch\`. Do not add an HTTP library.
- Split the work: API helper + types in a lib/services folder, UI in components, the route in my routes/app folder. Never put everything in one file.
- Type every response. Treat every field as optional — Page Pilot omits fields that were left empty.
- On a non-2xx response, throw an Error that includes the status code. Show a friendly error state in the UI; never crash the page.
- Do not hardcode slugs, group names, or menu names inside helpers — take them as parameters.
- Do not add comments that only restate the code.`;

const SAFE_RENDER = `## Rendering Page Pilot HTML (required)
\`section.content\` is raw HTML written in the Page Pilot editor. It contains its own \`<style>\` tags, and some are unscoped (e.g. \`html, body { … }\`). Injected directly, those styles leak into my app and break it.

Build ONE reusable \`RenderContent({ html })\` component and use it for every piece of Page Pilot HTML:
1. Sanitize first: \`DOMPurify.sanitize(html)\` (install \`dompurify\`; Shadow DOM is not an XSS defence).
2. Mount the sanitized HTML inside a Shadow DOM so styles can't leak in either direction:
   \`const root = host.shadowRoot ?? host.attachShadow({ mode: "open" }); root.innerHTML = safeHtml;\`
   Reuse the existing shadow root on re-render — calling \`attachShadow\` twice throws.
3. If my app server-renders (Next.js, Remix, Nuxt…), ALSO output a declarative shadow root so the first paint has content:
   \`<div ref={hostRef} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: '<template shadowrootmode="open">' + safeHtml + '</template>' }} />\`
   and skip re-attaching in the effect on first mount when \`host.shadowRoot\` already exists.
4. My global CSS (Tailwind, prose) does not reach inside the shadow root. If the content needs base typography, prepend a small \`<style>\` block inside the shadow root.

Never render Page Pilot HTML with a bare \`dangerouslySetInnerHTML\`, \`v-html\`, or \`innerHTML\` on a normal element.`;

const LIST_ENDPOINT = `### List pages — \`GET {BASE}/client/page\`
All options go in the query string. Build it with \`URLSearchParams\`.

| Param | Value | Notes |
|---|---|---|
| \`filter[groups][]\` | group name, e.g. \`blogs\` | Repeat the param for several groups. |
| \`filter[status]\` | \`live\` | Only published pages. Use \`draft\` for unpublished. |
| \`includeSections\` | \`false\` | **Always send this for lists.** Without it every row includes its full HTML body, even if \`select\` omits it. |
| \`select\` | space-separated fields, e.g. \`slug name title\` | Fields to return per page. |
| \`orderBy\` | \`createdAt_DESC\` | Format: \`<field>_ASC\` or \`<field>_DESC\`. |
| \`limit\` / \`offset\` | numbers | Pagination. Omitting \`limit\` returns every match. |

Response:
\`\`\`json
{
  "count": 190,
  "rows": [
    { "_id": "PAGE_ID", "id": "PAGE_ID", "name": "Purple Colour Combination", "slug": "purple-wall-colour-combinations" }
  ]
}
\`\`\`
\`count\` is the total number of matches, ignoring \`limit\`/\`offset\`.`;

const SLUG_ENDPOINT = `### One page by slug — \`POST {BASE}/pagebyslug/{slug}\`
Header \`Content-Type: application/json\`. The body is always wrapped in \`data\`:
\`\`\`json
{
  "data": {
    "includes": [],
    "pageSelect": {
      "select": { "title": 1, "metaTitle": 1, "metaDescription": 1 },
      "sectionSelect": { "content": 1 }
    }
  }
}
\`\`\`
- \`pageSelect.select\` — fields of the page itself (\`field: 1\`).
- \`pageSelect.sectionSelect\` — fields of each item in \`page.sections\`.
- \`includes\` — extra lists fetched in the same request; each comes back under its own \`key\`.

Response: \`{ "page": { …, "sections": [ { "content": "<html…>" } ] }, "<includeKey>": [ … ] }\`. \`page\` is \`null\` when no page has that slug.`;

const promptFor = (task: string, body: string, done: string) => `# Task
${task}

${CONTEXT}

${BEFORE_CODING}

## API
${body}

${CODE_RULES}

## Done when
${done}
- When finished, list the files you created or changed and any env variable I need to set.`;

const LIST_PROMPT = promptFor(
  'Build a listing page in my app that shows the published pages from one Page Pilot group (for example blog posts, news, case studies or docs) as a paginated card grid. Ask me which group and which route path to use if I have not said.',
  `${LIST_ENDPOINT}

## Steps
1. Create \`fetchPagesList(group, { limit = 12, offset = 0 })\` that calls the list endpoint with:
   \`filter[groups][]=<group>\`, \`filter[status]=live\`, \`includeSections=false\`,
   \`select=slug name title metaDescription thumbnailImage tags updatedAt\`, \`orderBy=createdAt_DESC\`, \`limit\`, \`offset\`.
   Return \`{ pages: rows ?? [], total: count ?? 0 }\`.
2. Create a \`PageCard\` (or reuse my card component) showing: thumbnail (\`thumbnailImage\`), title (\`title\`, falling back to \`name\` — \`title\` is often missing), \`metaDescription\`, formatted \`updatedAt\`, and a link to \`<listPath>/{slug}\`.
3. Create the listing route (e.g. \`/blog\`, \`/news\`, \`/resources\`) with a responsive grid and pagination: total pages = \`Math.ceil(total / limit)\`; keep the current page in the URL (\`?page=2\`) so it is shareable.
4. Add loading, empty ("Nothing published yet"), and error states.
5. If my framework supports static generation or server rendering, fetch on the server for SEO.`,
  `- The listing route shows live pages from the group, newest first, with working pagination.
- Each card links to \`<listPath>/{slug}\`.
- No list request is sent without \`includeSections=false\`.`,
);

const DETAIL_PROMPT = promptFor(
  'Build a detail page at `<listPath>/[slug]` (for example `/blog/[slug]`) that loads one Page Pilot page by its slug and renders its content safely, with SEO meta. Ask me for the route path and group if I have not said.',
  `${SLUG_ENDPOINT}

${LIST_ENDPOINT}

${SAFE_RENDER}

## Steps
1. Create \`fetchPageBySlug(slug)\` that POSTs to \`/pagebyslug/{slug}\` with:
   \`pageSelect.select = { title: 1, name: 1, metaTitle: 1, metaDescription: 1, metaImageUrl: 1, metaKeywords: 1, thumbnailImage: 1, updatedAt: 1 }\`
   \`pageSelect.sectionSelect = { title: 1, content: 1, image: 1 }\`
   Return \`data.page\` (or \`null\`).
2. Create the \`RenderContent\` component described above.
3. Create the \`<listPath>/[slug]\` route: read the slug from the route params, fetch the page, and show my 404 page if it is \`null\`.
4. Render: title (\`title\` ?? \`name\`), hero image (\`thumbnailImage\`), then each of \`page.sections\` in order — an image if \`section.image?.[0]?.downloadUrl\` exists, then \`section.title\` and \`section.content\` through \`RenderContent\`.
5. SEO: set the document title, meta description, and og:image from \`metaTitle\` ?? \`title\`, \`metaDescription\`, \`metaImageUrl\`.
6. Static generation (Next.js \`generateStaticParams\`, or the equivalent in my framework): list every slug with
   \`GET /client/page?filter[groups][]=<group>&filter[status]=live&includeSections=false&select=slug\`
   and map \`rows\` to \`{ slug }\`, skipping rows without a slug.`,
  `- Visiting \`<listPath>/<existing-slug>\` renders the page; an unknown slug shows the 404 page.
- Page Pilot HTML is rendered only through \`RenderContent\` (sanitized + Shadow DOM); its styles do not affect the rest of my site.
- The page has a correct title, description and og:image.`,
);

const FAQ_PROMPT = promptFor(
  'Add an FAQ section to a page in my app. The questions and answers are managed in Page Pilot and belong to a specific page slug.',
  `${SLUG_ENDPOINT}

### FAQ include
FAQs use their own entity and are matched by the **page slug**, not by group. Add this to \`data.includes\`:
\`\`\`json
{
  "key": "faqs",
  "entity": "faq-group-list",
  "filter": { "slug": "<page-slug>", "status": "published", "orderBy": "order_ASC" },
  "limit": 1
}
\`\`\`
The FAQ group comes back under \`data.faqs\`. \`orderBy: "order_ASC"\` keeps the order set in Page Pilot.

## Steps
1. Create \`fetchFaqs(slug)\` that POSTs to \`/pagebyslug/{slug}\` with \`includes: [<FAQ include above>]\` and returns \`data.faqs ?? []\`.
2. **Before writing the types, call the endpoint once and log the response.** Type the FAQ items from the real shape — do not invent field names.
3. Build an accessible accordion (reuse mine if I have one): each question is a \`<button>\` with \`aria-expanded\` and \`aria-controls\`, operable by keyboard.
4. If an answer contains HTML, sanitize it with \`DOMPurify.sanitize()\` before rendering.
5. Render nothing (no heading, no empty box) when there are no FAQs.
6. Optional but recommended: output FAQPage JSON-LD structured data for SEO.`,
  `- The FAQ section shows the published FAQs for the given page slug, in Page Pilot order.
- It is keyboard accessible and hidden when empty.`,
);

const MENU_PROMPT = promptFor(
  'Render my site header and footer navigation from menus built in Page Pilot, so editors can change navigation without a code deploy.',
  `${SLUG_ENDPOINT}

### Menu include
Fetch each menu by its name with the \`menu-by-name\` entity. Any existing page slug of mine (e.g. the home page) works as the anchor for the request:
\`\`\`json
{
  "data": {
    "includes": [
      { "key": "headerMenu", "entity": "menu-by-name", "filter": { "name": "<header-menu-name>" } },
      { "key": "footerMenu", "entity": "menu-by-name", "filter": { "name": "<footer-menu-name>" } }
    ]
  }
}
\`\`\`
Each menu comes back under its key (\`data.headerMenu\`, \`data.footerMenu\`). Items have the shape:
\`\`\`ts
type MenuItem = { id: string; name: string; href: string; children?: MenuItem[] };
\`\`\`
\`children\` can nest to any depth. \`href\` is a page slug with NO leading slash (e.g. \`guide/getting-started\`), or an absolute URL for external links.

## Steps
1. Create \`fetchMenus({ anchorSlug, headerMenuName, footerMenuName })\` returning \`{ header: MenuItem[], footer: MenuItem[] }\`.
2. Create a link helper: if \`href\` starts with \`http\`, render a normal \`<a target="_blank" rel="noreferrer">\`; otherwise use my router's \`Link\` to \`"/" + href\`.
3. Header: top-level items in a nav bar, \`children\` as dropdowns (recursive), and a mobile drawer. Reuse my existing nav components if present.
4. Footer: render the footer menu as grouped link columns.
5. Fetch once (server-side or in the root layout) and cache it — do not refetch on every route change.
6. Ask me for the menu names if I haven't given them.`,
  `- Header and footer show the Page Pilot menu items, including nested children, on desktop and mobile.
- Internal links navigate client-side; external links open in a new tab.`,
);

const CATCH_ALL_PROMPT = promptFor(
  'Render any Page Pilot page through ONE catch-all route, so publishing a page in Page Pilot makes it live on my site without writing a new route file.',
  `${SLUG_ENDPOINT}

${LIST_ENDPOINT}

${SAFE_RENDER}

### Request body to use
\`\`\`json
{
  "data": {
    "includes": [
      { "key": "faqs", "entity": "faq-group-list", "filter": { "slug": "<slug>", "status": "published", "orderBy": "order_ASC" }, "limit": 1 }
    ],
    "pageSelect": {
      "select": { "title": 1, "metaTitle": 1, "metaDescription": 1, "metaImageUrl": 1, "metaKeywords": 1, "head": 1, "bodyBottom": 1 },
      "sectionSelect": { "content": 1 }
    }
  }
}
\`\`\`
\`page.head\` and \`page.bodyBottom\` are extra markup authored in Page Pilot for the end of \`<head>\` and \`<body>\`.

## Steps
1. Create \`fetchPageBySlug(slug, { preview = false } = {})\` using the body above. Slugs can contain \`/\` (e.g. \`guide/getting-started\`).
2. Create the \`RenderContent\` component described above.
3. Create the catch-all route — Next.js App Router: \`app/[...slug]/page.tsx\`; React Router: \`path="*"\`. Join the URL segments with \`/\` to get the slug. Keep my existing routes taking priority.
4. Render \`page.sections\` in order through \`RenderContent\`, then the FAQs (if any). Show my 404 page when \`page\` is \`null\`.
5. SEO from \`metaTitle\`, \`metaDescription\`, \`metaImageUrl\`, \`metaKeywords\`.
6. Static generation: list every live slug with \`GET /client/page?filter[status]=live&includeSections=false&select=slug\` and turn each into route params (\`slug.split("/")\`).
7. Preview mode: when the URL has \`?mode=preview\`, refetch on the client and render the result over the static version so editors see unpublished changes. In Next.js read \`window.location.search\` inside \`useEffect\` — NOT \`useSearchParams()\`, which breaks static prerendering unless wrapped in \`<Suspense>\`.`,
  `- Any live Page Pilot slug renders at \`/<slug>\` with correct SEO meta; unknown slugs show the 404 page.
- My existing hand-written routes still work.
- \`?mode=preview\` shows the latest saved content.`,
);

export const CONTENT_PROMPTS: ContentPrompt[] = [
  {
    id: 'list-pages',
    title: 'List of pages',
    description:
      'A paginated grid of pages from any group — blog posts, news, case studies — using GET /client/page.',
    prompt: LIST_PROMPT,
  },
  {
    id: 'single-page',
    title: 'Single page by slug',
    description: 'One page by its slug, rendered safely, with SEO meta and static generation.',
    prompt: DETAIL_PROMPT,
  },
  {
    id: 'faqs',
    title: 'FAQ section',
    description: 'A page’s FAQs fetched in the same call, shown as an accordion.',
    prompt: FAQ_PROMPT,
  },
  {
    id: 'menus',
    title: 'Header & footer menus',
    description: 'Nested menus built in Page Pilot, rendered as your site navigation.',
    prompt: MENU_PROMPT,
  },
  {
    id: 'catch-all',
    title: 'Any page (catch-all route)',
    description: 'Render every Page Pilot page through one route, with FAQs and preview mode.',
    prompt: CATCH_ALL_PROMPT,
  },
];
