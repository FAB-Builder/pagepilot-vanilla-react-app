import { useEffect, useRef, useState } from 'react';
import { createAhd, AHD_API_HOST, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import DocLayout from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';

/**
 * The slug a tour is attached to. In PagePilot a "Target Page" is just a
 * slug; the tour for this demo is published against the `tours` slug.
 */
const TOUR_SLUG = '/tours';

type Status = 'idle' | 'loading' | 'running' | 'error';

/** The headline live example — a real ahdjs tour over sample elements. */
function LiveTourDemo() {
  const ahdRef = useRef<AhdInstance | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => ahdRef.current?.stop();
  }, []);

  const startTour = async () => {
    setError(null);
    setStatus('loading');
    try {
      const ahd = createAhd({ applicationId: DEMO_APPLICATION_ID });
      ahdRef.current = ahd;
      await ahd.initializeSiteMap(false);
      await ahd.showHighlights(TOUR_SLUG, true);
      setStatus('running');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start the tour.');
      setStatus('error');
    }
  };

  const stopTour = () => {
    ahdRef.current?.stop();
    setStatus('idle');
  };

  return (
    <div className="tour-live">
      <div className="tour-live-actions">
        {status === 'running' ? (
          <button type="button" className="btn btn--ghost" onClick={stopTour}>
            Stop Tour
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            onClick={startTour}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Starting…' : '▶ Start Tour'}
          </button>
        )}
        {status === 'running' && <span className="status status--ok">Tour running</span>}
        {error && <span className="status status--error">{error}</span>}
      </div>

      {/* Sample target elements the tour highlights. The selectors below are
          what the tour steps point at in the PagePilot admin. */}
      <div className="demo-stage">
        <button id="demo-create" className="stage-btn stage-btn--primary" type="button">
          + Create project
        </button>
        <button id="demo-search" className="stage-btn" type="button">
          Search
        </button>
        <button id="demo-settings" className="stage-btn" type="button">
          Settings
        </button>
        <div id="demo-profile" className="stage-avatar" title="Profile">
          JD
        </div>
      </div>
    </div>
  );
}

function Tours() {
  return (
    <DocLayout
      sections={[
        { id: 'when-to-use', label: 'When to use' },
        { id: 'examples', label: 'Examples' },
        { id: 'how-it-works', label: 'How it works' },
        { id: 'api', label: 'API' },
      ]}
    >
      <article className="doc-article">
        <header className="doc-article-head">
          <h1>Tours</h1>
          <p className="doc-lead">
            A tour is a step-by-step guided walkthrough that highlights elements on a page and shows
            a tooltip with a title, description, and next / previous controls. PagePilot fetches the
            tour config for a given Target Page (slug) and renders it over your real DOM.
          </p>
        </header>

        <section id="when-to-use" className="doc-section">
          <h2>When to use</h2>
          <ul className="doc-list">
            <li>Onboarding new users by walking them through key features.</li>
            <li>Introducing a new or changed feature in your product.</li>
            <li>Guiding users through a multi-step workflow.</li>
          </ul>
        </section>

        <section id="examples" className="doc-section">
          <h2>Examples</h2>

          <DemoBlock
            title="Live tour"
            description={
              <>
                Press <strong>Start Tour</strong> to run the tour published against the{' '}
                <code>{TOUR_SLUG}</code> slug. It highlights the sample buttons below.
              </>
            }
            code={LIVE_DEMO_CODE}
          >
            <LiveTourDemo />
          </DemoBlock>

          <DemoBlock
            title="Basic integration"
            description="Initialize AHDjs once, then render the tour for a slug."
            code={BASIC_CODE}
          >
            <div className="demo-static">
              <code>showHighlights("{TOUR_SLUG}", true)</code> renders the tour for the current page.
            </div>
          </DemoBlock>

          <DemoBlock
            title="Script tag install"
            description="No build step — drop AHDjs into any HTML page."
            code={SCRIPT_TAG_CODE}
            language="html"
          >
            <div className="demo-static">
              Loads AHDjs from a CDN and renders the tour on page load.
            </div>
          </DemoBlock>
        </section>

        <section id="how-it-works" className="doc-section">
          <h2>How it works</h2>
          <ol className="doc-steps">
            <li>
              <strong>Author</strong> a tour in PagePilot against a Target Page slug (here{' '}
              <code>{TOUR_SLUG}</code>), pointing each step at a CSS selector on your page.
            </li>
            <li>
              <strong>Install</strong> AHDjs in your app (npm or script tag).
            </li>
            <li>
              <strong>Initialize</strong> the client with your Application ID and call{' '}
              <code>initializeSiteMap()</code>.
            </li>
            <li>
              <strong>Render</strong> the tour for the current page with{' '}
              <code>showHighlights("{TOUR_SLUG}", true)</code>.
            </li>
          </ol>
        </section>

        <section id="api" className="doc-section">
          <h2>API</h2>

          <h3 className="doc-subhead">Constructor options</h3>
          <ApiTable
            rows={[
              {
                property: 'applicationId',
                description: 'Your PagePilot application ID.',
                type: 'string',
              },
              {
                property: 'apiHost',
                description: 'PagePilot API host.',
                type: 'string',
                default: `'${AHD_API_HOST}'`,
              },
              {
                property: 'visitorId',
                description: 'Identifier used to track tour progress per visitor.',
                type: 'string',
              },
              {
                property: 'showProgressbar',
                description: 'Whether to show a progress bar across tour steps.',
                type: 'boolean',
                default: 'false',
              },
            ]}
          />

          <h3 className="doc-subhead">Methods</h3>
          <ApiTable
            rows={[
              {
                property: 'initializeSiteMap(refetch)',
                description: 'Builds the sitemap before rendering any experience.',
                type: '(refetch: boolean) => Promise<void>',
              },
              {
                property: 'showHighlights(slug, refetch)',
                description: 'Renders the tour / highlights published for the given slug.',
                type: '(slug: string, refetch: boolean) => Promise<void>',
              },
              {
                property: 'stop()',
                description: 'Stops the currently running tour.',
                type: '() => void',
              },
            ]}
          />
        </section>
      </article>
    </DocLayout>
  );
}

/* ------------------------------- Snippets ------------------------------- */

const LIVE_DEMO_CODE = `import { useEffect, useRef } from 'react';
import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

export default function StartTourButton() {
  const ahdRef = useRef(null);

  const startTour = async () => {
    const ahdJs = AHDjs(undefined, {
      applicationId: '${DEMO_APPLICATION_ID}',
      apiHost: '${AHD_API_HOST}',
      visitorId: 'visitor-id',
      showProgressbar: false,
    });
    ahdRef.current = ahdJs;

    await ahdJs.initializeSiteMap(false);
    await ahdJs.showHighlights('${TOUR_SLUG}', true);
  };

  useEffect(() => () => ahdRef.current?.stop(), []);

  return (
    <>
      <button onClick={startTour}>Start Tour</button>
      <button id="demo-create">+ Create project</button>
      <button id="demo-search">Search</button>
    </>
  );
}`;

const BASIC_CODE = `import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

const ahdJs = AHDjs(undefined, {
  applicationId: '${DEMO_APPLICATION_ID}',
  apiHost: '${AHD_API_HOST}',
  visitorId: 'visitor-id',
  showProgressbar: false,
});

await ahdJs.initializeSiteMap(false);
await ahdJs.showHighlights('${TOUR_SLUG}', true);`;

const SCRIPT_TAG_CODE = `<link rel="stylesheet" href="https://unpkg.com/ahdjs/build/css/index.css" />
<script type="text/javascript" src="https://unpkg.com/ahdjs/build/index.js"></script>
<script>
  const AHDjs = window.AHDjs.default;
  const _ahdJs = new AHDjs(undefined, {
    applicationId: '${DEMO_APPLICATION_ID}',
    apiHost: '${AHD_API_HOST}',
    visitorId: 'visitor-id',
    showProgressbar: false,
  });
  _ahdJs.initializeSiteMap();
  _ahdJs.showHighlights('${TOUR_SLUG}', true);
</script>`;

export default Tours;
