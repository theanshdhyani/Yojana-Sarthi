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
  CheckCircle2
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
    t 
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const totalSteps = 10;

  const handleNext = () => {
    stopReading();
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCurrentView('results');
    }
  };

  const handleBack = () => {
    stopReading();
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
      
      {/* Top Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </button>

          <span className="text-xs font-mono font-semibold text-[var(--text-muted)] tracking-wider">
            {settings.language === 'hi' 
              ? `प्रश्न ${String(currentStepIndex + 1).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`
              : `Question ${String(currentStepIndex + 1).padStart(2, '0')} of ${String(totalSteps).padStart(2, '0')}`}
          </span>
        </div>

        {/* Hairline Progress Bar */}
        <div className="w-full h-1.5 bg-[var(--border-hairline)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent-saffron)] transition-all duration-300 rounded-full"
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
                {settings.language === 'hi' ? 'आयु विवरण' : 'Age Criteria'}
              </span>
              <button
                onClick={() => handleReadCurrent(settings.language === 'hi' ? 'आपकी आयु कितनी है? यह पेंशन, छात्रवृत्ति और युवा योजनाओं की जांच हेतु आवश्यक है।' : 'What is your current age? This helps filter age-specific schemes like pensions, scholarships, and youth programs.')}
                className="p-1.5 rounded-lg border border-[var(--border-hairline)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-700" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{t('speechPlay')}</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आपकी वर्तमान आयु (वर्ष) कितनी है?' : 'What is your current age?'}
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'विभिन्न योजनाएं (जैसे वृद्धावस्था पेंशन 60+, छात्रवृत्ति 15-25, बाल योजनाएं <10) आयु सीमा पर निर्भर करती हैं।'
                : 'Central schemes have specific age brackets for pensions (60+), youth programs (18-40), and child benefits (<10).'}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-2">
                {settings.language === 'hi' ? 'आयु दर्ज करें (संख्या में)' : 'Enter Age (Years)'}
              </label>
              <input
                type="number"
                min="1"
                max="110"
                value={answers.age ?? ''}
                onChange={(e) => setAnswers({ ...answers, age: parseInt(e.target.value) || undefined })}
                placeholder="e.g. 38"
                className="w-full text-2xl font-semibold px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] focus:border-[var(--accent-saffron)] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--text-muted)]">
                {settings.language === 'hi' ? 'अक्सर उपयोग किए जाने वाले विकल्प:' : 'Quick Select:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {[19, 28, 42, 62, 71].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAnswers({ ...answers, age: val })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      answers.age === val
                        ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-bold text-[var(--text-primary)]'
                        : 'border-[var(--border-hairline)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {val} {settings.language === 'hi' ? 'वर्ष' : 'yrs'}
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
              {settings.language === 'hi' ? 'लिंग विवरण' : 'Gender Profile'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आपका लिंग क्या है?' : 'What is your gender?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'उज्ज्वला, मातृ वंदना, सुकन्या जैसी योजनाएं विशेष रूप से महिलाओं व बालिकाओं के लिए हैं।'
                : 'Special priority welfare programs (like PM Ujjwala and PMMVY) are designed specifically for women.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'female', label: settings.language === 'hi' ? 'महिला (Female)' : 'Female', desc: 'Women specific schemes & subsidies' },
              { id: 'male', label: settings.language === 'hi' ? 'पुरुष (Male)' : 'Male', desc: 'General & family welfare schemes' },
              { id: 'transgender', label: settings.language === 'hi' ? 'ट्रांसजेंडर (Transgender)' : 'Transgender', desc: 'SMILE & social inclusion schemes' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnswers({ ...answers, gender: item.id as any })}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  answers.gender === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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
              {settings.language === 'hi' ? 'स्थान विवरण' : 'Geographic Location'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आप किस राज्य / केंद्र शासित प्रदेश में रहते हैं?' : 'Which State or Union Territory do you reside in?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'यह राज्य-विशिष्ट पोर्टल लिंक और निकटतम सहायता केंद्र दिखाने में मदद करता है।'
                : 'Identifies state-specific welfare top-ups, revenue portals, and nearest assistance centers.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4">
            <label className="block text-xs font-semibold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'राज्य का चयन करें' : 'Select State'}
            </label>
            <select
              value={answers.state || 'Uttar Pradesh'}
              onChange={(e) => setAnswers({ ...answers, state: e.target.value })}
              className="w-full text-base px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-saffron)] focus:outline-none"
            >
              {INDIAN_STATES_DISTRICTS.map((s) => (
                <option key={s.state} value={s.state}>
                  {s.state} ({s.stateHindi})
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
              {settings.language === 'hi' ? 'निवास क्षेत्र' : 'Area of Residence'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आप गांव में रहते हैं या शहर / कस्बे में?' : 'Do you live in a rural village or an urban town/city?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'मनरेगा और पीएम आवास-ग्रामीण गांवों के लिए हैं, जबकि पीएम स्वनिधि शहरों के लिए है।'
                : 'Schemes like MGNREGA and PMAY-Gramin target rural areas, while PM SVANidhi focuses on urban vendors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'rural', label: settings.language === 'hi' ? 'ग्रामीण (गांव / ग्राम पंचायत)' : 'Rural (Village / Panchayat)', desc: 'Eligible for MGNREGA, PMAY-G, agriculture inputs' },
              { id: 'urban', label: settings.language === 'hi' ? 'शहरी (कस्बा / नगर निगम / पालिका)' : 'Urban (City / Municipality)', desc: 'Eligible for PM SVANidhi, PMAY-Urban 2.0, urban MSME' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnswers({ ...answers, residenceArea: item.id as any })}
                className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  answers.residenceArea === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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
              {settings.language === 'hi' ? 'व्यवसाय व आजीविका' : 'Primary Occupation'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आपका मुख्य काम या आजीविका क्या है?' : 'What is your primary livelihood or occupation?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'सरकारी योजनाएं सीधे आपके काम से जुड़ी होती हैं (जैसे किसान, कारीगर, छात्र, दुकानदार)।'
                : 'Matches occupation-targeted programs like PM-KISAN, PM Vishwakarma, MUDRA loans, and scholarships.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {[
              { id: 'farmer', label: settings.language === 'hi' ? 'किसान (भूमि स्वामी)' : 'Farmer (Cultivator)', icon: Wheat },
              { id: 'agricultural_labour', label: settings.language === 'hi' ? 'खेतिहर मजदूर / ग्रामीण श्रमिक' : 'Agricultural Labourer', icon: HeartHandshake },
              { id: 'artisan_craftsperson', label: settings.language === 'hi' ? 'पारंपरिक कारीगर / विश्वकर्मा शिल्पकार' : 'Traditional Artisan / Craftsman', icon: Hammer },
              { id: 'street_vendor', label: settings.language === 'hi' ? 'स्ट्रीट वेंडर / रेहड़ी-पटरी विक्रेता' : 'Street Vendor / Hawkers', icon: Store },
              { id: 'daily_wage_worker', label: settings.language === 'hi' ? 'दैनिक वेतनभोगी / दिहाड़ी मजदूर' : 'Daily Wage Worker', icon: User },
              { id: 'small_business_owner', label: settings.language === 'hi' ? 'छोटा व्यापारी / दुकानदार / MSME' : 'Small Business / Shop Owner', icon: Briefcase },
              { id: 'student', label: settings.language === 'hi' ? 'विद्यार्थी / छात्र (अध्ययनरत)' : 'Student (Higher Studies)', icon: GraduationCap },
              { id: 'homemaker', label: settings.language === 'hi' ? 'गृहिणी (घरेलू महिला)' : 'Homemaker', icon: Home },
              { id: 'unemployed', label: settings.language === 'hi' ? 'बेरोजगार / काम की तलाश में' : 'Unemployed / Jobseeker', icon: User },
              { id: 'retired', label: settings.language === 'hi' ? 'सेवानिवृत्त / बुजुर्ग' : 'Retired / Senior', icon: Sun }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnswers({ ...answers, occupation: item.id as any })}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.occupation === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs font-semibold'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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
              {settings.language === 'hi' ? 'पारिवारिक आय' : 'Household Annual Income'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आपके पूरे परिवार की कुल वार्षिक आय किस दायरे में है?' : 'What is your total annual household income?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'कल्याणकारी योजनाओं में आय सीमा होती है (जैसे ₹1 लाख, ₹2.5 लाख या ₹8 लाख तक)।'
                : 'Most social schemes enforce maximum income thresholds (e.g. up to ₹1L, ₹2.5L, or ₹8L per year).'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'below_1lakh', label: settings.language === 'hi' ? '₹1,00,000 से कम (गरीबी रेखा / बीपीएल स्तर)' : 'Less than ₹1,00,000 / year (BPL / Antyodaya bracket)' },
              { id: '1lakh_to_2.5lakh', label: settings.language === 'hi' ? '₹1,00,000 से ₹2,50,000 प्रति वर्ष (EWS / निम्न आय)' : '₹1,00,000 to ₹2,50,000 / year (EWS & Low Income)' },
              { id: '2.5lakh_to_5lakh', label: settings.language === 'hi' ? '₹2,50,000 से ₹5,00,000 प्रति वर्ष (मध्यम आय LIG)' : '₹2,50,000 to ₹5,00,000 / year (LIG category)' },
              { id: '5lakh_to_8lakh', label: settings.language === 'hi' ? '₹5,00,000 से ₹8,00,000 प्रति वर्ष (सामान्य सीमा)' : '₹5,00,000 to ₹8,00,000 / year (MIG category)' },
              { id: 'above_8lakh', label: settings.language === 'hi' ? '₹8,00,000 से अधिक' : 'Above ₹8,00,000 / year' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnswers({ ...answers, annualIncomeBracket: item.id as any })}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.annualIncomeBracket === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold shadow-xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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
              {settings.language === 'hi' ? 'कृषि भूमि स्वामित्व' : 'Agricultural Landholding'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आपके या परिवार के नाम पर कितनी खेती की जमीन है?' : 'How much cultivable agricultural land does your family hold?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'पीएम-किसान और किसान क्रेडिट कार्ड (KCC) हेतु भूमि अभिलेख होना आवश्यक है।'
                : 'Directly determines eligibility for PM-KISAN, crop insurance, and Kisan Credit Card.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'none', label: settings.language === 'hi' ? 'कोई कृषि भूमि नहीं (भूमिहीन)' : 'No Agricultural Land (Landless)', desc: 'Eligible for wage work, PM Vishwakarma, SVANidhi' },
              { id: 'marginal_less_than_1ha', label: settings.language === 'hi' ? 'सीमांत किसान (< 1 हेक्टेयर / 2.5 एकड़)' : 'Marginal Farmer (< 1 Hectare / 2.5 Acres)', desc: 'High priority for PM-KISAN & input subsidies' },
              { id: 'small_1_to_2ha', label: settings.language === 'hi' ? 'लघु किसान (1 से 2 हेक्टेयर)' : 'Small Farmer (1 to 2 Hectares)', desc: 'Eligible for PM-KISAN, solar pump schemes' },
              { id: 'medium_large_above_2ha', label: settings.language === 'hi' ? 'मध्यम / बड़े किसान (> 2 हेक्टेयर)' : 'Medium / Large Farmer (> 2 Hectares)', desc: 'Qualifies for farm mechanization & solar grants' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnswers({ ...answers, landholding: item.id as any })}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  answers.landholding === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] shadow-xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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
              {settings.language === 'hi' ? 'सामाजिक वर्ग / श्रेणी' : 'Social Category'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आप किस सामाजिक वर्ग / श्रेणी से संबंधित हैं?' : 'Which social category do you belong to?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'आरक्षित वर्गों (SC, ST, OBC) और EWS हेतु विशेष छात्रवृत्ति और अनुदान योजनाएं होती हैं।'
                : 'Identifies dedicated affirmative welfare schemes, reservations, and fee exemptions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'General', label: 'General (सामान्य वर्ग)' },
              { id: 'OBC', label: 'OBC (अन्य पिछड़ा वर्ग)' },
              { id: 'SC', label: 'SC (अनुसूचित जाति)' },
              { id: 'ST', label: 'ST (अनुसूचित जनजाति)' },
              { id: 'EWS', label: 'EWS (आर्थिक रूप से कमजोर सामान्य)' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnswers({ ...answers, socialCategory: item.id as any })}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.socialCategory === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold shadow-xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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
              {settings.language === 'hi' ? 'राशन कार्ड स्थिति' : 'Ration Card Category'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'आपके परिवार के पास कौन सा राशन कार्ड है?' : 'What type of ration card does your household hold?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'आयुष्मान भारत और उज्ज्वला में बीपीएल अथवा अंत्योदय कार्ड प्राथमिक पहचान है।'
                : 'BPL and Antyodaya (AAY) cards are recognized proof for Ayushman Bharat and Ujjwala.'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'aay_antyodaya', label: settings.language === 'hi' ? 'अंत्योदय अन्न योजना (AAY / पीला कार्ड - अत्यंत निर्धन)' : 'Antyodaya Anna Yojana (AAY - Heavily Subsidised)' },
              { id: 'bpl', label: settings.language === 'hi' ? 'बीपीएल / प्राथमिकता राशन कार्ड (BPL / PHH)' : 'Below Poverty Line (BPL / Priority Household PHH)' },
              { id: 'apl', label: settings.language === 'hi' ? 'सामान्य राशन कार्ड (APL / Non-PHH / सफेद कार्ड)' : 'Above Poverty Line (APL / Non-PHH)' },
              { id: 'none', label: settings.language === 'hi' ? 'कोई राशन कार्ड नहीं है' : 'No Ration Card' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnswers({ ...answers, hasRationCard: item.id as any })}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  answers.hasRationCard === item.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold shadow-xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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
              {settings.language === 'hi' ? 'विशेष पारिवारिक परिस्थितियां' : 'Special Household Conditions'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {settings.language === 'hi' ? 'क्या आपके परिवार में इनमें से कोई विशेष स्थिति है?' : 'Do any of these special conditions apply to your household?'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'लागू होने वाले सभी विकल्पों को चुनें (या कोई न हो तो सीधे आगे बढ़ें)।'
                : 'Select all that apply. These unlock targeted benefits like Sukanya Samriddhi, Surya Ghar, or Pensions.'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'girl_child_under_10', label: settings.language === 'hi' ? '10 वर्ष से कम आयु की बेटी (सुकन्या समृद्धि योजना)' : 'Daughter aged under 10 years (SSY savings)' },
              { id: 'pregnant_lactating', label: settings.language === 'hi' ? 'गर्भवती अथवा स्तनपान कराने वाली माता (PMMVY नकद लाभ)' : 'Pregnant or lactating mother (PMMVY ₹5,000)' },
              { id: 'disability', label: settings.language === 'hi' ? 'दिव्यांग सदस्य (दिव्यांग पेंशन व सहायक उपकरण)' : 'Person with benchmark disability (Disability Pension)' },
              { id: 'widow', label: settings.language === 'hi' ? 'विधवा महिला (विधवा पेंशन योजना)' : 'Widowed woman in household (Widow Pension)' },
              { id: 'senior_citizen', label: settings.language === 'hi' ? '60 वर्ष से अधिक आयु के बुजुर्ग (वृद्धावस्था पेंशन व स्वास्थ्य)' : 'Senior citizen aged 60+ (Old age pension)' },
              { id: 'has_unshaded_rooftop', label: settings.language === 'hi' ? 'घर की छत पर धूप आती है (पीएम सूर्य घर ₹78k सोलर सब्सिडी)' : 'Unshaded rooftop access (PM Surya Ghar Solar Subsidy)' }
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
                      : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
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

      {/* Bottom Navigation Buttons */}
      <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between gap-4">
        <button
          onClick={handleBack}
          className="px-5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--text-secondary)] transition-colors"
        >
          {t('back')}
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-xs font-semibold transition-colors shadow-sm"
        >
          <span>{currentStepIndex === totalSteps - 1 ? t('viewResults') : t('continue')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
