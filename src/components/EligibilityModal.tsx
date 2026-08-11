import React from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info, Sparkles } from 'lucide-react';
import type { Scheme, CitizenProfile, Language } from '../types/scheme';
import { checkEligibility } from '../services/schemeService';

interface Props {
  scheme: Scheme | null;
  profile: CitizenProfile;
  language: Language;
  onClose: () => void;
}

export const EligibilityModal: React.FC<Props> = ({
  scheme,
  profile,
  onClose,
}) => {
  if (!scheme) return null;

  const result = checkEligibility(scheme, profile);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="glass-panel w-full max-w-xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white">
              Eligibility Analysis Result
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Score & Badge Banner */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/40 text-center">
          <div className="text-xs text-slate-400 font-medium mb-1">
            Analysis for scheme: <span className="text-indigo-300 font-semibold">{scheme.name}</span>
          </div>

          {/* Status Badge */}
          <div className="my-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold shadow-lg">
            {result.status === 'Likely Eligible' && (
              <span className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Likely Eligible (High Probability)
              </span>
            )}

            {result.status === 'Possibly Eligible' && (
              <span className="bg-amber-500/10 border-amber-500/30 text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Possibly Eligible (Additional Verification Needed)
              </span>
            )}

            {result.status === 'Not Eligible' && (
              <span className="bg-rose-500/10 border-rose-500/30 text-rose-400 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                Not Eligible (Criteria Mismatch)
              </span>
            )}
          </div>

          {/* Score bar */}
          <div className="max-w-xs mx-auto mt-2">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Match Score</span>
              <span className="font-bold text-white">{result.score}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  result.status === 'Likely Eligible'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : result.status === 'Possibly Eligible'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                    : 'bg-gradient-to-r from-rose-600 to-red-500'
                }`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Criteria Breakdown List */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Criterion-by-Criterion Evaluation
          </h4>

          {result.criteriaBreakdown.map((criterion, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                criterion.status === 'pass'
                  ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                  : criterion.status === 'warning'
                  ? 'bg-amber-950/20 border-amber-500/20 text-amber-200'
                  : 'bg-rose-950/20 border-rose-500/20 text-rose-200'
              }`}
            >
              {criterion.status === 'pass' && (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {criterion.status === 'warning' && (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              {criterion.status === 'fail' && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}

              <div>
                <span className="font-bold block mb-0.5">{criterion.name}</span>
                <span className="opacity-90">{criterion.explanation}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p>{result.disclaimer}</p>
        </div>

      </div>
    </div>
  );
};
