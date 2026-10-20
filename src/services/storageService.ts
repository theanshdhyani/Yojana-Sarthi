import { QuestionnaireAnswers } from '../types/questionnaire';
import { TrackedApplication, ApplicationStatus } from '../types/tracker';
import { FamilyMember } from '../types/family';
import { UserPreferences } from '../types/settings';
import { safeExternalUrl } from '../utils/safeUrl';

// ---------------------------------------------------------------------------
// Validation: localStorage is user-controlled, so nothing read back from it is
// trusted. Each reader rebuilds a clean object from known fields only; anything
// malformed is dropped rather than crashing the app or reaching the DOM.
// ---------------------------------------------------------------------------

const MAX_TEXT = 500;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown, max = MAX_TEXT): string | undefined => (typeof v === 'string' ? v.slice(0, max) : undefined);
const oneOf = <T extends string>(v: unknown, allowed: readonly T[]): T | undefined =>
  typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : undefined;

const GENDERS = ['male', 'female', 'transgender'] as const;
const AREAS = ['rural', 'urban'] as const;
const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'] as const;
const OCCUPATIONS = [
  'farmer', 'agricultural_labour', 'artisan_craftsperson', 'street_vendor', 'daily_wage_worker',
  'small_business_owner', 'student', 'homemaker', 'salaried_private', 'government_employee', 'unemployed', 'retired'
] as const;
const INCOMES = ['below_1lakh', '1lakh_to_2.5lakh', '2.5lakh_to_5lakh', '5lakh_to_8lakh', 'above_8lakh'] as const;
const LAND = ['none', 'marginal_less_than_1ha', 'small_1_to_2ha', 'medium_large_above_2ha'] as const;
const RATION = ['none', 'apl', 'bpl', 'aay_antyodaya'] as const;
const STATUSES: readonly ApplicationStatus[] = ['to_apply', 'under_review', 'approved', 'action_required', 'rejected'];
const RELATIONSHIPS = ['self', 'spouse', 'father', 'mother', 'son', 'daughter', 'other'] as const;

export function sanitizeAnswers(raw: unknown): QuestionnaireAnswers {
  if (!isObj(raw)) return {};
  const out: QuestionnaireAnswers = {};
  if (typeof raw.age === 'number' && Number.isInteger(raw.age) && raw.age >= 1 && raw.age <= 120) out.age = raw.age;
  out.gender = oneOf(raw.gender, GENDERS);
  out.state = str(raw.state, 80);
  out.residenceArea = oneOf(raw.residenceArea, AREAS);
  out.socialCategory = oneOf(raw.socialCategory, CATEGORIES);
  out.occupation = oneOf(raw.occupation, OCCUPATIONS);
  out.annualIncomeBracket = oneOf(raw.annualIncomeBracket, INCOMES);
  out.landholding = oneOf(raw.landholding, LAND);
  out.hasRationCard = oneOf(raw.hasRationCard, RATION);
  if (Array.isArray(raw.specialAttributes)) {
    out.specialAttributes = raw.specialAttributes.filter((x): x is string => typeof x === 'string' && x.length <= 40).slice(0, 20);
  }
  (Object.keys(out) as (keyof QuestionnaireAnswers)[]).forEach((k) => out[k] === undefined && delete out[k]);
  return out;
}

function sanitizeApplication(raw: unknown): TrackedApplication | null {
  if (!isObj(raw)) return null;
  const id = str(raw.id, 64);
  const schemeId = str(raw.schemeId, 64);
  const schemeName = str(raw.schemeName, 200);
  const status = oneOf(raw.status, STATUSES);
  if (!id || !schemeId || !schemeName || !status) return null;
  const timeline = Array.isArray(raw.timeline)
    ? raw.timeline
        .filter(isObj)
        .map((e) => ({ date: str(e.date, 20) ?? '', title: str(e.title, 200) ?? '', description: str(e.description) ?? '' }))
        .slice(0, 100)
    : [];
  return {
    id,
    schemeId,
    schemeName,
    schemeNameHindi: str(raw.schemeNameHindi, 200) ?? schemeName,
    beneficiaryName: str(raw.beneficiaryName, 100) ?? '',
    referenceNumber: str(raw.referenceNumber, 64) ?? '',
    appliedDate: str(raw.appliedDate, 20) ?? '',
    status,
    portalUrl: safeExternalUrl(raw.portalUrl),
    notes: str(raw.notes),
    timeline,
    lastUpdated: str(raw.lastUpdated, 20) ?? ''
  };
}

function sanitizeFamilyMember(raw: unknown): FamilyMember | null {
  if (!isObj(raw)) return null;
  const id = str(raw.id, 64);
  const name = str(raw.name, 100);
  const relationship = oneOf(raw.relationship, RELATIONSHIPS);
  if (!id || !name || !relationship) return null;
  return { id, name, relationship, profile: sanitizeAnswers(raw.profile), notes: str(raw.notes) };
}

const DEFAULT_SETTINGS: UserPreferences = {
  language: 'en',
  simpleLanguageMode: false,
  fontSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  theme: 'light',
  voiceSpeed: 1.0
};

function sanitizeSettings(raw: unknown): UserPreferences {
  if (!isObj(raw)) return { ...DEFAULT_SETTINGS };
  const speed = typeof raw.voiceSpeed === 'number' ? Math.min(1.2, Math.max(0.8, raw.voiceSpeed)) : DEFAULT_SETTINGS.voiceSpeed;
  return {
    language: oneOf(raw.language, ['en', 'hi'] as const) ?? DEFAULT_SETTINGS.language,
    simpleLanguageMode: raw.simpleLanguageMode === true,
    fontSize: oneOf(raw.fontSize, ['normal', 'large', 'extra-large'] as const) ?? DEFAULT_SETTINGS.fontSize,
    highContrast: raw.highContrast === true,
    reducedMotion: raw.reducedMotion === true,
    theme: oneOf(raw.theme, ['light', 'dark'] as const) ?? DEFAULT_SETTINGS.theme,
    voiceSpeed: speed
  };
}

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

const KEYS = {
  ANSWERS: 'yojana_sarthi_answers_v1',
  READY_DOCS: 'yojana_sarthi_ready_docs_v1',
  TRACKER: 'yojana_sarthi_tracker_v1',
  FAMILY: 'yojana_sarthi_family_v1',
  SETTINGS: 'yojana_sarthi_settings_v1',
  ONBOARDING_SEEN: 'yojana_sarthi_onboarding_v1',
  IS_DEMO: 'yojana_sarthi_is_demo_v1'
};

export const SAMPLE_DEMO_DATA = {
  answers: {
    age: 42,
    gender: 'male' as const,
    state: 'Uttar Pradesh',
    residenceArea: 'rural' as const,
    socialCategory: 'OBC' as const,
    occupation: 'farmer' as const,
    annualIncomeBracket: '1lakh_to_2.5lakh' as const,
    landholding: 'small_1_to_2ha' as const,
    hasRationCard: 'bpl' as const,
    specialAttributes: []
  },
  readyDocuments: ['doc_aadhaar', 'doc_bank_passbook', 'doc_land_records'],
  applications: [
    {
      id: 'app_seed_01',
      schemeId: 'pm-kisan',
      schemeName: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      schemeNameHindi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
      beneficiaryName: 'Rameshwar Lal',
      referenceNumber: 'UP-PMK-2026-904128',
      appliedDate: '2026-08-14',
      status: 'approved' as const,
      portalUrl: 'https://pmkisan.gov.in',
      notes: 'Land record physical verification completed by Lekhpal on 18 Aug. 17th installment credited.',
      timeline: [
        { date: '2026-08-14', title: 'Application Submitted', description: 'Filed online via CSC Center' },
        { date: '2026-08-20', title: 'Revenue Record Verified', description: 'Patwari confirmed Khasra 142/1' },
        { date: '2026-09-02', title: 'State Nodal Approval', description: 'DBT mandate registered with NPCI' }
      ],
      lastUpdated: '2026-09-02'
    },
    {
      id: 'app_seed_02',
      schemeId: 'ayushman-bharat-pmjay',
      schemeName: 'Ayushman Bharat PM-JAY',
      schemeNameHindi: 'आयुष्मान भारत पीएम-जय',
      beneficiaryName: 'Smt. Shanti Devi',
      referenceNumber: 'AB-PMJAY-8830114',
      appliedDate: '2026-09-12',
      status: 'under_review' as const,
      portalUrl: 'https://beneficiary.nha.gov.in',
      notes: 'e-KYC verified via Face Auth. Awaiting district health officer card generation batch.',
      timeline: [
        { date: '2026-09-12', title: 'eKYC Generated', description: 'Aadhaar face authentication successful' },
        { date: '2026-09-16', title: 'District Queue', description: 'Under verification against SECC database' }
      ],
      lastUpdated: '2026-09-16'
    }
  ],
  familyMembers: [
    {
      id: 'fam_01',
      name: 'Rameshwar Lal',
      relationship: 'self' as const,
      profile: {
        age: 48,
        gender: 'male' as const,
        occupation: 'farmer' as const,
        landholding: 'small_1_to_2ha' as const,
        socialCategory: 'OBC' as const,
        annualIncomeBracket: '1lakh_to_2.5lakh' as const,
        hasRationCard: 'bpl' as const
      },
      notes: 'Small landholder cultivating wheat and mustard'
    },
    {
      id: 'fam_02',
      name: 'Shanti Devi',
      relationship: 'spouse' as const,
      profile: {
        age: 44,
        gender: 'female' as const,
        occupation: 'homemaker' as const,
        socialCategory: 'OBC' as const,
        annualIncomeBracket: '1lakh_to_2.5lakh' as const,
        hasRationCard: 'bpl' as const
      },
      notes: 'Homemaker running small dairy unit'
    },
    {
      id: 'fam_03',
      name: 'Anjali Kumari',
      relationship: 'daughter' as const,
      profile: {
        age: 19,
        gender: 'female' as const,
        occupation: 'student' as const,
        socialCategory: 'OBC' as const,
        annualIncomeBracket: '1lakh_to_2.5lakh' as const
      },
      notes: 'Undergraduate BSc 2nd year student'
    },
    {
      id: 'fam_04',
      name: 'Shivcharan Lal',
      relationship: 'father' as const,
      profile: {
        age: 72,
        gender: 'male' as const,
        occupation: 'retired' as const,
        socialCategory: 'OBC' as const,
        annualIncomeBracket: 'below_1lakh' as const,
        hasRationCard: 'bpl' as const,
        specialAttributes: ['senior_citizen']
      },
      notes: 'Elderly father requiring regular medical checks'
    }
  ]
};

export const StorageService = {
  getAnswers(): QuestionnaireAnswers {
    return sanitizeAnswers(readJson(KEYS.ANSWERS));
  },

  saveAnswers(answers: QuestionnaireAnswers): void {
    try {
      localStorage.setItem(KEYS.ANSWERS, JSON.stringify(answers));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getReadyDocuments(): string[] {
    const raw = readJson(KEYS.READY_DOCS);
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string' && x.length <= 64).slice(0, 100) : [];
  },

  saveReadyDocuments(docs: string[]): void {
    try {
      localStorage.setItem(KEYS.READY_DOCS, JSON.stringify(docs));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getApplications(): TrackedApplication[] {
    const raw = readJson(KEYS.TRACKER);
    return Array.isArray(raw)
      ? raw.map(sanitizeApplication).filter((a): a is TrackedApplication => a !== null).slice(0, 200)
      : [];
  },

  saveApplications(apps: TrackedApplication[]): void {
    try {
      localStorage.setItem(KEYS.TRACKER, JSON.stringify(apps));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getFamilyMembers(): FamilyMember[] {
    const raw = readJson(KEYS.FAMILY);
    return Array.isArray(raw)
      ? raw.map(sanitizeFamilyMember).filter((m): m is FamilyMember => m !== null).slice(0, 30)
      : [];
  },

  saveFamilyMembers(members: FamilyMember[]): void {
    try {
      localStorage.setItem(KEYS.FAMILY, JSON.stringify(members));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getSettings(): UserPreferences {
    return sanitizeSettings(readJson(KEYS.SETTINGS));
  },

  defaultSettings(): UserPreferences {
    return { ...DEFAULT_SETTINGS };
  },

  saveSettings(settings: UserPreferences): void {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  hasSeenOnboarding(): boolean {
    try {
      return localStorage.getItem(KEYS.ONBOARDING_SEEN) === 'true';
    } catch {
      return false;
    }
  },

  setOnboardingSeen(seen: boolean): void {
    try {
      localStorage.setItem(KEYS.ONBOARDING_SEEN, seen ? 'true' : 'false');
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  isDemoMode(): boolean {
    try {
      return localStorage.getItem(KEYS.IS_DEMO) === 'true';
    } catch {
      return false;
    }
  },

  setDemoMode(isDemo: boolean): void {
    try {
      if (isDemo) {
        localStorage.setItem(KEYS.IS_DEMO, 'true');
      } else {
        localStorage.removeItem(KEYS.IS_DEMO);
      }
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  clearAllData(): void {
    try {
      Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.warn('Clear data failed:', e);
    }
  },

  loadSampleDemoData(): void {
    try {
      this.saveAnswers(SAMPLE_DEMO_DATA.answers);
      this.saveReadyDocuments(SAMPLE_DEMO_DATA.readyDocuments);
      this.saveApplications(SAMPLE_DEMO_DATA.applications);
      this.saveFamilyMembers(SAMPLE_DEMO_DATA.familyMembers);
      this.setDemoMode(true);
    } catch (e) {
      console.warn('Loading sample demo data failed:', e);
    }
  },

  exportAllData(): string {
    const backup = {
      answers: this.getAnswers(),
      readyDocuments: this.getReadyDocuments(),
      applications: this.getApplications(),
      family: this.getFamilyMembers(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  }
};
