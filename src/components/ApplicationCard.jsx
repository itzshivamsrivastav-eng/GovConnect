import { Link } from 'react-router-dom';
import TypeBadge from './TypeBadge';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/format';

export default function ApplicationCard({ application }) {
  return (
    <Link
      to={`/applications/${application.id}`}
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-navy-300 hover:shadow-sm transition-all"
    >
      <div className="h-1.5 w-full bg-navy-700" />

      <div className="p-4">
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <TypeBadge type={application.type} />
          <StatusBadge status={application.status} />
        </div>

        <h4 className="font-heading font-semibold text-navy-900 mb-1">
          {application.name}
        </h4>

        <p className="text-xs text-gray-500 mb-1">
          Application ID: {application.id}
        </p>

        <p className="text-xs text-gray-500">
          Submitted: {formatDate(application.submittedDate)}
        </p>
      </div>
    </Link>
  );
}