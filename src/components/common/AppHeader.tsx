import React, { useEffect, useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { Menu, X, SlidersHorizontal, Languages, ArrowRight, WifiOff, VolumeX } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    settings,
    updateSettings,
    setIsSettingsOpen,
    isSpeaking,
    stopReading,
    isOnline,
    openFindSchemes,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navItems: { id: AppView; label: string }[] = [
    { id: 'home', label: t('navHome') },
    { id: 'questionnaire', label: t('navFindSchemes') },
    { id: 'all_schemes', label: t('navAllSchemes') },
    { id: 'document_checker', label: t('navDocumentChecker') },
    { id: 'tracker', label: t('navTracker') },
    { id: 'nearby_help', label: t('navNearbyHelp') },
    { id: 'family_mode', label: t('navFamilyMode') }
  ];

  const isActive = (id: AppView) =>
    currentView === id ||
    (id === 'all_schemes' && currentView === 'scheme_detail') ||
    (id === 'questionnaire' && currentView === 'results');

  const handleNavClick = (viewId: AppView) => {
    if (viewId === 'questionnaire') {
      openFindSchemes();
    } else {
      setCurrentView(viewId);
    }
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    updateSettings({ language: settings.language === 'en' ? 'hi' : 'en' });
  };

  const iconButton =
    'h-10 min-w-10 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-semibold transition-colors';

  return (
    <header className="sticky top-0 z-40 no-print px-3 sm:px-4 pt-3">
      {!isOnline && (
        <div
          role="status"
          className="max-w-7xl mx-auto mb-2 glass-toolbar rounded-full px-4 py-1.5 text-xs text-center flex items-center justify-center gap-2 font-medium text-[var(--accent-saffron-text)]"
        >
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t('offlineStatusBanner')}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto glass-nav rounded-[1.375rem] h-16 pl-3 pr-2 sm:pl-4 flex items-center justify-between gap-3">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left rounded-xl shrink-0"
          aria-label="Yojana Sarthi home"
        >
          <img src="/icon.svg" alt="" className="w-9 h-9 rounded-[10px] shadow-sm" />
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-bold tracking-tight text-[var(--text-primary)]">Yojana Sarthi</span>
            <span className="text-[11px] font-semibold text-[var(--accent-saffron)] mt-0.5">योजना सारथी</span>
          </span>
        </button>

        <nav aria-label="Primary" className="hidden lg:flex segmented text-[13px] font-medium">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive(item.id) ? 'page' : undefined}
              aria-pressed={isActive(item.id)}
              className={`px-3.5 py-1.5 whitespace-nowrap ${
                isActive(item.id) ? 'font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {isSpeaking && (
            <button onClick={stopReading} title={t('speechStop')} className={`${iconButton} text-[var(--accent-saffron-text)]`}>
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline">{t('speechStop')}</span>
            </button>
          )}

          <button onClick={toggleLanguage} title={t('languageToggle')} className={iconButton}>
            <Languages className="w-4 h-4 text-[var(--accent-saffron)]" />
            <span>{settings.language === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          <button onClick={() => setIsSettingsOpen(true)} title={t('settings')} aria-label={t('settings')} className={iconButton}>
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={() => openFindSchemes()}
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold text-white bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] rounded-full"
          >
            <span>{t('heroCtaPrimary')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden ${iconButton}`}
            aria-label={settings.language === 'hi' ? 'मेनू' : 'Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-2 glass-modal rounded-[1.375rem] p-2.5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive(item.id) ? 'page' : undefined}
              className={`w-full text-left px-4 py-3 text-[15px] rounded-2xl font-medium transition-colors ${
                isActive(item.id)
                  ? 'bg-[var(--accent-saffron-light)] text-[var(--accent-saffron-text)] font-semibold'
                  : 'text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              openFindSchemes();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-1 py-3 text-center text-[15px] font-semibold text-white bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] rounded-2xl"
          >
            {t('heroCtaPrimary')}
          </button>
        </div>
      )}
    </header>
  );
};
