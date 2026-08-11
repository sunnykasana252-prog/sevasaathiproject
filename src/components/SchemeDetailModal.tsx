import React, { useState } from 'react';
import { X, ShieldCheck, ExternalLink, CheckCircle2, FileText, ListOrdered, CheckSquare, Sparkles, Building2 } from 'lucide-react';
import type { Scheme, Language } from '../types/scheme';
import { translations } from '../i18n/translations';

interface Props {
  scheme: Scheme | null;
  language: Language;
  onClose: () => void;
  onCheckEligibility: (scheme: Scheme) => void;
}

export const SchemeDetailModal: React.FC<Props> = ({
  scheme,
  language,
  onClose,
  onCheckEligibility,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'steps'>('overview');

  if (!scheme) return null;

  const t = translations[language] || translations.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="glass-panel w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/90">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                {scheme.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs flex items-center gap-1 border border-slate-700">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {scheme.states.includes('All') ? 'Central Government' : scheme.states.join(', ')}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {scheme.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/50 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Overview & Benefits</span>
          </button>

          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-4 py-3 font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'eligibility'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Eligibility Criteria</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-3 font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-orange-400" />
            <span>Required Documents</span>
          </button>

          <button
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-3 font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'steps'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListOrdered className="w-4 h-4 text-emerald-400" />
            <span>{t.howToApplyTitle}</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm">
          
          {/* Tab 1: Overview & Benefits */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Scheme Overview
                </h4>
                <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                  {scheme.fullOverview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  {t.benefitsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scheme.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/10 text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Eligibility Criteria */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Eligibility Criteria Checklist
                </h4>
                <button
                  onClick={() => onCheckEligibility(scheme)}
                  className="px-3 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-orange-500/30 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Eligibility Diagnostic</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {scheme.eligibilityCriteria.map((criterion, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Required Documents */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Mandatory Certificates & Proofs
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-200"
                  >
                    <FileText className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Step-by-step How to Apply */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Application Procedure
              </h4>
              <div className="space-y-3">
                {scheme.applicationSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md">
                      {step.step}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm mb-1">
                        {step.title}
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Official Source Tag & Apply Link */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 text-xs">
            {scheme.officialSource.isOfficialGovPortal && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Source: Official Government Portal</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onCheckEligibility(scheme)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Check Eligibility</span>
            </button>

            <a
              href={scheme.officialSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-colors"
            >
              <span>Apply Now (Official Link)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
