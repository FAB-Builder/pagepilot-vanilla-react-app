import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';

export default function Constants() {
  return (
    <Section id="constants" title="Wire lib/constants.ts">
      <p>
        <Code>lib/constants.ts</Code> is the only file that must change per deployment. The
        service token never goes here.
      </p>
      <div className="my-3">
        <CodeSnippet
          language="ts"
          code={`export const APPLICATION_ID = "<tenant id>";              // your PagePilot tenant id
export const API_HOST = "https://pagepilot.fabbuilder.com";
export const TENANT_API = \`\${API_HOST}/api/tenant/\${APPLICATION_ID}\`;

/** The API the docs describe — what executors call. From the spec itself. */
export const API_BASE_URL = "<servers[0].url, or host+basePath>";

export const SITE_URL = "<docs site public URL>";
export const SITE_NAME = "<product name>";
export const SITE_DESCRIPTION = "<one line>";
export const COMPANY_NAME = "<company>";`}
        />
      </div>
      <p className="text-sm text-slate-600">
        The full list of files you may change is in the README's Phase 4.1:{' '}
        <Code>lib/constants.ts</Code>, <Code>components/SectionContent.tsx</Code>,{' '}
        <Code>components/executor/*.tsx</Code> (new files),{' '}
        <Code>lib/documentation/routes.ts</Code>, the <Code>app/&lt;group&gt;/</Code> pair
        (only if you add a group), <Code>app/page.tsx</Code> landing copy, and branding
        assets. Everything else is read-only.
      </p>
    </Section>
  );
}
