export interface StateWithDistricts {
  state: string;
  stateHindi: string;
  districts: { name: string; nameHindi: string }[];
}

export const INDIAN_STATES_DISTRICTS: StateWithDistricts[] = [
  {
    state: 'Uttar Pradesh',
    stateHindi: 'उत्तर प्रदेश',
    districts: [
      { name: 'Lucknow', nameHindi: 'लखनऊ' },
      { name: 'Varanasi', nameHindi: 'वाराणसी' },
      { name: 'Prayagraj', nameHindi: 'प्रयागराज' },
      { name: 'Kanpur Nagar', nameHindi: 'कानपुर नगर' },
      { name: 'Gorakhpur', nameHindi: 'गोरखपुर' },
      { name: 'Agra', nameHindi: 'आगरा' },
      { name: 'Meerut', nameHindi: 'मेरठ' },
      { name: 'Bareilly', nameHindi: 'बरेली' },
      { name: 'Ayodhya', nameHindi: 'अयोध्या' },
      { name: 'Jhansi', nameHindi: 'झांसी' },
      { name: 'Azamgarh', nameHindi: 'आजमगढ़' },
      { name: 'Basti', nameHindi: 'बस्ती' },
      { name: 'Mirzapur', nameHindi: 'मिर्ज़ापुर' }
    ]
  },
  {
    state: 'Bihar',
    stateHindi: 'बिहार',
    districts: [
      { name: 'Patna', nameHindi: 'पटना' },
      { name: 'Gaya', nameHindi: 'गया' },
      { name: 'Muzaffarpur', nameHindi: 'मुजफ्फरपुर' },
      { name: 'Bhagalpur', nameHindi: 'भागलपुर' },
      { name: 'Darbhanga', nameHindi: 'दरभंगा' },
      { name: 'Purnia', nameHindi: 'पूर्णिया' },
      { name: 'Samastipur', nameHindi: 'समस्तीपुर' },
      { name: 'Rohtas', nameHindi: 'रोहतास' },
      { name: 'Madhubani', nameHindi: 'मधुबनी' },
      { name: 'Begusarai', nameHindi: 'बेगूसराय' }
    ]
  },
  {
    state: 'Madhya Pradesh',
    stateHindi: 'मध्य प्रदेश',
    districts: [
      { name: 'Bhopal', nameHindi: 'भोपाल' },
      { name: 'Indore', nameHindi: 'इंदौर' },
      { name: 'Jabalpur', nameHindi: 'जबलपुर' },
      { name: 'Gwalior', nameHindi: 'ग्वालियर' },
      { name: 'Ujjain', nameHindi: 'उज्जैन' },
      { name: 'Sagar', nameHindi: 'सागर' },
      { name: 'Rewa', nameHindi: 'रीवा' },
      { name: 'Chhindwara', nameHindi: 'छिंदवाड़ा' }
    ]
  },
  {
    state: 'Rajasthan',
    stateHindi: 'राजस्थान',
    districts: [
      { name: 'Jaipur', nameHindi: 'जयपुर' },
      { name: 'Jodhpur', nameHindi: 'जोधपुर' },
      { name: 'Udaipur', nameHindi: 'उदयपुर' },
      { name: 'Kota', nameHindi: 'कोटा' },
      { name: 'Bikaner', nameHindi: 'बीकानेर' },
      { name: 'Ajmer', nameHindi: 'अजमेर' },
      { name: 'Alwar', nameHindi: 'अलवर' },
      { name: 'Sikar', nameHindi: 'सीकर' }
    ]
  },
  {
    state: 'Maharashtra',
    stateHindi: 'महाराष्ट्र',
    districts: [
      { name: 'Mumbai City', nameHindi: 'मुंबई शहर' },
      { name: 'Pune', nameHindi: 'पुणे' },
      { name: 'Nagpur', nameHindi: 'नागपुर' },
      { name: 'Nashik', nameHindi: 'नाशिक' },
      { name: 'Chhatrapati Sambhajinagar', nameHindi: 'छत्रपती संभाजीनगर' },
      { name: 'Solapur', nameHindi: 'सोलापूर' },
      { name: 'Amravati', nameHindi: 'अमरावती' },
      { name: 'Kolhapur', nameHindi: 'कोल्हापूर' },
      { name: 'Nanded', nameHindi: 'नांदेड' }
    ]
  },
  {
    state: 'West Bengal',
    stateHindi: 'पश्चिम बंगाल',
    districts: [
      { name: 'Kolkata', nameHindi: 'कोलकाता' },
      { name: 'North 24 Parganas', nameHindi: 'उत्तर २४ परगना' },
      { name: 'South 24 Parganas', nameHindi: 'दक्षिण २४ परगना' },
      { name: 'Howrah', nameHindi: 'हावड़ा' },
      { name: 'Murshidabad', nameHindi: 'मुर्शिदाबाद' },
      { name: 'Purba Medinipur', nameHindi: 'पूर्व मेदिनीपुर' },
      { name: 'Siliguri / Darjeeling', nameHindi: 'दार्जिलिंग' }
    ]
  },
  {
    state: 'Karnataka',
    stateHindi: 'कर्नाटक',
    districts: [
      { name: 'Bengaluru Urban', nameHindi: 'बेंगलुरु शहरी' },
      { name: 'Mysuru', nameHindi: 'मैसूर' },
      { name: 'Hubballi-Dharwad', nameHindi: 'हुबली-धारवाड़' },
      { name: 'Belagavi', nameHindi: 'बेलगावी' },
      { name: 'Kalaburagi', nameHindi: 'कलबुर्गी' },
      { name: 'Dakshina Kannada', nameHindi: 'दक्षिण कन्नड़' }
    ]
  },
  {
    state: 'Tamil Nadu',
    stateHindi: 'तमिलनाडु',
    districts: [
      { name: 'Chennai', nameHindi: 'चेन्नई' },
      { name: 'Coimbatore', nameHindi: 'कोयम्बटूर' },
      { name: 'Madurai', nameHindi: 'मदुरै' },
      { name: 'Tiruchirappalli', nameHindi: 'तिरुचिरापल्ली' },
      { name: 'Salem', nameHindi: 'सेलम' },
      { name: 'Tirunelveli', nameHindi: 'तिरुनेलवेली' }
    ]
  },
  {
    state: 'Gujarat',
    stateHindi: 'गुजरात',
    districts: [
      { name: 'Ahmedabad', nameHindi: 'अहमदाबाद' },
      { name: 'Surat', nameHindi: 'सूरत' },
      { name: 'Vadodara', nameHindi: 'वडोदरा' },
      { name: 'Rajkot', nameHindi: 'राजकोट' },
      { name: 'Bhavnagar', nameHindi: 'भावनगर' },
      { name: 'Kutch', nameHindi: 'कच्छ' }
    ]
  },
  {
    state: 'Odisha',
    stateHindi: 'ओडिशा',
    districts: [
      { name: 'Khurda (Bhubaneswar)', nameHindi: 'खुर्दा (भुवनेश्वर)' },
      { name: 'Cuttack', nameHindi: 'कटक' },
      { name: 'Ganjam', nameHindi: 'गंजम' },
      { name: 'Sundargarh', nameHindi: 'सुंदरगढ़' },
      { name: 'Sambalpur', nameHindi: 'संबलपुर' },
      { name: 'Mayurbhanj', nameHindi: 'मयूरभंज' }
    ]
  },
  {
    state: 'Punjab',
    stateHindi: 'पंजाब',
    districts: [
      { name: 'Ludhiana', nameHindi: 'लुधियाना' },
      { name: 'Amritsar', nameHindi: 'अमृतसर' },
      { name: 'Jalandhar', nameHindi: 'जालंधर' },
      { name: 'Patiala', nameHindi: 'पटियाला' },
      { name: 'Bathinda', nameHindi: 'बठिंडा' }
    ]
  },
  {
    state: 'Haryana',
    stateHindi: 'हरियाणा',
    districts: [
      { name: 'Gurugram', nameHindi: 'गुरुग्राम' },
      { name: 'Faridabad', nameHindi: 'फरीदाबाद' },
      { name: 'Hisar', nameHindi: 'हिसार' },
      { name: 'Karnal', nameHindi: 'करनाल' },
      { name: 'Rohtak', nameHindi: 'रोहतक' },
      { name: 'Ambala', nameHindi: 'अंबाला' }
    ]
  },
  {
    state: 'Delhi (NCT)',
    stateHindi: 'दिल्ली',
    districts: [
      { name: 'North Delhi', nameHindi: 'उत्तरी दिल्ली' },
      { name: 'South Delhi', nameHindi: 'दक्षिणी दिल्ली' },
      { name: 'East Delhi', nameHindi: 'पूर्वी दिल्ली' },
      { name: 'West Delhi', nameHindi: 'पश्चिमी दिल्ली' },
      { name: 'Central Delhi', nameHindi: 'मध्य दिल्ली' },
      { name: 'Shahdara', nameHindi: 'शाहदरा' }
    ]
  },
  {
    state: 'Uttarakhand',
    stateHindi: 'उत्तराखंड',
    districts: [
      { name: 'Dehradun', nameHindi: 'देहरादून' },
      { name: 'Haridwar', nameHindi: 'हरिद्वार' },
      { name: 'Nainital', nameHindi: 'नैनीताल' },
      { name: 'Udham Singh Nagar', nameHindi: 'ऊधम सिंह नगर' },
      { name: 'Almora', nameHindi: 'अल्मोड़ा' }
    ]
  },
  {
    state: 'Assam',
    stateHindi: 'असम',
    districts: [
      { name: 'Kamrup Metro (Guwahati)', nameHindi: 'कामरूप मेट्रो (गुवाहाटी)' },
      { name: 'Dibrugarh', nameHindi: 'डिब्रूगढ़' },
      { name: 'Silchar (Cachar)', nameHindi: 'सिलचर (कछार)' },
      { name: 'Jorhat', nameHindi: 'जोरहाट' },
      { name: 'Nagaon', nameHindi: 'नगांव' }
    ]
  }
];
