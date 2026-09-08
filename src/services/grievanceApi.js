import {
  getUserItem,
  setUserItem,
  STORAGE_KEYS,
} from '../utils/storage';

const SEED = [
  {
    id: 'GRV-2026-1001',
    category: 'Application Delay',
    description:
      'Passport application verification is taking longer than expected.',
    status: 'In Progress',
    date: '2026-08-18',
  },
];

export function getGrievances() {
  const existing = getUserItem(
    STORAGE_KEYS.GRIEVANCES,
    null,
    null
  );

  if (!existing) {
    setUserItem(
      STORAGE_KEYS.GRIEVANCES,
      SEED
    );

    return SEED;
  }

  return existing;
}

export function addGrievance({
  name,
  category,
  description,
}) {
  if (!name?.trim() || !description?.trim()) {
    return null;
  }

  const list = getGrievances();

  const grievance = {
    id: `GRV-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 8999
    )}`,
    name: name.trim(),
    category,
    description: description.trim(),
    status: 'Submitted',
    date: new Date().toISOString().slice(0, 10),
  };

  const updated = [grievance, ...list];

  setUserItem(
    STORAGE_KEYS.GRIEVANCES,
    updated
  );

  return grievance;
}