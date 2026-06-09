import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { Calendar, momentLocalizer, type View, type Components } from 'react-big-calendar';
import moment from 'moment-timezone';
import { PAGEPILOT_API_HOST, DEMO_APPLICATION_ID } from '../../lib/ahd';
import { CalendarIcon, LinkIcon, XIcon, SpinnerIcon } from '../../components/Icons';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-overrides.css';

const localizer = momentLocalizer(moment);
const TZ = moment.tz.guess();

// ─── Types ────────────────────────────────────────────────────────────────────

interface WebinarRecord {
  id?: string;
  _id?: string;
  name?: string;
  occurrenceStart?: string;
  occurrenceEnd?: string;
}

interface CalEvent {
  title: string;
  start: Date;
  end: Date;
  actualStart: Date;
  actualEnd: Date;
  webinarId: string;
  url: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildWebinarUrl(id: string) {
  return `https://webinar-fab-builder.web.app/?w=${id}&type=webinar`;
}

function buildRange(date: Date, view: View): { start: Date; end: Date } {
  const m = moment.tz(date, TZ);
  if (view === 'week') return { start: m.clone().startOf('week').toDate(), end: m.clone().endOf('week').toDate() };
  if (view === 'day')  return { start: m.clone().startOf('day').toDate(),  end: m.clone().endOf('day').toDate() };
  return { start: m.clone().startOf('month').toDate(), end: m.clone().endOf('month').toDate() };
}

// Exact port of ahd-fe's generateEventsFromItem
function generateEventsFromItem(item: WebinarRecord, view: View): CalEvent[] {
  const startString = item.occurrenceStart || '';
  const endString   = item.occurrenceEnd   || '';

  const startMoment = startString ? moment.utc(startString).tz(TZ) : moment.tz(TZ);
  let   endMoment   = endString   ? moment.utc(endString).tz(TZ)   : startMoment.clone().add(1, 'hour');

  if (!endMoment.isValid() || !startMoment.isValid() || endMoment.isSameOrBefore(startMoment)) {
    endMoment = startMoment.clone().add(1, 'hour');
  }

  const title = item.name || 'Webinar';
  const id    = item.id || item._id || '';
  const url   = buildWebinarUrl(id);

  // For week/day views return a single event as-is
  if (view !== 'month') {
    return [{
      title, url, webinarId: id,
      start:       startMoment.toDate(),
      end:         endMoment.toDate(),
      actualStart: startMoment.toDate(),
      actualEnd:   endMoment.toDate(),
    }];
  }

  // Month view: split multi-day occurrences into one segment per day
  const startDay = startMoment.clone().startOf('day');
  const lastDay  = endMoment.clone().startOf('day');
  const dayCount = lastDay.diff(startDay, 'days') + 1;

  return Array.from({ length: dayCount }, (_, index) => {
    const cursor       = startDay.clone().add(index, 'day');
    const isStartDay   = cursor.isSame(startMoment, 'day');
    const isEndDay     = cursor.isSame(endMoment,   'day');
    const segmentStart = isStartDay ? startMoment.clone() : cursor.clone().startOf('day');
    const segmentEnd   = isEndDay   ? endMoment.clone()   : cursor.clone().endOf('day');

    if (!segmentEnd.isAfter(segmentStart)) return null;

    return {
      title, url, webinarId: id,
      start:       segmentStart.toDate(),
      end:         segmentEnd.toDate(),
      actualStart: startMoment.toDate(),
      actualEnd:   endMoment.toDate(),
    } as CalEvent;
  }).filter((e): e is CalEvent => Boolean(e));
}

async function fetchWebinars(rangeStart: Date, rangeEnd: Date, view: View): Promise<CalEvent[]> {
  const startTime = moment.tz(rangeStart, TZ).utc().toISOString();
  const endTime   = moment.tz(rangeEnd,   TZ).utc().toISOString();

  const qs = `filter[startTime]=${startTime}&filter[endTime]=${endTime}`;

  const res = await fetch(
    `${PAGEPILOT_API_HOST}/tenant/${DEMO_APPLICATION_ID}/get-webinars-schedule?${qs}`,
  );
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  const payload = await res.json();
  const items: WebinarRecord[] = payload?.occurrences ?? [];

  return items.flatMap((item) => generateEventsFromItem(item, view));
}

// ─── Session dialog ────────────────────────────────────────────────────────────

function SessionDialog({ event, events, date, onClose }: {
  event: CalEvent | null;
  events: CalEvent[];
  date: Date | null;
  onClose: () => void;
}) {
  const items = event ? [event] : events;
  if (!items.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="Close"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <div className="flex justify-center bg-slate-50 py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
            <CalendarIcon className="h-8 w-8 text-brand" />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
          {date && !event && (
            <div className="mb-4">
              <p className="text-base font-bold text-slate-800">
                {moment(date).format('dddd, MMMM Do')}
              </p>
              <p className="text-sm text-slate-400">
                {items.length} webinar{items.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className={i > 0 ? 'border-t border-slate-100 pt-6' : ''}>
                <p className="text-base font-bold text-slate-800">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {moment(item.actualStart).format('dddd, MMMM Do [at] h:mm a')}
                  {' – '}
                  {moment(item.actualEnd).format('h:mm a')}
                </p>
                <div className="mt-3 flex items-center gap-2 overflow-hidden">
                  <LinkIcon className="h-4 w-4 shrink-0 text-brand" />
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-sm text-brand underline underline-offset-2 hover:text-brand-dark"
                  >
                    {item.url}
                  </a>
                </div>
                <button
                  onClick={() => window.open(item.url, '_blank')}
                  className="mt-4 w-full rounded-lg bg-brand py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  Join webinar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Event chip ───────────────────────────────────────────────────────────────

function EventChip({ event }: { event: CalEvent }) {
  return (
    <div className="py-0.5">
      <span className="block truncate text-[0.72rem] font-bold leading-tight text-brand">
        {moment(event.actualStart).format('h:mm a')} – {event.title}
      </span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function CalendarDemo() {
  const [view, setView]       = useState<View>('month');
  const [date, setDate]       = useState(new Date());
  const [events, setEvents]   = useState<CalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [moreEvents, setMoreEvents]       = useState<CalEvent[]>([]);
  const [moreDate, setMoreDate]           = useState<Date | null>(null);

  const load = useCallback(async (d: Date, v: View) => {
    setLoading(true);
    setError(null);
    try {
      const { start, end } = buildRange(d, v);
      setEvents(await fetchWebinars(start, end, v));
    } catch (e: any) {
      setError(e?.message || 'Could not load schedule');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(date, view); }, [date, view, load]);

  const components = useMemo<Components<CalEvent>>(
    () => ({ event: ({ event }) => <EventChip event={event} /> }),
    [],
  );

  const eventPropGetter = useCallback(() => ({
    style: {
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      padding: '1px 4px',
      margin: 0,
      color: 'inherit',
    } as React.CSSProperties,
  }), []);

  const handleClose = useCallback(() => {
    setSelectedEvent(null);
    setMoreEvents([]);
    setMoreDate(null);
  }, []);

  return (
    <div className="overflow-hidden border border-slate-200 bg-white">
      <SessionDialog
        event={selectedEvent}
        events={moreEvents}
        date={moreDate}
        onClose={handleClose}
      />

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <SpinnerIcon className="h-7 w-7 animate-spin text-brand" />
          </div>
        )}

        {error ? (
          <p className="p-6 text-sm text-rose-600">{error}</p>
        ) : (
          <Calendar<CalEvent>
            localizer={localizer}
            events={events}
            view={view}
            date={date}
            onNavigate={(d) => setDate(d)}
            onView={(v) => setView(v)}
            onDrillDown={(d) => { setDate(d); setView('day'); }}
            doShowMoreDrillDown={false}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 580 }}
            components={components}
            eventPropGetter={eventPropGetter}
            onSelectEvent={(ev) => {
              setSelectedEvent(ev);
              setMoreEvents([]);
              setMoreDate(null);
            }}
            onShowMore={(evs, d) => {
              setMoreEvents(evs);
              setMoreDate(d);
              setSelectedEvent(null);
            }}
            messages={{
              today: 'Today',
              previous: 'Back',
              next: 'Next',
              month: 'Month',
              week: 'Week',
              day: 'Day',
              agenda: 'Agenda',
              showMore: (total) => `+${total} more`,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default memo(CalendarDemo);
