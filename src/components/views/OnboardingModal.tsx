import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, FileCheck2, ShieldCheck, Compass, ArrowRight, Languages } from 'lucide-react';
import { LanguageGrid } from '../common/LanguagePicker';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, startNewAssessment, t } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOnboardingOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOnboardingOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOnboardingOpen, setIsOnboardingOpen]);

  if (!isOnboardingOpen) return null;

  // Step 0 asks for a language first, so everything after it is already readable.
  const slides = [
    {
      icon: <Languages className="w-8 h-8 text-[var(--accent-saffron)]" />,
      title: t('chooseLanguage'),
      subtitle: t('chooseLanguageHint'),
      languagePicker: true
    },
    {
      icon: <Compass className="w-8 h-8 text-[var(--accent-saffron)]" />,
      title: t('discoverYourEntitlements'),
      subtitle: t('answerAFewSimpleQuestions')
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-600" />,
      title: t('understandBenefitsInPlainWords'),
      subtitle: t('noBureaucraticJargonGetPlain')
    },
    {
      icon: <FileCheck2 className="w-8 h-8 text-emerald-600" />,
      title: t('prepareDocumentsWithConfidence'),
      subtitle: t('learnExactlyWhichDocumentsAre')
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: t('privateByDesignAlwaysFree'),
      subtitle: t('noAadhaarNumberNoPhone')
    }
  ] as { icon: React.ReactNode; title: string; subtitle: string; languagePicker?: boolean }[];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOnboardingOpen(false);
      startNewAssessment();
    }
  };

  const handleSkip = () => {
    setIsOnboardingOpen(false);
  };

  const activeSlide = slides[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-scrim no-print">
      <div 
        className="w-full max-w-md max-h-[92vh] overflow-y-auto glass-modal rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between min-h-[420px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-heading"
      >
        {/* Top controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-6 bg-[var(--accent-saffron)]'
                    : 'w-2 bg-[var(--border-hairline)]'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            {t('skip')}
          </button>
        </div>

        {/* Center Content */}
        <div className="py-6 text-center space-y-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-[1.375rem] glass-card inline-flex items-center justify-center mb-2">
            {activeSlide.icon}
          </div>
          <h3 id="onboarding-heading" className="text-2xl sm:text-[1.75rem] font-bold text-[var(--text-primary)] tracking-tight">
            {activeSlide.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
            {activeSlide.subtitle}
          </p>
          {activeSlide.languagePicker && (
            <div className="w-full pt-2 text-left">
              <LanguageGrid />
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-3">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t('back')}
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-sm font-semibold"
          >
            <span>
              {currentStep === slides.length - 1
                ? t('getStarted')
                : t('continue')}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
