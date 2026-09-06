import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function UnifiedTrackingBanner({
  compact = false,
}) {
  const { t } = useLanguage();

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        bg-navy-900
        text-white
        border
        border-navy-800
        ${compact ? 'p-5' : 'p-6 sm:p-8'}
      `}
    >

      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-saffron-500/10" />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-between">

        <div className="flex items-start gap-3">

          <div className="shrink-0 rounded-lg bg-white/10 p-2.5">

            <LayoutDashboard
              size={22}
              className="text-saffron-400"
            />

          </div>

          <div>

            <h3 className="font-heading text-lg sm:text-xl font-semibold mb-1">
              {t('unifiedTracking')}
            </h3>

            <p className="text-navy-100 text-sm max-w-xl">
              {t('unifiedTrackingDescription')}
            </p>

          </div>

        </div>

        <Link
          to="/applications"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            shrink-0
            rounded-lg
            bg-saffron-500
            hover:bg-saffron-600
            transition-colors
            text-navy-900
            font-semibold
            px-4
            py-2.5
            min-h-[44px]
          "
        >
          {t('trackApplicationsButton')}
          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
}