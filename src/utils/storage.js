const PREFIX = 'govconnect_';

export const STORAGE_KEYS = {
  AUTH: `${PREFIX}auth`,
  PROFILE: `${PREFIX}profile`,
  APPLICATIONS: `${PREFIX}applications`,
  CONSENTS: `${PREFIX}consents`,
  GRIEVANCES: `${PREFIX}grievances`,
  DOCUMENTS: `${PREFIX}documents`,
  SEEDED: `${PREFIX}seeded`,
};

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);

    if (raw === null) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable — no-op for prototype
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // no-op
  }
}

/*
  Creates a unique storage key for every user.

  Example:
  govconnect_profile_9876543210
  govconnect_applications_9876543210
*/

export function getUserStorageKey(key, identifier = null) {
  let userIdentifier = identifier;

  if (!userIdentifier) {
    const auth = getItem(STORAGE_KEYS.AUTH, null);
    userIdentifier = auth?.identifier || auth?.mobile || auth?.email;
  }

  if (!userIdentifier) {
    return key;
  }

  const safeIdentifier = String(userIdentifier)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '_');

  return `${key}_${safeIdentifier}`;
}

export function getUserItem(key, identifier = null, fallback = null) {
  return getItem(
    getUserStorageKey(key, identifier),
    fallback
  );
}

export function setUserItem(key, value, identifier = null) {
  setItem(
    getUserStorageKey(key, identifier),
    value
  );
}

export function removeUserItem(key, identifier = null) {
  removeItem(
    getUserStorageKey(key, identifier)
  );
}