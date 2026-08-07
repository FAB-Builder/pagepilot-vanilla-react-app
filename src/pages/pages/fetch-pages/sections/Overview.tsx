import { LEAD_APPLICATION_ID, PAGEPILOT_APP_URL } from '../../../../lib/ahd';
import { Section, Code } from '../../../../components/DocSection';
import CaseStudyCallout from '../../../../components/CaseStudyCallout';

function Overview() {
  return (
    <Section id="overview" title="Overview">
      <p>
        Every piece of content in Page Pilot is a <strong>page</strong> with a unique{' '}
        <Code>slug</Code>. To show it on your site you ask Page Pilot for that page by its slug. In
        the same call you can also pull in <em>related</em> pages — for example, a blog index page
        can return the page itself plus the list of all published posts.
      </p>
      <p>
        This works the same way the FabBuilder website renders its blog: it requests the{' '}
        <Code>website-blogs</Code> page and, alongside it, a filtered list of blog pages to show in
        the grid.
      </p>

      <CaseStudyCallout />

      <p>
        That site is worth opening next to this page. Its entire routing layer is a single Next.js
        catch-all — <Code>app/[...slug]/page.tsx</Code> — which asks Page Pilot for the list of
        live slugs at build time, then renders each one by calling{' '}
        <Code>/pagebyslug/&#123;slug&#125;</Code>. Adding a page to the site means creating a page
        in Page Pilot; no route file is written, and no code is deployed.
      </p>
      <p>
        Requests are scoped to your <strong>workspace&nbsp;id</strong>. Replace{' '}
        <Code>{LEAD_APPLICATION_ID}</Code> in the URL with yours — find it in{' '}
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
  );
}

export default Overview;
