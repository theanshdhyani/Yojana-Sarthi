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
  const { setCurrentView, setSelectedSchemeId, settings, t, L } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBenefitType, setSelectedBenefitType] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('filterAllCategories') },
    { id: 'agriculture', label: t('agricultureFarming') },
    { id: 'health', label: t('healthMedical') },
    { id: 'housing', label: t('housingShelter') },
    { id: 'women_children', label: t('womenChildren') },
    { id: 'education', label: t('educationLearning') },
    { id: 'livelihood_business', label: t('livelihoodMsme') },
    { id: 'social_security', label: t('socialSecurity') },
    { id: 'clean_energy', label: t('cleanEnergy') }
  ];

  const benefitTypes = [
    { id: 'all', label: t('btAll') },
    { id: 'cash_transfer', label: t('btCashTransfer') },
    { id: 'subsidized_loan', label: t('btSubsidizedLoan') },
    { id: 'health_cover', label: t('btHealthCover') },
    { id: 'asset_subsidy', label: t('btAssetSubsidy') },
    { id: 'pension', label: t('btPension') },
    { id: 'scholarship', label: t('btScholarship') },
    { id: 'employment_guarantee', label: t('btEmploymentGuarantee') }
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
          {t('nationalWelfareDirectory')}
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
          {t('allSchemesTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          {t('allSchemesSubtitle')}
        </p>
      </div>

      {/* Sticky Frosted Glass Search & Filter Toolbar */}
      <div className="glass-toolbar p-4 sm:p-5 rounded-[1.75rem] space-y-3.5 sticky top-24 z-20">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="search"
            maxLength={80}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            className="w-full pl-11 pr-10 h-12 rounded-full border border-transparent bg-[var(--bg-subtle)] text-[15px] text-[var(--text-primary)] placeholder-[var(--text-muted)]"
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
                aria-pressed={selectedCategory === cat.id}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] font-semibold'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
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
                aria-pressed={selectedBenefitType === b.id}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
                  selectedBenefitType === b.id
                    ? 'bg-[var(--accent-green-light)] text-[var(--accent-green-text)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
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
          <span>{t('showing')}</span>
          <span className="font-bold text-[var(--text-primary)] tabular-nums">{filteredSchemes.length}</span>
          <span> / {SCHEMES_DATABASE.length} {t('schemes')}</span>
        </div>

        {(searchQuery || selectedCategory !== 'all' || selectedBenefitType !== 'all') && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-[var(--accent-saffron)] hover:underline"
          >
            {t('resetAllFilters')}
          </button>
        )}
      </div>

      {/* Schemes Catalogue Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => handleSchemeClick(scheme.id)}
              className="bobbin-surface-card p-6 rounded-3xl text-left flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {L.category(scheme.category)}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {scheme.shortCode}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-saffron)] transition-colors leading-snug">
                  {L.schemeName(scheme)}
                </h3>

                <div className="px-3 py-2 rounded-xl bg-[var(--accent-green-light)] text-[13px] font-medium text-[var(--accent-green-text)]">
                  {L.schemeBenefit(scheme)}
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {settings.simpleLanguageMode
                    ? L.schemeSimple(scheme)
                    : L.schemeSummary(scheme)}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{scheme.processingTimeDays} {t('days')}</span>
                </span>
                <span className="font-semibold text-[var(--accent-saffron)] group-hover:underline">
                  {t('viewSchemeDetails')} →
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4 max-w-md mx-auto">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {t('noSchemesMatchYourQuery')}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {t('tryClearingYourSearchTerms')}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-saffron)] text-white"
          >
            {t('viewAllSchemes')}
          </button>
        </div>
      )}

    </div>
  );
};
