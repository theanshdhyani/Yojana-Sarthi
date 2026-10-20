import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppHeader } from './components/common/AppHeader';
import { AppFooter } from './components/common/AppFooter';
import { MobileGlassDock } from './components/common/MobileGlassDock';
import { ToastContainer } from './components/common/ToastContainer';
import { SettingsModal } from './components/views/SettingsModal';
import { OnboardingModal } from './components/views/OnboardingModal';

// Views
import { HomeView } from './components/views/HomeView';
import { QuestionnaireView } from './components/views/QuestionnaireView';
import { ResultsView } from './components/views/ResultsView';
import { SchemeDetailView } from './components/views/SchemeDetailView';
import { AllSchemesView } from './components/views/AllSchemesView';
import { DocumentCheckerView } from './components/views/DocumentCheckerView';
import { ApplicationTrackerView } from './components/views/ApplicationTrackerView';
import { FamilyModeView } from './components/views/FamilyModeView';
import { NearbyHelpView } from './components/views/NearbyHelpView';
import { PrintSlipView } from './components/views/PrintSlipView';

const MainContent: React.FC = () => {
  const { currentView, settings } = useApp();

  return (
    <>
      <div className="ambient-field" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl glass-modal text-sm font-semibold"
      >
        {settings.language === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to main content'}
      </a>

      <div className="min-h-screen flex flex-col justify-between">
        <AppHeader />

        <main id="main" key={currentView} className="flex-1 pb-28 md:pb-0 view-enter">
          {currentView === 'home' && <HomeView />}
          {currentView === 'questionnaire' && <QuestionnaireView />}
          {currentView === 'results' && <ResultsView />}
          {currentView === 'scheme_detail' && <SchemeDetailView />}
          {currentView === 'all_schemes' && <AllSchemesView />}
          {currentView === 'document_checker' && <DocumentCheckerView />}
          {currentView === 'tracker' && <ApplicationTrackerView />}
          {currentView === 'family_mode' && <FamilyModeView />}
          {currentView === 'nearby_help' && <NearbyHelpView />}
          {currentView === 'print_slip' && <PrintSlipView />}
        </main>

        <AppFooter />

        <MobileGlassDock />

        <SettingsModal />
        <OnboardingModal />
        <ToastContainer />
      </div>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
