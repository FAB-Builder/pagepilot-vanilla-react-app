import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import { PAGES_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'create-page', label: '1. Create a page' },
  { id: 'design-page', label: '2. Design your page' },
  { id: 'publish-page', label: '3. Publish the page' },
  { id: 'link-to-menu', label: '4. Link to a menu' },
  { id: 'verify', label: '5. Verify & manage' },
  { id: 'tips', label: 'Tips & things to know' },
];

export default function LinkPageToMenu() {
  return (
    <DocLayout
      title="Link a Page to a Menu"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Link a Page to a Menu
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Build a page, publish it, and make it reachable from your site's navigation — all
            without leaving the editor. This guide walks you through every step, from naming your
            page to seeing it appear as a clickable menu item.
          </p>
        </header>

        {/* ---------------------------------------------------------------- */}
        <Section id="overview" title="Overview">
          <p>
            Think of a page and a menu item as two separate things that need to know about each
            other. The <strong>page</strong> holds the content (text, images, blocks). The{' '}
            <strong>menu item</strong> is just a link in your navigation that points visitors to
            that page. Page Pilot lets you create both in one flow.
          </p>
          <p>Here's the full journey at a glance:</p>
          <ol className="my-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Create a page</strong> — give it a name, a URL slug,
              and optional grouping. This is the identity of your page.
            </li>
            <li>
              <strong className="text-ink">2. Design your page</strong> — use the editor to add
              text, images, buttons, and more. You can skip this for now and come back.
            </li>
            <li>
              <strong className="text-ink">3. Publish the page</strong> — open the Publish dialog,
              click Publish. The page goes live on its URL.
            </li>
            <li>
              <strong className="text-ink">4. Link to a menu</strong> — inside the same Publish
              dialog, switch to the Menu &amp; Links tab, pick your menu, and click Add to Menu.
              The navigation link is created instantly.
            </li>
            <li>
              <strong className="text-ink">5. Verify</strong> — confirm the page now shows up in
              the linked menus list, and open the menu editor if you need to reorder or nest it.
            </li>
          </ol>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <strong className="text-ink">Good to know:</strong> The Publish dialog stays open after
            you publish, so you can switch to the Menu &amp; Links tab right away — no need to
            reopen anything.
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="create-page" title="1. Create a page">
          <p>
            Every page starts with a name and a slug. Think of the name as the internal label
            you'll see in the Pages list, and the slug as the address people visit in their
            browser (e.g. <em>yoursite.com/about-us</em>).
          </p>

          <p className="mt-4 font-semibold text-ink">How to open the dialog</p>
          <ol className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1.</strong> Go to the <strong>Pages</strong> section
              from the main sidebar.
            </li>
            <li>
              <strong className="text-ink">2.</strong> Click <strong>New Page</strong> (top-right
              corner). The <strong>Set Page Details</strong> dialog opens.
            </li>
          </ol>

          <p className="mt-4 font-semibold text-ink">Fill in the details</p>
          <ul className="my-3 space-y-4 text-sm text-slate-600">
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">Name <span className="font-normal text-red-500">*</span></p>
              <p className="mt-1">
                The internal label shown in your Pages list — only your team sees this. Keep it
                descriptive so you can find the page later. Example: <em>About Us</em>,{' '}
                <em>Pricing Page Q3</em>, <em>Blog – Getting Started</em>.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">Slug <span className="font-normal text-red-500">*</span></p>
              <p className="mt-1">
                The URL path visitors will use to reach this page. Page Pilot auto-generates it
                from the name (spaces become hyphens, everything lowercased), but you can edit it
                freely. <em>about-us</em> → the page lives at <em>yoursite.com/about-us</em>.
              </p>
              <p className="mt-2 text-slate-500">
                The slug must be unique — no two pages in your workspace can share the same slug.
                If you try to save a duplicate, you'll see a warning.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">+ Add Alternative Slug</p>
              <p className="mt-1">
                Optional. Click this link to add extra aliases that also point to the same page.
                Useful when you rename a slug but want the old URL to keep working without
                breaking links.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">Assign</p>
              <p className="mt-1">
                Optional. Assign the page to a specific team member so everyone knows who owns
                it. This is just for internal tracking — it has no effect on the live page.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">Groups</p>
              <p className="mt-1">
                Optional. Put the page into one or more groups (e.g. <em>Blog</em>,{' '}
                <em>Landing Pages</em>, <em>Help Center</em>). Groups let you filter pages in the
                dashboard and fetch a whole category of pages at once via the API.
              </p>
            </li>
          </ul>

          <p className="mt-2">
            Click <strong>Next</strong> when you're happy with the details. The editor opens
            on a blank canvas, ready for you to design.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="design-page" title="2. Design your page">
          <p>
            The canvas is where you build what visitors will actually see. You can add text
            blocks, headings, images, buttons, videos, carousels, accordions — anything from the
            block library on the left sidebar.
          </p>
          <p>
            You don't have to finish the design before publishing. It's perfectly fine to publish
            a page with placeholder content, then come back and refine it. The important thing at
            this stage is that the page exists so you can link it to a menu.
          </p>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <strong className="text-ink">Tip:</strong> If you already have a saved template that
            matches this page's purpose, apply it from the <strong>Saved Templates</strong> panel
            to get a head start — then just swap out the content.
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="publish-page" title="3. Publish the page">
          <p>
            Publishing makes the page live so anyone with the URL can visit it. Until you publish,
            the page exists only in the editor and isn't accessible on the web.
          </p>

          <p className="mt-4 font-semibold text-ink">Open the Publish dialog</p>
          <ol className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1.</strong> Click the <strong>Publish</strong> button in
              the top-right corner of the editor.
            </li>
            <li>
              <strong className="text-ink">2.</strong> The <strong>Publish Page</strong> dialog
              opens. You'll see three tabs at the top:{' '}
              <strong>Basic Info</strong>, <strong>Menu &amp; Links</strong>, and{' '}
              <strong>Scripts &amp; Styles</strong>. You're on Basic Info by default — you only
              need to fill this tab to publish. The other tabs are optional extras.
            </li>
          </ol>

          <p className="mt-2">
            When you're ready, click <strong>Publish</strong> at the bottom of the dialog. The
            page is now live. If you aren't ready to go live yet, click{' '}
            <strong>Save Draft</strong> to save your settings without publishing — you can come
            back and publish later.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <strong className="text-ink">Remember:</strong> The dialog does <em>not</em> close
            after you publish. Stay in it and move straight to the next step.
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="link-to-menu" title="4. Link to a menu">
          <p>
            Now switch to the <strong>Menu &amp; Links</strong> tab (the second tab at the top
            of the dialog). This is where you connect your page to your site's navigation.
          </p>

          <p className="mt-5 font-semibold text-ink">What you'll see first — existing links</p>
          <p>
            When you open this tab, Page Pilot automatically looks up all menus that already
            contain a link pointing to this page's slug. If any are found, they appear as a list
            here — each showing the menu name with a small edit icon on the right.
          </p>
          <ul className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">If you see menus listed</strong> — this page is already
              part of those menus. You can click the edit icon to open the menu editor in a new
              browser tab and manage the item there.
            </li>
            <li>
              <strong className="text-ink">If the list is empty</strong> — no menus link to this
              page yet. That's completely normal for a freshly created page. Use the form below to
              add it now.
            </li>
          </ul>

          <p className="mt-5 font-semibold text-ink">Add to a menu — step by step</p>
          <ol className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">1. Select Menu</strong> — click the dropdown and choose
              one or more menus you want this page to appear in. All menus in your workspace are
              listed. You can select multiple at once — for example, add the page to both the
              main header navigation and the footer in one go.
            </li>
            <li>
              <strong className="text-ink">2. Menu Item Name</strong> — this is the label that
              visitors will read in the navigation. It's pre-filled with the page name, but you
              can change it to anything. Example: the page name might be{' '}
              <em>Pricing Page Q3 (Internal)</em> but you want the menu label to just say{' '}
              <em>Pricing</em>.
            </li>
            <li>
              <strong className="text-ink">3. Click "Add to Menu"</strong> — Page Pilot creates a
              new menu item in each selected menu. The item's link (href) is set to this page's
              slug automatically — you don't need to type a URL.
            </li>
          </ol>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <strong className="text-ink">What happens behind the scenes:</strong> Page Pilot finds
            each selected menu, appends a new item to its list with your chosen name and the
            page's slug as the href, and saves the menu. The whole thing happens in one click.
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="verify" title="5. Verify & manage">
          <p>
            After clicking <strong>Add to Menu</strong>, the linked menus list at the top of the
            tab automatically refreshes. The menus you just added should now appear in the list —
            that's your confirmation that it worked.
          </p>

          <p className="mt-4 font-semibold text-ink">Check the menu item in the editor</p>
          <p>
            Click the <strong>edit icon</strong> next to any menu in the list. The Menu editor
            opens in a new browser tab showing the full tree of that menu. Scroll to the bottom
            — you should see your new item there.
          </p>

          <p className="mt-4 font-semibold text-ink">Reorder or nest the item</p>
          <p>
            The Publish dialog only <em>creates</em> the menu item at the bottom of the list. If
            you need to move it to a different position — or nest it under a parent item (e.g.
            under a "Company" dropdown) — do that inside the Menu editor. Drag and drop items to
            reorder them, or indent them to create a nested structure.
          </p>

          <p className="mt-4 font-semibold text-ink">Edit the item name later</p>
          <p>
            If you want to rename the navigation label after the fact, open the Menu editor from
            the edit icon, find the item, and update its name there. Changes to the menu item name
            do not affect the page's internal name or its slug.
          </p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <strong className="text-ink">Result:</strong> Your page is live and linked. Visitors
            who click the menu item in your navigation will land on the published page.
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section id="tips" title="Tips & things to know">
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">You can add a page to multiple menus at once</p>
              <p className="mt-1">
                The menu selector supports multi-select. Pick your header menu and footer menu at
                the same time and click Add to Menu once — both are updated in a single action.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">The menu item name and the page name are independent</p>
              <p className="mt-1">
                The page name (internal label), the public name (shown in the browser tab), and
                the menu item name are all separate. You can have a page named{' '}
                <em>Pricing v2 Experiment</em> internally, published as <em>Pricing</em> publicly,
                with the menu label reading <em>Plans &amp; Pricing</em> — they don't need to
                match.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">Changing the slug breaks existing menu links</p>
              <p className="mt-1">
                If you update a page's slug after it's already linked to a menu, the menu item
                will still point to the old slug. You'll need to update the href in the Menu editor
                manually, or add the old slug as an Alternative Slug on the page to keep both
                URLs working.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">You can link a draft page to a menu</p>
              <p className="mt-1">
                The Menu &amp; Links tab works even if you clicked <strong>Save Draft</strong>
                instead of Publish. The menu item will be created, but clicking it will lead to a
                page that isn't live yet — so link draft pages to menus only when you're close to
                publishing.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-ink">Full menu management lives in the Menus module</p>
              <p className="mt-1">
                The Publish dialog is designed for quickly creating a new item. For anything more
                advanced — reordering, nesting, renaming existing items, or removing items — use
                the <strong>Menus</strong> section in the main sidebar.
              </p>
            </li>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}
