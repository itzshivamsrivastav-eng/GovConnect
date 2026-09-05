import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Menu,
  X,
  HelpCircle,
  Bell,
  UserCircle,
  LayoutDashboard,
  Landmark,
  Award,
  ClipboardList,
  ShieldCheck,
  MessageSquareWarning,
  ChevronRight,
  LogOut,
} from 'lucide-react';

import {
  getCurrentUser,
  logout,
} from '../services/authApi';

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/services',
    label: 'Digital Services',
    icon: Landmark,
  },
  {
    to: '/schemes',
    label: 'Government Schemes',
    icon: Award,
  },
  {
    to: '/applications',
    label: 'My Applications',
    icon: ClipboardList,
  },
  {
    to: '/consent',
    label: 'Consent Center',
    icon: ShieldCheck,
  },
  {
    to: '/grievances',
    label: 'Grievances',
    icon: MessageSquareWarning,
  },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const user = getCurrentUser();

  function isActive(to, end = false) {
    if (end) {
      return location.pathname === to;
    }

    return (
      location.pathname === to ||
      location.pathname.startsWith(`${to}/`)
    );
  }

  function handleLogout() {
    logout();
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen bg-govgray-100">

      {/* =====================================================
          MOBILE TOP BAR
      ====================================================== */}

      <div className="lg:hidden sticky top-0 z-50 bg-navy-900 text-white border-b border-white/10">
        <div className="h-16 px-4 flex items-center justify-between">

          <Link
            to="/dashboard"
            className="flex items-center gap-2"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="h-9 w-9 rounded-lg bg-saffron-500 flex items-center justify-center">
              <Landmark size={20} />
            </div>

            <div>
              <p className="font-heading font-bold text-base leading-none">
                GovConnect
              </p>

              <p className="text-[10px] text-white/60 mt-1">
                Citizen Portal
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-white/10"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>
      </div>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-navy-900
          text-white
          flex
          flex-col
          transform
          transition-transform
          duration-200
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* Logo */}

        <div className="h-20 px-5 flex items-center border-b border-white/10">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >

            <div className="h-11 w-11 rounded-xl bg-saffron-500 flex items-center justify-center shadow-sm">
              <Landmark size={23} />
            </div>

            <div>
              <p className="font-heading text-xl font-bold tracking-tight">
                GovConnect
              </p>

              <p className="text-xs text-white/60 mt-0.5">
                Citizen Portal
              </p>
            </div>

          </Link>

        </div>

        {/* Section title */}

        <div className="px-5 pt-6 pb-2">
          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/40">
            Citizen Services
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-3 pb-5">

          <div className="space-y-1">

            {NAV_ITEMS.map(
              ({ to, label, icon: Icon, end }) => {

                const active = isActive(to, end);

                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      gap-3
                      min-h-[46px]
                      px-3
                      rounded-lg
                      text-sm
                      font-medium
                      transition-all
                      ${
                        active
                          ? 'bg-white text-navy-900 shadow-sm'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >

                    {active && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-saffron-500" />
                    )}

                    <Icon
                      size={18}
                      className={
                        active
                          ? 'text-saffron-600'
                          : 'text-white/60 group-hover:text-white'
                      }
                    />

                    <span className="flex-1">
                      {label}
                    </span>

                    {active && (
                      <ChevronRight
                        size={15}
                        className="text-navy-400"
                      />
                    )}

                  </Link>
                );
              }
            )}

          </div>

          {/* Help & Support */}

          <div className="mt-6 pt-5 border-t border-white/10">

            <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-white/40">
              Assistance
            </p>

            <Link
              to="/help"
              onClick={() => setSidebarOpen(false)}
              className={`
                flex
                items-center
                gap-3
                min-h-[46px]
                px-3
                rounded-lg
                text-sm
                font-medium
                transition-colors
                ${
                  isActive('/help')
                    ? 'bg-white text-navy-900'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >

              <HelpCircle
                size={18}
                className={
                  isActive('/help')
                    ? 'text-saffron-600'
                    : 'text-white/60'
                }
              />

              <span>
                Help & Support
              </span>

            </Link>

            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              className="
                group
                w-full
                flex
                items-center
                gap-3
                min-h-[46px]
                px-3
                mt-1
                rounded-lg
                text-sm
                font-medium
                text-white/70
                hover:bg-red-500/10
                hover:text-red-300
                transition-colors
              "
            >

              <LogOut
                size={18}
                className="text-white/60 group-hover:text-red-300"
              />

              <span>
                Logout
              </span>

            </button>

          </div>

        </nav>

        {/* Sidebar footer */}

        <div className="p-4 border-t border-white/10">

          <div className="rounded-xl bg-white/5 border border-white/10 p-3">

            <div className="flex items-center gap-3">

              <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">

                <ShieldCheck
                  size={18}
                  className="text-saffron-400"
                />

              </div>

              <div className="min-w-0">

                <p className="text-xs font-semibold text-white">
                  Secure & Trusted
                </p>

                <p className="text-[10px] text-white/50 mt-0.5">
                  Your data stays protected
                </p>

              </div>

            </div>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div className="lg:ml-72 min-h-screen">

        {/* Header */}

        <header className="sticky top-0 z-30 bg-navy-900 border-b border-navy-800">

          <div className="min-h-[88px] px-4 sm:px-6 lg:px-8 flex items-center">

            <div className="w-full flex items-center justify-between gap-6">

              {/* Left */}

              <div className="flex items-center gap-4 min-w-0">

                <div className="hidden sm:flex h-11 w-11 rounded-xl bg-white/10 border border-white/10 items-center justify-center">

                  <Landmark
                    size={21}
                    className="text-saffron-400"
                  />

                </div>

                <div className="min-w-0">

                  <div className="flex items-center gap-2">

                    <p className="text-xs font-semibold uppercase tracking-wide text-saffron-400">
                      GovConnect
                    </p>

                    <span className="text-white/30">
                      /
                    </span>

                    <p className="text-xs text-white/60">
                      Citizen Portal
                    </p>

                  </div>

                  <h1 className="mt-1 text-lg sm:text-xl font-heading font-bold text-white truncate">
                    Government Services & Schemes
                  </h1>

                  <p className="hidden md:block text-xs text-white/60 mt-0.5">
                    Discover, apply and track government services from one place.
                  </p>

                </div>

              </div>

              {/* Right */}

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                {/* Notifications */}

                <Link
                  to="/notifications"
                  className="
                    relative
                    h-10
                    w-10
                    rounded-lg
                    bg-white/10
                    border
                    border-white/15
                    flex
                    items-center
                    justify-center
                    text-white
                    hover:bg-white/15
                    transition-colors
                  "
                  aria-label="Updates"
                  title="Updates"
                >

                  <Bell size={18} />

                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-saffron-500 border-2 border-navy-900" />

                </Link>

                {/* Divider */}

                <div className="hidden sm:block h-8 w-px bg-white/15" />

                {/* Profile */}

                <Link
                  to="/profile"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-white/10
                    border
                    border-white/15
                    px-2.5
                    py-1.5
                    hover:bg-white/15
                    transition-colors
                  "
                >

                  <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">

                    <UserCircle
                      size={21}
                      className="text-white"
                    />

                  </div>

                  <div className="hidden sm:block text-left">

                    <p className="text-sm font-semibold text-white leading-tight">
                      {user?.name || 'Citizen'}
                    </p>

                    <p className="text-[11px] text-white/60 mt-0.5">
                      View Profile
                    </p>

                  </div>

                </Link>

              </div>

            </div>

          </div>

        </header>

        {/* Page Content */}

        <main className="min-h-[calc(100vh-88px)] bg-govgray-100">

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}