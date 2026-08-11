import type { Language } from '../types/scheme';

export interface UIStrings {
  appName: string;
  tagline: string;
  heroDescription: string;
  askAssistantBtn: string;
  findSchemesBtn: string;
  navHome: string;
  navAssistant: string;
  navFindSchemes: string;
  navMyProfile: string;
  disclaimerText: string;
  officialSourceTag: string;
  whatCanDoTitle: string;
  whatCanDoItems: { title: string; desc: string }[];
  impactSectionTitle: string;
  metricsBanner: string;
  suggestedQuestionsTitle: string;
  suggestedQuestions: string[];
  placeholderAsk: string;
  checkEligibilityBtn: string;
  viewDetailsBtn: string;
  applyNowBtn: string;
  howToApplyTitle: string;
  requiredDocsTitle: string;
  benefitsTitle: string;
  eligibilityBreakdownTitle: string;
  filterByState: string;
  filterByOccupation: string;
  filterByCategory: string;
  ageLabel: string;
  incomeLabel: string;
  savedSchemesTitle: string;
  noSavedSchemes: string;
}

export const translations: Record<Language, UIStrings> = {
  en: {
    appName: 'SevaSaathi',
    tagline: 'Government services, simplified for everyone.',
    heroDescription:
      'Discover government schemes, check eligibility, understand required documents, and navigate government services in your preferred language.',
    askAssistantBtn: 'Ask SevaSaathi AI',
    findSchemesBtn: 'Find Schemes',
    navHome: 'Home',
    navAssistant: 'AI Assistant',
    navFindSchemes: 'Find Schemes',
    navMyProfile: 'My Profile',
    disclaimerText:
      'Information is provided for guidance & demonstration purposes. Please verify final eligibility and application procedures on the official government portal.',
    officialSourceTag: 'Source: Official Government Portal',
    whatCanDoTitle: 'What SevaSaathi Can Do For You',
    whatCanDoItems: [
      { title: 'Discover Schemes', desc: 'Find relevant central & state schemes tailored to your exact profile.' },
      { title: 'Check Eligibility', desc: 'Instantly view a criterion-by-criterion breakdown of your eligibility.' },
      { title: 'Understand Documents', desc: 'Get clear lists of mandatory certificates & documents required before applying.' },
      { title: 'Application Guidance', desc: 'Step-by-step guidance on how and where to submit your application online or offline.' },
      { title: 'Multilingual Access', desc: 'Interact seamlessly in English, Hindi, Hinglish, Bengali, or Tamil.' },
    ],
    impactSectionTitle: 'One assistant. Multiple languages. Easier access to government benefits.',
    metricsBanner: '5 Languages Supported | 15+ Sample Schemes | AI-Powered Discovery | Instant Eligibility Guidance',
    suggestedQuestionsTitle: 'Try Asking:',
    suggestedQuestions: [
      'What scholarships can I apply for as a student?',
      'Main UP mein student hoon, mujhe kaun si scholarship mil sakti hai?',
      'What government schemes are available for farmers?',
      'How can I apply for Ayushman Bharat health card?',
      'Which housing and loan schemes am I eligible for?',
    ],
    placeholderAsk: 'Ask a question in English, Hindi, Hinglish, Bengali, Tamil...',
    checkEligibilityBtn: 'Check Eligibility',
    viewDetailsBtn: 'View Details',
    applyNowBtn: 'Apply Now (Official Link)',
    howToApplyTitle: 'How to Apply (Step-by-Step)',
    requiredDocsTitle: 'Required Documents',
    benefitsTitle: 'Scheme Benefits',
    eligibilityBreakdownTitle: 'Eligibility Analysis Breakdown',
    filterByState: 'State / Union Territory',
    filterByOccupation: 'Occupation',
    filterByCategory: 'Category (General/OBC/SC/ST)',
    ageLabel: 'Age (Years)',
    incomeLabel: 'Annual Family Income (₹)',
    savedSchemesTitle: 'My Saved Schemes',
    noSavedSchemes: 'You have not saved any schemes yet. Click the bookmark icon on any scheme card to save it here for quick access.',
  },

  hi: {
    appName: 'सेवासाथी (SevaSaathi)',
    tagline: 'सरकारी सेवाएं, सभी के लिए आसान।',
    heroDescription:
      'सरकारी योजनाओं को खोजें, अपनी पात्रता (Eligibility) जांचें, आवश्यक दस्तावेज समझें और अपनी पसंदीदा भाषा में सरकारी सेवाओं का लाभ उठाएं।',
    askAssistantBtn: 'सेवासाथी AI से पूछें',
    findSchemesBtn: 'योजनाएं खोजें',
    navHome: 'होम',
    navAssistant: 'AI सहायक',
    navFindSchemes: 'योजनाएं खोजें',
    navMyProfile: 'मेरी प्रोफाइल',
    disclaimerText:
      'यह जानकारी केवल मार्गदर्शन एवं डेमो उद्देश्य हेतु दी गई है। अंतिम पात्रता एवं आवेदन प्रक्रिया आधिकारिक सरकारी पोर्टल पर ही सत्यापित करें।',
    officialSourceTag: 'स्रोत: आधिकारिक सरकारी पोर्टल',
    whatCanDoTitle: 'सेवासाथी आपके लिए क्या कर सकता है',
    whatCanDoItems: [
      { title: 'योजनाएं खोजें', desc: 'अपनी प्रोफ़ाइल के अनुसार केंद्र और राज्य की प्रासंगिक योजनाएं खोजें।' },
      { title: 'पात्रता जांचें', desc: 'अपनी पात्रता का विस्तृत विवरण तुरंत देखें।' },
      { title: 'दस्तावेज़ समझें', desc: 'आवेदन करने के लिए आवश्यक प्रमाण पत्रों की स्पष्ट सूची प्राप्त करें।' },
      { title: 'आवेदन मार्गदर्शन', desc: 'ऑनलाइन या ऑफलाइन आवेदन की चरण-दर-चरण प्रक्रिया समझें।' },
      { title: 'बहुभाषी सहायता', desc: 'हिंदी, अंग्रेजी, हिंग्लिश, बंगाली या तमिल में आसानी से संवाद करें।' },
    ],
    impactSectionTitle: 'एक सहायक। कई भाषाएं। सरकारी योजनाओं तक आसान पहुंच।',
    metricsBanner: '5 भाषाएं समर्थित | 15+ मुख्य योजनाएं | AI-संचालित खोज | त्वरित पात्रता मार्गदर्शन',
    suggestedQuestionsTitle: 'इन प्रश्नों को पूछकर देखें:',
    suggestedQuestions: [
      'मैं यूपी में स्टूडेंट हूं, मुझे कौन सी स्कॉलरशिप मिल सकती है?',
      'किसान भाइयों के लिए कौन-कौन सी सरकारी योजनाएं उपलब्ध हैं?',
      'आयुष्मान भारत कार्ड के लिए कैसे अप्लाई करें?',
      'महिलाओं के लिए शुरू की गई प्रमुख योजनाएं कौन सी हैं?',
      'पीएम आवास योजना की पात्रता क्या है?',
    ],
    placeholderAsk: 'हिंदी, हिंग्लिश, अंग्रेजी या अन्य भाषा में अपना प्रश्न लिखें...',
    checkEligibilityBtn: 'पात्रता जांचें',
    viewDetailsBtn: 'विवरण देखें',
    applyNowBtn: 'अभी लागू करें (आधिकारिक लिंक)',
    howToApplyTitle: 'आवेदन प्रक्रिया (चरण-दर-चरण)',
    requiredDocsTitle: 'आवश्यक दस्तावेज',
    benefitsTitle: 'योजना के लाभ',
    eligibilityBreakdownTitle: 'पात्रता विश्लेषण विवरण',
    filterByState: 'राज्य / केंद्र शासित प्रदेश',
    filterByOccupation: 'व्यवसाय (Occupation)',
    filterByCategory: 'वर्ग (General/OBC/SC/ST)',
    ageLabel: 'आयु (वर्ष)',
    incomeLabel: 'वार्षिक पारिवारिक आय (₹)',
    savedSchemesTitle: 'मेरी सहेजी गई योजनाएं',
    noSavedSchemes: 'आपने अभी तक कोई योजना सहेजी नहीं है। त्वरित पहुँच के लिए किसी भी योजना कार्ड पर बुकमार्क आइकन दबाएं।',
  },

  hinglish: {
    appName: 'SevaSaathi',
    tagline: 'Government services, simplified for everyone.',
    heroDescription:
      'Government schemes dhundhein, eligibility check karein, required documents samjhein aur easily apply karein apni bhasha mein.',
    askAssistantBtn: 'Ask SevaSaathi AI',
    findSchemesBtn: 'Find Schemes',
    navHome: 'Home',
    navAssistant: 'AI Assistant',
    navFindSchemes: 'Find Schemes',
    navMyProfile: 'My Profile',
    disclaimerText:
      'Yeh information guidance aur demo purpose ke liye hai. Final eligibility & apply details official govt portal par verify karein.',
    officialSourceTag: 'Source: Official Government Portal',
    whatCanDoTitle: 'SevaSaathi Kya Kar Sakta Hai',
    whatCanDoItems: [
      { title: 'Discover Schemes', desc: 'Apni profile ke mutabiq best Central & State govt schemes dhundhein.' },
      { title: 'Check Eligibility', desc: 'Apni eligibility ka clear criterion-wise breakdown dekhein.' },
      { title: 'Required Documents', desc: 'Apply karne se pehle zaroori documents ki tayari karein.' },
      { title: 'Application Steps', desc: 'Online/offline apply karne ka step-by-step guidance.' },
      { title: 'Multilingual Chat', desc: 'Hinglish, Hindi, English, Bengali ya Tamil mein chat karein.' },
    ],
    impactSectionTitle: 'Ek Assistant. Multiple Languages. Government Benefits Ab Sabke Paas.',
    metricsBanner: '5 Languages Supported | 15+ Sample Schemes | AI-Powered Discovery | Eligibility Guidance',
    suggestedQuestionsTitle: 'Ye pooch kar try karein:',
    suggestedQuestions: [
      'Main UP mein rehne wala student hoon. Mujhe scholarship ke liye kaun si schemes mil sakti hain?',
      'Farmers ke liye kaun si PM schemes available hain?',
      'Ayushman Bharat hospital card ke liye eligibility kya hai?',
      'Ghar banane ke liye Pradhan Mantri Awas Yojana mein kaise apply karein?',
      'Business start karne ke liye MUDRA loan kaise milega?',
    ],
    placeholderAsk: 'Type karein English, Hindi ya Hinglish mein...',
    checkEligibilityBtn: 'Eligibility Check Karein',
    viewDetailsBtn: 'Details Dekhein',
    applyNowBtn: 'Apply Now (Official Link)',
    howToApplyTitle: 'How to Apply (Step-by-Step Guide)',
    requiredDocsTitle: 'Required Documents List',
    benefitsTitle: 'Scheme Benefits',
    eligibilityBreakdownTitle: 'Eligibility Criteria Analysis',
    filterByState: 'State Select Karein',
    filterByOccupation: 'Occupation / Kaam',
    filterByCategory: 'Category (General/OBC/SC/ST)',
    ageLabel: 'Age (Umra)',
    incomeLabel: 'Annual Family Income (₹)',
    savedSchemesTitle: 'My Saved Schemes',
    noSavedSchemes: 'Aapne abhi koi scheme save nahi ki hai. Bookmark icon click karke schemes yahan save karein.',
  },

  bn: {
    appName: 'সেবাসাথী (SevaSaathi)',
    tagline: 'সরকারি সেবা, সবার জন্য সহজ।',
    heroDescription:
      'সরকারি প্রকল্প খুঁজুন, যোগ্যতা পরীক্ষা করুন, প্রয়োজনীয় নথি বুঝুন এবং আপনার নিজস্ব ভাষায় সরকারি সুবিধা গ্রহণ করুন।',
    askAssistantBtn: 'সেবাসাথী AI-কে জিজ্ঞাসা করুন',
    findSchemesBtn: 'প্রকল্প খুঁজুন',
    navHome: 'হোম',
    navAssistant: 'AI সহকারী',
    navFindSchemes: 'প্রকল্প খুঁজুন',
    navMyProfile: 'আমার প্রোফাইল',
    disclaimerText:
      'এই তথ্যটি কেবল নির্দেশিকা ও ডেমো উদ্দেশ্যে প্রদান করা হয়েছে। আবেদন করার পূর্বে অফিশিয়াল সরকারি পোর্টালে তথ্য যাচাই করুন।',
    officialSourceTag: 'উৎস: অফিশিয়াল সরকারি পোর্টাল',
    whatCanDoTitle: 'সেবাসাথী আপনার জন্য যা করতে পারে',
    whatCanDoItems: [
      { title: 'প্রকল্প আবিষ্কার', desc: 'আপনার প্রোফাইল অনুযায়ী সেরা কেন্দ্র ও রাজ্য সরকারি প্রকল্পগুলি খুঁজুন।' },
      { title: 'যোগ্যতা পরীক্ষা', desc: 'তাত্ক্ষণিকভাবে প্রতিটি মানদণ্ড অনুযায়ী যোগ্যতা পরীক্ষা করুন।' },
      { title: 'নথিপত্র নির্দেশিকা', desc: 'আবেদনের জন্য প্রয়োজনীয় শংসাপত্র ও নথির তালিকা দেখুন।' },
      { title: 'আবেদন পদ্ধতি', desc: 'ধাপে ধাপে কীভাবে আবেদন করতে হবে তা শিখুন।' },
      { title: 'বহুভাষিক সুবিধা', desc: 'বাংলা, হিন্দি, ইংরেজি, তামিল বা হিংলিশে সহজে যোগাযোগ করুন।' },
    ],
    impactSectionTitle: 'এক সাহায্যকারী। একাধিক ভাষা। সরকারি সুবিধা এখন সহজ।',
    metricsBanner: '৫টি ভাষা সম্বলিত | ১৫+ নমুনা প্রকল্প | AI চালিত সন্ধান | দ্রুত যোগ্যতা নির্দেশিকা',
    suggestedQuestionsTitle: 'জিজ্ঞাসা করে দেখুন:',
    suggestedQuestions: [
      'ছাত্রদের জন্য কি কি সরকারি স্কলারশিপ রয়েছে?',
      'কৃষকদের জন্য কি কি সরকারি সুবিধা পাওয়া যাবে?',
      'আয়ুষ্মান ভারত কার্ডের সুবিধা কিভাবে পাওয়া যাবে?',
      'প্রধানমন্ত্রী আবাস যোজনায় কিভাবে আবেদন করবো?',
      'ব্যবসা শুরু করার জন্য মুদ্রা ঋণ পাওয়ার নিয়ম কি?',
    ],
    placeholderAsk: 'বাংলা, ইংরেজি বা অন্য ভাষায় প্রশ্ন লিখুন...',
    checkEligibilityBtn: 'যোগ্যতা পরীক্ষা করুন',
    viewDetailsBtn: 'বিস্তারিত দেখুন',
    applyNowBtn: 'আবেদন করুন (অফিসিয়াল লিঙ্ক)',
    howToApplyTitle: 'আবেদন পদ্ধতি (ধাপে ধাপে)',
    requiredDocsTitle: 'প্রয়োজনীয় নথিপত্র',
    benefitsTitle: 'প্রকল্পের সুবিধাসমূহ',
    eligibilityBreakdownTitle: 'যোগ্যতা বিশ্লেষণ বিবরণ',
    filterByState: 'রাজ্য নির্বাচন করুন',
    filterByOccupation: 'পেশা',
    filterByCategory: 'শ্রেণী (General/OBC/SC/ST)',
    ageLabel: 'বয়স (বছর)',
    incomeLabel: 'বার্ষিক পারিবারিক আয় (₹)',
    savedSchemesTitle: 'আমার সংরক্ষিত প্রকল্পসমূহ',
    noSavedSchemes: 'আপনি এখনও কোনো প্রকল্প সংরক্ষণ করেননি। দ্রুত পৌঁছানোর জন্য যেকোনো স্কিম কার্ডে বুকমার্ক নির্বাচন করুন।',
  },

  ta: {
    appName: 'சேவாசாதி (SevaSaathi)',
    tagline: 'அரசு சேவைகள், அனைவருக்கும் எளிதாக்கப்பட்டுள்ளது.',
    heroDescription:
      'அரசு திட்டங்களைக் கண்டறியவும், தகுதியைச் சரிபார்க்கவும், தேவையான ஆவணங்களைப் புரிந்து கொள்ளவும் உங்கள் மொழியில் உதவி பெறவும்.',
    askAssistantBtn: 'சேவாசாதி AI ஐக் கேளுங்கள்',
    findSchemesBtn: 'திட்டங்களைத் தேடுக',
    navHome: 'முகப்பு',
    navAssistant: 'AI உதவியாளர்',
    navFindSchemes: 'திட்டங்களைக் கண்டறிக',
    navMyProfile: 'என் சுயவிவரம்',
    disclaimerText:
      'இந்த தகவல் வழிகாட்டுதல் மற்றும் டெமோ பயன்பாட்டிற்கு மட்டுமே. அதிகாரப்பூர்வ அரசு இணையதளத்தில் இறுதி தகுதியைச் சரிபார்க்கவும்.',
    officialSourceTag: 'ஆதாரம்: அதிகாரப்பூர்வ அரசு இணையதளம்',
    whatCanDoTitle: 'சேவாசாதி உங்களுக்காக என்ன செய்ய முடியும்',
    whatCanDoItems: [
      { title: 'திட்டங்களைக் கண்டறிதல்', desc: 'உங்கள் சுயவிவரத்திற்கு ஏற்ற மத்திய மற்றும் மாநில அரசு திட்டங்களை அறியலாம்.' },
      { title: 'தகுதி சரிபார்ப்பு', desc: 'உங்கள் தகுதிக்கான விரிவான காரணங்களை உடனடியாகப் பார்க்கலாம்.' },
      { title: 'தேவையான ஆவணங்கள்', desc: 'விண்ணப்பிப்பதற்கு முன் தேவைப்படும் சான்றிதழ்களின் பட்டியலைப் பெறலாம்.' },
      { title: 'விண்ணப்ப வழிகாட்டுதல்', desc: 'படிப் படியாக எவ்வாறு விண்ணப்பிப்பது என்பதற்கான வழிகாட்டுதல்.' },
      { title: 'பல மொழி உதவி', desc: 'தமிழ், இந்தி, ஆங்கிலம், பெங்காலி மற்றும் ஹிங்கிலிஷ் மொழிகளில் உரையாடலாம்.' },
    ],
    impactSectionTitle: 'ஒரு உதவியாளர். பல மொழிகள். அரசு சலுகைகளை எளிதாகப் பெறுங்கள்.',
    metricsBanner: '5 மொழிகள் ஆதரவு | 15+ மாதிரி திட்டங்கள் | AI-இயங்கும் தேடல் | உடனடி தகுதி வழிகாட்டல்',
    suggestedQuestionsTitle: 'கேட்டுப் பாருங்கள்:',
    suggestedQuestions: [
      'மாணவர்களுக்கான கல்வி உதவித்தொகை திட்டங்கள் என்னென்ன?',
      'விவசாயிகளுக்கான அரசு நலத்திட்டங்கள் என்னென்ன?',
      'ஆயுஷ்மான் பாரத் மருத்துவ காப்பீடு அட்டையை பெறுவது எப்படி?',
      'வீடு கட்டுவதற்கான பிரதான் மந்திரி ஆவாஸ் யோஜனா என்ன?',
      'தொழில் தொடங்க முத்ரா கடன் பெறுவது எப்படி?',
    ],
    placeholderAsk: 'தமிழ், ஆங்கிலம் அல்லது இந்தியில் கேள்விகளைக் கேளுங்கள்...',
    checkEligibilityBtn: 'தகுதியைச் சரிபார்',
    viewDetailsBtn: 'விவரங்களைப் பார்',
    applyNowBtn: 'இப்போதே விண்ணப்பிக்க (அதிகாரப்பூர்வ இணைப்பு)',
    howToApplyTitle: 'விண்ணப்பிக்கும் முறை (படிப் படியாக)',
    requiredDocsTitle: 'தேவையான ஆவணங்கள்',
    benefitsTitle: 'திட்ட நன்மைகள்',
    eligibilityBreakdownTitle: 'தகுதி பகுப்பாய்வு விவரம்',
    filterByState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    filterByOccupation: 'தொழில் / பணி',
    filterByCategory: 'பிரிவு (General/OBC/SC/ST)',
    ageLabel: 'வயது (ஆண்டுகள்)',
    incomeLabel: 'ஆண்டு குடும்ப வருமானம் (₹)',
    savedSchemesTitle: 'சேமிக்கப்பட்ட திட்டங்கள்',
    noSavedSchemes: 'நீங்கள் எந்தத் திட்டத்தையும் இன்னும் சேமிக்கவில்லை. விரைவு அணுகலுக்கு புத்தகக் குறியீட்டு ஐகானைக் கிளிக் செய்யவும்.',
  },
};
