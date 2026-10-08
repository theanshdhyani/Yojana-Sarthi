export interface MasterDocument {
  id: string;
  name: string;
  nameHindi: string;
  shortDesc: string;
  shortDescHindi: string;
  issuingAuthority: string;
  issuingAuthorityHindi: string;
  cost: string;
  costHindi: string;
  estimatedTime: string;
  estimatedTimeHindi: string;
  officialPortal: string;
  tips: string;
  tipsHindi: string;
}

export const MASTER_DOCUMENTS: MasterDocument[] = [
  {
    id: 'doc_aadhaar',
    name: 'Aadhaar Card (Linked with Mobile & Bank)',
    nameHindi: 'आधार कार्ड (मोबाइल और बैंक से लिंक)',
    shortDesc: 'Primary 12-digit proof of identity and biometric verification issued by UIDAI.',
    shortDescHindi: 'यूआईडीएआई द्वारा जारी 12 अंकों का पहचान प्रमाण व बायोमेट्रिक प्रमाणीकरण।',
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    issuingAuthorityHindi: 'भारतीय विशिष्ट पहचान प्राधिकरण (UIDAI)',
    cost: 'Free for creation / ₹50 for update',
    costHindi: 'नया निःशुल्क / अपडेट ₹50',
    estimatedTime: 'Instant download / 10-15 days for physical card',
    estimatedTimeHindi: 'ई-आधार तुरंत / डाक से 10-15 दिन',
    officialPortal: 'https://myaadhaar.uidai.gov.in',
    tips: 'Ensure your active mobile number is linked for OTP and bank account is NPCI-seeded for DBT.',
    tipsHindi: 'सुनिश्चित करें कि मोबाइल नंबर लिंक हो और बैंक खाता डीबीटी हेतु एनपीसीआई से मैप हो।'
  },
  {
    id: 'doc_ration_card',
    name: 'Ration Card (NFSA / BPL / Antyodaya)',
    nameHindi: 'राशन कार्ड (राष्ट्रीय खाद्य सुरक्षा / बीपीएल / अंत्योदय)',
    shortDesc: 'Family identity and subsidised grain eligibility issued by Department of Food & Civil Supplies.',
    shortDescHindi: 'खाद्य एवं रसद विभाग द्वारा जारी पारिवारिक पहचान एवं खाद्यान्न पात्रता दस्तावेज।',
    issuingAuthority: 'State Department of Food & Civil Supplies',
    issuingAuthorityHindi: 'राज्य खाद्य एवं नागरिक आपूर्ति विभाग',
    cost: '₹20 to ₹50 nominal state fee',
    costHindi: '₹20 से ₹50 राज्य शुल्क',
    estimatedTime: '15 to 30 days',
    estimatedTimeHindi: '15 से 30 कार्यदिवस',
    officialPortal: 'https://nfsa.gov.in',
    tips: 'Keep member list updated; used as definitive proof for social welfare schemes.',
    tipsHindi: 'परिवार के सभी सदस्यों के नाम सही दर्ज रखें; यह सामाजिक सुरक्षा में मुख्य प्रमाण है।'
  },
  {
    id: 'doc_income_cert',
    name: 'Income Certificate (आय प्रमाण पत्र)',
    nameHindi: 'आय प्रमाण पत्र',
    shortDesc: 'Authoritative certification of total annual household income issued by Revenue Department.',
    shortDescHindi: 'राजस्व विभाग/तहसीलदार द्वारा प्रमाणित पारिवारिक वार्षिक आय का कानूनी दस्तावेज।',
    issuingAuthority: 'Tehsildar / Sub-Divisional Magistrate (Revenue Dept)',
    issuingAuthorityHindi: 'तहसीलदार / उपजिलाधिकारी (राजस्व विभाग)',
    cost: '₹15 to ₹30 at CSC / e-District',
    costHindi: 'सीएससी/ई-डिस्ट्रिक्ट पर ₹15 से ₹30',
    estimatedTime: '7 to 15 days',
    estimatedTimeHindi: '7 से 15 कार्यदिवस',
    officialPortal: 'https://edistrict.gov.in',
    tips: 'Income certificates are typically valid for 3 years. Renew on time for scholarships and subsidies.',
    tipsHindi: 'सामान्यतः 3 वर्ष तक मान्य रहता है। छात्रवृत्ति और सब्सिडी हेतु समय पर नवीनीकरण कराएं।'
  },
  {
    id: 'doc_caste_cert',
    name: 'Caste Certificate (जाति प्रमाण पत्र - SC/ST/OBC/EWS)',
    nameHindi: 'जाति प्रमाण पत्र (SC/ST/OBC/EWS)',
    shortDesc: 'Legal proof of affirmative action and category membership for reservation and quotas.',
    shortDescHindi: 'आरक्षण और सामाजिक सहायता योजनाओं के लिए अधिकृत जाति/वर्ग प्रमाण पत्र।',
    issuingAuthority: 'Sub-Divisional Magistrate / Tehsildar',
    issuingAuthorityHindi: 'उप-जिला मजिस्ट्रेट (SDM) / तहसीलदार',
    cost: '₹15 to ₹30',
    costHindi: '₹15 से ₹30',
    estimatedTime: '10 to 20 days',
    estimatedTimeHindi: '10 से 20 कार्यदिवस',
    officialPortal: 'https://services.india.gov.in',
    tips: 'Central government schemes often require the Central format certificate with digital signature.',
    tipsHindi: 'केंद्रीय योजनाओं में केंद्र सरकार के प्रारूप का डिजिटल हस्ताक्षरित प्रमाण पत्र मान्य होता है।'
  },
  {
    id: 'doc_residence_cert',
    name: 'Domicile / Residence Certificate (निवास प्रमाण पत्र)',
    nameHindi: 'मूल निवास / अधिवास प्रमाण पत्र',
    shortDesc: 'Proof of permanent residency in the state or union territory.',
    shortDescHindi: 'संबंधित राज्य या केंद्र शासित प्रदेश में स्थायी निवास का वैधानिक प्रमाण।',
    issuingAuthority: 'Tehsildar / District Magistrate',
    issuingAuthorityHindi: 'तहसीलदार / जिला मजिस्ट्रेट',
    cost: '₹20 to ₹50',
    costHindi: '₹20 से ₹50',
    estimatedTime: '7 to 15 days',
    estimatedTimeHindi: '7 से 15 कार्यदिवस',
    officialPortal: 'https://edistrict.gov.in',
    tips: 'Supported by electricity bill, voter ID, or land papers showing minimum residency years.',
    tipsHindi: 'बिजली बिल, मतदाता पहचान या खतौनी के आधार पर जारी होता है।'
  },
  {
    id: 'doc_land_records',
    name: 'Land Ownership Record (खतौनी / जमाबंदी / 7/12 Extract)',
    nameHindi: 'भूमि अभिलेख (खतौनी / जमाबंदी / 7/12 नकल)',
    shortDesc: 'Computerized land titling document with Khasra and Khatauni numbers.',
    shortDescHindi: 'खसरा-खतौनी संख्या के साथ राजस्व विभाग द्वारा जारी कम्प्यूटरीकृत भू-अभिलेख।',
    issuingAuthority: 'State Revenue Department / Bhulekh Portal',
    issuingAuthorityHindi: 'राज्य राजस्व विभाग / भूलेख पोर्टल',
    cost: '₹10 to ₹20 per certified copy',
    costHindi: '₹10 से ₹20 प्रति प्रमाणित प्रति',
    estimatedTime: 'Instant online download',
    estimatedTimeHindi: 'भूलेख पोर्टल पर तत्काल डाउनलोड',
    officialPortal: 'https://bhulekh.gov.in',
    tips: 'Name on land record must match Aadhaar exactly to prevent PM-KISAN installment holds.',
    tipsHindi: 'जमीन के कागजात में नाम और आधार का नाम एक समान होना अनिवार्य है।'
  },
  {
    id: 'doc_bank_passbook',
    name: 'Bank Passbook / Cancelled Cheque (Aadhaar Seeded)',
    nameHindi: 'बैंक पासबुक / रद्द चेक (आधार व एनपीसीआई मैप)',
    shortDesc: 'Proof of active bank account with IFSC code and account number for Direct Benefit Transfer.',
    shortDescHindi: 'डीबीटी राशि सीधे खाते में आने हेतु बैंक खाता संख्या एवं आईएफएससी कोड का प्रमाण।',
    issuingAuthority: 'Any Nationalised, Scheduled Commercial, or Gramin Bank / Post Office',
    issuingAuthorityHindi: 'कोई भी राष्ट्रीयकृत, ग्रामीण बैंक या डाकघर बैंक',
    cost: 'Free',
    costHindi: 'निःशुल्क',
    estimatedTime: 'Instant with active account',
    estimatedTimeHindi: 'खाता चालू होने पर तत्काल',
    officialPortal: 'https://www.npci.org.in',
    tips: 'Ask your bank branch to ensure "Aadhaar NPCI Seeding" is active for direct DBT subsidy payments.',
    tipsHindi: 'बैंक जाकर यह जांच लें कि खाते में "आधार एनपीसीआई मैपिंग" सक्रिय है या नहीं।'
  },
  {
    id: 'doc_disability_cert',
    name: 'UDID Card / Disability Certificate (दिव्यांग प्रमाण पत्र)',
    nameHindi: 'यूडीआईडी कार्ड / दिव्यांगता प्रमाण पत्र',
    shortDesc: 'Unique ID for Persons with Disabilities with recognized benchmark percentage.',
    shortDescHindi: 'दिव्यांग व्यक्तियों के लिए विशिष्ट पहचान पत्र जिसमें दिव्यांगता प्रतिशत दर्ज हो।',
    issuingAuthority: 'District Chief Medical Officer (CMO) / UDID Portal',
    issuingAuthorityHindi: 'जिला मुख्य चिकित्सा अधिकारी (सीएमओ) / यूडीआईडी पोर्टल',
    cost: 'Free',
    costHindi: 'निःशुल्क',
    estimatedTime: '15 to 30 days post medical assessment',
    estimatedTimeHindi: 'मेडिकल बोर्ड जांच के बाद 15-30 दिन',
    officialPortal: 'https://www.swavlambancard.gov.in',
    tips: 'Universal online UDID card replaces all older manual certificates across India.',
    tipsHindi: 'डिजिटल यूडीआईडी कार्ड पूरे भारत में सभी सरकारी योजनाओं में मान्य है।'
  },
  {
    id: 'doc_job_card',
    name: 'MGNREGA Job Card (मनरेगा जॉब कार्ड)',
    nameHindi: 'मनरेगा जॉब कार्ड',
    shortDesc: 'Registered entitlement for rural household wage employment under MGNREGS.',
    shortDescHindi: 'ग्रामीण परिवारों के लिए मनरेगा के तहत 100 दिन के सुनिश्चित रोजगार का पहचान पत्र।',
    issuingAuthority: 'Gram Panchayat / Programme Officer (MGNREGA)',
    issuingAuthorityHindi: 'ग्राम पंचायत / कार्यक्रम अधिकारी (मनरेगा)',
    cost: 'Free',
    costHindi: 'निःशुल्क',
    estimatedTime: '15 days from application',
    estimatedTimeHindi: 'आवेदन के 15 दिनों के भीतर',
    officialPortal: 'https://nrega.nic.in',
    tips: 'Must have all adult family members registered with active bank accounts.',
    tipsHindi: 'परिवार के सभी वयस्क सदस्यों के नाम व बैंक खाते इसमें दर्ज होने चाहिए।'
  },
  {
    id: 'doc_student_marksheet',
    name: 'Educational Marksheets & Bonafide Certificate',
    nameHindi: 'शैक्षणिक अंकपत्र एवं अध्ययनरत प्रमाण पत्र',
    shortDesc: 'Proof of current enrollment, previous class marksheet, and fee receipt.',
    shortDescHindi: 'वर्तमान संस्थान में अध्ययनरत होने का प्रमाण, पिछली कक्षा की अंकतालिका एवं शुल्क रसीद।',
    issuingAuthority: 'School / College / University Administration',
    issuingAuthorityHindi: 'संबंधित विद्यालय / महाविद्यालय / विश्वविद्यालय',
    cost: 'Free from institution',
    costHindi: 'संस्थान द्वारा निःशुल्क',
    estimatedTime: '1 to 3 days',
    estimatedTimeHindi: '1 से 3 दिन',
    officialPortal: 'https://scholarships.gov.in',
    tips: 'National Scholarship Portal (NSP) requires verification by the institutional nodal officer.',
    tipsHindi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर कॉलेज के नोडल अधिकारी से सत्यापन जरूरी है।'
  },
  {
    id: 'doc_artisan_id',
    name: 'PM Vishwakarma Certificate / Artisan ID',
    nameHindi: 'पीएम विश्वकर्मा प्रमाण पत्र / कारीगर पहचान',
    shortDesc: 'Official recognition for traditional craftsmen and artisans across 18 designated trades.',
    shortDescHindi: '18 पारंपरिक शिल्पों में संलग्न कारीगरों और शिल्पकारों हेतु आधिकारिक पहचान।',
    issuingAuthority: 'Ministry of MSME via Gram Panchayat / ULB verification',
    issuingAuthorityHindi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय (MSME)',
    cost: 'Free',
    costHindi: 'निःशुल्क',
    estimatedTime: '7 to 14 days after three-stage verification',
    estimatedTimeHindi: 'तीन-स्तरीय सत्यापन के बाद 7-14 दिन',
    officialPortal: 'https://pmvishwakarma.gov.in',
    tips: 'Includes 5-7 days basic training with ₹500/day stipend and ₹15,000 toolkit voucher.',
    tipsHindi: 'सत्यापन के बाद ₹500 प्रतिदिन के मानदेय के साथ प्रशिक्षण और ₹15,000 का टूलकिट अनुदान।'
  },
  {
    id: 'doc_electricity_bill',
    name: 'Latest Electricity Bill (विद्युत विपत्र / Rooftop Access)',
    nameHindi: 'नवीनतम बिजली बिल (छत अधिकार प्रमाण सहित)',
    shortDesc: 'Consumer electricity connection bill showing CA/Consumer number for solar rooftop.',
    shortDescHindi: 'रूफटॉप सोलर एवं आवास योजनाओं के लिए उपभोक्ता संख्या वाला नवीनतम बिजली बिल।',
    issuingAuthority: 'State Electricity Distribution Company (DISCOM)',
    issuingAuthorityHindi: 'राज्य विद्युत वितरण कंपनी (डिस्कॉम)',
    cost: 'Free / Available online via DISCOM portal',
    costHindi: 'निःशुल्क / डिस्कॉम पोर्टल पर उपलब्ध',
    estimatedTime: 'Instant download',
    estimatedTimeHindi: 'तत्काल ऑनलाइन',
    officialPortal: 'https://pmsuryaghar.gov.in',
    tips: 'Consumer connection name should be in the applicant’s name or immediate family.',
    tipsHindi: 'बिजली कनेक्शन आवेदनकर्ता या उसके परिवार के नाम पर होना चाहिए।'
  }
];
