import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';
import {
  getSchemeById,
  getMatchForScheme,
} from '../services/schemeApi';
import { getProfile } from '../services/profileApi';
import { addApplication } from '../services/applicationApi';
import { useToast } from '../components/ToastContext';
import { useLanguage } from '../context/LanguageContext';

const PROFILE_LABEL_KEYS = {
  fullName: 'fullName',
  dob: 'dateOfBirth',
  address: 'address',
  mobile: 'mobileNumber',
  email: 'email',
  annualIncome: 'annualFamilyIncome',
  state: 'state',
  district: 'district',
  city: 'city',
  pincode: 'pinCode',
  educationLevel: 'educationLevel',
  studentStatus: 'studentStatus',
  occupation: 'occupation',
  gender: 'gender',
};

export default function SchemeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const scheme = getSchemeById(id);
  const profile = getProfile();
  const { showToast } = useToast();

  const [appId, setAppId] = useState('');
  const [appDate, setAppDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  if (!scheme) {
    return (
      <DashboardLayout>
        <p className="text-gray-600">
          {t('schemeNotFound')}
        </p>
      </DashboardLayout>
    );
  }

  const match = getMatchForScheme(id);

  function handleApplyOfficial() {
    if (!scheme.officialUrl) {
      showToast(t('officialWebsiteLinkUnavailable'));
      return;
    }

    window.open(
      scheme.officialUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

  function handleFillWithGovConnect() {
    navigate(`/mock-portal/scheme/${scheme.id}`);
  }

  function handleAddTracking(event) {
    event.preventDefault();

    if (!appId.trim()) {
      showToast(t('enterApplicationId'));
      return;
    }

    const application = addApplication({
      name: scheme.name,
      type: 'SCHEME',
      schemeId: scheme.id,
      department: scheme.department,
      applicationId: appId.trim(),
      submittedDate: appDate,
    });

    showToast(t('schemeApplicationAddedForTracking'));

    navigate(`/applications/${application.id}`);
  }

  return (
    <DashboardLayout>
      {/* Breadcrumb */}
      <div className="mb-5">
        <p className="text-xs text-gray-400">
          <Link
            to="/schemes"
            className="hover:text-navy-700 hover:underline"
          >
            {t('governmentSchemes')}
          </Link>

          {' / '}

          {scheme.name}
        </p>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-heading text-2xl font-bold text-navy-900">
            {scheme.name}
          </h1>

          {scheme.isDemoScheme && (
            <span className="text-xs font-medium text-saffron-700 bg-saffron-50 border border-saffron-200 rounded-full px-2.5 py-0.5">
              {t('demoScheme')}
            </span>
          )}
        </div>

        <p className="text-sm text-navy-600 mt-1">
          {scheme.category} · {scheme.department}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-5">

          {/* Description */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-heading font-semibold text-navy-900 mb-3">
              {t('description')}
            </h2>

            <p className="text-sm text-gray-600 leading-6">
              {scheme.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-heading font-semibold text-navy-900 mb-3">
              {t('benefits')}
            </h2>

            <p className="text-sm text-gray-600 leading-6">
              {scheme.benefits}
            </p>
          </div>

          {/* Eligibility */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <h2 className="font-heading font-semibold text-navy-900">
                {t('eligibilityCriteria')}
              </h2>

              <span
                className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                  match.likelyEligible
                    ? 'text-green-700 bg-green-50 border border-green-200'
                    : 'text-yellow-700 bg-yellow-50 border border-yellow-200'
                }`}
              >
                {match.percent}% {t('match')}
              </span>
            </div>

            <ul className="space-y-3">
              {match.matchedCriteria.map((criterion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  {criterion.matched ? (
                    <CheckCircle2
                      size={17}
                      className="text-green-600 mt-0.5 shrink-0"
                    />
                  ) : (
                    <XCircle
                      size={17}
                      className="text-red-400 mt-0.5 shrink-0"
                    />
                  )}

                  <span
                    className={
                      criterion.matched
                        ? 'text-navy-800'
                        : 'text-gray-500'
                    }
                  >
                    {criterion.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-100 p-3">
              <p className="text-xs text-gray-500 leading-5">
                <strong className="text-navy-700">
                  {t('govConnectEligibilityEstimate')}
                </strong>{' '}
                {match.reason}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-heading font-semibold text-navy-900 mb-3">
              {t('requirements')}
            </h2>

            {scheme.requirements?.length ? (
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                {scheme.requirements.map((requirement) => (
                  <li key={requirement}>
                    {requirement}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                {t('checkOfficialPortalRequirements')}
              </p>
            )}
          </div>

          {/* Required Documents */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-heading font-semibold text-navy-900 mb-3">
              {t('requiredDocuments')}
            </h2>

            {scheme.documents?.length ? (
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                {scheme.documents.map((document) => (
                  <li key={document}>
                    {document}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                {t('checkOfficialPortalDocuments')}
              </p>
            )}
          </div>

          {/* Profile Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-heading font-semibold text-navy-900 mb-3">
              {t('informationAvailableFromProfile')}
            </h2>

            {scheme.profileFieldsUsed?.length ? (
              <ul className="space-y-2.5">
                {scheme.profileFieldsUsed.map((field) => {
                  const available =
                    profile &&
                    profile[field] !== undefined &&
                    profile[field] !== null &&
                    String(profile[field]).trim() !== '';

                  return (
                    <li
                      key={field}
                      className="flex items-center gap-2 text-sm"
                    >
                      {available ? (
                        <CheckCircle2
                          size={16}
                          className="text-green-600 shrink-0"
                        />
                      ) : (
                        <XCircle
                          size={16}
                          className="text-gray-300 shrink-0"
                        />
                      )}

                      <span
                        className={
                          available
                            ? 'text-navy-800'
                            : 'text-gray-400'
                        }
                      >
                        {t(
                          PROFILE_LABEL_KEYS[field] || field
                        )}
                      </span>

                      {available && (
                        <span className="text-xs text-gray-400">
                          — {t('availableFromProfile')}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                {t('noProfileInformationConfigured')}
              </p>
            )}
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
            <p className="text-xs text-blue-800 leading-5">
              <strong>{t('important')}:</strong>{' '}
              {t('eligibilityDisclaimer')}
            </p>
          </div>

          {/* Tracking */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-heading font-semibold text-navy-900 mb-1">
              {t('addApplicationForTracking')}
            </h2>

            <p className="text-xs text-gray-500 mb-4 leading-5">
              {t('schemeTrackingDescription')}
            </p>

            <form
              onSubmit={handleAddTracking}
              className="grid sm:grid-cols-2 gap-4"
            >
              {/* Scheme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('scheme')}
                </label>

                <input
                  disabled
                  value={scheme.name}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('department')}
                </label>

                <input
                  disabled
                  value={scheme.department}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
                />
              </div>

              {/* Application ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('applicationIdLabel')}
                </label>

                <input
                  value={appId}
                  onChange={(event) =>
                    setAppId(event.target.value)
                  }
                  placeholder="e.g. SCH-2026-10234"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                />
              </div>

              {/* Application Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('applicationDate')}
                </label>

                <input
                  type="date"
                  value={appDate}
                  onChange={(event) =>
                    setAppDate(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                />
              </div>

              <button
                type="submit"
                className="sm:col-span-2 rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-4 py-2.5 min-h-[44px]"
              >
                {t('addApplicationForTracking')}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">

          {/* Main Apply Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 h-fit">

            {/* Match */}
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-saffron-50 p-2.5">
                <Award
                  size={19}
                  className="text-saffron-700"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  {t('govConnectMatch')}
                </p>

                <p className="font-heading text-2xl font-bold text-navy-900">
                  {match.percent}%
                </p>
              </div>
            </div>

            {/* Eligibility Status */}
            {match.likelyEligible ? (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-green-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-green-800">
                      {t('likelyEligible')}
                    </p>

                    <p className="mt-0.5 text-xs text-green-700">
                      {t('profileMatchesCriteria')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-2">
                  <XCircle
                    size={19}
                    className="shrink-0 text-red-500"
                  />

                  <div>
                    <p className="text-sm font-bold text-red-700">
                      {t('eligibilityNeedsReview')}
                    </p>

                    <p className="mt-0.5 text-xs text-red-600">
                      {t('someCriteriaMayNotMatch')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reason */}
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1.5">
                {t('eligibilitySummary')}
              </p>

              <p className="text-xs text-gray-500 leading-5">
                {match.reason}
              </p>
            </div>

            {/* Official Website Button */}
            <button
              onClick={handleApplyOfficial}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-saffron-500 hover:bg-saffron-600 transition-colors text-navy-900 font-semibold px-4 py-3 min-h-[46px]"
            >
              {t('applyOnOfficialWebsite')}

              <ExternalLink size={16} />
            </button>

            {/* Fill With GovConnect */}
            <button
              onClick={handleFillWithGovConnect}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-navy-800 bg-white hover:bg-navy-50 transition-colors text-navy-800 font-semibold px-4 py-3 min-h-[46px]"
            >
              <Zap size={17} />

              {t('fillWithGovConnect')}
            </button>

            <p className="text-xs text-gray-400 mt-3 leading-5">
              {t('schemeAutofillDescription')}
            </p>
          </div>

          {/* Quick Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-heading font-semibold text-navy-900 mb-4">
              {t('schemeInformation')}
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">
                  {t('category')}
                </p>

                <p className="text-sm font-medium text-navy-800">
                  {scheme.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">
                  {t('department')}
                </p>

                <p className="text-sm font-medium text-navy-800">
                  {scheme.department}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">
                  {t('application')}
                </p>

                <p className="text-sm font-medium text-navy-800">
                  {t('officialGovernmentPortal')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}