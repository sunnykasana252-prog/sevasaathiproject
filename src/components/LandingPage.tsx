import React, { useState } from 'react';
import BorderGlow from './BorderGlow';
import { Bot, Search, Globe, Sparkles, ArrowRight, Shield, Layers, FileCheck } from 'lucide-react';
import type { Language, Scheme } from '../types/scheme';
import { translations } from '../i18n/translations';
import { SCHEMES_DATASET } from '../data/schemes';
import { SchemeCard } from './SchemeCard';

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateToAssistant: (initialQuery?: string) => void;
  onNavigateToFind: () => void;
  onViewSchemeDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  savedSchemeIds: string[];
  onToggleSaveScheme: (schemeId: string) => void;
}

export const LandingPage: React.FC<Props> = ({
  language,
  setLanguage,
  onNavigateToAssistant,
  onNavigateToFind,
  onViewSchemeDetails,
  onCheckEligibility,
  savedSchemeIds,
  onToggleSaveScheme,
}) => {
  const t = translations[language] || translations.en;
  const [heroInput, setHeroInput] = useState('');

  const featuredSchemes = SCHEMES_DATASET.slice(0, 6);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroInput.trim()) {
      onNavigateToAssistant(heroInput.trim());
    } else {
      onNavigateToAssistant();
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fff7ed 0%, #f8fafc 60%, #ecfdf5 100%)' }}>
        {/* Subtle glow blobs */}
        <div className="gradient-glow w-96 h-96 bg-orange-400 top-0 -left-20 animate-pulse-slow"></div>
        <div className="gradient-glow w-96 h-96 bg-emerald-400 top-20 right-0 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

        <div className="relative max-w-4xl mx-auto text-center px-4 space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-600 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Citizen Assistant • SIH Prototype</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Seva<span className="gradient-text">Saathi</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-slate-700">
            {t.tagline}
          </p>

          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.heroDescription}
          </p>

          {/* Tricolor stripe accent */}
          <div className="tricolor-stripe max-w-xs mx-auto rounded-full" />

          {/* Hero Quick Ask Search Input */}
          <form onSubmit={handleHeroSearchSubmit} className="max-w-2xl mx-auto pt-4">
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-3 px-3 w-full">
                <Bot className="w-5 h-5 text-orange-500 shrink-0" />
                <input
                  type="text"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder={t.placeholderAsk}
                  className="w-full bg-transparent border-none outline-none text-slate-800 text-sm placeholder-slate-400 py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 whitespace-nowrap transition-all"
              >
                <span>{t.askAssistantBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Buttons & Language Selector */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToAssistant()}
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>{t.askAssistantBtn}</span>
            </button>

            <button
              onClick={onNavigateToFind}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>{t.findSchemesBtn}</span>
            </button>
          </div>

          {/* Language Selector Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Globe className="w-3.5 h-3.5 text-orange-500" />
              Language:
            </span>
            {(
              [
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'hinglish', label: 'Hinglish' },
                { code: 'bn', label: 'বাংলা' },
                { code: 'ta', label: 'தமிழ்' },
              ] as const
            ).map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  language === lang.code
                    ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-orange-300'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* SIH PROTOTYPE METRICS BANNER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-50 via-white to-emerald-50 p-6 rounded-2xl border border-orange-100 text-center shadow-sm">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-orange-500 uppercase mb-1">
            Smart India Hackathon Prototype Capabilities
          </p>
          <p className="text-base sm:text-xl font-bold text-slate-800">
            {t.metricsBanner}
          </p>
        </div>
      </section>

      {/* WHAT SEVASAATHI CAN DO */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t.whatCanDoTitle}
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Designed to bridge the digital divide and make government welfare accessible to every citizen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BorderGlow
            glowColor="30 90 70"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={35}
            glowIntensity={1.2}
            coneSpread={28}
            animated={true}
            colors={['#fb923c', '#f97316', '#fdba74']}
          >
            <div className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 text-orange-500 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Discover Schemes</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Find relevant central & state government schemes tailored to your occupation, income, and domicile.
              </p>
            </div>
          </BorderGlow>

          <BorderGlow
            glowColor="240 60 70"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={35}
            glowIntensity={1.2}
            coneSpread={28}
            animated={true}
            colors={['#f97316', '#ea580c', '#fdba74']}
          >
            <div className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Check Eligibility</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Instant criterion-by-criterion evaluation explaining exactly why you meet or exceed eligibility thresholds.
              </p>
            </div>
          </BorderGlow>

          <BorderGlow
            glowColor="160 70 65"
            backgroundColor="#ffffff"
            borderRadius={16}
            glowRadius={35}
            glowIntensity={1.2}
            coneSpread={28}
            animated={true}
            colors={['#34d399', '#10b981', '#6ee7b7']}
          >
            <div className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Understand Documents & Steps</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Get mandatory certificate checklists and step-by-step guidance on how to submit applications to official portals.
              </p>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* FEATURED SCHEMES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Popular Government Schemes
            </h2>
            <p className="text-slate-500 text-sm">
              Explore key welfare programs available across India.
            </p>
          </div>
          <button
            onClick={onNavigateToFind}
            className="px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-500 font-semibold text-xs flex items-center gap-1.5 border border-orange-200 transition-colors shadow-sm"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSchemes.map((scheme) => (
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
      </section>

      {/* SOCIAL IMPACT SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-orange-50 via-white to-emerald-50 p-8 sm:p-12 rounded-3xl border border-orange-100 text-center space-y-6 shadow-sm">
          <div className="tricolor-stripe max-w-sm mx-auto rounded-full mb-2" />
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-orange-200">
            <Shield className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 max-w-3xl mx-auto leading-tight">
            {t.impactSectionTitle}
          </h2>

          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Millions of eligible citizens miss out on crucial welfare schemes due to language barriers, complex eligibility guidelines, and missing document knowledge. SevaSaathi solves this with an AI-driven multilingual assistant that guides citizens from discovery to official application.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigateToAssistant()}
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 transition-all inline-flex items-center gap-2"
            >
              <Bot className="w-5 h-5" />
              <span>{t.askAssistantBtn}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

