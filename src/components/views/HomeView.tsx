import React, { useMemo, useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FileText,
  Compass,
  Users,
  Building2,
  AlertTriangle,
  BadgeCheck,
  HeartPulse,
  Landmark,
  ChevronRight,
  WifiOff,
  LucideIcon
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../../data/schemesData';
import { evaluateAllSchemes } from '../../services/eligibilityEngine';
import { QuestionnaireAnswers } from '../../types/questionnaire';

type PersonaKey = 'farmer' | 'student' | 'woman' | 'senior' | 'artisan';

interface Persona {
  name: string;
  role: { en: string; hi: string };
  place: { en: string; hi: string };
  answers: QuestionnaireAnswers;
}

// Sample citizens. Their results below are computed live by the real engine — nothing is hardcoded.
const PERSONAS: Record<PersonaKey, Persona> = {
  farmer: {
    name: 'Rameshwar Sharma',
    role: { en: 'Small farmer, 42', hi: 'लघु किसान, 42 वर्ष' },
    place: { en: 'Uttar Pradesh · Rural', hi: 'उत्तर प्रदेश · ग्रामीण' },
    answers: {
      age: 42, gender: 'male', state: 'Uttar Pradesh', residenceArea: 'rural', socialCategory: 'OBC',
      occupation: 'farmer', annualIncomeBracket: '1lakh_to_2.5lakh', landholding: 'small_1_to_2ha', hasRationCard: 'bpl',
      specialAttributes: ['has_unshaded_rooftop']
    }
  },
  student: {
    name: 'Anjali Kumari',
    role: { en: 'College student, 19', hi: 'कॉलेज छात्रा, 19 वर्ष' },
    place: { en: 'Bihar · Rural', hi: 'बिहार · ग्रामीण' },
    answers: {
      age: 19, gender: 'female', state: 'Bihar', residenceArea: 'rural', socialCategory: 'OBC',
      occupation: 'student', annualIncomeBracket: '1lakh_to_2.5lakh', landholding: 'none', hasRationCard: 'bpl'
    }
  },
  woman: {
    name: 'Sunita Devi',
    role: { en: 'Runs a small shop, 36', hi: 'छोटी दुकान चलाती हैं, 36 वर्ष' },
    place: { en: 'Rajasthan · Rural', hi: 'राजस्थान · ग्रामीण' },
    answers: {
      age: 36, gender: 'female', state: 'Rajasthan', residenceArea: 'rural', socialCategory: 'General',
      occupation: 'small_business_owner', annualIncomeBracket: 'below_1lakh', landholding: 'none', hasRationCard: 'bpl',
      specialAttributes: ['girl_child_under_10']
    }
  },
  senior: {
    name: 'Shivcharan Lal',
    role: { en: 'Retired, 72', hi: 'सेवानिवृत्त, 72 वर्ष' },
    place: { en: 'Madhya Pradesh · Rural', hi: 'मध्य प्रदेश · ग्रामीण' },
    answers: {
      age: 72, gender: 'male', state: 'Madhya Pradesh', residenceArea: 'rural', socialCategory: 'SC',
      occupation: 'retired', annualIncomeBracket: 'below_1lakh', landholding: 'none', hasRationCard: 'bpl',
      specialAttributes: ['senior_citizen']
    }
  },
  artisan: {
    name: 'Mohan Lal Vishwakarma',
    role: { en: 'Carpenter, 29', hi: 'बढ़ई, 29 वर्ष' },
    place: { en: 'Gujarat · Rural', hi: 'गुजरात · ग्रामीण' },
    answers: {
      age: 29, gender: 'male', state: 'Gujarat', residenceArea: 'rural', socialCategory: 'OBC',
      occupation: 'artisan_craftsperson', annualIncomeBracket: '1lakh_to_2.5lakh', landholding: 'none', hasRationCard: 'bpl'
    }
  }
};

const PERSONA_TABS: { key: PersonaKey; en: string; hi: string }[] = [
  { key: 'farmer', en: 'Farmer', hi: 'किसान' },
  { key: 'student', en: 'Student', hi: 'छात्रा' },
  { key: 'woman', en: 'Woman', hi: 'महिला' },
  { key: 'senior', en: 'Senior', hi: 'बुजुर्ग' },
  { key: 'artisan', en: 'Artisan', hi: 'शिल्पी' }
];

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[13px] font-semibold text-[var(--accent-saffron)]">{children}</span>
);

export const HomeView: React.FC = () => {
  const { setCurrentView, setSelectedSchemeId, settings, setAnswers, openFindSchemes, addToast, t } = useApp();
  const hi = settings.language === 'hi';

  const [activePersona, setActivePersona] = useState<PersonaKey>('farmer');
  const persona = PERSONAS[activePersona];
  const personaResults = useMemo(() => evaluateAllSchemes(persona.answers), [persona]);
  const personaTop = [...personaResults.strongMatches, ...personaResults.possibleMatches].slice(0, 3);
  const personaEligibleCount = personaResults.strongMatches.length + personaResults.possibleMatches.length;

  const handleLoadPersonaReport = () => {
    setAnswers(persona.answers, true);
    addToast(hi ? 'नमूना प्रोफ़ाइल लोड की गई' : 'Sample profile loaded — this is demo data', 'info');
    setCurrentView('results');
  };

  const handleSchemeClick = (id: string) => {
    setSelectedSchemeId(id);
    setCurrentView('scheme_detail');
  };

  const tools: { view: AppView; icon: LucideIcon; tint: string; title: string; desc: string; cta: string }[] = [
    { view: 'questionnaire', icon: Compass, tint: 'from-orange-400 to-rose-500', title: t('tool1Title'), desc: t('tool1Desc'), cta: hi ? 'प्रश्नावली शुरू करें' : 'Start questionnaire' },
    { view: 'document_checker', icon: FileText, tint: 'from-emerald-400 to-teal-500', title: t('tool2Title'), desc: t('tool2Desc'), cta: hi ? 'दस्तावेज़ जांचें' : 'Check documents' },
    { view: 'tracker', icon: CheckCircle2, tint: 'from-sky-400 to-blue-600', title: t('tool3Title'), desc: t('tool3Desc'), cta: hi ? 'ट्रैकर देखें' : 'Open tracker' },
    { view: 'family_mode', icon: Users, tint: 'from-violet-400 to-purple-600', title: t('tool4Title'), desc: t('tool4Desc'), cta: hi ? 'परिवार योजना' : 'Plan for family' },
    { view: 'nearby_help', icon: Building2, tint: 'from-amber-400 to-orange-600', title: t('tool5Title'), desc: t('tool5Desc'), cta: hi ? 'सहायता केंद्र' : 'Find help centres' },
    { view: 'all_schemes', icon: Sparkles, tint: 'from-pink-400 to-fuchsia-600', title: t('tool6Title'), desc: t('tool6Desc'), cta: hi ? 'सभी योजनाएं' : 'Browse schemes' }
  ];

  const openTool = (view: AppView) => (view === 'questionnaire' ? openFindSchemes() : setCurrentView(view));

  const trustSignals = [
    { icon: BadgeCheck, label: t('trust100Free') },
    { icon: ShieldCheck, label: t('trustPrivate') },
    { icon: CheckCircle2, label: t('trustNoAadhaar') },
    { icon: WifiOff, label: t('trustOffline') }
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 glass-toolbar rounded-full pl-2 pr-4 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
              <span className="px-2 py-0.5 rounded-full bg-[var(--accent-green-light)] text-[var(--accent-green-text)]">
                {hi ? 'निःशुल्क' : 'Free'}
              </span>
              <span>{t('heroEyebrow')}</span>
            </div>

            <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] text-balance">
              {hi ? (
                <>
                  हर नागरिक का अधिकार,{' '}
                  <span className="text-gradient-saffron">बिना बिचौलियों के।</span>
                </>
              ) : (
                <>
                  Find the schemes{' '}
                  <span className="text-gradient-saffron">your family deserves.</span>
                </>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">{t('heroSubtitle')}</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => openFindSchemes()}
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold text-base"
              >
                <span>{t('heroCtaPrimary')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentView('all_schemes')}
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full glass-toolbar text-[var(--text-primary)] font-semibold text-base hover:bg-[var(--bg-surface)] transition-colors"
              >
                {t('heroCtaSecondary')}
              </button>
            </div>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-[var(--text-secondary)] font-medium pt-1">
              {trustSignals.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-[var(--accent-green)] shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live engine preview */}
          <div className="lg:col-span-5 relative">
            <div className="bobbin-satellite-chip absolute -top-5 -right-1 sm:-right-5 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl z-20 text-xs font-semibold text-[var(--text-primary)]">
              <span className="w-7 h-7 rounded-[9px] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white">
                <Landmark className="w-3.5 h-3.5" />
              </span>
              <span>{hi ? 'सीधे बैंक खाते में (DBT)' : 'Direct to bank (DBT)'}</span>
            </div>
            <div className="bobbin-satellite-chip absolute -bottom-5 -left-1 sm:-left-5 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl z-20 text-xs font-semibold text-[var(--text-primary)]">
              <span className="w-7 h-7 rounded-[9px] bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white">
                <HeartPulse className="w-3.5 h-3.5" />
              </span>
              <span>{hi ? '₹5 लाख स्वास्थ्य कवर' : '₹5 Lakh health cover'}</span>
            </div>

            <div className="bobbin-hero-panel rounded-[2rem] p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent-green-text)] bg-[var(--accent-green-light)] px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  {hi ? 'लाइव इंजन · आपके फोन पर' : 'Live engine · on your device'}
                </span>
              </div>

              <div className="segmented w-full grid grid-cols-5 text-[12px] font-medium" role="tablist" aria-label={hi ? 'नमूना नागरिक' : 'Sample citizen'}>
                {PERSONA_TABS.map((p) => (
                  <button
                    key={p.key}
                    role="tab"
                    aria-selected={activePersona === p.key}
                    onClick={() => setActivePersona(p.key)}
                    className={`py-2 px-1 truncate ${activePersona === p.key ? 'font-semibold' : 'text-[var(--text-secondary)]'}`}
                  >
                    {hi ? p.hi : p.en}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-300 to-rose-400 text-white font-bold flex items-center justify-center shrink-0">
                    {persona.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[15px] text-[var(--text-primary)] truncate">{persona.name}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">
                      {hi ? persona.role.hi : persona.role.en} · {hi ? persona.place.hi : persona.place.en}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold tabular-nums text-[var(--text-primary)] leading-none">{personaEligibleCount}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">{hi ? 'संभावित योजनाएं' : 'likely schemes'}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {personaTop.map((m) => (
                  <li key={m.scheme.id} className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-start gap-3">
                    <span
                      className={`mt-1 w-2 h-2 rounded-full shrink-0 ${m.status === 'strong_match' ? 'bg-[var(--accent-green)]' : 'bg-amber-500'}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                        {hi ? m.scheme.nameHindi : m.scheme.shortCode + ' · ' + m.scheme.categoryLabel}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                        {hi ? m.scheme.benefitHeadlineHindi : m.scheme.benefitHeadline}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] shrink-0 mt-0.5">
                      {m.status === 'strong_match' ? (hi ? 'पात्र' : 'Match') : hi ? 'जांचें' : 'Verify'}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleLoadPersonaReport}
                className="w-full h-12 rounded-full bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                <span>{hi ? 'इस प्रोफ़ाइल का पूरा परिणाम देखें' : 'See full results for this profile'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <Eyebrow>{hi ? 'सरल प्रक्रिया' : 'How it works'}</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)]">{t('howItWorksTitle')}</h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">{t('howItWorksSubtitle')}</p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: '1', title: t('step1Title'), desc: t('step1Desc') },
            { num: '2', title: t('step2Title'), desc: t('step2Desc') },
            { num: '3', title: t('step3Title'), desc: t('step3Desc') },
            { num: '4', title: t('step4Title'), desc: t('step4Desc') }
          ].map((step) => (
            <li key={step.num} className="glass-card p-6 rounded-3xl space-y-3">
              <span className="w-10 h-10 rounded-full bg-[var(--accent-saffron-light)] text-[var(--accent-saffron)] font-bold flex items-center justify-center tabular-nums">
                {step.num}
              </span>
              <h3 className="text-[17px] font-semibold text-[var(--text-primary)]">{step.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <Eyebrow>{hi ? 'नागरिक टूल्स' : 'Citizen tools'}</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)]">{t('featuredToolsTitle')}</h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">{t('featuredToolsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(({ view, icon: Icon, tint, title, desc, cta }) => (
            <button
              key={view}
              onClick={() => openTool(view)}
              className="bobbin-surface-card group p-6 rounded-3xl text-left flex flex-col justify-between gap-6"
            >
              <div className="space-y-3">
                <span className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${tint} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-saffron)]">
                {cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. SCHEME CATALOGUE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <Eyebrow>{hi ? 'राष्ट्रीय योजनाएं' : 'National schemes'}</Eyebrow>
            <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)]">{t('popularSchemesTitle')}</h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">{t('popularSchemesSubtitle')}</p>
          </div>
          <button
            onClick={() => setCurrentView('all_schemes')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-saffron)] hover:underline shrink-0"
          >
            {hi ? `सभी ${SCHEMES_DATABASE.length} योजनाएं देखें` : `View all ${SCHEMES_DATABASE.length} schemes`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCHEMES_DATABASE.slice(0, 6).map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => handleSchemeClick(scheme.id)}
              className="bobbin-surface-card group p-6 rounded-3xl text-left flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--accent-saffron)]">
                    {hi ? scheme.categoryLabelHindi : scheme.categoryLabel}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">{scheme.shortCode}</span>
                </div>
                <h3 className="font-semibold text-[17px] text-[var(--text-primary)] leading-snug">
                  {hi ? scheme.nameHindi : scheme.name}
                </h3>
                <p className="px-3 py-2 rounded-xl bg-[var(--accent-green-light)] text-[13px] font-medium text-[var(--accent-green-text)]">
                  {hi ? scheme.benefitHeadlineHindi : scheme.benefitHeadline}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-saffron)]">
                {t('viewSchemeDetails')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. PRIVACY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bobbin-hero-panel p-8 sm:p-12 rounded-[2rem] space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-green)]">
              <ShieldCheck className="w-4 h-4" />
              {hi ? 'नागरिक गोपनीयता' : 'Privacy'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)]">{t('privacySectionTitle')}</h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">{t('privacySectionSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              [t('privacyPillar1Title'), t('privacyPillar1Desc')],
              [t('privacyPillar2Title'), t('privacyPillar2Desc')],
              [t('privacyPillar3Title'), t('privacyPillar3Desc')]
            ].map(([title, desc]) => (
              <div key={title} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] space-y-2">
                <h3 className="font-semibold text-[15px] text-[var(--text-primary)]">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ANTI-SCAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[2rem] border border-[var(--warning-border)] bg-[var(--warning-bg)] backdrop-blur-xl space-y-6">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6" />
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-bold text-[var(--warning-text)] leading-tight">{t('antiScamTitle')}</h2>
              <p className="text-base text-[var(--warning-desc)] leading-relaxed max-w-3xl">{t('antiScamSubtitle')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[t('antiScamPoint1'), t('antiScamPoint2'), t('antiScamPoint3')].map((point) => (
              <p key={point} className="p-4 sm:p-5 rounded-2xl bg-[var(--warning-card-bg)] border border-[var(--warning-card-border)] text-sm text-[var(--warning-desc)] leading-relaxed">
                {point}
              </p>
            ))}
          </div>
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-sm border-t border-[var(--warning-border)]">
            <span className="font-semibold text-[var(--warning-text)]">{t('cybercrimeHelpline')}</span>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--warning-link)] hover:underline">
              cybercrime.gov.in →
            </a>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bobbin-hero-panel p-10 sm:p-16 rounded-[2rem] text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)] text-balance">{t('finalCtaTitle')}</h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">{t('finalCtaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openFindSchemes()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold"
            >
              {t('heroCtaPrimary')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('all_schemes')}
              className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold transition-colors"
            >
              {t('heroCtaSecondary')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
