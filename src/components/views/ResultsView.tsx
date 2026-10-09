import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Printer, 
  BookmarkPlus, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Filter,
  Check,
  RotateCcw,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { EvaluatedScheme, MatchStatus } from '../../types/scheme';

export const ResultsView: React.FC = () => {
  const { 
    evaluatedResults, 
    setCurrentView, 
    setSelectedSchemeId, 
    addApplication, 
    applications,
    loadSampleData,
    answers,
    settings, 
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | MatchStatus>('all');

  const { strongMatches, possibleMatches, reviewRequired } = evaluatedResults;
  const totalCount = strongMatches.length + possibleMatches.length + reviewRequired.length;
  const hasAnswers = answers.age !== undefined || answers.occupation !== undefined;

  const filteredSchemes: EvaluatedScheme[] = 
    activeTab === 'all'
      ? [...strongMatches, ...possibleMatches, ...reviewRequired]
      : activeTab === 'strong_match'
      ? strongMatches
      : activeTab === 'possible_match'
      ? possibleMatches
      : reviewRequired;

  const handleSchemeClick = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setCurrentView('scheme_detail');
  };

  const handleSaveToTracker = (scheme: EvaluatedScheme) => {
    const isAlreadySaved = applications.some((a) => a.schemeId === scheme.scheme.id);
    if (isAlreadySaved) return;

    addApplication({
      schemeId: scheme.scheme.id,
      schemeName: scheme.scheme.name,
      schemeNameHindi: scheme.scheme.nameHindi,
      beneficiaryName: 'Self',
      referenceNumber: `YS-${Math.floor(100000 + Math.random() * 900000)}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'to_apply',
      portalUrl: scheme.scheme.officialPortalUrl,
      notes: `Matched with score ${scheme.matchScore}%. Next step: organize required documents.`,
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          title: 'Scheme identified on Yojana Sarthi',
          description: 'Added to citizen preparation tracker'
        }
      ]
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-hairline)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-green-text)] bg-[var(--accent-green-light)] px-2.5 py-1 rounded-full border border-[var(--accent-green)]/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{settings.language === 'hi' ? 'पात्रता विश्लेषण पूर्ण' : 'Preliminary Evaluation Ready'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            {t('resultsTitle')}
          </h1>

          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            {settings.language === 'hi'
              ? `आपके दिए गए विवरण के आधार पर आप ${totalCount} सरकारी योजनाओं के प्रारंभिक पात्र हो सकते हैं।`
              : `Based on your profile, you preliminarily match ${totalCount} government welfare and financial programs.`}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setCurrentView('print_slip')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-[var(--accent-saffron)]" />
            <span>{t('printSummarySlip')}</span>
          </button>

          <button
            onClick={() => setCurrentView('questionnaire')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('retakeQuestions')}</span>
          </button>
        </div>
      </div>

      {/* Official Advisory Disclaimer Notice */}
      <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[var(--accent-saffron)] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[var(--text-primary)]">
            {settings.language === 'hi' ? 'महत्वपूर्ण सूचना: ' : 'Advisory Note: '}
          </strong>
          {settings.language === 'hi'
            ? 'यह प्रणाली केवल प्रारंभिक पात्रता मिलान प्रस्तुत करती है। अंतिम स्वीकृति संबंधित सरकारी विभाग या बैंक द्वारा भौतिक एवं दस्तावेज़ सत्यापन के पश्चात ही प्रदान की जाती है।'
            : 'These results represent a preliminary rule match based on your answers. Final approval requires verification of original documents and approval by the respective government authority or lending bank.'}
        </p>
      </div>

      {/* Empty State when no answers filled */}
      {!hasAnswers && (
        <div className="p-8 sm:p-12 text-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="p-3 rounded-full bg-[var(--accent-saffron-light)] text-[var(--accent-saffron)] w-fit mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
            {settings.language === 'hi' ? 'प्रश्नावली अभी भरी नहीं गई है' : 'No questionnaire answers submitted yet'}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {settings.language === 'hi'
              ? 'सटीक परिणाम देखने के लिए 2 मिनट की प्रश्नावली भरें या तुरंत परीक्षण हेतु नमूना प्रोफ़ाइल लोड करें।'
              : 'Answer a few simple questions to unlock tailored schemes, or load sample demo data to see how the engine works.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => setCurrentView('questionnaire')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--accent-saffron)] text-white text-xs font-semibold hover:bg-[var(--accent-saffron-hover)] transition-colors shadow-xs"
            >
              Start Questionnaire
            </button>
            <button
              onClick={loadSampleData}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-canvas)] transition-colors"
            >
              Load Sample Demo Data
            </button>
          </div>
        </div>
      )}

      {/* Overview Stat Cards / Filter Tabs with Apple Glassmorphism */}
      {hasAnswers && (
        <>
          <div className="glass-toolbar p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <button
                onClick={() => setActiveTab('all')}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                  activeTab === 'all'
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-bold text-[var(--text-primary)] shadow-2xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <span className="text-2xl font-serif font-bold tabular-nums text-[var(--text-primary)]">
                  {totalCount}
                </span>
                <span className="block text-xs text-[var(--text-secondary)] mt-1">
                  {settings.language === 'hi' ? 'कुल योजनाएं' : 'All Schemes'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('strong_match')}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                  activeTab === 'strong_match'
                    ? 'border-[var(--accent-green)] bg-[var(--accent-green-light)] font-bold text-[var(--accent-green-text)] shadow-2xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <span className="text-2xl font-serif font-bold tabular-nums text-[var(--accent-green)]">
                  {strongMatches.length}
                </span>
                <span className="block text-xs text-[var(--text-secondary)] mt-1">
                  {t('strongMatches')}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('possible_match')}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                  activeTab === 'possible_match'
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-bold text-[var(--accent-saffron-text)] shadow-2xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <span className="text-2xl font-serif font-bold tabular-nums text-[var(--accent-saffron)]">
                  {possibleMatches.length}
                </span>
                <span className="block text-xs text-[var(--text-secondary)] mt-1">
                  {t('possibleMatches')}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('review_required')}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                  activeTab === 'review_required'
                    ? 'border-[var(--accent-navy)] bg-[var(--accent-navy-light)] font-bold text-[var(--accent-navy-text)] shadow-2xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <span className="text-2xl font-serif font-bold tabular-nums text-[var(--accent-navy)]">
                  {reviewRequired.length}
                </span>
                <span className="block text-xs text-[var(--text-secondary)] mt-1">
                  {t('reviewRequired')}
                </span>
              </button>
            </div>
          </div>

          {/* Scheme Cards Recommendation List */}
          <div className="space-y-4">
            {filteredSchemes.map((item) => {
              const s = item.scheme;
              const isSaved = applications.some((a) => a.schemeId === s.id);

              return (
                <div
                  key={s.id}
                  className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all space-y-4 shadow-2xs"
                >
                  {/* Row 1: Header & Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-saffron)]">
                        {settings.language === 'hi' ? s.categoryLabelHindi : s.categoryLabel}
                      </span>
                      <h3 
                        onClick={() => handleSchemeClick(s.id)}
                        className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)] hover:text-[var(--accent-saffron)] cursor-pointer transition-colors"
                      >
                        {settings.language === 'hi' ? s.nameHindi : s.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                        item.status === 'strong_match'
                          ? 'bg-[var(--accent-green-light)] text-[var(--accent-green-text)] border-[var(--accent-green)]/30'
                          : item.status === 'possible_match'
                          ? 'bg-[var(--accent-saffron-light)] text-[var(--accent-saffron-text)] border-[var(--accent-saffron)]/30'
                          : 'bg-[var(--accent-navy-light)] text-[var(--accent-navy-text)] border-[var(--accent-navy)]/30'
                      }`}>
                        {item.status === 'strong_match' 
                          ? settings.language === 'hi' ? 'पूर्ण पात्रता' : 'Strong Match'
                          : item.status === 'possible_match'
                          ? settings.language === 'hi' ? 'संभावित पात्रता' : 'Possible Match'
                          : settings.language === 'hi' ? 'कागजात जरूरी' : 'Review Required'}
                      </span>
                      <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                        {item.matchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Headline Benefit */}
                  <div className="p-3 rounded-xl bg-[var(--accent-green-light)] text-xs sm:text-sm font-semibold text-[var(--accent-green-text)] border border-[var(--accent-green)]/20 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--accent-green)] shrink-0" />
                    <span>{settings.language === 'hi' ? s.benefitHeadlineHindi : s.benefitHeadline}</span>
                  </div>

                  {/* Row 3: Why It Matched & Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)] pt-1">
                    <div className="space-y-1.5 p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                      <span className="font-bold text-[var(--text-primary)] block">
                        {t('whyYouMatched')}:
                      </span>
                      <ul className="space-y-1 list-disc list-inside">
                        {(settings.language === 'hi' ? item.matchedReasonsHindi : item.matchedReasons).map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                      <span className="font-bold text-[var(--text-primary)] block">
                        {t('requiredDocs')}:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {s.requiredDocuments.map((doc) => (
                          <span
                            key={doc.id}
                            className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[11px] font-medium text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                          >
                            {settings.language === 'hi' ? doc.nameHindi : doc.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Actions */}
                  <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-[var(--text-muted)]">
                      {settings.language === 'hi' ? s.ministryHindi : s.ministry}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleSaveToTracker(item)}
                        disabled={isSaved}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          isSaved
                            ? 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border-hairline)] cursor-default'
                            : 'border-[var(--border-hairline)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]'
                        }`}
                      >
                        {isSaved ? <Check className="w-3.5 h-3.5 text-[var(--accent-green)]" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                        <span>{isSaved ? (settings.language === 'hi' ? 'सहेजा गया' : 'Saved') : t('saveToTracker')}</span>
                      </button>

                      <button
                        onClick={() => handleSchemeClick(s.id)}
                        className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold transition-colors shadow-xs"
                      >
                        <span>{t('viewSchemeDetails')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Missing or Incomplete Prompt */}
          <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-[var(--text-primary)]">
                {settings.language === 'hi' ? 'क्या आपके पास कुछ कागजात तैयार नहीं हैं?' : 'Need to verify your certificates and documents?'}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {settings.language === 'hi' 
                  ? 'दस्तावेज़ चेकर का उपयोग करें ताकि आवेदन के समय किसी दफ्तर के चक्कर न लगाने पड़ें।' 
                  : 'Use the Document Readiness Checker to organize missing papers before visiting the portal or CSC.'}
              </p>
            </div>

            <button
              onClick={() => setCurrentView('document_checker')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors shrink-0 shadow-2xs"
            >
              {settings.language === 'hi' ? 'दस्तावेज़ चेकर खोलें' : 'Open Document Checker'} →
            </button>
          </div>
        </>
      )}

    </div>
  );
};
