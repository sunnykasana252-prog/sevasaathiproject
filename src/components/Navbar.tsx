import React from 'react';
import { Bot, Home, Search, Bookmark, Globe, ChevronDown, Sparkles } from 'lucide-react';
import PillNav from './PillNav';
import type { Language } from '../types/scheme';
import { translations } from '../i18n/translations';

interface Props {
  activeTab: 'home' | 'assistant' | 'find' | 'profile';
  setActiveTab: (tab: 'home' | 'assistant' | 'find' | 'profile') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  savedCount: number;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  savedCount,
}) => {
  const t = translations[language] || translations.en;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'hinglish', label: 'Hinglish', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-orange-400 to-emerald-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                  Seva<span className="text-orange-500">Saathi</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200">
                  SIH
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* PillNav — Desktop */}
          <div className="hidden md:flex">
                      <PillNav
              logo="/favicon.svg"
              logoAlt="SevaSaathi"
              activeTab={activeTab}
              ease="power3.easeOut"
              baseColor="#f8fafc"
              pillColor="#f97316"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#334155"
              initialLoadAnimation={true}
              onMobileMenuClick={() => {}}
              items={[
                {
                  id: 'home',
                  label: t.navHome,
                  onClick: () => setActiveTab('home'),
                },
                {
                  id: 'assistant',
                  label: t.navAssistant,
                  onClick: () => setActiveTab('assistant'),
                },
                {
                  id: 'find',
                  label: t.navFindSchemes,
                  onClick: () => setActiveTab('find'),
                },
                {
                  id: 'profile',
                  label: savedCount > 0 ? `${t.navMyProfile} (${savedCount})` : t.navMyProfile,
                  onClick: () => setActiveTab('profile'),
                },
              ]}
            />
          </div>

          {/* Right Controls: Language Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-sm font-medium text-slate-700 cursor-pointer hover:border-orange-400 transition-colors">
                <Globe className="w-4 h-4 text-orange-500" />
                <span>
                  {languages.find((l) => l.code === language)?.label || 'English'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 py-1 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-orange-50 transition-colors ${
                      language === lang.code ? 'text-orange-600 font-semibold bg-orange-50' : 'text-slate-600'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-sm">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-1 ${
              activeTab === 'home' ? 'text-orange-500 font-semibold' : 'text-slate-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{t.navHome}</span>
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex flex-col items-center gap-1 p-1 ${
              activeTab === 'assistant' ? 'text-orange-500 font-semibold' : 'text-slate-400'
            }`}
          >
            <Bot className="w-4 h-4 text-orange-500" />
            <span>{t.navAssistant}</span>
          </button>
          <button
            onClick={() => setActiveTab('find')}
            className={`flex flex-col items-center gap-1 p-1 ${
              activeTab === 'find' ? 'text-orange-500 font-semibold' : 'text-slate-400'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.navFindSchemes}</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 p-1 relative ${
              activeTab === 'profile' ? 'text-orange-500 font-semibold' : 'text-slate-400'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{t.navMyProfile}</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
