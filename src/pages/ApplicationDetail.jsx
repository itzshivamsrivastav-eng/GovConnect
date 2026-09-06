import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Timeline from '../components/Timeline';
import TypeBadge from '../components/TypeBadge';
import StatusBadge from '../components/StatusBadge';
import { getApplicationById } from '../services/applicationApi';
import { formatDate } from '../utils/format';
import { useLanguage } from '../context/LanguageContext';

export default function ApplicationDetail() {
  const { id } = useParams();
  const application = getApplicationById(id);
  const { t } = useLanguage();

  if (!application) {
    return (
      <DashboardLayout>
        <p className="text-gray-600 mb-4">
          {t('applicationNotFound')}
        </p>

        <Link
          to="/applications"
          className="text-navy-700 hover:underline text-sm"
        >
          {t('backToMyApplications')}
        </Link>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <p className="text-xs text-gray-400 mb-2">
        <Link
          to="/applications"
          className="hover:underline"
        >
          {t('myApplications')}
        </Link>{' '}
        / {application.id}
      </p>

      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          {application.name}
        </h1>

        <TypeBadge type={application.type} />
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {t('applicationDetails')}
      </p>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Progress Timeline */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h3 className="font-heading font-semibold text-navy-900 mb-4">
            {t('progressTimeline')}
          </h3>

          <Timeline steps={application.timeline} />
        </div>

        {/* Application Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 h-fit space-y-4">

          <div>
            <p className="text-xs text-gray-400">
              {t('applicationIdLabel')}
            </p>

            <p className="text-sm font-medium text-navy-900">
              {application.id}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              {t('department')}
            </p>

            <p className="text-sm font-medium text-navy-900">
              {application.department}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              {t('submissionDate')}
            </p>

            <p className="text-sm font-medium text-navy-900">
              {formatDate(application.submittedDate)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              {t('currentStatus')}
            </p>

            <StatusBadge status={application.status} />
          </div>

          <div>
            <p className="text-xs text-gray-400">
              {t('lastUpdated')}
            </p>

            <p className="text-sm font-medium text-navy-900">
              {formatDate(application.lastUpdated)}
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}