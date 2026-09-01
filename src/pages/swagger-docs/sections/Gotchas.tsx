import { Section, Code } from '../../../components/DocSection';

export default function Gotchas() {
  return (
    <Section id="gotchas" title="Gotchas">
      <ul className="my-2 list-disc space-y-2 pl-6 text-sm text-slate-600">
        <li>
          <strong className="text-ink">Canvas works but publish drops it.</strong> The most
          common cause is a leading slash on a menu <Code>href</Code>: the sidebar renders and
          every item 404s. <Code>href</Code> and <Code>slug</Code> are the same string, no
          leading slash.
        </li>
        <li>
          <strong className="text-ink">Missing <Code>documentation-top-menu</Code></strong>{' '}
          returns 404 during static export and <strong>fails <Code>npm run build</Code></strong>{' '}
          even though <Code>npm run dev</Code> looks fine. It is not optional.
        </li>
        <li>
          <strong className="text-ink">
            Page created with <Code>groups: []</Code>
          </strong>{' '}
          resolves fine in dev but is invisible to <Code>generateStaticParams</Code> — the
          static build emits zero documentation pages.
        </li>
        <li>
          <strong className="text-ink">Publish state is two fields.</strong> A published page
          is <Code>status: "live"</Code> <em>and</em> <Code>isActive: true</Code>. Setting only
          one leaves it half-published.
        </li>
        <li>
          <strong className="text-ink">
            <Code>upsert-page-item</Code> is not slug-idempotent.
          </strong>{' '}
          Pass the existing page's <Code>id</Code> or you create two pages with the same slug.
        </li>
        <li>
          <strong className="text-ink">
            Request <Code>identifier</Code> and <Code>sectionType</Code> explicitly
          </strong>{' '}
          in <Code>sectionSelect</Code> — the <Code>pagebyslug</Code> API omits them by
          default, and without them no executor can ever match.
        </li>
        <li>
          <strong className="text-ink">Never commit the service token.</strong> Environment
          only, for the generator run. The published site is static and public.
        </li>
        <li>
          <strong className="text-ink">The template is given, not built.</strong> No new
          design system, no re-scaffold, no swapping Tailwind/shadcn, no "cleanup" refactor of
          layout or navigation. Touch only the Phase 4.1 files.
        </li>
      </ul>
    </Section>
  );
}
