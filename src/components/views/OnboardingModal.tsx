import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  FileCheck2, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Check, 
  X 
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, startNewAssessment, settings } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOnboardingOpen) return null;

  const slides = [
    {
      icon: <Compass className="w-8 h-8 text-[var(--accent-saffron)]" />,
      title: settings.language === 'hi' ? 'अपनी पात्रता पहचानें' : 'Discover Your Entitlements',
      subtitle: settings.language === 'hi' 
        ? 'कुछ सीधे सवालों के जवाब देकर जानें कि केंद्र और राज्य की कौन-सी योजनाएं आपके व आपके परिवार के लिए हैं।'
        : 'Answer a few simple questions to instantly find central and state welfare programs tailored to your family and livelihood.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-600" />,
      title: settings.language === 'hi' ? 'सरल भाषा में समझें' : 'Understand Benefits in Plain Words',
      subtitle: settings.language === 'hi'
        ? 'कठिन सरकारी कानूनी भाषा से मुक्ति। योजना का वास्तविक लाभ, किस्तें और नियम सीधी बोलचाल में समझें।'
        : 'No bureaucratic jargon. Get plain-language explanations of exact cash transfers, subsidies, and rules.'
    },
    {
      icon: <FileCheck2 className="w-8 h-8 text-emerald-600" />,
      title: settings.language === 'hi' ? 'कागजात पहले से तैयार करें' : 'Prepare Documents with Confidence',
      subtitle: settings.language === 'hi'
        ? 'पता करें कि आवेदन में कौन से प्रमाण पत्र लगेंगे, वे कहां से बनेंगे और आवेदन निरस्त होने से कैसे बचें।'
        : 'Learn exactly which documents are mandatory, their issuing offices, expected fees, and common rejection pitfalls.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: settings.language === 'hi' ? 'पूर्णतः निजी व सुरक्षित' : 'Private by Design, Always Free',
      subtitle: settings.language === 'hi'
        ? 'न आधार नंबर, न मोबाइल नंबर, न कोई ओटीपी। आपकी सभी जानकारियां केवल आपके फोन पर ही रहती हैं।'
        : 'No Aadhaar number, no phone number, no login required. Your information never leaves your personal device.'
    }
  ];

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
        className="w-full max-w-md glass-modal rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[420px]"
        role="dialog"
        aria-modal="true"
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
            {settings.language === 'hi' ? 'छोड़ें (Skip)' : 'Skip'}
          </button>
        </div>

        {/* Center Content */}
        <div className="py-8 text-center space-y-4 flex flex-col items-center">
          <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] inline-flex items-center justify-center mb-2">
            {activeSlide.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
            {activeSlide.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
            {activeSlide.subtitle}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-3">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {settings.language === 'hi' ? 'पीछे' : 'Back'}
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>
              {currentStep === slides.length - 1
                ? settings.language === 'hi' ? 'शुरू करें' : 'Get Started'
                : settings.language === 'hi' ? 'अगला' : 'Continue'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
