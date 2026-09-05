import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';
import { getServiceById } from '../services/serviceApi';
import { getProfile } from '../services/profileApi';
import { addApplication } from '../services/applicationApi';
import { isLoggedIn } from '../services/authApi';
import { useToast } from '../components/ToastContext';

const PROFILE_LABELS = {
  fullName: 'Full Name',
  dob: 'Date of Birth',
  address: 'Address',
  mobile: 'Mobile Number',
  email: 'Email',
  annualIncome: 'Annual Income',
  state: 'State',
  district: 'District',
  educationLevel: 'Education Level',
  institutionName: 'Institution Name',
  course: 'Course',
  studentStatus: 'Student Status',
  occupation: 'Occupation',
  employmentType: 'Employment Type',
  incomeCategory: 'Income Category',
  category: 'Category',
  maritalStatus: 'Marital Status',
};

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = getServiceById(id);
  const profile = getProfile();

  const { showToast } = useToast();

  const [appId, setAppId] = useState('');
  const [appDate, setAppDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  if (!service) {
    return (
      <DashboardLayout>
        <p className="text-gray-600">
          Service not found.
        </p>
      </DashboardLayout>
    );
  }

  /*
   * Apply on Official Website
   *
   * Logged-out users are sent directly to Login.
   * Logged-in users are taken to the official portal.
   */
  function handleApplyOfficial() {
    if (!isLoggedIn()) {
      navigate('/login', {
        state: {
          from: `/services/${service.id}`,
        },
      });
      return;
    }

    window.open(
      service.officialUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

  /*
   * Fill with GovConnect
   *
   * Logged-out users go directly to Login.
   * Logged-in users can use the simulated
   * GovConnect application portal.
   */
  function handleFillWithGovConnect() {
    if (!isLoggedIn()) {
      navigate('/login', {
        state: {
          from: `/services/${service.id}`,
        },
      });
      return;
    }

    navigate(`/mock-portal/${service.id}`);
  }

  /*
   * Add an already-submitted application
   * for tracking inside GovConnect.
   */
  function handleAddTracking(e) {
    e.preventDefault();

    if (!isLoggedIn()) {
      navigate('/login', {
        state: {
          from: `/services/${service.id}`,
        },
      });
      return;
    }

    if (!appId.trim()) {
      showToast(
        'Please enter your application ID.'
      );
      return;
    }

    const app = addApplication({
      name: service.name,
      type: 'DIGITAL_SERVICE',
      serviceId: service.id,
      department: service.department,
      applicationId: appId.trim(),
      submittedDate: appDate,
    });

    showToast(
      'Application added for tracking.'
    );

    navigate(`/applications/${app.id}`);
  }

  return (
    <DashboardLayout>

      {/* Breadcrumb */}

      <p className="text-xs text-gray-400 mb-2">
        <Link
          to="/services"
          className="hover:underline"
        >
          Digital Services
        </Link>

        {' / '}

        {service.name}
      </p>

      {/* Header */}

      <div className="mb-6">

        <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
          {service.name}
        </h1>

        <p className="text-sm text-navy-600">
          {service.department}
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="lg:col-span-2 space-y-5">

          {/* Description */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <h3 className="font-heading font-semibold text-navy-900 mb-2">
              Description
            </h3>

            <p className="text-sm text-gray-600 leading-6">
              {service.description}
            </p>

          </div>

          {/* Requirements */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <h3 className="font-heading font-semibold text-navy-900 mb-3">
              Requirements
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">

              {service.requirements?.map(
                (requirement, index) => (
                  <li
                    key={`requirement-${index}`}
                  >
                    {requirement}
                  </li>
                )
              )}

            </ul>

          </div>

          {/* Required Documents */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <div className="flex items-center gap-2 mb-4">

              <div className="rounded-lg bg-navy-50 p-2">

                <FileText
                  size={18}
                  className="text-navy-700"
                />

              </div>

              <div>

                <h3 className="font-heading font-semibold text-navy-900">
                  Required Documents
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  Documents you may need while
                  applying for this service.
                </p>

              </div>

            </div>

            <div className="space-y-3">

              {service.documents?.map(
                (document) => (

                  <div
                    key={document.id}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >

                    <div className="flex items-start gap-3">

                      <FileText
                        size={17}
                        className="text-navy-600 mt-0.5 shrink-0"
                      />

                      <div className="min-w-0">

                        <p className="text-sm font-medium text-gray-800">

                          {document.name}

                          {document.required && (
                            <span className="text-red-500 ml-1">
                              *
                            </span>
                          )}

                        </p>

                        {document.description && (
                          <p className="text-xs text-gray-500 mt-1 leading-5">
                            {document.description}
                          </p>
                        )}

                        {!document.required && (
                          <span className="inline-flex mt-2 text-[11px] font-medium rounded-full border border-gray-200 bg-white text-gray-500 px-2 py-0.5">
                            Optional
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* Profile Information */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <h3 className="font-heading font-semibold text-navy-900 mb-3">
              Information Available From Your
              GovConnect Profile
            </h3>

            <ul className="space-y-2">

              {service.profileFieldsUsed?.map(
                (field) => {

                  const available =
                    profile &&
                    profile[field];

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
                        {PROFILE_LABELS[field] ||
                          field}
                      </span>

                      {available && (
                        <span className="text-xs text-gray-400">
                          — Available from your
                          GovConnect Profile
                        </span>
                      )}

                    </li>

                  );
                }
              )}

            </ul>

          </div>

          {/* Tracking */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <h3 className="font-heading font-semibold text-navy-900 mb-3">
              Add Application for Tracking
            </h3>

            <p className="text-xs text-gray-500 mb-4">
              Already applied on the official
              portal? Add your application ID here
              to track it through GovConnect.
            </p>

            <form
              onSubmit={handleAddTracking}
              className="grid sm:grid-cols-2 gap-4"
            >

              {/* Service */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>

                <input
                  disabled
                  value={service.name}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
                />

              </div>

              {/* Department */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>

                <input
                  disabled
                  value={service.department}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
                />

              </div>

              {/* Application ID */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application ID
                </label>

                <input
                  value={appId}
                  onChange={(e) =>
                    setAppId(e.target.value)
                  }
                  placeholder="e.g. PSP-2026-10234"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                />

              </div>

              {/* Application Date */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date
                </label>

                <input
                  type="date"
                  value={appDate}
                  onChange={(e) =>
                    setAppDate(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                />

              </div>

              <button
                type="submit"
                className="sm:col-span-2 rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-4 py-2.5 min-h-[44px]"
              >
                Add Application for Tracking
              </button>

            </form>

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="space-y-4">

          {/* Apply / GovConnect */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            {/* OFFICIAL APPLY */}

            <button
              type="button"
              onClick={handleApplyOfficial}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-saffron-500 hover:bg-saffron-600 transition-colors text-navy-900 font-semibold px-4 py-3 min-h-[44px]"
            >
              Apply on Official Website

              <ExternalLink size={16} />
            </button>

            <p className="text-xs text-gray-400 mt-3 leading-5">
              Application submission takes place
              on the official government portal.
              GovConnect helps you discover the
              service and track your application
              afterward.
            </p>

            {/* FILL WITH GOVCONNECT */}

            <button
              type="button"
              onClick={handleFillWithGovConnect}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-navy-200 bg-navy-50 text-sm font-semibold text-navy-700 hover:bg-navy-100 transition-colors px-4 py-2.5"
            >

              <Sparkles size={15} />

              Fill with GovConnect

            </button>

            <p className="text-xs text-gray-400 text-center mt-2">
              Auto-fill your saved information
              through the simulated GovConnect
              application flow.
            </p>

          </div>

          {/* Quick Info */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <h3 className="font-heading text-sm font-semibold text-navy-900 mb-3">
              GovConnect Assistance
            </h3>

            <div className="space-y-3">

              <div className="flex items-start gap-2">

                <CheckCircle2
                  size={16}
                  className="text-green-600 mt-0.5 shrink-0"
                />

                <p className="text-xs text-gray-600">
                  Reuse information saved in your
                  GovConnect profile.
                </p>

              </div>

              <div className="flex items-start gap-2">

                <CheckCircle2
                  size={16}
                  className="text-green-600 mt-0.5 shrink-0"
                />

                <p className="text-xs text-gray-600">
                  Attach documents during the
                  application process when required.
                </p>

              </div>

              <div className="flex items-start gap-2">

                <CheckCircle2
                  size={16}
                  className="text-green-600 mt-0.5 shrink-0"
                />

                <p className="text-xs text-gray-600">
                  Track your application after
                  submission.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}