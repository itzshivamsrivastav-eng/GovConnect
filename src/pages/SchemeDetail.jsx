import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Upload,
  FileText,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';
import Digilocker from '../components/Digilocker';

import {
  getSchemeById,
  getMatchForScheme,
} from '../services/schemeApi';

import { getProfile } from '../services/profileApi';
import { addApplication } from '../services/applicationApi';
import { isLoggedIn } from '../services/authApi';
import { useToast } from '../components/ToastContext';

const STEPS = [
  'Check Eligibility',
  'Review Information',
  'Documents',
  'Consent',
  'Submit',
];

const PROFILE_REVIEW_FIELDS = [
  'fullName',
  'dob',
  'address',
  'state',
  'annualIncome',
  'educationLevel',
];

const FIELD_LABELS = {
  fullName: 'Full Name',
  dob: 'Date of Birth',
  address: 'Address',
  state: 'State',
  annualIncome: 'Annual Family Income',
  educationLevel: 'Education Level',
};

export default function SchemeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const scheme = getSchemeById(id);
  const profile = getProfile();
  const { showToast } = useToast();

  const [applying, setApplying] = useState(false);
  const [step, setStep] = useState(0);

  // Documents exist only for the current application.
  const [selectedDocs, setSelectedDocs] = useState([]);

  const [consented, setConsented] = useState(false);

  // Temporary uploaded documents for this application flow.
  const [uploadedDocs, setUploadedDocs] = useState([]);

  if (!scheme) {
    return (
      <DashboardLayout>
        <p className="text-gray-600">
          Scheme not found.
        </p>
      </DashboardLayout>
    );
  }

  const match = getMatchForScheme(id);

  /*
   * APPLY BUTTON
   *
   * Anyone can browse schemes and view scheme details.
   * Login is required only when the citizen clicks Apply.
   */
  function handleApply() {
    // LOGGED OUT → GO DIRECTLY TO LOGIN
    if (!isLoggedIn()) {
      navigate('/login', {
        state: {
          from: `/schemes/${scheme.id}`,
        },
      });
      return;
    }

    // LOGGED IN → START APPLICATION
    setApplying(true);
  }

  /*
   * Handle DigiLocker document selection.
   *
   * This is a simulated DigiLocker integration
   * for the SIH prototype.
   */
  function handleDigiLockerSelect(document) {
    if (!selectedDocs.includes(document.id)) {
      setSelectedDocs((current) => [
        ...current,
        document.id,
      ]);
    }

    showToast(
      `${document.name} fetched from DigiLocker.`
    );
  }

  /*
   * Temporary application upload.
   *
   * Nothing is added to a permanent document vault.
   */
  function handleUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      alert(
        'Please choose a file smaller than 2 MB.'
      );

      event.target.value = '';
      return;
    }

    const temporaryId = `upload-${Date.now()}`;

    const temporaryDocument = {
      id: temporaryId,
      name: file.name,
      type: 'Uploaded for this application',
    };

    setUploadedDocs((current) => [
      ...current,
      temporaryDocument,
    ]);

    setSelectedDocs((current) => [
      ...current,
      temporaryId,
    ]);

    event.target.value = '';

    showToast(
      'Document attached to this application.'
    );
  }

  function removeDocument(documentId) {
    setSelectedDocs((current) =>
      current.filter(
        (docId) => docId !== documentId
      )
    );

    setUploadedDocs((current) =>
      current.filter(
        (doc) => doc.id !== documentId
      )
    );
  }

  function getSelectedDocumentName(documentId) {
    const uploaded = uploadedDocs.find(
      (doc) => doc.id === documentId
    );

    if (uploaded) {
      return uploaded.name;
    }

    return 'DigiLocker Document';
  }

  function handleSubmitApplication() {
    const app = addApplication({
      name: scheme.name,
      type: 'SCHEME',
      schemeId: scheme.id,
      department: scheme.department,

      submittedDate: new Date()
        .toISOString()
        .slice(0, 10),

      /*
       * Only document references are kept
       * for this demo application.
       *
       * No personal document vault is used.
       */
      attachedDocuments: selectedDocs,
    });

    showToast(
      'Scheme application submitted successfully.'
    );

    navigate(`/applications/${app.id}`);
  }

  function handleNext() {
    if (step === 3 && !consented) {
      showToast(
        'Please provide consent before continuing.'
      );
      return;
    }

    setStep(
      (currentStep) => currentStep + 1
    );
  }

  function handleBack() {
    if (step === 0) {
      setApplying(false);
      return;
    }

    setStep(
      (currentStep) => currentStep - 1
    );
  }

  return (
    <DashboardLayout>

      {/* BREADCRUMB */}

      <p className="text-xs text-gray-400 mb-2">
        <Link
          to="/schemes"
          className="hover:underline"
        >
          Government Schemes
        </Link>{' '}
        / {scheme.name}
      </p>

      {/* HEADER */}

      <div className="flex items-center gap-2 mb-1 flex-wrap">

        <h1 className="font-heading text-2xl font-bold text-navy-900">
          {scheme.name}
        </h1>

        <span className="text-xs font-medium text-saffron-700 bg-saffron-50 border border-saffron-200 rounded-full px-2.5 py-0.5">
          Demo Scheme
        </span>

      </div>

      <p className="text-sm text-navy-600 mb-6">
        {scheme.category} · {scheme.department}
      </p>

      {/* ================================================= */}
      {/* BEFORE APPLYING */}
      {/* ================================================= */}

      {!applying ? (

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-5">

            {/* DESCRIPTION */}

            <div className="rounded-xl border border-gray-200 bg-white p-5">

              <h3 className="font-heading font-semibold text-navy-900 mb-2">
                Description
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                {scheme.description}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Benefits:</strong>{' '}
                {scheme.benefits}
              </p>

            </div>

            {/* ELIGIBILITY */}

            <div className="rounded-xl border border-gray-200 bg-white p-5">

              <h3 className="font-heading font-semibold text-navy-900 mb-3">
                Eligibility Rules (Demo)
              </h3>

              <ul className="space-y-2">

                {match.matchedCriteria.map(
                  (criterion, index) => (

                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >

                      {criterion.matched ? (
                        <CheckCircle2
                          size={16}
                          className="text-green-600"
                        />
                      ) : (
                        <XCircle
                          size={16}
                          className="text-red-400"
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

                  )
                )}

              </ul>

            </div>

            <p className="text-xs text-gray-400">
              Eligibility shown by GovConnect is an
              estimate based on the information provided.
              Final eligibility is determined by the
              concerned authority.
            </p>

          </div>

          {/* MATCH SCORE */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 h-fit">

            <p className="text-xs text-gray-500 mb-1">
              Match Score
            </p>

            <p className="font-heading text-3xl font-bold text-navy-900 mb-1">
              {match.percent}%
            </p>

            {match.likelyEligible && (
              <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5 mb-3">
                Likely Eligible
              </span>
            )}

            <p className="text-xs text-gray-500 mb-4">
              {match.reason}
            </p>

            <button
              type="button"
              onClick={handleApply}
              className="w-full rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-4 py-2.5 min-h-[44px]"
            >
              Apply
            </button>

          </div>

        </div>

      ) : (

        /* ================================================= */
        /* APPLICATION FLOW */
        /* ================================================= */

        <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

          {/* PROGRESS */}

          <div className="flex items-center gap-2 mb-6 flex-wrap">

            {STEPS.map((stepName, index) => (

              <div
                key={stepName}
                className="flex items-center gap-2"
              >

                <span
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    index <= step
                      ? 'bg-navy-800 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index + 1}
                </span>

                <span
                  className={`text-xs font-medium ${
                    index <= step
                      ? 'text-navy-900'
                      : 'text-gray-400'
                  }`}
                >
                  {stepName}
                </span>

                {index < STEPS.length - 1 && (
                  <span className="w-4 h-px bg-gray-200" />
                )}

              </div>

            ))}

          </div>

          {/* ================================================= */}
          {/* STEP 1 */}
          {/* ================================================= */}

          {step === 0 && (

            <div>

              <h3 className="font-heading font-semibold text-navy-900 mb-3">
                Step 1: Check Eligibility
              </h3>

              <p className="text-3xl font-bold text-navy-900 mb-2">
                {match.percent}% Match
              </p>

              {match.likelyEligible ? (

                <p className="text-sm text-green-700 mb-4">
                  Likely Eligible based on your
                  profile.
                </p>

              ) : (

                <p className="text-sm text-yellow-700 mb-4">
                  Your current match is below the
                  recommended threshold, but you may
                  still proceed.
                </p>

              )}

              <ul className="space-y-2 mb-4">

                {match.matchedCriteria.map(
                  (criterion, index) => (

                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >

                      {criterion.matched ? (
                        <CheckCircle2
                          size={16}
                          className="text-green-600"
                        />
                      ) : (
                        <XCircle
                          size={16}
                          className="text-red-400"
                        />
                      )}

                      {criterion.label}

                    </li>

                  )
                )}

              </ul>

            </div>

          )}

          {/* ================================================= */}
          {/* STEP 2 */}
          {/* ================================================= */}

          {step === 1 && (

            <div>

              <h3 className="font-heading font-semibold text-navy-900 mb-3">
                Step 2: Review Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">

                {PROFILE_REVIEW_FIELDS.map(
                  (field) => (

                    <div key={field}>

                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {FIELD_LABELS[field]}
                      </label>

                      <input
                        defaultValue={
                          profile?.[field] || ''
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                      />

                      <p className="text-xs text-green-600 mt-1">
                        ✓ Autofilled from GovConnect
                        Profile
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* STEP 3 — DOCUMENTS */}
          {/* ================================================= */}

          {step === 2 && (

            <div>

              <h3 className="font-heading font-semibold text-navy-900 mb-2">
                Step 3: Documents
              </h3>

              <p className="text-sm text-gray-500 mb-5">
                Provide the documents required for this
                application. Documents are used only
                for this application flow.
              </p>

              {/* DIGILOCKER */}

              <Digilocker
                selectedDocs={selectedDocs}
                onChange={setSelectedDocs}
              />

              {/* UPLOAD */}

              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">

                <div className="flex items-start gap-3">

                  <div className="h-11 w-11 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">

                    <Upload
                      size={20}
                      className="text-navy-700"
                    />

                  </div>

                  <div>

                    <h4 className="font-semibold text-navy-900">
                      Upload for this application
                    </h4>

                    <p className="text-xs text-gray-600 mt-1 leading-5">
                      Upload a document if it is not
                      available through DigiLocker.
                    </p>

                  </div>

                </div>

                <label className="mt-4 w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-navy-300 bg-white hover:bg-navy-50 text-navy-800 px-4 py-2.5 text-sm font-semibold transition-colors">

                  <Upload size={16} />

                  Upload Document

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                    onChange={handleUpload}
                    className="hidden"
                  />

                </label>

                <p className="text-[11px] text-gray-500 mt-2 text-center">
                  Maximum file size: 2 MB · Used only
                  for this application
                </p>

              </div>

              {/* SELECTED DOCUMENTS */}

              {selectedDocs.length > 0 && (

                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">

                  <div className="flex items-center gap-2 mb-3">

                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />

                    <p className="text-sm font-semibold text-green-800">
                      Documents attached to this application
                    </p>

                  </div>

                  <div className="space-y-2">

                    {selectedDocs.map(
                      (documentId) => (

                        <div
                          key={documentId}
                          className="flex items-center justify-between gap-3 rounded-lg bg-white border border-green-200 px-3 py-2.5"
                        >

                          <div className="flex items-center gap-2 min-w-0">

                            <FileText
                              size={16}
                              className="text-green-700 shrink-0"
                            />

                            <span className="text-sm text-green-800 truncate">
                              {getSelectedDocumentName(
                                documentId
                              )}
                            </span>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeDocument(
                                documentId
                              )
                            }
                            className="text-xs font-semibold text-red-600 hover:underline shrink-0"
                          >
                            Remove
                          </button>

                        </div>

                      )
                    )}

                  </div>

                  <p className="text-[11px] text-green-700 mt-3">
                    These documents are attached only
                    to this application flow and are
                    not stored in a GovConnect document
                    vault.
                  </p>

                </div>

              )}

              {selectedDocs.length === 0 && (

                <div className="mt-5 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">

                  <FileText
                    size={20}
                    className="mx-auto text-gray-400 mb-2"
                  />

                  <p className="text-sm text-gray-500">
                    No documents attached yet.
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Fetch from DigiLocker or upload
                    a document for this application.
                  </p>

                </div>

              )}

            </div>

          )}

          {/* ================================================= */}
          {/* STEP 4 */}
          {/* ================================================= */}

          {step === 3 && (

            <div>

              <div className="flex items-center gap-2 mb-3">

                <div className="rounded-lg bg-green-50 p-2">

                  <ShieldCheck
                    size={20}
                    className="text-green-600"
                  />

                </div>

                <h3 className="font-heading font-semibold text-navy-900">
                  Step 4: Consent
                </h3>

              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 mb-4">

                <p className="text-sm text-gray-600 leading-6">
                  I confirm that the information I have
                  provided through GovConnect is accurate
                  to the best of my knowledge. I understand
                  that this is a demo application flow and
                  final approval is subject to verification
                  by the concerned authority.
                </p>

              </div>

              <label className="flex items-start gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={consented}
                  onChange={(event) =>
                    setConsented(
                      event.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300"
                />

                <span className="text-sm text-gray-700">
                  I have reviewed the information and
                  documents and give my consent to proceed
                  with this application.
                </span>

              </label>

            </div>

          )}

          {/* ================================================= */}
          {/* STEP 5 */}
          {/* ================================================= */}

          {step === 4 && (

            <div>

              <h3 className="font-heading font-semibold text-navy-900 mb-3">
                Step 5: Submit
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Review complete. Click below to submit
                your scheme application for tracking.
              </p>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4 mb-4">

                <p className="text-sm text-green-800 font-medium">
                  ✓ Eligibility checked
                </p>

                <p className="text-sm text-green-800 font-medium">
                  ✓ Profile information reviewed
                </p>

                <p className="text-sm text-green-800 font-medium">
                  ✓ {selectedDocs.length} document
                  {selectedDocs.length !== 1
                    ? 's'
                    : ''}{' '}
                  attached
                </p>

                <p className="text-sm text-green-800 font-medium">
                  ✓ Consent provided
                </p>

              </div>

              <button
                type="button"
                onClick={handleSubmitApplication}
                className="rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-6 py-2.5 min-h-[44px]"
              >
                Submit Application
              </button>

            </div>

          )}

          {/* ================================================= */}
          {/* NAVIGATION */}
          {/* ================================================= */}

          <div className="flex justify-between mt-6">

            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium px-4 py-2 min-h-[40px]"
            >
              Back
            </button>

            {step < STEPS.length - 1 && (

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  step === 3 && !consented
                }
                className="rounded-lg bg-navy-800 hover:bg-navy-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-medium px-4 py-2 min-h-[40px]"
              >
                Next
              </button>

            )}

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}