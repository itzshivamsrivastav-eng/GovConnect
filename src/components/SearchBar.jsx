import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Landmark,
  Award,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { searchServices } from '../services/serviceApi';
import { searchSchemes } from '../services/schemeApi';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'services', label: 'Digital Services' },
  { key: 'schemes', label: 'Schemes' },
];

export default function SearchBar({
  placeholder = 'Search services or schemes...',
  large = false,
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const serviceResults =
    filter === 'schemes' ? [] : searchServices(query);

  const schemeResults =
    filter === 'services' ? [] : searchSchemes(query);

  const hasResults =
    serviceResults.length > 0 || schemeResults.length > 0;

  function goTo(path) {
    setOpen(false);
    setQuery('');
    navigate(path);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      {/* ================= SEARCH INPUT ================= */}
      <div
        className={`relative flex items-stretch ${
          large ? 'min-h-[58px]' : 'min-h-[46px]'
        }`}
      >
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Search
            size={large ? 21 : 18}
            strokeWidth={2}
            className="text-navy-500"
          />
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Search government services and schemes"
          className={`
            w-full
            rounded-l-md
            border
            border-gray-300
            bg-white
            pl-12
            pr-12
            text-navy-900
            placeholder:text-gray-400
            shadow-sm
            transition-all
            duration-150
            focus:outline-none
            focus:border-navy-700
            focus:ring-2
            focus:ring-saffron-200
            ${
              large
                ? 'py-4 text-base'
                : 'py-3 text-sm'
            }
          `}
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="
              absolute
              right-[120px]
              sm:right-[118px]
              top-1/2
              -translate-y-1/2
              flex
              items-center
              justify-center
              w-8
              h-8
              rounded-md
              text-gray-400
              hover:bg-gray-100
              hover:text-navy-800
              transition-colors
            "
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}

        {/* Search action */}
        <button
          type="button"
          onClick={() => setOpen(Boolean(query.trim()))}
          className={`
            hidden
            sm:flex
            items-center
            justify-center
            gap-2
            px-6
            rounded-r-md
            bg-navy-800
            hover:bg-navy-900
            text-white
            font-semibold
            transition-colors
            border
            border-navy-800
            ${
              large
                ? 'text-base'
                : 'text-sm'
            }
          `}
        >
          <Search size={17} />
          Search
        </button>
      </div>

      {/* ================= SEARCH RESULTS ================= */}
      {open && query.trim() && (
        <div
          className="
            absolute
            z-50
            mt-2
            w-full
            overflow-hidden
            rounded-lg
            border
            border-gray-200
            bg-white
            shadow-xl
          "
        >
          {/* ================= FILTER BAR ================= */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              border-b
              border-gray-200
              bg-gray-50
              px-4
              py-3
            "
          >
            <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Search in
            </span>

            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`
                  flex
                  items-center
                  gap-1.5
                  rounded-md
                  border
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  transition-all
                  duration-150
                  ${
                    filter === f.key
                      ? 'border-navy-800 bg-navy-800 text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-navy-300 hover:text-navy-800'
                  }
                `}
              >
                {f.label}

                {filter === f.key && (
                  <ChevronDown size={13} />
                )}
              </button>
            ))}
          </div>

          {/* ================= NO RESULTS ================= */}
          {!hasResults && (
            <div className="px-5 py-9 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                <Search
                  size={21}
                  className="text-gray-400"
                />
              </div>

              <p className="text-sm font-semibold text-navy-900">
                No results found
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Try searching for another government service or scheme.
              </p>
            </div>
          )}

          {/* ================= DIGITAL SERVICES ================= */}
          {serviceResults.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Digital Services
                </p>

                <span className="text-[11px] text-gray-400">
                  {serviceResults.length} result
                  {serviceResults.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-1">
                {serviceResults.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() =>
                      goTo(`/services/${s.id}`)
                    }
                    className="
                      group
                      w-full
                      flex
                      items-center
                      gap-3
                      rounded-md
                      px-3
                      py-3
                      text-left
                      hover:bg-navy-50
                      transition-colors
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        bg-navy-50
                        border
                        border-navy-100
                      "
                    >
                      <Landmark
                        size={18}
                        className="text-navy-700"
                      />
                    </div>

                    {/* Content */}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-navy-900 group-hover:text-navy-700">
                        {s.name}
                      </span>

                      <span className="mt-0.5 block truncate text-xs text-gray-500">
                        {s.department}
                      </span>
                    </span>

                    {/* Arrow */}
                    <ArrowRight
                      size={15}
                      className="
                        shrink-0
                        text-gray-300
                        transition-transform
                        group-hover:translate-x-0.5
                        group-hover:text-navy-600
                      "
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= GOVERNMENT SCHEMES ================= */}
          {schemeResults.length > 0 && (
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Government Schemes
                </p>

                <span className="text-[11px] text-gray-400">
                  {schemeResults.length} result
                  {schemeResults.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-1">
                {schemeResults.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() =>
                      goTo(`/schemes/${s.id}`)
                    }
                    className="
                      group
                      w-full
                      flex
                      items-center
                      gap-3
                      rounded-md
                      px-3
                      py-3
                      text-left
                      hover:bg-saffron-50
                      transition-colors
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        bg-saffron-50
                        border
                        border-saffron-100
                      "
                    >
                      <Award
                        size={18}
                        className="text-saffron-600"
                      />
                    </div>

                    {/* Content */}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-navy-900 group-hover:text-navy-700">
                        {s.name}
                      </span>

                      <span className="mt-0.5 block truncate text-xs text-gray-500">
                        {s.category}
                      </span>
                    </span>

                    {/* Arrow */}
                    <ArrowRight
                      size={15}
                      className="
                        shrink-0
                        text-gray-300
                        transition-transform
                        group-hover:translate-x-0.5
                        group-hover:text-saffron-600
                      "
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}