import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  User,
  Heart
} from 'lucide-react';
import { FamilyMember } from '../../types/family';
import { evaluateAllSchemes, OCCUPATION_KEYS } from '../../services/eligibilityEngine';
import { MessageKey } from '../../i18n';

const RELATIONSHIP_KEYS: Record<FamilyMember['relationship'], MessageKey> = {
  self: 'relSelf',
  spouse: 'relSpouse',
  father: 'relFather',
  mother: 'relMother',
  son: 'relSon',
  daughter: 'relDaughter',
  other: 'relOther'
};

export const FamilyModeView: React.FC = () => {
  const { 
    familyMembers, 
    addFamilyMember, 
    deleteFamilyMember, 
    setSelectedSchemeId, 
    setCurrentView,
    answers,
    settings, 
    t, L } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New member state
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<FamilyMember['relationship']>('spouse');
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [occupation, setOccupation] = useState<any>('homemaker');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isAddModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsAddModalOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isAddModalOpen]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addFamilyMember({
      name: name.trim(),
      relationship,
      profile: {
        age,
        gender,
        occupation,
        state: answers.state,
        residenceArea: answers.residenceArea,
        socialCategory: answers.socialCategory,
        annualIncomeBracket: answers.annualIncomeBracket,
        hasRationCard: answers.hasRationCard,
        landholding: answers.landholding
      },
      notes: notes || undefined
    });

    setIsAddModalOpen(false);
    setName('');
    setNotes('');
  };

  const handleViewScheme = (id: string) => {
    setSelectedSchemeId(id);
    setCurrentView('scheme_detail');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            {t('householdWelfarePlanner')}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            {t('familyModeTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            {t('familyModeSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-xs font-semibold transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addFamilyMember')}</span>
        </button>
      </div>

      {/* Household Overview Banner with Apple Glassmorphism */}
      <div className="p-6 sm:p-7 rounded-3xl glass-card space-y-3.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-700 dark:text-purple-400" />
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
              {t('aggregatedFamilyWelfarePotential')}
            </h3>
          </div>
          <span className="text-xs font-semibold font-mono tabular-nums text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-200">
            {familyMembers.length} {t('membersRegistered')}
          </span>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {t('governmentWelfareProgramsAreIntergenerational')}
        </p>
      </div>

      {/* Members Cards List */}
      <div className="space-y-6">
        {familyMembers.map((member) => {
          const evalRes = evaluateAllSchemes(member.profile);
          const topMatches = [...evalRes.strongMatches, ...evalRes.possibleMatches].slice(0, 4);

          return (
            <div
              key={member.id}
              className="bobbin-surface-card p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--accent-saffron)]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-[var(--text-primary)]">
                        {member.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)]">
                        {t(RELATIONSHIP_KEYS[member.relationship])}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {t('memberSummary', {
                        age: member.profile.age ?? '',
                        gender: member.profile.gender ? t(member.profile.gender === 'female' ? 'female' : member.profile.gender === 'male' ? 'male' : 'transgender') : '',
                        occupation: member.profile.occupation ? t(OCCUPATION_KEYS[member.profile.occupation]) : ''
                      })}
                    </p>
                    {member.notes && (
                      <p className="text-[11px] text-[var(--text-muted)] italic mt-1">
                        {member.notes}
                      </p>
                    )}
                  </div>
                </div>

                {member.relationship !== 'self' && (
                  <button
                    onClick={() => deleteFamilyMember(member.id)}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-600 transition-colors"
                    title={t('removeMember')}
                    aria-label={t('removeMember')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Matched Schemes for this Member */}
              <div className="pt-3 border-t border-[var(--border-hairline)] space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {t('topMatchedEntitlementsForThis')}
                </div>

                {topMatches.length === 0 ? (
                  <p className="text-xs text-[var(--text-secondary)] p-3 rounded-2xl bg-[var(--bg-subtle)]">
                    {t('noLikelySchemesForThis')}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {topMatches.map((m) => (
                      <button
                        key={m.scheme.id}
                        onClick={() => handleViewScheme(m.scheme.id)}
                        className="p-3 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-left transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[var(--text-primary)]">
                          <span>{L.schemeName(m.scheme)}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                              m.status === 'strong_match'
                                ? 'bg-[var(--accent-green-light)] text-[var(--accent-green-text)]'
                                : 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                            }`}
                          >
                            {m.status === 'strong_match'
                              ? t('match')
                              : t('verify')}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--accent-green-text)] font-medium">
                          {L.schemeBenefit(m.scheme)}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-scrim no-print"
          onClick={(e) => e.target === e.currentTarget && setIsAddModalOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="add-member-heading" className="w-full max-w-md glass-modal rounded-3xl p-6 sm:p-7 space-y-5">
            <h3 id="add-member-heading" className="text-lg font-serif font-bold text-[var(--text-primary)]">
              {t('addFamilyMember')}
            </h3>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    {t('relationship')}
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  >
                    <option value="spouse">{t('relSpouse')}</option>
                    <option value="father">{t('relFather')}</option>
                    <option value="mother">{t('relMother')}</option>
                    <option value="son">{t('relSon')}</option>
                    <option value="daughter">{t('relDaughter')}</option>
                    <option value="other">{t('relOther')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    {t('ageYears')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="105"
                    value={age}
                    onChange={(e) => setAge(Math.min(105, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    {t('gender')}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  >
                    <option value="female">{t('female')}</option>
                    <option value="male">{t('male')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    {t('occupation')}
                  </label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  >
                    <option value="homemaker">{t('homemaker')}</option>
                    <option value="student">{t('studentHigherStudies')}</option>
                    <option value="farmer">{t('farmerCultivator')}</option>
                    <option value="artisan_craftsperson">{t('traditionalArtisanCraftsman')}</option>
                    <option value="small_business_owner">{t('smallBusinessShopOwner')}</option>
                    <option value="daily_wage_worker">{t('dailyWageWorker')}</option>
                    <option value="retired">{t('retiredSenior')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  {t('notesOptional')}
                </label>
                <input
                  type="text"
                  maxLength={200}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                  {t('saveMember')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
