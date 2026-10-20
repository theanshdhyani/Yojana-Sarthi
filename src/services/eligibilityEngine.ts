import { Scheme, EvaluatedScheme, MatchStatus } from '../types/scheme';
import { QuestionnaireAnswers } from '../types/questionnaire';
import { SCHEMES_DATABASE } from '../data/schemesData';

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

const FLAG_LABELS: Record<string, { en: string; hi: string }> = {
  disability: { en: 'person with disability', hi: 'दिव्यांग सदस्य' },
  widow: { en: 'widowed woman', hi: 'विधवा महिला' },
  girl_child_under_10: { en: 'daughter under 10 years', hi: '10 वर्ष से कम आयु की बेटी' },
  pregnant_lactating: { en: 'pregnant or lactating mother', hi: 'गर्भवती/धात्री माता' },
  senior_citizen: { en: 'senior citizen (60+)', hi: 'वरिष्ठ नागरिक (60+)' },
  artisan: { en: 'traditional artisan', hi: 'पारंपरिक कारीगर' },
  has_unshaded_rooftop: { en: 'unshaded rooftop', hi: 'धूप वाली छत' }
};

const OCCUPATION_LABELS_HI: Record<string, string> = {
  farmer: 'किसान',
  agricultural_labour: 'खेतिहर मजदूर',
  artisan_craftsperson: 'कारीगर',
  street_vendor: 'स्ट्रीट वेंडर',
  daily_wage_worker: 'दिहाड़ी मजदूर',
  small_business_owner: 'छोटा व्यापारी',
  student: 'विद्यार्थी',
  homemaker: 'गृहिणी',
  salaried_private: 'निजी नौकरी',
  government_employee: 'सरकारी कर्मचारी',
  unemployed: 'बेरोजगार',
  retired: 'सेवानिवृत्त'
};

const lakh = (n: number) => `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} Lakh`;
const lakhHi = (n: number) => `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} लाख`;
const occEn = (o: string) => o.replace(/_/g, ' ');
const occHi = (o: string) => OCCUPATION_LABELS_HI[o] ?? occEn(o);
const flagEn = (f: string) => FLAG_LABELS[f]?.en ?? f.replace(/_/g, ' ');
const flagHi = (f: string) => FLAG_LABELS[f]?.hi ?? f.replace(/_/g, ' ');
const ageRangeEn = (min?: number, max?: number) =>
  min !== undefined && max !== undefined ? `${min}–${max} years` : min !== undefined ? `${min}+ years` : `up to ${max} years`;
const ageRangeHi = (min?: number, max?: number) =>
  min !== undefined && max !== undefined ? `${min}–${max} वर्ष` : min !== undefined ? `${min}+ वर्ष` : `${max} वर्ष तक`;

const hasFlag = (answers: QuestionnaireAnswers, flag: string): boolean => {
  const userFlags = answers.specialAttributes || [];
  if (userFlags.includes(flag)) return true;
  if (flag === 'artisan' || flag === 'artisan_craftsperson') {
    return userFlags.includes('artisan') || userFlags.includes('artisan_craftsperson') || answers.occupation === 'artisan_craftsperson';
  }
  if (flag === 'senior_citizen') return answers.age !== undefined && answers.age >= 60;
  return false;
};

export function evaluateSchemeEligibility(
  scheme: Scheme,
  answers: QuestionnaireAnswers,
  readyDocumentIds: string[] = []
): EvaluatedScheme {
  const rules = scheme.rules;
  const matched: string[] = [];
  const matchedHi: string[] = [];
  const unmet: string[] = [];
  const unmetHi: string[] = [];
  const verify: string[] = [];
  const verifyHi: string[] = [];

  let total = 0;
  let passed = 0;

  const met = (en: string, hi: string) => {
    total++;
    passed++;
    matched.push(en);
    matchedHi.push(hi);
  };
  const fail = (en: string, hi: string) => {
    total++;
    unmet.push(en);
    unmetHi.push(hi);
  };
  const check = (en: string, hi: string, credit = 0.5) => {
    total++;
    passed += credit;
    verify.push(en);
    verifyHi.push(hi);
  };

  const missingDocuments = scheme.requiredDocuments
    .filter((d) => d.isMandatory && !readyDocumentIds.includes(d.id))
    .map((d) => d.name);

  // 0. Universal age-based coverage overrides every other rule (e.g. PM-JAY for all 70+).
  if (rules.universalFromAge !== undefined && answers.age !== undefined && answers.age >= rules.universalFromAge) {
    return {
      scheme,
      status: 'strong_match',
      matchScore: 100,
      matchedReasons: [`All citizens aged ${rules.universalFromAge}+ are covered regardless of income (you entered ${answers.age})`],
      matchedReasonsHindi: [`${rules.universalFromAge}+ आयु के सभी नागरिक आय की परवाह किए बिना पात्र हैं (आपकी आयु ${answers.age})`],
      unmetCriteria: [],
      unmetCriteriaHindi: [],
      toVerify: [],
      toVerifyHindi: [],
      missingDocuments
    };
  }

  // A benefit meant for a household member (daughter, widow, elder, mother) applies when the
  // applicant ticked that member's condition; age/gender limits then describe the member.
  const memberFlag =
    rules.beneficiaryIsHouseholdMember && rules.specialFlags
      ? rules.specialFlags.find((f) => (answers.specialAttributes || []).includes(f))
      : undefined;
  const implied = memberFlag ? FLAG_IMPLIES[memberFlag] ?? {} : undefined;

  // 1. Age
  if (rules.minAge !== undefined || rules.maxAge !== undefined) {
    const range = ageRangeEn(rules.minAge, rules.maxAge);
    const rangeHi = ageRangeHi(rules.minAge, rules.maxAge);
    if (implied) {
      const minOk = rules.minAge === undefined || (implied.minAge !== undefined && implied.minAge >= rules.minAge);
      const maxOk = rules.maxAge === undefined || (implied.maxAge !== undefined && implied.maxAge <= rules.maxAge);
      if (minOk && maxOk) {
        met(`The ${flagEn(memberFlag!)} in your household meets the age rule (${range})`, `आपके परिवार की ${flagHi(memberFlag!)} आयु शर्त (${rangeHi}) पूरी करती हैं`);
      } else {
        check(`The ${flagEn(memberFlag!)} must be aged ${range}`, `${flagHi(memberFlag!)} की आयु ${rangeHi} होनी चाहिए`);
      }
    } else if (answers.age === undefined) {
      check(`Age not provided (scheme needs ${range})`, `आयु दर्ज नहीं (योजना हेतु ${rangeHi})`, 0);
    } else if ((rules.minAge === undefined || answers.age >= rules.minAge) && (rules.maxAge === undefined || answers.age <= rules.maxAge)) {
      met(`Age ${answers.age} is within the required range (${range})`, `आयु ${answers.age} वर्ष निर्धारित सीमा (${rangeHi}) में है`);
    } else {
      fail(`Requires age ${range} (you entered ${answers.age})`, `आयु ${rangeHi} होनी चाहिए (आपने ${answers.age} दर्ज की)`);
    }
  }

  // 2. Gender
  if (rules.gender && rules.gender !== 'all') {
    const who = rules.gender === 'female' ? 'women' : rules.gender;
    const whoHi = rules.gender === 'female' ? 'महिलाओं' : rules.gender === 'male' ? 'पुरुषों' : 'ट्रांसजेंडर व्यक्तियों';
    if (implied && implied.gender === rules.gender) {
      met(`Benefit goes to the ${flagEn(memberFlag!)} in your household`, `लाभ आपके परिवार की ${flagHi(memberFlag!)} को मिलेगा`);
    } else if (implied) {
      check(`Beneficiary must be from: ${who}`, `लाभार्थी ${whoHi} में से होना चाहिए`);
    } else if (answers.gender === undefined) {
      check(`Gender not provided (scheme is for ${who})`, `लिंग दर्ज नहीं (योजना ${whoHi} हेतु)`, 0);
    } else if (answers.gender === rules.gender) {
      met(`Scheme is specifically for ${who}`, `योजना विशेष रूप से ${whoHi} के लिए है`);
    } else {
      fail(`Scheme is only for ${who}`, `यह योजना केवल ${whoHi} के लिए है`);
    }
  }

  // 3. Occupation (required list)
  if (rules.occupations && rules.occupations.length > 0) {
    const list = rules.occupations.map(occEn).join(', ');
    const listHi = rules.occupations.map(occHi).join(', ');
    if (!answers.occupation) {
      check(`Occupation not provided (scheme is for: ${list})`, `व्यवसाय दर्ज नहीं (योजना: ${listHi})`, 0);
    } else if (rules.occupations.includes(answers.occupation)) {
      met(`Your occupation (${occEn(answers.occupation)}) is covered`, `आपका व्यवसाय (${occHi(answers.occupation)}) योजना में शामिल है`);
    } else {
      fail(`Scheme is for: ${list}`, `यह योजना इनके लिए है: ${listHi}`);
    }
  }

  // 4. Occupation (exclusions)
  if (rules.excludedOccupations && answers.occupation && rules.excludedOccupations.includes(answers.occupation)) {
    fail(`${occEn(answers.occupation)} households are excluded from this scheme`, `${occHi(answers.occupation)} परिवार इस योजना से बाहर हैं`);
  }

  // 5. Income — compare the whole bracket, not one point inside it.
  if (rules.maxAnnualIncome !== undefined) {
    const limit = rules.maxAnnualIncome;
    if (!answers.annualIncomeBracket) {
      check(`Income not provided (limit ${lakh(limit)}/yr)`, `आय दर्ज नहीं (सीमा ${lakhHi(limit)}/वर्ष)`, 0);
    } else {
      const [min, max] = INCOME_RANGES[answers.annualIncomeBracket];
      if (max <= limit) {
        met(`Household income is within the ${lakh(limit)}/yr limit`, `पारिवारिक आय ${lakhHi(limit)}/वर्ष की सीमा के भीतर है`);
      } else if (min >= limit) {
        fail(`Household income is above the ${lakh(limit)}/yr limit`, `पारिवारिक आय ${lakhHi(limit)}/वर्ष की सीमा से अधिक है`);
      } else {
        check(
          `Eligible only if household income is ${lakh(limit)}/yr or less — your bracket spans this limit`,
          `केवल तभी पात्र जब पारिवारिक आय ${lakhHi(limit)}/वर्ष या कम हो — आपका आय वर्ग इस सीमा के आर-पार है`
        );
      }
    }
  }

  // 6. Landholding
  if (rules.requiresLandholding) {
    if (!answers.landholding) {
      check('Landholding not provided', 'भूमि विवरण दर्ज नहीं', 0);
    } else if (answers.landholding === 'none') {
      fail('Requires cultivable land in the applicant’s or family’s name', 'आवेदक या परिवार के नाम कृषि भूमि होना आवश्यक है');
    } else if (rules.maxLandholdingHectares !== undefined && LANDHOLDING_MAX_HECTARES[answers.landholding] > rules.maxLandholdingHectares) {
      fail(`Landholding exceeds the ${rules.maxLandholdingHectares} ha ceiling`, `भूमि ${rules.maxLandholdingHectares} हेक्टेयर की सीमा से अधिक है`);
    } else {
      met('Family holds cultivable agricultural land', 'परिवार के पास कृषि योग्य भूमि है');
    }
  }

  // 7. Social category
  if (rules.categories && rules.categories.length > 0) {
    const list = rules.categories.join(', ');
    if (!answers.socialCategory) {
      check(`Category not provided (scheme is for ${list})`, `वर्ग दर्ज नहीं (योजना ${list} हेतु)`, 0);
    } else if (rules.categories.includes(answers.socialCategory)) {
      met(`Category ${answers.socialCategory} is eligible`, `${answers.socialCategory} वर्ग पात्र है`);
    } else {
      fail(`Only for categories: ${list}`, `केवल ${list} वर्ग के लिए`);
    }
  }

  // 8. Rural / urban
  if (rules.residence && rules.residence !== 'both') {
    const areaEn = rules.residence === 'rural' ? 'rural (village)' : 'urban (town/city)';
    const areaHi = rules.residence === 'rural' ? 'ग्रामीण' : 'शहरी';
    if (!answers.residenceArea) {
      check(`Area not provided (scheme is for ${areaEn} areas)`, `क्षेत्र दर्ज नहीं (योजना ${areaHi} क्षेत्रों हेतु)`, 0);
    } else if (answers.residenceArea === rules.residence) {
      met(`You live in a ${areaEn} area`, `आप ${areaHi} क्षेत्र में रहते हैं`);
    } else {
      fail(`Only for ${areaEn} areas`, `केवल ${areaHi} क्षेत्रों के लिए`);
    }
  }

  // 9. BPL / priority household
  if (rules.requiresBPL) {
    const card = answers.hasRationCard;
    const lowIncome = answers.annualIncomeBracket === 'below_1lakh' || answers.annualIncomeBracket === '1lakh_to_2.5lakh';
    if (card === 'bpl' || card === 'aay_antyodaya') {
      met('BPL / Antyodaya ration card confirms priority status', 'बीपीएल / अंत्योदय राशन कार्ड से प्राथमिकता पुष्ट');
    } else if (lowIncome || card === undefined) {
      check(
        'Needs BPL / priority-household status — confirm your name in the official beneficiary list',
        'बीपीएल / प्राथमिकता परिवार होना आवश्यक — आधिकारिक लाभार्थी सूची में नाम की पुष्टि करें'
      );
    } else {
      fail('Restricted to BPL / Antyodaya households', 'केवल बीपीएल / अंत्योदय परिवारों के लिए');
    }
  }

  // 10. Special conditions
  for (const flag of rules.specialFlags || []) {
    if (hasFlag(answers, flag)) {
      met(`Condition met: ${flagEn(flag)}`, `शर्त पूरी: ${flagHi(flag)}`);
    } else {
      fail(`Requires: ${flagEn(flag)}`, `आवश्यक: ${flagHi(flag)}`);
    }
  }

  // 11. State-specific schemes
  if (rules.statesSupported && rules.statesSupported.length > 0) {
    const list = rules.statesSupported.join(', ');
    if (!answers.state) {
      check(`State not provided (scheme runs in ${list})`, `राज्य दर्ज नहीं (योजना: ${list})`, 0);
    } else if (rules.statesSupported.some((s) => s.toLowerCase() === answers.state!.toLowerCase())) {
      met(`Available in ${answers.state}`, `${answers.state} में उपलब्ध`);
    } else {
      fail(`Only available in: ${list}`, `केवल इन राज्यों में: ${list}`);
    }
  }

  const matchScore = total > 0 ? Math.round((passed / total) * 100) : 100;
  const status: MatchStatus = unmet.length > 0 ? 'review_required' : verify.length > 0 ? 'possible_match' : 'strong_match';

  return {
    scheme,
    status,
    matchScore,
    matchedReasons: matched.length > 0 ? matched : ['Open to all citizens — no specific criteria'],
    matchedReasonsHindi: matchedHi.length > 0 ? matchedHi : ['सभी नागरिकों के लिए खुली — कोई विशेष शर्त नहीं'],
    unmetCriteria: unmet,
    unmetCriteriaHindi: unmetHi,
    toVerify: verify,
    toVerifyHindi: verifyHi,
    missingDocuments
  };
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
