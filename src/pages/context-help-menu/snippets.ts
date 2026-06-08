import { PAGEPILOT_API_HOST } from '../../lib/ahd';

export const FETCH_MENU_CODE = `// WORKSPACE_ID  — your workspace id from Page Pilot → Settings → General
// MENU_NAME     — the name you gave your menu in Page Pilot → Menus
const PAGEPILOT_API = '${PAGEPILOT_API_HOST}/tenant/YOUR_WORKSPACE_ID';

async function fetchMenu(menuName) {
  const res = await fetch(\`\${PAGEPILOT_API}/menu-by-name/\${menuName}\`);
  if (!res.ok) throw new Error(\`Failed to fetch: \${res.status}\`);
  const data = await res.json();
  return data.configuration; // HelpItem[]
}

// Usage — pass the exact name of your menu:
const items = await fetchMenu('my-help-menu');`;

export const FETCH_PAGE_CODE = `// When a menu item is clicked, fetch the linked page by its href (slug).
// The endpoint is:  GET /pagebypath/{slug}

const PAGEPILOT_API = '${PAGEPILOT_API_HOST}/tenant/YOUR_WORKSPACE_ID';

async function fetchPageByPath(slug) {
  const res = await fetch(\`\${PAGEPILOT_API}/pagebypath/\${slug}\`);
  if (!res.ok) throw new Error(\`Failed to fetch page: \${res.status}\`);
  return res.json(); // Page object
}

// The page object contains a sections array.
// Each section has a content field (HTML string).
// Render each section in order:
const page = await fetchPageByPath('help/getting-started');

page.sections.forEach((section) => {
  // render section.content as raw HTML (sanitize with DOMPurify)
  container.innerHTML = DOMPurify.sanitize(section.content);
});`;

export const FULL_DRAWER_CODE = `import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const PAGEPILOT_API = '${PAGEPILOT_API_HOST}/tenant/YOUR_WORKSPACE_ID';

// Step 1 — fetch the menu tree
async function fetchMenu(menuName) {
  const res = await fetch(\`\${PAGEPILOT_API}/menu-by-name/\${menuName}\`);
  const data = await res.json();
  return data.configuration ?? []; // HelpItem[]
}

// Step 2 — fetch page content when an item is clicked
async function fetchPageByPath(slug) {
  const res = await fetch(\`\${PAGEPILOT_API}/pagebypath/\${slug}\`);
  if (!res.ok) throw new Error(\`\${res.status}\`);
  return res.json();
}

function ContextHelpDrawer({ open, onClose, menuName }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (open) fetchMenu(menuName).then(setMenuItems);
  }, [open, menuName]);

  const handleItemClick = async (item) => {
    if (!item.href) return; // category header — no page
    setPageLoading(true);
    setActivePage(null);
    try {
      const page = await fetchPageByPath(item.href);
      setActivePage(page);
    } finally {
      setPageLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="help-drawer">
      <button onClick={onClose}>✕</button>

      {activePage ? (
        <div>
          <button onClick={() => setActivePage(null)}>← Back</button>
          <h2>{activePage.name}</h2>
          {activePage.sections?.map((section) => (
            <div
              key={section.id}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(section.content),
              }}
            />
          ))}
        </div>
      ) : pageLoading ? (
        <p>Loading…</p>
      ) : (
        <MenuTree items={menuItems} onSelect={handleItemClick} />
      )}
    </div>
  );
}

function MenuTree({ items, onSelect }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <button onClick={() => onSelect(item)}>{item.name}</button>
          {item.children?.length > 0 && (
            <MenuTree items={item.children} onSelect={onSelect} />
          )}
        </li>
      ))}
    </ul>
  );
}`;


export const CONFIGURE_MENU_CODE = `// 1. Go to Page Pilot → Menus → Create menu
// 2. Give it any name, e.g.  my-help-menu
// 3. Add top-level items, each with:
//    • Name  — label shown in the drawer
//    • Href  — slug of a Page Pilot page whose content opens when clicked
//    • Optional children for nested sections

// Example hierarchy that matches the API shape:
const exampleConfig = [
  {
    name: "Getting Started",
    href: "help/getting-started",   // ← must be a published page slug
    children: [
      { name: "Quick Setup",    href: "help/quick-setup",    children: [] },
      { name: "Configuration",  href: "help/configuration",  children: [] },
    ],
  },
  {
    name: "Tours",
    href: "help/tours",
    children: [
      { name: "Creating a Tour",  href: "help/creating-tour",  children: [] },
      { name: "Tour Analytics",   href: "help/tour-analytics", children: [] },
    ],
  },
];

// Fetch it by the name you chose:
const res = await fetch(
  'https://pagepilot.fabbuilder.com/api/tenant/YOUR_WORKSPACE_ID/menu-by-name/my-help-menu'
);
const { configuration } = await res.json(); // HelpItem[]`;
