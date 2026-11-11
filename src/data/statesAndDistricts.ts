export interface StateWithDistricts {
  state: string;
  stateHindi: string;
  districts: { name: string; nameHindi: string }[];
}

// All 28 states and 8 union territories (districts are a representative sample). Sorted A–Z below.
const STATES_UNSORTED: StateWithDistricts[] = [
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
  },
  {
    state: 'Andhra Pradesh',
    stateHindi: 'आंध्र प्रदेश',
    districts: [
      { name: 'Visakhapatnam', nameHindi: 'विशाखापत्तनम' },
      { name: 'Vijayawada (NTR)', nameHindi: 'विजयवाड़ा (एनटीआर)' },
      { name: 'Guntur', nameHindi: 'गुंटूर' },
      { name: 'Tirupati', nameHindi: 'तिरुपति' },
      { name: 'Kurnool', nameHindi: 'कुरनूल' }
    ]
  },
  {
    state: 'Arunachal Pradesh',
    stateHindi: 'अरुणाचल प्रदेश',
    districts: [
      { name: 'Papum Pare (Itanagar)', nameHindi: 'पापुम पारे (ईटानगर)' },
      { name: 'Tawang', nameHindi: 'तवांग' },
      { name: 'West Siang', nameHindi: 'पश्चिम सियांग' }
    ]
  },
  {
    state: 'Chhattisgarh',
    stateHindi: 'छत्तीसगढ़',
    districts: [
      { name: 'Raipur', nameHindi: 'रायपुर' },
      { name: 'Bilaspur', nameHindi: 'बिलासपुर' },
      { name: 'Durg', nameHindi: 'दुर्ग' },
      { name: 'Bastar', nameHindi: 'बस्तर' },
      { name: 'Korba', nameHindi: 'कोरबा' }
    ]
  },
  {
    state: 'Goa',
    stateHindi: 'गोवा',
    districts: [
      { name: 'North Goa', nameHindi: 'उत्तरी गोवा' },
      { name: 'South Goa', nameHindi: 'दक्षिणी गोवा' }
    ]
  },
  {
    state: 'Himachal Pradesh',
    stateHindi: 'हिमाचल प्रदेश',
    districts: [
      { name: 'Shimla', nameHindi: 'शिमला' },
      { name: 'Kangra', nameHindi: 'कांगड़ा' },
      { name: 'Mandi', nameHindi: 'मंडी' },
      { name: 'Kullu', nameHindi: 'कुल्लू' }
    ]
  },
  {
    state: 'Jharkhand',
    stateHindi: 'झारखंड',
    districts: [
      { name: 'Ranchi', nameHindi: 'रांची' },
      { name: 'Dhanbad', nameHindi: 'धनबाद' },
      { name: 'East Singhbhum (Jamshedpur)', nameHindi: 'पूर्वी सिंहभूम (जमशेदपुर)' },
      { name: 'Hazaribagh', nameHindi: 'हजारीबाग' },
      { name: 'Dumka', nameHindi: 'दुमका' }
    ]
  },
  {
    state: 'Kerala',
    stateHindi: 'केरल',
    districts: [
      { name: 'Thiruvananthapuram', nameHindi: 'तिरुवनंतपुरम' },
      { name: 'Ernakulam', nameHindi: 'एर्नाकुलम' },
      { name: 'Kozhikode', nameHindi: 'कोझिकोड' },
      { name: 'Thrissur', nameHindi: 'त्रिशूर' },
      { name: 'Malappuram', nameHindi: 'मलप्पुरम' }
    ]
  },
  {
    state: 'Manipur',
    stateHindi: 'मणिपुर',
    districts: [
      { name: 'Imphal West', nameHindi: 'इंफाल पश्चिम' },
      { name: 'Imphal East', nameHindi: 'इंफाल पूर्व' },
      { name: 'Churachandpur', nameHindi: 'चुराचांदपुर' }
    ]
  },
  {
    state: 'Meghalaya',
    stateHindi: 'मेघालय',
    districts: [
      { name: 'East Khasi Hills (Shillong)', nameHindi: 'पूर्वी खासी हिल्स (शिलांग)' },
      { name: 'West Garo Hills (Tura)', nameHindi: 'पश्चिमी गारो हिल्स (तुरा)' },
      { name: 'Jaintia Hills', nameHindi: 'जयंतिया हिल्स' }
    ]
  },
  {
    state: 'Mizoram',
    stateHindi: 'मिज़ोरम',
    districts: [
      { name: 'Aizawl', nameHindi: 'आइज़ोल' },
      { name: 'Lunglei', nameHindi: 'लुंगलेई' },
      { name: 'Champhai', nameHindi: 'चम्फाई' }
    ]
  },
  {
    state: 'Nagaland',
    stateHindi: 'नागालैंड',
    districts: [
      { name: 'Kohima', nameHindi: 'कोहिमा' },
      { name: 'Dimapur', nameHindi: 'दीमापुर' },
      { name: 'Mokokchung', nameHindi: 'मोकोकचुंग' }
    ]
  },
  {
    state: 'Sikkim',
    stateHindi: 'सिक्किम',
    districts: [
      { name: 'Gangtok', nameHindi: 'गंगटोक' },
      { name: 'Namchi', nameHindi: 'नामची' },
      { name: 'Mangan', nameHindi: 'मंगन' }
    ]
  },
  {
    state: 'Telangana',
    stateHindi: 'तेलंगाना',
    districts: [
      { name: 'Hyderabad', nameHindi: 'हैदराबाद' },
      { name: 'Warangal', nameHindi: 'वारंगल' },
      { name: 'Karimnagar', nameHindi: 'करीमनगर' },
      { name: 'Nizamabad', nameHindi: 'निज़ामाबाद' },
      { name: 'Khammam', nameHindi: 'खम्मम' }
    ]
  },
  {
    state: 'Tripura',
    stateHindi: 'त्रिपुरा',
    districts: [
      { name: 'West Tripura (Agartala)', nameHindi: 'पश्चिम त्रिपुरा (अगरतला)' },
      { name: 'Gomati', nameHindi: 'गोमती' },
      { name: 'Dhalai', nameHindi: 'धलाई' }
    ]
  },
  {
    state: 'Andaman & Nicobar Islands',
    stateHindi: 'अंडमान और निकोबार द्वीपसमूह',
    districts: [
      { name: 'South Andaman (Port Blair)', nameHindi: 'दक्षिण अंडमान (पोर्ट ब्लेयर)' },
      { name: 'Nicobar', nameHindi: 'निकोबार' }
    ]
  },
  {
    state: 'Chandigarh',
    stateHindi: 'चंडीगढ़',
    districts: [
      { name: 'Chandigarh', nameHindi: 'चंडीगढ़' }
    ]
  },
  {
    state: 'Dadra & Nagar Haveli and Daman & Diu',
    stateHindi: 'दादरा और नगर हवेली तथा दमन और दीव',
    districts: [
      { name: 'Dadra & Nagar Haveli', nameHindi: 'दादरा और नगर हवेली' },
      { name: 'Daman', nameHindi: 'दमन' },
      { name: 'Diu', nameHindi: 'दीव' }
    ]
  },
  {
    state: 'Jammu & Kashmir',
    stateHindi: 'जम्मू और कश्मीर',
    districts: [
      { name: 'Srinagar', nameHindi: 'श्रीनगर' },
      { name: 'Jammu', nameHindi: 'जम्मू' },
      { name: 'Anantnag', nameHindi: 'अनंतनाग' },
      { name: 'Baramulla', nameHindi: 'बारामूला' }
    ]
  },
  {
    state: 'Ladakh',
    stateHindi: 'लद्दाख',
    districts: [
      { name: 'Leh', nameHindi: 'लेह' },
      { name: 'Kargil', nameHindi: 'करगिल' }
    ]
  },
  {
    state: 'Lakshadweep',
    stateHindi: 'लक्षद्वीप',
    districts: [
      { name: 'Lakshadweep', nameHindi: 'लक्षद्वीप' }
    ]
  },
  {
    state: 'Puducherry',
    stateHindi: 'पुडुचेरी',
    districts: [
      { name: 'Puducherry', nameHindi: 'पुडुचेरी' },
      { name: 'Karaikal', nameHindi: 'कराईकल' }
    ]
  }
];

export const INDIAN_STATES_DISTRICTS: StateWithDistricts[] = [...STATES_UNSORTED].sort((a, b) =>
  a.state.localeCompare(b.state, 'en')
);
