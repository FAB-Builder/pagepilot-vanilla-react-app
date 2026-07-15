import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ExternalLink, Moon, Search, Sun, X } from 'lucide-react';
import { GithubIcon, PagePilotIcon } from './Icons';
import { FloatingGoogleTranslator } from './FloatingGoogleTranslator';
import SearchBar from './SearchBar';
import { useTheme } from '../hooks/useTheme';

const PAGEPILOT_URL = 'https://pagepilot.fabbuilder.com/';
const AHDJS_REPO_URL = 'https://github.com/ishaan-puniani/ahdjs';

function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Fixed header */}
      <header className="z-20 shrink-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1700px] items-center gap-2 px-4 sm:px-6">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 font-semibold text-ink"
            aria-label="PagePilot home"
          >
            <PagePilotIcon className="h-10 w-auto" />
           </Link>

          <div className="ml-4 hidden flex-1 justify-center sm:flex">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setMobileSearchOpen((v) => !v)}
              aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-ink dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 sm:hidden"
            >
              {mobileSearchOpen ? <X size={16} /> : <Search size={16} />}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-ink"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href={PAGEPILOT_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark sm:px-3"
            >
              <span className="hidden sm:inline">Open Page Pilot</span>
              <span className="sm:hidden">Open</span>
              <ExternalLink size={13} className="opacity-80" />
            </a>
            <a
              href={AHDJS_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-ink sm:px-3"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ahdjs</span>
            </a>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="border-t border-slate-200/80 px-4 py-2.5 dark:border-slate-700 sm:hidden">
            <SearchBar autoFocus onNavigate={() => setMobileSearchOpen(false)} />
          </div>
        )}
      </header>

      {/* Body: only the content area scrolls */}
      <div className="flex flex-1 overflow-hidden">
        <main className="scroll-slim flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1700px] px-4 pb-16 sm:pt-8 sm:px-6">
            <Outlet />
          </div>
        </main>
      </div>

      <FloatingGoogleTranslator />
    </div>
  );
}

export default Layout;
