import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  CheckCircle2,
  Clock3,
  FileText,
  AlertCircle,
  Check,
  Accessibility,
  Languages,
} from 'lucide-react';

import { getCurrentUser, logout } from '../services/authApi';
import { getApplications } from '../services/applicationApi';
import { useLanguage } from '../context/LanguageContext';

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/services',
    label: 'digitalServices',
    icon: Landmark,
  },
  {
    to: '/schemes',
    label: 'governmentSchemes',
    icon: Award,
  },
  {
    to: '/applications',
    label: 'myApplications',
    icon: ClipboardList,
  },
  {
    to: '/consent',
    label: 'consentCenter',
    icon: ShieldCheck,
  },
  {
    to: '/grievances',
    label: 'grievances',
    icon: MessageSquareWarning,
  },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [readNotifications, setReadNotifications] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('govconnect_read_notifications') || '[]'
      );
    } catch {
      return [];
    }
  });

  const notificationRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const { language, toggleLanguage, t } = useLanguage();

  /*
   * ============================================================
   * APPLICATIONS
   * ============================================================
   */

  const applications = useMemo(() => {
    return getApplications() || [];
  }, [location.pathname]);

  /*
   * ============================================================
   * NOTIFICATIONS
   * ============================================================
   */

  const notifications = useMemo(() => {
    return applications
      .map((application) => {
        let title = 'applicationUpdated';
        let icon = FileText;
        let iconBg = 'bg-blue-50';
        let iconColor = 'text-blue-600';

        const status = String(application.status || '').toLowerCase();

        if (status === 'approved') {
          title = 'applicationApproved';
          icon = CheckCircle2;
          iconBg = 'bg-emerald-50';
          iconColor = 'text-emerald-600';
        } else if (status === 'submitted') {
          title = 'applicationSubmitted';
          icon = FileText;
          iconBg = 'bg-blue-50';
          iconColor = 'text-blue-600';
        } else if (
          status === 'processing' ||
          status === 'under review'
        ) {
          title = 'applicationUpdated';
          icon = Clock3;
          iconBg = 'bg-amber-50';
          iconColor = 'text-amber-600';
        } else if (status === 'rejected') {
          title = 'applicationUpdate';
          icon = AlertCircle;
          iconBg = 'bg-red-50';
          iconColor = 'text-red-600';
        }

        return {
          id: `${application.id}-${application.status}-${application.lastUpdated}`,
          applicationId: application.id,
          title,
          message: application.name || t('applications'),
          status: application.status || 'Updated',
          date: application.lastUpdated || application.submittedDate,
          icon,
          iconBg,
          iconColor,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.date || 0) -
          new Date(a.date || 0)
      );
  }, [applications, t]);

  /*
   * ============================================================
   * UNREAD COUNT
   * ============================================================
   */

  const unreadCount = notifications.filter(
    (notification) =>
      !readNotifications.includes(notification.id)
  ).length;

  /*
   * ============================================================
   * SAVE READ NOTIFICATIONS
   * ============================================================
   */

  useEffect(() => {
    localStorage.setItem(
      'govconnect_read_notifications',
      JSON.stringify(readNotifications)
    );
  }, [readNotifications]);

  /*
   * ============================================================
   * CLOSE NOTIFICATION DROPDOWN
   * ============================================================
   */

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    );

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );

      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, []);

  /*
   * ============================================================
   * MARK AS READ
   * ============================================================
   */

  function markAsRead(notificationId) {
    setReadNotifications((current) => {
      if (current.includes(notificationId)) {
        return current;
      }

      return [...current, notificationId];
    });
  }

  function markAllAsRead() {
    setReadNotifications(
      notifications.map(
        (notification) => notification.id
      )
    );
  }

  /*
   * ============================================================
   * NOTIFICATION CLICK
   * ============================================================
   */

  function handleNotificationClick(notification) {
    markAsRead(notification.id);
    setNotificationsOpen(false);

    navigate(
      `/applications/${notification.applicationId}`
    );
  }

  /*
   * ============================================================
   * DATE FORMAT
   * ============================================================
   */

  function formatNotificationDate(date) {
    if (!date) {
      return t('recently');
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return t('recently');
    }

    return parsedDate.toLocaleDateString(
      language === 'hi' ? 'hi-IN' : 'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );
  }

  /*
   * ============================================================
   * ACTIVE NAVIGATION
   * ============================================================
   */

  function isActive(to, end = false) {
    if (end) {
      return location.pathname === to;
    }

    return (
      location.pathname === to ||
      location.pathname.startsWith(`${to}/`)
    );
  }

  /*
   * ============================================================
   * LOGOUT
   * ============================================================
   */

  function handleLogout() {
    logout();
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen bg-govgray-100">

      {/* =====================================================
          MOBILE BRAND BAR
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
                {t('citizenPortal')}
              </p>
            </div>

          </Link>

          <button
            type="button"
            onClick={() =>
              setSidebarOpen((open) => !open)
            }
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
                {t('citizenPortal')}
              </p>

            </div>

          </Link>

        </div>

        {/* Section title */}

        <div className="px-5 pt-6 pb-2">

          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/40">
            {t('citizenServices')}
          </p>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-3 pb-5">

          <div className="space-y-1">

            {NAV_ITEMS.map(
              ({
                to,
                label,
                icon: Icon,
                end,
              }) => {

                const active = isActive(to, end);

                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() =>
                      setSidebarOpen(false)
                    }
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
                      {t(label)}
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

          {/* Help */}

          <div className="mt-6 pt-5 border-t border-white/10">

            <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-white/40">
              {t('assistance')}
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
                {t('helpSupportNav')}
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
                {t('logout')}
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
                  {t('secureTrusted')}
                </p>

                <p className="text-[10px] text-white/50 mt-0.5">
                  {t('dataProtected')}
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

        {/* ===================================================
            GLOBAL UTILITY BAR
            Language + Accessibility available on every page
        ==================================================== */}

        <div className="sticky top-0 z-40 bg-navy-900 text-white border-b border-white/10">

          <div className="min-h-9 px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">

            <span className="hidden sm:block text-white/60">
              {t('governmentServicesPortal')}
            </span>

            <div className="ml-auto flex items-center gap-4">

              {/* Accessibility */}

              <span className="flex items-center gap-1.5 text-white/70">

                <Accessibility size={13} />

                <span>
                  {t('accessibility')}
                </span>

              </span>

              {/* Language */}

              <button
                type="button"
                onClick={toggleLanguage}
                className="
                  flex
                  items-center
                  gap-1.5
                  text-white/80
                  hover:text-white
                  transition-colors
                  cursor-pointer
                "
                aria-label={t('language')}
                title={t('language')}
              >

                <Languages size={13} />

                <span>
                  {language === 'en'
                    ? 'English'
                    : 'हिंदी'}
                </span>

                <span className="text-white/30">
                  |
                </span>

                <span>
                  {language === 'en'
                    ? 'हिंदी'
                    : 'English'}
                </span>

              </button>

            </div>

          </div>

        </div>

        {/* ===================================================
            MAIN HEADER
        ==================================================== */}

        <header className="sticky top-9 z-30 bg-navy-900 border-b border-navy-800">

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
                      {t('citizenPortal')}
                    </p>

                  </div>

                  <h1 className="mt-1 text-lg sm:text-xl font-heading font-bold text-white truncate">
                    {t('governmentServicesSchemes')}
                  </h1>

                  <p className="hidden md:block text-xs text-white/60 mt-0.5">
                    {t('discoverApplyTrack')}
                  </p>

                </div>

              </div>

              {/* Right */}

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                {/* =================================================
                    NOTIFICATIONS
                ================================================= */}

                <div
                  ref={notificationRef}
                  className="relative"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationsOpen(
                        (open) => !open
                      )
                    }
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
                    aria-label={t('notifications')}
                    title={t('notifications')}
                  >

                    <Bell
                      size={18}
                      className={
                        notificationsOpen
                          ? 'text-saffron-400'
                          : 'text-white'
                      }
                    />

                    {unreadCount > 0 && (
                      <span className="
                        absolute
                        -top-1
                        -right-1
                        min-w-[18px]
                        h-[18px]
                        px-1
                        rounded-full
                        bg-saffron-500
                        text-navy-900
                        text-[9px]
                        font-bold
                        flex
                        items-center
                        justify-center
                        border-2
                        border-navy-900
                      ">
                        {unreadCount > 9
                          ? '9+'
                          : unreadCount}
                      </span>
                    )}

                  </button>

                  {/* =================================================
                      NOTIFICATION DROPDOWN
                  ================================================= */}

                  {notificationsOpen && (
                    <div
                      className="
                        absolute
                        right-0
                        top-[calc(100%+12px)]
                        w-[360px]
                        max-w-[calc(100vw-2rem)]
                        bg-white
                        rounded-2xl
                        border
                        border-gray-200
                        shadow-2xl
                        overflow-hidden
                        z-[70]
                      "
                    >

                      {/* Header */}

                      <div className="px-4 py-3.5 border-b border-gray-100">

                        <div className="flex items-center justify-between gap-3">

                          <div>

                            <div className="flex items-center gap-2">

                              <h3 className="text-sm font-bold text-gray-900">
                                {t('notifications')}
                              </h3>

                              {unreadCount > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full bg-saffron-50 text-saffron-700 text-[10px] font-bold">
                                  {unreadCount} {t('new')}
                                </span>
                              )}

                            </div>

                            <p className="text-[11px] text-gray-500 mt-0.5">
                              {t('updatesApplications')}
                            </p>

                          </div>

                          {unreadCount > 0 && (
                            <button
                              type="button"
                              onClick={markAllAsRead}
                              className="
                                flex
                                items-center
                                gap-1
                                text-[11px]
                                font-semibold
                                text-navy-700
                                hover:text-saffron-600
                                transition-colors
                              "
                            >
                              <Check size={13} />
                              {t('markAllRead')}
                            </button>
                          )}

                        </div>

                      </div>

                      {/* Notification List */}

                      <div className="max-h-[390px] overflow-y-auto">

                        {notifications.length === 0 ? (

                          <div className="px-6 py-10 text-center">

                            <div className="mx-auto h-11 w-11 rounded-full bg-gray-100 flex items-center justify-center">

                              <Bell
                                size={19}
                                className="text-gray-400"
                              />

                            </div>

                            <p className="mt-3 text-sm font-semibold text-gray-800">
                              {t('noNotifications')}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {t('noApplicationUpdates')}
                            </p>

                          </div>

                        ) : (

                          notifications.map(
                            (notification) => {

                              const Icon =
                                notification.icon;

                              const isUnread =
                                !readNotifications.includes(
                                  notification.id
                                );

                              return (
                                <button
                                  key={notification.id}
                                  type="button"
                                  onClick={() =>
                                    handleNotificationClick(
                                      notification
                                    )
                                  }
                                  className={`
                                    w-full
                                    text-left
                                    px-4
                                    py-3.5
                                    flex
                                    gap-3
                                    border-b
                                    border-gray-100
                                    transition-colors
                                    ${
                                      isUnread
                                        ? 'bg-saffron-50/40 hover:bg-saffron-50'
                                        : 'bg-white hover:bg-gray-50'
                                    }
                                  `}
                                >

                                  {/* Icon */}

                                  <div
                                    className={`
                                      h-9
                                      w-9
                                      rounded-lg
                                      ${notification.iconBg}
                                      flex
                                      items-center
                                      justify-center
                                      shrink-0
                                    `}
                                  >

                                    <Icon
                                      size={17}
                                      className={
                                        notification.iconColor
                                      }
                                    />

                                  </div>

                                  {/* Content */}

                                  <div className="min-w-0 flex-1">

                                    <div className="flex items-start justify-between gap-2">

                                      <p className="text-xs font-bold text-gray-900">
                                        {t(notification.title)}
                                      </p>

                                      {isUnread && (
                                        <span className="h-2 w-2 rounded-full bg-saffron-500 shrink-0 mt-1" />
                                      )}

                                    </div>

                                    <p className="text-xs text-gray-600 mt-1 truncate">
                                      {notification.message}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1.5">

                                      <span className="text-[10px] text-gray-400">
                                        {notification.status}
                                      </span>

                                      <span className="h-1 w-1 rounded-full bg-gray-300" />

                                      <span className="text-[10px] text-gray-400">
                                        {formatNotificationDate(
                                          notification.date
                                        )}
                                      </span>

                                    </div>

                                  </div>

                                </button>
                              );
                            }
                          )

                        )}

                      </div>

                      {/* Footer */}

                      {notifications.length > 0 && (
                        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">

                          <button
                            type="button"
                            onClick={() => {
                              setNotificationsOpen(false);
                              navigate('/applications');
                            }}
                            className="
                              w-full
                              text-center
                              text-xs
                              font-semibold
                              text-navy-800
                              hover:text-saffron-600
                              transition-colors
                            "
                          >
                            {t('viewAllApplications')}
                          </button>

                        </div>
                      )}

                    </div>
                  )}

                </div>

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
                      {t('viewProfile')}
                    </p>

                  </div>

                </Link>

              </div>

            </div>

          </div>

        </header>

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="min-h-[calc(100vh-124px)] bg-govgray-100">

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}