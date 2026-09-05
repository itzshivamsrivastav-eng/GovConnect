import { useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const FAQS = [
  {
    q: 'What is GovConnect?',
    a: 'GovConnect is a unified citizen portal prototype that helps you discover government digital services and schemes, maintain your common information in one profile, and track applications from one place.',
  },
  {
    q: 'Does GovConnect submit applications on my behalf?',
    a: 'No. For real digital services, GovConnect links you to the official government website to apply. GovConnect does not submit applications itself — it only helps you discover services and track applications you add.',
  },
  {
    q: 'Is my Aadhaar or DigiLocker data really connected?',
    a: 'No. This is a prototype built for demonstration. There is no real Aadhaar, DigiLocker, or government database integration — all data is mock/demo data stored in your browser.',
  },
  {
    q: 'How is application tracking simulated?',
    a: 'Application status and timelines shown in My Applications are simulated using mock data and localStorage for demonstration purposes, not live government system data.',
  },
  {
    q: 'How does scheme matching work?',
    a: 'GovConnect uses a simple rule-based matching engine that compares your saved profile against demo eligibility rules for each scheme, and shows a match percentage and "Likely Eligible" label — never a guarantee of actual eligibility.',
  },
  {
    q: 'Is consent management real?',
    a: 'Consent Center functionality is simulated for this prototype — no real data sharing with external departments takes place.',
  },
  {
    q: 'Where can I file a real government grievance?',
    a: 'The official channel for government grievances is CPGRAMS (pgportal.gov.in). GovConnect\'s Grievances page is a demo feature for this prototype.',
  },
];

export default function Help() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">Help & Support</h1>
      <p className="text-sm text-gray-500 mb-6">Frequently asked questions about GovConnect.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
          {FAQS.map((f, idx) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-navy-900">{f.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openIdx === idx && <p className="px-4 pb-4 text-sm text-gray-600">{f.a}</p>}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 h-fit">
          <h3 className="font-heading font-semibold text-navy-900 mb-3">Contact Support</h3>
          <p className="text-sm text-gray-500 mb-4">Mock support contact for this prototype.</p>
          <div className="flex items-center gap-2 text-sm text-navy-800 mb-2">
            <Mail size={16} /> support@govconnect-demo.in
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-800">
            <Phone size={16} /> 1800-000-0000 (Demo)
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
