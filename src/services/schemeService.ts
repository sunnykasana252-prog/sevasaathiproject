import { SCHEMES_DATASET } from '../data/schemes';
import type { CitizenProfile, EligibilityResult, CriterionCheck, Scheme } from '../types/scheme';

// Stop-words to ignore in keyword tokenization to prevent broad over-matching
const GENERIC_STOP_WORDS = new Set([
  'card',
  'yojana',
  'scheme',
  'schemes',
  'government',
  'govt',
  'india',
  'pm',
  'get',
  'for',
  'the',
  'and',
  'with',
  'main',
  'mein',
  'hoon',
  'hai',
  'kya',
  'kaun',
  'si',
  'ko', 'par', 'se', 'ke', 'ki', 'ka', 'mil', 'sakti', 'hain', 'want', 'need', 'how', 'what', 'which'
]);

// Map common query typos & aliases to normalized search terms
function normalizeQuery(rawQuery: string): string {
  let q = rawQuery.toLowerCase();
  q = q.replace(/\b(addhar|aadhar|adhar|adharcard|addharcard)\b/g, 'aadhaar');
  q = q.replace(/\b(scolarship|scolaship|sholarship)\b/g, 'scholarship');
  q = q.replace(/\b(ayusman|ayushmann|ayusham)\b/g, 'ayushman');
  q = q.replace(/\b(kisan|kisann|kissan)\b/g, 'kisan');
  q = q.replace(/\b( आवास | awas | aawas )\b/g, 'awas');
  return q;
}

/**
 * Filter schemes based on search query keywords, citizen profile, and explicit UI filter dropdowns.
 */
export function findRelevantSchemes(
  query: string = '',
  profile: CitizenProfile = {},
  filters: { state?: string; occupation?: string; category?: string } = {}
): Scheme[] {
  const normalizedQuery = normalizeQuery(query).trim();

  // Extract non-stopword tokens from normalized query
  const rawTokens = normalizedQuery ? normalizedQuery.split(/\s+/).filter((t) => t.length >= 3) : [];
  const queryTokens = rawTokens.filter((token) => !GENERIC_STOP_WORDS.has(token));

  // Fallback to raw tokens if all tokens were filtered out (e.g. searching just "card")
  const effectiveTokens = queryTokens.length > 0 ? queryTokens : rawTokens;

  return SCHEMES_DATASET.filter((scheme) => {
    // 1. State Filter
    const targetState = filters.state || profile.state;
    if (targetState && targetState !== 'All') {
      const matchesState =
        scheme.states.includes('All') ||
        scheme.states.some((s) => s.toLowerCase() === targetState.toLowerCase());
      if (!matchesState) return false;
    }

    // 2. Occupation Filter
    const targetOccupation = filters.occupation || profile.occupation;
    if (targetOccupation && targetOccupation !== 'Other') {
      const matchesOccupation = scheme.targetOccupations.some(
        (occ) => occ.toLowerCase() === targetOccupation.toLowerCase()
      );
      if (!matchesOccupation) return false;
    }

    // 3. Category Filter
    const targetCategory = filters.category || profile.category;
    if (targetCategory && targetCategory !== 'All' && scheme.allowedCategories) {
      const matchesCategory =
        scheme.allowedCategories.includes('All') ||
        scheme.allowedCategories.includes(targetCategory as any);
      if (!matchesCategory) return false;
    }

    // 4. Disability Check
    if (scheme.disabilityOnly && !profile.isDisabled) {
      return false;
    }

    // 5. Query Keyword Matching Score
    if (effectiveTokens.length > 0) {
      const searchableText = (
        scheme.name +
        ' ' +
        scheme.shortDescription +
        ' ' +
        scheme.fullOverview +
        ' ' +
        scheme.category +
        ' ' +
        scheme.keywords.join(' ') +
        ' ' +
        scheme.requiredDocuments.join(' ')
      ).toLowerCase();

      const matchCount = effectiveTokens.filter((token) => searchableText.includes(token)).length;
      if (matchCount === 0) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    // Priority score sorting based on profile match & query relevance
    const scoreA = calculateProfileMatchScore(a, profile, effectiveTokens);
    const scoreB = calculateProfileMatchScore(b, profile, effectiveTokens);
    return scoreB - scoreA;
  });
}

/**
 * Calculates a profile match score (0-100)
 */
function calculateProfileMatchScore(scheme: Scheme, profile: CitizenProfile, tokens: string[] = []): number {
  let score = 70; // Base baseline match

  if (tokens.length > 0) {
    const text = (scheme.name + ' ' + scheme.shortDescription + ' ' + scheme.keywords.join(' ')).toLowerCase();
    tokens.forEach((t) => {
      if (text.includes(t)) {
        score += 20;
      }
    });
  }

  if (profile.age !== undefined) {
    if (
      (scheme.minAge !== undefined && profile.age < scheme.minAge) ||
      (scheme.maxAge !== undefined && profile.age > scheme.maxAge)
    ) {
      score -= 30;
    } else {
      score += 10;
    }
  }

  if (profile.annualIncome !== undefined && scheme.maxAnnualIncome !== undefined) {
    if (profile.annualIncome <= scheme.maxAnnualIncome) {
      score += 15;
    } else {
      score -= 35;
    }
  }

  if (profile.occupation && scheme.targetOccupations.includes(profile.occupation)) {
    score += 15;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Performs explicit criterion-by-criterion eligibility evaluation
 */
export function checkEligibility(scheme: Scheme, profile: CitizenProfile): EligibilityResult {
  const breakdown: CriterionCheck[] = [];
  let failCount = 0;
  let warningCount = 0;

  // Age Check
  if (profile.age !== undefined) {
    if (scheme.minAge !== undefined && profile.age < scheme.minAge) {
      failCount++;
      breakdown.push({
        name: 'Age Requirement',
        status: 'fail',
        explanation: `Minimum age required is ${scheme.minAge} years (Your age: ${profile.age}).`,
      });
    } else if (scheme.maxAge !== undefined && profile.age > scheme.maxAge) {
      failCount++;
      breakdown.push({
        name: 'Age Limit',
        status: 'fail',
        explanation: `Maximum age limit is ${scheme.maxAge} years (Your age: ${profile.age}).`,
      });
    } else {
      breakdown.push({
        name: 'Age Requirement',
        status: 'pass',
        explanation: `Your age (${profile.age} years) falls within the eligible range (${scheme.minAge || 0} - ${scheme.maxAge || 'No limit'} years).`,
      });
    }
  } else {
    warningCount++;
    breakdown.push({
      name: 'Age Requirement',
      status: 'warning',
      explanation: 'Age not specified in profile. Standard age limits apply as per scheme rules.',
    });
  }

  // Annual Income Check
  if (profile.annualIncome !== undefined && scheme.maxAnnualIncome !== undefined) {
    if (profile.annualIncome <= scheme.maxAnnualIncome) {
      breakdown.push({
        name: 'Annual Income Limit',
        status: 'pass',
        explanation: `Your reported income (₹${profile.annualIncome.toLocaleString('en-IN')}) is below the scheme ceiling limit of ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}.`,
      });
    } else {
      failCount++;
      breakdown.push({
        name: 'Annual Income Limit',
        status: 'fail',
        explanation: `Your reported income (₹${profile.annualIncome.toLocaleString('en-IN')}) exceeds the ceiling of ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}.`,
      });
    }
  } else if (scheme.maxAnnualIncome !== undefined) {
    warningCount++;
    breakdown.push({
      name: 'Annual Income Limit',
      status: 'warning',
      explanation: `Income ceiling limit is ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}/year. Please confirm your income.`,
    });
  }

  // Occupation Check
  if (profile.occupation) {
    const isTargetOcc = scheme.targetOccupations.includes(profile.occupation);
    if (isTargetOcc) {
      breakdown.push({
        name: 'Target Occupation',
        status: 'pass',
        explanation: `Your occupation (${profile.occupation}) is listed as a primary beneficiary group.`,
      });
    } else {
      warningCount++;
      breakdown.push({
        name: 'Target Occupation',
        status: 'warning',
        explanation: `Primary beneficiary groups are: ${scheme.targetOccupations.join(', ')}. Verification required for special categories.`,
      });
    }
  }

  // State Check
  if (profile.state) {
    const isStateMatch =
      scheme.states.includes('All') ||
      scheme.states.some((s) => s.toLowerCase() === profile.state?.toLowerCase());
    if (isStateMatch) {
      breakdown.push({
        name: 'State / Residence Domicile',
        status: 'pass',
        explanation: `Scheme is valid in ${profile.state}.`,
      });
    } else {
      failCount++;
      breakdown.push({
        name: 'State Domicile Restriction',
        status: 'fail',
        explanation: `Scheme is restricted to residents of: ${scheme.states.join(', ')}.`,
      });
    }
  }

  // Overall status evaluation
  let status: 'Likely Eligible' | 'Possibly Eligible' | 'Not Eligible' = 'Likely Eligible';
  let score = 90;

  if (failCount > 0) {
    status = 'Not Eligible';
    score = Math.max(10, 90 - failCount * 40);
  } else if (warningCount > 1) {
    status = 'Possibly Eligible';
    score = 65;
  }

  return {
    status,
    score,
    criteriaBreakdown: breakdown,
    disclaimer:
      'This evaluation is produced by the SevaSaathi AI assistant prototype based on the provided sample data. Final eligibility decisions are strictly determined by the relevant government authority upon verification of original documents.',
  };
}

export function getSchemeById(id: string): Scheme | undefined {
  return SCHEMES_DATASET.find((s) => s.id === id);
}
