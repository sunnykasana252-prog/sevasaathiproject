export type Language = 'en' | 'hi' | 'hinglish' | 'bn' | 'ta';

export type SchemeCategory =
  | 'Education & Scholarships'
  | 'Healthcare & Wellness'
  | 'Agriculture & Farming'
  | 'Housing & Infrastructure'
  | 'Women & Child Welfare'
  | 'Financial Assistance & Pension'
  | 'Skill & Employment';

export type UserOccupation =
  | 'Student'
  | 'Farmer'
  | 'Worker/Laborer'
  | 'Entrepreneur/Vendor'
  | 'Senior Citizen'
  | 'Unemployed'
  | 'Other';

export type UserCategory = 'All' | 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority';

export interface CitizenProfile {
  age?: number;
  state?: string;
  occupation?: UserOccupation;
  annualIncome?: number;
  category?: UserCategory;
  isDisabled?: boolean;
  gender?: 'Male' | 'Female' | 'Transgender' | 'Any';
}

export interface ApplicationStep {
  step: number;
  title: string;
  description: string;
}

export interface OfficialSource {
  portalName: string;
  url: string;
  isOfficialGovPortal: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  shortDescription: string;
  fullOverview: string;
  category: SchemeCategory;
  states: string[]; // e.g. ['All'] or ['Uttar Pradesh', 'Bihar']
  targetOccupations: UserOccupation[];
  minAge?: number;
  maxAge?: number;
  maxAnnualIncome?: number; // In INR
  allowedCategories?: UserCategory[];
  genderPreference?: 'Male' | 'Female' | 'Transgender' | 'Any';
  disabilityOnly?: boolean;
  benefits: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationSteps: ApplicationStep[];
  officialSource: OfficialSource;
  keywords: string[];
}

export interface CriterionCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  explanation: string;
}

export interface EligibilityResult {
  status: 'Likely Eligible' | 'Possibly Eligible' | 'Not Eligible';
  score: number; // 0 to 100
  criteriaBreakdown: CriterionCheck[];
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedSchemes?: Scheme[];
  language?: Language;
}
