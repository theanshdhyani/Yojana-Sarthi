import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  X, 
  SlidersHorizontal, 
  Languages, 
  ArrowRight,
  WifiOff,
  Volume2,
  VolumeX
} from 'lucide-react';

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
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome') },
    { id: 'questionnaire', label: t('navFindSchemes') },
    { id: 'all_schemes', label: t('navAllSchemes') },
    { id: 'document_checker', label: t('navDocumentChecker') },
    { id: 'tracker', label: t('navTracker') },
    { id: 'nearby_help', label: t('navNearbyHelp') },
    { id: 'family_mode', label: t('navFamilyMode') }
  ];

  const handleNavClick = (viewId: any) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    updateSettings({ language: settings.language === 'en' ? 'hi' : 'en' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-hairline)] transition-colors no-print">
      {!isOnline && (
        <div className="bg-amber-900 text-amber-100 px-4 py-1.5 text-xs text-center flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t('offlineStatusBanner')}</span>
        </div>
      )}

      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-baseline gap-2.5 text-left group focus-visible:ring-2 rounded-lg"
          >
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[var(--text-primary)]">
              Yojana Sarthi
            </span>
            <span className="text-sm font-sans font-medium text-amber-700 dark:text-amber-400">
              योजना सारथी
            </span>
          </button>
        </div>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]">
          {navItems.slice(0, 5).map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors hover:text-[var(--text-primary)] relative py-2 ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-saffron)] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions & Accessibility Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {isSpeaking && (
            <button
              onClick={stopReading}
              title={t('speechStop')}
              className="p-2 text-amber-700 bg-amber-100 dark:bg-amber-950/60 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline">{t('speechStop')}</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title={t('languageToggle')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-colors"
          >
            <Languages className="w-3.5 h-3.5 text-[var(--accent-saffron)]" />
            <span>{settings.language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Settings & Accessibility Sheet */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title={t('settings')}
            className="p-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('questionnaire')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] rounded-lg transition-colors shadow-xs"
          >
            <span>{t('heroCtaPrimary')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md border border-[var(--border-hairline)] text-[var(--text-primary)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-4 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-[var(--accent-saffron-light)] text-[var(--accent-saffron)] font-semibold'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[var(--border-hairline)] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('questionnaire')}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] rounded-lg"
            >
              {t('heroCtaPrimary')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
