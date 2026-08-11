import React from 'react';
import { Bookmark, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import type { Scheme, Language } from '../types/scheme';
import { translations } from '../i18n/translations';

interface Props {
  scheme: Scheme;
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  isSaved?: boolean;
  onToggleSave?: (schemeId: string) => void;
}

export const SchemeCard: React.FC<Props> = ({
  scheme,
  language,
  onViewDetails,
  onCheckEligibility,
  isSaved = false,
  onToggleSave,
}) => {
  const t = translations[language] || translations.en;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between relative group hover:border-indigo-500/40 transition-all duration-300">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              {scheme.category}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs flex items-center gap-1 border border-slate-700">
              <Building2 className="w-3 h-3 text-slate-400" />
              {scheme.states.includes('All') ? 'Central Scheme' : scheme.states.join(', ')}
            </span>
          </div>

          {onToggleSave && (
            <button
              onClick={() => onToggleSave(scheme.id)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Save Scheme'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-400' : ''}`} />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-2">
          {scheme.name}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
          {scheme.shortDescription}
        </p>

        {/* Key Benefits Preview */}
        <div className="mb-4 space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Key Benefit
          </div>
          {scheme.benefits.slice(0, 2).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        
        {/* Source Badge */}
        {scheme.officialSource.isOfficialGovPortal ? (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Gov Source</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400">
            Source: Govt Guidance Portal
          </div>
        )}

        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => onCheckEligibility(scheme)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{t.checkEligibilityBtn}</span>
          </button>

          <button
            onClick={() => onViewDetails(scheme)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-indigo-600/20 transition-colors"
          >
            <span>{t.viewDetailsBtn}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
