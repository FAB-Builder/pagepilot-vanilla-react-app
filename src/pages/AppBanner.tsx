import { useRef, useState } from 'react';
import { createAhd, AHD_API_HOST, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-demo', label: 'Live demo' },
  { id: 'api', label: 'API reference' },
];

function LiveBannerDemo() {
  const ahdRef = useRef<AhdInstance | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [activeIdentifier, setActiveIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);

  const renderBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    const ident = identifier.trim();
    if (!ident) {
      setError('Enter a Banner Identifier.');
      return;
    }
    setError(null);
    setActiveIdentifier(ident);
    try {
      const ahd = createAhd({ applicationId: DEMO_APPLICATION_ID });
      ahdRef.current = ahd;
      await ahd.initializeSiteMap(false);
      await ahd.renderAppBanner(ident, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to render the banner.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-wrap gap-2.5" onSubmit={renderBanner}>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Banner Identifier (e.g. CHANNEL_M)"
          autoComplete="off"
          spellCheck={false}
          className="min-w-[220px] flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Fetch Banner
        </button>
      </form>
      {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Preview</span>
          {activeIdentifier && (
            <span className="rounded-full bg-brand-tint px-2 py-0.5 text-xs font-semibold text-brand">
              {activeIdentifier}
            </span>
          )}
        </div>
        <div className="min-h-[60px] rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
          <div id={activeIdentifier} />
        </div>
      </div>
    </div>
  );
}

function AppBanner() {
  return (
    <DocLayout title="App Banner" sections={SECTIONS}>
      <article className="max-w-3xl">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            Components
          </span>
          <h1 className="mt-1 text-3xl font-bold">App Banner</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            App banners are announcement blocks fetched by identifier and rendered into a container
            in your app — great for promotions, release notes, or channel-specific messaging.
          </p>
        </header>

        <section id="overview" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">Overview</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
            <li>Announce a promotion, update, or maintenance window.</li>
            <li>Show channel- or audience-specific messaging by identifier.</li>
          </ul>
        </section>

        <section id="live-demo" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">Live demo</h2>
          <DemoBlock
            title="Live banner"
            description="Enter a Banner Identifier and fetch it from PagePilot."
            code={BANNER_CODE}
          >
            <LiveBannerDemo />
          </DemoBlock>
        </section>

        <section id="api" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">API reference</h2>
          <ApiTable
            rows={[
              {
                property: 'renderAppBanner(identifier, refetch)',
                description: 'Renders the banner into <div id="{identifier}" /> in your DOM.',
                type: '(identifier: string, refetch: boolean) => Promise<unknown>',
              },
              {
                property: 'initializeSiteMap(refetch)',
                description: 'Builds the sitemap before rendering.',
                type: '(refetch: boolean) => Promise<void>',
              },
            ]}
          />
        </section>
      </article>
    </DocLayout>
  );
}

const BANNER_CODE = `import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

const ahdJs = AHDjs(undefined, {
  applicationId: '${DEMO_APPLICATION_ID}',
  apiHost: '${AHD_API_HOST}',
  visitorId: 'visitor-id',
  showProgressbar: false,
});

await ahdJs.initializeSiteMap(false);
// Renders into <div id="CHANNEL_M" /> in your DOM.
await ahdJs.renderAppBanner('CHANNEL_M', true);`;

export default AppBanner;
