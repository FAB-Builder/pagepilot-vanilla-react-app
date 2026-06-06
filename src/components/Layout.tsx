import { Outlet, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { GithubIcon, PagePilotIcon } from './Icons';

const PAGEPILOT_URL = 'https://pagepilot.fabbuilder.com/';
const AHDJS_REPO_URL = 'https://github.com/ishaan-puniani/ahdjs';

function Layout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Fixed header */}
      <header className="z-20 shrink-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center px-6">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 font-semibold text-ink"
            aria-label="PagePilot home"
          >
            <PagePilotIcon className="h-10 w-auto" />
           </Link>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={PAGEPILOT_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              Open Page Pilot
              <ExternalLink size={13} className="opacity-80" />
            </a>
            <a
              href={AHDJS_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-ink"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              ahdjs
            </a>
          </div>
        </div>
      </header>

      {/* Body: only the content area scrolls */}
      <div className="flex flex-1 overflow-hidden">
        <main className="scroll-slim flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
