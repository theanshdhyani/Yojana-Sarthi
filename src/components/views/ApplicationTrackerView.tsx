import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { safeExternalUrl } from '../../utils/safeUrl';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Plus, 
  Trash2, 
  Calendar, 
  ExternalLink,
  ChevronDown,
  Edit3
} from 'lucide-react';
import { TrackedApplication, ApplicationStatus } from '../../types/tracker';
import { SCHEMES_DATABASE } from '../../data/schemesData';

export const ApplicationTrackerView: React.FC = () => {
  const { 
    applications, 
    addApplication, 
    updateApplicationStatus, 
    deleteApplication, 
    settings,
    t,
    L
  } = useApp();

  // Saved records keep their original names; show the scheme in the current language when we know it.
  const schemeLabel = (app: TrackedApplication) => {
    const scheme = SCHEMES_DATABASE.find((s) => s.id === app.schemeId);
    return scheme ? L.schemeName(scheme) : app.schemeName;
  };

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New application form state
  const [selectedSchemeId, setSelectedSchemeId] = useState(SCHEMES_DATABASE[0].id);
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isAddModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsAddModalOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isAddModalOpen]);

  const statusCounts = {
    all: applications.length,
    to_apply: applications.filter((a) => a.status === 'to_apply').length,
    under_review: applications.filter((a) => a.status === 'under_review').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    action_required: applications.filter((a) => a.status === 'action_required').length
  };

  const filteredApplications = applications.filter((app) => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const scheme = SCHEMES_DATABASE.find((s) => s.id === selectedSchemeId) || SCHEMES_DATABASE[0];
    
    addApplication({
      schemeId: scheme.id,
      schemeName: scheme.name,
      schemeNameHindi: scheme.nameHindi,
      beneficiaryName: beneficiaryName.trim() || t('relSelf'),
      // Never invent a reference number: a citizen could mistake it for an official acknowledgment.
      referenceNumber: refNumber.trim(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'to_apply',
      portalUrl: scheme.officialPortalUrl,
      notes: notes || t('applicationInitiated'),
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          title: t('recordCreated'),
          description: t('addedToDashboard')
        }
      ]
    });

    setIsAddModalOpen(false);
    setRefNumber('');
    setNotes('');
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved':
        return {
          label: t('approved'),
          style: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300'
        };
      case 'under_review':
        return {
          label: t('underReview'),
          style: 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300'
        };
      case 'action_required':
        return {
          label: t('actionRequired'),
          style: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300'
        };
      default:
        return {
          label: t('toApply'),
          style: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            {t('applicationTracking')}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            {t('trackerTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            {t('trackerSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-xs font-semibold transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('newApplication')}</span>
        </button>
      </div>

      {/* Filter Tabs / Quick Stat Bar with Apple Glassmorphism */}
      <div className="glass-toolbar p-2 sm:p-2.5 rounded-2xl shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'all', label: t('all'), count: statusCounts.all },
            { id: 'to_apply', label: t('statusToApply'), count: statusCounts.to_apply },
            { id: 'under_review', label: t('statusUnderReview'), count: statusCounts.under_review },
            { id: 'approved', label: t('statusApproved'), count: statusCounts.approved },
            { id: 'action_required', label: t('statusActionRequired'), count: statusCounts.action_required }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${
                filterStatus === tab.id
                  ? 'border-[var(--accent-saffron)] bg-[var(--accent-saffron-light)] font-bold text-[var(--text-primary)] shadow-2xs'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              <span className="text-xs">{tab.label}</span>
              <span className="text-xs font-mono tabular-nums font-semibold ml-2">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-5">
          {filteredApplications.map((app) => {
            const badge = getStatusBadge(app.status);

            return (
              <div
                key={app.id}
                className="bobbin-surface-card p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">
                      {schemeLabel(app)}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <span>{t('beneficiaryLabel')}: <strong className="text-[var(--text-primary)]">{app.beneficiaryName}</strong></span>
                      <span>·</span>
                      <span>
                        {t('refNoLabel')}:{' '}
                        {app.referenceNumber ? (
                          <span className="font-mono">{app.referenceNumber}</span>
                        ) : (
                          <span className="italic text-[var(--text-muted)]">{t('notYetReceived')}</span>
                        )}
                      </span>
                      <span>·</span>
                      <span>{t('dateLabel')}: <span className="tabular-nums">{app.appliedDate}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${badge.style}`}>
                      {badge.label}
                    </span>

                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title={t('deleteRecord')}
                      aria-label={t('deleteRecord')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Switcher Bar */}
                <div className="pt-2 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[var(--text-muted)] font-medium">
                    {t('updateStatus')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['to_apply', 'under_review', 'approved', 'action_required'] as ApplicationStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateApplicationStatus(app.id, st)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                          app.status === st
                            ? 'bg-[var(--accent-saffron)] text-white border-[var(--accent-saffron)] font-bold'
                            : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {st === 'to_apply' ? t('statusToApply')
                          : st === 'under_review' ? t('statusUnderReview')
                          : st === 'approved' ? t('statusApproved')
                          : t('statusActionRequired')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes & Official Portal link */}
                {app.notes && (
                  <div className="p-3 rounded-xl bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)] flex items-start justify-between gap-2">
                    <p className="leading-relaxed">{app.notes}</p>
                    {safeExternalUrl(app.portalUrl) && (
                      <a
                        href={safeExternalUrl(app.portalUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent-saffron)] hover:underline inline-flex items-center gap-1 shrink-0 ml-2"
                      >
                        <span>{t('officialPortal')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                {/* Timeline display */}
                {app.timeline && app.timeline.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {t('milestoneTimeline')}
                    </span>
                    <div className="border-l-2 border-[var(--border-hairline)] ml-2 pl-3 space-y-2">
                      {app.timeline.map((ev, idx) => (
                        <div key={idx} className="text-xs space-y-0.5 relative">
                          <span className="w-2 h-2 rounded-full bg-[var(--accent-saffron)] absolute -left-[17px] top-1" />
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[var(--text-primary)]">{ev.title}</span>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono tabular-nums">{ev.date}</span>
                          </div>
                          <p className="text-[11px] text-[var(--text-secondary)]">{ev.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {t('noApplicationsFoundInThis')}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {t('saveSchemesFromYourResults')}
          </p>
        </div>
      )}

      {/* Add Application Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-scrim no-print"
          onClick={(e) => e.target === e.currentTarget && setIsAddModalOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="add-app-heading" className="w-full max-w-lg glass-modal rounded-3xl p-6 sm:p-7 space-y-5">
            <h3 id="add-app-heading" className="text-lg font-serif font-bold text-[var(--text-primary)]">
              {t('newApplication')}
            </h3>

            <form onSubmit={handleCreateApplication} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  {t('selectScheme')}
                </label>
                <select
                  value={selectedSchemeId}
                  onChange={(e) => setSelectedSchemeId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                >
                  {SCHEMES_DATABASE.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.shortCode} - {L.schemeName(s)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  {t('beneficiaryName')}
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  placeholder="e.g. Rameshwar Lal"
                  className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  {t('ackNumberOptional')}
                </label>
                <input
                  type="text"
                  maxLength={64}
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g. UP/2026/099182"
                  className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  {t('notesNextAction')}
                </label>
                <textarea
                  value={notes}
                  maxLength={500}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
  
                  className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border-hairline)] text-[var(--text-secondary)]"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[var(--accent-saffron)] text-white font-semibold"
                >
                  {t('saveApplication')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
