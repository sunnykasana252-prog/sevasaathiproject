import type { Language, Scheme, CitizenProfile } from '../types/scheme';
import { findRelevantSchemes } from './schemeService';

interface AssistantResponse {
  text: string;
  schemes: Scheme[];
}

/**
 * AI Assistant Response Generator
 * Easily replaceable with a backend REST API call e.g., POST /api/chat { query, language, profile }
 */
export async function processUserQuery(
  query: string,
  language: Language,
  profile: CitizenProfile = {}
): Promise<AssistantResponse> {
  const cleanQuery = query.toLowerCase();

  // Extract implied intent from query
  let extractedProfile: CitizenProfile = { ...profile };

  if (cleanQuery.includes('student') || cleanQuery.includes('scholarship') || cleanQuery.includes('padhai') || cleanQuery.includes('college')) {
    extractedProfile.occupation = 'Student';
  } else if (cleanQuery.includes('farmer') || cleanQuery.includes('kisan') || cleanQuery.includes('kheti')) {
    extractedProfile.occupation = 'Farmer';
  } else if (cleanQuery.includes('hospital') || cleanQuery.includes('ayushman') || cleanQuery.includes('health') || cleanQuery.includes('bimar')) {
    // Health focus
  } else if (cleanQuery.includes('house') || cleanQuery.includes('awas') || cleanQuery.includes('ghar')) {
    // Housing focus
  } else if (cleanQuery.includes('business') || cleanQuery.includes('loan') || cleanQuery.includes('mudra') || cleanQuery.includes('vendor')) {
    extractedProfile.occupation = 'Entrepreneur/Vendor';
  }

  if (cleanQuery.includes('up') || cleanQuery.includes('uttar pradesh')) {
    extractedProfile.state = 'Uttar Pradesh';
  }

  // Retrieve relevant schemes using recommendation engine
  const matchedSchemes = findRelevantSchemes(query, extractedProfile);

  // Generate localized conversational message
  let responseText = '';

  if (language === 'hi' || language === 'hinglish') {
    if (extractedProfile.occupation === 'Student' || cleanQuery.includes('scholarship')) {
      responseText =
        language === 'hi'
          ? `नमस्ते! उत्तर प्रदेश के छात्रों के लिए कई सरकारी छात्रवृत्ति और सहायता योजनाएं उपलब्ध हैं। आपके लिए शीर्ष अनुशंसित योजनाएं नीचे दी गई हैं:`
          : `Namaste! UP mein rehne wale students ke liye Govt of India aur State Govt ki ye top scholarship & training schemes available hain:`;
    } else if (extractedProfile.occupation === 'Farmer' || cleanQuery.includes('kisan')) {
      responseText =
        language === 'hi'
          ? `नमस्ते! किसानों के लिए सरकार द्वारा चलाए जा रहे प्रमुख वित्तीय एवं सिंचाई सहायता कार्यक्रमों की सूची नीचे दी गई है:`
          : `Namaste! Farmers ke liye Government dwara direct bank transfer aur irrigation support schemes ye hain:`;
    } else if (cleanQuery.includes('ayushman') || cleanQuery.includes('health') || cleanQuery.includes('bimar')) {
      responseText =
        language === 'hi'
          ? `आयुष्मान भारत योजना के तहत योग्य परिवारों को प्रतिवर्ष ₹5 लाख तक का मुफ्त कैशलेस इलाज मिलता है। विस्तृत जानकारी देखें:`
          : `Ayushman Bharat scheme ke under ₹5 Lakh tak ka free hospital treatment cover milta hai. Details neeche dekhein:`;
    } else {
      responseText =
        language === 'hi'
          ? `आपकी खोज के आधार पर सबसे प्रासंगिक सरकारी योजनाएं नीचे दी गई हैं। आप पात्रता और आवेदन की प्रक्रिया देखने के लिए किसी भी योजना पर क्लिक कर सकते हैं:`
          : `Aapki query ke according sabse relevant government schemes neeche list ki gayi hain. Eligibility aur required documents check karne ke liye card par click karein:`;
    }
  } else if (language === 'bn') {
    responseText = `নমস্কার! আপনার জিজ্ঞাসার উপর ভিত্তি করে সেরা সরকারি প্রকল্পগুলি নিচে প্রদান করা হলো। বিস্তারিত জানতে এবং যোগ্যতা পরীক্ষা করতে যেকোনো প্রকল্পে ক্লিক করুন:`;
  } else if (language === 'ta') {
    responseText = `வணக்கம்! உங்கள் கேள்வியின் அடிப்படையில் மிகவும் பொருத்தமான அரசு திட்டங்கள் கீழே பட்டியலிடப்பட்டுள்ளன. விவரங்களைப் பார்க்க திட்டத்தைத் தேர்ந்தெடுக்கவும்:`;
  } else {
    // English default
    responseText = `Hello! Based on your query, here are the top relevant government schemes you can apply for. Click on any scheme card to check eligibility criteria and required documents:`;
  }

  // Simulate network latency (250ms) for realistic conversational flow
  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    text: responseText,
    schemes: matchedSchemes.slice(0, 4), // Limit top 4 recommendations in chat
  };
}
