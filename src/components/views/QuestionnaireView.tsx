import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Info, 
  Check, 
  HelpCircle,
  Sparkles,
  Wheat,
  Hammer,
  Store,
  GraduationCap,
  Briefcase,
  User,
  HeartHandshake,
  Sun,
  Home,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { INDIAN_STATES_DISTRICTS } from '../../data/statesAndDistricts';
import { QuestionnaireAnswers } from '../../types/questionnaire';

export const QuestionnaireView: React.FC = () => {
  const { 
    answers, 
    setAnswers, 
    setCurrentView, 
    settings, 
    readAloud, 
    stopReading, 
    isSpeaking,
    isDemoData,
    setIsDemoData,
    startNewAssessment,
    continuePreviousAssessment,
    showResumePrompt,
    setShowResumePrompt,
    hasSavedAnswers,
    questionnaireStepIndex: currentStepIndex,
    setQuestionnaireStepIndex: setCurrentStepIndex,
    t, L } = useApp();

  const [validationError, setValidationError] = useState<string | null>(null);

  const totalSteps = 10;

  const validateCurrentStep = (): boolean => {
    switch (currentStepIndex) {
      case 0:
        if (!answers.age || isNaN(answers.age) || answers.age < 1 || answers.age > 115) {
          setValidationError(
            t('pleaseEnterAValidAge')
          );
          return false;
        }
        break;
      case 1:
        if (!answers.gender) {
          setValidationError(
            t('pleaseSelectAGenderOption')
          );
          return false;
        }
        break;
      case 2:
        if (!answers.state || answers.state.trim() === '') {
          setValidationError(
            t('pleaseSelectYourStateOr')
          );
          return false;
        }
        break;
      case 3:
        if (!answers.residenceArea) {
          setValidationError(
            t('pleaseSelectWhetherYouReside')
          );
          return false;
        }
        break;
      case 4:
        if (!answers.occupation) {
          setValidationError(
            t('pleaseSelectYourPrimaryOccupation')
          );
          return false;
        }
        break;
      case 5:
        if (!answers.annualIncomeBracket) {
          setValidationError(
            t('pleaseSelectYourAnnualHousehold')
          );
          return false;
        }
        break;
      case 6:
        if (!answers.landholding) {
          setValidationError(
            t('pleaseSelectYourAgriculturalLandholding')
          );
          return false;
        }
        break;
      case 7:
        if (!answers.socialCategory) {
          setValidationError(
            t('pleaseSelectYourSocialCategory')
          );
          return false;
        }
        break;
      case 8:
        if (!answers.hasRationCard) {
          setValidationError(
            t('pleaseSelectYourRationCard')
          );
          return false;
        }
        break;
      default:
        break;
    }
    setValidationError(null);
    return true;
  };

  const handleNext = () => {
    stopReading();
    if (!validateCurrentStep()) {
      return;
    }
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCurrentView('results');
    }
  };

  const handleResetToBlank = () => {
    startNewAssessment();
    setValidationError(null);
  };

  const handleBack = () => {
    stopReading();
    setValidationError(null);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      setCurrentView('home');
    }
  };

  // Helper for voice
  const handleReadCurrent = (text: string) => {
    if (isSpeaking) {
      stopReading();
    } else {
      readAloud(text);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      
      {/* Resume Incomplete Assessment Choice Modal */}
      {showResumePrompt && hasSavedAnswers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-scrim no-print animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md glass-modal rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 border border-[var(--glass-modal-border)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-assessment-heading"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 id="resume-assessment-heading" className="text-lg font-serif font-bold text-[var(--text-primary)]">
                  {t('savedAssessmentFound')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {t('youHaveAnAssessmentWith')}
                </p>
              </div>
            </div>

            {/* Summary of saved fields */}
            <div className="p-3.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs space-y-1.5 text-[var(--text-secondary)]">
              <div className="font-semibold text-[var(--text-primary)] flex items-center justify-between">
                <span>{t('recordedData')}</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">
                  {Object.values(answers).filter(v => v !== undefined && v !== '' && (!Array.isArray(v) || v.length > 0)).length} {t('fields')}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {answers.age && (
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[11px]">
                    {t('ageLabel')}: {answers.age}
                  </span>
                )}
                {answers.gender && (
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[11px] capitalize">
                    {answers.gender}
                  </span>
                )}
                {answers.state && (
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[11px]">
                    {answers.state}
                  </span>
                )}
                {answers.occupation && (
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[11px] capitalize">
                    {answers.occupation.replace(/_/g, ' ')}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {t('wouldYouLikeToStart')}
            </p>

            {/* Actions: Start New Assessment is the clear primary action */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  startNewAssessment();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>{t('startNewAssessment')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  continuePreviousAssessment();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-semibold text-xs transition-all shadow-2xs active:scale-[0.98]"
              >
                {t('continuePreviousAssessment')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header & Progress */}
      <div className="p-5 sm:p-6 rounded-3xl glass-card space-y-4 shadow-sm border border-[var(--glass-panel-border)]">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </button>

          <div className="flex items-center gap-2">
            {Object.keys(answers).length > 0 && (
              <button
                type="button"
                onClick={handleResetToBlank}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl border border-rose-300/70 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100/70 transition-all font-medium"
                title={t('clearAllAnswersAndStart')}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('startBlankReset')}</span>
              </button>
            )}

            <span className="text-xs font-mono font-semibold text-[var(--accent-saffron)] px-3 py-1 rounded-full bg-[var(--accent-saffron-light)]/60 border border-[var(--accent-saffron)]/30 tracking-wider">
              {t('questionOf', { p0: String(currentStepIndex + 1).padStart(2, '0'), p1: String(totalSteps).padStart(2, '0') })}
            </span>
          </div>
        </div>

        {/* Hairline Progress Bar */}
        <div
          className="w-full h-2 bg-[var(--bg-subtle)] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={currentStepIndex + 1}
        >
          <div
            className="h-full bg-gradient-to-r from-orange-400 via-rose-500 to-violet-500 transition-all duration-500 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* QUESTION 1: AGE */}
      {currentStepIndex === 0 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {t('ageCriteria')}
              </span>
              <button
                onClick={() => handleReadCurrent(t('whatIsYourCurrentAge'))}
                className="p-1.5 rounded-lg border border-[var(--border-hairline)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-700" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{t('speechPlay')}</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('whatIsYourCurrentAge2')}
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('centralSchemesHaveSpecificAge')}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-[var(--glass-panel-border)] space-y-6 shadow-sm">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-2">
                {t('enterAgeYears')}
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="115"
                value={answers.age ?? ''}
                onChange={(e) => {
                  setValidationError(null);
                  const n = parseInt(e.target.value, 10);
                  setAnswers({ ...answers, age: Number.isFinite(n) && n > 0 ? Math.min(n, 115) : undefined });
                }}
                placeholder="e.g. 38"
                className="w-full text-2xl font-semibold px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] focus:border-[var(--accent-saffron)] focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--text-muted)]">
                {t('quickSelect')}
              </span>
              <div className="flex flex-wrap gap-2">
                {[19, 28, 42, 62, 71].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setValidationError(null);
                      setAnswers({ ...answers, age: val });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      answers.age === val
                        ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-bold text-[var(--accent-saffron-text)] shadow-xs'
                        : 'border-[var(--border-hairline)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {val} {t('yrs')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION 2: GENDER */}
      {currentStepIndex === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('genderProfile')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('whatIsYourGender')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('specialPriorityWelfareProgramsLike')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'female', label: t('female'), desc: t('gdFemale') },
              { id: 'male', label: t('male'), desc: t('gdMale') },
              { id: 'transgender', label: t('transgender'), desc: t('gdTransgender') }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setAnswers({ ...answers, gender: item.id as any });
                }}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  answers.gender === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs font-semibold'
                    : 'bobbin-surface-card'
                }`}
              >
                <div>
                  <h3 className="font-semibold text-sm text-[var(--text-primary)]">{item.label}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
                </div>
                {answers.gender === item.id && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-saffron)] mt-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 3: STATE */}
      {currentStepIndex === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('geographicLocation')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('whichStateOrUnionTerritory')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('identifiesStateSpecificWelfareTop')}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-[var(--glass-panel-border)] space-y-4 shadow-sm">
            <label className="block text-xs font-semibold text-[var(--text-primary)]">
              {t('selectState')}
            </label>
            <select
              value={answers.state || ''}
              onChange={(e) => {
                setValidationError(null);
                setAnswers({ ...answers, state: e.target.value });
              }}
              className="w-full text-base px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-saffron)] focus:outline-none transition-colors"
            >
              <option value="" disabled>
                {t('selectYourStateUt')}
              </option>
              {INDIAN_STATES_DISTRICTS.map((s) => (
                <option key={s.state} value={s.state}>
                  {L.state(s.state, s.stateHindi)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* QUESTION 4: RESIDENCE AREA (RURAL / URBAN) */}
      {currentStepIndex === 3 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('areaOfResidence')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('doYouLiveInA')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('schemesLikeMgnregaAndPmay')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'rural', label: t('ruralVillagePanchayat'), desc: t('adRural') },
              { id: 'urban', label: t('urbanCityMunicipality'), desc: t('adUrban') }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setAnswers({ ...answers, residenceArea: item.id as any });
                }}
                className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  answers.residenceArea === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs font-semibold'
                    : 'bobbin-surface-card'
                }`}
              >
                <div>
                  <h3 className="font-semibold text-base text-[var(--text-primary)]">{item.label}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">{item.desc}</p>
                </div>
                {answers.residenceArea === item.id && (
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-saffron)] mt-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 5: OCCUPATION */}
      {currentStepIndex === 4 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('primaryOccupation')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('whatIsYourPrimaryLivelihood')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('matchesOccupationTargetedProgramsLike')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {[
              { id: 'farmer', label: t('farmerCultivator'), icon: Wheat },
              { id: 'agricultural_labour', label: t('agriculturalLabourer'), icon: HeartHandshake },
              { id: 'artisan_craftsperson', label: t('traditionalArtisanCraftsman'), icon: Hammer },
              { id: 'street_vendor', label: t('streetVendorHawkers'), icon: Store },
              { id: 'daily_wage_worker', label: t('dailyWageWorker'), icon: User },
              { id: 'small_business_owner', label: t('smallBusinessShopOwner'), icon: Briefcase },
              { id: 'student', label: t('studentHigherStudies'), icon: GraduationCap },
              { id: 'homemaker', label: t('homemaker'), icon: Home },
              { id: 'salaried_private', label: t('salariedPrivateJob'), icon: Briefcase },
              { id: 'government_employee', label: t('governmentEmployee'), icon: Briefcase },
              { id: 'unemployed', label: t('unemployedJobseeker'), icon: User },
              { id: 'retired', label: t('retiredSenior'), icon: Sun }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setAnswers({ ...answers, occupation: item.id as any });
                }}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.occupation === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs font-semibold'
                    : 'bobbin-surface-card hover:border-amber-300/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-[var(--accent-saffron)] shrink-0" />
                  <span className="text-xs sm:text-sm text-[var(--text-primary)]">{item.label}</span>
                </div>
                {answers.occupation === item.id && (
                  <Check className="w-4 h-4 text-[var(--accent-saffron)] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 6: ANNUAL INCOME BRACKET */}
      {currentStepIndex === 5 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('householdAnnualIncome')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('whatIsYourTotalAnnual')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('mostSocialSchemesEnforceMaximum')}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'below_1lakh', label: t('lessThan100000') },
              { id: '1lakh_to_2.5lakh', label: t('n100000To2') },
              { id: '2.5lakh_to_5lakh', label: t('n250000To5') },
              { id: '5lakh_to_8lakh', label: t('n500000To8') },
              { id: 'above_8lakh', label: t('above800000Year') }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setAnswers({ ...answers, annualIncomeBracket: item.id as any });
                }}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.annualIncomeBracket === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold shadow-xs'
                    : 'bobbin-surface-card hover:border-amber-300/40'
                }`}
              >
                <span className="text-xs sm:text-sm text-[var(--text-primary)]">{item.label}</span>
                {answers.annualIncomeBracket === item.id && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-saffron)] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 7: LANDHOLDING */}
      {currentStepIndex === 6 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('agriculturalLandholding')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('howMuchCultivableAgriculturalLand')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('directlyDeterminesEligibilityForPm')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'none', label: t('noAgriculturalLandLandless'), desc: t('ldNone') },
              { id: 'marginal_less_than_1ha', label: t('marginalFarmer1Hectare2'), desc: t('ldMarginal') },
              { id: 'small_1_to_2ha', label: t('smallFarmer1To2'), desc: t('ldSmall') },
              { id: 'medium_large_above_2ha', label: t('mediumLargeFarmer2Hectares'), desc: t('ldLarge') }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setAnswers({ ...answers, landholding: item.id as any });
                }}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  answers.landholding === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs'
                    : 'bobbin-surface-card hover:border-amber-300/40'
                }`}
              >
                <div>
                  <h3 className="font-semibold text-sm text-[var(--text-primary)]">{item.label}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
                {answers.landholding === item.id && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-saffron)] mt-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 8: SOCIAL CATEGORY */}
      {currentStepIndex === 7 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('socialCategory')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('whichSocialCategoryDoYou')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('identifiesDedicatedAffirmativeWelfareSchemes')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'General', label: t('catGeneral') },
              { id: 'OBC', label: t('catObc') },
              { id: 'SC', label: t('catSc') },
              { id: 'ST', label: t('catSt') },
              { id: 'EWS', label: t('catEws') }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setAnswers({ ...answers, socialCategory: item.id as any });
                }}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.socialCategory === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold shadow-xs'
                    : 'bobbin-surface-card hover:border-amber-300/40'
                }`}
              >
                <span className="text-xs sm:text-sm text-[var(--text-primary)]">{item.label}</span>
                {answers.socialCategory === item.id && (
                  <Check className="w-4 h-4 text-[var(--accent-saffron)] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 9: RATION CARD */}
      {currentStepIndex === 8 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('rationCardCategory')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('whatTypeOfRationCard')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('bplAndAntyodayaAayCards')}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'aay_antyodaya', label: t('antyodayaAnnaYojanaAayHeavily') },
              { id: 'bpl', label: t('belowPovertyLineBplPriority') },
              { id: 'apl', label: t('abovePovertyLineAplNon') },
              { id: 'none', label: t('noRationCard') }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setValidationError(null);
                  setAnswers({ ...answers, hasRationCard: item.id as any });
                }}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.hasRationCard === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold shadow-xs'
                    : 'bobbin-surface-card hover:border-amber-300/40'
                }`}
              >
                <span className="text-xs sm:text-sm text-[var(--text-primary)]">{item.label}</span>
                {answers.hasRationCard === item.id && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-saffron)] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 10: SPECIAL HOUSEHOLD ATTRIBUTES */}
      {currentStepIndex === 9 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {t('specialHouseholdConditions')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {t('doAnyOfTheseSpecial')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {t('selectAllThatApplyThese')}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'girl_child_under_10', label: t('daughterAgedUnder10Years') },
              { id: 'pregnant_lactating', label: t('pregnantOrLactatingMotherPmmvy') },
              { id: 'disability', label: t('personWithBenchmarkDisabilityDisability') },
              { id: 'widow', label: t('widowedWomanInHouseholdWidow') },
              { id: 'senior_citizen', label: t('seniorCitizenAged60Old') },
              { id: 'has_unshaded_rooftop', label: t('unshadedRooftopAccessPmSurya') }
            ].map((item) => {
              const currentList = answers.specialAttributes || [];
              const isChecked = currentList.includes(item.id);

              const handleToggle = () => {
                const next = isChecked
                  ? currentList.filter((x) => x !== item.id)
                  : [...currentList, item.id];
                setAnswers({ ...answers, specialAttributes: next });
              };

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleToggle}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isChecked
                      ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold shadow-xs'
                      : 'bobbin-surface-card hover:border-amber-300/40'
                  }`}
                >
                  <span className="text-xs sm:text-sm text-[var(--text-primary)]">{item.label}</span>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-[var(--accent-saffron)] border-[var(--accent-saffron)] text-white' : 'border-[var(--border-hairline)]'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Accessible Validation Error Banner */}
      {validationError && (
        <div 
          role="alert"
          className="p-3.5 rounded-xl border border-[var(--warning-border)] bg-[var(--warning-bg)] text-xs font-semibold text-[var(--warning-text)] flex items-center gap-2.5 animate-shake shadow-2xs"
        >
          <Info className="w-4 h-4 text-[var(--accent-saffron)] shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Sticky Bottom Navigation Toolbar with Apple Glassmorphism */}
      <div className="glass-toolbar p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-md sticky bottom-22 md:bottom-6 z-20 flex items-center justify-between gap-4">
        <button
          onClick={handleBack}
          className="h-11 px-5 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-secondary)] transition-colors"
        >
          {t('back')}
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-sm font-semibold"
        >
          <span>{currentStepIndex === totalSteps - 1 ? t('viewResults') : t('continue')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
