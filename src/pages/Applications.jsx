import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import TypeBadge from '../components/TypeBadge';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { getApplications } from '../services/applicationApi';
import { formatDate } from '../utils/format';

const TYPE_FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: 'DIGITAL_SERVICE', label: 'Digital Services' },
  { key: 'SCHEME', label: 'Schemes' },
];

const STATUS_FILTERS = ['All Status', 'Submitted', 'Processing', 'Under Review', 'Action Required', 'Approved', 'Rejected'];

export default function Applications() {
  const applications = getApplications();
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filtered = applications.filter((a) => {
    const matchesType = typeFilter === 'ALL' || a.type === typeFilter;
    const matchesStatus = statusFilter === 'All Status' || a.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">My Applications</h1>
      <p className="text-sm text-gray-500 mb-6">Track applications from digital services and schemes in one place.</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setTypeFilter(f.key)}
            className={`text-sm font-medium rounded-full px-4 py-1.5 transition-colors ${
              typeFilter === f.key ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-xs font-medium rounded-full px-3 py-1 transition-colors ${
              statusFilter === s ? 'bg-saffron-500 text-navy-900' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Apply for a digital service or scheme to start tracking it here."
          action={
            <Link to="/services" className="text-sm font-medium text-navy-700 hover:underline">
              Browse Digital Services
            </Link>
          }
        />
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-4 sm:hidden">
            {filtered.map((a) => (
              <Link
                key={a.id}
                to={`/applications/${a.id}`}
                className="block rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <TypeBadge type={a.type} />
                  <StatusBadge status={a.status} />
                </div>
                <h4 className="font-heading font-semibold text-navy-900">{a.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{a.id} · {a.department}</p>
                <p className="text-xs text-gray-400 mt-1">Last updated: {formatDate(a.lastUpdated)}</p>
              </Link>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-400 uppercase tracking-wide">
                  <th className="px-4 py-3">Application ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => navigate(`/applications/${a.id}`)}
                    className="border-b last:border-0 border-gray-100 hover:bg-navy-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-navy-900">
                      <Link to={`/applications/${a.id}`}>{a.id}</Link>
                    </td>
                    <td className="px-4 py-3">{a.name}</td>
                    <td className="px-4 py-3"><TypeBadge type={a.type} /></td>
                    <td className="px-4 py-3 text-gray-500">{a.department}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(a.submittedDate)}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(a.lastUpdated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
