import type { Msg } from '../i18n/format';

export type SchemeCategory =
  | 'agriculture'
  | 'health'
  | 'housing'
  | 'women_children'
  | 'education'
  | 'livelihood_business'
  | 'social_security'
  | 'clean_energy';

export type BenefitType =
  | 'cash_transfer'
  | 'subsidized_loan'
  | 'health_cover'
  | 'asset_subsidy'
  | 'pension'
  | 'scholarship'
  | 'employment_guarantee';

export interface RequiredDocumentRef {
  id: string;
  name: string;
  nameHindi: string;
  isMandatory: boolean;
  purpose: string;
  purposeHindi: string;
}

export interface SchemeEligibilityRules {
  minAge?: number;
  maxAge?: number;
  gender?: 'all' | 'female' | 'male' | 'transgender';
  occupations?: string[];
  maxAnnualIncome?: number; // In INR
  categories?: ('General' | 'OBC' | 'SC' | 'ST' | 'EWS')[];
  residence?: 'rural' | 'urban' | 'both';
  requiresLandholding?: boolean;
  maxLandholdingHectares?: number;
  requiresBPL?: boolean;
  specialFlags?: string[]; // 'disability', 'widow', 'girl_child', 'senior_citizen', 'street_vendor', 'artisan', 'rooftop_access', 'pregnant_lactating'
  statesSupported?: string[]; // empty means all India
  excludedOccupations?: string[]; // e.g. serving government employees are excluded from PM-KISAN
  // Benefit goes to a household member (daughter, widow, mother, elder) rather than the
  // person filling the form, so age/gender limits describe that member, not the applicant.
  beneficiaryIsHouseholdMember?: boolean;
  // Everyone at or above this age qualifies regardless of other criteria (e.g. PM-JAY 70+).
  universalFromAge?: number;
}

export interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  shortCode: string;
  ministry: string;
  ministryHindi: string;
  category: SchemeCategory;
  categoryLabel: string;
  categoryLabelHindi: string;
  benefitType: BenefitType;
  benefitHeadline: string;
  benefitHeadlineHindi: string;
  summary: string;
  summaryHindi: string;
  simpleLanguageSummary: string;
  simpleLanguageSummaryHindi: string;
  fullDescription: string;
  fullDescriptionHindi: string;
  eligibilityDescription: string;
  eligibilityDescriptionHindi: string;
  rules: SchemeEligibilityRules;
  requiredDocuments: RequiredDocumentRef[];
  applicationSteps: {
    stepNumber: number;
    title: string;
    titleHindi: string;
    description: string;
    descriptionHindi: string;
    portalAction?: string;
  }[];
  officialPortalUrl: string;
  helplinePhone: string;
  commonRejectionReasons: {
    title: string;
    titleHindi: string;
    tip: string;
    tipHindi: string;
  }[];
  verificationAgency: string;
  verificationAgencyHindi: string;
  processingTimeDays: number;
}

export type MatchStatus = 'strong_match' | 'possible_match' | 'review_required';

export interface EvaluatedScheme {
  scheme: Scheme;
  status: MatchStatus;
  matchScore: number; // 0 to 100
  /** Translatable reasons, rendered in the user's language by the UI. */
  matched: Msg[];
  unmet: Msg[];
  // Criteria that could not be confirmed from the answers and need checking at the office.
  verify: Msg[];
  /** The same reasons in English (print slip, tests, logs). */
  matchedReasons: string[];
  unmetCriteria: string[];
  toVerify: string[];
  missingDocuments: string[];
}
