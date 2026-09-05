import { calcAge } from './format';

/**
 * Rule-based (no ML) scheme eligibility scoring.
 * Each defined rule field counts as one equally-weighted criterion.
 * percent >= 60 => "Likely Eligible" (never claim outright "Eligible").
 */
export function computeMatch(profile, scheme) {
  const rules = scheme.eligibilityRules || {};
  const criteria = [];

  const age = profile ? calcAge(profile.dob) : null;

  if (rules.minAge !== undefined || rules.maxAge !== undefined) {
    const min = rules.minAge ?? 0;
    const max = rules.maxAge ?? 200;
    const ok = age !== null && age >= min && age <= max;
    criteria.push({
      label: `Age between ${min}-${max}`,
      matched: ok,
    });
  }

  if (rules.studentRequired !== undefined && rules.studentRequired !== null) {
    const isStudent = profile?.studentStatus === 'Yes' || profile?.studentStatus === true;
    const ok = isStudent === rules.studentRequired;
    criteria.push({
      label: rules.studentRequired ? 'Currently a student' : 'Not required to be a student',
      matched: ok,
    });
  }

  if (rules.maxIncome !== undefined) {
    const income = Number(profile?.annualIncome);
    const ok = !Number.isNaN(income) && income > 0 && income <= rules.maxIncome;
    criteria.push({
      label: `Annual family income within ₹${rules.maxIncome.toLocaleString('en-IN')}`,
      matched: ok,
    });
  }

  if (rules.educationLevels && rules.educationLevels !== 'any') {
    const ok = rules.educationLevels.includes(profile?.educationLevel);
    criteria.push({
      label: `Education level: ${rules.educationLevels.join(', ')}`,
      matched: ok,
    });
  }

  if (rules.states && rules.states !== 'any') {
    const ok = rules.states.includes(profile?.state);
    criteria.push({
      label: `Residing in: ${rules.states.join(', ')}`,
      matched: ok,
    });
  }

  if (criteria.length === 0 || !profile) {
    return { percent: 0, matchedCriteria: criteria, likelyEligible: false, reason: 'Complete your profile to see eligibility.' };
  }

  const matchedCount = criteria.filter((c) => c.matched).length;
  const percent = Math.round((matchedCount / criteria.length) * 100);
  const likelyEligible = percent >= 60;

  const matchedLabels = criteria.filter((c) => c.matched).map((c) => c.label);
  const reason = matchedLabels.length
    ? `Recommended because your ${matchedLabels.join(', ')} match the demo eligibility criteria.`
    : 'Few of your profile details match the demo eligibility criteria.';

  return { percent, matchedCriteria: criteria, likelyEligible, reason };
}

export function rankSchemes(schemes, profile) {
  return schemes
    .map((scheme) => ({ scheme, match: computeMatch(profile, scheme) }))
    .sort((a, b) => b.match.percent - a.match.percent);
}
