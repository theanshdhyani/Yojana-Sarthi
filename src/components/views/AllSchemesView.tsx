import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  X, 
  Wheat, 
  HeartPulse, 
  Home, 
  Baby, 
  GraduationCap, 
  Store, 
  Shield, 
  SunMedium,
  Clock
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../../data/schemesData';
import { SchemeCategory, BenefitType } from '../../types/scheme';

export const AllSchemesView: React.FC = () => {
  const { setCurrentView, setSelectedSchemeId, settings, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBenefitType, setSelectedBenefitType] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('filterAllCategories') },
    { id: 'agriculture', label: settings.language === 'hi' ? 'कृषि एवं किसान' : 'Agriculture & Farming' },
    { id: 'health', label: settings.language === 'hi' ? 'स्वास्थ्य एवं चिकित्सा' : 'Health & Medical' },
    { id: 'housing', label: settings.language === 'hi' ? 'आवास एवं मकान' : 'Housing & Shelter' },
    { id: 'women_children', label: settings.language === 'hi' ? 'महिला एवं बाल कल्याण' : 'Women & Children' },
    { id: 'education', label: settings.language === 'hi' ? 'शिक्षा एवं छात्रवृत्ति' : 'Education & Learning' },
    { id: 'livelihood_business', label: settings.language === 'hi' ? 'रोजगार एवं व्यवसाय' : 'Livelihood & MSME' },
    { id: 'social_security', label: settings.language === 'hi' ? 'सामाजिक सुरक्षा एवं पेंशन' : 'Social Security' },
    { id: 'clean_energy', label: settings.language === 'hi' ? 'सोलर एवं स्वच्छ ऊर्जा' : 'Clean Energy' }
  ];

  const benefitTypes = [
    { id: 'all', label: 'All Benefit Types' },
    { id: 'cash_transfer', label: 'Direct Cash Transfer' },
    { id: 'subsidized_loan', label: 'Subsidized / Mudra Loan' },
    { id: 'health_cover', label: 'Cashless Health Cover' },
    { id: 'asset_subsidy', label: 'Asset / Solar Subsidy' },
    { id: 'pension', label: 'Monthly Pension' },
    { id: 'scholarship', label: 'Education Scholarship' },
    { id: 'employment_guarantee', label: 'Employment Guarantee' }
  ];

  const filteredSchemes = SCHEMES_DATABASE.filter((scheme) => {
    // Search query matching
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      scheme.name.toLowerCase().includes(q) ||
      scheme.nameHindi.includes(q) ||
      scheme.shortCode.toLowerCase().includes(q) ||
      scheme.summary.toLowerCase().includes(q) ||
      scheme.summaryHindi.includes(q) ||
      scheme.benefitHeadline.toLowerCase().includes(q) ||
      scheme.benefitHeadlineHindi.includes(q) ||
      scheme.categoryLabel.toLowerCase().includes(q);

    // Category filter
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;

    // Benefit type filter
    const matchesBenefit = selectedBenefitType === 'all' || scheme.benefitType === selectedBenefitType;

    return matchesSearch && matchesCategory && matchesBenefit;
  });

  const handleSchemeClick = (id: string) => {
    setSelectedSchemeId(id);
    setCurrentView('scheme_detail');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBenefitType('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          {settings.language === 'hi' ? 'राष्ट्रीय डायरेक्टरी' : 'National Welfare Directory'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
          {t('allSchemesTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          {t('allSchemesSubtitle')}
        </p>
      </div>

      {/* Sticky Frosted Glass Search & Filter Toolbar */}
      <div className="glass-toolbar p-4 sm:p-5 rounded-2xl space-y-3.5 shadow-md sticky top-20 z-20">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-saffron)] focus:outline-none shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Row: Categories Horizontal Scrolling Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  selectedCategory === cat.id
                    ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-semibold text-[var(--text-primary)] shadow-2xs'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Benefit Type filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {benefitTypes.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBenefitType(b.id)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors border ${
                  selectedBenefitType === b.id
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Counter & Active filters */}
      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] border-b border-[var(--border-hairline)] pb-3">
        <div>
          <span>{settings.language === 'hi' ? 'दिखाए गए परिणाम: ' : 'Showing: '}</span>
          <span className="font-bold text-[var(--text-primary)] tabular-nums">{filteredSchemes.length}</span>
          <span> / {SCHEMES_DATABASE.length} {settings.language === 'hi' ? 'योजनाएं' : 'schemes'}</span>
        </div>

        {(searchQuery || selectedCategory !== 'all' || selectedBenefitType !== 'all') && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-[var(--accent-saffron)] hover:underline"
          >
            {settings.language === 'hi' ? 'सभी फिल्टर हटाएं' : 'Reset all filters'}
          </button>
        )}
      </div>

      {/* Schemes Catalogue Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => handleSchemeClick(scheme.id)}
              className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent-saffron)] transition-all cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {settings.language === 'hi' ? scheme.categoryLabelHindi : scheme.categoryLabel}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {scheme.shortCode}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors leading-snug">
                  {settings.language === 'hi' ? scheme.nameHindi : scheme.name}
                </h3>

                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  {settings.language === 'hi' ? scheme.benefitHeadlineHindi : scheme.benefitHeadline}
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {settings.simpleLanguageMode
                    ? settings.language === 'hi' ? scheme.simpleLanguageSummaryHindi : scheme.simpleLanguageSummary
                    : settings.language === 'hi' ? scheme.summaryHindi : scheme.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{scheme.processingTimeDays} {settings.language === 'hi' ? 'दिन' : 'days'}</span>
                </span>
                <span className="font-semibold text-[var(--accent-saffron)] group-hover:underline">
                  {t('viewSchemeDetails')} →
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {settings.language === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes match your query'}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {settings.language === 'hi'
              ? 'कृपया दूसरा कीवर्ड खोजें या फिल्टर हटाएं।'
              : 'Try clearing your search terms or selecting another category.'}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-saffron)] text-white"
          >
            {settings.language === 'hi' ? 'सभी योजनाएं देखें' : 'View all schemes'}
          </button>
        </div>
      )}

    </div>
  );
};
