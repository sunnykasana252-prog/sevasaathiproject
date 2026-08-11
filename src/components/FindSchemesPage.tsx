import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, UserCheck, Sparkles, RefreshCw } from 'lucide-react';
import type { CitizenProfile, Language, Scheme, UserOccupation, UserCategory, SchemeCategory } from '../types/scheme';
import { findRelevantSchemes } from '../services/schemeService';
import { SchemeCard } from './SchemeCard';
import { translations } from '../i18n/translations';

interface Props {
  language: Language;
  userProfile: CitizenProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<CitizenProfile>>;
  onViewSchemeDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  savedSchemeIds: string[];
  onToggleSaveScheme: (schemeId: string) => void;
}

export const FindSchemesPage: React.FC<Props> = ({
  language,
  userProfile,
  setUserProfile,
  onViewSchemeDetails,
  onCheckEligibility,
  savedSchemeIds,
  onToggleSaveScheme,
}) => {
  const t = translations[language] || translations.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>(userProfile.state || 'All');
  const [selectedOccupationFilter, setSelectedOccupationFilter] = useState<string>(userProfile.occupation || 'All');

  const statesList = [
    'All',
    'Uttar Pradesh',
    'Bihar',
    'Maharashtra',
    'Rajasthan',
    'West Bengal',
    'Tamil Nadu',
    'Delhi',
    'Madhya Pradesh',
    'Gujarat',
  ];

  const occupationsList: UserOccupation[] = [
    'Student',
    'Farmer',
    'Worker/Laborer',
    'Entrepreneur/Vendor',
    'Senior Citizen',
    'Unemployed',
    'Other',
  ];

  const categoryList: UserCategory[] = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'];

  const schemeCategories: (SchemeCategory | 'All')[] = [
    'All',
    'Education & Scholarships',
    'Healthcare & Wellness',
    'Agriculture & Farming',
    'Housing & Infrastructure',
    'Women & Child Welfare',
    'Financial Assistance & Pension',
    'Skill & Employment',
  ];

  // Perform reactive search and match scoring
  const filteredSchemes = useMemo(() => {
    return findRelevantSchemes(searchQuery, userProfile, {
      state: selectedStateFilter === 'All' ? undefined : selectedStateFilter,
      occupation: selectedOccupationFilter === 'All' ? undefined : selectedOccupationFilter,
      category: selectedCategoryFilter === 'All' ? undefined : selectedCategoryFilter,
    });
  }, [searchQuery, userProfile, selectedStateFilter, selectedOccupationFilter, selectedCategoryFilter]);

  const handleResetProfile = () => {
    setUserProfile({
      age: 21,
      state: 'Uttar Pradesh',
      occupation: 'Student',
      annualIncome: 150000,
      category: 'General',
      isDisabled: false,
    });
    setSearchQuery('');
    setSelectedStateFilter('All');
    setSelectedOccupationFilter('All');
    setSelectedCategoryFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 space-y-8">
      
      {/* Page Title Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Discovery Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Find Eligible Government Schemes
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Enter your profile criteria to instantly filter central & state government schemes and evaluate your eligibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: CITIZEN PROFILE FORM & FILTERS */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-5 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <UserCheck className="w-4 h-4 text-orange-400" />
                <span>Citizen Profile</span>
              </div>
              <button
                onClick={handleResetProfile}
                className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
                title="Reset filters"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Age Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.ageLabel}: <span className="text-indigo-400">{userProfile.age || 21}</span>
              </label>
              <input
                type="range"
                min={0}
                max={90}
                value={userProfile.age || 21}
                onChange={(e) =>
                  setUserProfile((prev) => ({ ...prev, age: parseInt(e.target.value) }))
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Annual Income Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.incomeLabel}
              </label>
              <input
                type="number"
                step={25000}
                value={userProfile.annualIncome || 150000}
                onChange={(e) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    annualIncome: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[11px] text-slate-400">
                Current: ₹{(userProfile.annualIncome || 150000).toLocaleString('en-IN')}/yr
              </span>
            </div>

            {/* Occupation Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.filterByOccupation}
              </label>
              <select
                value={userProfile.occupation || 'Student'}
                onChange={(e) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    occupation: e.target.value as UserOccupation,
                  }))
                }
                className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              >
                {occupationsList.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* State Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.filterByState}
              </label>
              <select
                value={userProfile.state || 'Uttar Pradesh'}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserProfile((prev) => ({ ...prev, state: val }));
                  setSelectedStateFilter(val);
                }}
                className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.filterByCategory}
              </label>
              <select
                value={userProfile.category || 'General'}
                onChange={(e) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    category: e.target.value as UserCategory,
                  }))
                }
                className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              >
                {categoryList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Disability Checkbox */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="disabilityCheck"
                checked={userProfile.isDisabled || false}
                onChange={(e) =>
                  setUserProfile((prev) => ({ ...prev, isDisabled: e.target.checked }))
                }
                className="accent-indigo-500 rounded"
              />
              <label htmlFor="disabilityCheck" className="text-xs text-slate-300 cursor-pointer">
                Specially-Abled / Person with Disability (PwD)
              </label>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: SEARCH & SCHEME RESULTS GRID */}
        <div className="space-y-6 lg:col-span-3">
          
          {/* Search bar & Category filter tabs */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scheme by keyword (e.g. scholarship, farmer, health, loan, housing)..."
                className="w-full bg-slate-900 text-white text-sm pl-12 pr-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors shadow-lg"
              />
            </div>

            {/* Scheme Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Category:
              </span>
              {schemeCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                    selectedCategoryFilter === cat
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredSchemes.length}</strong> matching schemes for your profile
            </span>
            <span>Sorted by Eligibility Priority</span>
          </div>

          {/* Scheme Cards Grid */}
          {filteredSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
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
          ) : (
            <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No Schemes Found</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                No government schemes matched your specific search or filter criteria. Try adjusting your age, income, or state filters above.
              </p>
              <button
                onClick={handleResetProfile}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
