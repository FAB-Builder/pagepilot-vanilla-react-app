import DocLayout, { type DocSection } from '../components/DocLayout';
import DemoBlock from '../components/DemoBlock';
import ApiTable from '../components/ApiTable';
import CodeSnippet from '../components/CodeSnippet';
import TypeBannerDemo from './TypeBannerDemo';
import { BANNER_TYPES } from './appBannerTypes';
import { REACT_CODE, buildBannerCode } from './appBannerSnippets';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'types', label: 'Banner types' },
  { id: 'configure', label: 'Configuring a banner' },
  { id: 'integration', label: 'Integration (React)' },
  { id: 'live-demo', label: 'Live demos' },
  { id: 'api', label: 'API reference' },
];

const CONFIG_FIELDS: { field: string; type: string; description: string }[] = [
  {
    field: 'identifier',
    type: 'string',
    description:
      'The unique key you pass to renderAppBanner(). The banner renders into the matching <div id="{identifier}" />.',
  },
  {
    field: 'type',
    type: 'simpleBanner | carousel | modal | floater',
    description: 'The banner layout. See Banner types above.',
  },
  {
    field: 'content',
    type: 'reference',
    description: 'The content (text / images) shown in the banner, authored in Page Pilot.',
  },
  {
    field: 'buttonText',
    type: 'string',
    description: 'Label for the call-to-action button.',
  },
  {
    field: 'buttonColor',
    type: 'string',
    description: 'Background color of the call-to-action button.',
  },
  {
    field: 'buttonTextColor',
    type: 'string',
    description: 'Text color of the call-to-action button.',
  },
  {
    field: 'link',
    type: 'string',
    description: 'URL the banner / button navigates to when clicked.',
  },
  {
    field: 'sequence',
    type: 'number',
    description: 'Order used when more than one banner can render in the same place.',
  },
  {
    field: 'start / end',
    type: 'datetime',
    description: 'Optional schedule window — the banner only shows live between these times.',
  },
  {
    field: 'isActive',
    type: 'boolean',
    description: 'Whether the banner is live. Inactive banners are not rendered.',
  },
];

function AppBanner() {
  return (
    <DocLayout title="App Banner" sections={SECTIONS}>
      <article className="">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold">App Banner</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            App banners are announcement blocks fetched by <strong>identifier</strong> and rendered
            into a container in your app — great for promotions, release notes, or channel-specific
            messaging. Banners come in several layouts, and one integration call —{' '}
            <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              renderAppBanner(identifier, true)
            </code>{' '}
            — renders whichever type you configured in Page Pilot.
          </p>
        </header>

        <section id="overview" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">Overview</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
            <li>Announce a promotion, update, or maintenance window.</li>
            <li>Show channel- or audience-specific messaging by identifier.</li>
            <li>
              Choose the layout that fits — an inline <strong>Simple Banner</strong>, a rotating{' '}
              <strong>Carousel</strong>, an attention-grabbing <strong>Modal</strong>, or a
              persistent <strong>Floater</strong>.
            </li>
            <li>
              The layout is decided in Page Pilot; your app code stays the same regardless of type.
            </li>
          </ul>
          <p className="mt-3 leading-relaxed text-slate-600">
            Banners are authored in{' '}
            <a
              href="https://pagepilot.fabbuilder.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Page Pilot → App Banners
            </a>
            , then rendered into your app with the AHDjs SDK.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">What is an identifier?</h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            The <strong>identifier</strong> is the unique name you give a banner in Page Pilot (for
            example{' '}
            <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              FAB_BANNER_TYPE_SIMPLE
            </code>
            ). It is the single link between the banner you author and the spot in your app where it
            appears: you create a container with that same{' '}
            <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              id
            </code>
            , and AHDjs injects the banner into it. <strong>Identifiers must be unique</strong> —
            one identifier maps to exactly one banner and one container.
          </p>

          <h3 className="mt-6 font-semibold text-slate-800">How to embed a banner — in 3 steps</h3>
          <ol className="mt-2 space-y-3 leading-relaxed text-slate-600">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                1
              </span>
              <span>
                <strong>Create the banner</strong> in Page Pilot → App Banners, pick a{' '}
                <strong>type</strong>, and give it an <strong>identifier</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                2
              </span>
              <span>
                <strong>Add a container</strong> with the matching id where you want it to show:{' '}
                <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  &lt;div id="FAB_BANNER_TYPE_SIMPLE"&gt;&lt;/div&gt;
                </code>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                3
              </span>
              <span>
                <strong>Initialize AHDjs and render</strong> — call{' '}
                <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  initializeSiteMap()
                </code>{' '}
                then{' '}
                <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
                  renderAppBanner("FAB_BANNER_TYPE_SIMPLE", true)
                </code>
                . The same call works for <strong>every banner type</strong>.
              </span>
            </li>
          </ol>
          <p className="mt-3 leading-relaxed text-slate-600">
            The full React snippet is in the{' '}
            <a
              href="#integration"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Integration
            </a>{' '}
            section below.
          </p>
        </section>

        <section id="types" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">Banner types</h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            Pick a type when you create the banner. It controls <em>how</em> the banner is presented
            — the integration call is identical for all four. Each card shows the demo identifier
            used in the live demos below.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {BANNER_TYPES.map((t) => (
              <div
                key={t.value}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold text-ink">{t.name}</span>
                  <code className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[11px] text-emerald-700">
                    type: {t.value}
                  </code>
                </div>
                <code className="mt-2 inline-block w-fit rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[12px] text-brand">
                  {t.identifier}
                </code>
                <p className="mt-3 text-sm font-medium text-slate-700">{t.summary}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{t.description}</p>
                <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-20 shrink-0 font-semibold text-slate-500">Best for</dt>
                    <dd className="text-slate-600">{t.bestFor}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-20 shrink-0 font-semibold text-slate-500">Placement</dt>
                    <dd className="text-slate-600">{t.placement}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section id="configure" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Configuring a banner
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            In Page Pilot → App Banners, create a banner and fill in these fields. The{' '}
            <strong>identifier</strong> and <strong>type</strong> are the ones that matter most for
            integration — the rest control content, styling, scheduling, and ordering.
          </p>
          <ApiTable
            rows={CONFIG_FIELDS.map((f) => ({
              property: f.field,
              description: f.description,
              type: f.type,
            }))}
          />
        </section>

        <section id="integration" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">
            Integration (React)
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            Wherever you want the banner to appear, render an empty container whose{' '}
            <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              id
            </code>{' '}
            matches the banner&rsquo;s identifier, then initialize AHDjs and call{' '}
            <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
              renderAppBanner(identifier, true)
            </code>{' '}
            in a <code className="font-mono text-[13px]">useEffect</code>. The second argument
            (<code className="font-mono text-[13px]">refetch</code>) forces a fresh fetch instead of
            using a cached copy.
          </p>

          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            The container must exist in the DOM before you call{' '}
            <code className="font-mono text-[13px]">renderAppBanner</code>. In React, render the{' '}
            <code className="font-mono text-[13px]">&lt;div id={'{identifier}'} /&gt;</code> in JSX
            and call <code className="font-mono text-[13px]">renderAppBanner</code> from{' '}
            <code className="font-mono text-[13px]">useEffect</code> so it runs after mount.
          </div>

          <h3 className="mb-2 mt-6 font-semibold text-slate-800">Step 1 — Install</h3>
          <CodeSnippet code={`npm install ahdjs`} language="bash" />

          <h3 className="mb-2 mt-6 font-semibold text-slate-800">Step 2 — Render a banner</h3>
          <p className="mb-2 text-sm leading-relaxed text-slate-600">
            Pass the identifier of the banner you created. This example uses the simple banner&rsquo;s{' '}
            <code className="font-mono text-[13px]">FAB_BANNER_TYPE_SIMPLE</code> — swap it for any
            other identifier (carousel, modal, floater); the code is the same for every type.
          </p>
          <CodeSnippet code={REACT_CODE} language="tsx" />
        </section>

        <section id="live-demo" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">Live demos</h2>
          <p className="mb-6 leading-relaxed text-slate-600">
            One demo per banner type. Each fetches its type-specific identifier from Page Pilot and
            renders it into a container with the matching id. The simple banner renders on load; the
            others render when you click <strong>Fetch &amp; render</strong>.
          </p>
          {BANNER_TYPES.map((t) => (
            <DemoBlock
              key={t.value}
              title={`${t.name} — ${t.identifier}`}
              description={`Renders the ${t.name.toLowerCase()} (type: ${t.value}).`}
              code={buildBannerCode(t.identifier)}
            >
              <TypeBannerDemo type={t} />
            </DemoBlock>
          ))}
        </section>

        <section id="api" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">API reference</h2>
          <ApiTable
            rows={[
              {
                property: 'renderAppBanner(identifier, refetch)',
                description:
                  'Renders the banner into <div id="{identifier}" /> in your DOM. Works for all banner types (simpleBanner, carousel, modal, floater).',
                type: '(identifier: string, refetch: boolean) => Promise<unknown>',
              },
              {
                property: 'initializeSiteMap(refetch)',
                description: 'Builds the sitemap before rendering. Call once after init.',
                type: '(refetch: boolean) => Promise<void>',
              },
            ]}
          />
        </section>
      </article>
    </DocLayout>
  );
}

export default AppBanner;
