import schemes from '../data/schemes';
import { getProfile } from './profileApi';
import { computeMatch, rankSchemes } from '../utils/matchingEngine';

export function getSchemes() {
  return schemes;
}

export function getSchemeById(id) {
  return schemes.find((s) => s.id === id) || null;
}

export function getRankedSchemes() {
  const profile = getProfile();
  return rankSchemes(schemes, profile);
}

export function getMatchForScheme(id) {
  const scheme = getSchemeById(id);
  const profile = getProfile();
  if (!scheme) return null;
  return computeMatch(profile, scheme);
}

export function searchSchemes(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return schemes.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );
}
