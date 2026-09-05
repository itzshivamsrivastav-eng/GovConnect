import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LandmarkIcon, Accessibility, Languages } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Digital Services' },
  { to: '/schemes', label: 'Schemes' },
  { to: '/applications', label: 'Track Applications' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">

      {/* Government-style utility strip */}
      <div className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-8 flex items-center justify-between text-xs">
          
          <span className="hidden sm:block text-white/80">
            Digital Government Services Portal
          </span>

          <div className="ml-auto flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1.5">
              <Accessibility size={13} />
              Accessibility
            </span>

            <span className="hidden sm:flex items-center gap-1.5">
              <Languages size={13} />
              English
            </span>
          </div>

        </div>
      </div>

      {/* Main navigation */}
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
              One Profile. Every Government Service.
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center h-full gap-7">

          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
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
                  {l.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-saffron-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Login */}
          <Link
            to="/login"
            className="flex items-center justify-center min-h-[42px] px-5 rounded-md bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            Login
          </Link>

        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-navy-900 border border-gray-200 rounded-md hover:bg-gray-50"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>

      </div>

      {/* Mobile navigation */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">

          <div className="px-4 py-3 flex flex-col gap-1">

            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium min-h-[46px] flex items-center rounded-md ${
                    isActive
                      ? 'bg-navy-50 text-navy-900 border-l-4 border-saffron-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-navy-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center min-h-[46px] px-4 py-3 rounded-md bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold"
            >
              Login
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}