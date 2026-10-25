import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileCheck2, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  Clock, 
  Coins, 
  Building2, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';
import { MASTER_DOCUMENTS } from '../../data/documentsData';
import { safeExternalUrl } from '../../utils/safeUrl';

export const DocumentCheckerView: React.FC = () => {
  const { readyDocumentIds, toggleDocumentReady, settings, t, L } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'ready' | 'missing'>('all');

  // Count only IDs that still exist, so stale saved data can't push this past 100%.
  const readyCount = MASTER_DOCUMENTS.filter((d) => readyDocumentIds.includes(d.id)).length;
  const totalCount = MASTER_DOCUMENTS.length;
  const percentReady = Math.round((readyCount / totalCount) * 100);

  const displayedDocs = MASTER_DOCUMENTS.filter((doc) => {
    const isReady = readyDocumentIds.includes(doc.id);
    if (filterMode === 'ready') return isReady;
    if (filterMode === 'missing') return !isReady;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {t('readinessChecklist')}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            {t('documentsReadyHeadline')}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            {t('documentsReadySubtitle')}
          </p>
        </div>

        {/* Readiness Meter Card with Apple Glassmorphism */}
        <div className="p-5 sm:p-6 rounded-3xl glass-card space-y-3.5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {readyCount} / {totalCount} {t('documentsReady')}
            </span>
            <span className="text-sm font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
              {percentReady}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 rounded-full"
              style={{ width: `${percentReady}%` }}
            />
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            {percentReady >= 70
              ? t('excellentPreparationYouPossessThe')
              : t('clickOnMissingDocumentsBelow')}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-hairline)] pb-3">
        <button
          onClick={() => setFilterMode('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterMode === 'all'
              ? 'bg-[var(--accent-saffron)] text-white'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {t('all2', { totalCount })}
        </button>

        <button
          onClick={() => setFilterMode('ready')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterMode === 'ready'
              ? 'bg-emerald-700 text-white'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {t('ready', { readyCount })}
        </button>

        <button
          onClick={() => setFilterMode('missing')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterMode === 'missing'
              ? 'bg-amber-700 text-white'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {t('actionRequired2', { p0: totalCount - readyCount })}
        </button>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {displayedDocs.map((doc) => {
          const isReady = readyDocumentIds.includes(doc.id);

          return (
            <div
              key={doc.id}
              className={`p-6 rounded-3xl transition-all space-y-4 ${
                isReady
                  ? 'glass-card ring-2 ring-[var(--accent-green)]/40'
                  : 'glass-card'
              }`}
            >
              {/* Row 1: Title & Toggle Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">
                      {L.docName(doc.id, doc.name, doc.nameHindi)}
                    </h3>
                    {isReady && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        {t('readyBadge')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {L.docShortDesc(doc.id, doc.shortDesc, doc.shortDescHindi)}
                  </p>
                </div>

                <button
                  onClick={() => toggleDocumentReady(doc.id)}
                  aria-pressed={isReady}
                  className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold transition-colors shrink-0 ${
                    isReady
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200'
                      : 'border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)]'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isReady ? 'text-emerald-700' : 'text-[var(--text-muted)]'}`} />
                  <span>{isReady ? (t('markedReady')) : t('markAsReady')}</span>
                </button>
              </div>

              {/* Row 2: Metadata Badges (Authority, Cost, Time) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-[var(--border-hairline)]">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>{t('issuingAuthority')}</span>
                  </span>
                  <p className="font-medium text-[var(--text-primary)]">
                    {L.long(doc.issuingAuthority, doc.issuingAuthorityHindi)}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    <span>{t('fee')}</span>
                  </span>
                  <p className="font-medium text-[var(--text-primary)]">
                    {L.long(doc.cost, doc.costHindi)}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{t('processingTime')}</span>
                  </span>
                  <p className="font-medium text-[var(--text-primary)]">
                    {L.long(doc.estimatedTime, doc.estimatedTimeHindi)}
                  </p>
                </div>
              </div>

              {/* Row 3: Official portal & Safety advice */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-amber-800 dark:text-amber-400">
                    {t('citizenTip')}
                  </span>
                  <span>{L.long(doc.tips, doc.tipsHindi)}</span>
                </div>

                {safeExternalUrl(doc.officialPortal) && (
                  <a
                    href={safeExternalUrl(doc.officialPortal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--accent-saffron)] hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>{t('officialPortal')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
