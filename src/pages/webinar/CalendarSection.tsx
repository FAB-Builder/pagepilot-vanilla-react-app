import CalendarDemo from './CalendarDemo';
import DemoBlock from '../../components/DemoBlock';
import AiPromptBlock from '../../components/AiPromptBlock';
import { Section, Code, Note } from './shared';

const CALENDAR_AI_PROMPT = `Build a WebinarCalendar React component using react-big-calendar and the Page Pilot schedule API.

API: GET https://pagepilot.fabbuilder.com/api/tenant/<WORKSPACE_ID>/get-webinars-schedule

Requirements:
- Support Month, Week, Day, and Agenda views
- Re-fetch on every view or date navigation
- Pass date range filters as literal bracket-notation query params (not URLSearchParams)
- Show a loading overlay while fetching
- Read WORKSPACE_ID from an environment variable (e.g. import.meta.env.VITE_WORKSPACE_ID)
- Handle errors gracefully with a visible error state`;

const SCHEDULE_API_AI_PROMPT = `Build a reusable useWebinarSchedule React hook for the Page Pilot schedule API.

API: GET https://pagepilot.fabbuilder.com/api/tenant/<WORKSPACE_ID>/get-webinars-schedule

Requirements:
- Accept startTime and endTime (ISO 8601) as parameters
- Return { occurrences, loading, error }
- Pass date filters as literal bracket-notation query params (not URLSearchParams)
- Abort in-flight requests on re-fetch using AbortController
- Read WORKSPACE_ID from an environment variable`;

const SCHEDULE_ENDPOINT_CODE = `GET https://pagepilot.fabbuilder.com/api/tenant/<WORKSPACE_ID>/get-webinars-schedule?filter[startTime]=2026-06-01T00:00:00.000Z&filter[endTime]=2026-06-30T23:59:59.999Z`;

const SCHEDULE_RESPONSE_CODE = `{
  "occurrences": [
    {
      "_id": "664a1f2e9b3c4e001f8a7d12",
      "name": "Product Deep Dive",
      "occurrenceStart": "2026-06-10T14:00:00.000Z",
      "occurrenceEnd":   "2026-06-10T15:30:00.000Z"
    },
    {
      "_id": "664a1f2e9b3c4e001f8a7d13",
      "name": "Onboarding Live",
      "occurrenceStart": "2026-06-18T09:00:00.000Z",
      "occurrenceEnd":   "2026-06-18T10:00:00.000Z"
    }
  ]
}`;

const SCHEDULE_CALENDAR_CODE = `import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const WORKSPACE_ID = '<YOUR_WORKSPACE_ID>';
const API_BASE = \`https://pagepilot.fabbuilder.com/api/tenant/\${WORKSPACE_ID}\`;

export default function WebinarCalendar() {
  const [events, setEvents] = useState([]);
  const [date, setDate]     = useState(new Date());
  const [view, setView]     = useState('month');

  useEffect(() => {
    const m = moment(date);
    const start = m.clone().startOf(view).toISOString();
    const end   = m.clone().endOf(view).toISOString();

    // Use literal bracket notation — URLSearchParams percent-encodes brackets
    // and the server will ignore the filters.
    fetch(\`\${API_BASE}/get-webinars-schedule?filter[startTime]=\${start}&filter[endTime]=\${end}\`)
      .then((r) => r.json())
      .then(({ occurrences = [] }) =>
        setEvents(
          occurrences.map((item) => ({
            title: item.name,
            start: new Date(item.occurrenceStart),
            end:   new Date(item.occurrenceEnd),
          }))
        )
      );
  }, [date, view]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      date={date}
      view={view}
      onNavigate={setDate}
      onView={setView}
      style={{ height: 600 }}
    />
  );
}`;

export function CalendarViewSection() {
  return (
    <Section id="calendar" title="Calendar view">
      <p>
        Webinar sessions — including every individual occurrence of a recurring webinar — can
        be rendered on a full interactive calendar. The live demo below is powered by the
        Page Pilot demo workspace using <Code>react-big-calendar</Code>.
      </p>
      <p>
        Switch between <strong>Month</strong>, <strong>Week</strong>, <strong>Day</strong>,
        and <strong>Agenda</strong> views. Navigate forward and backward to see how occurrences
        are distributed across the schedule.
      </p>
      <AiPromptBlock id="calendar-view-ai-prompt" prompt={CALENDAR_AI_PROMPT} />
      <CalendarDemo />
    </Section>
  );
}

export function ScheduleApiSection() {
  return (
    <Section id="schedule-api" title="Schedule API">
      <p>
        The <Code>GET /get-webinars-schedule</Code> endpoint returns every scheduled occurrence
        within a requested time window — including individual recurrences of repeating webinars.
        Each item in the response carries its own <Code>occurrenceStart</Code> and{' '}
        <Code>occurrenceEnd</Code> timestamps, ready to map directly to a calendar event without
        any extra computation.
      </p>

      <DemoBlock
        title="Endpoint"
        description="Supply the date range as ISO 8601 UTC strings using bracket-notation query params."
        code={SCHEDULE_ENDPOINT_CODE}
        language="bash"
      />

      <DemoBlock
        title="Response"
        description={<>The root key is <Code>occurrences</Code>. Each item is a flat object with a stable <Code>_id</Code>, display name, and precise start/end timestamps.</>}
        code={SCHEDULE_RESPONSE_CODE}
        language="json"
      />

      <h3 className="pt-2 text-base font-semibold text-slate-800">Query parameters</h3>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="px-4 py-2.5 font-semibold text-slate-700">Parameter</th>
              <th className="px-4 py-2.5 font-semibold text-slate-700">Type</th>
              <th className="px-4 py-2.5 font-semibold text-slate-700">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-2.5"><Code>filter[startTime]</Code></td>
              <td className="px-4 py-2.5 text-slate-500">ISO 8601 UTC</td>
              <td className="px-4 py-2.5 text-slate-600">Return only occurrences that end after this time.</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><Code>filter[endTime]</Code></td>
              <td className="px-4 py-2.5 text-slate-500">ISO 8601 UTC</td>
              <td className="px-4 py-2.5 text-slate-600">Return only occurrences that start before this time.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        Pass brackets literally in the URL — do not use <Code>URLSearchParams</Code> as it
        percent-encodes <Code>[</Code> and <Code>]</Code> and the server will ignore the filter.
      </p>

      <h3 className="pt-2 text-base font-semibold text-slate-800">React integration</h3>
      <p>
        The component below wires the API to <Code>react-big-calendar</Code>. It re-fetches
        automatically whenever the user navigates to a different month, week, or day.
      </p>
      <DemoBlock
        title="WebinarCalendar component"
        description={<>Fetches <Code>get-webinars-schedule</Code> on every view or date change and maps each occurrence to a calendar event.</>}
        code={SCHEDULE_CALENDAR_CODE}
        language="tsx"
      />
      <Note>
        Find your <strong>Workspace ID</strong> at{' '}
        <a href="https://pagepilot.fabbuilder.com/tenant" target="_blank" rel="noreferrer"
          className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
          pagepilot.fabbuilder.com/tenant
        </a>
        . Replace <Code>{'<WORKSPACE_ID>'}</Code> in the endpoint URL with that value.
      </Note>
      <AiPromptBlock id="schedule-api-ai-prompt" prompt={SCHEDULE_API_AI_PROMPT} />
    </Section>
  );
}
