import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import type { Language } from '../types/scheme';
import { translations } from '../i18n/translations';

interface Props {
  language: Language;
  setActiveTab: (tab: 'home' | 'assistant' | 'find' | 'profile') => void;
}

export const Footer: React.FC<Props> = ({ language, setActiveTab }) => {
  const t = translations[language] || translations.en;

  return (
    <footer className="glass-panel border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-indigo-600 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Seva<span className="text-orange-400">Saathi</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {t.heroDescription}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>SIH Digital Citizen Assistant Prototype</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('assistant')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t.navAssistant}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('find')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t.navFindSchemes}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t.navMyProfile}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Languages */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Supported Languages
            </h4>
            <div className="flex flex-wrap gap-1.5 text-slate-300">
              <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800">English</span>
              <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800">हिंदी</span>
              <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800">Hinglish</span>
              <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800">বাংলা</span>
              <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800">தமிழ்</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-400">
          <p>
            © 2026 SevaSaathi • Smart India Hackathon (SIH) Prototype
          </p>
          <p className="flex items-center gap-1">
            Built for Digital India Innovation
          </p>
        </div>

      </div>
    </footer>
  );
};
