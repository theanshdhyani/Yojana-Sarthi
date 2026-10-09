import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QuestionnaireAnswers } from '../types/questionnaire';
import { Scheme, EvaluatedScheme } from '../types/scheme';
import { TrackedApplication } from '../types/tracker';
import { FamilyMember } from '../types/family';
import { UserPreferences, AppLanguage } from '../types/settings';
import { StorageService, SAMPLE_DEMO_DATA } from '../services/storageService';
import { evaluateAllSchemes, evaluateSchemeEligibility } from '../services/eligibilityEngine';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { TRANSLATIONS } from '../data/translations';
import { SpeechService } from '../services/speechService';

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
  setAnswers: (updater: QuestionnaireAnswers | ((prev: QuestionnaireAnswers) => QuestionnaireAnswers)) => void;
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
  t: (key: keyof typeof TRANSLATIONS.en) => string;

  // Modals & Sheets
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
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
  clearAllUserData: () => void;
  loadSampleData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);

  const [answers, setAnswersState] = useState<QuestionnaireAnswers>(StorageService.getAnswers);
  const [readyDocumentIds, setReadyDocumentIds] = useState<string[]>(StorageService.getReadyDocuments);
  const [applications, setApplications] = useState<TrackedApplication[]>(StorageService.getApplications);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(StorageService.getFamilyMembers);
  const [settings, setSettingsState] = useState<UserPreferences>(StorageService.getSettings);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

    if (settings.fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (settings.fontSize === 'extra-large') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [settings]);

  const updateSettings = (partial: Partial<UserPreferences>) => {
    const updated = { ...settings, ...partial };
    setSettingsState(updated);
    StorageService.saveSettings(updated);
  };

  const setAnswers = (updater: QuestionnaireAnswers | ((prev: QuestionnaireAnswers) => QuestionnaireAnswers)) => {
    setAnswersState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      StorageService.saveAnswers(next);
      return next;
    });
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
    addToast('Application saved to tracker', 'success');
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
                title: `Status updated to ${status.replace(/_/g, ' ')}`,
                description: 'Updated by user'
              }
            ]
          }
        : app
    );
    setApplications(next);
    StorageService.saveApplications(next);
    addToast('Application status updated', 'success');
  };

  const deleteApplication = (appId: string) => {
    const next = applications.filter((a) => a.id !== appId);
    setApplications(next);
    StorageService.saveApplications(next);
    addToast('Application removed from tracker', 'info');
  };

  const addFamilyMember = (memberData: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: 'fam_' + Date.now()
    };
    const next = [...familyMembers, newMember];
    setFamilyMembers(next);
    StorageService.saveFamilyMembers(next);
    addToast(`Added ${newMember.name} to family profile`, 'success');
  };

  const deleteFamilyMember = (id: string) => {
    const next = familyMembers.filter((m) => m.id !== id);
    setFamilyMembers(next);
    StorageService.saveFamilyMembers(next);
    addToast('Family member removed', 'info');
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
    setIsSpeaking(true);
    SpeechService.speak(text, settings.language === 'hi' ? 'hi' : 'en', () => {
      setIsSpeaking(false);
    });
  };

  const stopReading = () => {
    SpeechService.stop();
    setIsSpeaking(false);
  };

  const clearAllUserData = () => {
    StorageService.clearAllData();
    setAnswersState({});
    setReadyDocumentIds([]);
    setApplications([]);
    setFamilyMembers([]);
    addToast(t('clearDataSuccess'), 'success');
  };

  const loadSampleData = () => {
    StorageService.loadSampleDemoData();
    setAnswersState(SAMPLE_DEMO_DATA.answers);
    setReadyDocumentIds(SAMPLE_DEMO_DATA.readyDocuments);
    setApplications(SAMPLE_DEMO_DATA.applications);
    setFamilyMembers(SAMPLE_DEMO_DATA.familyMembers);
    addToast(settings.language === 'hi' ? 'नमूना डेटा लोड किया गया' : 'Sample demo profile loaded', 'success');
  };

  const t = (key: keyof typeof TRANSLATIONS.en): string => {
    const lang = settings.language === 'hi' ? 'hi' : 'en';
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return (dict as any)[key] || TRANSLATIONS.en[key] || String(key);
  };

  const evaluatedResults = evaluateAllSchemes(answers, readyDocumentIds);

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
        isSettingsOpen,
        setIsSettingsOpen,
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
        clearAllUserData,
        loadSampleData
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
