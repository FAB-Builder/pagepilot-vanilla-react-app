import { useCallback, useRef, useState } from 'react';
import { ChevronDown, Languages } from 'lucide-react';
import { languageCopy } from '../../lib/languages';
import { useActiveLanguage } from '../../hooks/useActiveLanguage';
import { useDismiss } from '../../hooks/useDismiss';
import { LanguagePanel } from './LanguagePanel';

export function LanguageMenu() {
  const active = useActiveLanguage();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const arm = () => setArmed(true);

  useDismiss(rootRef, open, close);

  return (
    <div
      ref={rootRef}
      onPointerEnter={arm}
      onFocus={arm}
      translate="no"
      className={`notranslate mega group flex items-center ${open ? 'mega--open' : ''}`}
    >
      <button
        type="button"
        onClick={() => {
          arm();
          setOpen((value) => !value);
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={languageCopy.trigger}
        className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2 text-[13px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
      >
        <Languages className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="uppercase">{active.split('-')[0]}</span>
        <ChevronDown
          className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden="true"
        />
      </button>

      <div className="mega__panel border-b border-slate-200 bg-white shadow-soft">
        {armed && <LanguagePanel active={active} onClose={close} />}
      </div>
      <div className="mega__scrim" aria-hidden="true" />
    </div>
  );
}
