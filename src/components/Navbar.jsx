import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Menu,
  X,
  LandmarkIcon,
  Accessibility,
  Languages,
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { to: '/', label: t('Home') },
    { to: '/services', label: t('Digital Services') },
    { to: '/schemes', label: t('Schemes') },
    { to: '/applications', label: t('Track Applications') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">

      {/* Government utility strip */}
      <div className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-8 flex items-center justify-between text-xs">

          <span className="hidden sm:block text-white/80">
            {t('Digital Government Services Portal')}
          </span>

          <div className="ml-auto flex items-center gap-4 text-white/80">

            <span className="flex items-center gap-1.5">
              <Accessibility size={13} />
              {t('Accessibility')}
            </span>

            {/* Language Switch */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Change language"
            >
              <Languages size={13} />

              <span>
                {language === 'en' ? 'English' : 'हिंदी'}
              </span>

              <span className="text-white/40">|</span>

              <span>
                {language === 'en' ? 'हिंदी' : 'English'}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-[72px] flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="flex items-center justify-center w-10 h-10 border border-saffron-200 bg-saffron-50 rounded-md">
            <LandmarkIcon
              size={23}
              className="text-saffron-500"
              strokeWidth={2}
            />
          </div>

          <div className="flex flex-col leading-none">

            <span className="font-heading text-xl sm:text-2xl font-bold text-navy-900">
              GovConnect
            </span>

            <span className="hidden sm:block text-[10px] uppercase tracking-[0.12em] text-gray-500 mt-1">
              {t('One Profile')} • {t('Multiple Services')} • {t('A Smarter Tomorrow')}
            </span>

          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full gap-7">

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative h-full flex items-center text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-navy-900'
                    : 'text-gray-600 hover:text-navy-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-saffron-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="flex items-center justify-center min-h-[42px] px-5 rounded-md bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            {t('Login')}
          </Link>

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-navy-900 border border-gray-200 rounded-md hover:bg-gray-50"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">

          <div className="px-4 py-3 flex flex-col gap-1">

            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium min-h-[46px] flex items-center rounded-md ${
                    isActive
                      ? 'bg-navy-50 text-navy-900 border-l-4 border-saffron-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-navy-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center min-h-[46px] px-4 py-3 rounded-md bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold"
            >
              {t('Login')}
            </Link>

            {/* Mobile Language */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="mt-2 flex items-center justify-center gap-2 min-h-[46px] px-4 py-3 rounded-md border border-gray-200 text-navy-800 text-sm font-semibold hover:bg-gray-50"
            >
              <Languages size={17} />

              {language === 'en'
                ? 'हिंदी में बदलें'
                : 'Switch to English'}
            </button>

          </div>
        </div>
      )}

    </header>
  );
}