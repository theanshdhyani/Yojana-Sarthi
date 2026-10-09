import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  Wheat,
  HeartPulse,
  GraduationCap,
  Store,
  Shield,
  Hammer,
  Landmark,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../../data/schemesData';
import civicHeroBg from '../../assets/images/civic_hero_bg_1791566634546.jpg';

export const HomeView: React.FC = () => {
  const { setCurrentView, setSelectedSchemeId, settings, setAnswers, setIsDemoData, startNewAssessment, addToast, t } = useApp();

  // Interactive Hero Profile Preview switcher
  const [activePersona, setActivePersona] = useState<'farmer' | 'student' | 'woman' | 'senior' | 'artisan'>('farmer');

  const personas = {
    farmer: {
      name: 'Rameshwar Sharma',
      role: settings.language === 'hi' ? 'सीमांत किसान, 42 वर्ष' : 'Marginal Farmer, 42 yrs',
      state: 'Uttar Pradesh (Rural)',
      income: '₹1.8 Lakh/yr',
      matches: 3,
      totalBenefitValue: '₹84,000/yr',
      topScheme: 'PM-KISAN (₹6,000/yr) + PM Surya Ghar (₹78k subsidy)',
      category: 'agriculture',
      schemes: [
        { name: 'PM-KISAN Samman Nidhi', benefit: '₹6,000 / year direct cash', tag: 'Direct Benefit Transfer' },
        { name: 'PM Surya Ghar: Muft Bijli', benefit: 'Up to ₹78,000 rooftop solar subsidy', tag: 'Clean Energy' }
      ]
    },
    student: {
      name: 'Anjali Kumari',
      role: settings.language === 'hi' ? 'कॉलेज छात्रा, 19 वर्ष' : 'College Student, 19 yrs',
      state: 'Bihar (Rural/Urban)',
      income: '₹1.5 Lakh/yr (OBC)',
      matches: 2,
      totalBenefitValue: '100% Fees + ₹12,000/yr',
      topScheme: 'Post-Matric Scholarship (100% Fee Reimbursement)',
      category: 'education',
      schemes: [
        { name: 'Post-Matric Scholarship', benefit: '100% Tuition fee + monthly maintenance', tag: 'Higher Education' },
        { name: 'Skill India Digital Mission', benefit: 'Free industry-certified training + stipend', tag: 'Skill Training' }
      ]
    },
    woman: {
      name: 'Sunita Devi',
      role: settings.language === 'hi' ? 'स्व-रोजगार महिला, 36 वर्ष' : 'Small Entrepreneur, 36 yrs',
      state: 'Rajasthan (Rural)',
      income: '₹1.2 Lakh/yr',
      matches: 4,
      totalBenefitValue: '₹50,000 Loan + Free LPG',
      topScheme: 'PM Mudra Shishu (₹50k collateral-free loan) + Ujjwala 2.0',
      category: 'women_children',
      schemes: [
        { name: 'PM Mudra Yojana (Shishu)', benefit: '₹50,000 collateral-free enterprise loan', tag: 'Micro Credit' },
        { name: 'PM Ujjwala Yojana 2.0', benefit: 'Free LPG connection + subsidized cylinder', tag: 'Household Welfare' }
      ]
    },
    senior: {
      name: 'Shivcharan Lal',
      role: settings.language === 'hi' ? 'वरिष्ठ नागरिक, 68 वर्ष' : 'Senior Citizen, 68 yrs',
      state: 'Madhya Pradesh (Rural)',
      income: '₹60,000/yr (BPL)',
      matches: 3,
      totalBenefitValue: '₹5 Lakh Health Cover',
      topScheme: 'Ayushman Bharat (₹5 Lakh cover) + Old Age Pension',
      category: 'social_security',
      schemes: [
        { name: 'Ayushman Bharat (PM-JAY)', benefit: '₹5 Lakh / year cashless family treatment', tag: 'Hospitalization' },
        { name: 'Indira Gandhi National Pension', benefit: 'Monthly old-age pension to bank account', tag: 'Social Pension' }
      ]
    },
    artisan: {
      name: 'Mohan Lal Vishwakarma',
      role: settings.language === 'hi' ? 'पारंपरिक काष्ठशिल्पी, 29 वर्ष' : 'Traditional Carpenter, 29 yrs',
      state: 'Gujarat (Rural)',
      income: '₹1.6 Lakh/yr',
      matches: 3,
      totalBenefitValue: '₹15,000 Kit + ₹3 Lakh Loan',
      topScheme: 'PM Vishwakarma Toolkit Grant (₹15,000) + 5% Collateral-Free Loan',
      category: 'employment',
      schemes: [
        { name: 'PM Vishwakarma Yojana', benefit: '₹15,000 modern toolkit grant + 5% credit', tag: 'Artisan Welfare' },
        { name: 'Atal Pension Yojana', benefit: 'Guaranteed government pension up to ₹5,000/mo', tag: 'Retirement' }
      ]
    }
  };

  // Only switches the visual preview tab - NEVER silently overwrites user answers
  const handlePersonaSelect = (key: 'farmer' | 'student' | 'woman' | 'senior' | 'artisan') => {
    setActivePersona(key);
  };

  const handleLoadPersonaReport = () => {
    let pAnswers: any = {};
    if (activePersona === 'farmer') {
      pAnswers = {
        age: 42,
        gender: 'male',
        state: 'Uttar Pradesh',
        residenceArea: 'rural',
        socialCategory: 'OBC',
        occupation: 'farmer',
        annualIncomeBracket: '1lakh_to_2.5lakh',
        landholding: 'small_1_to_2ha',
        hasRationCard: 'bpl'
      };
    } else if (activePersona === 'student') {
      pAnswers = {
        age: 19,
        gender: 'female',
        state: 'Bihar',
        residenceArea: 'rural',
        socialCategory: 'OBC',
        occupation: 'student',
        annualIncomeBracket: '1lakh_to_2.5lakh'
      };
    } else if (activePersona === 'woman') {
      pAnswers = {
        age: 36,
        gender: 'female',
        state: 'Rajasthan',
        residenceArea: 'rural',
        socialCategory: 'General',
        occupation: 'small_business_owner',
        annualIncomeBracket: '1lakh_to_2.5lakh',
        hasRationCard: 'bpl'
      };
    } else if (activePersona === 'senior') {
      pAnswers = {
        age: 68,
        gender: 'male',
        state: 'Madhya Pradesh',
        residenceArea: 'rural',
        socialCategory: 'SC',
        occupation: 'retired',
        annualIncomeBracket: 'below_1lakh',
        hasRationCard: 'bpl',
        specialAttributes: ['senior_citizen']
      };
    } else if (activePersona === 'artisan') {
      pAnswers = {
        age: 29,
        gender: 'male',
        state: 'Gujarat',
        residenceArea: 'rural',
        socialCategory: 'OBC',
        occupation: 'artisan_craftsperson',
        annualIncomeBracket: '1lakh_to_2.5lakh',
        hasRationCard: 'bpl',
        specialAttributes: ['traditional_artisan']
      };
    }
    setAnswers(pAnswers, true);
    setIsDemoData(true);
    addToast(settings.language === 'hi' ? 'नमूना प्रोफ़ाइल लोड की गई' : 'Sample demo profile loaded for inspection', 'info');
    setCurrentView('results');
  };

  const handleSchemeClick = (id: string) => {
    setSelectedSchemeId(id);
    setCurrentView('scheme_detail');
  };

  const currentPersonaData = personas[activePersona];

  return (
    <div className="space-y-20 md:space-y-28">
      
      {/* 1. CINEMATIC BOBBIN-INSPIRED HERO SECTION */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-6 sm:-mt-8 overflow-hidden">
        
        {/* Full-bleed Art-Directed Photographic Civic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={civicHeroBg} 
            alt="Vibrant Indian civic community at sunrise" 
            className="w-full h-full object-cover object-center scale-105 transform origin-top filter brightness-[0.92] contrast-[1.05]"
          />
          
          {/* Multi-layered cinematic dark gradient overlay protecting text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/88 via-slate-950/78 to-[var(--bg-canvas)]" />
          
          {/* Atmospheric light glows */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, transparent 70%)' }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Proposition, Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              
              {/* Eyebrow Badge with Frost Effect */}
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide uppercase text-amber-200 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{t('heroEyebrow')}</span>
                <span className="text-white/40">·</span>
                <span className="text-emerald-300 font-medium">Official Welfare</span>
              </div>

              {/* Cinematic Bold Headline with Gradient Accent */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12] text-balance drop-shadow-md">
                {settings.language === 'hi' ? (
                  <>
                    हर नागरिक का अधिकार,
                    <span className="block mt-2 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                      बिना बिचौलियों के। सीधे खाते में।
                    </span>
                  </>
                ) : (
                  <>
                    Discover Government Schemes You Qualify For.
                    <span className="block mt-2 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                      Directly. Transparently. Without Middlemen.
                    </span>
                  </>
                )}
              </h1>

              {/* Subtitle with High Legibility */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-xs">
                {t('heroSubtitle')}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => startNewAssessment()}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]"
                >
                  <span>{t('heroCtaPrimary')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('all_schemes')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98]"
                >
                  <span>{t('heroCtaSecondary')}</span>
                </button>
              </div>

              {/* Unboxed Quiet Trust Signals with High Contrast */}
              <div className="pt-5 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-200 font-medium">
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('trust100Free')}</span>
                </div>
                <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('trustPrivate')}</span>
                </div>
                <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('trustNoAadhaar')}</span>
                </div>
                <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('trustOffline')}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Large Floating Translucent Product Interface Panel */}
            <div className="lg:col-span-5 relative">
              
              {/* Satellite Floating Glass Badge 1: Top Right */}
              <div className="bobbin-satellite-chip absolute -top-4 -right-2 sm:-top-5 sm:-right-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl z-20 text-xs font-semibold text-[var(--text-primary)]">
                <div className="w-6 h-6 rounded-lg bg-[var(--accent-green-light)] flex items-center justify-center text-[var(--accent-green)]">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
                <span>DBT Direct to Bank</span>
              </div>

              {/* Satellite Floating Glass Badge 2: Bottom Left */}
              <div className="bobbin-satellite-chip absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl z-20 text-xs font-semibold text-[var(--text-primary)]">
                <div className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-700 dark:text-rose-400">
                  <HeartPulse className="w-3.5 h-3.5" />
                </div>
                <span>₹5 Lakh Free Health Cover</span>
              </div>

              {/* Main Translucent Product Panel */}
              <div className="bobbin-hero-panel rounded-3xl p-5 sm:p-7 space-y-5 relative shadow-2xl">
                
                {/* Window Chrome Header Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-hairline)]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[var(--text-muted)] ml-2">
                      matcher-engine.local
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--accent-green-light)] text-[var(--accent-green-text)] border border-[var(--accent-green)]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    <span>On-Device Engine</span>
                  </span>
                </div>

                {/* Profile Selector Segmented Control Tabs */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {settings.language === 'hi' ? 'नागरिक प्रोफ़ाइल चुनें:' : 'Select Citizen Persona:'}
                  </div>
                  <div className="grid grid-cols-5 gap-1 p-1 bg-[var(--bg-subtle)] rounded-xl text-[11px] font-medium">
                    {(['farmer', 'student', 'woman', 'senior', 'artisan'] as const).map((key) => (
                      <button
                        key={key}
                        onClick={() => handlePersonaSelect(key)}
                        className={`py-1.5 px-1 rounded-lg transition-colors text-center truncate ${
                          activePersona === key
                            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold shadow-xs'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                        title={key}
                      >
                        {key === 'farmer' ? (settings.language === 'hi' ? 'किसान' : 'Farmer')
                          : key === 'student' ? (settings.language === 'hi' ? 'छात्रा' : 'Student')
                          : key === 'woman' ? (settings.language === 'hi' ? 'महिला' : 'Woman')
                          : key === 'senior' ? (settings.language === 'hi' ? 'बुजुर्ग' : 'Senior')
                          : (settings.language === 'hi' ? 'शिल्पी' : 'Artisan')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Profile Summary Card */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2.5 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-1.5">
                        <span>{currentPersonaData.name}</span>
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {currentPersonaData.role} · {currentPersonaData.state}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-[var(--accent-green-text)] bg-[var(--accent-green-light)] px-2.5 py-1 rounded-md border border-[var(--accent-green)]/30 shrink-0">
                      {currentPersonaData.matches} {settings.language === 'hi' ? 'योजनाएं पात्र' : 'Eligible'}
                    </span>
                  </div>

                  <div className="text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between font-medium">
                    <span>{settings.language === 'hi' ? 'आय:' : 'Income:'} {currentPersonaData.income}</span>
                    <span className="text-[var(--accent-saffron-text)] font-semibold">Value: {currentPersonaData.totalBenefitValue}</span>
                  </div>
                </div>

                {/* Live Matched Schemes Micro-Cards */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-between">
                    <span>{settings.language === 'hi' ? 'सुझाई गई योजनाएं:' : 'Instant Matched Entitlements:'}</span>
                    <span className="text-[10px] text-[var(--accent-green)] font-semibold">100% Direct DBT</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {currentPersonaData.schemes.map((sch, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <p className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-saffron)] shrink-0" />
                            <span>{sch.name}</span>
                          </p>
                          <p className="text-[11px] text-[var(--text-secondary)]">
                            {sch.benefit}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-surface)] px-2 py-0.5 rounded border border-[var(--border-hairline)] shrink-0 ml-2">
                          {sch.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspect Action CTA */}
                <div className="pt-1">
                  <button
                    onClick={handleLoadPersonaReport}
                    className="w-full py-3 px-4 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-[0.99]"
                  >
                    <span>{settings.language === 'hi' ? 'इस प्रोफ़ाइल के सभी परिणाम देखें' : 'View Full Report for this Profile'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS — ELEVATED BOBBIN GLASS CARDS */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-saffron)]">
              {settings.language === 'hi' ? 'सरल पारदर्शी प्रक्रिया' : 'Step-by-Step Citizen Journey'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: t('step1Title'), desc: t('step1Desc') },
              { num: '02', title: t('step2Title'), desc: t('step2Desc') },
              { num: '03', title: t('step3Title'), desc: t('step3Desc') },
              { num: '04', title: t('step4Title'), desc: t('step4Desc') }
            ].map((step) => (
              <div 
                key={step.num}
                className="bobbin-surface-card p-6 rounded-2xl space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif font-bold text-[var(--accent-saffron)] tabular-nums">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mt-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FEATURED TOOLS — TRANSLUCENT TILES */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-saffron)]">
                {settings.language === 'hi' ? 'नागरिक टूल्स' : 'Citizen Utilities'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
                {t('featuredToolsTitle')}
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                {t('featuredToolsSubtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tool 1 */}
            <div 
              onClick={() => setCurrentView('questionnaire')}
              className="bobbin-surface-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--accent-saffron-light)] text-[var(--accent-saffron)] w-fit">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
                  {t('tool1Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('tool1Desc')}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-semibold text-[var(--accent-saffron)]">
                <span>Start Questionnaire</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 2 */}
            <div 
              onClick={() => setCurrentView('document_checker')}
              className="bobbin-surface-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--accent-green-light)] text-[var(--accent-green)] w-fit">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
                  {t('tool2Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('tool2Desc')}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-semibold text-[var(--accent-saffron)]">
                <span>Check My Documents</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 3 */}
            <div 
              onClick={() => setCurrentView('tracker')}
              className="bobbin-surface-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--accent-navy-light)] text-[var(--accent-navy)] w-fit">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
                  {t('tool3Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('tool3Desc')}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-semibold text-[var(--accent-saffron)]">
                <span>View Tracker</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 4 */}
            <div 
              onClick={() => setCurrentView('family_mode')}
              className="bobbin-surface-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 w-fit">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
                  {t('tool4Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('tool4Desc')}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-semibold text-[var(--accent-saffron)]">
                <span>Plan Household Benefits</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 5 */}
            <div 
              onClick={() => setCurrentView('nearby_help')}
              className="bobbin-surface-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 w-fit">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
                  {t('tool5Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('tool5Desc')}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-semibold text-[var(--accent-saffron)]">
                <span>Locate Help Centers</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 6 */}
            <div 
              onClick={() => setCurrentView('all_schemes')}
              className="bobbin-surface-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 w-fit">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
                  {t('tool6Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('tool6Desc')}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-semibold text-[var(--accent-saffron)]">
                <span>Explore Directory</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SCHEME CATALOGUE PREVIEW */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-saffron)]">
                {settings.language === 'hi' ? 'राष्ट्रीय कल्याणकारी योजनाएं' : 'National Directory'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                {t('popularSchemesTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {t('popularSchemesSubtitle')}
              </p>
            </div>

            <button
              onClick={() => setCurrentView('all_schemes')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-saffron)] hover:underline"
            >
              <span>{settings.language === 'hi' ? 'सभी 18 योजनाएं देखें' : 'View all 18 schemes'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scheme Cards Catalogue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCHEMES_DATABASE.slice(0, 6).map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => handleSchemeClick(scheme.id)}
                className="bobbin-surface-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--accent-saffron)]">
                      {settings.language === 'hi' ? scheme.categoryLabelHindi : scheme.categoryLabel}
                    </span>
                    <span className="tabular-nums font-mono text-[11px] text-[var(--text-muted)] font-semibold">
                      {scheme.shortCode}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors leading-snug">
                    {settings.language === 'hi' ? scheme.nameHindi : scheme.name}
                  </h3>

                  <div className="p-2.5 rounded-lg bg-[var(--accent-green-light)] text-xs font-semibold text-[var(--accent-green-text)] border border-[var(--accent-green)]/20">
                    {settings.language === 'hi' ? scheme.benefitHeadlineHindi : scheme.benefitHeadline}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {settings.simpleLanguageMode
                      ? settings.language === 'hi' ? scheme.simpleLanguageSummaryHindi : scheme.simpleLanguageSummary
                      : settings.language === 'hi' ? scheme.summaryHindi : scheme.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">
                    {scheme.processingTimeDays} {settings.language === 'hi' ? 'दिन में प्रक्रिया' : 'days processing'}
                  </span>
                  <span className="font-semibold text-[var(--accent-saffron)] group-hover:underline">
                    {t('viewSchemeDetails')} →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TRUST & CITIZEN PRIVACY VAULT */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bobbin-hero-panel p-8 sm:p-12 rounded-3xl space-y-8 shadow-md">
            
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-green)] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{settings.language === 'hi' ? 'नागरिक संप्रभुता' : 'Citizen Privacy'}</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
                {t('privacySectionTitle')}
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                {t('privacySectionSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2.5 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
                <h3 className="font-bold text-sm text-[var(--text-primary)]">
                  {t('privacyPillar1Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('privacyPillar1Desc')}
                </p>
              </div>

              <div className="space-y-2.5 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
                <h3 className="font-bold text-sm text-[var(--text-primary)]">
                  {t('privacyPillar2Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('privacyPillar2Desc')}
                </p>
              </div>

              <div className="space-y-2.5 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
                <h3 className="font-bold text-sm text-[var(--text-primary)]">
                  {t('privacyPillar3Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('privacyPillar3Desc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ANTI-SCAM CITIZEN PROTECTION — STRICT CONTRAST PRESERVED */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[var(--warning-border)] bg-[var(--warning-bg)] space-y-6 shadow-sm">
            
            {/* Visual Hierarchy: WARNING ICON -> HEADING -> SUPPORTING COPY */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-2xs">
                <AlertTriangle className="w-6 h-6 shrink-0" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--warning-text)] tracking-tight leading-snug">
                  {t('antiScamTitle')}
                </h3>
                <p className="text-sm sm:text-base text-[var(--warning-desc)] leading-relaxed max-w-3xl">
                  {t('antiScamSubtitle')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--warning-card-bg)] border border-[var(--warning-card-border)] text-xs sm:text-sm text-[var(--warning-desc)] leading-relaxed shadow-2xs">
                {t('antiScamPoint1')}
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--warning-card-bg)] border border-[var(--warning-card-border)] text-xs sm:text-sm text-[var(--warning-desc)] leading-relaxed shadow-2xs">
                {t('antiScamPoint2')}
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--warning-card-bg)] border border-[var(--warning-card-border)] text-xs sm:text-sm text-[var(--warning-desc)] leading-relaxed shadow-2xs">
                {t('antiScamPoint3')}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm border-t border-[var(--warning-border)]/60">
              <span className="font-bold text-[var(--warning-text)]">
                {t('cybercrimeHelpline')}
              </span>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--warning-link)] hover:underline transition-opacity"
              >
                Visit cybercrime.gov.in →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION — LUMINOUS BILLBOARD */}
      <section className="border-t border-[var(--border-hairline)] pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bobbin-hero-panel p-8 sm:p-14 rounded-3xl text-center space-y-6 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] text-balance">
              {t('finalCtaTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              {t('finalCtaSubtitle')}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => startNewAssessment()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98]"
              >
                <span>{t('heroCtaPrimary')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentView('all_schemes')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-semibold text-sm transition-all shadow-2xs active:scale-[0.98]"
              >
                <span>{t('heroCtaSecondary')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
