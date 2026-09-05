import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';

const DEFAULT_REQUESTS = [
  {
    id: 'creq-1',
    requester: 'Department of School Education (Demo)',
    dataFields: ['Name', 'Address', 'Income'],
    reason: 'Processing your Student Education Support Scheme application',
    duration: '90 days',
  },
  {
    id: 'creq-2',
    requester: 'State e-District Portal',
    dataFields: ['Name', 'Address', 'Documents'],
    reason: 'Verifying details for Income Certificate application',
    duration: '30 days',
  },
];

function getState() {
  return getItem(STORAGE_KEYS.CONSENTS, null) || { pending: DEFAULT_REQUESTS, active: [], history: [] };
}

function saveState(state) {
  setItem(STORAGE_KEYS.CONSENTS, state);
  return state;
}

export function getConsents() {
  return getState();
}

export function grantConsent(id) {
  const state = getState();
  const request = state.pending.find((r) => r.id === id);
  if (!request) return state;
  const active = [...state.active, { ...request, grantedOn: new Date().toISOString().slice(0, 10) }];
  const pending = state.pending.filter((r) => r.id !== id);
  return saveState({ ...state, pending, active });
}

export function declineConsent(id) {
  const state = getState();
  const request = state.pending.find((r) => r.id === id);
  if (!request) return state;
  const history = [...state.history, { ...request, action: 'Declined', date: new Date().toISOString().slice(0, 10) }];
  const pending = state.pending.filter((r) => r.id !== id);
  return saveState({ ...state, pending, history });
}

export function revokeConsent(id) {
  const state = getState();
  const request = state.active.find((r) => r.id === id);
  if (!request) return state;
  const history = [...state.history, { ...request, action: 'Revoked', date: new Date().toISOString().slice(0, 10) }];
  const active = state.active.filter((r) => r.id !== id);
  return saveState({ ...state, active, history });
}
