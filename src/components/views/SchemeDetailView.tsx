import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  BookmarkPlus, 
  Printer, 
  PhoneCall, 
  AlertTriangle, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Check, 
  FileCheck2, 
  Sparkles,
  Volume2,
  VolumeX,
  FileQuestion
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../../data/schemesData';

export const SchemeDetailView: React.FC = () => {
  const { 
    selectedScheme, 
    setCurrentView, 
    setSelectedSchemeId, 
    addApplication, 
    applications, 
    settings,
    readAloud,
    stopReading,
    isSpeaking,
    t 
  } = useApp();

  if (!selectedScheme) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <p className="text-sm text-[var(--text-secondary)]">Scheme not found.</p>
        <button
          onClick={() => setCurrentView('all_schemes')}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-saffron)] text-white"
        >
          Back to Schemes Directory
        </button>
      </div>
    );
  }

  const s = selectedScheme;
  const isSaved = applications.some((a) => a.schemeId === s.id);

  const handleSave = () => {
    if (isSaved) return;
    addApplication({
      schemeId: s.id,
      schemeName: s.name,
      schemeNameHindi: s.nameHindi,
      beneficiaryName: 'Self',
      referenceNumber: `YS-${Math.floor(100000 + Math.random() * 900000)}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'to_apply',
      portalUrl: s.officialPortalUrl,
      notes: `Saved from details page. Processing time: ~${s.processingTimeDays} days.`,
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          title: 'Saved to Tracker',
          description: 'Ready to prepare documentation'
        }
      ]
    });
  };

  const handleListenSummary = () => {
    if (isSpeaking) {
      stopReading();
    } else {
      const textToRead = settings.language === 'hi'
        ? `${s.nameHindi}। मुख्य लाभ: ${s.benefitHeadlineHindi}। ${settings.simpleLanguageMode ? s.simpleLanguageSummaryHindi : s.summaryHindi}`
        : `${s.name}. Primary benefit: ${s.benefitHeadline}. ${settings.simpleLanguageMode ? s.simpleLanguageSummary : s.summary}`;
      readAloud(textToRead);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      
      {/* Top Back & Category */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('results')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{settings.language === 'hi' ? 'परिणामों पर वापस' : 'Back to Results'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleListenSummary}
              className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)] flex items-center gap-1.5"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? t('speechStop') : t('speechPlay')}</span>
            </button>

            <button
              onClick={() => setCurrentView('print_slip')}
              className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)] flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">{t('printSummarySlip')}</span>
            </button>
          </div>
        </div>

        {/* Scheme Hero Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {settings.language === 'hi' ? s.categoryLabelHindi : s.categoryLabel} · {s.shortCode}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] leading-tight">
            {settings.language === 'hi' ? s.nameHindi : s.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            {settings.language === 'hi' ? s.ministryHindi : s.ministry}
          </p>
        </div>
      </div>

      {/* Benefit Banner */}
      <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-emerald-200 dark:border-emerald-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {settings.language === 'hi' ? 'गारंटीकृत सरकारी लाभ' : 'Core Entitlement / Benefit'}
          </span>
          <p className="text-lg sm:text-xl font-serif font-bold text-emerald-900 dark:text-emerald-200">
            {settings.language === 'hi' ? s.benefitHeadlineHindi : s.benefitHeadline}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
              isSaved
                ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-default'
                : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)]'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <BookmarkPlus className="w-4 h-4" />}
            <span>{isSaved ? (settings.language === 'hi' ? 'ट्रैकर में सहेजा गया' : 'Saved to Tracker') : t('saveToTracker')}</span>
          </button>

          <a
            href={s.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>{settings.language === 'hi' ? 'आधिकारिक पोर्टल पर जाएं' : 'View Official Portal'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Simple Language Explanation / Full Description */}
      <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>{settings.language === 'hi' ? 'योजना का सरल विवरण' : 'Scheme Overview in Plain Language'}</span>
        </div>
        <p className="text-sm leading-relaxed text-[var(--text-primary)] font-medium">
          {settings.simpleLanguageMode
            ? settings.language === 'hi' ? s.simpleLanguageSummaryHindi : s.simpleLanguageSummary
            : settings.language === 'hi' ? s.summaryHindi : s.summary}
        </p>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border-hairline)]">
          {settings.language === 'hi' ? s.fullDescriptionHindi : s.fullDescription}
        </p>
      </div>

      {/* Eligibility Criteria */}
      <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4">
        <h3 className="text-base font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>{t('eligibilityCriteria')}</span>
        </h3>
        <div className="p-4 rounded-xl bg-[var(--bg-subtle)] text-xs text-[var(--text-primary)] leading-relaxed">
          {settings.language === 'hi' ? s.eligibilityDescriptionHindi : s.eligibilityDescription}
        </div>
      </div>

      {/* Required Documents */}
      <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-blue-600" />
            <span>{t('requiredDocs')}</span>
          </h3>
          <button
            onClick={() => setCurrentView('document_checker')}
            className="text-xs font-semibold text-[var(--accent-saffron)] hover:underline"
          >
            {settings.language === 'hi' ? 'दस्तावेज़ चेकर में देखें' : 'Open Document Checker'} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {s.requiredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-xs text-[var(--text-primary)]">
                  {settings.language === 'hi' ? doc.nameHindi : doc.name}
                </span>
                {doc.isMandatory && (
                  <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-900">
                    Mandatory
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                {settings.language === 'hi' ? doc.purposeHindi : doc.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step How to Apply */}
      <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-5">
        <h3 className="text-base font-serif font-bold text-[var(--text-primary)]">
          {t('applicationSteps')}
        </h3>

        <div className="space-y-4">
          {s.applicationSteps.map((step) => (
            <div key={step.stepNumber} className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {step.stepNumber}
              </span>
              <div className="space-y-1">
                <h4 className="font-semibold text-xs sm:text-sm text-[var(--text-primary)]">
                  {settings.language === 'hi' ? step.titleHindi : step.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {settings.language === 'hi' ? step.descriptionHindi : step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Rejection Reasons & Safety Warnings */}
      <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-4">
        <h3 className="text-base font-serif font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>{t('rejectionReasons')}</span>
        </h3>

        <div className="space-y-3">
          {s.commonRejectionReasons.map((rej, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-1.5 shadow-2xs">
              <p className="font-bold text-slate-900 dark:text-slate-100">
                {settings.language === 'hi' ? rej.titleHindi : rej.title}
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                  {settings.language === 'hi' ? 'समाधान: ' : 'Remedy: '}
                </span>
                {settings.language === 'hi' ? rej.tipHindi : rej.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Contact & Verification Strip */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase text-[var(--text-muted)]">
            {t('issuingAuthority')}
          </span>
          <p className="font-medium text-[var(--text-primary)]">
            {settings.language === 'hi' ? s.verificationAgencyHindi : s.verificationAgency}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase text-[var(--text-muted)]">
            {t('processingTime')}
          </span>
          <p className="font-medium text-[var(--text-primary)] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>~{s.processingTimeDays} {settings.language === 'hi' ? 'कार्यदिवस' : 'working days'}</span>
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase text-[var(--text-muted)]">
            {t('helpline')}
          </span>
          <p className="font-medium text-[var(--text-primary)] flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
            <a href={`tel:${s.helplinePhone.split('/')[0].trim()}`} className="hover:underline font-mono">
              {s.helplinePhone}
            </a>
          </p>
        </div>
      </div>

    </div>
  );
};
