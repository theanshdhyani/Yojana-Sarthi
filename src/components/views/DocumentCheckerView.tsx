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

export const DocumentCheckerView: React.FC = () => {
  const { readyDocumentIds, toggleDocumentReady, settings, t } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'ready' | 'missing'>('all');

  const readyCount = readyDocumentIds.length;
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
            {settings.language === 'hi' ? 'दस्तावेज़ तैयारी' : 'Readiness Checklist'}
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
              {readyCount} / {totalCount} {settings.language === 'hi' ? 'दस्तावेज़ तैयार हैं' : 'Documents Ready'}
            </span>
            <span className="text-sm font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
              {percentReady}%
            </span>
          </div>

          <div className="w-full h-2 bg-[var(--border-hairline)] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${percentReady}%` }}
            />
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            {percentReady >= 70
              ? settings.language === 'hi'
                ? 'बहुत बढ़िया! आपके अधिकांश प्राथमिक दस्तावेज तैयार हैं। आप सीधे सरकारी पोर्टल या सीएससी पर आवेदन कर सकते हैं।'
                : 'Excellent preparation! You possess the essential core identity and banking documents needed for 80%+ of welfare schemes.'
              : settings.language === 'hi'
              ? 'जो दस्तावेज बाकी हैं, उन पर क्लिक करके देखें कि वे किस दफ्तर से बनेंगे और कितनी फीस लगेगी।'
              : 'Click on missing documents below to see which local office issues them, fees, and avoid common rejection traps.'}
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
          {settings.language === 'hi' ? `सभी (${totalCount})` : `All (${totalCount})`}
        </button>

        <button
          onClick={() => setFilterMode('ready')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterMode === 'ready'
              ? 'bg-emerald-700 text-white'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {settings.language === 'hi' ? `तैयार (${readyCount})` : `Ready (${readyCount})`}
        </button>

        <button
          onClick={() => setFilterMode('missing')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterMode === 'missing'
              ? 'bg-amber-700 text-white'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {settings.language === 'hi' ? `कार्रवाई आवश्यक (${totalCount - readyCount})` : `Action Required (${totalCount - readyCount})`}
        </button>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {displayedDocs.map((doc) => {
          const isReady = readyDocumentIds.includes(doc.id);

          return (
            <div
              key={doc.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                isReady
                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-[var(--bg-surface)]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]'
              }`}
            >
              {/* Row 1: Title & Toggle Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">
                      {settings.language === 'hi' ? doc.nameHindi : doc.name}
                    </h3>
                    {isReady && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        Ready
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {settings.language === 'hi' ? doc.shortDescHindi : doc.shortDesc}
                  </p>
                </div>

                <button
                  onClick={() => toggleDocumentReady(doc.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                    isReady
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200'
                      : 'border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)]'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isReady ? 'text-emerald-700' : 'text-[var(--text-muted)]'}`} />
                  <span>{isReady ? (settings.language === 'hi' ? 'तैयार है' : 'Marked Ready') : t('markAsReady')}</span>
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
                    {settings.language === 'hi' ? doc.issuingAuthorityHindi : doc.issuingAuthority}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    <span>{t('fee')}</span>
                  </span>
                  <p className="font-medium text-[var(--text-primary)]">
                    {settings.language === 'hi' ? doc.costHindi : doc.cost}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{t('processingTime')}</span>
                  </span>
                  <p className="font-medium text-[var(--text-primary)]">
                    {settings.language === 'hi' ? doc.estimatedTimeHindi : doc.estimatedTime}
                  </p>
                </div>
              </div>

              {/* Row 3: Official portal & Safety advice */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-amber-800 dark:text-amber-400">
                    {settings.language === 'hi' ? 'महत्वपूर्ण सलाह: ' : 'Citizen Tip: '}
                  </span>
                  <span>{settings.language === 'hi' ? doc.tipsHindi : doc.tips}</span>
                </div>

                <a
                  href={doc.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--accent-saffron)] hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
