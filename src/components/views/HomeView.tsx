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
  PhoneCall, 
  AlertTriangle,
  BadgeCheck,
  Wheat,
  HeartPulse,
  Home,
  Baby,
  GraduationCap,
  Store,
  Shield,
  SunMedium,
  Check,
  ChevronRight
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../../data/schemesData';
import { SchemeCategory } from '../../types/scheme';

export const HomeView: React.FC = () => {
  const { setCurrentView, setSelectedSchemeId, settings, setAnswers, t } = useApp();

  // Interactive Hero Profile Preview switcher
  const [activePersona, setActivePersona] = useState<'farmer' | 'student' | 'woman' | 'senior'>('farmer');

  const personas = {
    farmer: {
      name: 'Rameshwar',
      role: settings.language === 'hi' ? 'सीमांत किसान, 42 वर्ष' : 'Marginal Farmer, 42 yrs',
      state: 'Uttar Pradesh (Rural)',
      income: '₹1.8 Lakh/yr',
      matches: 3,
      topScheme: 'PM-KISAN (₹6,000/yr) + PM Surya Ghar (₹78k subsidy)',
      category: 'agriculture'
    },
    student: {
      name: 'Anjali Kumari',
      role: settings.language === 'hi' ? 'कॉलेज छात्रा, 19 वर्ष' : 'College Student, 19 yrs',
      state: 'Bihar (Urban/Rural)',
      income: '₹1.5 Lakh/yr (OBC)',
      matches: 2,
      topScheme: 'Post-Matric Scholarship (100% Fee Reimbursement)',
      category: 'education'
    },
    woman: {
      name: 'Sunita Devi',
      role: settings.language === 'hi' ? 'स्व-रोजगार महिला, 36 वर्ष' : 'Small Entrepreneur, 36 yrs',
      state: 'Rajasthan',
      income: '₹1.2 Lakh/yr',
      matches: 4,
      topScheme: 'PM Mudra Shishu (₹50k) + Ujjwala 2.0 (Free LPG)',
      category: 'women_children'
    },
    senior: {
      name: 'Shivcharan Lal',
      role: settings.language === 'hi' ? 'वरिष्ठ नागरिक, 68 वर्ष' : 'Senior Citizen, 68 yrs',
      state: 'Madhya Pradesh',
      income: '₹60,000/yr (BPL)',
      matches: 3,
      topScheme: 'Ayushman Bharat (₹5 Lakh cover) + Old Age Pension',
      category: 'social_security'
    }
  };

  const handlePersonaSelect = (key: 'farmer' | 'student' | 'woman' | 'senior') => {
    setActivePersona(key);
    if (key === 'farmer') {
      setAnswers({
        age: 42,
        gender: 'male',
        state: 'Uttar Pradesh',
        residenceArea: 'rural',
        socialCategory: 'OBC',
        occupation: 'farmer',
        annualIncomeBracket: '1lakh_to_2.5lakh',
        landholding: 'small_1_to_2ha',
        hasRationCard: 'bpl'
      });
    } else if (key === 'student') {
      setAnswers({
        age: 19,
        gender: 'female',
        state: 'Bihar',
        residenceArea: 'rural',
        socialCategory: 'OBC',
        occupation: 'student',
        annualIncomeBracket: '1lakh_to_2.5lakh'
      });
    } else if (key === 'woman') {
      setAnswers({
        age: 36,
        gender: 'female',
        state: 'Rajasthan',
        residenceArea: 'rural',
        socialCategory: 'General',
        occupation: 'small_business_owner',
        annualIncomeBracket: '1lakh_to_2.5lakh',
        hasRationCard: 'bpl'
      });
    } else if (key === 'senior') {
      setAnswers({
        age: 68,
        gender: 'male',
        state: 'Madhya Pradesh',
        residenceArea: 'rural',
        socialCategory: 'SC',
        occupation: 'retired',
        annualIncomeBracket: 'below_1lakh',
        hasRationCard: 'bpl',
        specialAttributes: ['senior_citizen']
      });
    }
  };

  const categories = [
    { id: 'agriculture', label: settings.language === 'hi' ? 'कृषि एवं किसान' : 'Agriculture & Farming', icon: Wheat, count: 2 },
    { id: 'health', label: settings.language === 'hi' ? 'स्वास्थ्य एवं चिकित्सा' : 'Health & Medical', icon: HeartPulse, count: 1 },
    { id: 'housing', label: settings.language === 'hi' ? 'आवास एवं मकान' : 'Housing & Shelter', icon: Home, count: 1 },
    { id: 'women_children', label: settings.language === 'hi' ? 'महिला एवं बाल कल्याण' : 'Women & Children', icon: Baby, count: 3 },
    { id: 'education', label: settings.language === 'hi' ? 'शिक्षा एवं छात्रवृत्ति' : 'Education & Learning', icon: GraduationCap, count: 1 },
    { id: 'livelihood_business', label: settings.language === 'hi' ? 'रोजगार एवं व्यवसाय' : 'Livelihood & MSME', icon: Store, count: 4 },
    { id: 'social_security', label: settings.language === 'hi' ? 'सामाजिक सुरक्षा एवं पेंशन' : 'Social Security', icon: Shield, count: 3 },
    { id: 'clean_energy', label: settings.language === 'hi' ? 'सोलर एवं स्वच्छ ऊर्जा' : 'Clean Energy', icon: SunMedium, count: 1 }
  ];

  const handleSchemeClick = (id: string) => {
    setSelectedSchemeId(id);
    setCurrentView('scheme_detail');
  };

  const currentPersonaData = personas[activePersona];

  return (
    <div className="space-y-24 md:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Proposition & CTA */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span>{t('heroEyebrow')}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.15] text-balance">
                {t('heroTitle')}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
                {t('heroSubtitle')}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setCurrentView('questionnaire')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <span>{t('heroCtaPrimary')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('all_schemes')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-semibold text-sm transition-colors"
                >
                  <span>{t('heroCtaSecondary')}</span>
                </button>
              </div>

              {/* Quiet Trust Signals */}
              <div className="pt-4 border-t border-[var(--border-hairline)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[var(--text-secondary)] font-medium">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('trust100Free')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('trustPrivate')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('trustNoAadhaar')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('trustOffline')}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Editorial Product Artifact (Profile → Eligibility → Schemes) */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-2xl shadow-sm p-6 space-y-5 relative">
                
                {/* Visual Label */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {settings.language === 'hi' ? 'लाइव पात्रता पूर्वावलोकन' : 'Live Matching Preview'}
                    </span>
                    <p className="text-xs font-medium text-[var(--text-primary)]">
                      {settings.language === 'hi' ? 'चुनें नागरिक प्रोफ़ाइल:' : 'Select a sample citizen profile:'}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Active Matcher
                  </span>
                </div>

                {/* Profile Selector Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-[var(--bg-subtle)] rounded-lg text-xs font-medium">
                  {(['farmer', 'student', 'woman', 'senior'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => handlePersonaSelect(key)}
                      className={`py-1.5 px-2 rounded-md transition-colors text-center capitalize ${
                        activePersona === key
                          ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {key === 'farmer' ? (settings.language === 'hi' ? 'किसान' : 'Farmer')
                        : key === 'student' ? (settings.language === 'hi' ? 'विद्यार्थी' : 'Student')
                        : key === 'woman' ? (settings.language === 'hi' ? 'महिला' : 'Woman')
                        : (settings.language === 'hi' ? 'बुजुर्ग' : 'Senior')}
                    </button>
                  ))}
                </div>

                {/* Layered Profile Card */}
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[var(--text-primary)]">
                        {currentPersonaData.name}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {currentPersonaData.role} · {currentPersonaData.state}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                      {currentPersonaData.matches} {settings.language === 'hi' ? 'योजनाएं पात्र' : 'Eligible'}
                    </span>
                  </div>

                  <div className="text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between">
                    <span>{settings.language === 'hi' ? 'वार्षिक आय:' : 'Annual Income:'} {currentPersonaData.income}</span>
                    <span className="text-[var(--text-muted)]">No Aadhaar needed</span>
                  </div>
                </div>

                {/* Result Arrow Mechanism */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {settings.language === 'hi' ? 'तत्काल सुझाई गई योजनाएं:' : 'Instant Matched Entitlements:'}
                  </div>
                  <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30 text-xs space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>{currentPersonaData.topScheme}</span>
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      {settings.language === 'hi' 
                        ? 'दस्तावेज़: आधार, बैंक पासबुक, आय/जमीन प्रमाण। कोई बिचौलिया आवश्यक नहीं।'
                        : 'Required: Aadhaar, Bank Passbook, Land/Income cert. No middlemen.'}
                    </p>
                  </div>
                </div>

                {/* Inspect Action */}
                <button
                  onClick={() => setCurrentView('results')}
                  className="w-full py-2.5 px-4 rounded-xl border border-[var(--accent-saffron)] text-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-light)] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{settings.language === 'hi' ? 'इस प्रोफ़ाइल के सभी परिणाम देखें' : 'View Full Report for this Profile'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS: From Questions to Benefits */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {settings.language === 'hi' ? 'सरल प्रक्रिया' : 'Step-by-Step Flow'}
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
                className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif font-bold text-amber-800 dark:text-amber-500 tabular-nums">
                    {step.num}
                  </span>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mt-3">
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

      {/* 3. FEATURED TOOLS */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
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
              className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 w-fit">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
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
              className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 w-fit">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
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
              className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 w-fit">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
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
              className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 w-fit">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
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
              className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 w-fit">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
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
              className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 w-fit">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors">
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

      {/* 4. SCHEME CATALOGUE PREVIEW BY CATEGORIES */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
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
                className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      {settings.language === 'hi' ? scheme.categoryLabelHindi : scheme.categoryLabel}
                    </span>
                    <span className="tabular-nums font-mono text-[11px] text-[var(--text-muted)]">
                      {scheme.shortCode}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors leading-snug">
                    {settings.language === 'hi' ? scheme.nameHindi : scheme.name}
                  </h3>

                  <div className="p-2.5 rounded-lg bg-[var(--bg-subtle)] text-xs font-medium text-emerald-800 dark:text-emerald-300">
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

      {/* 5. TRUST & PRIVACY SECTION */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-8">
            
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
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
              <div className="space-y-2.5 p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                  {t('privacyPillar1Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('privacyPillar1Desc')}
                </p>
              </div>

              <div className="space-y-2.5 p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                  {t('privacyPillar2Title')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t('privacyPillar2Desc')}
                </p>
              </div>

              <div className="space-y-2.5 p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">
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

      {/* 6. ANTI-SCAM CITIZEN PROTECTION */}
      <section className="border-t border-[var(--border-hairline)] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl border border-amber-300 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20 space-y-6">
            
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-7 h-7 text-amber-700 dark:text-amber-400 shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                  {t('antiScamTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {t('antiScamSubtitle')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-amber-200 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('antiScamPoint1')}
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-amber-200 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('antiScamPoint2')}
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-amber-200 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('antiScamPoint3')}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-amber-900 dark:text-amber-200">
                {t('cybercrimeHelpline')}
              </span>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-800 dark:text-amber-300 underline hover:text-amber-950"
              >
                Visit cybercrime.gov.in →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="border-t border-[var(--border-hairline)] pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] text-balance">
            {t('finalCtaTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
            {t('finalCtaSubtitle')}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('questionnaire')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <span>{t('heroCtaPrimary')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('all_schemes')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-semibold text-sm transition-colors"
            >
              <span>{t('heroCtaSecondary')}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
