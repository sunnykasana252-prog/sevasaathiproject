import React from 'react';
import { Bookmark, User, ArrowRight } from 'lucide-react';
import type { CitizenProfile, Language, Scheme } from '../types/scheme';
import { translations } from '../i18n/translations';
import { getSchemeById } from '../services/schemeService';
import { SchemeCard } from './SchemeCard';

interface Props {
  language: Language;
  userProfile: CitizenProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<CitizenProfile>>;
  savedSchemeIds: string[];
  onToggleSaveScheme: (schemeId: string) => void;
  onViewSchemeDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  onNavigateToFind: () => void;
}

export const MyProfilePage: React.FC<Props> = ({
  language,
  userProfile,
  savedSchemeIds,
  onToggleSaveScheme,
  onViewSchemeDetails,
  onCheckEligibility,
  onNavigateToFind,
}) => {
  const t = translations[language] || translations.en;

  const savedSchemes = savedSchemeIds
    .map((id) => getSchemeById(id))
    .filter((s): s is Scheme => s !== undefined);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
          <User className="w-3.5 h-3.5" />
          <span>Citizen Portal Workspace</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          My Profile & Bookmarked Schemes
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Manage your profile attributes and access saved government schemes for quick reference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT CARD: CITIZEN PROFILE CARD */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 bg-slate-900">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-indigo-600 p-0.5 text-white flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <User className="w-7 h-7 text-orange-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Indian Citizen</h3>
                <span className="text-xs text-indigo-400 font-medium">
                  {userProfile.occupation || 'Student'} • {userProfile.state || 'Uttar Pradesh'}
                </span>
              </div>
            </div>

            {/* Profile summary details */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Age:</span>
                <span className="font-bold text-white">{userProfile.age || 21} Years</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">State / Domicile:</span>
                <span className="font-bold text-white">{userProfile.state || 'Uttar Pradesh'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Annual Family Income:</span>
                <span className="font-bold text-white">
                  ₹{(userProfile.annualIncome || 150000).toLocaleString('en-IN')}/year
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Category:</span>
                <span className="font-bold text-white">{userProfile.category || 'General'}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-400">Disability Status:</span>
                <span className="font-bold text-white">
                  {userProfile.isDisabled ? 'Yes (PwD)' : 'None'}
                </span>
              </div>
            </div>

            <button
              onClick={onNavigateToFind}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Edit Profile in Discovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SAVED SCHEMES */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-orange-400" />
              <span>{t.savedSchemesTitle} ({savedSchemes.length})</span>
            </h2>
          </div>

          {savedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  language={language}
                  onViewDetails={onViewSchemeDetails}
                  onCheckEligibility={onCheckEligibility}
                  isSaved={true}
                  onToggleSave={onToggleSaveScheme}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <Bookmark className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white">No Saved Schemes Yet</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                {t.noSavedSchemes}
              </p>
              <button
                onClick={onNavigateToFind}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md inline-flex items-center gap-2"
              >
                <span>Browse Schemes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
