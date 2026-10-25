import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Printer,
  BookmarkPlus,
  Sparkles,
  ChevronRight,
  Check,
  RotateCcw,
  ShieldCheck,
  Compass,
  XCircle
} from 'lucide-react';
import { EvaluatedScheme, MatchStatus } from '../../types/scheme';

type Tab = 'eligible' | MatchStatus;

export const ResultsView: React.FC = () => {
  const {
    evaluatedResults,
    setCurrentView,
    setSelectedSchemeId,
    addApplication,
    applications,
    loadSampleData,
    openFindSchemes,
    answers,
    isDemoData,
    t,
    tm,
    L
  } = useApp();

  const [activeTab, setActiveTab] = useState<Tab>('eligible');

  const { strongMatches, possibleMatches, reviewRequired } = evaluatedResults;
  const eligibleCount = strongMatches.length + possibleMatches.length;
  const hasAnswers = answers.age !== undefined || answers.occupation !== undefined;

  const listFor: Record<Tab, EvaluatedScheme[]> = {
    eligible: [...strongMatches, ...possibleMatches],
    strong_match: strongMatches,
    possible_match: possibleMatches,
    review_required: reviewRequired
  };
  const filteredSchemes = listFor[activeTab];

  const handleSchemeClick = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setCurrentView('scheme_detail');
  };

  const handleSaveToTracker = (item: EvaluatedScheme) => {
    if (applications.some((a) => a.schemeId === item.scheme.id)) return;
    const today = new Date().toISOString().split('T')[0];
    addApplication({
      schemeId: item.scheme.id,
      schemeName: item.scheme.name,
      schemeNameHindi: item.scheme.nameHindi,
      beneficiaryName: t('self'),
      referenceNumber: '',
      appliedDate: today,
      status: 'to_apply',
      portalUrl: item.scheme.officialPortalUrl,
      notes: t('nextStepGetTheRequired'),
      timeline: [{ date: today, title: t('identifiedOnYojanaSarthi'), description: t('addedToPreparationTracker') }]
    });
  };

  const statusMeta: Record<MatchStatus, { label: string; chip: string; icon: React.ReactNode }> = {
    strong_match: {
      label: t('strongMatch'),
      chip: 'bg-[var(--accent-green-light)] text-[var(--accent-green-text)]',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />
    },
    possible_match: {
      label: t('verify2'),
      chip: 'bg-amber-500/15 text-amber-800 dark:text-amber-200',
      icon: <HelpCircle className="w-3.5 h-3.5" />
    },
    review_required: {
      label: t('likelyNotEligible'),
      chip: 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]',
      icon: <XCircle className="w-3.5 h-3.5" />
    }
  };

  const tabs: { id: Tab; count: number; label: string; accent: string }[] = [
    { id: 'eligible', count: eligibleCount, label: t('likelyForYou'), accent: 'text-[var(--text-primary)]' },
    { id: 'strong_match', count: strongMatches.length, label: t('strongMatches'), accent: 'text-[var(--accent-green)]' },
    { id: 'possible_match', count: possibleMatches.length, label: t('possibleMatches'), accent: 'text-amber-600 dark:text-amber-400' },
    { id: 'review_required', count: reviewRequired.length, label: t('reviewRequired'), accent: 'text-[var(--text-muted)]' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-green-text)] bg-[var(--accent-green-light)] px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('preliminaryCheckComplete')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)]">{t('resultsTitle')}</h1>
          <p className="text-base text-[var(--text-secondary)] max-w-xl">
            {t('basedOnYourAnswersOf', { eligibleCount, p1: eligibleCount + reviewRequired.length })}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentView('print_slip')}
            className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold rounded-full glass-toolbar text-[var(--text-primary)]"
          >
            <Printer className="w-4 h-4 text-[var(--accent-saffron)]" />
            {t('printSummarySlip')}
          </button>
          <button
            onClick={() => setCurrentView('questionnaire')}
            className="inline-flex items-center gap-1.5 h-10 px-4 text-[13px] font-semibold rounded-full glass-toolbar text-[var(--text-secondary)]"
          >
            <RotateCcw className="w-4 h-4" />
            {t('retakeQuestions')}
          </button>
        </div>
      </div>

      {isDemoData && (
        <div role="status" className="px-4 py-3 rounded-2xl bg-[var(--accent-navy-light)] text-[13px] text-[var(--accent-navy-text)] font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0" />
          {t('youAreViewingASample')}
          <button onClick={() => openFindSchemes()} className="ml-auto font-semibold underline shrink-0">
            {t('checkForMe')}
          </button>
        </div>
      )}

      <div className="px-4 py-3 rounded-2xl glass-card text-[13px] text-[var(--text-secondary)] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[var(--accent-saffron)] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[var(--text-primary)]">{t('important')}</strong>
          {t('thisIsAPreliminaryRule')}
        </p>
      </div>

      {!hasAnswers && (
        <div className="p-10 sm:p-14 text-center rounded-[2rem] glass-card space-y-4 max-w-lg mx-auto">
          <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Compass className="w-7 h-7" />
          </span>
          <h2 className="font-bold text-xl text-[var(--text-primary)]">
            {t('noAnswersYet')}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {t('answerAFewSimpleQuestions2')}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => openFindSchemes()}
              className="w-full sm:w-auto h-11 px-6 rounded-full bg-[var(--accent-saffron)] text-white text-sm font-semibold hover:bg-[var(--accent-saffron-hover)]"
            >
              {t('startQuestionnaire')}
            </button>
            <button
              onClick={loadSampleData}
              className="w-full sm:w-auto h-11 px-6 rounded-full bg-[var(--bg-subtle)] text-[var(--text-primary)] text-sm font-semibold hover:bg-[var(--bg-surface)] transition-colors"
            >
              {t('loadSampleProfile')}
            </button>
          </div>
        </div>
      )}

      {hasAnswers && (
        <>
          <div className="glass-toolbar p-1.5 rounded-[1.375rem] grid grid-cols-2 sm:grid-cols-4 gap-1.5" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3.5 rounded-2xl text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--glass-dock-active-bg)] shadow-[var(--glass-dock-active-shadow)]'
                    : 'hover:bg-[var(--bg-subtle)]'
                }`}
              >
                <span className={`block text-3xl font-bold tabular-nums ${tab.accent}`}>{tab.count}</span>
                <span className="block text-xs font-medium text-[var(--text-secondary)] mt-0.5">{tab.label}</span>
              </button>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <p className="p-10 text-center text-sm text-[var(--text-secondary)] glass-card rounded-3xl">
              {t('noSchemesInThisGroup')}
            </p>
          )}

          <div className="space-y-4">
            {filteredSchemes.map((item) => {
              const s = item.scheme;
              const isSaved = applications.some((a) => a.schemeId === s.id);
              const meta = statusMeta[item.status];
              const reasons = item.matched.map(tm);
              const toVerify = item.verify.map(tm);
              const unmet = item.unmet.map(tm);

              return (
                <article key={s.id} className="glass-card p-5 sm:p-7 rounded-[1.75rem] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <span className="text-xs font-semibold text-[var(--accent-saffron)]">
                        {L.category(s.category)}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
                        <button onClick={() => handleSchemeClick(s.id)} className="text-left hover:text-[var(--accent-saffron)] transition-colors">
                          {L.schemeName(s)}
                        </button>
                      </h2>
                      <p className="text-xs text-[var(--text-muted)]">{L.long(s.ministry, s.ministryHindi)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.chip}`}>
                        {meta.icon}
                        {meta.label}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[var(--text-muted)] tabular-nums" title={t('matchScore')}>
                        {item.matchScore}%
                      </span>
                    </div>
                  </div>

                  <p className="px-4 py-3 rounded-2xl bg-[var(--accent-green-light)] text-sm font-semibold text-[var(--accent-green-text)] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    {L.schemeBenefit(s)}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] text-[var(--text-secondary)]">
                    <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] space-y-2">
                      <p className="font-semibold text-[var(--text-primary)]">
                        {item.status === 'review_required' ? (t('whatYouAlreadyMeet')) : t('whyYouMatched')}
                      </p>
                      <ul className="space-y-1.5">
                        {reasons.map((r) => (
                          <li key={r} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[var(--accent-green)] shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {unmet.length > 0 || toVerify.length > 0 ? (
                      <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] space-y-2">
                        <p className="font-semibold text-[var(--text-primary)]">
                          {unmet.length > 0 ? (t('whyItMayNotApply')) : t('confirmAtTheOffice')}
                        </p>
                        <ul className="space-y-1.5">
                          {unmet.map((r) => (
                            <li key={r} className="flex items-start gap-2">
                              <XCircle className="w-3.5 h-3.5 text-[var(--accent-red)] shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                          {toVerify.map((r) => (
                            <li key={r} className="flex items-start gap-2">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] space-y-2">
                        <p className="font-semibold text-[var(--text-primary)]">{t('requiredDocs')}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.requiredDocuments.map((doc) => (
                            <span key={doc.id} className="px-2.5 py-1 rounded-full bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-secondary)]">
                              {L.docName(doc.id, doc.name, doc.nameHindi)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {item.status !== 'review_required' && (
                      <button
                        onClick={() => handleSaveToTracker(item)}
                        disabled={isSaved}
                        className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold transition-colors ${
                          isSaved ? 'bg-[var(--bg-subtle)] text-[var(--text-muted)] cursor-default' : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)]'
                        }`}
                      >
                        {isSaved ? <Check className="w-4 h-4 text-[var(--accent-green)]" /> : <BookmarkPlus className="w-4 h-4" />}
                        {isSaved ? (t('saved')) : t('saveToTracker')}
                      </button>
                    )}
                    <button
                      onClick={() => handleSchemeClick(s.id)}
                      className="inline-flex items-center gap-1 h-10 px-5 rounded-full bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-[13px] font-semibold"
                    >
                      {t('viewSchemeDetails')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="p-6 rounded-[1.75rem] glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[15px] text-[var(--text-primary)]">
                {t('areYourDocumentsReady')}
              </h2>
              <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                {t('useTheDocumentCheckerTo')}
              </p>
            </div>
            <button
              onClick={() => setCurrentView('document_checker')}
              className="h-10 px-5 text-[13px] font-semibold rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors shrink-0"
            >
              {t('openDocumentChecker')} →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
