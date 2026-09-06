import { Link } from 'react-router-dom';
import { LandmarkIcon, ArrowRight } from 'lucide-react';
import TypeBadge from '../components/TypeBadge';
import StatusBadge from '../components/StatusBadge';
import { getApplications } from '../services/applicationApi';
import { formatDate } from '../utils/format';
import { useLanguage } from '../context/LanguageContext';

const SAMPLE_CITIZENS = [
  {
    citizen: 'Priya Verma',
    id: 'PSP-2026-40219',
    type: 'DIGITAL_SERVICE',
    name: 'Passport Application',
    department: 'Ministry of External Affairs',
    status: 'Processing',
    date: '2026-08-15',
  },
  {
    citizen: 'Rohan Gupta',
    id: 'SES-2026-30988',
    type: 'SCHEME',
    name: 'Youth Employment Assistance Scheme',
    department: 'Ministry of Labour & Employment (Demo)',
    status: 'Under Review',
    date: '2026-08-05',
  },
  {
    citizen: 'Fatima Khan',
    id: 'DL-2026-88012',
    type: 'DIGITAL_SERVICE',
    name: 'Driving Licence Application',
    department: 'Ministry of Road Transport & Highways',
    status: 'Approved',
    date: '2026-07-28',
  },
  {
    citizen: 'Aditya Rao',
    id: 'DSS-2026-11004',
    type: 'SCHEME',
    name: 'Digital Skills Scholarship',
    department: 'Ministry of Skill Development (Demo)',
    status: 'Rejected',
    date: '2026-07-19',
  },
];

const INTEROP_STATUS = [
  {
    name: 'Identity Registry',
    status: 'Mock Connected',
    ok: true,
  },
  {
    name: 'Education Registry',
    status: 'Mock Connected',
    ok: true,
  },
  {
    name: 'Income System',
    status: 'Mock Processing',
    ok: false,
  },
  {
    name: 'Department System',
    status: 'Mock Connected',
    ok: true,
  },
];

const DATA_MAPPINGS = [
  {
    sources: ['Applicant Name', 'Beneficiary Name', 'Citizen Name'],
    canonical: 'person.name',
  },
  {
    sources: ['Yearly Income', 'Family Income', 'Annual Earnings'],
    canonical: 'person.annualIncome',
  },
  {
    sources: ['Residential Address', 'Permanent Address', 'Domicile Address'],
    canonical: 'person.address',
  },
];

export default function Officer() {
  const { t } = useLanguage();

  const myApplications = getApplications();

  const combined = [
    ...myApplications.map((a) => ({
      citizen: 'Aarav Sharma',
      id: a.id,
      type: a.type,
      name: a.name,
      department: a.department,
      status: a.status,
      date: a.submittedDate,
    })),
    ...SAMPLE_CITIZENS,
  ];

  const total = combined.length;

  const pending = combined.filter((a) =>
    ['Submitted', 'Processing', 'Under Review'].includes(a.status)
  ).length;

  const approved = combined.filter(
    (a) => a.status === 'Approved'
  ).length;

  const rejected = combined.filter(
    (a) => a.status === 'Rejected'
  ).length;

  const STATS = [
    {
      label: t('totalApplications'),
      value: total,
    },
    {
      label: t('pending'),
      value: pending,
    },
    {
      label: t('approved'),
      value: approved,
    },
    {
      label: t('rejected'),
      value: rejected,
    },
    {
      label: t('openGrievances'),
      value: 3,
    },
  ];

  const FLOW_STEPS = [
    t('govConnect'),
    t('interoperabilityLayer'),
    `${t('identityRegistry')} ✓`,
    `${t('educationRegistry')} ✓`,
    `${t('incomeSystem')} ✓`,
    `${t('departmentSystem')} ✓`,
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <header className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-heading text-lg font-bold"
          >
            <LandmarkIcon
              size={20}
              className="text-saffron-400"
            />

            GovConnect

            <span className="text-navy-300 font-normal text-sm">
              | {t('officerDashboard')}
            </span>
          </Link>

          <Link
            to="/dashboard"
            className="text-sm text-navy-200 hover:text-white flex items-center gap-1"
          >
            {t('citizenView')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
          {t('officerDashboard')}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          {t('officerDashboardDescription')}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <p className="text-2xl font-bold text-navy-900">
                {s.value}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white overflow-x-auto mb-8">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-4 py-3">
                  {t('applicationId')}
                </th>

                <th className="px-4 py-3">
                  {t('citizen')}
                </th>

                <th className="px-4 py-3">
                  {t('type')}
                </th>

                <th className="px-4 py-3">
                  {t('department')}
                </th>

                <th className="px-4 py-3">
                  {t('status')}
                </th>

                <th className="px-4 py-3">
                  {t('date')}
                </th>
              </tr>
            </thead>

            <tbody>
              {combined.map((a, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-0 border-gray-100"
                >
                  <td className="px-4 py-3 font-medium text-navy-900">
                    {a.id}
                  </td>

                  <td className="px-4 py-3">
                    {a.citizen}
                  </td>

                  <td className="px-4 py-3">
                    <TypeBadge type={a.type} />
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {a.department}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(a.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-heading font-semibold text-navy-900 mb-3">
              {t('mockIntegrationStatus')}
            </h3>

            <ul className="space-y-2.5">
              {INTEROP_STATUS.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">
                    {t(
                      s.name === 'Identity Registry'
                        ? 'identityRegistry'
                        : s.name === 'Education Registry'
                        ? 'educationRegistry'
                        : s.name === 'Income System'
                        ? 'incomeSystem'
                        : 'departmentSystem'
                    )}
                  </span>

                  <span
                    className={
                      s.ok
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }
                  >
                    {s.ok ? '✓' : '⏳'}{' '}
                    {t(
                      s.status === 'Mock Connected'
                        ? 'mockConnected'
                        : 'mockProcessing'
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-heading font-semibold text-navy-900 mb-3">
              {t('dataMappingDemo')}
            </h3>

            <div className="space-y-3">
              {DATA_MAPPINGS.map((m, idx) => (
                <div
                  key={idx}
                  className="text-sm"
                >
                  <p className="text-gray-600">
                    {m.sources
                      .map((source) => {
                        const sourceKeyMap = {
                          'Applicant Name': 'applicantName',
                          'Beneficiary Name': 'beneficiaryName',
                          'Citizen Name': 'citizenName',
                          'Yearly Income': 'yearlyIncome',
                          'Family Income': 'familyIncome',
                          'Annual Earnings': 'annualEarnings',
                          'Residential Address':
                            'residentialAddress',
                          'Permanent Address':
                            'permanentAddress',
                          'Domicile Address':
                            'domicileAddress',
                        };

                        return t(
                          sourceKeyMap[source]
                        );
                      })
                      .join(' / ')}
                  </p>

                  <p className="text-navy-800 font-medium">
                    → {m.canonical}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-heading font-semibold text-navy-900 mb-1">
            {t('interoperabilityFlow')}
          </h3>

          <p className="text-xs text-gray-400 mb-4">
            {t('interoperabilityFlowDescription')}
          </p>

          <div className="flex flex-col items-center gap-2">
            {FLOW_STEPS.map((step, idx, arr) => (
              <div
                key={step}
                className="flex flex-col items-center"
              >
                <div className="rounded-lg border border-navy-200 bg-navy-50 text-navy-800 text-sm font-medium px-4 py-2">
                  {step}
                </div>

                {idx < arr.length - 1 && (
                  <div className="h-4 w-px bg-navy-200 my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}