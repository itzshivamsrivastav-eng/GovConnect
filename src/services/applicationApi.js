import {
  getUserItem,
  setUserItem,
  STORAGE_KEYS,
} from '../utils/storage';

export function getApplications() {
  return getUserItem(
    STORAGE_KEYS.APPLICATIONS,
    null,
    []
  );
}

export function seedApplicationsIfEmpty(
  seed
) {
  const existing =
    getApplications();

  if (
    !existing ||
    existing.length === 0
  ) {
    setUserItem(
      STORAGE_KEYS.APPLICATIONS,
      seed
    );
  }
}

export function getApplicationById(
  id
) {
  return getApplications().find(
    (application) =>
      application.id === id
  ) || null;
}

function generateApplicationId(
  prefix
) {
  const year =
    new Date().getFullYear();

  const random = Math.floor(
    10000 +
      Math.random() * 89999
  );

  return `${prefix}-${year}-${random}`;
}

export function addApplication({
  name,
  type,
  serviceId,
  schemeId,
  department,
  applicationId,
  submittedDate,
  attachedDocuments = [],
}) {
  const applications =
    getApplications();

  const id =
    applicationId &&
    applicationId.trim()
      ? applicationId.trim()
      : generateApplicationId(
          type === 'SCHEME'
            ? 'SCH'
            : 'APP'
        );

  const date =
    submittedDate ||
    new Date()
      .toISOString()
      .slice(0, 10);

  const newApplication = {
    id,

    name,

    type,

    serviceId,

    schemeId,

    department,

    status: 'Submitted',

    submittedDate: date,

    lastUpdated: date,

    attachedDocuments,

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

  const updated = [
    newApplication,
    ...applications,
  ];

  setUserItem(
    STORAGE_KEYS.APPLICATIONS,
    updated
  );

  return newApplication;
}

export function updateApplicationStatus(
  id,
  status
) {
  const applications =
    getApplications();

  const updated =
    applications.map(
      (application) =>
        application.id === id
          ? {
              ...application,
              status,
              lastUpdated:
                new Date()
                  .toISOString()
                  .slice(0, 10),
            }
          : application
    );

  setUserItem(
    STORAGE_KEYS.APPLICATIONS,
    updated
  );

  return updated.find(
    (application) =>
      application.id === id
  );
}