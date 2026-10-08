import { Scheme } from '../types/scheme';

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
    shortCode: 'PM-KISAN',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'agriculture',
    categoryLabel: 'Agriculture & Farming',
    categoryLabelHindi: 'कृषि एवं किसान कल्याण',
    benefitType: 'cash_transfer',
    benefitHeadline: '₹6,000 per year directly to bank account',
    benefitHeadlineHindi: '₹6,000 प्रति वर्ष सीधे बैंक खाते में',
    summary: 'Direct income support of ₹6,000 per year in three equal instalments of ₹2,000 to all landholding farmer families across India.',
    summaryHindi: 'सभी भूधारी किसान परिवारों को ₹2,000 की तीन समान किस्तों में प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।',
    simpleLanguageSummary: 'If your family owns cultivable farmland and does farming, the government gives you ₹2,000 every 4 months (total ₹6,000 every year) straight into your bank account. No middlemen, no bribes.',
    simpleLanguageSummaryHindi: 'यदि आपके परिवार के नाम खेती की जमीन है, तो सरकार हर 4 महीने में ₹2,000 (साल में ₹6,000) सीधे आपके बैंक खाते में भेजती है। कोई बिचौलिया नहीं।',
    fullDescription: 'PM-KISAN is a central sector scheme with 100% funding from Government of India. It aims to supplement the financial needs of landholding farmers in procuring various inputs to ensure proper crop health and appropriate yields, commensurate with anticipated farm income at the end of each crop cycle.',
    fullDescriptionHindi: 'पीएम-किसान केंद्र सरकार की 100% वित्तपोषित योजना है। इसका उद्देश्य फसल स्वास्थ्य और पैदावार सुनिश्चित करने के लिए कृषि इनपुट्स की खरीद में भूधारी किसानों की वित्तीय जरूरतों को पूरा करना है।',
    eligibilityDescription: 'All landholding farmer families with cultivable landholding in their names. Institutional landholders, serving/retired government officials, and income tax payers are excluded.',
    eligibilityDescriptionHindi: 'सभी किसान परिवार जिनके नाम खेती योग्य भूमि है। सरकारी कर्मचारी, पेंशनधारक (₹10,000+) और आयकर दाता पात्र नहीं हैं।',
    rules: {
      minAge: 18,
      occupations: ['farmer'],
      requiresLandholding: true,
      maxAnnualIncome: 800000,
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', isMandatory: true, purpose: 'Biometric identity & eKYC verification', purposeHindi: 'पहचान व ई-केवाईसी सत्यापन' },
      { id: 'doc_land_records', name: 'Land Record (Khatauni / 7/12)', nameHindi: 'जमीन की खतौनी / जमाबंदी', isMandatory: true, purpose: 'Proof of cultivable land ownership', purposeHindi: 'खेती योग्य भूमि स्वामित्व का प्रमाण' },
      { id: 'doc_bank_passbook', name: 'Aadhaar Seeded Bank Account', nameHindi: 'आधार लिंक बैंक खाता', isMandatory: true, purpose: 'Direct Benefit Transfer (DBT)', purposeHindi: 'सीधे खाते में डीबीटी भुगतान' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Check e-KYC & Land Records', titleHindi: 'ई-केवाईसी और खतौनी जांचें', description: 'Ensure your Aadhaar is linked to your active mobile number and land mutation is updated.', descriptionHindi: 'सुनिश्चित करें कि आधार में मोबाइल नंबर लिंक हो और खतौनी में आपका नाम दर्ज हो।' },
      { stepNumber: 2, title: 'Self Register Online or via CSC', titleHindi: 'ऑनलाइन अथवा सीएससी पर पंजीकरण', description: 'Visit pmkisan.gov.in -> Farmers Corner -> New Farmer Registration, or visit your nearest CSC.', descriptionHindi: 'पीएम-किसान पोर्टल के "फार्मर्स कॉर्नर" में जाएं अथवा निकटतम सीएससी पर जाएं।' },
      { stepNumber: 3, title: 'State Revenue & Patwari Verification', titleHindi: 'पटवारी व राजस्व सत्यापन', description: 'Your local Lekhpal / Patwari verifies the land ownership record against district land registries.', descriptionHindi: 'स्थानीय लेखपाल/पटवारी भूमि रिकॉर्ड का भौतिक सत्यापन करते हैं।' },
      { stepNumber: 4, title: 'First Installment Release', titleHindi: 'किस्त प्राप्ति', description: 'Once approved by state nodal officer, funds are credited automatically every 4 months.', descriptionHindi: 'राज्य नोडल अधिकारी द्वारा अनुमोदन के बाद राशि सीधे बैंक खाते में जमा होती है।' }
    ],
    officialPortalUrl: 'https://pmkisan.gov.in',
    helplinePhone: '155261 / 011-24300606',
    commonRejectionReasons: [
      { title: 'Name Mismatch between Aadhaar and Land Title', titleHindi: 'आधार और खतौनी में नाम का अंतर', tip: 'Spelling of applicant name on Aadhaar must match the revenue record letter-for-letter.', tipHindi: 'आधार कार्ड और खतौनी में नाम की वर्तनी बिल्कुल समान होनी चाहिए।' },
      { title: 'Bank Account Not NPCI Seeded', titleHindi: 'बैंक खाते में एनपीसीआई मैपिंग न होना', tip: 'Visit your home bank branch and request DBT NPCI Aadhaar seeding mandate form.', tipHindi: 'अपनी बैंक शाखा में जाकर डीबीटी एनपीसीआई मैपिंग फॉर्म भरें।' },
      { title: 'Pending Land Seeding Status', titleHindi: 'लैंड सीडिंग स्टेटस पेंडिंग', tip: 'Visit Tehsil / Lekhpal with original land papers to get Land Seeding marked Yes on portal.', tipHindi: 'तहसीलदार/लेखपाल से मिलकर पोर्टल पर लैंड सीडिंग "यस" करवाएं।' }
    ],
    verificationAgency: 'District Agriculture Department & State Revenue Board',
    verificationAgencyHindi: 'जिला कृषि विभाग एवं राज्य राजस्व परिषद',
    processingTimeDays: 21
  },
  {
    id: 'ayushman-bharat-pmjay',
    name: 'Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)',
    nameHindi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (पीएम-जय)',
    shortCode: 'PM-JAY',
    ministry: 'National Health Authority (Ministry of Health & Family Welfare)',
    ministryHindi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (स्वास्थ्य एवं परिवार कल्याण मंत्रालय)',
    category: 'health',
    categoryLabel: 'Health & Medical',
    categoryLabelHindi: 'स्वास्थ्य एवं चिकित्सा',
    benefitType: 'health_cover',
    benefitHeadline: '₹5,00,000 cashless hospital cover per family per year',
    benefitHeadlineHindi: '₹5 लाख प्रति परिवार प्रति वर्ष मुफ्त अस्पताल इलाज',
    summary: 'World’s largest government-funded health assurance scheme providing secondary and tertiary hospitalization cover across 27,000+ empaneled hospitals.',
    summaryHindi: 'विश्व की सबसे बड़ी सरकारी स्वास्थ्य आश्वासन योजना, जो 27,000 से अधिक संबद्ध अस्पतालों में ₹5 लाख तक का कैशलेस इलाज प्रदान करती है।',
    simpleLanguageSummary: 'If anyone in your family gets seriously ill, you get a Golden Card. You can show this card at government and major private hospitals for free operations, medicines, tests, and bed charges up to ₹5 lakh per year.',
    simpleLanguageSummaryHindi: 'यदि परिवार में कोई गंभीर बीमार पड़ता है, तो गोल्डन कार्ड दिखाकर सरकारी और प्राइवेट अस्पतालों में ₹5 लाख तक का मुफ्त इलाज, ऑपरेशन और दवाइयां मिलती हैं।',
    fullDescription: 'Ayushman Bharat PM-JAY provides financial risk protection against catastrophic healthcare expenditures. Covers pre-existing diseases from day one, with zero restrictions on family size, age, or gender. Cashless and paperless at point of care.',
    fullDescriptionHindi: 'यह योजना गंभीर बीमारी के खर्चों से परिवार को सुरक्षा प्रदान करती है। पहले दिन से सभी पुरानी बीमारियां शामिल हैं। परिवार के आकार अथवा उम्र की कोई सीमा नहीं है।',
    eligibilityDescription: 'Families listed in SECC 2011 database, NFSA ration card holders, Antyodaya Anna Yojana (AAY) families, and all senior citizens aged 70+ irrespective of income.',
    eligibilityDescriptionHindi: 'एसईसीसी 2011 सूची में शामिल परिवार, अंत्योदय कार्ड धारक, बीपीएल परिवार तथा 70 वर्ष से अधिक आयु के सभी वरिष्ठ नागरिक (आय सीमा मुक्त)।',
    rules: {
      maxAnnualIncome: 300000,
      requiresBPL: true,
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', isMandatory: true, purpose: 'Individual biometric KYC', purposeHindi: 'व्यक्तिगत बायोमेट्रिक केवाईसी' },
      { id: 'doc_ration_card', name: 'Ration Card (NFSA / BPL / AAY)', nameHindi: 'राशन कार्ड (राष्ट्रीय खाद्य सुरक्षा)', isMandatory: true, purpose: 'Proof of family composition', purposeHindi: 'परिवार के सदस्यों का सत्यापन' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Check Eligibility Online or at Hospital', titleHindi: 'पात्रता जांचें', description: 'Visit beneficiary.nha.gov.in or ask the "Ayushman Mitra" at any district hospital.', descriptionHindi: 'beneficiary.nha.gov.in पर जाएं या किसी भी सरकारी अस्पताल में आयुष्मान मित्र से संपर्क करें।' },
      { stepNumber: 2, title: 'Complete eKYC with Aadhaar OTP/Biometric', titleHindi: 'बायोमेट्रिक अथवा ओटीपी ई-केवाईसी', description: 'Authenticate your identity on the NHA portal using face, fingerprint, or mobile OTP.', descriptionHindi: 'फेस ऑथेंटिकेशन, फिंगरप्रिंट या मोबाइल ओटीपी द्वारा अपनी पहचान सत्यापित करें।' },
      { stepNumber: 3, title: 'Download Ayushman Card', titleHindi: 'आयुष्मान कार्ड डाउनलोड', description: 'Your PVC / digital Ayushman Card is issued instantly and can be saved to DigiLocker.', descriptionHindi: 'सत्यापन के तुरंत बाद डिजिटल आयुष्मान कार्ड डाउनलोड करें व डिजीपॉकेट में रखें।' }
    ],
    officialPortalUrl: 'https://beneficiary.nha.gov.in',
    helplinePhone: '14555 / 1800-111-565',
    commonRejectionReasons: [
      { title: 'Family Not in SECC / NFSA Database', titleHindi: 'एसईसीसी या राशन सूची में नाम न होना', tip: 'If family member is aged 70+, use the new universal 70+ senior citizen registration tab regardless of income.', tipHindi: 'यदि सदस्य 70+ वर्ष का है, तो बिना आय सीमा के नया वरिष्ठ नागरिक रजिस्ट्रेशन कराएं।' },
      { title: 'Mobile Number Not Linked with Aadhaar', titleHindi: 'आधार से मोबाइल नंबर लिंक न होना', tip: 'Visit nearest CSC or hospital Ayushman Mitra for fingerprint or Iris biometric authentication.', tipHindi: 'फिंगरप्रिंट या आइरिस सत्यापन हेतु निकटतम सीएससी या सरकारी अस्पताल जाएं।' }
    ],
    verificationAgency: 'National Health Authority & State Health Agency (SHA)',
    verificationAgencyHindi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण एवं राज्य स्वास्थ्य एजेंसी',
    processingTimeDays: 1
  },
  {
    id: 'pm-awas-yojana',
    name: 'Pradhan Mantri Awas Yojana (PMAY - Gramin & Urban 2.0)',
    nameHindi: 'प्रधानमंत्री आवास योजना (पीएमएवाई - ग्रामीण एवं शहरी)',
    shortCode: 'PMAY',
    ministry: 'Ministry of Rural Development / Ministry of Housing & Urban Affairs',
    ministryHindi: 'ग्रामीण विकास मंत्रालय / आवास एवं शहरी कार्य मंत्रालय',
    category: 'housing',
    categoryLabel: 'Housing & Shelter',
    categoryLabelHindi: 'आवास एवं मकान',
    benefitType: 'asset_subsidy',
    benefitHeadline: 'Financial grant up to ₹1.20 Lakh (Rural) or Interest Subsidy up to ₹2.67 Lakh (Urban)',
    benefitHeadlineHindi: '₹1.20 लाख तक का पक्का मकान अनुदान (ग्रामीण) अथवा ब्याज सब्सिडी (शहरी)',
    summary: 'Housing for All initiative providing direct financial assistance to homeless and kutcha-house dwelling families to construct permanent pucca dwellings with basic amenities.',
    summaryHindi: 'बेघर और कच्चे मकानों में रहने वाले परिवारों को बुनियादी सुविधाओं से युक्त पक्का मकान बनाने हेतु सीधी वित्तीय सहायता।',
    simpleLanguageSummary: 'If your family does not have a pucca (brick and concrete) house, the government provides money in installments directly into your bank account as you build your house, plus toilet construction assistance.',
    simpleLanguageSummaryHindi: 'यदि आपके पास पक्का मकान नहीं है, तो सरकार मकान बनाने के लिए किस्तों में सीधे आपके बैंक खाते में सहायता राशि देती है, साथ ही शौचालय निर्माण हेतु अतिरिक्त सहायता।',
    fullDescription: 'Under PMAY-Gramin, assistance of ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult areas is provided for house construction. Under PMAY-Urban 2.0, affordable housing and interest subsidies are provided for EWS and LIG beneficiaries.',
    fullDescriptionHindi: 'पीएमएवाई-ग्रामीण के अंतर्गत मैदानी क्षेत्रों में ₹1.20 लाख एवं दुर्गम क्षेत्रों में ₹1.30 लाख मिलते हैं। साथ ही मनरेगा के तहत 90 दिन की मजदूरी और स्वच्छ भारत मिशन से शौचालय हेतु ₹12,000 मिलते हैं।',
    eligibilityDescription: 'Families without any pucca house anywhere in India. Families living in zero, one, or two-room houses with kutcha walls and roof. Preference for SC/ST, women, and disabled heads of household.',
    eligibilityDescriptionHindi: 'ऐसे परिवार जिनके पास भारत में कहीं भी पक्का मकान न हो और जो कच्चे मकान में रहते हों। एससी/एसटी, महिला मुखिया एवं दिव्यांगों को प्राथमिकता।',
    rules: {
      maxAnnualIncome: 300000,
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of all family members', nameHindi: 'परिवार के सभी सदस्यों का आधार कार्ड', isMandatory: true, purpose: 'De-duplication and identity verification', purposeHindi: 'पहचान एवं दोहराव रोकथाम' },
      { id: 'doc_bank_passbook', name: 'Bank Account Passbook (Aadhaar linked)', nameHindi: 'आधार लिंक बैंक पासबुक', isMandatory: true, purpose: 'Instalment disbursals based on geo-tagged construction stages', purposeHindi: 'जियो-टैग चरणों के आधार पर किस्त अंतरण' },
      { id: 'doc_job_card', name: 'MGNREGA Job Card (for rural)', nameHindi: 'मनरेगा जॉब कार्ड (ग्रामीण हेतु)', isMandatory: false, purpose: 'Unskilled labour wage component', purposeHindi: '90 दिन की मजदूरी भुगतान हेतु' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Gram Sabha / ULB Ward Survey', titleHindi: 'ग्राम सभा / वार्ड सर्वेक्षण सूची', description: 'Check your family’s name in the Awas+ priority waiting list registered by your Gram Panchayat.', descriptionHindi: 'ग्राम पंचायत की आवास+ प्रतीक्षा सूची में अपना नाम जांचें।' },
      { stepNumber: 2, title: 'Geo-Tagging of Existing Site', titleHindi: 'पुराने कच्चे मकान की जियो-टैगिंग', description: 'AwaasApp inspector visits your site and photographs existing kutcha dwelling with GPS coordinates.', descriptionHindi: 'आवास-ऐप निरीक्षक द्वारा वर्तमान कच्चे मकान की जीपीएस फोटो ली जाती है।' },
      { stepNumber: 3, title: 'First Instalment & Foundation Work', titleHindi: 'प्रथम किस्त एवं नींव निर्माण', description: 'First tranche is credited to start plinth work, followed by inspections at lintel and roof levels.', descriptionHindi: 'नींव तैयार करने हेतु पहली किस्त मिलती है, जिसके बाद प्रत्येक चरण पर फोटो सत्यापन होता है।' }
    ],
    officialPortalUrl: 'https://pmayg.nic.in',
    helplinePhone: '1800-11-6446',
    commonRejectionReasons: [
      { title: 'Owning a Pucca House or Motorized Vehicle', titleHindi: 'पहले से पक्का मकान या चार पहिया वाहन होना', tip: 'Families owning concrete houses, 3/4 wheeler motorized vehicles or motorized boats are excluded by exclusion criteria.', tipHindi: 'चार पहिया वाहन या पक्का मकान होने पर अपवर्जन नियमों के कारण आवेदन निरस्त हो जाता है।' },
      { title: 'Land Title Dispute', titleHindi: 'भूमि पर मालिकाना हक का विवाद', tip: 'Ensure the residential plot belongs to the family or has Gram Panchayat patta allotment.', tipHindi: 'सुनिश्चित करें कि जमीन का आबादी पट्टा या स्वामित्व विवाद-मुक्त हो।' }
    ],
    verificationAgency: 'Block Development Officer (BDO) & Gram Panchayat',
    verificationAgencyHindi: 'खंड विकास अधिकारी (BDO) एवं ग्राम पंचायत',
    processingTimeDays: 45
  },
  {
    id: 'pm-ujjwala-yojana',
    name: 'Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)',
    nameHindi: 'प्रधानमंत्री उज्ज्वला योजना 2.0 (पीएमयूवाई)',
    shortCode: 'PMUY',
    ministry: 'Ministry of Petroleum & Natural Gas',
    ministryHindi: 'पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय',
    category: 'women_children',
    categoryLabel: 'Women & Family Welfare',
    categoryLabelHindi: 'महिला एवं बाल कल्याण',
    benefitType: 'asset_subsidy',
    benefitHeadline: 'Free LPG gas connection + 1st refill + free stove + ₹300 refill subsidy',
    benefitHeadlineHindi: 'मुफ्त गैस कनेक्शन, पहला भरा सिलेंडर, चूल्हा एवं ₹300 प्रति सिलेंडर सब्सिडी',
    summary: 'Provides deposit-free LPG connections to adult women from poor and underprivileged households, protecting them and their children from smoke health hazards.',
    summaryHindi: 'गरीब और वंचित परिवारों की वयस्क महिलाओं को बिना किसी अग्रिम जमा के मुफ्त एलपीजी गैस कनेक्शन और चूल्हा उपलब्ध कराना।',
    simpleLanguageSummary: 'An adult woman in the family gets a clean cooking gas connection completely free, including the cylinder, regulator, safety pipe, and first refill, plus government subsidy on future cylinders.',
    simpleLanguageSummaryHindi: 'परिवार की वयस्क महिला के नाम पर पूरी तरह मुफ्त गैस कनेक्शन, सिलेंडर, चूल्हा और पहला रिफिल मिलता है, तथा आगे के सिलेंडरों पर सरकार से सब्सिडी मिलती है।',
    fullDescription: 'Ujjwala 2.0 provides deposit-free LPG connection, free first refill, and a free hotplate (stove) to beneficiaries. In addition, an targeted subsidy of ₹300 per 14.2 kg LPG cylinder (up to 12 refills per year) is credited via DBT.',
    fullDescriptionHindi: 'उज्ज्वला 2.0 के तहत बिना किसी अग्रिम जमानत के गैस कनेक्शन, मुफ्त पहला भरा सिलेंडर और गैस चूल्हा दिया जाता है। साथ ही प्रति वर्ष 12 सिलेंडरों तक ₹300 की लक्षित सब्सिडी मिलती है।',
    eligibilityDescription: 'Adult woman from an eligible poor household (BPL, SC/ST, Antyodaya, Most Backward Classes, forest dwellers). No other LPG connection should exist in the same household.',
    eligibilityDescriptionHindi: 'गरीब परिवार की वयस्क महिला (18+ वर्ष)। परिवार में पहले से किसी के नाम एलपीजी गैस कनेक्शन नहीं होना चाहिए।',
    rules: {
      minAge: 18,
      gender: 'female',
      maxAnnualIncome: 250000
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of Woman Applicant', nameHindi: 'महिला आवेदिका का आधार कार्ड', isMandatory: true, purpose: 'Identity & eKYC verification', purposeHindi: 'पहचान व ई-केवाईसी सत्यापन' },
      { id: 'doc_ration_card', name: 'Ration Card displaying family members', nameHindi: 'पारिवारिक राशन कार्ड', isMandatory: true, purpose: 'Verifying no existing connection in household', purposeHindi: 'परिवार में अन्य कनेक्शन न होने की पुष्टि' },
      { id: 'doc_bank_passbook', name: 'Bank Account Passbook (Aadhaar linked)', nameHindi: 'महिला का आधार लिंक बैंक खाता', isMandatory: true, purpose: 'Direct Benefit Transfer of LPG refill subsidy', purposeHindi: 'रिफिल सब्सिडी का सीधे खाते में भुगतान' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Obtain Form from Gas Agency or Online', titleHindi: 'गैस एजेंसी या ऑनलाइन फॉर्म प्राप्त करें', description: 'Download form from pmuy.gov.in or pick up free form at nearest Indane, Bharatgas, or HP Gas distributor.', descriptionHindi: 'pmuy.gov.in से फॉर्म डाउनलोड करें या नजदीकी इंडेन/भारत/एचपी गैस एजेंसी से प्राप्त करें।' },
      { stepNumber: 2, title: 'Submit Family Details & eKYC', titleHindi: 'पारिवारिक विवरण एवं ई-केवाईसी जमा करें', description: 'Submit applicant Aadhaar, family member details, and self-declaration of no other connection.', descriptionHindi: 'महिला का आधार, परिवार के सदस्यों का विवरण व शपथ पत्र जमा करें।' },
      { stepNumber: 3, title: 'Collection of Free Gas Cylinder & Stove', titleHindi: 'मुफ्त गैस चूल्हा व सिलेंडर प्राप्त करें', description: 'Distributor conducts de-duplication and issues the filled cylinder, regulator, and stove.', descriptionHindi: 'सत्यापन के उपरांत एजेंसी द्वारा भरा हुआ सिलेंडर, रेगुलेटर और चूल्हा निशुल्क सौंपा जाता है।' }
    ],
    officialPortalUrl: 'https://www.pmuy.gov.in',
    helplinePhone: '1800-266-6696 / 1906',
    commonRejectionReasons: [
      { title: 'Duplicate Connection in Household', titleHindi: 'घर में पहले से किसी अन्य सदस्य का गैस कनेक्शन होना', tip: 'OMCs run computerized de-duplication across all 3 gas companies (IOCL, BPCL, HPCL).', tipHindi: 'तीनों गैस कंपनियों के राष्ट्रीय डेटाबेस में घर के किसी भी सदस्य के नाम दूसरा कनेक्शन नहीं होना चाहिए।' },
      { title: 'Bank Account Not in Woman’s Own Name', titleHindi: 'बैंक खाता महिला के स्वयं के नाम न होना', tip: 'The bank passbook must strictly be in the female applicant’s name, not spouse or father.', tipHindi: 'बैंक खाता अनिवार्य रूप से महिला आवेदिका के अपने नाम पर होना चाहिए।' }
    ],
    verificationAgency: 'LPG Field Officer & Oil Marketing Companies (IOCL/BPCL/HPCL)',
    verificationAgencyHindi: 'ऑयल मार्केटिंग कंपनी फील्ड अधिकारी',
    processingTimeDays: 10
  },
  {
    id: 'sukanya-samriddhi-yojana',
    name: 'Sukanya Samriddhi Yojana (Beti Bachao, Beti Padhao)',
    nameHindi: 'सुकन्या समृद्धि योजना (बेटी बचाओ, बेटी पढ़ाओ)',
    shortCode: 'SSY',
    ministry: 'Ministry of Finance (Department of Economic Affairs)',
    ministryHindi: 'वित्त मंत्रालय (आर्थिक कार्य विभाग)',
    category: 'women_children',
    categoryLabel: 'Women & Family Welfare',
    categoryLabelHindi: 'महिला एवं बाल कल्याण',
    benefitType: 'cash_transfer',
    benefitHeadline: 'High interest rate (8.2% p.a.) + 100% Tax-Free returns for girl child education & marriage',
    benefitHeadlineHindi: '8.2% उच्चतम ब्याज दर + 100% कर-मुक्त रिटर्न बेटी की शिक्षा व विवाह हेतु',
    summary: 'A small-deposit savings scheme for girl children that offers the highest sovereign interest rate, compound growth, and complete tax exemption under Section 80C.',
    summaryHindi: 'बालिकाओं के लिए उच्च ब्याज वाली छोटी बचत योजना, जो उच्च शिक्षा एवं विवाह के लिए गारंटीकृत सुरक्षित कोष तैयार करती है।',
    simpleLanguageSummary: 'If you have a daughter under 10 years of age, you can open an account in a Post Office or bank with just ₹250. The government gives the highest safe interest (8.2%), and all profit is completely tax-free.',
    simpleLanguageSummaryHindi: 'यदि आपकी बेटी की उम्र 10 वर्ष से कम है, तो डाकघर या बैंक में केवल ₹250 से खाता खोलें। सरकार 8.2% की सुरक्षित ब्याज देती है और सारी बचत पूरी तरह टैक्स-फ्री होती है।',
    fullDescription: 'Parents or legal guardians can open an account for a girl child from her birth till she turns 10 years old. Maximum two girls per family. Deposits can be made up to 15 years from account opening, and account matures after 21 years.',
    fullDescriptionHindi: 'माता-पिता अपनी 10 वर्ष तक की बेटी के नाम पर डाकघर या बैंक में खाता खुलवा सकते हैं। 15 वर्षों तक राशि जमा की जा सकती है तथा 21 वर्ष बाद खाता परिपक्व होता है।',
    eligibilityDescription: 'Girl child who is an Indian resident and aged below 10 years at the time of account opening. Account operated by parent/guardian.',
    eligibilityDescriptionHindi: '10 वर्ष से कम आयु की भारतीय निवासी बालिका। माता-पिता या कानूनी अभिभावक द्वारा खाता संचालित किया जाता है।',
    rules: {
      maxAge: 10,
      gender: 'female',
      specialFlags: ['girl_child_under_10']
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Birth Certificate of Girl Child & Guardian Aadhaar', nameHindi: 'बालिका का जन्म प्रमाण पत्र एवं अभिभावक का आधार', isMandatory: true, purpose: 'Proof of age and parental relationship', purposeHindi: 'आयु व अभिभावक संबंध का प्रमाण' },
      { id: 'doc_residence_cert', name: 'Address Proof of Guardian', nameHindi: 'अभिभावक का निवास प्रमाण', isMandatory: true, purpose: 'KYC documentation for opening bank/post office account', purposeHindi: 'डाकघर/बैंक केवाईसी' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Nearest Post Office or Bank Branch', titleHindi: 'निकटतम डाकघर या बैंक शाखा जाएं', description: 'Can be opened at any India Post Office or authorized commercial bank (SBI, PNB, BoB, etc.).', descriptionHindi: 'किसी भी डाकघर या अधिकृत बैंक (एसबीआई, पीएनबी आदि) में जाएं।' },
      { stepNumber: 2, title: 'Fill Form-1 & Submit Minimum ₹250', titleHindi: 'फॉर्म-1 भरें एवं न्यूनतम ₹250 जमा करें', description: 'Submit birth certificate of child, guardian Aadhaar and initial deposit amount.', descriptionHindi: 'बच्ची का जन्म प्रमाण पत्र, अभिभावक का आधार और आरंभिक जमा राशि दें।' },
      { stepNumber: 3, title: 'Receive Passbook', titleHindi: 'पासबुक प्राप्त करें', description: 'Receive physical SSY passbook with account number; online deposit available via IPPB/NetBanking.', descriptionHindi: 'खाता पासबुक प्राप्त करें; बाद में आईपीपीबी या नेटबैंकिंग से भी ऑनलाइन जमा कर सकते हैं।' }
    ],
    officialPortalUrl: 'https://www.indiapost.gov.in',
    helplinePhone: '1800-266-6868',
    commonRejectionReasons: [
      { title: 'Girl Child Age Exceeds 10 Years', titleHindi: 'बालिका की आयु 10 वर्ष से अधिक होना', tip: 'Strict cutoff: Account cannot be opened if the child has crossed 10 years of age on application date.', tipHindi: 'आवेदन तिथि पर बच्ची की उम्र 10 वर्ष से कम होनी चाहिए।' }
    ],
    verificationAgency: 'Department of Posts / Scheduled Commercial Bank',
    verificationAgencyHindi: 'डाक विभाग / अधिकृत बैंक शाखा',
    processingTimeDays: 1
  },
  {
    id: 'pm-mudra-yojana',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    nameHindi: 'प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)',
    shortCode: 'PMMY',
    ministry: 'Department of Financial Services (Ministry of Finance)',
    ministryHindi: 'वित्तीय सेवाएं विभाग (वित्त मंत्रालय)',
    category: 'livelihood_business',
    categoryLabel: 'Business & Livelihood',
    categoryLabelHindi: 'रोजगार एवं व्यवसाय',
    benefitType: 'subsidized_loan',
    benefitHeadline: 'Collateral-free business loans up to ₹10 Lakh (Shishu, Kishore, Tarun)',
    benefitHeadlineHindi: 'बिना किसी गारंटी के ₹10 लाख तक का व्यापारिक ऋण (शिशु, किशोर, तरुण)',
    summary: 'Refinancing scheme providing institutional credit to micro and small non-corporate enterprises for income-generating manufacturing, trading, and service activities.',
    summaryHindi: 'गैर-कॉर्पोरेट, गैर-कृषि लघु और सूक्ष्म उद्यमों को विनिर्माण, व्यापार एवं सेवा गतिविधियों हेतु बिना किसी गारंटी के ऋण।',
    simpleLanguageSummary: 'If you want to start or expand a small shop, tailoring unit, repair center, or local business, banks give loans up to ₹10 lakh without asking for property as collateral.',
    simpleLanguageSummaryHindi: 'यदि आप अपनी दुकान, सिलाई केंद्र, वर्कशॉप या कोई छोटा व्यवसाय शुरू या बड़ा करना चाहते हैं, तो बैंक बिना जमीन-जायदाद गिरवी रखे ₹10 लाख तक का लोन देते हैं।',
    fullDescription: 'MUDRA loans are divided into three categories: Shishu (loans up to ₹50,000 for startups), Kishore (loans from ₹50,001 to ₹5,00,000 for established units), and Tarun (loans from ₹5,00,001 to ₹10,00,000 for expansion). No processing fee for Shishu.',
    fullDescriptionHindi: 'मुद्रा ऋण तीन श्रेणियों में है: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख तक) तथा तरुण (₹5 लाख से ₹10 लाख तक)। शिशु ऋण पर कोई प्रोसेसिंग फीस नहीं ली जाती।',
    eligibilityDescription: 'Any Indian citizen who has a business plan for a non-farm sector income-generating micro enterprise such as manufacturing, processing, trading, or service sector.',
    eligibilityDescriptionHindi: 'कोई भी भारतीय नागरिक जिसके पास विनिर्माण, व्यापार या सेवा क्षेत्र के सूक्ष्म उद्यम की व्यावसायिक योजना हो। पूर्व में डिफाल्टर न हो।',
    rules: {
      minAge: 18,
      occupations: ['small_business_owner', 'artisan_craftsperson', 'street_vendor', 'daily_wage_worker', 'unemployed'],
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card & PAN Card', nameHindi: 'आधार कार्ड एवं पैन कार्ड', isMandatory: true, purpose: 'Identity and financial KYC', purposeHindi: 'पहचान एवं वित्तीय केवाईसी' },
      { id: 'doc_bank_passbook', name: 'Last 6 Months Bank Statement', nameHindi: 'पिछले 6 माह का बैंक स्टेटमेंट', isMandatory: true, purpose: 'Credit assessment by lending bank', purposeHindi: 'बैंक द्वारा क्रेडिट क्षमता मूल्यांकन' },
      { id: 'doc_residence_cert', name: 'Business Address Proof / Shop License', nameHindi: 'व्यवसाय स्थल का प्रमाण / गुमास्ता लाइसेंस', isMandatory: false, purpose: 'Verifying commercial establishment existence', purposeHindi: 'दुकान/व्यवसाय अस्तित्व की पुष्टि' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Prepare Business Proposal', titleHindi: 'व्यावसायिक प्रस्ताव तैयार करें', description: 'Write down nature of business, equipment needed, expected monthly earnings and loan category.', descriptionHindi: 'दुकान/काम का विवरण, जरूरी मशीनें एवं अनुमानित मासिक आय का संक्षिप्त विवरण तैयार करें।' },
      { stepNumber: 2, title: 'Apply on Udyamitra Portal or Visit Bank', titleHindi: 'उद्यमीमित्र पोर्टल पर आवेदन या बैंक जाएं', description: 'Apply online at udyamimitra.in or submit Mudra application at any commercial or rural bank.', descriptionHindi: 'udyamimitra.in पर ऑनलाइन आवेदन करें अथवा सीधे बैंक शाखा प्रबंधक से संपर्क करें।' },
      { stepNumber: 3, title: 'Sanction & MUDRA Card Issuance', titleHindi: 'ऋण स्वीकृति एवं मुद्रा कार्ड', description: 'Bank assesses proposal, sanctions loan, and issues a RuPay MUDRA debit card for working capital.', descriptionHindi: 'बैंक द्वारा मंजूरी के बाद कार्यशील पूंजी हेतु रूपे मुद्रा डेबिट कार्ड दिया जाता है।' }
    ],
    officialPortalUrl: 'https://www.mudra.org.in',
    helplinePhone: '1800-180-1111',
    commonRejectionReasons: [
      { title: 'Poor CIBIL / Prior Default', titleHindi: 'खराब सिबिल स्कोर या पूर्व ऋण में डिफ़ॉल्ट', tip: 'Clear any overdue utility or earlier loan defaults before applying.', tipHindi: 'आवेदन से पूर्व किसी भी पुराने बकाया ऋण या ओवरड्यू को चुकता करें।' },
      { title: 'Bank Branch Demanding Third-Party Collateral', titleHindi: 'बैंक द्वारा गैर-कानूनी रूप से गारंटी मांगना', tip: 'Mudra guidelines strictly prohibit collateral for loans up to ₹10L; escalate to Lead District Manager (LDM) if harassed.', tipHindi: 'मुद्रा ऋण में गारंटी मांगना वर्जित है; शाखा द्वारा परेशान करने पर जिला अग्रणी बैंक प्रबंधक से शिकायत करें।' }
    ],
    verificationAgency: 'Public Sector / Private Commercial / Regional Rural Bank',
    verificationAgencyHindi: 'संबंधित बैंक शाखा प्रबंधक',
    processingTimeDays: 14
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    nameHindi: 'पीएम विश्वकर्मा योजना',
    shortCode: 'PM-VISHWAKARMA',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    ministryHindi: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय',
    category: 'livelihood_business',
    categoryLabel: 'Business & Livelihood',
    categoryLabelHindi: 'रोजगार एवं व्यवसाय',
    benefitType: 'subsidized_loan',
    benefitHeadline: '₹15,000 tool kit voucher + ₹3,00,000 credit at 5% interest + ₹500/day training stipend',
    benefitHeadlineHindi: '₹15,000 टूलकिट वाउचर + 5% ब्याज पर ₹3 लाख तक ऋण + ₹500 प्रतिदिन भत्ता',
    summary: 'Comprehensive end-to-end support for traditional artisans and craftspeople working with their hands and traditional tools across 18 family-based trades.',
    summaryHindi: '18 पारंपरिक शिल्पों में अपने हाथों और औजारों से कार्य करने वाले विश्वकर्मा कारीगरों को समग्र आर्थिक व तकनीकी सहयोग।',
    simpleLanguageSummary: 'If you are a carpenter, blacksmith, potter, tailor, cobbler, mason, or sculptor, government gives you official artisan identity, free modern training with ₹500/day allowance, ₹15,000 for modern tools, and low-interest loan without guarantee.',
    simpleLanguageSummaryHindi: 'यदि आप बढ़ई, लोहार, कुम्हार, दर्जी, मोची, राजमिस्त्री आदि हैं, तो सरकार आपको ₹500/दिन भत्ते के साथ आधुनिक ट्रेनिंग, ₹15,000 का टूलकिट वाउचर और 5% ब्याज पर आसान लोन देती है।',
    fullDescription: 'PM Vishwakarma covers 18 trades including Carpenter, Boat Maker, Armourer, Blacksmith, Hammer and Tool Kit Maker, Locksmith, Sculptor, Goldsmith, Potter, Cobbler, Mason, Basket/Mat/Broom Maker, Doll & Toy Maker, Barber, Garland Maker, Washerman, Tailor, and Fishing Net Maker.',
    fullDescriptionHindi: 'इसमें बढ़ई, लोहार, कुम्हार, मूर्तिकार, मोची, राजमिस्त्री, नाई, धोबी, दर्जी सहित 18 पारंपरिक ट्रेड शामिल हैं। प्रथम चरण में ₹1 लाख तथा दूसरे चरण में ₹2 लाख का ऋण 5% ब्याज दर पर मिलता है।',
    eligibilityDescription: 'An artisan or craftsperson working with their hands and tools engaged in one of the 18 family-based traditional trades. Minimum age 18 years. One member per family.',
    eligibilityDescriptionHindi: '18 पारंपरिक व्यवसायों में हाथों व औजारों से काम करने वाले कारीगर। न्यूनतम आयु 18 वर्ष। परिवार का केवल एक सदस्य पात्र।',
    rules: {
      minAge: 18,
      occupations: ['artisan_craftsperson', 'daily_wage_worker'],
      gender: 'all',
      specialFlags: ['artisan']
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card (Biometric enabled)', nameHindi: 'बायोमेट्रिक सक्षम आधार कार्ड', isMandatory: true, purpose: 'Gram Panchayat verification & eKYC', purposeHindi: 'ग्राम पंचायत सत्यापन एवं ई-केवाईसी' },
      { id: 'doc_bank_passbook', name: 'Bank Passbook (NPCI linked)', nameHindi: 'बैंक पासबुक (एनपीसीआई लिंक)', isMandatory: true, purpose: 'Training stipend and toolkit e-voucher crediting', purposeHindi: 'प्रशिक्षण वजीफा व टूलकिट वाउचर प्राप्ति' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'CSC Biometric Registration', titleHindi: 'सीएससी पर बायोमेट्रिक पंजीकरण', description: 'Visit nearest Common Service Center with Aadhaar and select your traditional trade.', descriptionHindi: 'नजदीकी सीएससी केंद्र पर जाकर बायोमेट्रिक से अपना पारंपरिक काम दर्ज कराएं।' },
      { stepNumber: 2, title: 'Three-Tier Verification', titleHindi: 'तीन-स्तरीय सत्यापन', description: 'Application verified by Gram Panchayat Head -> District Committee -> National Screening Committee.', descriptionHindi: 'ग्राम प्रधान/वार्ड सदस्य, जिला स्क्रीनिंग कमेटी और राष्ट्रीय समिति द्वारा सत्यापन।' },
      { stepNumber: 3, title: 'Skill Training & Toolkit Incentive', titleHindi: 'कौशल प्रशिक्षण एवं ₹15,000 टूलकिट', description: 'Undergo 5-7 days basic skill training with ₹500/day allowance and receive ₹15,000 toolkit voucher.', descriptionHindi: '5-7 दिन का प्रशिक्षण पूरा करें, ₹500/दिन भत्ता पाएं और आधुनिक औजारों हेतु ₹15,000 प्राप्त करें।' }
    ],
    officialPortalUrl: 'https://pmvishwakarma.gov.in',
    helplinePhone: '1800-267-7777 / 011-23061502',
    commonRejectionReasons: [
      { title: 'Selected Trade Not in Designated 18 Trades', titleHindi: 'चयनित कार्य 18 अधिकृत शिल्पों में न होना', tip: 'Only artisans strictly working in the 18 specified trades qualify under the scheme rules.', tipHindi: 'केवल अधिकृत 18 पारंपरिक शिल्पों में संलग्न लोग ही पात्र हैं।' }
    ],
    verificationAgency: 'Gram Panchayat Pradhan / ULB Executive Officer & District MSME Center',
    verificationAgencyHindi: 'ग्राम पंचायत प्रधान / जिला उद्योग केंद्र',
    processingTimeDays: 20
  },
  {
    id: 'pm-svanidhi',
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    nameHindi: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
    shortCode: 'PM-SVANIDHI',
    ministry: 'Ministry of Housing and Urban Affairs (MoHUA)',
    ministryHindi: 'आवासन और शहरी कार्य मंत्रालय',
    category: 'livelihood_business',
    categoryLabel: 'Business & Livelihood',
    categoryLabelHindi: 'रोजगार एवं व्यवसाय',
    benefitType: 'subsidized_loan',
    benefitHeadline: 'Working capital loan ₹10,000 → ₹20,000 → ₹50,000 with 7% interest subsidy & cashback',
    benefitHeadlineHindi: 'कार्यशील पूंजी ऋण ₹10,000 → ₹20,000 → ₹50,000, 7% ब्याज सब्सिडी व कैशबैक',
    summary: 'Special micro-credit facility providing affordable collateral-free working capital loans to urban and peri-urban street vendors to resume and grow their livelihoods.',
    summaryHindi: 'शहरी और अर्ध-शहरी रेहड़ी-पटरी विक्रेताओं (स्ट्रीट वेंडर्स) को अपना व्यवसाय चलाने हेतु आसान कार्यशील पूंजी ऋण।',
    simpleLanguageSummary: 'If you sell vegetables, snacks, goods, or offer services on carts or street pavements in towns and cities, the government gives you an initial loan of ₹10,000 without guarantee. Repaying on time unlocks ₹20,000 and ₹50,000 higher loans plus cashbacks on digital payments.',
    simpleLanguageSummaryHindi: 'यदि आप ठेले, पटरी या फुटपाथ पर दुकान लगाते हैं, तो बिना किसी गारंटी के पहले ₹10,000 का लोन मिलता है। समय पर चुकाने पर ₹20,000 और फिर ₹50,000 का बड़ा लोन तथा ब्याज में 7% छूट मिलती है।',
    fullDescription: 'Beneficiaries receive initial working capital of ₹10,000 (1st tranche). On timely repayment, they become eligible for ₹20,000 (2nd tranche) and up to ₹50,000 (3rd tranche). On-time repayment attracts 7% interest subsidy credited directly to bank account.',
    fullDescriptionHindi: 'समय पर पुनर्भुगतान करने पर 7% की ब्याज सब्सिडी प्रत्यक्ष लाभ अंतरण (DBT) के माध्यम से बैंक खाते में जमा की जाती है। डिजिटल लेनदेन करने पर ₹1,200 प्रति वर्ष तक का कैशबैक भी मिलता है।',
    eligibilityDescription: 'Street vendors vending in urban areas possessing Certificate of Vending / ID card issued by Urban Local Bodies (ULBs) or recommendation letter from ULB.',
    eligibilityDescriptionHindi: 'शहरी क्षेत्रों में वेंडिंग करने वाले स्ट्रीट वेंडर्स जिनके पास नगर निगम/नगर पालिका का वेंडिंग प्रमाण पत्र या सिफारिश पत्र हो।',
    rules: {
      minAge: 18,
      occupations: ['street_vendor'],
      residence: 'urban',
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', isMandatory: true, purpose: 'Identity & eKYC verification', purposeHindi: 'पहचान व ई-केवाईसी सत्यापन' },
      { id: 'doc_bank_passbook', name: 'Bank Account Passbook', nameHindi: 'बैंक खाता पासबुक', isMandatory: true, purpose: 'Disbursal of loan amount and digital cashback', purposeHindi: 'ऋण राशि व कैशबैक जमा हेतु' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Verify Vending Status with ULB / Municipality', titleHindi: 'नगर निगम वेंडिंग स्टेटस जांचें', description: 'Check vending survey list at your municipal office or apply for Letter of Recommendation (LoR).', descriptionHindi: 'नगर निगम/नगर पालिका कार्यालय में वेंडिंग सूची जांचें अथवा सिफारिश पत्र (LoR) लें।' },
      { stepNumber: 2, title: 'Apply on PM SVANidhi Portal or Bank', titleHindi: 'पोर्टल अथवा बैंक में आवेदन', description: 'Submit simple mobile-based online application at pmsvanidhi.mohua.gov.in or at any bank.', descriptionHindi: 'पोर्टल पर मोबाइल नंबर से ओटीपी डालकर 5 मिनट में आवेदन फॉर्म भरें।' },
      { stepNumber: 3, title: 'Direct Credit to Bank Account', titleHindi: 'खाते में सीधा ऋण अंतरण', description: 'Upon bank approval, ₹10,000 is credited straight into your linked bank account.', descriptionHindi: 'बैंक से अनुमोदन होते ही ₹10,000 सीधे बैंक खाते में जमा हो जाते हैं।' }
    ],
    officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in',
    helplinePhone: '1800-11-1979',
    commonRejectionReasons: [
      { title: 'Missing Letter of Recommendation (LoR)', titleHindi: 'नगर निकाय का सिफारिश पत्र न होना', tip: 'If not included in town vending survey, meet the municipal Town Vending Committee (TVC) for an LoR.', tipHindi: 'नगर निगम की टाउन वेंडिंग कमेटी से लेटर ऑफ रिकमेंडेशन प्राप्त करें।' }
    ],
    verificationAgency: 'Urban Local Body (Municipality) & Lending Bank',
    verificationAgencyHindi: 'नगर निगम / नगर पालिका परिषद',
    processingTimeDays: 7
  },
  {
    id: 'nsap-old-age-pension',
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    nameHindi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
    shortCode: 'IGNOAPS',
    ministry: 'Ministry of Rural Development (NSAP)',
    ministryHindi: 'ग्रामीण विकास मंत्रालय (राष्ट्रीय सामाजिक सहायता कार्यक्रम)',
    category: 'social_security',
    categoryLabel: 'Social Security & Pension',
    categoryLabelHindi: 'सामाजिक सुरक्षा एवं पेंशन',
    benefitType: 'pension',
    benefitHeadline: 'Monthly direct cash pension (₹500 to ₹1,500/month with state top-up)',
    benefitHeadlineHindi: 'मासिक पेंशन (राज्य टॉप-अप सहित ₹500 से ₹1,500 प्रति माह)',
    summary: 'Non-contributory social security pension for destitute senior citizens aged 60 years and above living below poverty line.',
    summaryHindi: 'गरीबी रेखा से नीचे जीवनयापन करने वाले 60 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिकों के लिए सम्मानजनक मासिक पेंशन।',
    simpleLanguageSummary: 'If you or an elder in your family is 60 years or older and from a poor household, the government deposits a monthly pension directly into the bank or post office account to help pay for medicines and food.',
    simpleLanguageSummaryHindi: 'यदि आपकी या परिवार के बुजुर्ग की उम्र 60 वर्ष से अधिक है और परिवार गरीब है, तो दवाइयों और खर्च हेतु सरकार हर महीने पेंशन सीधे बैंक खाते में भेजती है।',
    fullDescription: 'Under IGNOAPS, central assistance is combined with state contribution. Beneficiaries aged 60-79 receive standard monthly pension; upon reaching 80 years, pension amount increases significantly.',
    fullDescriptionHindi: 'केंद्र और राज्य सरकार मिलकर मासिक पेंशन प्रदान करती हैं। 60 से 79 वर्ष की आयु तक नियमित पेंशन तथा 80 वर्ष की आयु के बाद बढ़ी हुई पेंशन राशि सीधे बैंक खाते में अंतरित होती है।',
    eligibilityDescription: 'Person aged 60 years or above belonging to a household living below poverty line according to state criteria.',
    eligibilityDescriptionHindi: '60 वर्ष या अधिक आयु का व्यक्ति जो गरीबी रेखा (BPL) से नीचे जीवनयापन करने वाले परिवार से संबंधित हो।',
    rules: {
      minAge: 60,
      requiresBPL: true,
      maxAnnualIncome: 100000,
      gender: 'all',
      specialFlags: ['senior_citizen']
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', isMandatory: true, purpose: 'Age proof (60+ years) and biometric verification', purposeHindi: 'आयु प्रमाण (60+ वर्ष) व पहचान सत्यापन' },
      { id: 'doc_ration_card', name: 'BPL / Antyodaya Ration Card', nameHindi: 'बीपीएल / अंत्योदय राशन कार्ड', isMandatory: true, purpose: 'Proof of living below poverty line', purposeHindi: 'गरीबी रेखा के नीचे होने का प्रमाण' },
      { id: 'doc_bank_passbook', name: 'Bank or Post Office Passbook', nameHindi: 'बैंक या डाकघर पासबुक', isMandatory: true, purpose: 'Monthly direct credit of pension', purposeHindi: 'मासिक पेंशन जमा होने हेतु खाता' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply at Tehsil / Block Office or e-District', titleHindi: 'तहसील, ब्लॉक कार्यालय या ई-डिस्ट्रिक्ट पर आवेदन', description: 'Submit application along with age and income certificate to Village Panchayat Secretary or BDO.', descriptionHindi: 'ग्राम पंचायत सचिव या खंड विकास अधिकारी (BDO) कार्यालय में आवेदन जमा करें।' },
      { stepNumber: 2, title: 'Inquiry & Sanction by Sub-Divisional Officer', titleHindi: 'एसडीएम / तहसीलदार द्वारा जांच व स्वीकृति', description: 'Revenue officials verify BPL status and age, followed by sanction order generation.', descriptionHindi: 'राजस्व अधिकारियों द्वारा पात्रता की जांच के बाद स्वीकृति आदेश जारी होता है।' },
      { stepNumber: 3, title: 'Monthly Pension Credit', titleHindi: 'मासिक पेंशन प्राप्ति', description: 'Pension is credited directly into bank account on fixed day of each month.', descriptionHindi: 'हर महीने निश्चित तारीख को पेंशन सीधे बैंक या डाकघर खाते में पहुंचती है।' }
    ],
    officialPortalUrl: 'https://nsap.nic.in',
    helplinePhone: '1800-11-0031',
    commonRejectionReasons: [
      { title: 'Age Discrepancy on Documents', titleHindi: 'दस्तावेजों में आयु 60 वर्ष से कम प्रदर्शित होना', tip: 'Date of birth on Aadhaar must prove complete 60 years on date of submission.', tipHindi: 'आधार कार्ड में जन्म तिथि के अनुसार आयु पूरे 60 वर्ष होनी चाहिए।' }
    ],
    verificationAgency: 'Social Welfare Department & Tehsildar',
    verificationAgencyHindi: 'जिला समाज कल्याण विभाग एवं तहसीलदार',
    processingTimeDays: 30
  },
  {
    id: 'nsap-widow-pension',
    name: 'Indira Gandhi National Widow Pension Scheme (IGNWPS)',
    nameHindi: 'इंदिरा गांधी राष्ट्रीय विधवा पेंशन योजना',
    shortCode: 'IGNWPS',
    ministry: 'Ministry of Rural Development (NSAP)',
    ministryHindi: 'ग्रामीण विकास मंत्रालय',
    category: 'social_security',
    categoryLabel: 'Social Security & Pension',
    categoryLabelHindi: 'सामाजिक सुरक्षा एवं पेंशन',
    benefitType: 'pension',
    benefitHeadline: 'Monthly pension of ₹500 to ₹1,500 directly in bank account',
    benefitHeadlineHindi: 'मासिक पेंशन ₹500 से ₹1,500 सीधे बैंक खाते में',
    summary: 'Social assistance pension providing financial independence to destitute widows aged between 40 and 79 years living below poverty line.',
    summaryHindi: 'गरीबी रेखा से नीचे जीवनयापन करने वाली 40 से 79 वर्ष की विधवा महिलाओं को वित्तीय स्वावलंबन हेतु मासिक पेंशन।',
    simpleLanguageSummary: 'Widowed women from low-income families get monthly government pension directly into their bank account to support themselves and their children with dignity.',
    simpleLanguageSummaryHindi: 'कम आय वाले परिवारों की विधवा महिलाओं को सम्मानपूर्वक जीवनयापन हेतु सरकार हर महीने निश्चित पेंशन सीधे बैंक खाते में भेजती है।',
    fullDescription: 'Under IGNWPS, eligible widows receive regular monthly pension until age 79, after which they are automatically transitioned to the Old Age Pension scheme at 80 years with enhanced benefits.',
    fullDescriptionHindi: 'पात्र विधवा महिलाओं को 79 वर्ष की आयु तक नियमित मासिक पेंशन मिलती है, जिसके बाद वे 80 वर्ष होने पर स्वतः वृद्धावस्था पेंशन में स्थानांतरित हो जाती हैं।',
    eligibilityDescription: 'Widow aged between 40 and 79 years belonging to a household living below poverty line.',
    eligibilityDescriptionHindi: '40 से 79 वर्ष की आयु की विधवा महिला जो गरीबी रेखा से नीचे जीवनयापन करने वाले परिवार से हो।',
    rules: {
      minAge: 40,
      maxAge: 79,
      gender: 'female',
      requiresBPL: true,
      maxAnnualIncome: 120000,
      specialFlags: ['widow']
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of Applicant', nameHindi: 'महिला का आधार कार्ड', isMandatory: true, purpose: 'Identity and age verification (40-79 years)', purposeHindi: 'पहचान व आयु सत्यापन' },
      { id: 'doc_bank_passbook', name: 'Bank Account Passbook (Aadhaar linked)', nameHindi: 'आधार लिंक बैंक पासबुक', isMandatory: true, purpose: 'Direct monthly pension credit', purposeHindi: 'मासिक पेंशन भुगतान हेतु' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Submit Application with Husband Death Certificate', titleHindi: 'पति के मृत्यु प्रमाण पत्र के साथ आवेदन', description: 'Submit form at Tehsil office, Social Welfare Department or online state citizen portal.', descriptionHindi: 'तहसील या समाज कल्याण विभाग में पति के मृत्यु प्रमाण पत्र के साथ आवेदन करें।' },
      { stepNumber: 2, title: 'Verification by Tehsildar / Nagar Nigam', titleHindi: 'तहसीलदार द्वारा सत्यापन', description: 'Verification of income and non-remarriage declaration by local administrative officer.', descriptionHindi: 'स्थानीय राजस्व अधिकारी द्वारा आय व पुनर्विवाह न होने के शपथ पत्र का सत्यापन।' },
      { stepNumber: 3, title: 'Pension Book Generation', titleHindi: 'पेंशन स्वीकृति एवं मासिक भुगतान', description: 'Social Welfare officer issues pension PPO number and monthly payments commence.', descriptionHindi: 'स्वीकृति के बाद हर माह पेंशन खाते में अंतरित होने लगती है।' }
    ],
    officialPortalUrl: 'https://nsap.nic.in',
    helplinePhone: '1800-11-0031',
    commonRejectionReasons: [
      { title: 'Missing Death Certificate of Spouse', titleHindi: 'पति का मृत्यु प्रमाण पत्र संलग्न न होना', tip: 'Official registered death certificate from Nagar Nigam or Gram Panchayat is mandatory.', tipHindi: 'नगर निगम या ग्राम पंचायत द्वारा जारी पंजीकृत मृत्यु प्रमाण पत्र अनिवार्य है।' }
    ],
    verificationAgency: 'District Social Welfare Officer (DSWO)',
    verificationAgencyHindi: 'जिला समाज कल्याण अधिकारी',
    processingTimeDays: 25
  },
  {
    id: 'post-matric-scholarship',
    name: 'Post-Matric Scholarship Scheme for SC / ST / OBC Students',
    nameHindi: 'पोस्ट-मैट्रिक छात्रवृत्ति योजना (एससी/एसटी/ओबीसी छात्र)',
    shortCode: 'POST-MATRIC',
    ministry: 'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs',
    ministryHindi: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय / जनजातीय कार्य मंत्रालय',
    category: 'education',
    categoryLabel: 'Education & Learning',
    categoryLabelHindi: 'शिक्षा एवं छात्रवृत्ति',
    benefitType: 'scholarship',
    benefitHeadline: '100% Non-refundable tuition fees reimbursed + Monthly maintenance allowance',
    benefitHeadlineHindi: 'पूरी कॉलेज ट्यूशन फीस वापसी + मासिक रख-रखाव भत्ता',
    summary: 'Centrally sponsored scholarship providing financial assistance to eligible students at post-matriculation or post-secondary stage to enable them to complete their education.',
    summaryHindi: 'कक्षा 11, 12, स्नातक, परास्नातक, आईटीआई, डिप्लोमा एवं मेडिकल/इंजीनियरिंग कॉलेज के छात्रों को पूर्ण फीस प्रतिपूर्ति एवं मासिक भत्ता।',
    simpleLanguageSummary: 'If you are studying in Class 11, 12, college, or university and come from SC, ST, or OBC background, the government pays your entire college tuition fees and gives monthly pocket money so your family does not take education debt.',
    simpleLanguageSummaryHindi: 'यदि आप कक्षा 11वीं, 12वीं, कॉलेज या विश्वविद्यालय में पढ़ रहे हैं, तो सरकार आपकी कॉलेज फीस सीधे भरती है और पढ़ाई के खर्च हेतु मासिक भत्ता देती है।',
    fullDescription: 'Covers all recognized post-matriculation courses in recognized institutions. Includes course fee, compulsory non-refundable fees, book grant, and monthly maintenance allowance. Disbursed directly into student’s Aadhaar-seeded bank account.',
    fullDescriptionHindi: 'सभी मान्यता प्राप्त उच्चतर माध्यमिक, डिग्री और व्यावसायिक पाठ्यक्रमों को कवर करता है। फीस के अलावा किताबों और रहने-खाने के लिए मासिक भत्ता सीधे छात्र के खाते में भेजा जाता है।',
    eligibilityDescription: 'Students belonging to SC, ST, or OBC categories whose parental/guardian annual income does not exceed ₹2.5 Lakh per annum.',
    eligibilityDescriptionHindi: 'एससी, एसटी अथवा ओबीसी वर्ग के छात्र जिनके परिवार की कुल वार्षिक आय ₹2.5 लाख से अधिक न हो।',
    rules: {
      minAge: 15,
      occupations: ['student'],
      categories: ['SC', 'ST', 'OBC'],
      maxAnnualIncome: 250000,
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of Student', nameHindi: 'छात्र का आधार कार्ड', isMandatory: true, purpose: 'Identity & National Scholarship Portal (NSP) eKYC', purposeHindi: 'पहचान व राष्ट्रीय छात्रवृत्ति पोर्टल केवाईसी' },
      { id: 'doc_caste_cert', name: 'Valid Caste Certificate (SC/ST/OBC)', nameHindi: 'जाति प्रमाण पत्र (एससी/एसटी/ओबीसी)', isMandatory: true, purpose: 'Category verification', purposeHindi: 'आरक्षित वर्ग सत्यापन' },
      { id: 'doc_income_cert', name: 'Annual Income Certificate (< ₹2.5L)', nameHindi: 'पारिवारिक आय प्रमाण पत्र (< ₹2.5 लाख)', isMandatory: true, purpose: 'Income eligibility verification', purposeHindi: 'आय सीमा सत्यापन' },
      { id: 'doc_student_marksheet', name: 'Last Year Marksheet & Current Fee Receipt', nameHindi: 'पिछली कक्षा की अंकतालिका व कॉलेज फीस रसीद', isMandatory: true, purpose: 'Academic progress and institution verification', purposeHindi: 'अध्ययनरत होने का प्रमाण' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on National Scholarship Portal (NSP)', titleHindi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर पंजीकरण', description: 'Visit scholarships.gov.in or state scholarship portal and register with Aadhaar OTP.', descriptionHindi: 'scholarships.gov.in पर जाएं और आधार ओटीपी से नया छात्र पंजीकरण करें।' },
      { stepNumber: 2, title: 'Fill Institute & Course Details', titleHindi: 'संस्थान एवं पाठ्यक्रम विवरण दर्ज करें', description: 'Select college AISHE code, upload fee receipt, caste certificate and marksheet.', descriptionHindi: 'कॉलेज का कोड चुनें, फीस रसीद, जाति एवं आय प्रमाण पत्र अपलोड करें।' },
      { stepNumber: 3, title: 'Institute Verification & DBT Disbursal', titleHindi: 'कॉलेज सत्यापन एवं डीबीटी भुगतान', description: 'College Nodal Officer verifies form, forwards to district officer, and funds credit directly.', descriptionHindi: 'कॉलेज नोडल अधिकारी द्वारा सत्यापन के बाद छात्रवृत्ति सीधे बैंक खाते में आती है।' }
    ],
    officialPortalUrl: 'https://scholarships.gov.in',
    helplinePhone: '0120-6619540',
    commonRejectionReasons: [
      { title: 'Failure by College Nodal Officer to Verify on Time', titleHindi: 'कॉलेज द्वारा समय सीमा में सत्यापन न किया जाना', tip: 'Submit physical copies of uploaded documents to your college scholarship cell immediately.', tipHindi: 'आवेदन के तुरंत बाद कॉलेज के छात्रवृत्ति विभाग में हार्ड कॉपी जमा कर सत्यापन सुनिश्चित कराएं।' },
      { title: 'Income Certificate Exceeding ₹2.5 Lakh Limit', titleHindi: 'आय प्रमाण पत्र में आय ₹2.5 लाख से अधिक होना', tip: 'Income certificate must be in father/guardian name with annual family income strictly under ₹2.5L.', tipHindi: 'सक्षम अधिकारी द्वारा जारी आय प्रमाण पत्र में पारिवारिक आय सीमा के भीतर होनी चाहिए।' }
    ],
    verificationAgency: 'College Nodal Officer & District Social Welfare Officer',
    verificationAgencyHindi: 'कॉलेज नोडल अधिकारी एवं जिला पिछड़ा वर्ग/समाज कल्याण अधिकारी',
    processingTimeDays: 40
  },
  {
    id: 'pm-surya-ghar',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    nameHindi: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
    shortCode: 'PM-SURYA-GHAR',
    ministry: 'Ministry of New and Renewable Energy (MNRE)',
    ministryHindi: 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय',
    category: 'clean_energy',
    categoryLabel: 'Clean Energy & Utilities',
    categoryLabelHindi: 'सौर ऊर्जा एवं बिजली',
    benefitType: 'asset_subsidy',
    benefitHeadline: 'Up to ₹78,000 direct subsidy for rooftop solar + Up to 300 units free power every month',
    benefitHeadlineHindi: 'सोलर पैनल पर ₹78,000 तक सीधी सब्सिडी + हर महीने 300 यूनिट तक मुफ्त बिजली',
    summary: 'A transformative national scheme to light up 1 crore households across India by providing heavy capital subsidies for installing rooftop solar systems.',
    summaryHindi: 'देश भर के 1 करोड़ घरों की छतों पर सोलर सिस्टम लगाने और परिवारों को प्रति माह 300 यूनिट तक मुफ्त बिजली उपलब्ध कराने की राष्ट्रीय योजना।',
    simpleLanguageSummary: 'If you have a concrete or tin roof with sunlight, government pays up to ₹78,000 directly into your bank account when you install solar panels. Your electricity bill drops to zero, and extra power generated is bought by the power company.',
    simpleLanguageSummaryHindi: 'यदि आपके घर की छत पर धूप आती है, तो सोलर पैनल लगवाने पर सरकार ₹78,000 तक की सब्सिडी सीधे आपके खाते में देती है। बिजली का बिल शून्य हो जाता है और अतिरिक्त बिजली सरकार खरीदती है।',
    fullDescription: 'Subsidies provided: ₹30,000 for 1 kW system; ₹60,000 for 2 kW system; ₹78,000 for 3 kW and larger systems. Collateral-free concessional loans at ~7% interest available through nationalized banks.',
    fullDescriptionHindi: 'सब्सिडी संरचना: 1 किलोवाट सिस्टम पर ₹30,000, 2 किलोवाट पर ₹60,000, और 3 किलोवाट या अधिक पर ₹78,000 सीधी सब्सिडी। राष्ट्रीयकृत बैंकों से 7% ब्याज पर बिना गारंटी आसान लोन भी उपलब्ध।',
    eligibilityDescription: 'Any Indian household with a residential electricity connection in their name and suitable roof space with unshaded access to sunlight.',
    eligibilityDescriptionHindi: 'कोई भी भारतीय परिवार जिसके पास घरेलू बिजली कनेक्शन हो और छत पर पर्याप्त धूप आती हो।',
    rules: {
      minAge: 18,
      specialFlags: ['has_unshaded_rooftop'],
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_electricity_bill', name: 'Latest Residential Electricity Bill', nameHindi: 'नवीनतम घरेलू बिजली बिल', isMandatory: true, purpose: 'Consumer account number (CA number) and DISCOM verification', purposeHindi: 'बिजली उपभोक्ता संख्या व डिस्कॉम सत्यापन' },
      { id: 'doc_aadhaar', name: 'Aadhaar Card of Electricity Consumer', nameHindi: 'बिजली उपभोक्ता का आधार कार्ड', isMandatory: true, purpose: 'Identity & National Portal eKYC', purposeHindi: 'पहचान व राष्ट्रीय पोर्टल सत्यापन' },
      { id: 'doc_bank_passbook', name: 'Bank Account Passbook (Aadhaar linked)', nameHindi: 'आधार लिंक बैंक पासबुक', isMandatory: true, purpose: 'Direct credit of subsidy within 30 days of net meter commissioning', purposeHindi: 'नेट मीटर लगने के 30 दिन में सीधी सब्सिडी प्राप्ति' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on National Portal', titleHindi: 'राष्ट्रीय पोर्टल पर पंजीकरण', description: 'Visit pmsuryaghar.gov.in, select your State and DISCOM, enter electricity consumer number.', descriptionHindi: 'pmsuryaghar.gov.in पर जाकर राज्य और बिजली कंपनी चुनें तथा बिजली बिल नंबर दर्ज करें।' },
      { stepNumber: 2, title: 'Select Registered Vendor', titleHindi: 'पंजीकृत वेंडर का चयन', description: 'Choose an MNRE-registered solar vendor in your district to conduct roof survey and install.', descriptionHindi: 'पोर्टल पर अपने जिले के अधिकृत सोलर वेंडर को चुनें जो छत की माप कर सिस्टम लगाएगा।' },
      { stepNumber: 3, title: 'Net Meter Commissioning & Subsidy Credit', titleHindi: 'नेट मीटर स्थापना एवं सब्सिडी अंतरण', description: 'DISCOM installs net meter; commissioning certificate generates and subsidy credits within 30 days.', descriptionHindi: 'डिस्कॉम द्वारा नेट मीटर लगाने के 30 दिन के भीतर सब्सिडी सीधे बैंक खाते में जमा हो जाती है।' }
    ],
    officialPortalUrl: 'https://pmsuryaghar.gov.in',
    helplinePhone: '15555 / 1800-180-3333',
    commonRejectionReasons: [
      { title: 'Electricity Connection in Commercial / Non-Domestic Tariff', titleHindi: 'बिजली कनेक्शन घरेलू न होकर व्यावसायिक होना', tip: 'Subsidies are strictly reserved for domestic (residential) tariff connections.', tipHindi: 'सब्सिडी केवल घरेलू (रेजिडेंशियल) बिजली कनेक्शनों पर ही देय है।' },
      { title: 'Installation through Unregistered Vendor', titleHindi: 'गैर-पंजीकृत वेंडर से काम कराना', tip: 'Install only through officially empaneled vendors listed on the National Portal.', tipHindi: 'केवल राष्ट्रीय पोर्टल पर सूचीबद्ध अधिकृत वेंडर से ही सिस्टम लगवाएं।' }
    ],
    verificationAgency: 'State Electricity Distribution Company (DISCOM) & MNRE',
    verificationAgencyHindi: 'राज्य विद्युत वितरण कंपनी (DISCOM)',
    processingTimeDays: 30
  },
  {
    id: 'mgnrega',
    name: 'Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)',
    nameHindi: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना (मनरेगा)',
    shortCode: 'MGNREGA',
    ministry: 'Ministry of Rural Development',
    ministryHindi: 'ग्रामीण विकास मंत्रालय',
    category: 'livelihood_business',
    categoryLabel: 'Business & Livelihood',
    categoryLabelHindi: 'रोजगार एवं व्यवसाय',
    benefitType: 'employment_guarantee',
    benefitHeadline: 'Guaranteed 100 days of wage employment per rural household per year',
    benefitHeadlineHindi: 'प्रति ग्रामीण परिवार प्रति वर्ष 100 दिन का कानूनी गारंटीकृत रोजगार',
    summary: 'Legal guarantee of at least 100 days of unskilled manual wage employment in every financial year to adult members of rural households willing to work.',
    summaryHindi: 'ग्रामीण परिवारों के वयस्क सदस्यों को प्रत्येक वित्तीय वर्ष में कम से कम 100 दिनों के अकुशल शारीरिक श्रम रोजगार की कानूनी गारंटी।',
    simpleLanguageSummary: 'If you live in a village and need work, you can apply for a Job Card at the Panchayat. The government is legally required to give you work within 15 days or pay unemployment allowance, with wages deposited directly into your bank account.',
    simpleLanguageSummaryHindi: 'यदि आप गांव में रहते हैं और काम चाहते हैं, तो पंचायत से जॉब कार्ड बनवाएं। आवेदन के 15 दिनों में सरकार को काम देना कानूनी रूप से अनिवार्य है, अन्यथा बेरोजगारी भत्ता मिलता है।',
    fullDescription: 'MGNREGA wages are statutorily notified state-wise and paid entirely via Direct Benefit Transfer through Aadhaar-Based Payment System (ABPS). Women are entitled to equal wages, and worksite facilities (creche, drinking water) are mandatory.',
    fullDescriptionHindi: 'मजदूरी दरें राज्यवार तय होती हैं और आधार बेस्ड पेमेंट सिस्टम (ABPS) के जरिए सीधे बैंक खाते में जाती हैं। पुरुषों और महिलाओं को एक समान मजदूरी मिलती है।',
    eligibilityDescription: 'Adult members of any rural household willing to do unskilled manual work. Resident of the Gram Panchayat area.',
    eligibilityDescriptionHindi: 'किसी भी ग्रामीण परिवार के वयस्क सदस्य जो अकुशल शारीरिक श्रम करने के इच्छुक हों। संबंधित ग्राम पंचायत के निवासी हों।',
    rules: {
      minAge: 18,
      residence: 'rural',
      gender: 'all',
      occupations: ['agricultural_labour', 'daily_wage_worker', 'farmer', 'unemployed']
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of all adult members', nameHindi: 'सभी वयस्क सदस्यों का आधार कार्ड', isMandatory: true, purpose: 'ABPS wage disbursement linkage', purposeHindi: 'आधार आधारित मजदूरी भुगतान' },
      { id: 'doc_bank_passbook', name: 'Post Office or Commercial Bank Passbook', nameHindi: 'बैंक या डाकघर पासबुक', isMandatory: true, purpose: 'Weekly/fortnightly wage credits', purposeHindi: 'मजदूरी जमा होने हेतु खाता' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply to Gram Panchayat for Job Card', titleHindi: 'ग्राम पंचायत में जॉब कार्ड हेतु आवेदन', description: 'Submit simple written application or verbal request with photos of adult family members.', descriptionHindi: 'ग्राम रोजगार सेवक या पंचायत सचिव को परिवार के वयस्क सदस्यों के फोटो के साथ आवेदन दें।' },
      { stepNumber: 2, title: 'Job Card Issuance within 15 Days', titleHindi: '15 दिन में मुफ्त जॉब कार्ड प्राप्ति', description: 'Gram Panchayat issues free Job Card with unique registration number and photo.', descriptionHindi: 'पंचायत द्वारा 15 दिनों के भीतर निःशुल्क फोटोयुक्त जॉब कार्ड जारी किया जाता है।' },
      { stepNumber: 3, title: 'Demand Work & Receive Wages', titleHindi: 'काम की मांग करें एवं मजदूरी पाएं', description: 'Submit dated demand for work; employment provided within 5 km radius within 15 days.', descriptionHindi: 'काम का आवेदन दें; 15 दिन के भीतर 5 किमी के दायरे में काम मिलना अनिवार्य है।' }
    ],
    officialPortalUrl: 'https://nrega.nic.in',
    helplinePhone: '1800-111-555 / 1800-180-6127',
    commonRejectionReasons: [
      { title: 'Aadhaar Not Mapped to NPCI / ABPS', titleHindi: 'खाते में एबीपीएस (आधार बेस्ड पेमेंट) सक्रिय न होना', tip: 'Must have Aadhaar seeded and authenticated for Aadhaar Based Payment System in your bank.', tipHindi: 'अपनी बैंक शाखा में जाकर आधार आधारित भुगतान प्रणाली (ABPS) सक्रिय कराएं।' }
    ],
    verificationAgency: 'Gram Panchayat & Programme Officer (Block)',
    verificationAgencyHindi: 'ग्राम रोजगार सेवक एवं ग्राम प्रधान',
    processingTimeDays: 15
  },
  {
    id: 'pm-matru-vandana',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    nameHindi: 'प्रधानमंत्री मातृ वंदना योजना (पीएमएमवीवाई)',
    shortCode: 'PMMVY',
    ministry: 'Ministry of Women and Child Development',
    ministryHindi: 'महिला एवं बाल विकास मंत्रालय',
    category: 'women_children',
    categoryLabel: 'Women & Family Welfare',
    categoryLabelHindi: 'महिला एवं बाल कल्याण',
    benefitType: 'cash_transfer',
    benefitHeadline: '₹5,000 for 1st child + ₹6,000 for 2nd child (if girl child) directly to mother’s account',
    benefitHeadlineHindi: 'पहले बच्चे पर ₹5,000 एवं दूसरे बच्चे (बालिका होने पर) ₹6,000 सीधे मां के खाते में',
    summary: 'Maternity benefit cash incentive transferred directly into the bank account of pregnant women and lactating mothers for health, nutrition, and wage compensation.',
    summaryHindi: 'गर्भवती महिलाओं और स्तनपान कराने वाली माताओं के स्वास्थ्य, पोषण और मजदूरी क्षतिपूर्ति हेतु प्रत्यक्ष नकद मातृत्व लाभ।',
    simpleLanguageSummary: 'When an eligible mother is expecting a baby, government transfers ₹5,000 in two installments to buy nutritious food and get medical checkups, plus ₹6,000 for a second daughter to encourage girl child birth.',
    simpleLanguageSummaryHindi: 'गर्भावस्था के दौरान पौष्टिक आहार और जांच के लिए मां के खाते में ₹5,000 की नकद सहायता सीधे मिलती है। दूसरी संतान बेटी होने पर ₹6,000 का अतिरिक्त लाभ मिलता है।',
    fullDescription: 'Under Mission Shakti, PMMVY provides cash incentives through DBT. First installment of ₹3,000 is given on pregnancy registration and antenatal check-up (ANC), second installment of ₹2,000 after child birth registration and first cycle of vaccinations.',
    fullDescriptionHindi: 'पहली किस्त ₹3,000 गर्भावस्था के पंजीकरण और प्रसव पूर्व जांच (ANC) पर, तथा दूसरी किस्त ₹2,000 बच्चे के जन्म पंजीकरण और टीकाकरण के पहले चक्र के बाद दी जाती है।',
    eligibilityDescription: 'Pregnant Women and Lactating Mothers (PW&LM) belonging to socially and economically disadvantaged sections. Regular government employees are excluded.',
    eligibilityDescriptionHindi: 'आर्थिक व सामाजिक रूप से कमजोर परिवारों की गर्भवती और धात्री महिलाएं। सरकारी सेवा में कार्यरत महिलाएं पात्र नहीं हैं।',
    rules: {
      minAge: 19,
      gender: 'female',
      specialFlags: ['pregnant_lactating'],
      maxAnnualIncome: 800000
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of Mother & Husband', nameHindi: 'माता एवं पति का आधार कार्ड', isMandatory: true, purpose: 'Identity and de-duplication verification', purposeHindi: 'पहचान व सत्यापन' },
      { id: 'doc_bank_passbook', name: 'Mother’s Own Bank Passbook (Aadhaar linked)', nameHindi: 'माता का स्वयं का आधार लिंक बैंक खाता', isMandatory: true, purpose: 'Direct Benefit Transfer credit', purposeHindi: 'सीधे खाते में डीबीटी भुगतान' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register at Anganwadi Center (AWC) / Health Center', titleHindi: 'आंगनवाड़ी केंद्र या प्राथमिक स्वास्थ्य केंद्र पर पंजीकरण', description: 'Meet your local Anganwadi Worker (AWW) or ASHA within 570 days of Last Menstrual Period (LMP).', descriptionHindi: 'अपनी स्थानीय आंगनवाड़ी कार्यकर्ता या आशा दीदी से मिलकर मातृत्व और बाल सुरक्षा कार्ड (MCP) बनवाएं।' },
      { stepNumber: 2, title: 'Fill Form 1A / 1B on PMMVY Portal', titleHindi: 'पीएमएमवीवाई पोर्टल पर फॉर्म भरें', description: 'Anganwadi worker enters details on pmmvy.wcd.gov.in with MCP card and Aadhaar details.', descriptionHindi: 'आंगनवाड़ी कार्यकर्ता द्वारा पोर्टल पर दस्तावेज अपलोड कर ऑनलाइन फॉर्म भरा जाता है।' },
      { stepNumber: 3, title: 'Direct Bank Transfer', titleHindi: 'सीधा बैंक अंतरण', description: 'Funds are transferred through Public Financial Management System (PFMS) directly into mother’s account.', descriptionHindi: 'पीएमएसएस के जरिए नकद राशि सीधे माता के बैंक खाते में जमा होती है।' }
    ],
    officialPortalUrl: 'https://pmmvy.wcd.gov.in',
    helplinePhone: '1098 / 011-23382393',
    commonRejectionReasons: [
      { title: 'Joint Account or Account in Husband’s Name', titleHindi: 'पति के नाम पर खाता या संयुक्त खाता होना', tip: 'Bank account must strictly be a single individual account opened in mother’s own name.', tipHindi: 'खाता अनिवार्य रूप से माता के अपने नाम पर एकल (सिंगल) खाता होना चाहिए।' }
    ],
    verificationAgency: 'Child Development Project Officer (CDPO) & Anganwadi Worker',
    verificationAgencyHindi: 'बाल विकास परियोजना अधिकारी (सीडीपीओ) एवं आंगनवाड़ी',
    processingTimeDays: 20
  },
  {
    id: 'atal-pension-yojana',
    name: 'Atal Pension Yojana (APY)',
    nameHindi: 'अटल पेंशन योजना (एपीवाई)',
    shortCode: 'APY',
    ministry: 'Pension Fund Regulatory and Development Authority (PFRDA / Ministry of Finance)',
    ministryHindi: 'पेंशन निधि विनियामक और विकास प्राधिकरण (वित्त मंत्रालय)',
    category: 'social_security',
    categoryLabel: 'Social Security & Pension',
    categoryLabelHindi: 'सामाजिक सुरक्षा एवं पेंशन',
    benefitType: 'pension',
    benefitHeadline: 'Guaranteed government monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000',
    benefitHeadlineHindi: 'गारंटीकृत सरकारी मासिक पेंशन ₹1,000 से ₹5,000 प्रति माह 60 वर्ष की आयु के बाद',
    summary: 'Government-guaranteed pension scheme primarily targeted at unorganized sector workers ensuring predictable monthly pension post-60 years of age.',
    summaryHindi: 'असंगठित क्षेत्र के श्रमिकों और नागरिकों के लिए सरकार द्वारा गारंटीकृत मासिक पेंशन योजना।',
    simpleLanguageSummary: 'By saving a small amount (starting at just ₹42 per month depending on your age) in your bank account, government guarantees you will receive a fixed pension of up to ₹5,000 every month for life after turning 60.',
    simpleLanguageSummaryHindi: 'हर महीने बैंक खाते से थोड़ी सी बचत (उम्र के अनुसार मात्र ₹42/माह से शुरू) करके, 60 वर्ष की उम्र के बाद जीवन भर हर महीने ₹1,000 से ₹5,000 तक की निश्चित सरकारी पेंशन पाएं।',
    fullDescription: 'Under APY, subscriber receives a guaranteed minimum pension of ₹1,000 to ₹5,000 per month from age 60 until death. Upon subscriber demise, same pension continues to spouse, and on demise of both, entire accumulated pension wealth is returned to nominee.',
    fullDescriptionHindi: '60 वर्ष की आयु पूरी होने पर ग्राहक को जीवन पर्यंत निश्चित मासिक पेंशन मिलती है। ग्राहक के बाद जीवनसाथी को समान पेंशन तथा दोनों के बाद पूरी संचित निधि नामांकित व्यक्ति (नॉमिनी) को वापस मिलती है।',
    eligibilityDescription: 'All Indian citizens aged 18 to 40 years holding a savings bank account. Income tax payers are not eligible to join.',
    eligibilityDescriptionHindi: '18 से 40 वर्ष की आयु के सभी भारतीय नागरिक जिनका किसी बैंक या डाकघर में बचत खाता हो। आयकर दाता पात्र नहीं हैं।',
    rules: {
      minAge: 18,
      maxAge: 40,
      gender: 'all'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', isMandatory: true, purpose: 'Subscriber identification and KYC', purposeHindi: 'ग्राहक पहचान व केवाईसी' },
      { id: 'doc_bank_passbook', name: 'Savings Bank Account with Auto-Debit Mandate', nameHindi: 'बचत बैंक खाता (ऑटो-डेबिट सुविधा सहित)', isMandatory: true, purpose: 'Monthly automated contribution deduction', purposeHindi: 'मासिक अंशदान कटौती हेतु' }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Home Bank Branch or NetBanking', titleHindi: 'बैंक शाखा जाएं या नेटबैंकिंग से आवेदन करें', description: 'Approach your bank branch or activate through Mobile/Internet Banking.', descriptionHindi: 'अपनी बैंक शाखा में जाएं अथवा बैंक के मोबाइल ऐप/नेटबैंकिंग में एपीवाई विकल्प चुनें।' },
      { stepNumber: 2, title: 'Select Pension Slabs (₹1,000 to ₹5,000)', titleHindi: 'पेंशन स्लैब चुनें', description: 'Choose desired monthly pension and authorize monthly auto-debit on fixed date.', descriptionHindi: 'वांछित पेंशन राशि चुनें और खाते से मासिक कटौती की सहमति दें।' },
      { stepNumber: 3, title: 'PRAN Generation & Confirmation', titleHindi: 'प्रान (PRAN) नंबर प्राप्ति', description: 'Permanent Retirement Account Number (PRAN) is issued and SMS confirmation received.', descriptionHindi: 'स्थायी सेवानिवृत्ति खाता संख्या (PRAN) जारी होती है और एसएमएस द्वारा पुष्टि मिलती है।' }
    ],
    officialPortalUrl: 'https://www.npscra.nsdl.co.in',
    helplinePhone: '1800-110-069',
    commonRejectionReasons: [
      { title: 'Subscriber is an Income Tax Payer', titleHindi: 'आवेदनकर्ता का आयकर दाता होना', tip: 'Under revised rules, any citizen who is or has been an income tax payer cannot open an APY account.', tipHindi: 'संशोधित नियमों के अनुसार आयकर दाताओं के लिए यह योजना प्रतिबंधित है।' }
    ],
    verificationAgency: 'PFRDA / National Securities Depository Limited (NSDL)',
    verificationAgencyHindi: 'पेंशन निधि विनियामक एवं विकास प्राधिकरण (PFRDA)',
    processingTimeDays: 1
  }
];
