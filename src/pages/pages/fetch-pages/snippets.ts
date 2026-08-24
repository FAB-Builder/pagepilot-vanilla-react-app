import {
  PAGEPILOT_API_HOST,
  LEAD_APPLICATION_ID,
  pagePilotApiBase,
  PAGEPILOT_APP_URL,
} from '../../../lib/ahd';

// Workspace-scoped API base, shown in docs/snippets with a placeholder id.
export const PP_BASE = pagePilotApiBase(LEAD_APPLICATION_ID);

// Same base, used inside the code snippet strings below.
export const PP_BASE_SNIPPET = `${PAGEPILOT_API_HOST}/tenant/${LEAD_APPLICATION_ID}`;

export const BASIC_CODE = `// Replace ${LEAD_APPLICATION_ID} with your workspace id.
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

export const FULL_EXAMPLE_CODE = `// Replace ${LEAD_APPLICATION_ID} with your workspace id.
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

export const MULTIPLE_INCLUDES_CODE = `// Each item in "includes" returns its own list, under its own key.
// Request as many as you need in a single call.
{
  data: {
    includes: [
      {
        key: 'relatedBlogs',        // -> data.relatedBlogs
        entity: 'pages',
        filter: { groups: ['blog'], status: 'live' },
        limit: 10,
      },
      {
        key: 'faqs',                // -> data.faqs
        entity: 'faq-group-list',   // FAQs use a different entity (see Fetch FAQs)
        filter: { slug, status: 'published', orderBy: 'order_ASC' },
        limit: 1,
      },
    ],
  },
}`;

export const FAQS_CODE = `// FAQs live in a different entity ("faq-group-list") and are matched by
// the PAGE slug — not by group. Add this as another item in "includes".
{
  key: 'faqs',                                  // -> data.faqs
  entity: 'faq-group-list',                     // <- the FAQ entity
  filter: {
    slug,                                       // the page these FAQs belong to
    status: 'published',                        // only published FAQs
    orderBy: 'order_ASC',                       // keep the order you set in Page Pilot
  },
  limit: 1,                                     // one FAQ group
}`;

export const MENU_CODE = `// Fetch a named menu you built in Page Pilot with the "menu-by-name"
// entity. Match it by its name; the items come back under your key.
// Add as many menu includes as you need (e.g. a header menu and a footer menu).
{
  includes: [
    {
      key: 'headerMenu',                          // -> data.headerMenu
      entity: 'menu-by-name',                     // <- the menu entity
      filter: { name: 'code-gen-header-features' }, // the menu's name in Page Pilot
    },
    {
      key: 'featureMenu',                         // -> data.featureMenu
      entity: 'menu-by-name',
      filter: { name: 'code-gen-features' },
    },
  ],
}`;

export const PAGE_SELECT_CODE = `// pageSelect controls which fields come back for the PAGE ITSELF
// (the includes have their own "select"). It sits next to "includes".
{
  data: {
    includes: [ /* ... */ ],
    pageSelect: {
      // fields of the page document
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
      // fields of the page's content sections
      sectionSelect: { content: 1 },
    },
  },
}`;

export const COMBINED_CODE = `// Replace ${LEAD_APPLICATION_ID} with your workspace id.
const PAGEPILOT_API = '${PP_BASE_SNIPPET}';

// Fetch the page plus its blogs, FAQs and a menu — all in ONE request.
async function fetchPageData(slug = 'fab-website') {
  const res = await fetch(\`\${PAGEPILOT_API}/pagebyslug/\${slug}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        includes: [
          {
            key: 'relatedBlogs',                  // -> data.relatedBlogs   (pages)
            entity: 'pages',
            filter: { groups: ['blog'], status: 'live' },
            limit: 10,
          },
          {
            key: 'faqs',                          // -> data.faqs           (FAQs)
            entity: 'faq-group-list',
            filter: { slug, status: 'published', orderBy: 'order_ASC' },
            limit: 1,
          },
          {
            key: 'headerMenu',                    // -> data.headerMenu     (menu)
            entity: 'menu-by-name',
            filter: { name: 'code-gen-header-features' },
          },
        ],
        // fields for the page itself
        pageSelect: {
          select: { title: 1, metaTitle: 1, metaDescription: 1, metaImageUrl: 1, editor: 1 },
          sectionSelect: { content: 1 },
        },
      },
    }),
  });

  if (!res.ok) throw new Error(\`Failed to fetch: \${res.status}\`);

  const data = await res.json();
  return {
    pageInfo: data.page || {},        // the page itself
    blogs: data.relatedBlogs || [],   // list of blog pages
    faqs: data.faqs || [],            // FAQ group
    headerMenu: data.headerMenu || [], // menu items
  };
}`;

export const CSS_LEAK_BEFORE = `function PageContent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}`;

export const CSS_LEAK_AFTER = `function PageContent({ html }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    // reuse the existing shadow root on re-renders (e.g. content refetched) —
    // calling attachShadow twice on the same host throws
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = DOMPurify.sanitize(html);
  }, [html]);

  return <div ref={hostRef} />;
}`;

export const OWN_CSS_OVERRIDE_CODE = `function PageContent({ html }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = DOMPurify.sanitize(html);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pagePilotOverrides.css';
    root.appendChild(link);
  }, [html]);

  return <div ref={hostRef} />;
}`;

export const OWN_CSS_FILE = `h1, h2, h3 { font-family: 'Inter', sans-serif; }
a { color: #4f46e5; }
table { border: 1px solid #e2e8f0; }`;

export const AI_PROMPT = `You are helping me read content from Page Pilot in my app. Write a helper that fetches a page by slug and, in the same request, a related list of pages. Follow every instruction below.

API
- Endpoint: const PAGEPILOT_API = "${PP_BASE_SNIPPET}";
- Replace ${LEAD_APPLICATION_ID} with my workspace id (found in Page Pilot: ${PAGEPILOT_APP_URL}).
- Method: POST, header Content-Type: application/json.

REQUEST
- URL: \`\${PAGEPILOT_API}/pagebyslug/\${slug}\`  (slug is MY page's slug, passed in as an argument — do not hardcode it)
- Body: { data: { includes: [ ... ], pageSelect: { ... } } }
- includes is an ARRAY — support fetching multiple related lists at once, each under its own key. Each include has:
    key:    response key the list is returned under (e.g. "relatedBlogs", "faqs", "headerMenu")
    entity: "pages" for pages, "faq-group-list" for FAQs, or "menu-by-name" for menus
    filter: for pages -> { groups: [<group>], status: "live" } (groups are user-created in Page Pilot — pass the group(s) as a parameter, don't hardcode)
            for faqs  -> { slug, status: "published", orderBy: "order_ASC" }
            for menus -> { name: "<menu-name>" }
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


// ---------------------------------------------------------------------------
// Preview mode: render the latest saved content instead of the static build.
// ---------------------------------------------------------------------------

export const PREVIEW_FETCH_CODE = `// Replace ${LEAD_APPLICATION_ID} with your workspace id.
const PAGEPILOT_API = '${PP_BASE_SNIPPET}';

// isPreview drops the { status: 'live' } filter, so unpublished edits come back too.
async function fetchPageBySlug(slug, isPreview = false) {
  const includes = isPreview ? [] : [{ filter: { status: 'live' } }];

  const res = await fetch(\`\${PAGEPILOT_API}/pagebyslug/\${slug}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        includes,
        pageSelect: {
          select: { title: 1, editor: 1, head: 1, bodyBottom: 1 },
          sectionSelect: { content: 1 },
        },
      },
    }),
  });

  if (!res.ok) throw new Error(\`Failed to fetch page: \${res.status}\`);

  const data = await res.json();
  return data.page;
}`;

export const PREVIEW_REACT_CODE = `import { useEffect, useState } from 'react';

// staticPage is whatever your build already rendered (SSG/ISR output, cached
// JSON, a bundled fixture). It stays on screen until the live copy arrives.
function PageView({ slug, staticPage }) {
  const [livePage, setLivePage] = useState(null);

  useEffect(() => {
    // Read the query string from the browser, after mount.
    const mode = new URLSearchParams(window.location.search).get('mode');
    if (mode !== 'preview' || !slug) return;

    let cancelled = false;

    fetchPageBySlug(slug, true)
      .then((page) => {
        if (!cancelled && page) setLivePage(page);
      })
      .catch((err) => console.error('Preview fetch failed:', err));

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Preview content wins when present; otherwise the static build shows.
  const page = livePage ?? staticPage;

  return <YourRenderer page={page} />;
}`;

export const PREVIEW_NEXT_NOTE_CODE = `// Next.js: do NOT use useSearchParams() for this.
// It opts the route out of static prerendering unless it sits inside a
// <Suspense> boundary, and \`next build\` fails with:
//   useSearchParams() should be wrapped in a suspense boundary at page "/"
// Reading window.location.search inside useEffect keeps the page prerenderable
// and still flips to preview on the client.
const mode = new URLSearchParams(window.location.search).get('mode');`;
