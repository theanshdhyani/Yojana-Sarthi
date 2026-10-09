import React, { useState, useEffect, useRef } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Home, 
  Sparkles, 
  Compass, 
  FolderCheck, 
  MoreHorizontal, 
  X, 
  FileCheck2, 
  Users, 
  MapPin, 
  SlidersHorizontal, 
  Languages, 
  Sun, 
  Moon, 
  ArrowRight,
  ChevronRight,
  Layers
} from 'lucide-react';
import { MASTER_DOCUMENTS } from '../../data/documentsData';

export const MobileGlassDock: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    answers, 
    evaluatedResults, 
    readyDocumentIds, 
    applications, 
    setIsSettingsOpen, 
    settings, 
    updateSettings, 
    t 
  } = useApp();

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isActionDismissed, setIsActionDismissed] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Close more menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isMoreOpen &&
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(e.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMoreOpen) {
        setIsMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoreOpen]);

  // Don't render dock in print slip view or desktop
  if (currentView === 'print_slip') {
    return null;
  }

  // Calculate real application state for contextual action capsule
  const answeredCount = Object.keys(answers).filter(
    (k) => (answers as any)[k] !== undefined && (answers as any)[k] !== ''
  ).length;

  const totalMatches = evaluatedResults.strongMatches.length + evaluatedResults.possibleMatches.length;
  const readyDocsCount = readyDocumentIds.length;
  const totalDocsCount = MASTER_DOCUMENTS.length;

  interface ContextualAction {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    targetView: AppView;
  }

  let contextualAction: ContextualAction | null = null;

  if (!isActionDismissed) {
    if (answeredCount > 0 && answeredCount < 6 && currentView !== 'questionnaire') {
      contextualAction = {
        icon: <Sparkles className="w-4 h-4 text-[var(--accent-saffron)] shrink-0" />,
        title: settings.language === 'hi' ? 'प्रश्नावली जारी रखें' : 'Continue Questionnaire',
        subtitle: settings.language === 'hi' ? `${answeredCount}/7 उत्तर दिए गए` : `${answeredCount}/7 questions filled`,
        targetView: 'questionnaire'
      };
    } else if (totalMatches > 0 && currentView !== 'results' && answeredCount >= 3) {
      contextualAction = {
        icon: <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
        title: settings.language === 'hi' ? 'पात्र योजनाएं देखें' : 'Review Scheme Matches',
        subtitle: settings.language === 'hi' ? `${totalMatches} योजनाएं मिलीं` : `${totalMatches} welfare schemes found`,
        targetView: 'results'
      };
    } else if (readyDocsCount > 0 && readyDocsCount < totalDocsCount && currentView !== 'document_checker') {
      contextualAction = {
        icon: <FileCheck2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />,
        title: settings.language === 'hi' ? 'दस्तावेज़ चेकलिस्ट' : 'Document Readiness',
        subtitle: settings.language === 'hi' ? `${readyDocsCount}/${totalDocsCount} तैयार हैं` : `${readyDocsCount}/${totalDocsCount} verified ready`,
        targetView: 'document_checker'
      };
    } else if (applications.length > 0 && currentView !== 'tracker') {
      contextualAction = {
        icon: <FolderCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />,
        title: settings.language === 'hi' ? 'आवेदन स्थिति ट्रैक करें' : 'Track Applications',
        subtitle: settings.language === 'hi' ? `${applications.length} सक्रिय आवेदन` : `${applications.length} active in tracker`,
        targetView: 'tracker'
      };
    }
  }

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setIsMoreOpen(false);
  };

  const toggleLanguage = () => {
    updateSettings({ language: settings.language === 'en' ? 'hi' : 'en' });
  };

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <nav
      aria-label="Mobile Floating Dock"
      className="fixed bottom-4 left-0 right-0 z-40 pointer-events-none flex flex-col items-center justify-end px-3 no-print md:hidden"
      style={{ bottom: 'calc(14px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="relative w-full max-w-[390px] flex flex-col items-center">
        
        {/* Contextual Action Capsule (Floats gracefully above the dock) */}
        {contextualAction && (
          <div className="pointer-events-auto mb-2 w-full animate-fade-in">
            <div className="glass-floating-action p-2 pl-3.5 pr-2.5 flex items-center justify-between gap-2.5 shadow-lg">
              <button
                onClick={() => handleNav(contextualAction!.targetView)}
                className="flex items-center gap-2.5 flex-1 text-left min-w-0"
              >
                <div className="p-1.5 rounded-full bg-white/70 dark:bg-white/10 shrink-0">
                  {contextualAction.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                    {contextualAction.title}
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] truncate">
                    {contextualAction.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-saffron)] shrink-0 ml-1" />
              </button>
              
              <button
                onClick={() => setIsActionDismissed(true)}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full shrink-0"
                aria-label="Dismiss action notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Polished Glass Popover Sheet for "More" Destinations */}
        {isMoreOpen && (
          <div
            ref={moreMenuRef}
            className="pointer-events-auto mb-3 w-full glass-modal rounded-3xl p-4 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-label="More navigation destinations"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
              <span className="text-xs font-serif font-bold text-[var(--text-primary)]">
                {settings.language === 'hi' ? 'नागरिक सुविधाएं एवं सेटिंग्स' : 'Civic Utilities & Tools'}
              </span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Additional Views Grid */}
            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => handleNav('document_checker')}
                className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all text-left ${
                  currentView === 'document_checker'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-primary)]'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold">{t('navDocumentChecker')}</div>
                  <div className="text-[10px] text-[var(--text-secondary)] truncate">
                    {settings.language === 'hi' ? 'दस्तावेज़ तैयारी जांचें व सुधारें' : 'Eligibility & readiness checklist'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              </button>

              <button
                onClick={() => handleNav('family_mode')}
                className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all text-left ${
                  currentView === 'family_mode'
                    ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-100 font-semibold'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-primary)]'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-purple-100/80 dark:bg-purple-900/40 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold">{t('navFamilyMode')}</div>
                  <div className="text-[10px] text-[var(--text-secondary)] truncate">
                    {settings.language === 'hi' ? 'परिवार के सभी सदस्यों की योजनाएं' : 'Multi-generational welfare planner'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              </button>

              <button
                onClick={() => handleNav('nearby_help')}
                className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all text-left ${
                  currentView === 'nearby_help'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 font-semibold'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-primary)]'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100/80 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold">{t('navNearbyHelp')}</div>
                  <div className="text-[10px] text-[var(--text-secondary)] truncate">
                    {settings.language === 'hi' ? 'सीएससी, बीडीओ व सहायता केंद्र' : 'Common Service Centers & BDO offices'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              </button>
            </div>

            {/* Quick Controls Bar: Settings + Language + Theme */}
            <div className="pt-2 border-t border-[var(--border-hairline)] grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setIsSettingsOpen(true);
                  setIsMoreOpen(false);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] text-[10px] font-semibold gap-1 transition-colors border border-[var(--border-hairline)]"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>{t('settings')}</span>
              </button>

              <button
                onClick={toggleLanguage}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] text-[10px] font-semibold gap-1 transition-colors border border-[var(--border-hairline)]"
              >
                <Languages className="w-4 h-4 text-[var(--accent-saffron)]" />
                <span>{settings.language === 'en' ? 'हिन्दी' : 'English'}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] text-[10px] font-semibold gap-1 transition-colors border border-[var(--border-hairline)]"
              >
                {settings.theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* The Floating Navigation Dock Shell */}
        <div className="pointer-events-auto flex items-center gap-2 w-full justify-between">
          
          {/* Main 4-Destination Capsule */}
          <div className="glass-dock flex-1 p-1.5 flex items-center justify-around shadow-2xl">
            {/* 1. Home */}
            <button
              onClick={() => handleNav('home')}
              className={`glass-dock-item ${currentView === 'home' ? 'glass-dock-item-active' : ''}`}
              aria-label={t('navHome')}
            >
              <Home className={`w-4 h-4 ${currentView === 'home' ? 'text-[var(--accent-saffron)]' : ''}`} />
              <span className="mt-0.5 tracking-tight">
                {settings.language === 'hi' ? 'होम' : 'Home'}
              </span>
            </button>

            {/* 2. Find Schemes */}
            <button
              onClick={() => handleNav('questionnaire')}
              className={`glass-dock-item ${currentView === 'questionnaire' ? 'glass-dock-item-active' : ''}`}
              aria-label={t('navFindSchemes')}
            >
              <Sparkles className={`w-4 h-4 ${currentView === 'questionnaire' ? 'text-[var(--accent-saffron)]' : ''}`} />
              <span className="mt-0.5 tracking-tight">
                {settings.language === 'hi' ? 'पात्रता' : 'Check'}
              </span>
            </button>

            {/* 3. Explore Schemes */}
            <button
              onClick={() => handleNav('all_schemes')}
              className={`glass-dock-item ${currentView === 'all_schemes' || currentView === 'scheme_detail' ? 'glass-dock-item-active' : ''}`}
              aria-label={t('navAllSchemes')}
            >
              <Compass className={`w-4 h-4 ${currentView === 'all_schemes' || currentView === 'scheme_detail' ? 'text-[var(--accent-saffron)]' : ''}`} />
              <span className="mt-0.5 tracking-tight">
                {settings.language === 'hi' ? 'योजनाएं' : 'Explore'}
              </span>
            </button>

            {/* 4. My Applications */}
            <button
              onClick={() => handleNav('tracker')}
              className={`glass-dock-item relative ${currentView === 'tracker' ? 'glass-dock-item-active' : ''}`}
              aria-label={t('navTracker')}
            >
              <FolderCheck className={`w-4 h-4 ${currentView === 'tracker' ? 'text-[var(--accent-saffron)]' : ''}`} />
              <span className="mt-0.5 tracking-tight">
                {settings.language === 'hi' ? 'आवेदन' : 'Tracker'}
              </span>
              {applications.length > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[var(--accent-saffron)] ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>
          </div>

          {/* Separate Round More Button */}
          <button
            ref={moreButtonRef}
            onClick={() => setIsMoreOpen((prev) => !prev)}
            aria-expanded={isMoreOpen}
            aria-label="More destinations and options"
            className={`glass-more-button shadow-2xl ${isMoreOpen ? 'glass-dock-item-active' : ''}`}
          >
            {isMoreOpen ? (
              <X className="w-5 h-5 text-[var(--text-primary)]" />
            ) : (
              <MoreHorizontal className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>
    </nav>
  );
};
