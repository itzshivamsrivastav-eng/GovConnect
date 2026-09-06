import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';

export function seedApplicationsIfEmpty(seed) {
  const existing = getItem(STORAGE_KEYS.APPLICATIONS, null);

  if (!existing || existing.length === 0) {
    setItem(STORAGE_KEYS.APPLICATIONS, seed);
  }
}

export function getApplications() {
  return getItem(STORAGE_KEYS.APPLICATIONS, []);
}

export function getApplicationById(id) {
  return getApplications().find((a) => a.id === id) || null;
}

function genId(prefix) {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 89999);

  return `${prefix}-${year}-${rand}`;
}

export function addApplication({
  name,
  type,
  serviceId,
  schemeId,
  department,
  applicationId,
  submittedDate,
}) {
  const applications = getApplications();

  const id =
    applicationId && applicationId.trim()
      ? applicationId.trim()
      : genId(type === 'SCHEME' ? 'SCH' : 'APP');

  const date =
    submittedDate || new Date().toISOString().slice(0, 10);

  const newApp = {
    id,
    name,
    type,
    serviceId,
    schemeId,
    department,
    status: 'Submitted',
    submittedDate: date,
    lastUpdated: date,

    timeline: [
      {
        step: 'Application Submitted',
        done: true,
        date,
      },
      {
        step: 'Documents Received',
        done: false,
        current: true,
      },
      {
        step: 'Verification',
        done: false,
      },
      {
        step: 'Department Processing',
        done: false,
      },
      {
        step: 'Final Decision',
        done: false,
      },
    ],
  };

  // Save application
  const updated = [newApp, ...applications];

  setItem(STORAGE_KEYS.APPLICATIONS, updated);

  return newApp;
}

export function updateApplicationStatus(id, status) {
  const applications = getApplications();

  const date = new Date().toISOString().slice(0, 10);

  const updated = applications.map((a) =>
    a.id === id
      ? {
          ...a,
          status,
          lastUpdated: date,
        }
      : a
  );

  setItem(STORAGE_KEYS.APPLICATIONS, updated);

  return updated.find((a) => a.id === id) || null;
}