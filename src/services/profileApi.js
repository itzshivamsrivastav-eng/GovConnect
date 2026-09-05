import {
  getUserItem,
  setUserItem,
  STORAGE_KEYS,
} from '../utils/storage';

export function getProfile() {
  return getUserItem(STORAGE_KEYS.PROFILE, null, null);
}

export function setProfile(profile) {
  setUserItem(STORAGE_KEYS.PROFILE, profile);
  return profile;
}

export function updateProfile(partial) {
  const current = getProfile() || {};

  const updated = {
    ...current,
    ...partial,
  };

  setProfile(updated);

  return updated;
}

export function hasProfile() {
  const profile = getProfile();

  return !!(
    profile &&
    profile.fullName
  );
}