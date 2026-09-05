import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  Landmark,
  Award,
  ClipboardList,
  FileText,
  ShieldCheck,
  MessageSquareWarning,
  HelpCircle,
} from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/profile', label: 'My Profile', icon: UserCircle },
  { to: '/services', label: 'Digital Services', icon: Landmark },
  { to: '/schemes', label: 'Government Schemes', icon: Award },
  { to: '/applications', label: 'My Applications', icon: ClipboardList },
  { to: '/documents', label: 'My Documents', icon: FileText },
  { to: '/consent', label: 'Consent Center', icon: ShieldCheck },
  { to: '/grievances', label: 'Grievances', icon: MessageSquareWarning },
  { to: '/help', label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
              isActive ? 'bg-navy-800 text-white' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-900'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
