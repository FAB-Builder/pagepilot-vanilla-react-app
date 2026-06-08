import { PAGEPILOT_GROUPS_URL } from '../../../../lib/ahd';
import { Section, Code } from '../../../../components/DocSection';
import PropertyCard from '../../../../components/PropertyCard';

function Filter() {
  return (
    <Section id="filter" title="Filter">
      <p>
        The <Code>filter</Code> object decides <em>which</em> pages an include returns. The two
        you'll use most:
      </p>
      <PropertyCard type="string[]" defaultValue="[]">
        <span>
          <strong>groups</strong> — only return pages that belong to these groups. Groups are how you
          organise content in Page Pilot, and <strong>you create your own</strong> — the names here (
          <Code>'blogs'</Code>, <Code>'faqs'</Code>) are just examples; use whatever groups you've set
          up. Manage them in{' '}
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
          <strong>status</strong> — only return pages with this status. Use <Code>'live'</Code> so
          visitors never see unpublished drafts.
        </span>
      </PropertyCard>
    </Section>
  );
}

export default Filter;
