import DocLayout, { type DocSection } from '../../components/DocLayout';
import CalendarDemo from './CalendarDemo';
import { MessageIcon, PollIcon, ReactionIcon, ViewsIcon } from '../../components/Icons';

const SECTIONS: DocSection[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'calendar',    label: 'Calendar view' },
  { id: 'create',      label: 'Creating a webinar' },
  { id: 'video',       label: 'Uploading a video' },
  { id: 'schedule',    label: 'Scheduling' },
  { id: 'timeline',    label: 'Timeline events' },
  { id: 'messages',    label: 'Messages' },
  { id: 'polls-forms', label: 'Polls & forms' },
  { id: 'registration',label: 'Registration form' },
  { id: 'cs-channel',  label: 'CS Channel' },
  { id: 'share-link',  label: 'Shareable link' },
  { id: 'embed',       label: 'Embedding' },
  { id: 'social',      label: 'Social sharing' },
  { id: 'status',      label: 'Live status' },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold">{title}</h2>
      <div className="space-y-3 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[13px] text-brand">
    {children}
  </code>
);

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-brand/20 bg-brand-tint px-4 py-3 text-sm text-slate-700">
      {children}
    </div>
  );
}

function Webinar() {
  return (
    <DocLayout title="Webinar" sections={SECTIONS}>
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Webinar
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Host pre-recorded or live-style video sessions with timed messages, polls, reactions,
            and real-time audience engagement — all configured inside{' '}
            <a
              href="https://pagepilot.fabbuilder.com/webinar"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Page Pilot → Webinars
            </a>
            , no coding needed.
          </p>
        </header>

        {/* ── Overview ────────────────────────────────────────────────────── */}
        <Section id="overview" title="Overview">
          <p>
            A webinar is a scheduled video session you publish to an audience through a shareable
            link. Attendees optionally fill in a registration form, then watch the video with your
            timed content — messages, polls, reactions — appearing automatically at the right
            moments without interrupting playback.
          </p>
          <p>
            Everything is managed from{' '}
            <strong>Page Pilot → Webinars</strong>. The full feature set includes:
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              <strong>Video upload</strong> — attach a pre-recorded MP4 directly in the editor.
              Page Pilot stores and serves it via CDN.
            </li>
            <li>
              <strong>Scheduling</strong> — one-time or recurring sessions (daily, weekly,
              monthly). Page Pilot tracks the next occurrence automatically.
            </li>
            <li>
              <strong>Timeline events</strong> — timed messages, polls, emoji reactions, and
              live viewer count badges that fire during playback at exact timestamps.
            </li>
            <li>
              <strong>Registration forms</strong> — gate access with a Page Pilot form or any
              external survey link. Responses are collected automatically.
            </li>
            <li>
              <strong>CS Channel integration</strong> — forward registrant data straight into a
              Fab CS communication channel for follow-up and reminders.
            </li>
            <li>
              <strong>Share &amp; embed</strong> — a permanent public viewer link, an iframe
              embed snippet, and one-click social sharing for LinkedIn and X.
            </li>
          </ul>
        </Section>

        {/* ── Calendar view ───────────────────────────────────────────────── */}
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
        </Section>

        {/* ── Creating a webinar ──────────────────────────────────────────── */}
        <Section id="create" title="Creating a webinar">
          <p>
            Go to <strong>Page Pilot → Webinars</strong> and click{' '}
            <strong>+ Create webinar</strong>. A short setup wizard walks you through the basics
            before opening the full editor.
          </p>
          <ol className="mt-3 space-y-2">
            <Step n={1}>
              Enter a <strong>Name</strong> — this is the title attendees see on the viewer page.
              Add an optional <strong>Description</strong> to give context about the session.
            </Step>
            <Step n={2}>
              Add <strong>Speakers</strong> by selecting from your workspace users. Their names
              and avatars are displayed on the viewer page.
            </Step>
            <Step n={3}>
              Upload a <strong>Thumbnail</strong> image. It is shown as the cover art before the
              video begins playing and in social share previews.
            </Step>
          </ol>
          <p>
            The webinar opens in the editor at <Code>draft</Code> status. From there you attach
            the video, set the schedule, add timeline events, and configure registration.
          </p>
          <Note>
            <strong>Webinar statuses:</strong> <Code>draft</Code> → not yet published.{' '}
            <Code>upcoming</Code> → scheduled and live to attendees.{' '}
            <Code>ongoing</Code> → currently within the session window.{' '}
            <Code>previous</Code> → time has passed, available for replay.
          </Note>
        </Section>

        {/* ── Video upload ────────────────────────────────────────────────── */}
        <Section id="video" title="Uploading a video">
          <p>
            Inside the webinar editor, the top area shows the video upload zone. Click{' '}
            <strong>Upload video</strong> or drag and drop an MP4 file onto the zone.
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              A progress bar appears while the file uploads. Keep the editor open until it
              completes — closing the tab will cancel the upload.
            </li>
            <li>
              Once uploaded, the video preview appears with a scrubber. Drag the scrubber to any
              point in the video to place timeline events at that exact timestamp.
            </li>
            <li>
              To swap the video, click <strong>Remove</strong> next to the current file and upload
              a replacement. Existing timeline event timestamps are preserved.
            </li>
          </ul>
          <Note>
            <strong>Recommended format:</strong> MP4 (H.264), 1080p or lower. Page Pilot serves
            the file via CDN — keep file size in check for smooth playback on slower connections.
          </Note>
        </Section>

        {/* ── Scheduling ──────────────────────────────────────────────────── */}
        <Section id="schedule" title="Scheduling">
          <p>
            The <strong>Schedule</strong> panel in the editor controls when the webinar goes live
            and whether it repeats.
          </p>

          <h3 className="mt-5 font-semibold text-slate-800">One-time session</h3>
          <p>
            Set a <strong>Start</strong> and <strong>End</strong> date and time. The public
            viewer shows a countdown timer until the session starts. Once the end time passes,
            the webinar moves to <Code>previous</Code> status and stays accessible for replay.
          </p>

          <h3 className="mt-5 font-semibold text-slate-800">Recurring sessions</h3>
          <p>
            Toggle <strong>Recurring</strong> on to have the webinar repeat automatically.
            Options include:
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              <strong>Frequency</strong> — Daily, Weekly, Monthly, or Yearly.
            </li>
            <li>
              <strong>Interval</strong> — repeat every N units, e.g. every 2 weeks.
            </li>
            <li>
              <strong>Days of week</strong> (Weekly only) — tick Mon, Tue, Wed … as needed.
            </li>
            <li>
              <strong>Series end date</strong> — the date after which no more occurrences
              are generated. Leave blank for an indefinite series.
            </li>
          </ul>
          <Note>
            Page Pilot calculates and stores the <strong>next occurrence</strong> every time you
            save. The viewer always shows the correct upcoming date with no manual work.
          </Note>
        </Section>

        {/* ── Timeline events ─────────────────────────────────────────────── */}
        <Section id="timeline" title="Timeline events">
          <p>
            The <strong>Timeline</strong> strip beneath the video scrubber holds timed events.
            Each event fires automatically at a specific second during playback — overlaying
            content on top of the video without pausing it.
          </p>
          <p>To add an event:</p>
          <ol className="mt-3 space-y-2">
            <Step n={1}>
              Drag the video scrubber to the moment where you want the event, or type the
              timestamp in seconds in the event panel.
            </Step>
            <Step n={2}>
              Click <strong>+ Add event</strong>. A panel opens on the right side of the editor.
            </Step>
            <Step n={3}>
              Choose a type — <strong>Message</strong>, <strong>Poll</strong>,{' '}
              <strong>Reaction</strong>, or <strong>Views</strong> — fill in the details, and
              click <strong>Save event</strong>.
            </Step>
          </ol>
          <p>
            Saved events appear as colour-coded markers on the timeline strip. Click any marker
            to edit or delete it. You can add as many events as you like at different timestamps.
          </p>

          {/* event-type icon cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                Icon: MessageIcon,
                label: 'Message',
                example: '"Welcome! Today we\'ll cover onboarding best practices."',
              },
              {
                Icon: PollIcon,
                label: 'Poll',
                example: '"What\'s your biggest onboarding challenge?" + survey link',
              },
              {
                Icon: ReactionIcon,
                label: 'Reaction',
                example: 'Emoji burst overlay at the big reveal moment',
              },
              {
                Icon: ViewsIcon,
                label: 'Views',
                example: 'Live viewer count badge shown to all attendees',
              },
            ].map(({ Icon, label, example }) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-tint">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs leading-snug text-slate-500">{example}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Messages ────────────────────────────────────────────────────── */}
        <Section id="messages" title="Messages">
          <p>
            A <strong>Message</strong> event displays a chat-style bubble overlaid on the video
            at a set timestamp. Use messages to greet attendees as they join, direct attention
            to something on screen, or prompt people to ask questions.
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Set <strong>At</strong> to the second in the video where the bubble should pop up
              — for example, <Code>120</Code> for the 2-minute mark.
            </li>
            <li>
              Write the message text. Keep it short — it appears as a small floating card over
              the player.
            </li>
            <li>
              The bubble auto-dismisses after a few seconds. You can stack multiple messages at
              different timestamps throughout the video.
            </li>
          </ul>
        </Section>

        {/* ── Polls & forms ───────────────────────────────────────────────── */}
        <Section id="polls-forms" title="Polls & forms">
          <p>
            A <strong>Poll</strong> event pops up an embedded survey or form overlay at a chosen
            timestamp. Use polls to check comprehension, gather opinions, or collect feedback
            mid-session without attendees leaving the player.
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Set <strong>At</strong> to the second the poll should appear.
            </li>
            <li>
              Enter a <strong>Poll title</strong> — the question displayed above the embedded
              content.
            </li>
            <li>
              Paste a <strong>Poll URL</strong> — any publicly accessible survey link works
              (Page Pilot form, Typeform, Google Form, etc.). It loads inside an overlay iframe.
            </li>
          </ul>
          <Note>
            The poll URL must allow iframe embedding. Most survey tools permit this by default.
            If the overlay appears blank, check the form's share or embed settings.
          </Note>
        </Section>

        {/* ── Registration form ───────────────────────────────────────────── */}
        <Section id="registration" title="Registration form">
          <p>
            Require attendees to register before watching by linking a form to your webinar.
            Open the <strong>Advanced Info</strong> tab in the editor and find{' '}
            <strong>Registration Settings</strong>.
          </p>
          <ol className="mt-3 space-y-2">
            <Step n={1}>
              From the <strong>Form</strong> dropdown, pick a form you have built in{' '}
              <a
                href="https://pagepilot.fabbuilder.com/forms"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                Page Pilot → Forms
              </a>
              . The form URL is filled in automatically.
            </Step>
            <Step n={2}>
              Save the webinar. Attendees who open the share link now see the registration form
              first. After submitting, they are taken directly into the session.
            </Step>
            <Step n={3}>
              Review submissions at any time in{' '}
              <a
                href="https://pagepilot.fabbuilder.com/forms"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                Page Pilot → Forms
              </a>{' '}
              → select your form → <strong>Responses</strong>.
            </Step>
          </ol>
          <p>
            Prefer an external form? Paste its URL into the <strong>Custom Form URL</strong>{' '}
            field instead. Attendees are redirected to that URL before the video becomes
            accessible.
          </p>
        </Section>

        {/* ── CS Channel ──────────────────────────────────────────────────── */}
        <Section id="cs-channel" title="CS Channel integration">
          <p>
            Link a <strong>Fab CS</strong> communication channel to your webinar so every
            registration is forwarded automatically into CS — ready for your team to send
            reminders, answer questions, and manage attendees without switching tools.
          </p>

          <h3 className="mt-5 font-semibold text-slate-800">Step 1 — Connect your CS workspace</h3>
          <p>
            In the webinar editor open <strong>Advanced Info → Registration Settings</strong> and
            click <strong>Connect Fab CRM</strong>. In the dialog that appears, enter your{' '}
            <strong>CS Workspace ID</strong>. Find it in{' '}
            <a
              href="https://cs.fabbuilder.com/settings/general_settings"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Fab CS → Settings → General Settings
            </a>{' '}
            under <em>Account Details</em>. Click <strong>Save</strong>. This step is a
            one-time setup per workspace.
          </p>

          <h3 className="mt-5 font-semibold text-slate-800">Step 2 — Select a channel</h3>
          <p>
            After connecting, a <strong>Channel</strong> dropdown appears in Registration
            Settings listing all active channels from your CS workspace. Select the channel where
            registrant data should be sent.
          </p>

          <h3 className="mt-5 font-semibold text-slate-800">Step 3 — Save</h3>
          <p>
            Save the webinar. Every registration submitted through the form is now forwarded to
            the selected channel. You can swap or remove the channel at any time from the same
            setting.
          </p>

          <Note>
            <strong>No CS account yet?</strong> Sign up at{' '}
            <a
              href="https://cs.fabbuilder.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              cs.fabbuilder.com
            </a>{' '}
            — the free tier includes unlimited communication channels.
          </Note>
        </Section>

        {/* ── Shareable link ──────────────────────────────────────────────── */}
        <Section id="share-link" title="Shareable link">
          <p>
            Every webinar has a permanent public viewer link. Click the <strong>Share</strong>{' '}
            button in the editor toolbar, then open the <strong>Share Link</strong> tab.
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Click <strong>Copy link</strong> to copy the URL to your clipboard. Paste it into
              an email, calendar invite, Slack message, or anywhere else.
            </li>
            <li>
              The link never changes for the lifetime of the webinar. Share it before the session
              goes live — attendees will see a countdown until it starts.
            </li>
            <li>
              A separate <strong>Preview link</strong> lets you — as the organiser — test the
              viewer experience without it being visible to attendees.
            </li>
          </ul>
        </Section>

        {/* ── Embedding ───────────────────────────────────────────────────── */}
        <Section id="embed" title="Embedding">
          <p>
            Embed the webinar player directly on any webpage. In the <strong>Share</strong>{' '}
            modal, open the <strong>Embed</strong> tab and choose a display mode:
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              <strong>Inline</strong> — renders the player inside a fixed block in your page.
              Best for a dedicated webinar landing page.
            </li>
            <li>
              <strong>Overlay</strong> — the player expands to cover the full browser window
              when opened.
            </li>
            <li>
              <strong>Popup</strong> — the player opens as a floating card above your page
              content.
            </li>
          </ul>
          <p>
            Click <strong>Copy embed code</strong> to copy the{' '}
            <Code>&lt;iframe&gt;</Code> snippet and paste it into your site's HTML.
          </p>
        </Section>

        {/* ── Social sharing ──────────────────────────────────────────────── */}
        <Section id="social" title="Social sharing">
          <p>
            The <strong>Social Share</strong> tab in the share modal lets you post the webinar to
            LinkedIn or X (Twitter) with one click. Page Pilot pre-fills the post text with the
            webinar title and the viewer link.
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Click <strong>Share on LinkedIn</strong> or <strong>Share on X</strong>. Your
              browser opens the platform's native share dialog in a new tab with everything
              pre-filled — you just confirm and post.
            </li>
            <li>
              A preview image is auto-generated from the webinar thumbnail and attached to the
              post so it stands out in social feeds.
            </li>
          </ul>
        </Section>

        {/* ── Live status ─────────────────────────────────────────────────── */}
        <Section id="status" title="Live status">
          <p>
            The webinar list includes a <strong>Status</strong> panel on the right side that
            groups sessions by their current state so you always know what's happening at a
            glance.
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              <strong>Live now</strong> — sessions currently inside their scheduled window. A
              live badge is shown on the card and in the status panel.
            </li>
            <li>
              <strong>Upcoming</strong> — sessions scheduled in the future, sorted by start time.
              A countdown shows how long until the next one begins.
            </li>
            <li>
              <strong>Previous</strong> — sessions whose window has passed. Still accessible via
              the share link for on-demand replay by anyone who has the URL.
            </li>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}

export default Webinar;
