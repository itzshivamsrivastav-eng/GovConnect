import { Link } from 'react-router-dom';
import { Landmark, ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="group rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col transition-all duration-200 hover:border-navy-300 hover:shadow-md">
      
      {/* Top accent */}
      <div className="h-1 bg-navy-800" />

      <div className="p-5 flex flex-col flex-1">

        {/* Category + Icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-navy-50 border border-navy-100 flex items-center justify-center">
              <Landmark
                size={19}
                className="text-navy-700"
              />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {service.category}
            </span>
          </div>
        </div>

        {/* Service name */}
        <h4 className="font-heading text-lg font-semibold text-navy-900 leading-snug mb-1">
          {service.name}
        </h4>

        {/* Department */}
        <p className="text-xs font-medium text-gray-500 mb-3">
          {service.department}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-3" />

        {/* Description */}
        <p className="text-sm leading-6 text-gray-600 line-clamp-3 flex-1">
          {service.description}
        </p>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">

          <span className="text-xs text-gray-500">
            Government Service
          </span>

          <Link
            to={`/services/${service.id}`}
            className="inline-flex items-center gap-2 rounded-md bg-navy-800 px-4 py-2.5 min-h-[40px] text-sm font-semibold text-white transition-colors hover:bg-navy-900"
          >
            View Details
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

        </div>
      </div>
    </div>
  );
}