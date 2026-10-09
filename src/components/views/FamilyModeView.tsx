import React, { useState } from 'react';
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
import { evaluateAllSchemes } from '../../services/eligibilityEngine';
import { SCHEMES_DATABASE } from '../../data/schemesData';

export const FamilyModeView: React.FC = () => {
  const { 
    familyMembers, 
    addFamilyMember, 
    deleteFamilyMember, 
    setSelectedSchemeId, 
    setCurrentView,
    answers,
    settings, 
    t 
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New member state
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<FamilyMember['relationship']>('spouse');
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [occupation, setOccupation] = useState<any>('homemaker');
  const [notes, setNotes] = useState('');

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
        state: answers.state || 'Uttar Pradesh',
        residenceArea: answers.residenceArea || 'rural',
        socialCategory: answers.socialCategory || 'General',
        annualIncomeBracket: answers.annualIncomeBracket || '1lakh_to_2.5lakh',
        hasRationCard: answers.hasRationCard || 'none',
        landholding: answers.landholding || 'none'
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
            {settings.language === 'hi' ? 'पारिवारिक लाभ योजना' : 'Household Welfare Planner'}
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
              {settings.language === 'hi' ? 'परिवार की संयुक्त पात्रता' : 'Aggregated Family Welfare Potential'}
            </h3>
          </div>
          <span className="text-xs font-semibold font-mono tabular-nums text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-200">
            {familyMembers.length} {settings.language === 'hi' ? 'सदस्य' : 'Members Registered'}
          </span>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {settings.language === 'hi'
            ? 'भारतीय कल्याणकारी योजनाएं पूरे परिवार की विभिन्न पीढ़ियों के लिए बनाई गई हैं। अलग-अलग सदस्यों की पात्रता जोड़ने से परिवार को छात्रवृत्ति, मातृत्व लाभ, किसान किस्तें और बुजुर्ग पेंशन एक साथ मिल सकती हैं।'
            : 'Government welfare programs are intergenerational. By planning together, a single household can simultaneously access farm input transfers, scholarships, maternity incentives, and sovereign old age pensions.'}
        </p>
      </div>

      {/* Members Cards List */}
      <div className="space-y-6">
        {familyMembers.map((member) => {
          const evalRes = evaluateAllSchemes(member.profile);
          const topMatches = evalRes.strongMatches.slice(0, 2);

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
                        {member.relationship}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {member.profile.age} yrs · {member.profile.gender} · {member.profile.occupation?.replace(/_/g, ' ')}
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
                    title="Remove member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Matched Schemes for this Member */}
              <div className="pt-3 border-t border-[var(--border-hairline)] space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {settings.language === 'hi' ? 'इस सदस्य के लिए मुख्य योजनाएं:' : 'Top Matched Entitlements for this Member:'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topMatches.map((m) => (
                    <div
                      key={m.scheme.id}
                      onClick={() => handleViewScheme(m.scheme.id)}
                      className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:border-[var(--accent-saffron)] cursor-pointer transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                        <span>{settings.language === 'hi' ? m.scheme.nameHindi : m.scheme.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-saffron)] shrink-0 ml-1" />
                      </div>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                        {settings.language === 'hi' ? m.scheme.benefitHeadlineHindi : m.scheme.benefitHeadline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-scrim no-print">
          <div className="w-full max-w-md glass-modal rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <h3 className="text-lg font-serif font-bold text-[var(--text-primary)]">
              {t('addFamilyMember')}
            </h3>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  Full Name / Relationship Label
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sunita Devi (Spouse)"
                  className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  >
                    <option value="spouse">Spouse (पति/पत्नी)</option>
                    <option value="father">Father (पिता)</option>
                    <option value="mother">Mother (माता)</option>
                    <option value="son">Son (बेटा)</option>
                    <option value="daughter">Daughter (बेटी)</option>
                    <option value="other">Other Relative</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="105"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  >
                    <option value="female">Female (महिला)</option>
                    <option value="male">Male (पुरुष)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--text-primary)] mb-1">
                    Occupation
                  </label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                  >
                    <option value="homemaker">Homemaker</option>
                    <option value="student">Student</option>
                    <option value="farmer">Farmer</option>
                    <option value="artisan_craftsperson">Artisan</option>
                    <option value="small_business_owner">Shop / Business</option>
                    <option value="daily_wage_worker">Wage Worker</option>
                    <option value="retired">Senior / Retired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Undergoing vocational training"
                  className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border-hairline)] text-[var(--text-secondary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[var(--accent-saffron)] text-white font-semibold"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
