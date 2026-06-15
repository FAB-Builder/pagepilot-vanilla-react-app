import DocLayout, { type DocSection } from '../../components/DocLayout';
import { MessageIcon, PollIcon, ReactionIcon, ViewsIcon } from '../../components/Icons';
import { Section, Code, Step, Note } from './shared';
import { CalendarViewSection, ScheduleApiSection } from './CalendarSection';
import LiveUpcomingSection from './LiveUpcomingSection';

const SECTIONS: DocSection[] = [
  { id: 'overview',      label: 'Overview' },
  { id: 'calendar',      label: 'Calendar view' },
  { id: 'schedule-api',  label: 'Schedule API' },
  { id: 'live-upcoming', label: 'Live & Upcoming API' },
  { id: 'create',        label: 'Creating a webinar' },
  { id: 'video',         label: 'Uploading a video' },
  { id: 'schedule',      label: 'Scheduling' },
  { id: 'recurring',     label: 'Recurring webinars' },
  { id: 'late-entry',    label: 'Late entry' },
  { id: 'tags',          label: 'Tags' },
  { id: 'timeline',      label: 'Timeline events' },
  { id: 'messages',      label: 'Messages' },
  { id: 'reactions',     label: 'Reactions' },
  { id: 'polls-forms',   label: 'Polls & forms' },
  { id: 'views',         label: 'Viewer count' },
  { id: 'registration',  label: 'Registration form' },
  { id: 'cs-channel',    label: 'CS Channel' },
  { id: 'share-link',    label: 'Shareable link' },
  { id: 'social',        label: 'Social sharing' },
  { id: 'status',        label: 'Live status' },
];

export default function Webinar() {
  return (
    <DocLayout title="Webinar" sections={SECTIONS}>
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>Webinar</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Host pre-recorded video sessions with timed messages, polls, emoji reactions, and live
            audience engagement. Page Pilot supports two approaches — a no-code setup via the
            dashboard, and a set of REST APIs for developers to embed webinar data directly in their
            own product.
          </p>
        </header>

        <Section id="overview" title="Overview">
          <p>
            A webinar is a scheduled video session you publish to an audience through a shareable
            link. Attendees optionally complete a registration form, then watch the video with your
            timed content — messages, polls, reactions, and viewer count badges — appearing
            automatically at precisely the right moments without interrupting playback.
          </p>

          <h3 className="mt-4 font-semibold text-slate-800">No-code setup</h3>
          <p>
            Everything is managed from{' '}
            <a href="https://pagepilot.fabbuilder.com/webinar" target="_blank" rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
              Page Pilot → Webinars
            </a>
            . Create a webinar, upload a video, schedule sessions, add timeline events, configure
            registration, and share the link — no code required. The full feature set includes:
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li><strong>Video upload</strong> — attach a pre-recorded MP4 directly in the editor. Page Pilot stores and serves it via CDN.</li>
            <li><strong>Flexible scheduling</strong> — one-time or recurring sessions (daily, weekly, monthly, yearly). Page Pilot tracks every occurrence automatically.</li>
            <li><strong>Timeline events</strong> — timed messages, polls, emoji reactions, and live viewer count badges that fire at exact video timestamps.</li>
            <li><strong>Late entry control</strong> — define how many minutes past the start time attendees are still permitted to join.</li>
            <li><strong>Tags</strong> — label and organise webinars for quick filtering across your workspace.</li>
            <li><strong>Registration forms</strong> — gate access with a Page Pilot form or any external survey link. Responses are collected automatically.</li>
            <li><strong>CS Channel integration</strong> — forward registrant data straight into a Fab CS communication channel for follow-up and reminders.</li>
            <li><strong>Share &amp; social</strong> — a permanent public viewer link and one-click sharing for LinkedIn and X.</li>
          </ul>

          <h3 className="mt-4 font-semibold text-slate-800">Developer APIs</h3>
          <p>
            If you want to surface webinar data in your own product, Page Pilot exposes three REST
            endpoints you can call from any frontend or backend:
          </p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li><strong>Schedule API</strong> — fetch all occurrences within a date range to build a calendar view.</li>
            <li><strong>Upcoming API</strong> — list sessions starting within the next N hours for countdown banners or "starting soon" widgets.</li>
            <li><strong>Live API</strong> — list sessions currently in progress for live badges and "Join now" prompts.</li>
          </ul>
        </Section>

        <CalendarViewSection />
        <ScheduleApiSection />
        <LiveUpcomingSection />

        <Section id="create" title="Creating a webinar">
          <p>
            Go to <strong>Page Pilot → Webinars</strong> and click <strong>+ Create webinar</strong>.
            A short setup wizard walks you through the basics before opening the full editor.
          </p>
          <ol className="mt-3 space-y-2">
            <Step n={1}>Enter a <strong>Name</strong> — this is the title attendees see on the viewer page. Add an optional <strong>Description</strong> to give context about the session.</Step>
            <Step n={2}>Add <strong>Speakers</strong> by selecting from your workspace users. Their names and avatars are displayed prominently on the viewer page.</Step>
            <Step n={3}>Upload a <strong>Thumbnail</strong> image. It appears as cover art before the video begins and in social share previews.</Step>
          </ol>
          <p>The webinar opens in the editor at <Code>draft</Code> status. From there you attach the video, set the schedule, add timeline events, and configure registration.</p>
          <Note>
            <strong>Webinar statuses:</strong>{' '}
            <Code>draft</Code> — not yet published.{' '}
            <Code>upcoming</Code> — scheduled and visible to attendees.{' '}
            <Code>ongoing</Code> — currently within the session window.{' '}
            <Code>previous</Code> — time has passed, available for on-demand replay.
          </Note>
        </Section>

        <Section id="video" title="Uploading a video">
          <p>Inside the webinar editor, the top area shows the video upload zone. Click <strong>Upload video</strong> or drag and drop an MP4 file onto the zone.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>A progress bar appears while the file uploads. Keep the editor open until it completes — closing the tab cancels the upload.</li>
            <li>Once uploaded, the video preview appears with a scrubber. Drag the scrubber to any point in the video to position timeline events at that exact timestamp.</li>
            <li>To swap the video, click <strong>Remove</strong> next to the current file and upload a replacement. Existing timeline event timestamps are preserved.</li>
          </ul>
          <Note><strong>Recommended format:</strong> MP4 (H.264), 1080p or lower. Page Pilot serves the file via CDN — keep file size reasonable for smooth playback on slower connections.</Note>
        </Section>

        <Section id="schedule" title="Scheduling">
          <p>
            The <strong>Schedule</strong> panel in the editor controls when the webinar goes live.
            Set a <strong>Start date &amp; time</strong> and an <strong>End date &amp; time</strong>.
            The public viewer shows a live countdown until the session starts. Once the end time
            passes, the webinar moves to <Code>previous</Code> status and remains accessible for
            replay via the share link.
          </p>
          <Note>All times are stored in UTC and displayed to each attendee in their local timezone automatically — no manual conversion needed.</Note>
        </Section>

        <Section id="recurring" title="Recurring webinars">
          <p>Toggle <strong>Is Recurring</strong> on in the Schedule panel to have the webinar repeat automatically on a defined cadence. Page Pilot calculates every upcoming occurrence and keeps the viewer countdown accurate without any manual work.</p>
          <h3 className="mt-5 font-semibold text-slate-800">Recurrence options</h3>
          <ul className="ml-4 list-disc space-y-1.5">
            <li><strong>Frequency</strong> — choose Daily, Weekly, Monthly, or Yearly.</li>
            <li><strong>Interval</strong> — repeat every N units. For example, an interval of <Code>2</Code> with Weekly frequency runs every two weeks.</li>
            <li><strong>Days of week</strong> (Weekly only) — select specific days such as Mon, Wed, Fri for a multi-day-per-week cadence.</li>
            <li><strong>Series end date</strong> — the date after which no further occurrences are generated. Leave blank for an indefinite series.</li>
          </ul>
          <h3 className="mt-5 font-semibold text-slate-800">How occurrences appear</h3>
          <p>Each occurrence is listed individually in the calendar view with its own date and time. Attendees always see the next upcoming occurrence in the countdown on the viewer page. After each session ends it moves to <Code>previous</Code> and the next occurrence becomes active automatically.</p>
          <Note>Timeline events, registration settings, and the video are shared across all occurrences — configure them once and every session uses the same setup.</Note>
        </Section>

        <Section id="late-entry" title="Late entry">
          <p>By default, attendees can join a webinar at any point during its scheduled window. The <strong>Late Entry Upto</strong> setting lets you restrict access to a defined number of minutes after the start time, preventing attendees from joining a session that is already well underway.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>Open the <strong>Advanced Info</strong> tab in the webinar editor and locate <strong>Late Entry Upto</strong>.</li>
            <li>Enter the number of minutes after the session start time during which late arrivals are still permitted — for example, <Code>15</Code> allows entry up to 15 minutes past the start.</li>
            <li>Attendees who attempt to join after this window see a message informing them the session is no longer accepting new participants.</li>
          </ul>
          <Note>Leave <strong>Late Entry Upto</strong> blank to allow attendees to join at any point during the scheduled window — including near the end for replay purposes.</Note>
        </Section>

        <Section id="tags" title="Tags">
          <p>Tags are free-form labels you attach to a webinar to make it easier to organise, search, and filter your sessions as your library grows.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>In the webinar editor, locate the <strong>Tags</strong> field and type a label — for example <Code>onboarding</Code>, <Code>product-update</Code>, or <Code>Q2-2026</Code>. Press <strong>Enter</strong> to add it.</li>
            <li>Add as many tags as needed. Each tag appears as a chip and can be removed individually by clicking the × on the chip.</li>
            <li>On the webinar list page, use the <strong>Filter by tag</strong> option in the toolbar to instantly narrow the list to sessions sharing a specific label.</li>
          </ul>
          <Note>Tags are purely organisational — they are not visible to attendees on the public viewer page.</Note>
        </Section>

        <Section id="timeline" title="Timeline events">
          <p>The <strong>Timeline</strong> strip beneath the video scrubber is where you place timed interactions. Each event is pinned to a specific second in the video and fires automatically for every attendee when playback reaches that point — no manual triggering required.</p>
          <h3 className="mt-5 font-semibold text-slate-800">Adding an event</h3>
          <ol className="mt-2 space-y-2">
            <Step n={1}>Drag the video scrubber to the exact moment you want the event to appear, or type the timestamp in seconds directly in the event panel.</Step>
            <Step n={2}>Click <strong>+ Add event</strong>. A configuration panel opens on the right side of the editor.</Step>
            <Step n={3}>Choose the event type — <strong>Message</strong>, <strong>Reaction</strong>, <strong>Poll</strong>, or <strong>Views</strong> — fill in the details, and click <strong>Save event</strong>.</Step>
          </ol>
          <p>Saved events appear as colour-coded markers on the timeline strip. Click any marker to edit or delete it. You can place as many events as needed at different timestamps throughout the video.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { Icon: MessageIcon,  label: 'Message',  example: 'A chat bubble overlaid on the video — great for greetings or call-to-action prompts.' },
              { Icon: ReactionIcon, label: 'Reaction',  example: 'An emoji burst that animates over the player at the chosen moment.' },
              { Icon: PollIcon,     label: 'Poll',      example: 'An embedded survey form that slides in mid-video to capture responses.' },
              { Icon: ViewsIcon,    label: 'Views',     example: 'A live viewer count badge displayed to all attendees simultaneously.' },
            ].map(({ Icon, label, example }) => (
              <div key={label} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-tint">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs leading-snug text-slate-500">{example}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="messages" title="Messages">
          <p>A <strong>Message</strong> event displays a chat-style bubble overlaid on the video at a specific timestamp. Use messages to welcome attendees as they join, draw attention to something happening on screen, or prompt questions at key moments.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>Set <strong>At</strong> to the second in the video where the bubble should appear — for example, <Code>120</Code> for the two-minute mark.</li>
            <li>Write the message text. Keep it concise — it renders as a small floating card over the player and is visible for a few seconds before auto-dismissing.</li>
            <li>Stack multiple messages at different timestamps to maintain engagement throughout the session without any live presenter involvement.</li>
          </ul>
          <Note>Messages appear simultaneously for all attendees watching at that point in the video, creating a shared, real-time feel even in a pre-recorded session.</Note>
        </Section>

        <Section id="reactions" title="Reactions">
          <p>A <strong>Reaction</strong> event triggers an animated emoji burst that overlays the video player at the exact second you specify. Reactions are a powerful tool for creating energy at high-impact moments — a product reveal, a key statistic, or a celebratory milestone — making the pre-recorded session feel live and dynamic.</p>
          <h3 className="mt-5 font-semibold text-slate-800">How they work</h3>
          <p>When playback reaches the configured timestamp, the chosen emoji animates across the player for all attendees simultaneously. The animation is brief and non-intrusive — it does not pause or obscure the video content.</p>
          <h3 className="mt-5 font-semibold text-slate-800">Configuring a reaction</h3>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>Set <strong>At</strong> to the video second where the reaction should fire — for example, <Code>45</Code> to trigger it 45 seconds into the video.</li>
            <li>Pick an emoji from the selector. Common choices are 🎉 for launches, 🔥 for excitement, or 👏 for applause moments.</li>
            <li>Save the event. It appears as a reaction marker on the timeline strip, making it easy to visualise the pacing of your engagement throughout the video.</li>
          </ul>
          <Note>You can layer multiple reaction events at different timestamps — for example, a 🎉 at the intro, a 🔥 at the key demo, and a 👏 at the closing — to maintain a sense of live audience energy from start to finish.</Note>
        </Section>

        <Section id="polls-forms" title="Polls & forms">
          <p>A <strong>Poll</strong> event pops up an embedded survey or form overlay at a chosen timestamp. Use polls to check comprehension, gather opinions, or collect feedback mid-session without attendees ever leaving the player.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>Set <strong>At</strong> to the second the poll overlay should appear.</li>
            <li>Enter a <strong>Poll title</strong> — the question or heading displayed above the embedded content.</li>
            <li>Paste a <strong>Poll URL</strong> — any publicly accessible survey link works (Page Pilot form, Typeform, Google Form, etc.). It loads inside the overlay iframe.</li>
          </ul>
          <Note>The poll URL must allow iframe embedding. Most survey tools permit this by default. If the overlay appears blank, check the form's share or embed settings.</Note>
        </Section>

        <Section id="views" title="Viewer count">
          <p>A <strong>Views</strong> event displays a live viewer count badge on the player at the timestamp you configure. The badge shows how many people are currently watching, reinforcing the sense of a shared, attended event even though the session is pre-recorded.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>Set <strong>At</strong> to the second the badge should appear — typically early in the video, such as <Code>10</Code> seconds, so attendees immediately see the audience size.</li>
            <li>The count updates in real time as attendees join or leave during the session window.</li>
            <li>The badge auto-hides after a short display period and can be placed multiple times at different timestamps if you want periodic audience size reminders.</li>
          </ul>
        </Section>

        <Section id="registration" title="Registration form">
          <p>Require attendees to register before watching by linking a form to your webinar. Open the <strong>Advanced Info</strong> tab in the editor and locate <strong>Registration Settings</strong>.</p>
          <ol className="mt-3 space-y-2">
            <Step n={1}>
              From the <strong>Form</strong> dropdown, pick a form you have built in{' '}
              <a href="https://pagepilot.fabbuilder.com/forms" target="_blank" rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
                Page Pilot → Forms
              </a>. The form URL is filled in automatically.
            </Step>
            <Step n={2}>Save the webinar. Attendees who open the share link now see the registration form first. After submitting, they are taken directly into the session.</Step>
            <Step n={3}>
              Review submissions at any time in{' '}
              <a href="https://pagepilot.fabbuilder.com/forms" target="_blank" rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
                Page Pilot → Forms
              </a>{' '}→ select your form → <strong>Responses</strong>.
            </Step>
          </ol>
          <p>Prefer an external form? Paste its URL into the <strong>Custom Form URL</strong> field instead. Attendees are redirected to that URL before the video becomes accessible.</p>

          <h3 className="mt-6 font-semibold text-slate-800">Redirecting attendees to the webinar after submission</h3>
          <p>
            After a registrant submits the form, you need a button that sends them directly into the webinar session.
            The webinar URL requires two values — the <strong>webinar ID</strong> (<Code>w</Code>) and the <strong>form response ID</strong> (<Code>l</Code>) — both filled in automatically at runtime using placeholders.
          </p>

          <p>
            Don't have a form yet?{' '}
            <a href="https://pagepilot.fabbuilder.com/forms" target="_blank" rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
              Create one in Page Pilot → Forms
            </a>.
          </p>

          <h4 className="mt-4 font-semibold text-slate-700">Option A — Go To Webinar button (recommended)</h4>
          <p>In the form builder, add a <strong>Button</strong> element and set its <strong>Button Type</strong> to <strong>Go To Webinar</strong>. The link and label are set automatically — no further configuration needed.</p>

          <h4 className="mt-4 font-semibold text-slate-700">Option B — Custom button with a manual link</h4>
          <p>Add a <strong>Button</strong> element, set <strong>Button Type</strong> to <strong>Button</strong>, and paste the following URL into the <strong>Link</strong> field:</p>
          <div className="mt-2 rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm break-all text-slate-700">
            {'https://webinar-fab-builder.web.app/?w={{wid}}&type=webinar&l={{id}}'}
          </div>
          <Note>
            <strong>{'{{wid}}'}</strong> is replaced with the webinar ID automatically (passed via the form URL when you select the form in the webinar editor).{' '}
            <strong>{'{{id}}'}</strong> is replaced with the unique ID of the registrant's form response after submission. You do not need to edit these placeholders manually.
          </Note>
        </Section>

        <Section id="cs-channel" title="CS Channel integration">
          <p>Link a <strong>Fab CS</strong> communication channel to your webinar so every registration is forwarded automatically into CS — ready for your team to send reminders, answer questions, and manage attendees without switching tools.</p>
          <h3 className="mt-5 font-semibold text-slate-800">Step 1 — Connect your CS workspace</h3>
          <p>In the webinar editor open <strong>Advanced Info → Registration Settings</strong> and click <strong>Connect Fab CRM</strong>. Enter your <strong>CS Workspace ID</strong>, found in{' '}
            <a href="https://cs.fabbuilder.com/settings/general_settings" target="_blank" rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
              Fab CS → Settings → General Settings
            </a>{' '}under <em>Account Details</em>. Click <strong>Save</strong>. This is a one-time setup per workspace.</p>
          <h3 className="mt-5 font-semibold text-slate-800">Step 2 — Select a channel</h3>
          <p>After connecting, a <strong>Channel</strong> dropdown lists all active channels from your CS workspace. Select the channel where registrant data should be sent.</p>
          <h3 className="mt-5 font-semibold text-slate-800">Step 3 — Save</h3>
          <p>Save the webinar. Every registration submitted through the form is forwarded to the selected channel automatically. You can swap or remove the channel at any time.</p>
          <Note>
            <strong>No CS account yet?</strong> Sign up at{' '}
            <a href="https://cs.fabbuilder.com" target="_blank" rel="noreferrer"
              className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
              cs.fabbuilder.com
            </a>{' '}— the free tier includes unlimited communication channels.
          </Note>
        </Section>

        <Section id="share-link" title="Shareable link">
          <p>Every webinar has a permanent public viewer link generated the moment it is created. Click the <strong>Share</strong> button in the editor toolbar, then open the <strong>Share Link</strong> tab.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>Click <strong>Copy link</strong> to copy the URL to your clipboard. Paste it into an email, calendar invite, Slack message, or any other channel.</li>
            <li>The link never changes for the lifetime of the webinar — share it before the session goes live and attendees will see a live countdown until it starts.</li>
            <li>A separate <strong>Preview link</strong> lets you test the full viewer experience as the organiser without it counting as an attendee join.</li>
          </ul>
        </Section>

        <Section id="social" title="Social sharing">
          <p>The <strong>Social Share</strong> tab in the share modal lets you promote the webinar on LinkedIn or X (Twitter) with one click. Page Pilot pre-fills the post with the webinar title and viewer link so there is nothing to write.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>Click <strong>Share on LinkedIn</strong> or <strong>Share on X</strong>. Your browser opens the platform's native composer in a new tab with everything pre-filled — review and post.</li>
            <li>A preview image is auto-generated from the webinar thumbnail and attached to the post so it stands out in social feeds.</li>
          </ul>
        </Section>

        <Section id="status" title="Live status">
          <p>The webinar list includes a <strong>Status</strong> panel on the right side that groups sessions by their current state so you always have a clear picture of what is happening across your entire webinar programme.</p>
          <ul className="ml-4 list-disc space-y-1.5">
            <li><strong>Live now</strong> — sessions currently inside their scheduled window. A prominent live badge is shown on the card and in the status panel.</li>
            <li><strong>Upcoming</strong> — sessions scheduled in the future, sorted by start time. A countdown shows exactly how long until the next one begins.</li>
            <li><strong>Previous</strong> — sessions whose scheduled window has passed. Still fully accessible via the share link for on-demand replay by anyone with the URL.</li>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}
