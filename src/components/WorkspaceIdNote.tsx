import { PAGEPILOT_APP_URL } from '../lib/ahd';

/**
 * Link to the Page Pilot app, where a user finds their workspace id.
 * Use inline, mid-sentence.
 */
export function WorkspaceIdLink({ label = 'pagepilot.fabbuilder.com/tenant' }: { label?: string }) {
  return (
    <a
      href={PAGEPILOT_APP_URL}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
    >
      {label}
    </a>
  );
}

/**
 * Standard callout explaining where to get a workspace id. Shown on every
 * page that documents an API call, so the answer is always one scroll away
 * and worded identically everywhere.
 */
export default function WorkspaceIdNote() {
  return (
    <div className="my-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
      <strong className="text-ink">Where to find your workspace id:</strong> open the Page Pilot
      app at <WorkspaceIdLink /> and select your workspace — the long string that appears in the
      address bar is the id. It isn't sensitive; it shows up in every dashboard URL.
    </div>
  );
}
