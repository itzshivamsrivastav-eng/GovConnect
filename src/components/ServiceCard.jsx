import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-all flex flex-col">
      <div className="h-1.5 w-full bg-navy-700" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-lg bg-navy-50 p-2">
            <Landmark size={18} className="text-navy-700" />
          </div>
          <span className="text-xs font-medium text-gray-500">{service.category}</span>
        </div>

        <h4 className="font-heading font-semibold text-navy-900 mb-1">{service.name}</h4>
        <p className="text-xs text-gray-500 mb-2">{service.department}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{service.description}</p>

        <Link
          to={`/services/${service.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-lg border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white transition-colors font-medium text-sm px-4 py-2 min-h-[40px]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}