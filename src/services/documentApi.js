import {
  getUserItem,
  setUserItem,
  STORAGE_KEYS,
} from '../utils/storage';

export function getDocuments() {
  return getUserItem(
    STORAGE_KEYS.DOCUMENTS,
    null,
    []
  );
}

export function addDocument({
  name,
  fileName,
  fileType,
  fileSize,
  dataUrl,
}) {
  const documents = getDocuments();

  const document = {
    id: `doc-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    name: name || fileName || 'Uploaded Document',
    fileName: fileName || name || 'document',
    fileType: fileType || 'application/octet-stream',
    fileSize: fileSize || 0,
    dataUrl: dataUrl || '',
    status: 'Available',
    reusable: true,
    uploadedAt: new Date().toISOString(),
  };

  const updated = [
    document,
    ...documents,
  ];

  setUserItem(
    STORAGE_KEYS.DOCUMENTS,
    updated
  );

  return document;
}

export function removeDocument(id) {
  const documents = getDocuments();

  const updated = documents.filter(
    (doc) => doc.id !== id
  );

  setUserItem(
    STORAGE_KEYS.DOCUMENTS,
    updated
  );

  return updated;
}

export function getDocumentById(id) {
  return getDocuments().find(
    (doc) => doc.id === id
  ) || null;
}

export function seedDocumentsIfEmpty(seed) {
  const existing = getDocuments();

  if (!existing || existing.length === 0) {
    setUserItem(
      STORAGE_KEYS.DOCUMENTS,
      seed
    );

    return seed;
  }

  return existing;
}