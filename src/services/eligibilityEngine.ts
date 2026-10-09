import { Scheme, EvaluatedScheme, MatchStatus } from '../types/scheme';
import { QuestionnaireAnswers } from '../types/questionnaire';
import { SCHEMES_DATABASE } from '../data/schemesData';

export function evaluateSchemeEligibility(
  scheme: Scheme,
  answers: QuestionnaireAnswers,
  readyDocumentIds: string[] = []
): EvaluatedScheme {
  const rules = scheme.rules;
  const matchedReasons: string[] = [];
  const matchedReasonsHindi: string[] = [];
  const unmetCriteria: string[] = [];
  const unmetCriteriaHindi: string[] = [];

  let totalCriteriaCount = 0;
  let passedCriteriaCount = 0;

  // 1. Age Evaluation
  if (rules.minAge !== undefined || rules.maxAge !== undefined) {
    totalCriteriaCount++;
    const userAge = answers.age;
    if (userAge !== undefined) {
      const minPass = rules.minAge === undefined || userAge >= rules.minAge;
      const maxPass = rules.maxAge === undefined || userAge <= rules.maxAge;

      if (minPass && maxPass) {
        passedCriteriaCount++;
        matchedReasons.push(`Age (${userAge} years) qualifies within required range`);
        matchedReasonsHindi.push(`आपकी आयु (${userAge} वर्ष) निर्धारित आयु सीमा के अनुरूप है`);
      } else {
        unmetCriteria.push(
          `Requires age between ${rules.minAge ?? 0} and ${rules.maxAge ?? 100} years (you entered ${userAge})`
        );
        unmetCriteriaHindi.push(
          `योजना के लिए आयु ${rules.minAge ?? 0} से ${rules.maxAge ?? 100} वर्ष होनी चाहिए (आपने ${userAge} दर्ज की है)`
        );
      }
    } else {
      unmetCriteria.push('Age not specified');
      unmetCriteriaHindi.push('आयु दर्ज नहीं की गई');
    }
  }

  // 2. Gender Evaluation
  if (rules.gender && rules.gender !== 'all') {
    totalCriteriaCount++;
    if (answers.gender === rules.gender) {
      passedCriteriaCount++;
      matchedReasons.push(`Specifically targeted for ${rules.gender === 'female' ? 'women' : rules.gender}`);
      matchedReasonsHindi.push(`विशेष रूप से ${rules.gender === 'female' ? 'महिलाओं' : 'पुरुषों'} हेतु लक्षित`);
    } else if (answers.gender !== undefined) {
      unmetCriteria.push(`Scheme is exclusively for ${rules.gender === 'female' ? 'women' : rules.gender} beneficiaries`);
      unmetCriteriaHindi.push(`यह योजना केवल ${rules.gender === 'female' ? 'महिला' : 'पुरुष'} लाभार्थियों के लिए है`);
    }
  }

  // 3. Occupation Evaluation
  if (rules.occupations && rules.occupations.length > 0) {
    totalCriteriaCount++;
    if (answers.occupation && rules.occupations.includes(answers.occupation)) {
      passedCriteriaCount++;
      matchedReasons.push(`Occupation matches scheme focus (${answers.occupation.replace(/_/g, ' ')})`);
      matchedReasonsHindi.push(`व्यवसाय योजना के अनुरूप है (${answers.occupation === 'farmer' ? 'किसान' : answers.occupation === 'artisan_craftsperson' ? 'कारीगर' : answers.occupation === 'street_vendor' ? 'स्ट्रीट वेंडर' : answers.occupation === 'student' ? 'विद्यार्थी' : 'कामगार'})`);
    } else if (answers.occupation) {
      unmetCriteria.push(`Scheme is tailored for: ${rules.occupations.map((o) => o.replace(/_/g, ' ')).join(', ')}`);
      unmetCriteriaHindi.push(`यह योजना मुख्य रूप से संबंधित व्यवसायों हेतु है`);
    }
  }

  // 4. Income Evaluation
  if (rules.maxAnnualIncome !== undefined) {
    totalCriteriaCount++;
    if (answers.annualIncomeBracket) {
      const incomeMap: Record<string, number> = {
        below_1lakh: 100000,
        '1lakh_to_2.5lakh': 250000,
        '2.5lakh_to_5lakh': 500000,
        '5lakh_to_8lakh': 800000,
        above_8lakh: 1200000
      };

      const userIncomeApprox = incomeMap[answers.annualIncomeBracket] ?? 250000;
      if (userIncomeApprox <= rules.maxAnnualIncome) {
        passedCriteriaCount++;
        matchedReasons.push(`Household income falls within ceiling (≤ ₹${(rules.maxAnnualIncome / 100000).toFixed(1)} Lakh/yr)`);
        matchedReasonsHindi.push(`पारिवारिक आय सीमा (≤ ₹${(rules.maxAnnualIncome / 100000).toFixed(1)} लाख/वर्ष) के भीतर है`);
      } else {
        unmetCriteria.push(`Exceeds income limit of ₹${(rules.maxAnnualIncome / 100000).toFixed(1)} Lakh/yr`);
        unmetCriteriaHindi.push(`आय सीमा ₹${(rules.maxAnnualIncome / 100000).toFixed(1)} लाख/वर्ष से अधिक है`);
      }
    } else {
      // Income not provided - do not assume a default income
      unmetCriteria.push(`Annual income not specified (Limit: ≤ ₹${(rules.maxAnnualIncome / 100000).toFixed(1)} Lakh/yr)`);
      unmetCriteriaHindi.push(`वार्षिक आय विवरण दर्ज नहीं है (पात्रता सीमा: ≤ ₹${(rules.maxAnnualIncome / 100000).toFixed(1)} लाख/वर्ष)`);
    }
  }

  // 5. Landholding Evaluation
  if (rules.requiresLandholding) {
    totalCriteriaCount++;
    if (answers.landholding && answers.landholding !== 'none') {
      passedCriteriaCount++;
      matchedReasons.push('Possesses cultivable agricultural landholding');
      matchedReasonsHindi.push('कृषि योग्य भूमि स्वामित्व उपलब्ध है');
    } else {
      unmetCriteria.push('Requires cultivable agricultural land in applicant or family name');
      unmetCriteriaHindi.push('परिवार के नाम कृषि योग्य भूमि होना आवश्यक है');
    }
  }

  // 6. Social Category (SC/ST/OBC/EWS)
  if (rules.categories && rules.categories.length > 0) {
    totalCriteriaCount++;
    if (answers.socialCategory && rules.categories.includes(answers.socialCategory)) {
      passedCriteriaCount++;
      matchedReasons.push(`Category (${answers.socialCategory}) is eligible for designated assistance`);
      matchedReasonsHindi.push(`आरक्षित/लक्षित वर्ग (${answers.socialCategory}) के तहत पात्रता`);
    } else if (answers.socialCategory) {
      unmetCriteria.push(`Restricted to categories: ${rules.categories.join(', ')}`);
      unmetCriteriaHindi.push(`केवल ${rules.categories.join(', ')} वर्ग के लिए`);
    }
  }

  // 7. Residence Area (Rural / Urban)
  if (rules.residence && rules.residence !== 'both') {
    totalCriteriaCount++;
    if (answers.residenceArea === rules.residence) {
      passedCriteriaCount++;
      matchedReasons.push(`Area matches (${rules.residence === 'rural' ? 'Rural / Village' : 'Urban / City'})`);
      matchedReasonsHindi.push(`निवास क्षेत्र (${rules.residence === 'rural' ? 'ग्रामीण' : 'शहरी'}) योजना के अनुरूप`);
    } else if (answers.residenceArea) {
      unmetCriteria.push(`Applicable in ${rules.residence} regions only`);
      unmetCriteriaHindi.push(`केवल ${rules.residence === 'rural' ? 'ग्रामीण' : 'शहरी'} क्षेत्रों हेतु लागू`);
    }
  }

  // 8. BPL / Ration Card
  if (rules.requiresBPL) {
    totalCriteriaCount++;
    if (answers.hasRationCard === 'bpl' || answers.hasRationCard === 'aay_antyodaya') {
      passedCriteriaCount++;
      matchedReasons.push('BPL / Antyodaya status confirms economic eligibility');
      matchedReasonsHindi.push('बीपीएल / अंत्योदय राशन कार्ड से आर्थिक पात्रता पुष्ट');
    } else if (answers.annualIncomeBracket === 'below_1lakh' || answers.annualIncomeBracket === '1lakh_to_2.5lakh') {
      passedCriteriaCount += 0.8;
      matchedReasons.push('Income bracket qualifies under economic criteria');
      matchedReasonsHindi.push('आय वर्ग आर्थिक मापदंड के भीतर है');
    } else {
      unmetCriteria.push('Priority given to BPL / Antyodaya households');
      unmetCriteriaHindi.push('बीपीएल अथवा अंत्योदय परिवारों को प्राथमिकता');
    }
  }

  // 9. Special Flags
  if (rules.specialFlags && rules.specialFlags.length > 0) {
    const userFlags = answers.specialAttributes || [];
    for (const flag of rules.specialFlags) {
      totalCriteriaCount++;
      const isArtisanMatch =
        (flag === 'artisan' || flag === 'artisan_craftsperson') &&
        (userFlags.includes('artisan') || userFlags.includes('artisan_craftsperson') || answers.occupation === 'artisan_craftsperson');
      const isSeniorMatch =
        flag === 'senior_citizen' &&
        (userFlags.includes('senior_citizen') || (answers.age !== undefined && answers.age >= 60));
      const hasDirectFlag = userFlags.includes(flag);

      if (hasDirectFlag || isArtisanMatch || isSeniorMatch) {
        passedCriteriaCount++;
        matchedReasons.push(`Special condition met: ${flag.replace(/_/g, ' ')}`);
        matchedReasonsHindi.push(`विशेष पात्रता पूरी: ${flag === 'disability' ? 'दिव्यांगता' : flag === 'widow' ? 'विधवा' : flag === 'girl_child_under_10' ? '10 वर्ष तक की बालिका' : flag === 'pregnant_lactating' ? 'गर्भवती/धात्री माता' : flag === 'artisan' ? 'विश्वकर्मा शिल्पी' : 'वरिष्ठ नागरिक'}`);
      } else {
        // If it's a primary flag requirement
        unmetCriteria.push(`Requires specific condition: ${flag.replace(/_/g, ' ')}`);
        unmetCriteriaHindi.push(`विशेष शर्त आवश्यक: ${flag.replace(/_/g, ' ')}`);
      }
    }
  }

  // 10. Location / State specific rules (if specified)
  if (rules.statesSupported && rules.statesSupported.length > 0) {
    totalCriteriaCount++;
    if (answers.state && rules.statesSupported.some((s) => s.toLowerCase() === answers.state?.toLowerCase())) {
      passedCriteriaCount++;
      matchedReasons.push(`State jurisdiction verified (${answers.state})`);
      matchedReasonsHindi.push(`राज्य क्षेत्राधिकार सत्यापित (${answers.state})`);
    } else if (answers.state) {
      unmetCriteria.push(`Applicable in specific states: ${rules.statesSupported.join(', ')}`);
      unmetCriteriaHindi.push(`केवल निर्दिष्ट राज्यों में लागू: ${rules.statesSupported.join(', ')}`);
    }
  }

  // Missing documents calculation (evaluated separately from demographic eligibility)
  const missingDocuments: string[] = [];
  scheme.requiredDocuments.forEach((docRef) => {
    if (docRef.isMandatory && !readyDocumentIds.includes(docRef.id)) {
      missingDocuments.push(docRef.name);
    }
  });

  const baseRatio = totalCriteriaCount > 0 ? passedCriteriaCount / totalCriteriaCount : 1;
  const matchScore = Math.min(100, Math.round(baseRatio * 100));

  // Eligibility estimate separated from document checklist
  let status: MatchStatus = 'possible_match';
  if (unmetCriteria.length === 0 && matchScore >= 70) {
    status = 'strong_match';
  } else if (unmetCriteria.length <= 1 && matchScore >= 45) {
    status = 'possible_match';
  } else {
    status = 'review_required';
  }

  return {
    scheme,
    status,
    matchScore,
    matchedReasons: matchedReasons.length > 0 ? matchedReasons : ['General welfare demographic criteria applicable'],
    matchedReasonsHindi: matchedReasonsHindi.length > 0 ? matchedReasonsHindi : ['सामान्य जन-कल्याणकारी मापदंड लागू'],
    unmetCriteria,
    unmetCriteriaHindi,
    missingDocuments
  };
}

export function evaluateAllSchemes(
  answers: QuestionnaireAnswers,
  readyDocumentIds: string[] = []
): {
  strongMatches: EvaluatedScheme[];
  possibleMatches: EvaluatedScheme[];
  reviewRequired: EvaluatedScheme[];
} {
  const evaluated = SCHEMES_DATABASE.map((s) => evaluateSchemeEligibility(s, answers, readyDocumentIds));

  // Sort by match score descending
  evaluated.sort((a, b) => b.matchScore - a.matchScore);

  const strongMatches = evaluated.filter((e) => e.status === 'strong_match');
  const possibleMatches = evaluated.filter((e) => e.status === 'possible_match');
  const reviewRequired = evaluated.filter((e) => e.status === 'review_required');

  return { strongMatches, possibleMatches, reviewRequired };
}
