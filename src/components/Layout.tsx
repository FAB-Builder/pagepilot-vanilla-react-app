import { Outlet, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Moon, Search, Sun } from 'lucide-react';
import { GithubIcon, PagePilotIcon } from './Icons';
import { GoogleTranslate } from './language/GoogleTranslate';
import { LanguageMenu } from './language/LanguageMenu';
import SearchCommand from './search/SearchCommand';
import HeaderNav from './header/HeaderNav';
import HeaderIconButton from './header/HeaderIconButton';
import { openSearch } from '../lib/searchCommand';
import { HOME_CONTAINER } from './layoutClasses';
import { useTheme } from '../hooks/useTheme';

const PAGEPILOT_URL = 'https://pagepilot.fabbuilder.com/';
const AHDJS_REPO_URL = 'https://github.com/ishaan-puniani/ahdjs';

function Layout() {
  const { theme, toggleTheme } = useTheme();
  const isHome = useLocation().pathname === '/';

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="relative z-20 shrink-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div
          className={[
            'flex h-14 items-center gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]',
            isHome ? HOME_CONTAINER : 'px-4 sm:px-5',
          ].join(' ')}
        >
          <Link to="/" className="shrink-0 justify-self-start" aria-label="Page Pilot docs home">
            <PagePilotIcon className="h-9 w-auto" />
          </Link>

          <HeaderNav />

          <div className="ml-auto flex items-center gap-1 justify-self-end">
            <LanguageMenu />
            {/* Desktop search lives in the docs sidebar and the home hero. */}
            <HeaderIconButton label="Search docs" onClick={openSearch} className="lg:hidden">
              <Search size={16} />
            </HeaderIconButton>
            <HeaderIconButton
              label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </HeaderIconButton>
            <HeaderIconButton label="ahdjs on GitHub" href={AHDJS_REPO_URL}>
              <GithubIcon className="h-4 w-4" />
            </HeaderIconButton>

            <span className="mx-2 hidden h-5 w-px bg-slate-200 sm:block" aria-hidden="true" />

            <a
              href={PAGEPILOT_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-brand-dark"
            >
              <span className="hidden sm:inline">Open Page Pilot</span>
              <span className="sm:hidden">Open</span>
              <ArrowUpRight
                size={14}
                className="opacity-80 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Only the content area scrolls; pages own their own padding. */}
      <main className="scroll-slim flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <SearchCommand />
      <GoogleTranslate />
    </div>
  );
}

export default Layout;
