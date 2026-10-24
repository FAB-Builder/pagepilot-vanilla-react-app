import { languageCopy, languages } from '../../lib/languages';
import { setTranslateLanguage } from '../../lib/translate/googtrans';
import { Flag } from './Flag';
import { LanguageOption } from './LanguageOption';

interface LanguagePanelProps {
  active: string;
  onClose: () => void;
}

export function LanguagePanel({ active, onClose }: LanguagePanelProps) {
  const current = languages.find((language) => language.code === active) ?? languages[0];

  const select = (code: string) => {
    if (code === active) return onClose();
    setTranslateLanguage(code);
  };

  return (
    <div className="scroll-slim mx-auto grid max-h-[calc(100dvh-3.5rem)] max-w-[1700px] gap-8 overflow-y-auto px-4 pb-12 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-12 lg:px-12">
      <div>
        <p className="menu-reveal text-xs text-slate-400">{languageCopy.eyebrow}</p>
        <p className="menu-reveal mt-4 flex items-center gap-3 text-2xl font-semibold leading-tight tracking-tight text-ink">
          <Flag code={current.flag} />
          {current.native}
        </p>
        <p className="menu-reveal mt-3 max-w-72 text-[13px] leading-relaxed text-slate-500">
          {languageCopy.description}
        </p>
      </div>

      <div>
        <p className="menu-reveal text-xs text-slate-400">{languageCopy.listLabel}</p>
        <div
          role="radiogroup"
          aria-label={languageCopy.listLabel}
          className="menu-reveal mt-3 grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {languages.map((language) => (
            <LanguageOption
              key={language.code}
              language={language}
              active={language.code === active}
              onSelect={select}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
