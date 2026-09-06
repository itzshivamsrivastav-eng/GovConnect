import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileText,
  ShieldCheck,
  Zap,
  Info,
  Copy,
  CalendarDays,
  Building2,
  ArrowRight,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { getProfile } from '../services/profileApi';
import { getServiceById } from '../services/serviceApi';
import { getSchemeById } from '../services/schemeApi';
import { addApplication } from '../services/applicationApi';

const EMPTY_FORM = {
  fullName: '',
  dob: '',
  mobile: '',
  email: '',
  fatherName: '',
  motherName: '',
  gender: '',
  occupation: '',
  address: '',
  state: '',
  district: '',
  city: '',
  pincode: '',
};

const FORM_FIELDS = [
  { key: 'fullName', labelKey: 'fullName', type: 'text' },
  { key: 'dob', labelKey: 'dateOfBirth', type: 'date' },
  { key: 'mobile', labelKey: 'mobileNumber', type: 'tel' },
  { key: 'email', labelKey: 'emailAddress', type: 'email' },
  { key: 'fatherName', labelKey: 'fatherName', type: 'text' },
  { key: 'motherName', labelKey: 'motherName', type: 'text' },
  { key: 'gender', labelKey: 'gender', type: 'text' },
  { key: 'occupation', labelKey: 'occupation', type: 'text' },
  { key: 'address', labelKey: 'address', type: 'text' },
  { key: 'state', labelKey: 'state', type: 'text' },
  { key: 'district', labelKey: 'district', type: 'text' },
  { key: 'city', labelKey: 'city', type: 'text' },
  { key: 'pincode', labelKey: 'pinCode', type: 'text' },
];

const CONSENT_FIELDS = [
  { key: 'fullName', labelKey: 'fullName' },
  { key: 'dob', labelKey: 'dateOfBirth' },
  { key: 'mobile', labelKey: 'mobileNumber' },
  { key: 'email', labelKey: 'emailAddress' },
  { key: 'fatherName', labelKey: 'fatherName' },
  { key: 'motherName', labelKey: 'motherName' },
  { key: 'gender', labelKey: 'gender' },
  { key: 'occupation', labelKey: 'occupation' },
  { key: 'address', labelKey: 'address' },
  { key: 'state', labelKey: 'state' },
  { key: 'district', labelKey: 'district' },
  { key: 'city', labelKey: 'city' },
  { key: 'pincode', labelKey: 'pinCode' },
];

export default function MockPortal() {
  const { serviceId, schemeId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const service = serviceId ? getServiceById(serviceId) : null;
  const scheme = schemeId ? getSchemeById(schemeId) : null;

  const item = scheme || service;
  const isScheme = !!scheme;

  const profile = getProfile();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [autofilledFields, setAutofilledFields] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  if (!item) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <FileText
            size={42}
            className="mx-auto mb-4 text-gray-400"
          />

          <h1 className="font-heading text-xl font-bold text-navy-900">
            {t('demoPortalNotFound')}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t('requestedServiceSchemeNotFound')}
          </p>

          <Link
            to="/services"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />
            {t('back')}
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  function handleChange(key, value) {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));

    setAutofilledFields((current) => ({
      ...current,
      [key]: false,
    }));
  }

  function handleOpenAutofill() {
    setShowConsentModal(true);
  }

  function handleAllowAndFill() {
    if (!profile) {
      setShowConsentModal(false);
      return;
    }

    const filledData = {};

    FORM_FIELDS.forEach(({ key }) => {
      filledData[key] = profile[key] || '';
    });

    setFormData((current) => ({
      ...current,
      ...filledData,
    }));

    const filledStatus = {};

    FORM_FIELDS.forEach(({ key }) => {
      filledStatus[key] = !!profile[key];
    });

    setAutofilledFields(filledStatus);
    setShowConsentModal(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const application = addApplication({
      name: item.name,
      type: isScheme ? 'SCHEME' : 'DIGITAL_SERVICE',
      serviceId: isScheme ? undefined : item.id,
      schemeId: isScheme ? item.id : undefined,
      department: item.department,
    });

    setSubmittedApplication(application);
    setSubmitted(true);
  }

  function handleOfficialWebsite() {
    if (item.officialUrl) {
      window.open(item.officialUrl, '_blank', 'noopener,noreferrer');
    }
  }

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl py-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-green-100 bg-green-50 px-6 py-8 text-center sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2
                  size={44}
                  strokeWidth={2}
                  className="text-green-600"
                />
              </div>

              <h1 className="mt-5 font-heading text-2xl font-bold text-navy-900 sm:text-3xl">
                {t('applicationSubmittedSuccessfully')}
              </h1>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
                {t('applicationRecordedSuccessfully')}
              </p>
            </div>

            <div className="px-6 py-6 sm:px-10">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                      {t('applicationId')}
                    </p>

                    <p className="mt-1 font-mono text-lg font-bold text-navy-900">
                      {submittedApplication?.id || t('generating')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard?.writeText(
                        submittedApplication?.id || ''
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    <Copy size={15} />
                    {t('copyId')}
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <FileText
                        size={19}
                        className="text-navy-700"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">
                        {t('application')}
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-navy-900">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Building2
                        size={19}
                        className="text-navy-700"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">
                        {t('department')}
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-navy-900">
                        {item.department || t('governmentDepartment')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <CalendarDays
                        size={19}
                        className="text-navy-700"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        {t('submittedOn')}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-navy-900">
                        {submittedApplication?.submittedDate ||
                          new Date().toISOString().slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <ShieldCheck
                        size={19}
                        className="text-navy-700"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        {t('currentStatus')}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />

                        <p className="text-sm font-semibold text-green-700">
                          {t('submitted')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-yellow-700"
                />

                <p className="text-xs leading-5 text-yellow-800">
                  {t('prototypeSubmissionNotice')}
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      submittedApplication
                        ? `/applications/${submittedApplication.id}`
                        : '/dashboard'
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-900"
                >
                  {t('trackApplication')}
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      isScheme
                        ? `/schemes/${item.id}`
                        : `/services/${item.id}`
                    )
                  }
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition hover:bg-gray-50"
                >
                  {t('backToDetails')}
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-gray-500 hover:text-navy-800 hover:underline"
                >
                  {t('submitAnotherApplication')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
        <ShieldCheck
          size={17}
          className="mt-0.5 shrink-0"
        />

        <p>
          {t('mockPortalNoticeBefore')}{' '}
          <strong>{t('mockGovernmentPortal')}</strong>{' '}
          {t('mockPortalNoticeAfter')}
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={() =>
            navigate(
              isScheme
                ? `/schemes/${item.id}`
                : `/services/${item.id}`
            )
          }
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:underline"
        >
          <ArrowLeft size={16} />
          {t('backToDetails')}
        </button>

        <h1 className="font-heading text-2xl font-bold text-navy-900">
          {item.name}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {t('applicationFormDemoGovernmentPortal')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="mb-6">
              <h2 className="font-heading text-xl font-bold text-navy-900">
                {t('applicantInformation')}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {t('enterRequiredInformation')}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {FORM_FIELDS.map((field) => (
                <div
                  key={field.key}
                  className={
                    field.key === 'address'
                      ? 'sm:col-span-2'
                      : ''
                  }
                >
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {t(field.labelKey)}
                  </label>

                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(event) =>
                      handleChange(
                        field.key,
                        event.target.value
                      )
                    }
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                      autofilledFields[field.key]
                        ? 'border-green-400 bg-green-50 focus:ring-2 focus:ring-green-200'
                        : 'border-gray-300 bg-white focus:border-navy-500 focus:ring-2 focus:ring-navy-100'
                    }`}
                  />

                  {autofilledFields[field.key] && (
                    <p className="mt-1 text-xs font-medium text-green-600">
                      ✓ {t('autoFilledFromProfile')}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-gray-200 pt-6">
              <button
                type="submit"
                className="w-full rounded-lg bg-navy-800 px-5 py-3 font-semibold text-white transition hover:bg-navy-900"
              >
                {t('submitApplication')}
              </button>

              <p className="mt-2 text-center text-xs text-gray-400">
                {t('demoSubmissionOnly')}
              </p>
            </div>
          </form>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <button
              type="button"
              onClick={handleOpenAutofill}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3.5 text-base font-semibold text-navy-900 shadow-sm transition hover:bg-orange-600"
            >
              <Zap size={19} />
              {t('fillWithGovConnect')}
            </button>

            <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-500">
              <Info
                size={15}
                className="mt-0.5 shrink-0"
              />

              <span>
                {t('govConnectAutofillDescription')}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Zap
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="font-heading font-semibold text-navy-900">
                  {t('govConnectAutofill')}
                </h3>

                <p className="text-xs text-gray-500">
                  {t('profileInformation')}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-green-50 px-4 py-3">
              <p className="text-sm text-green-700">
                {t('profileDataAvailable')}:{' '}
                <strong>
                  {profile ? t('yes') : t('no')}
                </strong>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-heading text-lg font-semibold text-navy-900">
              {t('applicationInformation')}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">
                  {t('type')}
                </p>

                <p className="mt-1 text-sm font-medium text-navy-900">
                  {isScheme
                    ? t('governmentScheme')
                    : t('digitalServices')}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  {t('department')}
                </p>

                <p className="mt-1 text-sm font-medium text-navy-900">
                  {item.department || t('governmentDepartment')}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  {t('portal')}
                </p>

                <p className="mt-1 text-sm font-medium text-navy-900">
                  {t('governmentPortal')}
                </p>
              </div>
            </div>
          </div>

          {item.officialUrl && (
            <button
              type="button"
              onClick={handleOfficialWebsite}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-navy-900 transition hover:bg-gray-50"
            >
              {t('openOfficialWebsite')}
              <ExternalLink size={18} />
            </button>
          )}

          <Link
            to={
              isScheme
                ? `/schemes/${item.id}`
                : `/services/${item.id}`
            }
            className="block text-center text-sm font-medium text-navy-700 hover:underline"
          >
            {t('backToDetails')}
          </Link>
        </div>
      </div>

      {showConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                <ShieldCheck
                  size={23}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="font-heading text-lg font-bold text-navy-900">
                  {t('useGovConnectAutofill')}
                </h2>

                <p className="text-xs text-gray-500">
                  {t('reviewBeforeFilling')}
                </p>
              </div>
            </div>

            <p className="mb-3 text-sm text-gray-600">
              {t('govConnectWillUseProfile')}
            </p>

            <div className="mb-5 max-h-52 overflow-y-auto rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {t('informationToBeUsed')}
              </p>

              <ul className="space-y-2">
                {CONSENT_FIELDS.map((field) => (
                  <li
                    key={field.key}
                    className="flex items-center gap-2 text-sm text-navy-800"
                  >
                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-green-600"
                    />

                    {t(field.labelKey)}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mb-5 text-xs text-gray-400">
              {t('consentAutofillSimulated')}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConsentModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                {t('cancel')}
              </button>

              <button
                type="button"
                onClick={handleAllowAndFill}
                className="flex-1 rounded-lg bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
              >
                {t('allowAndFill')}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}