import { QuestionnaireAnswers } from '../types/questionnaire';
import { TrackedApplication } from '../types/tracker';
import { FamilyMember } from '../types/family';
import { UserPreferences } from '../types/settings';

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
    try {
      const raw = localStorage.getItem(KEYS.ANSWERS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  saveAnswers(answers: QuestionnaireAnswers): void {
    try {
      localStorage.setItem(KEYS.ANSWERS, JSON.stringify(answers));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getReadyDocuments(): string[] {
    try {
      const raw = localStorage.getItem(KEYS.READY_DOCS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveReadyDocuments(docs: string[]): void {
    try {
      localStorage.setItem(KEYS.READY_DOCS, JSON.stringify(docs));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getApplications(): TrackedApplication[] {
    try {
      const raw = localStorage.getItem(KEYS.TRACKER);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveApplications(apps: TrackedApplication[]): void {
    try {
      localStorage.setItem(KEYS.TRACKER, JSON.stringify(apps));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getFamilyMembers(): FamilyMember[] {
    try {
      const raw = localStorage.getItem(KEYS.FAMILY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveFamilyMembers(members: FamilyMember[]): void {
    try {
      localStorage.setItem(KEYS.FAMILY, JSON.stringify(members));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  getSettings(): UserPreferences {
    try {
      const raw = localStorage.getItem(KEYS.SETTINGS);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }

    return {
      language: 'en',
      simpleLanguageMode: false,
      fontSize: 'normal',
      highContrast: false,
      reducedMotion: false,
      theme: 'light',
      voiceSpeed: 1.0
    };
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
