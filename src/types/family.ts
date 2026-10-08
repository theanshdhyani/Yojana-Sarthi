import { QuestionnaireAnswers } from './questionnaire';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'self' | 'spouse' | 'father' | 'mother' | 'son' | 'daughter' | 'other';
  profile: QuestionnaireAnswers;
  notes?: string;
}

export interface HouseholdProfile {
  headOfHousehold: string;
  residenceArea: 'rural' | 'urban';
  state: string;
  district?: string;
  members: FamilyMember[];
}
