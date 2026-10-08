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
  matchedReasons: string[];
  matchedReasonsHindi: string[];
  unmetCriteria: string[];
  unmetCriteriaHindi: string[];
  missingDocuments: string[];
}
