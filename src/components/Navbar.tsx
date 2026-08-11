import React from 'react';
import { Bot, Home, Search, Bookmark, Globe, ChevronDown, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  Seva<span className="text-orange-400">Saathi</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SIH
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.navHome}</span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'assistant'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Bot className="w-4 h-4 text-orange-400" />
              <span>{t.navAssistant}</span>
            </button>

            <button
              onClick={() => setActiveTab('find')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'find'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t.navFindSchemes}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{t.navMyProfile}</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-orange-500 text-slate-950 font-bold text-[10px]">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Controls: Language Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-medium text-slate-200 cursor-pointer hover:border-indigo-500 transition-colors">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>
                  {languages.find((l) => l.code === language)?.label || 'English'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 py-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      language === lang.code ? 'text-indigo-400 font-semibold bg-slate-800/50' : 'text-slate-300'
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
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-1 ${
              activeTab === 'home' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{t.navHome}</span>
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex flex-col items-center gap-1 p-1 ${
              activeTab === 'assistant' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Bot className="w-4 h-4 text-orange-400" />
            <span>{t.navAssistant}</span>
          </button>
          <button
            onClick={() => setActiveTab('find')}
            className={`flex flex-col items-center gap-1 p-1 ${
              activeTab === 'find' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.navFindSchemes}</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 p-1 relative ${
              activeTab === 'profile' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{t.navMyProfile}</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
