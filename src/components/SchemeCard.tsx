import React from 'react';
import { Bookmark, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
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
    <SpotlightCard
      className="glass-card card-saffron-border rounded-2xl p-5 flex flex-col justify-between relative group transition-all duration-300"
      spotlightColor="rgba(249, 115, 22, 0.15)"
    >
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold">
              {scheme.category}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-xs flex items-center gap-1 border border-slate-200">
              <Building2 className="w-3 h-3 text-slate-400" />
              {scheme.states.includes('All') ? 'Central Scheme' : scheme.states.join(', ')}
            </span>
          </div>

          {onToggleSave && (
            <button
              onClick={() => onToggleSave(scheme.id)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-orange-100 border-orange-300 text-orange-500'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-300'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Save Scheme'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-400' : ''}`} />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug mb-2">
          {scheme.name}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
          {scheme.shortDescription}
        </p>

        {/* Key Benefits Preview */}
        <div className="mb-4 space-y-1.5 bg-orange-50/60 p-3 rounded-xl border border-orange-100">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Key Benefit
          </div>
          {scheme.benefits.slice(0, 2).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        
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
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-600 border border-slate-200 hover:border-orange-300 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{t.checkEligibilityBtn}</span>
          </button>

          <button
            onClick={() => onViewDetails(scheme)}
            className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-orange-500/20 transition-colors"
          >
            <span>{t.viewDetailsBtn}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </SpotlightCard>
  );
};
