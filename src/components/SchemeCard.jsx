import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SchemeCard({ scheme, match }) {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-all flex flex-col">

      <div className="h-1.5 w-full bg-navy-700" />

      <div className="p-5 flex flex-col flex-1">

        <div className="flex items-start justify-between gap-2 mb-2">

          <span className="text-xs font-medium text-saffron-700 bg-saffron-50 border border-saffron-200 rounded-full px-2.5 py-0.5">
            {t('demoScheme')}
          </span>

          {match && (
            <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5 whitespace-nowrap">
              {match.percent}% {t('match')}
            </span>
          )}

        </div>

        <h4 className="font-heading font-semibold text-navy-900 mb-1">
          {scheme.name}
        </h4>

        <p className="text-xs text-navy-600 mb-2">
          {scheme.category}
        </p>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
          {scheme.description}
        </p>

        {match && match.likelyEligible && (
          <p className="text-xs text-gray-500 mb-3 flex items-start gap-1">

            <Award
              size={14}
              className="text-navy-600 mt-0.5 shrink-0"
            />

            {match.reason}

          </p>
        )}

        <Link
          to={`/schemes/${scheme.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-lg border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white transition-colors font-medium text-sm px-4 py-2 min-h-[40px]"
        >
          {t('viewScheme')}
        </Link>

      </div>
    </div>
  );
}