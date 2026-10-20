import { describe, it, expect } from 'vitest';
import { evaluateSchemeEligibility, evaluateAllSchemes } from './eligibilityEngine';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { QuestionnaireAnswers } from '../types/questionnaire';

const scheme = (id: string) => {
  const s = SCHEMES_DATABASE.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown scheme ${id}`);
  return s;
};

const farmer: QuestionnaireAnswers = {
  age: 42,
  gender: 'male',
  state: 'Uttar Pradesh',
  residenceArea: 'rural',
  socialCategory: 'OBC',
  occupation: 'farmer',
  annualIncomeBracket: '1lakh_to_2.5lakh',
  landholding: 'small_1_to_2ha',
  hasRationCard: 'bpl',
  specialAttributes: []
};

describe('income limits', () => {
  it('passes when the whole bracket is under the limit', () => {
    const r = evaluateSchemeEligibility(scheme('pm-kisan'), farmer);
    expect(r.status).toBe('strong_match');
    expect(r.unmetCriteria).toHaveLength(0);
  });

  it('does not reject someone whose bracket straddles the limit (old bug: bracket mapped to its upper bound)', () => {
    // Widow pension limit is ₹1.2L; the ₹1–2.5L bracket includes eligible incomes like ₹1.1L.
    const r = evaluateSchemeEligibility(scheme('nsap-widow-pension'), {
      ...farmer,
      gender: 'female',
      age: 45,
      occupation: 'homemaker',
      specialAttributes: ['widow']
    });
    expect(r.status).toBe('possible_match');
    expect(r.unmetCriteria).toHaveLength(0);
    expect(r.toVerify.some((v) => v.includes('1.2 Lakh'))).toBe(true);
  });

  it('rejects when the whole bracket is above the limit', () => {
    const r = evaluateSchemeEligibility(scheme('pm-ujjwala-yojana'), {
      ...farmer,
      gender: 'female',
      annualIncomeBracket: '5lakh_to_8lakh'
    });
    expect(r.status).toBe('review_required');
  });
});

describe('household-member schemes', () => {
  it('matches Sukanya Samriddhi for a parent with a daughter under 10 (old bug: applicant age was checked)', () => {
    const r = evaluateSchemeEligibility(scheme('sukanya-samriddhi-yojana'), {
      ...farmer,
      age: 34,
      specialAttributes: ['girl_child_under_10']
    });
    expect(r.status).toBe('strong_match');
  });

  it('does not match Sukanya Samriddhi without a daughter under 10', () => {
    const r = evaluateSchemeEligibility(scheme('sukanya-samriddhi-yojana'), farmer);
    expect(r.status).toBe('review_required');
  });

  it('matches old-age pension for a household with an elder even if the applicant is young', () => {
    const r = evaluateSchemeEligibility(scheme('nsap-old-age-pension'), {
      ...farmer,
      age: 30,
      annualIncomeBracket: 'below_1lakh',
      specialAttributes: ['senior_citizen']
    });
    expect(r.unmetCriteria).toHaveLength(0);
  });
});

describe('special rules', () => {
  it('excludes serving government employees from PM-KISAN', () => {
    const r = evaluateSchemeEligibility(scheme('pm-kisan'), { ...farmer, occupation: 'government_employee' });
    expect(r.status).toBe('review_required');
  });

  it('covers every citizen aged 70+ under PM-JAY regardless of income', () => {
    const r = evaluateSchemeEligibility(scheme('ayushman-bharat-pmjay'), {
      ...farmer,
      age: 72,
      annualIncomeBracket: 'above_8lakh',
      hasRationCard: 'none'
    });
    expect(r.status).toBe('strong_match');
    expect(r.matchScore).toBe(100);
  });

  it('asks for BPL verification instead of silently passing low-income households without a BPL card', () => {
    const r = evaluateSchemeEligibility(scheme('ayushman-bharat-pmjay'), { ...farmer, hasRationCard: 'apl' });
    expect(r.status).toBe('possible_match');
  });

  it('treats unanswered questions as "to verify", never as a pass', () => {
    const r = evaluateSchemeEligibility(scheme('pm-kisan'), {});
    expect(r.status).toBe('possible_match');
    expect(r.matchScore).toBe(0);
  });
});

describe('evaluateAllSchemes', () => {
  it('puts every scheme in exactly one bucket', () => {
    const { strongMatches, possibleMatches, reviewRequired } = evaluateAllSchemes(farmer);
    expect(strongMatches.length + possibleMatches.length + reviewRequired.length).toBe(SCHEMES_DATABASE.length);
  });

  it('only strong matches have zero unmet and zero to-verify criteria', () => {
    const { strongMatches } = evaluateAllSchemes(farmer);
    for (const m of strongMatches) {
      expect(m.unmetCriteria).toHaveLength(0);
      expect(m.toVerify).toHaveLength(0);
    }
  });

  it('lists missing mandatory documents separately from eligibility', () => {
    const r = evaluateSchemeEligibility(scheme('pm-kisan'), farmer, []);
    const ready = evaluateSchemeEligibility(
      scheme('pm-kisan'),
      farmer,
      scheme('pm-kisan').requiredDocuments.map((d) => d.id)
    );
    expect(r.missingDocuments.length).toBeGreaterThan(0);
    expect(ready.missingDocuments).toHaveLength(0);
    expect(r.status).toBe(ready.status);
  });
});
