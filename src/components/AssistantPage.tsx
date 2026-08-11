import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Bot, User, Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import type { Language, ChatMessage, Scheme, CitizenProfile } from '../types/scheme';
import { translations } from '../i18n/translations';
import { processUserQuery } from '../services/aiAssistantService';
import { SchemeCard } from './SchemeCard';

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
  initialQuery?: string;
  onViewSchemeDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  savedSchemeIds: string[];
  onToggleSaveScheme: (schemeId: string) => void;
  userProfile: CitizenProfile;
}

export const AssistantPage: React.FC<Props> = ({
  language,
  setLanguage,
  initialQuery = '',
  onViewSchemeDetails,
  onCheckEligibility,
  savedSchemeIds,
  onToggleSaveScheme,
  userProfile,
}) => {
  const t = translations[language] || translations.en;

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcoming assistant message
  useEffect(() => {
    const welcomeText =
      language === 'hi'
        ? 'नमस्ते! मैं आपका सेवासाथी AI सहायक हूँ। आप मुझसे केंद्र या राज्य सरकार की योजनाओं, पात्रता और आवश्यक दस्तावेजों के बारे में अपनी भाषा में पूछ सकते हैं।'
        : language === 'hinglish'
        ? 'Namaste! Main aapka SevaSaathi AI assistant hoon. Aap mujhse Govt schemes, eligibility aur required documents ke baare mein poocho.'
        : language === 'bn'
        ? 'নমস্কার! আমি আপনার সেবাসাথী AI সহকারী। আপনি আপনার পছন্দের ভাষায় সরকারি প্রকল্প ও যোগ্যতা সম্পর্কে জিজ্ঞাসা করতে পারেন।'
        : language === 'ta'
        ? 'வணக்கம்! நான் உங்கள் சேவாசாதி AI உதவியாளர். அரசு திட்டங்கள் மற்றும் தகுதிகள் பற்றி நீங்கள் கேட்கலாம்.'
        : 'Hello! I am your SevaSaathi AI Assistant. Ask me anything about government schemes, eligibility criteria, and required documents in your preferred language.';

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language]);

  // Handle initial query passed from home page search bar
  useEffect(() => {
    if (initialQuery.trim()) {
      handleSend(initialQuery.trim());
    }
  }, [initialQuery]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (queryToSend?: string) => {
    const query = (queryToSend || input).trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await processUserQuery(query, language, userProfile);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedSchemes: response.schemes,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice Speech Recognition Simulation (Web Speech API if available)
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input simulation: Speech recognition API is supported on Chrome browsers. Listening simulated...');
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInput('Main UP mein student hoon, scholarship ke liye apply karna hai');
      }, 2000);
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12 flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
      
      {/* CHAT CONTAINER */}
      <div className="glass-panel flex-1 rounded-2xl border border-slate-800 flex flex-col overflow-hidden bg-slate-900 shadow-2xl">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-base">
                  SevaSaathi Multilingual AI
                </h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-400">
                Ask in English, Hindi, Hinglish, Bengali, Tamil
              </p>
            </div>
          </div>

          {/* Quick Language Pills */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            {(['en', 'hi', 'hinglish', 'bn', 'ta'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase transition-all ${
                  language === lang
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-4xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-3 max-w-full sm:max-w-2xl">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {/* Embedded Schemes Cards if available */}
                {msg.recommendedSchemes && msg.recommendedSchemes.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Schemes ({msg.recommendedSchemes.length})</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {msg.recommendedSchemes.map((scheme) => (
                        <SchemeCard
                          key={scheme.id}
                          scheme={scheme}
                          language={language}
                          onViewDetails={onViewSchemeDetails}
                          onCheckEligibility={onCheckEligibility}
                          isSaved={savedSchemeIds.includes(scheme.id)}
                          onToggleSave={onToggleSaveScheme}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                <span>Searching government schemes dataset...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Bar */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/60 overflow-x-auto">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
              {t.suggestedQuestionsTitle}
            </span>
            {t.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-indigo-900/40 text-slate-300 hover:text-indigo-300 text-xs whitespace-nowrap border border-slate-700 hover:border-indigo-500/40 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic button */}
            <button
              type="button"
              onClick={handleMicClick}
              className={`p-3 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
              }`}
              title="Voice Input (Speech-to-Text)"
            >
              {isListening ? <Mic className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-orange-400" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholderAsk}
              className="flex-1 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-600/30 flex items-center justify-center transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
