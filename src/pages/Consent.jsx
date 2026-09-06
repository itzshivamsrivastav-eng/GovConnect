import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import EmptyState from '../components/EmptyState';
import {
  getConsents,
  grantConsent,
  declineConsent,
  revokeConsent,
} from '../services/consentApi';
import { useToast } from '../components/ToastContext';
import { useLanguage } from '../context/LanguageContext';

function Chip({ children }) {
  return (
    <span className="text-xs bg-navy-50 text-navy-700 border border-navy-100 rounded-full px-2.5 py-0.5">
      {children}
    </span>
  );
}

export default function Consent() {
  const { t } = useLanguage();

  const [state, setState] = useState(getConsents());
  const [confirmRevoke, setConfirmRevoke] = useState(null);
  const { showToast } = useToast();

  function handleGrant(id) {
    setState(grantConsent(id));
    showToast(t('consentGranted'));
  }

  function handleDecline(id) {
    setState(declineConsent(id));
    showToast(t('consentRequestDeclined'), 'info');
  }

  function handleRevoke(id) {
    setState(revokeConsent(id));
    setConfirmRevoke(null);
    showToast(t('consentRevoked'), 'info');
  }

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        {t('consentCenter')}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {t('consentDescription')}
      </p>

      <section className="mb-8">
        <h2 className="font-heading text-lg font-semibold text-navy-900 mb-3">
          {t('pendingConsentRequests')}
        </h2>

        {state.pending.length === 0 ? (
          <EmptyState
            title={t('noPendingRequests')}
            description={t('noPendingConsentRequests')}
          />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {state.pending.map((req) => (
              <div
                key={req.id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h4 className="font-heading font-semibold text-navy-900 mb-1">
                  {req.requester}
                </h4>

                <p className="text-xs text-gray-500 mb-3">
                  {req.reason} · {t('duration')}: {req.duration}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {req.dataFields.map((f) => (
                    <Chip key={f}>{f}</Chip>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleGrant(req.id)}
                    className="flex-1 rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white text-sm font-medium px-3 py-2 min-h-[40px]"
                  >
                    {t('grantConsent')}
                  </button>

                  <button
                    onClick={() => handleDecline(req.id)}
                    className="flex-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium px-3 py-2 min-h-[40px]"
                  >
                    {t('decline')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-lg font-semibold text-navy-900 mb-3">
          {t('activeConsents')}
        </h2>

        {state.active.length === 0 ? (
          <EmptyState
            title={t('noActiveConsents')}
            description={t('noActiveConsentDescription')}
          />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {state.active.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h4 className="font-heading font-semibold text-navy-900 mb-1">
                  {c.requester}
                </h4>

                <p className="text-xs text-gray-500 mb-3">
                  {t('grantedOn')} {c.grantedOn} · {t('duration')}:{' '}
                  {c.duration}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {c.dataFields.map((f) => (
                    <Chip key={f}>{f}</Chip>
                  ))}
                </div>

                {confirmRevoke === c.id ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-500">
                      {t('revokeThisConsent')}
                    </span>

                    <button
                      onClick={() => handleRevoke(c.id)}
                      className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg px-3 py-1.5"
                    >
                      {t('yesRevoke')}
                    </button>

                    <button
                      onClick={() => setConfirmRevoke(null)}
                      className="text-xs font-medium text-gray-600 hover:underline"
                    >
                      {t('cancel')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmRevoke(c.id)}
                    className="rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium px-3 py-2 min-h-[40px]"
                  >
                    {t('revoke')}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-heading text-lg font-semibold text-navy-900 mb-3">
          {t('consentHistory')}
        </h2>

        {state.history.length === 0 ? (
          <EmptyState
            title={t('noHistoryYet')}
            description={t('noHistoryDescription')}
          />
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
            {state.history.map((h, idx) => (
              <div
                key={idx}
                className="p-4 flex items-center justify-between flex-wrap gap-2"
              >
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    {h.requester}
                  </p>

                  <p className="text-xs text-gray-400">
                    {h.date}
                  </p>
                </div>

                <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
                  {h.action}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}