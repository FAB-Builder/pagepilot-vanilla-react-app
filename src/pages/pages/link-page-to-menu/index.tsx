import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section } from '../../../components/DocSection';
import { PAGES_SUBMODULES } from '../subModules';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'create-page', label: '1. Create a page' },
  { id: 'publish-page', label: '2. Publish the page' },
  { id: 'link-to-menu', label: '3. Link to a menu' },
  { id: 'verify', label: '4. Verify the link' },
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
            Once you've built a page in the Page Pilot editor, you can publish it and immediately
            connect it to one or more navigation menus — all from a single dialog, without leaving
            the editor.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            Linking a page to a menu means users can reach it through your site's navigation
            without any extra steps. The flow is:
          </p>
          <ol className="my-4 list-decimal space-y-2 pl-6 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Create a page</strong> — give it a name, slug, and
              optional group.
            </li>
            <li>
              <strong className="text-ink">Design and publish</strong> — open the Publish dialog,
              fill in the Basic Info tab, then publish.
            </li>
            <li>
              <strong className="text-ink">Add to a menu</strong> — on the Menu &amp; Links tab,
              pick the menu(s) and confirm the item name, then save.
            </li>
            <li>
              <strong className="text-ink">Verify</strong> — re-open the dialog to confirm the
              page now appears in the linked menus list.
            </li>
          </ol>
        </Section>

        <Section id="create-page" title="1. Create a page">
          <p>
            Click <strong>New Page</strong> from the Pages list. The{' '}
            <strong>Set Page Details</strong> dialog opens.
          </p>
          <ul className="my-4 list-disc space-y-3 pl-6 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Name</strong> — the internal label shown in the Pages
              list (e.g. <em>About Us</em>). Required.
            </li>
            <li>
              <strong className="text-ink">Slug</strong> — the URL path for the page
              (e.g. <em>about-us</em>). Auto-generated from the name; edit it if you need a
              custom path. The slug must be unique across your workspace.
            </li>
            <li>
              <strong className="text-ink">Alternative Slug</strong> — click{' '}
              <em>+ Add Alternative Slug</em> to add redirect aliases that also point to this
              page.
            </li>
            <li>
              <strong className="text-ink">Assign</strong> — optionally assign the page to a team
              member for ownership tracking.
            </li>
            <li>
              <strong className="text-ink">Groups</strong> — assign the page to one or more groups
              so it can be filtered in lists and fetched by group via the API.
            </li>
          </ul>
          <p>
            Click <strong>Next</strong> when done. The editor opens with a blank canvas (or a
            template if you selected one).
          </p>
        </Section>

        <Section id="publish-page" title="2. Publish the page">
          <p>
            Click the <strong>Publish</strong> button at the top-right of the editor. The{' '}
            <strong>Publish Page</strong> dialog opens with three tabs.
          </p>

          <h3 className="mt-5 mb-2 font-semibold text-ink">Basic Info tab</h3>
          <p>Fill in the publication metadata:</p>
          <ul className="my-3 list-disc space-y-3 pl-6 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Name</strong> — the public-facing page title shown in
              search results and meta tags.
            </li>
            <li>
              <strong className="text-ink">Slug</strong> — pre-filled from the page slug set in
              step 1. Edit here if you need to change the live URL.
            </li>
            <li>
              <strong className="text-ink">Publish date</strong> — set a date and time to schedule
              publication, or leave it blank to publish immediately.
            </li>
            <li>
              <strong className="text-ink">All time live</strong> — toggle on to keep the page
              live indefinitely (no expiry).
            </li>
          </ul>
          <p>
            Click <strong>Publish</strong> (or <strong>Save Draft</strong> to save without going
            live). The page is now accessible at its slug URL.
          </p>
        </Section>

        <Section id="link-to-menu" title="3. Link to a menu">
          <p>
            Switch to the <strong>Menu &amp; Links</strong> tab in the same Publish dialog (you
            can do this before or after clicking Publish — the dialog stays open).
          </p>

          <h3 className="mt-5 mb-2 font-semibold text-ink">Existing menu links</h3>
          <p>
            The tab automatically searches for any menus that already reference this page's slug.
            If the page appears in menus, they're listed here. Click the{' '}
            <strong>edit icon</strong> next to a menu name to open its editor in a new tab and
            adjust the item's label, order, or children.
          </p>

          <h3 className="mt-5 mb-2 font-semibold text-ink">Add to a menu</h3>
          <p>Use the <strong>Add to Menu</strong> form below the list:</p>
          <ul className="my-3 list-disc space-y-3 pl-6 text-sm text-slate-600">
            <li>
              <strong className="text-ink">Select Menu</strong> — pick one or more menus from the
              dropdown. All menus in your workspace are listed. You can add the page to multiple
              menus at once.
            </li>
            <li>
              <strong className="text-ink">Menu Item Name</strong> — the label that appears in the
              navigation (e.g. <em>About Us</em>). Pre-filled with the page name; change it to
              anything you like.
            </li>
          </ul>
          <p>
            Click <strong>Add to Menu</strong>. A new menu item is created in each selected menu,
            with its link (href) set to the page's slug automatically. No further configuration is
            needed in the Menu editor for a basic link.
          </p>
        </Section>

        <Section id="verify" title="4. Verify the link">
          <p>
            After clicking <strong>Add to Menu</strong>, the linked menus list at the top of the
            tab refreshes. You should see the newly added menus appear there, confirming the item
            was created successfully.
          </p>
          <p>
            To double-check, click the edit icon next to any listed menu. The Menu editor opens
            in a new tab showing the full item tree — your page's item should be visible at the
            bottom of the list.
          </p>
          <p>
            If you need to change the item's position in the menu (reorder it or nest it under a
            parent), do that from the Menu editor directly. The Publish dialog only creates the
            item — full menu management happens in the Menus module.
          </p>
        </Section>
      </article>
    </DocLayout>
  );
}
