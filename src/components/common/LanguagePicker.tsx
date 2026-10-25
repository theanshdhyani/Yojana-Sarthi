import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppLanguage, LANGUAGES } from '../../i18n';

/** Every supported language, each written in its own script so people can find theirs without reading English. */
export const LanguageGrid: React.FC<{ onPicked?: () => void; columns?: 2 | 3 }> = ({ onPicked, columns = 2 }) => {
  const { settings, updateSettings } = useApp();

  const pick = (code: AppLanguage) => {
    updateSettings({ language: code });
    onPicked?.();
  };

  return (
    <div role="radiogroup" className={`grid gap-2 ${columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
      {LANGUAGES.map((lang) => {
        const selected = settings.language === lang.code;
        return (
          <button
            key={lang.code}
            role="radio"
            aria-checked={selected}
            lang={lang.code}
            onClick={() => pick(lang.code)}
            className={`relative p-3.5 rounded-2xl text-left transition-colors ${
              selected
                ? 'bg-[var(--accent-saffron-light)] ring-2 ring-[var(--accent-saffron)]'
                : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <span className="block text-[17px] font-semibold text-[var(--text-primary)] leading-tight">{lang.native}</span>
            <span className="block text-xs text-[var(--text-secondary)] mt-1" lang="en">
              {lang.english}
            </span>
            {selected && <Check className="absolute top-3 right-3 w-4 h-4 text-[var(--accent-saffron)]" />}
          </button>
        );
      })}
    </div>
  );
};

/** Pop-up sheet opened from the header or the mobile dock. */
export const LanguageSheet: React.FC = () => {
  const { isLanguageSheetOpen, setIsLanguageSheetOpen, t } = useApp();

  useEffect(() => {
    if (!isLanguageSheetOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsLanguageSheetOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isLanguageSheetOpen, setIsLanguageSheetOpen]);

  if (!isLanguageSheetOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 glass-scrim no-print"
      onClick={(e) => e.target === e.currentTarget && setIsLanguageSheetOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-sheet-heading"
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto glass-modal rounded-[2rem] p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="language-sheet-heading" className="text-xl font-bold text-[var(--text-primary)]">
              {t('chooseLanguage')}
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">{t('chooseLanguageHint')}</p>
          </div>
          <button
            onClick={() => setIsLanguageSheetOpen(false)}
            aria-label={t('close')}
            className="w-9 h-9 shrink-0 inline-flex items-center justify-center rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <LanguageGrid onPicked={() => setIsLanguageSheetOpen(false)} />
      </div>
    </div>
  );
};

/** Shown for languages a fluent speaker has not reviewed yet, so nobody relies blindly on a machine-assisted translation. */
export const TranslationNotice: React.FC = () => {
  const { settings, t, updateSettings } = useApp();
  const key = `ys_translation_note_${settings.language}`;
  const [dismissed, setDismissed] = React.useState(() => {
    try {
      return sessionStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(key) === '1');
    } catch {
      setDismissed(false);
    }
  }, [key]);

  const info = LANGUAGES.find((l) => l.code === settings.language);
  if (!info || info.reviewed || dismissed) return null;

  const close = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(key, '1');
    } catch {
      // Private mode: the note simply shows again next time.
    }
  };

  return (
    <div role="note" className="max-w-7xl mx-auto px-3 sm:px-4 mt-2 no-print">
      <div className="glass-toolbar rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[13px] text-[var(--text-secondary)]">
        <p className="flex-1 leading-relaxed">{t('machineTranslationNote')}</p>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => updateSettings({ language: 'en' })} className="h-8 px-3 rounded-full bg-[var(--bg-subtle)] font-semibold text-[var(--text-primary)]" lang="en">
            English
          </button>
          <button onClick={() => updateSettings({ language: 'hi' })} className="h-8 px-3 rounded-full bg-[var(--bg-subtle)] font-semibold text-[var(--text-primary)]" lang="hi">
            हिन्दी
          </button>
          <button onClick={close} aria-label={t('dismiss')} className="w-8 h-8 inline-flex items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
