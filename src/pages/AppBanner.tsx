import { useRef, useState } from 'react';
import { createAhd, AHD_API_HOST, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import DocLayout from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';

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
    <div className="tour-live">
      <form className="banner-form" onSubmit={renderBanner}>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Banner Identifier (e.g. CHANNEL_M)"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="btn btn--primary">
          Fetch Banner
        </button>
      </form>
      {error && <p className="status status--error">{error}</p>}
      <div className="preview-section">
        <div className="preview-label">
          <span>Preview</span>
          {activeIdentifier && <span className="preview-badge">{activeIdentifier}</span>}
        </div>
        <div className="preview-card">
          <div id={activeIdentifier} />
        </div>
      </div>
    </div>
  );
}

function AppBanner() {
  return (
    <DocLayout
      sections={[
        { id: 'when-to-use', label: 'When to use' },
        { id: 'examples', label: 'Examples' },
        { id: 'api', label: 'API' },
      ]}
    >
      <article className="doc-article">
        <header className="doc-article-head">
          <h1>App Banner</h1>
          <p className="doc-lead">
            App banners are announcement blocks fetched by identifier and rendered into a container
            in your app — great for promotions, release notes, or channel-specific messaging.
          </p>
        </header>

        <section id="when-to-use" className="doc-section">
          <h2>When to use</h2>
          <ul className="doc-list">
            <li>Announce a promotion, update, or maintenance window.</li>
            <li>Show channel- or audience-specific messaging by identifier.</li>
          </ul>
        </section>

        <section id="examples" className="doc-section">
          <h2>Examples</h2>
          <DemoBlock
            title="Live banner"
            description="Enter a Banner Identifier and fetch it from PagePilot."
            code={BANNER_CODE}
          >
            <LiveBannerDemo />
          </DemoBlock>
        </section>

        <section id="api" className="doc-section">
          <h2>API</h2>
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
