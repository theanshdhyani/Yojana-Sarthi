import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { QuestionnaireAnswers } from '../types/questionnaire';
import { Scheme, EvaluatedScheme } from '../types/scheme';
import { TrackedApplication } from '../types/tracker';
import { FamilyMember } from '../types/family';
import { UserPreferences } from '../types/settings';
import { StorageService, SAMPLE_DEMO_DATA } from '../services/storageService';
import { evaluateAllSchemes } from '../services/eligibilityEngine';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { SpeechService } from '../services/speechService';
import {
  BUILTIN_MESSAGES,
  LocaleContent,
  Localizer,
  MessageKey,
  Messages,
  Msg,
  MsgParam,
  ensureScriptFont,
  formatMessage,
  formatMsg,
  languageInfo,
  loadLocale,
  makeLocalizer
} from '../i18n';
import { en } from '../i18n/messages/en';

export type AppView =
  | 'home'
  | 'questionnaire'
  | 'results'
  | 'scheme_detail'
  | 'all_schemes'
  | 'document_checker'
  | 'tracker'
  | 'family_mode'
  | 'nearby_help'
  | 'print_slip';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedSchemeId: string | null;
  setSelectedSchemeId: (id: string | null) => void;
  selectedScheme: Scheme | null;

  // Answers & Evaluation
  answers: QuestionnaireAnswers;
  setAnswers: (updater: QuestionnaireAnswers | ((prev: QuestionnaireAnswers) => QuestionnaireAnswers), isDemo?: boolean) => void;
  evaluatedResults: {
    strongMatches: EvaluatedScheme[];
    possibleMatches: EvaluatedScheme[];
    reviewRequired: EvaluatedScheme[];
  };

  // Documents
  readyDocumentIds: string[];
  toggleDocumentReady: (docId: string) => void;

  // Applications
  applications: TrackedApplication[];
  addApplication: (app: Omit<TrackedApplication, 'id' | 'lastUpdated'>) => void;
  updateApplicationStatus: (appId: string, status: TrackedApplication['status']) => void;
  deleteApplication: (appId: string) => void;

  // Family Mode
  familyMembers: FamilyMember[];
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  deleteFamilyMember: (id: string) => void;

  // Settings & Preferences
  settings: UserPreferences;
  updateSettings: (partial: Partial<UserPreferences>) => void;
  /** UI text in the current language; `{name}` placeholders are filled from params. */
  t: (key: MessageKey, params?: Record<string, MsgParam>) => string;
  /** Renders a message produced elsewhere (e.g. an eligibility reason). */
  tm: (m: Msg) => string;
  /** Scheme and document content in the current language. */
  L: Localizer;
  /** True while a chosen language's text is still downloading. */
  isLanguageLoading: boolean;

  // Modals & Sheets
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isLanguageSheetOpen: boolean;
  setIsLanguageSheetOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;

  // Speech Helper
  isSpeaking: boolean;
  readAloud: (text: string) => void;
  stopReading: () => void;

  // Network State
  isOnline: boolean;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Clear & Export & Demo
  isDemoData: boolean;
  setIsDemoData: (v: boolean) => void;
  clearAllUserData: () => void;
  loadSampleData: () => void;
  startNewAssessment: () => void;
  openFindSchemes: () => void;
  continuePreviousAssessment: () => void;
  showResumePrompt: boolean;
  setShowResumePrompt: (show: boolean) => void;
  hasSavedAnswers: boolean;
  questionnaireStepIndex: number;
  setQuestionnaireStepIndex: (step: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STATUS_KEYS: Record<TrackedApplication['status'], MessageKey> = {
  to_apply: 'statusToApply',
  under_review: 'statusUnderReview',
  approved: 'statusApproved',
  action_required: 'statusActionRequired',
  rejected: 'statusActionRequired'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);

  const [answers, setAnswersState] = useState<QuestionnaireAnswers>(StorageService.getAnswers);
  const [isDemoData, setIsDemoDataState] = useState<boolean>(StorageService.isDemoMode);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [questionnaireStepIndex, setQuestionnaireStepIndex] = useState(0);
  const [readyDocumentIds, setReadyDocumentIds] = useState<string[]>(StorageService.getReadyDocuments);
  const [applications, setApplications] = useState<TrackedApplication[]>(StorageService.getApplications);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(StorageService.getFamilyMembers);
  const [settings, setSettingsState] = useState<UserPreferences>(StorageService.getSettings);

  const [messages, setMessages] = useState<Messages>(() => BUILTIN_MESSAGES[settings.language] ?? en);
  const [localeContent, setLocaleContent] = useState<LocaleContent | null>(null);
  const [isLanguageLoading, setIsLanguageLoading] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check onboarding seen
    if (!StorageService.hasSeenOnboarding()) {
      setIsOnboardingOpen(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync settings to document class list
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    root.classList.toggle('reduce-motion', settings.reducedMotion);

    if (settings.fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (settings.fontSize === 'extra-large') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', settings.theme === 'dark' ? '#0B0D12' : '#F4F1EC');
  }, [settings]);

  // Load the chosen language: built-in ones switch instantly, others download once and are cached.
  useEffect(() => {
    const lang = settings.language;
    document.documentElement.lang = lang;
    ensureScriptFont(lang);

    const builtin = BUILTIN_MESSAGES[lang];
    if (builtin) {
      setMessages(builtin);
      setLocaleContent(null);
      setIsLanguageLoading(false);
      return;
    }

    let cancelled = false;
    setIsLanguageLoading(true);
    loadLocale(lang)
      .then((bundle) => {
        if (cancelled) return;
        setMessages(bundle?.messages ?? en);
        setLocaleContent(bundle?.content ?? null);
      })
      .catch(() => {
        // Offline before this language was ever downloaded: stay readable in English.
        if (!cancelled) setMessages(en);
      })
      .finally(() => {
        if (!cancelled) setIsLanguageLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [settings.language]);

  const updateSettings = (partial: Partial<UserPreferences>) => {
    const updated = { ...settings, ...partial };
    setSettingsState(updated);
    StorageService.saveSettings(updated);
  };

  const setIsDemoData = (isDemo: boolean) => {
    setIsDemoDataState(isDemo);
    StorageService.setDemoMode(isDemo);
  };

  const setAnswers = (
    updater: QuestionnaireAnswers | ((prev: QuestionnaireAnswers) => QuestionnaireAnswers),
    isDemo = false
  ) => {
    setAnswersState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      StorageService.saveAnswers(next);
      return next;
    });
    setIsDemoDataState(isDemo);
    StorageService.setDemoMode(isDemo);
  };

  const toggleDocumentReady = (docId: string) => {
    setReadyDocumentIds((prev) => {
      const exists = prev.includes(docId);
      const next = exists ? prev.filter((id) => id !== docId) : [...prev, docId];
      StorageService.saveReadyDocuments(next);
      return next;
    });
  };

  const addApplication = (appData: Omit<TrackedApplication, 'id' | 'lastUpdated'>) => {
    const newApp: TrackedApplication = {
      ...appData,
      id: 'app_' + Date.now(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    const next = [newApp, ...applications];
    setApplications(next);
    StorageService.saveApplications(next);
    addToast(t('toastAppSaved'), 'success');
  };

  const updateApplicationStatus = (appId: string, status: TrackedApplication['status']) => {
    const next = applications.map((app) =>
      app.id === appId
        ? {
            ...app,
            status,
            lastUpdated: new Date().toISOString().split('T')[0],
            timeline: [
              ...app.timeline,
              {
                date: new Date().toISOString().split('T')[0],
                title: t('timelineStatusUpdated', { status: t(STATUS_KEYS[status]) }),
                description: t('timelineUpdatedByUser')
              }
            ]
          }
        : app
    );
    setApplications(next);
    StorageService.saveApplications(next);
    addToast(t('toastStatusUpdated'), 'success');
  };

  const deleteApplication = (appId: string) => {
    const next = applications.filter((a) => a.id !== appId);
    setApplications(next);
    StorageService.saveApplications(next);
    addToast(t('toastAppRemoved'), 'info');
  };

  const addFamilyMember = (memberData: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: 'fam_' + Date.now()
    };
    const next = [...familyMembers, newMember];
    setFamilyMembers(next);
    StorageService.saveFamilyMembers(next);
    addToast(t('toastMemberAdded', { name: newMember.name }), 'success');
  };

  const deleteFamilyMember = (id: string) => {
    const next = familyMembers.filter((m) => m.id !== id);
    setFamilyMembers(next);
    StorageService.saveFamilyMembers(next);
    addToast(t('toastMemberRemoved'), 'info');
  };

  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const readAloud = (text: string) => {
    const info = languageInfo(settings.language);
    const started = SpeechService.speak(text, info.speech, () => setIsSpeaking(false), settings.voiceSpeed);
    setIsSpeaking(started);
    if (!started && SpeechService.isSupported()) {
      addToast(t('voiceUnavailable', { language: info.native }), 'info');
    }
  };

  const stopReading = () => {
    SpeechService.stop();
    setIsSpeaking(false);
  };

  const clearAllUserData = () => {
    StorageService.clearAllData();
    setAnswersState({});
    setIsDemoDataState(false);
    StorageService.setDemoMode(false);
    setShowResumePrompt(false);
    setQuestionnaireStepIndex(0);
    setReadyDocumentIds([]);
    setApplications([]);
    setFamilyMembers([]);
    setSettingsState(StorageService.defaultSettings());
    addToast(t('clearDataSuccess'), 'success');
  };

  const loadSampleData = () => {
    StorageService.loadSampleDemoData();
    setIsDemoDataState(true);
    StorageService.setDemoMode(true);
    setShowResumePrompt(false);
    setAnswersState(SAMPLE_DEMO_DATA.answers);
    setReadyDocumentIds(SAMPLE_DEMO_DATA.readyDocuments);
    setApplications(SAMPLE_DEMO_DATA.applications);
    setFamilyMembers(SAMPLE_DEMO_DATA.familyMembers);
    addToast(t('sampleDemoProfileLoaded'), 'success');
  };

  const startNewAssessment = () => {
    stopReading();
    setAnswersState({});
    StorageService.saveAnswers({});
    setIsDemoDataState(false);
    StorageService.setDemoMode(false);
    setShowResumePrompt(false);
    setQuestionnaireStepIndex(0);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const continuePreviousAssessment = () => {
    stopReading();
    setShowResumePrompt(false);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSavedAnswers = Object.values(answers).some(
    (v) => v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true)
  );

  const openFindSchemes = () => {
    stopReading();
    const saved = StorageService.getAnswers();
    const hasExisting = Object.values(saved).some(
      (v) => v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true)
    );

    if (hasExisting) {
      setShowResumePrompt(true);
      setCurrentView('questionnaire');
    } else {
      startNewAssessment();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function t(key: MessageKey, params?: Record<string, MsgParam>): string {
    return formatMessage(messages, key, params);
  }
  const tm = (m: Msg) => formatMsg(messages, m);
  const L = useMemo(
    () => makeLocalizer(settings.language, messages, localeContent),
    [settings.language, messages, localeContent]
  );

  const evaluatedResults = useMemo(() => evaluateAllSchemes(answers, readyDocumentIds), [answers, readyDocumentIds]);

  const selectedScheme = selectedSchemeId
    ? SCHEMES_DATABASE.find((s) => s.id === selectedSchemeId) || null
    : null;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView: (view) => {
          stopReading();
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedSchemeId,
        setSelectedSchemeId,
        selectedScheme,
        answers,
        setAnswers,
        evaluatedResults,
        readyDocumentIds,
        toggleDocumentReady,
        applications,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        familyMembers,
        addFamilyMember,
        deleteFamilyMember,
        settings,
        updateSettings,
        t,
        tm,
        L,
        isLanguageLoading,
        isSettingsOpen,
        setIsSettingsOpen,
        isLanguageSheetOpen,
        setIsLanguageSheetOpen,
        isOnboardingOpen,
        setIsOnboardingOpen: (open) => {
          setIsOnboardingOpen(open);
          if (!open) StorageService.setOnboardingSeen(true);
        },
        isSpeaking,
        readAloud,
        stopReading,
        isOnline,
        toasts,
        addToast,
        removeToast,
        isDemoData,
        setIsDemoData,
        clearAllUserData,
        loadSampleData,
        startNewAssessment,
        openFindSchemes,
        continuePreviousAssessment,
        showResumePrompt,
        setShowResumePrompt,
        hasSavedAnswers,
        questionnaireStepIndex,
        setQuestionnaireStepIndex
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
