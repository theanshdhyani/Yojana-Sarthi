import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Languages, 
  Type, 
  Eye, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { LanguageGrid } from '../common/LanguagePicker';

export const SettingsModal: React.FC = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    settings, 
    updateSettings, 
    clearAllUserData, 
    t 
  } = useApp();

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!isSettingsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsSettingsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isSettingsOpen, setIsSettingsOpen]);

  if (!isSettingsOpen) return null;

  const handleExport = () => {
    const dataStr = StorageService.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yojana-sarthi-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoking synchronously can cancel the download in some browsers.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleClear = () => {
    clearAllUserData();
    setConfirmDelete(false);
    setIsSettingsOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-scrim no-print"
      onClick={(e) => e.target === e.currentTarget && setIsSettingsOpen(false)}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto glass-modal rounded-[2rem] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-heading"
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-hairline)] flex items-center justify-between sticky top-0 bg-[var(--glass-modal-bg)] backdrop-blur-xl z-10">
          <div>
            <h3 id="settings-heading" className="text-lg font-serif font-bold text-[var(--text-primary)]">
              {t('settings')}
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              {t('languageAccessibilityAndPrivacyControls')}
            </p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            aria-label={t('close')}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-7 divide-y divide-[var(--border-hairline)]">
          
          {/* Language Selection */}
          <div className="space-y-3 pt-0">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Languages className="w-4 h-4 text-[var(--accent-saffron)]" />
              <span>{t('languageToggle')}</span>
            </div>
            <LanguageGrid columns={3} />
          </div>

          {/* Simple Language Mode ("सरल भाषा मोड") */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{t('simpleLanguageToggle')}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {t('replacesBureaucraticClausesWithPlain')}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.simpleLanguageMode}
                onClick={() => updateSettings({ simpleLanguageMode: !settings.simpleLanguageMode })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.simpleLanguageMode ? 'bg-[var(--accent-saffron)]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.simpleLanguageMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Text Size / Scaling */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Type className="w-4 h-4 text-[var(--accent-saffron)]" />
              <span>{t('fontSizeToggle')}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'normal', label: t('fontStandard') },
                { id: 'large', label: t('fontLarge') },
                { id: 'extra-large', label: t('fontExtraLarge') }
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => updateSettings({ fontSize: size.id as any })}
                  className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                    settings.fontSize === size.id
                      ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold text-[var(--text-primary)]'
                      : 'border-[var(--border-hairline)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast & Dark Theme */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span>{t('highContrastMode')}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {t('enhancesBordersAndTextContrast')}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.highContrast}
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.highContrast ? 'bg-emerald-700' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  {settings.theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  <span>{t('darkTheme')}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {t('deepDarkAestheticForNighttime')}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.theme === 'dark'}
                onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Reduce Motion */}
          <div className="pt-6 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                {t('reduceMotion')}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t('turnsOffTheDriftingBackground')}
              </p>
            </div>
            <button
              role="switch"
              aria-checked={settings.reducedMotion}
              onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-7 flex items-center rounded-full p-0.5 transition-colors ${
                settings.reducedMotion ? 'bg-[var(--accent-green)]' : 'bg-[var(--bg-subtle)]'
              }`}
            >
              <span
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Privacy Architecture Statement */}
          <div className="pt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('localFirstPrivacyArchitecture')}</span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {t('allQuestionnaireResponsesAndApplication')}
            </p>
          </div>

          {/* Data Export & Wipe */}
          <div className="pt-6 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleExport}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('exportData')}</span>
              </button>

              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('clearAllData')}</span>
                </button>
              ) : (
                <div className="flex-1 flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    {t('confirmDelete')}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
                  >
                    {t('cancel')}
                  </button>
                </div>
              )}
            </div>
            {confirmDelete && (
              <p className="text-[11px] text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{t('clearDataConfirm')}</span>
              </p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-hairline)] flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white transition-colors"
          >
            {t('done')}
          </button>
        </div>
      </div>
    </div>
  );
};
