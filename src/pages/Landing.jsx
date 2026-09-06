import { Link } from 'react-router-dom';
import {
  UserCircle,
  Sparkles,
  LayoutDashboard,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { useLanguage } from '../context/LanguageContext';

export default function Landing() {
  const { t } = useLanguage();

  const VALUE_PROPS = [
    {
      icon: UserCircle,
      title: t('oneProfileDashboard'),
      description: t('oneProfileDashboardDescription'),
      iconClass: 'bg-blue-50 text-blue-700',
      borderClass: 'border-blue-200',
    },
    {
      icon: Sparkles,
      title: t('schemeExplorer'),
      description: t('schemeExplorerDescription'),
      iconClass: 'bg-amber-50 text-amber-700',
      borderClass: 'border-amber-200',
    },
    {
      icon: LayoutDashboard,
      title: t('serviceTracker'),
      description: t('serviceTrackerDescription'),
      iconClass: 'bg-emerald-50 text-emerald-700',
      borderClass: 'border-emerald-200',
    },
    {
      icon: MessageCircle,
      title: t('helpSupportCenter'),
      description: t('helpSupportCenterDescription'),
      iconClass: 'bg-indigo-50 text-indigo-700',
      borderClass: 'border-indigo-200',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f9ff] overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative">

        {/* Hero Background */}
        <div className="relative overflow-visible bg-gradient-to-r from-[#123f82] via-[#14538d] to-[#157d7a]">

          {/* Decorative shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -left-20 -bottom-28 w-[420px] h-[240px] bg-white/5 rotate-[28deg] rounded-[45%]" />

            <div className="absolute right-[-100px] -top-32 w-[500px] h-[260px] bg-white/5 rotate-[25deg] rounded-[50%]" />

            <div className="absolute right-[15%] bottom-[-120px] w-[350px] h-[220px] bg-emerald-300/10 rotate-[25deg] rounded-[50%]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-50 mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-20 pb-24 sm:pb-28 text-center">

            {/* Main Heading */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[52px] font-bold text-white leading-tight max-w-5xl mx-auto">
              {t('yourDigitalPortal')}{' '}
              <span className="text-[#f4c96b]">
                {t('governmentService')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('landingDescription')}
            </p>

            {/* Search */}
            <div className="relative z-[100] max-w-2xl mx-auto mt-9">
              <div className="bg-white rounded-2xl p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.20)]">
                <SearchBar large />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Feature Cards */}
        <div className="relative z-30 mx-auto max-w-6xl px-4 sm:px-6 -mt-10 sm:-mt-12 pb-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {VALUE_PROPS.map(
              ({
                icon: Icon,
                title,
                description,
                iconClass,
                borderClass,
              }) => (
                <div
                  key={title}
                  className={`group relative overflow-hidden rounded-2xl border ${borderClass} bg-white shadow-[0_8px_25px_rgba(25,65,120,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(25,65,120,0.16)]`}
                >
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#123f82] to-[#188b83] opacity-90" />

                  <div className="p-5 sm:p-6">

                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${iconClass}`}
                    >
                      <Icon size={27} strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-[#102f59] mb-2">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#64748b] leading-6">
                      {description}
                    </p>

                    {/* Hover arrow */}
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#15518b] opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('explore')}
                      <ArrowRight size={14} />
                    </div>

                  </div>
                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* Main Information Section */}
      <section className="mx-auto max-w-6xl w-full px-4 sm:px-6 py-12 sm:py-16">

        <div className="rounded-3xl bg-white border border-[#dce6f3] shadow-sm overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* Left */}
            <div className="p-7 sm:p-10 lg:p-12">

              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-[#15518b]">
                <Sparkles size={14} />
                {t('smarterCitizenExperience')}
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#102f59] mt-5 leading-tight">
                {t('oneProfileHeading')}
                <br />
                {t('multipleGovernmentServices')}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-gray-600 leading-7 max-w-xl">
                {t('govconnectDescription')}
              </p>

              <Link
                to="/login"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#075bb5] hover:bg-[#064c97] text-white font-semibold px-5 py-3 transition-all shadow-sm hover:shadow-md"
              >
                {t('getStarted')}
                <ArrowRight size={18} />
              </Link>

            </div>

            {/* Right Visual */}
            <div className="relative min-h-[260px] lg:min-h-full bg-gradient-to-br from-[#edf5ff] to-[#e7f8f5] flex items-center justify-center overflow-hidden">

              <div className="absolute w-72 h-72 rounded-full border-[20px] border-blue-100/70" />

              <div className="absolute w-52 h-52 rounded-full border-[15px] border-emerald-100/70" />

              <div className="relative z-10 w-[210px] rounded-2xl bg-white border border-blue-100 shadow-xl p-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <UserCircle
                      size={22}
                      className="text-[#15518b]"
                    />
                  </div>

                  <div>
                    <div className="h-2.5 w-20 bg-gray-200 rounded-full" />
                    <div className="h-2 w-14 bg-gray-100 rounded-full mt-2" />
                  </div>

                </div>

                <div className="space-y-3">
                  <div className="h-10 rounded-lg bg-blue-50" />
                  <div className="h-10 rounded-lg bg-emerald-50" />
                  <div className="h-10 rounded-lg bg-amber-50" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#123f68] text-white">

        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-7">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div>

              <div className="font-heading text-lg font-bold">
                GovConnect
              </div>

              <p className="text-xs text-blue-100/70 mt-1">
                {t('oneProfileShort')} • {t('multipleServices')} •{' '}
                {t('smarterTomorrow')}
              </p>

            </div>

            <div className="flex items-center gap-5 text-xs text-blue-100/80">
              <span>{t('aboutGovConnect')}</span>
              <span>{t('dataPrivacy')}</span>
              <span>{t('helpSupport')}</span>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-xs text-blue-100/60">
              © {new Date().getFullYear()} {t('copyright')}
            </p>

            <p className="text-[11px] text-blue-100/50 text-center sm:text-right max-w-lg">
              {t('demoPrototype')}
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
}