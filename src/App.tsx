import { useState } from 'react';
import type { Language, Scheme, CitizenProfile } from './types/scheme';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AssistantPage } from './components/AssistantPage';
import { FindSchemesPage } from './components/FindSchemesPage';
import { MyProfilePage } from './components/MyProfilePage';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { EligibilityModal } from './components/EligibilityModal';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'assistant' | 'find' | 'profile'>('home');
  const [language, setLanguage] = useState<Language>('hinglish');

  // Citizen Profile State
  const [userProfile, setUserProfile] = useState<CitizenProfile>({
    age: 21,
    state: 'Uttar Pradesh',
    occupation: 'Student',
    annualIncome: 150000,
    category: 'General',
    isDisabled: false,
  });

  // Bookmarked Schemes State
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>([
    'nsp-post-matric',
    'ayushman-bharat',
  ]);

  // Modal states
  const [detailScheme, setDetailScheme] = useState<Scheme | null>(null);
  const [eligibilityScheme, setEligibilityScheme] = useState<Scheme | null>(null);

  // Transfer initial query from landing page to assistant
  const [initialAssistantQuery, setInitialAssistantQuery] = useState<string>('');

  const handleToggleSaveScheme = (schemeId: string) => {
    setSavedSchemeIds((prev) =>
      prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId]
    );
  };

  const handleNavigateToAssistantWithQuery = (query?: string) => {
    if (query) {
      setInitialAssistantQuery(query);
    }
    setActiveTab('assistant');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner language={language} />

      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        savedCount={savedSchemeIds.length}
      />

      {/* Main View Switcher */}
      <main className="flex-1 py-8">
        {activeTab === 'home' && (
          <LandingPage
            language={language}
            setLanguage={setLanguage}
            onNavigateToAssistant={handleNavigateToAssistantWithQuery}
            onNavigateToFind={() => setActiveTab('find')}
            onViewSchemeDetails={(scheme) => setDetailScheme(scheme)}
            onCheckEligibility={(scheme) => setEligibilityScheme(scheme)}
            savedSchemeIds={savedSchemeIds}
            onToggleSaveScheme={handleToggleSaveScheme}
          />
        )}

        {activeTab === 'assistant' && (
          <AssistantPage
            language={language}
            setLanguage={setLanguage}
            initialQuery={initialAssistantQuery}
            onViewSchemeDetails={(scheme) => setDetailScheme(scheme)}
            onCheckEligibility={(scheme) => setEligibilityScheme(scheme)}
            savedSchemeIds={savedSchemeIds}
            onToggleSaveScheme={handleToggleSaveScheme}
            userProfile={userProfile}
          />
        )}

        {activeTab === 'find' && (
          <FindSchemesPage
            language={language}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onViewSchemeDetails={(scheme) => setDetailScheme(scheme)}
            onCheckEligibility={(scheme) => setEligibilityScheme(scheme)}
            savedSchemeIds={savedSchemeIds}
            onToggleSaveScheme={handleToggleSaveScheme}
          />
        )}

        {activeTab === 'profile' && (
          <MyProfilePage
            language={language}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            savedSchemeIds={savedSchemeIds}
            onToggleSaveScheme={handleToggleSaveScheme}
            onViewSchemeDetails={(scheme) => setDetailScheme(scheme)}
            onCheckEligibility={(scheme) => setEligibilityScheme(scheme)}
            onNavigateToFind={() => setActiveTab('find')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} setActiveTab={setActiveTab} />

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        scheme={detailScheme}
        language={language}
        onClose={() => setDetailScheme(null)}
        onCheckEligibility={(scheme) => {
          setDetailScheme(null);
          setEligibilityScheme(scheme);
        }}
      />

      {/* Eligibility Breakdown Modal */}
      <EligibilityModal
        scheme={eligibilityScheme}
        profile={userProfile}
        language={language}
        onClose={() => setEligibilityScheme(null)}
      />

    </div>
  );
}

export default App;
