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
  { key: 'fullName', label: 'Full Name', type: 'text' },
  { key: 'dob', label: 'Date of Birth', type: 'date' },
  { key: 'mobile', label: 'Mobile Number', type: 'tel' },
  { key: 'email', label: 'Email Address', type: 'email' },
  { key: 'fatherName', label: "Father's Name", type: 'text' },
  { key: 'motherName', label: "Mother's Name", type: 'text' },
  { key: 'gender', label: 'Gender', type: 'text' },
  { key: 'occupation', label: 'Occupation', type: 'text' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'state', label: 'State', type: 'text' },
  { key: 'district', label: 'District', type: 'text' },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'pincode', label: 'Pincode', type: 'text' },
];

const CONSENT_FIELDS = [
  'Full Name',
  'Date of Birth',
  'Mobile Number',
  'Email Address',
  'Father’s Name',
  'Mother’s Name',
  'Gender',
  'Occupation',
  'Address',
  'State',
  'District',
  'City',
  'Pincode',
];

export default function MockPortal() {
  const { serviceId, schemeId } = useParams();
  const navigate = useNavigate();

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
            Demo Portal Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The requested service or scheme could not be found.
          </p>

          <Link
            to="/services"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />
            Back
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

    navigate(`/applications/${application.id}`);
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
          {/* Success Header */}
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
                Application Submitted Successfully!
              </h1>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
                Your application has been successfully recorded on
                GovConnect. You can now track its status from your
                dashboard.
              </p>
            </div>

            {/* Application ID */}
            <div className="px-6 py-6 sm:px-10">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                      Application ID
                    </p>

                    <p className="mt-1 font-mono text-lg font-bold text-navy-900">
                      {submittedApplication?.id || 'Generating...'}
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
                    Copy ID
                  </button>
                </div>
              </div>

              {/* Application Details */}
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
                        Application
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
                        Department
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-navy-900">
                        {item.department || 'Government Department'}
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
                        Submitted On
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
                        Current Status
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />

                        <p className="text-sm font-semibold text-green-700">
                          Submitted
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prototype Notice */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-yellow-700"
                />

                <p className="text-xs leading-5 text-yellow-800">
                  This is a prototype submission. No real government
                  application has been sent. The application is saved
                  locally in GovConnect for demonstration and tracking.
                </p>
              </div>

              {/* Actions */}
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
                  Track Application
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
                  Back to Details
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-gray-500 hover:text-navy-800 hover:underline"
                >
                  Submit another application
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
      {/* Demo warning */}
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
        <ShieldCheck
          size={17}
          className="mt-0.5 shrink-0"
        />

        <p>
          This is a <strong>mock government portal</strong> built for
          demonstration purposes only. It is not a real government website.
        </p>
      </div>

      {/* Header */}
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
          Back to Details
        </button>

        <h1 className="font-heading text-2xl font-bold text-navy-900">
          {item.name}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Application Form — Demo Government Portal
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ================= FORM ================= */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="mb-6">
              <h2 className="font-heading text-xl font-bold text-navy-900">
                Applicant Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the required information below.
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
                    {field.label}
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
                      ✓ Auto-filled from GovConnect profile
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-7 border-t border-gray-200 pt-6">
              <button
                type="submit"
                className="w-full rounded-lg bg-navy-800 px-5 py-3 font-semibold text-white transition hover:bg-navy-900"
              >
                Submit Application
              </button>

              <p className="mt-2 text-center text-xs text-gray-400">
                Demo submission only — no real application will be sent.
              </p>
            </div>
          </form>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="space-y-5">
          {/* Autofill */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <button
              type="button"
              onClick={handleOpenAutofill}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3.5 text-base font-semibold text-navy-900 shadow-sm transition hover:bg-orange-600"
            >
              <Zap size={19} />
              Fill with GovConnect
            </button>

            <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-500">
              <Info
                size={15}
                className="mt-0.5 shrink-0"
              />

              <span>
                Use information already saved in your GovConnect
                profile to reduce repetitive form filling.
              </span>
            </p>
          </div>

          {/* Profile status */}
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
                  GovConnect Autofill
                </h3>

                <p className="text-xs text-gray-500">
                  Profile information
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-green-50 px-4 py-3">
              <p className="text-sm text-green-700">
                Profile data available:{' '}
                <strong>
                  {profile ? 'Yes' : 'No'}
                </strong>
              </p>
            </div>
          </div>

          {/* Application Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-heading text-lg font-semibold text-navy-900">
              Application Information
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">
                  Type
                </p>

                <p className="mt-1 text-sm font-medium text-navy-900">
                  {isScheme
                    ? 'Government Scheme'
                    : 'Digital Service'}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Department
                </p>

                <p className="mt-1 text-sm font-medium text-navy-900">
                  {item.department || 'Government Department'}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Portal
                </p>

                <p className="mt-1 text-sm font-medium text-navy-900">
                  Government Portal
                </p>
              </div>
            </div>
          </div>

          {/* Official Website */}
          {item.officialUrl && (
            <button
              type="button"
              onClick={handleOfficialWebsite}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-navy-900 transition hover:bg-gray-50"
            >
              Open Official Website
              <ExternalLink size={18} />
            </button>
          )}

          {/* Back */}
          <Link
            to={
              isScheme
                ? `/schemes/${item.id}`
                : `/services/${item.id}`
            }
            className="block text-center text-sm font-medium text-navy-700 hover:underline"
          >
            Back to Details
          </Link>
        </div>
      </div>

      {/* ================= CONSENT MODAL ================= */}
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
                  Use GovConnect Auto-Fill?
                </h2>

                <p className="text-xs text-gray-500">
                  Review before filling the form
                </p>
              </div>
            </div>

            <p className="mb-3 text-sm text-gray-600">
              GovConnect will use the information already saved
              in your profile to fill this application form.
            </p>

            <div className="mb-5 max-h-52 overflow-y-auto rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Information to be used
              </p>

              <ul className="space-y-2">
                {CONSENT_FIELDS.map((field) => (
                  <li
                    key={field}
                    className="flex items-center gap-2 text-sm text-navy-800"
                  >
                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-green-600"
                    />

                    {field}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mb-5 text-xs text-gray-400">
              This consent and autofill process is simulated
              for the GovConnect prototype.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConsentModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAllowAndFill}
                className="flex-1 rounded-lg bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
              >
                Allow & Fill
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}