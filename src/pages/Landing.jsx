import { Link } from 'react-router-dom';
import { UserCircle, Sparkles, LayoutDashboard } from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

const VALUE_PROPS = [
  {
    icon: UserCircle,
    title: 'One Profile',
    description: 'Enter your common information once and reuse it across government services and schemes.',
  },
  {
    icon: Sparkles,
    title: 'Smart Scheme Discovery',
    description: 'Find government schemes you may be eligible for, based on your saved profile.',
  },
  {
    icon: LayoutDashboard,
    title: 'One Tracking Place',
    description: 'Track applications from different government services and schemes in one dashboard.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-navy-900 mb-4 leading-tight">
            One Profile. <span className="text-saffron-600">Every</span> Government Service.
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Discover government services and schemes, manage your information once, and track your applications
            from one place.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar large />
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/login"
              className="rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-6 py-3 min-h-[44px] flex items-center"
            >
              Get Started
            </Link>
            <Link
              to="/services"
              className="rounded-lg border border-navy-200 text-navy-800 hover:bg-navy-50 transition-colors font-semibold px-6 py-3 min-h-[44px] flex items-center"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 grid gap-6 sm:grid-cols-3">
        {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="rounded-lg bg-navy-50 p-3 w-fit mb-4">
              <Icon size={22} className="text-navy-700" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-navy-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        ))}
      </section>

      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} GovConnect — Smart India Hackathon prototype.</p>
          <p className="text-xs text-gray-400 text-center sm:text-right max-w-md">
            This is a demo prototype built for SIH. It does not perform real Aadhaar, DigiLocker, or government
            database integration — all data shown is simulated using mock data and your browser's local storage.
          </p>
        </div>
      </footer>
    </div>
  );
}
