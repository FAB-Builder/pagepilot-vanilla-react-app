import { useState, useEffect } from 'react';
import DemoBlock from '../../components/DemoBlock';
import { SpinnerIcon } from '../../components/Icons';
import { PAGEPILOT_API_HOST, DEMO_APPLICATION_ID } from '../../lib/ahd';
import { Section, Code } from './shared';

// ── Code snippets ────────────────────────────────────────────────────────────

const UPCOMING_ENDPOINT_CODE = `GET https://pagepilot.fabbuilder.com/api/tenant/<WORKSPACE_ID>/webinars/upcoming?inNextHours=36`;

const UPCOMING_RESPONSE_CODE = `{
  "rows": [
    {
      "_id": "664a1f2e9b3c4e001f8a7d20",
      "name": "Real Estate Agencies, Sellers and ReSellers",
      "nextOccurrence": "2026-06-10T14:00:00.000Z"
    }
  ]
}`;

const LIVE_ENDPOINT_CODE = `GET https://pagepilot.fabbuilder.com/api/tenant/<WORKSPACE_ID>/webinars/currently-running`;

const LIVE_RESPONSE_CODE = `{
  "rows": [
    {
      "_id": "664a1f2e9b3c4e001f8a7d21",
      "name": "Product Deep Dive — Live Session",
      "startAt": "2026-06-09T13:00:00.000Z"
    }
  ]
}`;

const UPCOMING_COMPONENT_CODE = `import { useState, useEffect } from 'react';

const WORKSPACE_ID = '<YOUR_WORKSPACE_ID>';
const API_BASE = \`https://pagepilot.fabbuilder.com/api/tenant/\${WORKSPACE_ID}\`;

export default function UpcomingWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch(\`\${API_BASE}/webinars/upcoming?inNextHours=36\`)
      .then((r) => r.json())
      .then((data) => setWebinars(data.rows ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (!webinars.length) return <p>No upcoming webinars in the next 36 hours.</p>;

  return (
    <ul>
      {webinars.map((w) => (
        <li key={w._id}>
          <strong>{w.name}</strong> — {new Date(w.nextOccurrence).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}`;

// ── Types ────────────────────────────────────────────────────────────────────

type UpcomingItem = {
  event: { _id: string; name: string; startDate: string; endDate: string; formUrl?: string };
  nextOccurrence: string;
};
type LiveItem = { _id: string; name: string; startDate: string; endDate: string; formUrl?: string };

// ── Icons ────────────────────────────────────────────────────────────────────

function RadioIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
      <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a4.5 4.5 0 0 0 9 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6 6 0 0 1-5.25 5.954V20.25h2.25a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5h2.25v-2.796A6 6 0 0 1 5.25 12.75v-1.5A.75.75 0 0 1 6 10.5Z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 9M21 3v6h-6M21 12a9 9 0 0 1-15 6.7L3 15M3 21v-6h6" />
    </svg>
  );
}

// ── Countdown ────────────────────────────────────────────────────────────────

function Countdown({ to }: { to: string }) {
  const calc = () => {
    const diff = new Date(to).getTime() - Date.now();
    if (diff <= 0) return null;
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [parts, setParts] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setParts(calc()), 1000);
    return () => clearInterval(id);
  }, [to]);

  if (!parts) return <span className="text-xs font-semibold text-green-600">Starting now</span>;

  return (
    <div className="flex items-center gap-1.5">
      {parts.d > 0 && (
        <div className="flex min-w-[44px] flex-col items-center rounded-lg border border-indigo-100 bg-white px-2.5 py-1.5 shadow-sm">
          <span className="text-base font-bold leading-none text-slate-800">{String(parts.d).padStart(2, '0')}</span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400">Days</span>
        </div>
      )}
      {(['h', 'm', 's'] as const).map((key) => (
        <div key={key} className="flex min-w-[44px] flex-col items-center rounded-lg border border-indigo-100 bg-white px-2.5 py-1.5 shadow-sm">
          <span className="text-base font-bold leading-none text-slate-800">{String(parts[key]).padStart(2, '0')}</span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400">
            {key === 'h' ? 'Hours' : key === 'm' ? 'Mins' : 'Secs'}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Panels ───────────────────────────────────────────────────────────────────

function LiveNowPanel({ items, loading }: { items: LiveItem[]; loading: boolean }) {
  const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="overflow-hidden rounded-xl border border-green-200 bg-white shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-green-100 bg-green-50 px-5 py-3.5">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>
        <RadioIcon className="h-4 w-4 text-green-600" />
        <span className="text-sm font-bold text-green-800">Live now</span>
        <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
          {loading ? '…' : items.length}
        </span>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <SpinnerIcon className="h-5 w-5 animate-spin text-green-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-green-200 bg-green-50/50 px-4 py-5 text-center">
            <RadioIcon className="mx-auto mb-1.5 h-6 w-6 text-green-300" />
            <p className="text-sm font-medium text-slate-500">No sessions currently running</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {items.map((w) => (
              <div key={w._id} className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{w.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                    <ClockIcon className="h-3 w-3 shrink-0" />
                    {fmtDate(w.startDate)} · {fmtTime(w.startDate)} – {fmtTime(w.endDate)}
                  </p>
                </div>
                {w.formUrl && (
                  <a href={w.formUrl} target="_blank" rel="noopener noreferrer"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg bg-green-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700">
                    Join now <ArrowRightIcon className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UpcomingPanel({ items, loading }: { items: UpcomingItem[]; loading: boolean }) {
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-indigo-100 bg-indigo-50 px-5 py-3.5">
        <ClockIcon className="h-4 w-4 text-brand" />
        <span className="text-sm font-bold text-indigo-800">Upcoming — next 36 h</span>
        <span className="ml-auto rounded-full bg-brand-tint px-2 py-0.5 text-xs font-semibold text-brand">
          {loading ? '…' : items.length}
        </span>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <SpinnerIcon className="h-5 w-5 animate-spin text-indigo-300" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-indigo-200 bg-indigo-50/50 px-4 py-5 text-center">
            <ClockIcon className="mx-auto mb-1.5 h-6 w-6 text-indigo-300" />
            <p className="text-sm font-medium text-slate-500">No upcoming webinars in the next 36 hours</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(({ event, nextOccurrence }) => (
              <div key={event._id} className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Upcoming</p>
                    <p className="mt-0.5 truncate text-sm font-bold text-slate-800">{event.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <ClockIcon className="h-3 w-3 shrink-0" />
                      {fmtDate(nextOccurrence)} · {fmtTime(nextOccurrence)}
                    </p>
                  </div>
                  {event.formUrl && (
                    <a href={event.formUrl} target="_blank" rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand px-3.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white">
                      Register <ArrowRightIcon className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="mt-3 border-t border-indigo-100 pt-3">
                  <Countdown to={nextOccurrence} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Demo wrapper ─────────────────────────────────────────────────────────────

function LiveUpcomingDemo() {
  const [upcoming, setUpcoming] = useState<UpcomingItem[]>([]);
  const [live, setLive]         = useState<LiveItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const base = `${PAGEPILOT_API_HOST}/tenant/${DEMO_APPLICATION_ID}`;

  const load = () => {
    setLoading(true);
    Promise.all([
      fetch(`${base}/webinars/upcoming?inNextHours=36`).then((r) => r.json()),
      fetch(`${base}/webinars/currently-running`).then((r) => r.json()),
    ])
      .then(([u, l]) => {
        setUpcoming(Array.isArray(u) ? u : []);
        setLive(Array.isArray(l) ? l : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">Live demo — Page Pilot demo workspace</span>
        <button type="button" onClick={load} disabled={loading}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-white hover:text-brand disabled:opacity-50">
          <RefreshIcon className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      <LiveNowPanel items={live} loading={loading} />
      <UpcomingPanel items={upcoming} loading={loading} />
    </div>
  );
}

// ── Section export ───────────────────────────────────────────────────────────

export default function LiveUpcomingSection() {
  return (
    <Section id="live-upcoming" title="Live & Upcoming API">
      <p>
        Page Pilot exposes two lightweight endpoints that let you surface live and upcoming
        webinar sessions anywhere in your product — a banner, a sidebar widget, a notification
        badge, or a dashboard card.
      </p>

      <h3 className="pt-2 text-base font-bold text-slate-800">Upcoming webinars</h3>
      <p>
        Returns all sessions whose next occurrence falls within the next{' '}
        <Code>inNextHours</Code> hours. Default is <Code>36</Code>. Use this to power
        countdown banners or "starting soon" widgets.
      </p>
      <DemoBlock
        title="Endpoint"
        description={<>Pass <Code>inNextHours</Code> to control the look-ahead window.</>}
        code={UPCOMING_ENDPOINT_CODE}
        language="bash"
      />
      <DemoBlock
        title="Example response"
        description={<>Results are in the <Code>rows</Code> array. Each item includes the webinar name and its next scheduled occurrence time.</>}
        code={UPCOMING_RESPONSE_CODE}
        language="json"
      />

      <h3 className="pt-4 text-base font-bold text-slate-800">Currently running</h3>
      <p>
        Returns all sessions that are currently inside their scheduled window — i.e. started
        but not yet ended. Use this to show a live badge or "Join now" prompt in real time.
      </p>
      <DemoBlock
        title="Endpoint"
        description="No query params required. Returns sessions happening right now."
        code={LIVE_ENDPOINT_CODE}
        language="bash"
      />
      <DemoBlock
        title="Example response"
        description={<>Same <Code>rows</Code> shape as the upcoming endpoint.</>}
        code={LIVE_RESPONSE_CODE}
        language="json"
      />

      <h3 className="pt-4 text-base font-bold text-slate-800">Live demo</h3>
      <p>
        The widget below calls both endpoints in real time against the Page Pilot demo
        workspace and renders the results.
      </p>
      <LiveUpcomingDemo />

      <h3 className="pt-4 text-base font-bold text-slate-800">React component</h3>
      <DemoBlock
        title="UpcomingWebinars component"
        description={<>Fetches from <Code>/webinars/upcoming</Code> on mount and renders a list with name and start time.</>}
        code={UPCOMING_COMPONENT_CODE}
        language="tsx"
      />
    </Section>
  );
}
