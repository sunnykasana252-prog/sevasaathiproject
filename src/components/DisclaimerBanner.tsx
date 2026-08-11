import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import type { Language } from '../types/scheme';
import { translations } from '../i18n/translations';

interface Props {
  language: Language;
}

export const DisclaimerBanner: React.FC<Props> = ({ language }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="bg-amber-950/40 border-b border-amber-500/20 text-amber-200 px-4 py-2.5 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{t.disclaimerText}</span>
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium text-xs whitespace-nowrap">
          <ExternalLink className="w-3 h-3" />
          <span>SIH 2024 Prototype Demo</span>
        </div>
      </div>
    </div>
  );
};
