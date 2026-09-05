import { useState } from 'react';

import {
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';

import {
  Info,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';
import ConsentModal from '../components/ConsentModal';
import ServiceDocuments from '../components/ServiceDocuments';

import { getServiceById } from '../services/serviceApi';
import { getProfile } from '../services/profileApi';
import {
  addApplication,
} from '../services/applicationApi';

import { useToast } from '../components/ToastContext';

const CONSENT_FIELDS = [
  'Full Name',
  'Date of Birth',
  'Mobile Number',
  'Email',
  'Address',
  'State / District',
];

const EMPTY_FORM = {
  fullName: '',
  dob: '',
  mobile: '',
  email: '',
  address: '',
  state: '',
  district: '',
  extra1: '',
  extra2: '',
};

export default function MockPortal() {
  const {
    serviceId,
  } = useParams();

  const navigate =
    useNavigate();

  const service =
    getServiceById(serviceId);

  const profile =
    getProfile();

  const {
    showToast,
  } = useToast();

  const [form, setForm] =
    useState(EMPTY_FORM);

  const [autofilled, setAutofilled] =
    useState({});

  const [
    selectedDocuments,
    setSelectedDocuments,
  ] = useState({});

  const [
    consentOpen,
    setConsentOpen,
  ] = useState(false);

  if (!service) {
    return (
      <DashboardLayout>

        <p className="text-gray-600">
          Service not found.
        </p>

      </DashboardLayout>
    );
  }

  function updateField(
    key,
    value
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setAutofilled(
      (current) => ({
        ...current,
        [key]: false,
      })
    );
  }

  function handleAllowFill() {
    if (!profile) {
      setConsentOpen(false);

      showToast(
        'No saved profile found to auto-fill from.',
        'error'
      );

      return;
    }

    const filled = {
      fullName:
        profile.fullName || '',

      dob:
        profile.dob || '',

      mobile:
        profile.mobile || '',

      email:
        profile.email || '',

      address:
        profile.address || '',

      state:
        profile.state || '',

      district:
        profile.district || '',
    };

    setForm(
      (current) => ({
        ...current,
        ...filled,
      })
    );

    setAutofilled({
      fullName:
        !!filled.fullName,

      dob:
        !!filled.dob,

      mobile:
        !!filled.mobile,

      email:
        !!filled.email,

      address:
        !!filled.address,

      state:
        !!filled.state,

      district:
        !!filled.district,
    });

    setConsentOpen(false);

    showToast(
      'Form auto-filled from your GovConnect profile.'
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const attachedDocuments =
      Object.values(
        selectedDocuments
      ).filter(Boolean);

    const application =
      addApplication({
        name: service.name,

        type: 'DIGITAL_SERVICE',

        serviceId:
          service.id,

        department:
          service.department,

        submittedDate:
          new Date()
            .toISOString()
            .slice(0, 10),

        attachedDocuments,
      });

    showToast(
      'Demo application submitted successfully.'
    );

    navigate(
      `/applications/${application.id}`
    );
  }

  const fields = [
    {
      key: 'fullName',
      label: 'Full Name',
      type: 'text',
    },

    {
      key: 'dob',
      label: 'Date of Birth',
      type: 'date',
    },

    {
      key: 'mobile',
      label: 'Mobile Number',
      type: 'text',
    },

    {
      key: 'email',
      label: 'Email',
      type: 'email',
    },

    {
      key: 'address',
      label: 'Address',
      type: 'text',
    },

    {
      key: 'state',
      label: 'State',
      type: 'text',
    },

    {
      key: 'district',
      label: 'District',
      type: 'text',
    },
  ];

  return (
    <DashboardLayout>

      {/* DEMO WARNING */}

      <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-2.5 flex items-center gap-2">

        <ShieldAlert size={16} />

        This is a mock government portal built
        for demonstration purposes only — not a
        real external site.

      </div>

      {/* TITLE */}

      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        {service.name}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Application Form — Demo
      </p>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 space-y-4"
        >

          <div>

            <h2 className="font-heading font-semibold text-navy-900">
              Applicant Information
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Enter your information or use GovConnect
              to auto-fill saved profile details.
            </p>

          </div>

          {fields.map(
            ({
              key,
              label,
              type,
            }) => (
              <div key={key}>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>

                <input
                  type={type}
                  value={form[key]}
                  onChange={(event) =>
                    updateField(
                      key,
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                />

                {autofilled[key] && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">

                    <CheckCircle2 size={13} />

                    Auto-filled from GovConnect

                  </p>
                )}

              </div>
            )
          )}

          {/* DOCUMENTS */}

          <div className="pt-3">

            <ServiceDocuments
              requiredDocuments={
                service.documents || []
              }
              selectedDocuments={
                selectedDocuments
              }
              onChange={
                setSelectedDocuments
              }
            />

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="w-full rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-4 py-2.5 min-h-[44px]"
          >
            Submit Application (Demo)
          </button>

        </form>

        {/* SIDEBAR */}

        <div className="space-y-4">

          {/* AUTOFILL */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <button
              type="button"
              onClick={() =>
                setConsentOpen(true)
              }
              className="w-full rounded-lg bg-saffron-500 hover:bg-saffron-600 transition-colors text-navy-900 font-semibold px-4 py-3 min-h-[44px]"
            >
              ✨ Fill with GovConnect
            </button>

            <p className="text-xs text-gray-500 mt-3 flex items-start gap-1.5">

              <Info
                size={14}
                className="mt-0.5 shrink-0"
              />

              Use information already saved in
              your GovConnect profile to reduce
              repetitive form filling.

            </p>

          </div>

          {/* SERVICE */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <h3 className="font-heading text-sm font-semibold text-navy-900 mb-2">
              {service.name}
            </h3>

            <p className="text-xs text-gray-500">
              {service.description}
            </p>

          </div>

          <Link
            to={`/services/${service.id}`}
            className="block text-center text-sm text-navy-700 hover:underline"
          >
            Back to Service Details
          </Link>

        </div>

      </div>

      {/* CONSENT */}

      <ConsentModal
        open={consentOpen}
        title="Use GovConnect Auto-Fill?"
        fields={CONSENT_FIELDS}
        onCancel={() =>
          setConsentOpen(false)
        }
        onAllow={
          handleAllowFill
        }
      />

    </DashboardLayout>
  );
}