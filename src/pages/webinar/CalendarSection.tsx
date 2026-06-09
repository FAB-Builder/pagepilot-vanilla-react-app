import CalendarDemo from './CalendarDemo';
import DemoBlock from '../../components/DemoBlock';
import { Section, Code } from './shared';

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

const TENANT_ID = '<YOUR_TENANT_ID>';
const API_BASE  = \`https://pagepilot.fabbuilder.com/api/tenant/\${TENANT_ID}\`;

export default function WebinarCalendar() {
  const [events, setEvents] = useState([]);
  const [date, setDate]     = useState(new Date());
  const [view, setView]     = useState('month');

  useEffect(() => {
    const m = moment(date);
    const start = m.clone().startOf(view).toISOString();
    const end   = m.clone().endOf(view).toISOString();

    // Use literal brackets in the query string — do not use URLSearchParams
    fetch(\`\${API_BASE}/get-webinars-schedule?filter[startTime]=\${start}&filter[endTime]=\${end}\`)
      .then((r) => r.json())
      .then(({ occurrences = [] }) => {
        const mapped = occurrences.map((item) => ({
          title: item.name,
          start: new Date(item.occurrenceStart),
          end:   new Date(item.occurrenceEnd),
        }));
        setEvents(mapped);
      });
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

export default function CalendarSection() {
  return (
    <Section id="calendar" title="Calendar view">
      <p>
        From the webinar list, click <strong>Calendar</strong> in the top-right toolbar to
        switch from the card grid to a full calendar. Every scheduled session — including
        each individual occurrence of a recurring webinar — appears as an event on the grid.
      </p>
      <p>
        Use the <strong>Month</strong>, <strong>Week</strong>, <strong>Day</strong>, and{' '}
        <strong>Agenda</strong> tabs to change the view. Navigate with{' '}
        <strong>Back</strong> and <strong>Next</strong>, or jump to today with the{' '}
        <strong>Today</strong> button. Click any event to open its detail card with the full
        date, time, and a <strong>Join webinar</strong> button.
      </p>
      <CalendarDemo />

      <div className="mt-10 space-y-4">
        <h3 className="text-base font-bold">Schedule API</h3>
        <p>
          The <Code>GET /get-webinars-schedule</Code> endpoint returns every scheduled
          occurrence — including individual recurrences — within the requested time window.
          Each occurrence carries its own <Code>occurrenceStart</Code> and{' '}
          <Code>occurrenceEnd</Code> timestamps so you can plot them directly on a calendar
          without any extra computation.
        </p>
        <DemoBlock
          title="Endpoint"
          description="Pass the date range using bracket-notation query params. Both values must be ISO 8601 UTC strings."
          code={SCHEDULE_ENDPOINT_CODE}
          language="bash"
        />
        <DemoBlock
          title="Example response"
          description={<>The root key is <Code>occurrences</Code>. Every item is a flat object — no nesting required.</>}
          code={SCHEDULE_RESPONSE_CODE}
          language="json"
        />

        <h3 className="pt-2 text-base font-bold">Filters</h3>
        <p>
          All filters are passed as query-string parameters using bracket notation.
          The square brackets must be kept literal — do not use <Code>URLSearchParams</Code>{' '}
          as it will percent-encode them and the server will ignore the filter.
        </p>
        <ul className="ml-4 list-disc space-y-2">
          <li><Code>filter[startTime]</Code> — ISO 8601 UTC. Only occurrences that end after this time are returned.</li>
          <li><Code>filter[endTime]</Code> — ISO 8601 UTC. Only occurrences that start before this time are returned.</li>
        </ul>

        <h3 className="pt-2 text-base font-bold">Calendar integration</h3>
        <p>
          The example below wires the API to <Code>react-big-calendar</Code>. It re-fetches
          whenever the user navigates to a different month, week, or day.
        </p>
        <DemoBlock
          title="WebinarCalendar component"
          description={<>Fetches from <Code>get-webinars-schedule</Code> on every view/date change and maps each occurrence directly to a calendar event.</>}
          code={SCHEDULE_CALENDAR_CODE}
          language="tsx"
        />
      </div>
    </Section>
  );
}
