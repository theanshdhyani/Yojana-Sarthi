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
  const { currentView } = useApp();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <AppHeader />

      <div className="flex-1 pb-24 md:pb-0">
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
      </div>

      <AppFooter />

      {/* Floating Apple-Style Mobile Glass Navigation Dock */}
      <MobileGlassDock />

      {/* Global Modals & Notifications */}
      <SettingsModal />
      <OnboardingModal />
      <ToastContainer />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
