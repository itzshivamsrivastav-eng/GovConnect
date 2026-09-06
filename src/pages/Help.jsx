import { useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';

const FAQS = [
  {
    qKey: 'faqWhatIsGovConnect',
    aKey: 'faqWhatIsGovConnectAnswer',
  },
  {
    qKey: 'faqDoesSubmitApplications',
    aKey: 'faqDoesSubmitApplicationsAnswer',
  },
  {
    qKey: 'faqAadhaarDigiLocker',
    aKey: 'faqAadhaarDigiLockerAnswer',
  },
  {
    qKey: 'faqApplicationTracking',
    aKey: 'faqApplicationTrackingAnswer',
  },
  {
    qKey: 'faqSchemeMatching',
    aKey: 'faqSchemeMatchingAnswer',
  },
  {
    qKey: 'faqConsentManagement',
    aKey: 'faqConsentManagementAnswer',
  },
  {
    qKey: 'faqRealGrievance',
    aKey: 'faqRealGrievanceAnswer',
  },
];

export default function Help() {
  const [openIdx, setOpenIdx] = useState(0);
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        {t('helpSupport')}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {t('faqDescription')}
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
          {FAQS.map((f, idx) => (
            <div key={f.qKey}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-navy-900">
                  {t(f.qKey)}
                </span>

                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <p className="px-4 pb-4 text-sm text-gray-600">
                  {t(f.aKey)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 h-fit">
          <h3 className="font-heading font-semibold text-navy-900 mb-3">
            {t('contactSupport')}
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            {t('mockSupportDescription')}
          </p>

          <div className="flex items-center gap-2 text-sm text-navy-800 mb-2">
            <Mail size={16} />
            support@govconnect-demo.in
          </div>

          <div className="flex items-center gap-2 text-sm text-navy-800">
            <Phone size={16} />
            1800-000-0000 ({t('demo')})
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}