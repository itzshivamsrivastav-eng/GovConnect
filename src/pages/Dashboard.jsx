import { Link } from 'react-router-dom';
import {
  Landmark,
  Award,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';
import ApplicationCard from '../components/ApplicationCard';
import SchemeCard from '../components/SchemeCard';
import ProgressBar from '../components/ProgressBar';
import EmptyState from '../components/EmptyState';
import UnifiedTrackingBanner from '../components/UnifiedTrackingBanner';

import { getCurrentUser } from '../services/authApi';
import { getApplications } from '../services/applicationApi';
import { getRankedSchemes } from '../services/schemeApi';
import { getProfile } from '../services/profileApi';
import { useLanguage } from '../context/LanguageContext';

const QUICK_ACTIONS = [
  {
    to: '/services',
    icon: Landmark,
    titleKey: 'digitalServices',
    descKey: 'accessGovernmentServices',
    borderClass: 'border-blue-200 hover:border-blue-300',
    iconClass: 'text-blue-700',
    iconBg: 'bg-blue-50 group-hover:bg-blue-100',
  },
  {
    to: '/schemes',
    icon: Award,
    titleKey: 'governmentSchemes',
    descKey: 'findEligibleSchemes',
    borderClass: 'border-amber-200 hover:border-amber-300',
    iconClass: 'text-amber-700',
    iconBg: 'bg-amber-50 group-hover:bg-amber-100',
  },
  {
    to: '/applications',
    icon: ClipboardList,
    titleKey: 'trackApplicationsAction',
    descKey: 'trackAllApplications',
    borderClass: 'border-indigo-200 hover:border-indigo-300',
    iconClass: 'text-indigo-700',
    iconBg: 'bg-indigo-50 group-hover:bg-indigo-100',
  },
  {
    to: '/consent',
    icon: ShieldCheck,
    titleKey: 'consentCenter',
    descKey: 'manageDataSharing',
    borderClass: 'border-green-200 hover:border-green-300',
    iconClass: 'text-green-700',
    iconBg: 'bg-green-50 group-hover:bg-green-100',
  },
];

function calcProfileCompletion(profile) {
  if (!profile) return 0;

  const fields = [
    'fullName',
    'fatherName',
    'motherName',
    'dob',
    'gender',
    'mobile',
    'email',
    'address',
    'state',
    'district',
    'city',
    'pincode',
    'educationLevel',
    'institutionName',
    'course',
    'studentStatus',
    'occupation',
    'employmentType',
    'annualIncome',
    'incomeCategory',
    'category',
    'maritalStatus',
  ];

  const completed = fields.filter(
    (field) =>
      profile[field] !== undefined &&
      profile[field] !== null &&
      String(profile[field]).trim() !== ''
  ).length;

  return Math.round((completed / fields.length) * 100);
}

function formatActivityDate(date, language) {
  if (!date) return '';

  const activityDate = new Date(date);

  if (Number.isNaN(activityDate.getTime())) {
    return date;
  }

  return activityDate.toLocaleDateString(
    language === 'hi' ? 'hi-IN' : 'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );
}

function getActivityInfo(step, application, t) {
  if (step === 'Application Submitted') {
    return {
      text: `${application.name} ${t('applicationSubmittedActivity')}`,
      icon: CheckCircle2,
    };
  }

  if (step === 'Documents Received') {
    return {
      text: `${t('documentsReceivedActivity')} ${application.name}`,
      icon: CheckCircle2,
    };
  }

  if (step === 'Verification') {
    return {
      text: `${application.name} ${t('underVerificationActivity')}`,
      icon: Clock3,
    };
  }

  if (step === 'Department Processing') {
    return {
      text: `${application.name} ${t('beingProcessedActivity')}`,
      icon: Clock3,
    };
  }

  if (step === 'Final Decision') {
    if (application.status === 'Approved') {
      return {
        text: `${application.name} ${t('applicationApprovedActivity')}`,
        icon: CheckCircle2,
      };
    }

    if (application.status === 'Rejected') {
      return {
        text: `${application.name} ${t('applicationRejectedActivity')}`,
        icon: Clock3,
      };
    }

    return {
      text: `${application.name} ${t('finalDecisionUpdatedActivity')}`,
      icon: Clock3,
    };
  }

  return {
    text: `${application.name} ${t('statusUpdatedActivity')}`,
    icon: Clock3,
  };
}

function buildRecentActivities(applications, t) {
  if (!applications || applications.length === 0) {
    return [];
  }

  const activities = [];

  applications.forEach((application) => {
    const timeline = application.timeline || [];

    timeline.forEach((step) => {
      if (!step.date) return;

      const activityInfo = getActivityInfo(
        step.step,
        application,
        t
      );

      activities.push({
        id: `${application.id}-${step.step}-${step.date}`,
        applicationId: application.id,
        text: activityInfo.text,
        icon: activityInfo.icon,
        date: step.date,
      });
    });

    if (
      application.lastUpdated &&
      !timeline.some(
        (step) => step.date === application.lastUpdated
      )
    ) {
      const activityInfo = getActivityInfo(
        'Application Updated',
        application,
        t
      );

      activities.push({
        id: `${application.id}-updated-${application.lastUpdated}`,
        applicationId: application.id,
        text: activityInfo.text,
        icon: activityInfo.icon,
        date: application.lastUpdated,
      });
    }
  });

  return activities
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);
}

export default function Dashboard() {
  const { t, language } = useLanguage();

  const user = getCurrentUser();
  const applications = getApplications();
  const profile = getProfile();

  const ranked = getRankedSchemes();
  const topSchemes = ranked.slice(0, 3);

  const completion = calcProfileCompletion(profile);

  const completedCount = applications.filter(
    (app) => app.status === 'Approved'
  ).length;

  const pendingCount = applications.filter(
    (app) =>
      app.status === 'Submitted' ||
      app.status === 'Under Review' ||
      app.status === 'Processing'
  ).length;

  const totalApplications = applications.length;

  const eligibleSchemes = ranked.filter(
    ({ match }) => match.likelyEligible
  ).length;

  const availableSchemes = ranked.length;

  const completedPercentage =
    totalApplications > 0
      ? Math.round(
          (completedCount / totalApplications) * 100
        )
      : 0;

  const recentActivities = buildRecentActivities(
    applications,
    t
  );

  return (
    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>

          <div className="flex items-center gap-2 mb-1">

            <Sparkles
              size={17}
              className="text-amber-500"
            />

            <span className="text-xs font-semibold uppercase tracking-wide text-navy-700">
              {t('citizenDashboard')}
            </span>

          </div>

          <h1 className="font-heading text-2xl font-bold text-navy-900">
            {t('welcomeBack')}{' '}
            {user?.name || t('citizen')}!
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {t('manageServices')}
          </p>

        </div>

        <Link
          to="/profile"
          className="inline-flex items-center justify-center rounded-lg border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white transition-colors font-medium text-sm px-4 py-2.5 min-h-[44px]"
        >
          {t('viewMyProfile')}
        </Link>

      </div>


      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">

        {QUICK_ACTIONS.map(
          ({
            to,
            icon: Icon,
            titleKey,
            descKey,
            borderClass,
            iconClass,
            iconBg,
          }) => (
            <Link
              key={to}
              to={to}
              className={`group rounded-xl border bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${borderClass}`}
            >

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${iconBg}`}
              >
                <Icon
                  size={20}
                  className={iconClass}
                />
              </div>

              <p className="text-sm font-semibold text-navy-900">
                {t(titleKey)}
              </p>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {t(descKey)}
              </p>

            </Link>
          )
        )}

      </div>


      {/* MAIN CONTENT */}

      <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mb-8">

        {/* LEFT COLUMN */}

        <div>

          {/* MY APPLICATIONS */}

          <section className="mb-6">

            <div className="flex items-center justify-between mb-3">

              <div>

                <h2 className="font-heading text-lg font-semibold text-navy-900">
                  {t('myApplicationsTitle')}
                </h2>

                <p className="text-xs text-gray-500 mt-0.5">
                  {t('trackRecentApplications')}
                </p>

              </div>

              <Link
                to="/applications"
                className="text-sm text-navy-700 hover:underline flex items-center gap-1"
              >
                {t('viewAll')}
                <ArrowRight size={14} />
              </Link>

            </div>

            {applications.length === 0 ? (

              <EmptyState
                title={t('noApplicationsYet')}
                description={t('startTracking')}
                action={
                  <Link
                    to="/services"
                    className="text-sm font-medium text-navy-700 hover:underline"
                  >
                    {t('browseDigitalServices')}
                  </Link>
                }
              />

            ) : (

              <div className="grid sm:grid-cols-2 gap-4">

                {applications.slice(0, 4).map(
                  (app) => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                    />
                  )
                )}

              </div>

            )}

          </section>


          {/* APPLICATION OVERVIEW */}

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm mb-6">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h3 className="font-heading font-semibold text-navy-900">
                  {t('applicationOverview')}
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  {t('currentApplicationStatus')}
                </p>

              </div>

              <Link
                to="/applications"
                className="text-xs font-medium text-navy-700 hover:underline"
              >
                {t('manage')}
              </Link>

            </div>


            <div className="grid md:grid-cols-2 gap-6 items-center">

              {/* PIE CHART */}

              <div className="flex items-center justify-center">

                <div
                  className="relative w-36 h-36 rounded-full"
                  style={{
                    background:
                      totalApplications === 0
                        ? 'conic-gradient(#e5e7eb 0deg 360deg)'
                        : `conic-gradient(
                            #1f2937 0deg ${completedPercentage * 3.6}deg,
                            #f59e0b ${completedPercentage * 3.6}deg 360deg
                          )`,
                  }}
                >

                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">

                      <span className="text-2xl font-bold text-navy-900">
                        {totalApplications}
                      </span>

                      <span className="text-[11px] text-gray-500">
                        {t('applications')}
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* STATUS */}

              <div className="space-y-3">

                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    <span className="w-3 h-3 rounded-full bg-navy-800" />

                    <div>

                      <p className="text-sm font-medium text-gray-800">
                        {t('completed')}
                      </p>

                      <p className="text-xs text-gray-500">
                        {t('approvedApplications')}
                      </p>

                    </div>

                  </div>

                  <span className="text-lg font-bold text-navy-900">
                    {completedCount}
                  </span>

                </div>


                <div className="flex items-center justify-between rounded-lg bg-amber-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    <span className="w-3 h-3 rounded-full bg-amber-500" />

                    <div>

                      <p className="text-sm font-medium text-gray-800">
                        {t('pending')}
                      </p>

                      <p className="text-xs text-gray-500">
                        {t('submittedProcessing')}
                      </p>

                    </div>

                  </div>

                  <span className="text-lg font-bold text-amber-700">
                    {pendingCount}
                  </span>

                </div>


                <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    <span className="w-3 h-3 rounded-full bg-green-500" />

                    <div>

                      <p className="text-sm font-medium text-gray-800">
                        {t('likelyEligible')}
                      </p>

                      <p className="text-xs text-gray-500">
                        {t('schemeMatches')}
                      </p>

                    </div>

                  </div>

                  <span className="text-lg font-bold text-green-700">
                    {eligibleSchemes}
                  </span>

                </div>


                <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    <span className="w-3 h-3 rounded-full bg-blue-500" />

                    <div>

                      <p className="text-sm font-medium text-gray-800">
                        {t('available')}
                      </p>

                      <p className="text-xs text-gray-500">
                        {t('schemesInGovConnect')}
                      </p>

                    </div>

                  </div>

                  <span className="text-lg font-bold text-blue-700">
                    {availableSchemes}
                  </span>

                </div>

              </div>

            </div>

          </section>


          {/* PROFILE COMPLETION */}

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm mb-6">

            <div className="flex items-center justify-between mb-3">

              <div>

                <h3 className="font-heading font-semibold text-navy-900">
                  {t('profileCompletion')}
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  {t('improveRecommendations')}
                </p>

              </div>

              <span className="text-sm font-bold text-navy-800">
                {completion}%
              </span>

            </div>

            <ProgressBar percent={completion} />

            <p className="text-xs text-gray-500 mt-3 mb-4">
              {t('completeProfileDescription')}
            </p>

            {completion < 100 && (

              <Link
                to="/profile"
                className="inline-flex items-center justify-center rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white text-sm font-medium px-4 py-2 min-h-[40px]"
              >
                {t('completeProfile')}
              </Link>

            )}

            {completion === 100 && (

              <div className="flex items-center gap-2 text-sm text-green-700">

                <CheckCircle2 size={16} />

                <span>
                  {t('profileComplete')}
                </span>

              </div>

            )}

          </section>


          {/* RECENT ACTIVITY */}

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <div>

                <h3 className="font-heading font-semibold text-navy-900">
                  {t('recentActivity')}
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  {t('latestUpdatesApplications')}
                </p>

              </div>

              <span className="text-xs font-medium text-gray-400">
                {t('latest')}
              </span>

            </div>

            {recentActivities.length === 0 ? (

              <div className="rounded-lg bg-gray-50 px-4 py-6 text-center">

                <p className="text-sm text-gray-500">
                  {t('noRecentActivity')}
                </p>

              </div>

            ) : (

              <ul className="grid md:grid-cols-2 gap-3">

                {recentActivities.map(
                  (activity) => {

                    const Icon = activity.icon;

                    return (
                      <li
                        key={activity.id}
                        className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 hover:bg-gray-100 px-4 py-3 transition-colors"
                      >

                        <Link
                          to={`/applications/${activity.applicationId}`}
                          className="flex items-center gap-3 min-w-0 flex-1"
                        >

                          <div className="w-7 h-7 rounded-full bg-navy-50 flex items-center justify-center shrink-0">

                            <Icon
                              size={14}
                              className="text-navy-700"
                            />

                          </div>

                          <span className="text-sm text-gray-700 truncate">
                            {activity.text}
                          </span>

                        </Link>

                        <span className="text-xs text-gray-400 shrink-0">
                          {formatActivityDate(
                            activity.date,
                            language
                          )}
                        </span>

                      </li>
                    );

                  }
                )}

              </ul>

            )}

          </section>

        </div>


        {/* RIGHT COLUMN - RECOMMENDED SCHEMES */}

        <section>

          <div className="flex items-center justify-between mb-3">

            <div>

              <h2 className="font-heading text-lg font-semibold text-navy-900">
                {t('recommendedSchemes')}
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                {t('basedOnProfile')}
              </p>

            </div>

            <Link
              to="/schemes"
              className="text-sm text-navy-700 hover:underline flex items-center gap-1"
            >
              {t('viewAll')}
              <ArrowRight size={14} />
            </Link>

          </div>

          <div className="space-y-4">

            {topSchemes.map(
              ({ scheme, match }) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  match={match}
                />
              )
            )}

          </div>

        </section>

      </div>


      {/* UNIFIED TRACKING */}

      <UnifiedTrackingBanner />

    </DashboardLayout>
  );
}