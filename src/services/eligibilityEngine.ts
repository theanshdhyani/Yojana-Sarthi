import { Scheme, EvaluatedScheme, MatchStatus } from '../types/scheme';
import { QuestionnaireAnswers } from '../types/questionnaire';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { en, MessageKey } from '../i18n/messages/en';
import { Msg, msg, formatMsg } from '../i18n/format';

/**
 * Rule-based eligibility engine.
 *
 * Every rule on a scheme resolves to exactly one of three outcomes:
 *   - met          → counts fully towards the score
 *   - not met      → a definite mismatch; the scheme is marked `review_required`
 *   - to verify    → cannot be confirmed from the answers (e.g. the income bracket straddles
 *                    the limit); counts half and the scheme is at best a `possible_match`
 *
 * Status therefore has a precise meaning:
 *   strong_match    → every rule is met
 *   possible_match  → nothing fails, but something must be checked at the office
 *   review_required → at least one rule definitely fails (likely not eligible)
 *
 * Reasons are returned as translatable messages (`Msg`), so the UI can show them in any language.
 */

// Inclusive income range (₹/year) covered by each questionnaire bracket.
export const INCOME_RANGES: Record<NonNullable<QuestionnaireAnswers['annualIncomeBracket']>, [number, number]> = {
  below_1lakh: [0, 100000],
  '1lakh_to_2.5lakh': [100000, 250000],
  '2.5lakh_to_5lakh': [250000, 500000],
  '5lakh_to_8lakh': [500000, 800000],
  above_8lakh: [800000, Number.POSITIVE_INFINITY]
};

const LANDHOLDING_MAX_HECTARES: Record<NonNullable<QuestionnaireAnswers['landholding']>, number> = {
  none: 0,
  marginal_less_than_1ha: 1,
  small_1_to_2ha: 2,
  medium_large_above_2ha: Number.POSITIVE_INFINITY
};

// What ticking a household condition already tells us about the member who receives the benefit.
const FLAG_IMPLIES: Record<string, { gender?: 'female'; minAge?: number; maxAge?: number }> = {
  girl_child_under_10: { gender: 'female', maxAge: 10 },
  senior_citizen: { minAge: 60 },
  widow: { gender: 'female' },
  pregnant_lactating: { gender: 'female' }
};

const FLAG_KEYS: Record<string, MessageKey> = {
  disability: 'fDisability',
  widow: 'fWidow',
  girl_child_under_10: 'fGirlChildUnder10',
  pregnant_lactating: 'fPregnantLactating',
  senior_citizen: 'fSeniorCitizen',
  artisan: 'fArtisan',
  artisan_craftsperson: 'fArtisan',
  has_unshaded_rooftop: 'fHasUnshadedRooftop'
};

export const OCCUPATION_KEYS: Record<string, MessageKey> = {
  farmer: 'oFarmer',
  agricultural_labour: 'oAgriculturalLabour',
  artisan_craftsperson: 'oArtisanCraftsperson',
  street_vendor: 'oStreetVendor',
  daily_wage_worker: 'oDailyWageWorker',
  small_business_owner: 'oSmallBusinessOwner',
  student: 'oStudent',
  homemaker: 'oHomemaker',
  salaried_private: 'oSalariedPrivate',
  government_employee: 'oGovernmentEmployee',
  unemployed: 'oUnemployed',
  retired: 'oRetired'
};

const WHO_KEYS: Record<string, MessageKey> = { female: 'eWhoFemale', male: 'eWhoMale', transgender: 'eWhoTransgender' };

const occ = (o: string): Msg | string => (OCCUPATION_KEYS[o] ? msg(OCCUPATION_KEYS[o]) : o.replace(/_/g, ' '));
const flag = (f: string): Msg | string => (FLAG_KEYS[f] ? msg(FLAG_KEYS[f]) : f.replace(/_/g, ' '));
const lakh = (n: number) => msg('eLakh', { n: (n / 100000).toFixed(n % 100000 === 0 ? 0 : 1) });
const ageRange = (min?: number, max?: number): Msg =>
  min !== undefined && max !== undefined
    ? msg('eAgeRange', { min, max })
    : min !== undefined
      ? msg('eAgeMin', { min })
      : msg('eAgeMax', { max: max ?? 0 });

const hasFlag = (answers: QuestionnaireAnswers, f: string): boolean => {
  const userFlags = answers.specialAttributes || [];
  if (userFlags.includes(f)) return true;
  if (f === 'artisan' || f === 'artisan_craftsperson') {
    return userFlags.includes('artisan') || userFlags.includes('artisan_craftsperson') || answers.occupation === 'artisan_craftsperson';
  }
  if (f === 'senior_citizen') return answers.age !== undefined && answers.age >= 60;
  return false;
};

const english = (list: Msg[]) => list.map((m) => formatMsg(en, m));

export function evaluateSchemeEligibility(
  scheme: Scheme,
  answers: QuestionnaireAnswers,
  readyDocumentIds: string[] = []
): EvaluatedScheme {
  const rules = scheme.rules;
  const matched: Msg[] = [];
  const unmet: Msg[] = [];
  const verify: Msg[] = [];

  let total = 0;
  let passed = 0;

  const met = (m: Msg) => {
    total++;
    passed++;
    matched.push(m);
  };
  const fail = (m: Msg) => {
    total++;
    unmet.push(m);
  };
  const check = (m: Msg, credit = 0.5) => {
    total++;
    passed += credit;
    verify.push(m);
  };

  const missingDocuments = scheme.requiredDocuments
    .filter((d) => d.isMandatory && !readyDocumentIds.includes(d.id))
    .map((d) => d.name);

  const result = (status: MatchStatus, matchScore: number): EvaluatedScheme => {
    const shownMatched = matched.length > 0 ? matched : [msg('eOpenToAll')];
    return {
      scheme,
      status,
      matchScore,
      matched: shownMatched,
      unmet,
      verify,
      matchedReasons: english(shownMatched),
      unmetCriteria: english(unmet),
      toVerify: english(verify),
      missingDocuments
    };
  };

  // 0. Universal age-based coverage overrides every other rule (e.g. PM-JAY for all 70+).
  if (rules.universalFromAge !== undefined && answers.age !== undefined && answers.age >= rules.universalFromAge) {
    matched.push(msg('eUniversalAge', { minAge: rules.universalFromAge, age: answers.age }));
    return result('strong_match', 100);
  }

  // A benefit meant for a household member (daughter, widow, elder, mother) applies when the
  // applicant ticked that member's condition; age/gender limits then describe the member.
  const memberFlag =
    rules.beneficiaryIsHouseholdMember && rules.specialFlags
      ? rules.specialFlags.find((f) => (answers.specialAttributes || []).includes(f))
      : undefined;
  const implied = memberFlag ? FLAG_IMPLIES[memberFlag] ?? {} : undefined;
  const member = memberFlag ? flag(memberFlag) : '';

  // 1. Age
  if (rules.minAge !== undefined || rules.maxAge !== undefined) {
    const range = ageRange(rules.minAge, rules.maxAge);
    if (implied) {
      const minOk = rules.minAge === undefined || (implied.minAge !== undefined && implied.minAge >= rules.minAge);
      const maxOk = rules.maxAge === undefined || (implied.maxAge !== undefined && implied.maxAge <= rules.maxAge);
      if (minOk && maxOk) met(msg('eMemberAgeMet', { member, range }));
      else check(msg('eMemberAgeCheck', { member, range }));
    } else if (answers.age === undefined) {
      check(msg('eAgeMissing', { range }), 0);
    } else if ((rules.minAge === undefined || answers.age >= rules.minAge) && (rules.maxAge === undefined || answers.age <= rules.maxAge)) {
      met(msg('eAgeMet', { age: answers.age, range }));
    } else {
      fail(msg('eAgeFail', { range, age: answers.age }));
    }
  }

  // 2. Gender
  if (rules.gender && rules.gender !== 'all') {
    const who = msg(WHO_KEYS[rules.gender]);
    if (implied && implied.gender === rules.gender) met(msg('eMemberGenderMet', { member }));
    else if (implied) check(msg('eMemberGenderCheck', { who }));
    else if (answers.gender === undefined) check(msg('eGenderMissing', { who }), 0);
    else if (answers.gender === rules.gender) met(msg('eGenderMet', { who }));
    else fail(msg('eGenderFail', { who }));
  }

  // 3. Occupation (required list)
  if (rules.occupations && rules.occupations.length > 0) {
    const list = rules.occupations.map(occ);
    if (!answers.occupation) check(msg('eOccMissing', { list: asList(list) }), 0);
    else if (rules.occupations.includes(answers.occupation)) met(msg('eOccMet', { occ: occ(answers.occupation) }));
    else fail(msg('eOccFail', { list: asList(list) }));
  }

  // 4. Occupation (exclusions)
  if (rules.excludedOccupations && answers.occupation && rules.excludedOccupations.includes(answers.occupation)) {
    fail(msg('eOccExcluded', { occ: occ(answers.occupation) }));
  }

  // 5. Income — compare the whole bracket, not one point inside it.
  if (rules.maxAnnualIncome !== undefined) {
    const limit = lakh(rules.maxAnnualIncome);
    if (!answers.annualIncomeBracket) {
      check(msg('eIncomeMissing', { limit }), 0);
    } else {
      const [min, max] = INCOME_RANGES[answers.annualIncomeBracket];
      if (max <= rules.maxAnnualIncome) met(msg('eIncomeMet', { limit }));
      else if (min >= rules.maxAnnualIncome) fail(msg('eIncomeFail', { limit }));
      else check(msg('eIncomeCheck', { limit }));
    }
  }

  // 6. Landholding
  if (rules.requiresLandholding) {
    if (!answers.landholding) check(msg('eLandMissing'), 0);
    else if (answers.landholding === 'none') fail(msg('eLandNone'));
    else if (rules.maxLandholdingHectares !== undefined && LANDHOLDING_MAX_HECTARES[answers.landholding] > rules.maxLandholdingHectares)
      fail(msg('eLandCeiling', { ha: rules.maxLandholdingHectares }));
    else met(msg('eLandMet'));
  }

  // 7. Social category
  if (rules.categories && rules.categories.length > 0) {
    const list = rules.categories.join(', ');
    if (!answers.socialCategory) check(msg('eCatMissing', { list }), 0);
    else if (rules.categories.includes(answers.socialCategory)) met(msg('eCatMet', { cat: answers.socialCategory }));
    else fail(msg('eCatFail', { list }));
  }

  // 8. Rural / urban
  if (rules.residence && rules.residence !== 'both') {
    const area = msg(rules.residence === 'rural' ? 'eAreaRural' : 'eAreaUrban');
    if (!answers.residenceArea) check(msg('eAreaMissing', { area }), 0);
    else if (answers.residenceArea === rules.residence) met(msg('eAreaMet', { area }));
    else fail(msg('eAreaFail', { area }));
  }

  // 9. BPL / priority household
  if (rules.requiresBPL) {
    const card = answers.hasRationCard;
    const lowIncome = answers.annualIncomeBracket === 'below_1lakh' || answers.annualIncomeBracket === '1lakh_to_2.5lakh';
    if (card === 'bpl' || card === 'aay_antyodaya') met(msg('eBplMet'));
    else if (lowIncome || card === undefined) check(msg('eBplCheck'));
    else fail(msg('eBplFail'));
  }

  // 10. Special conditions
  for (const f of rules.specialFlags || []) {
    if (hasFlag(answers, f)) met(msg('eFlagMet', { flag: flag(f) }));
    else fail(msg('eFlagFail', { flag: flag(f) }));
  }

  // 11. State-specific schemes
  if (rules.statesSupported && rules.statesSupported.length > 0) {
    const list = rules.statesSupported.join(', ');
    if (!answers.state) check(msg('eStateMissing', { list }), 0);
    else if (rules.statesSupported.some((s) => s.toLowerCase() === answers.state!.toLowerCase())) met(msg('eStateMet', { state: answers.state }));
    else fail(msg('eStateFail', { list }));
  }

  const matchScore = total > 0 ? Math.round((passed / total) * 100) : 100;
  const status: MatchStatus = unmet.length > 0 ? 'review_required' : verify.length > 0 ? 'possible_match' : 'strong_match';
  return result(status, matchScore);
}

/** A list of labels joined with the language's separator. */
function asList(items: (Msg | string)[]): Msg[] | string {
  return items.every((i) => typeof i !== 'string') ? (items as Msg[]) : items.map((i) => (typeof i === 'string' ? i : formatMsg(en, i))).join(', ');
}

export interface EvaluationSummary {
  strongMatches: EvaluatedScheme[];
  possibleMatches: EvaluatedScheme[];
  reviewRequired: EvaluatedScheme[];
}

export function evaluateAllSchemes(
  answers: QuestionnaireAnswers,
  readyDocumentIds: string[] = [],
  schemes: Scheme[] = SCHEMES_DATABASE
): EvaluationSummary {
  const evaluated = schemes
    .map((s) => evaluateSchemeEligibility(s, answers, readyDocumentIds))
    .sort((a, b) => b.matchScore - a.matchScore);

  return {
    strongMatches: evaluated.filter((e) => e.status === 'strong_match'),
    possibleMatches: evaluated.filter((e) => e.status === 'possible_match'),
    reviewRequired: evaluated.filter((e) => e.status === 'review_required')
  };
}
