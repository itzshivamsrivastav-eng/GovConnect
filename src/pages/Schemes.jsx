import { useMemo, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';
import { getRankedSchemes } from '../services/schemeApi';
import { useLanguage } from '../context/LanguageContext';

export default function Schemes() {
  const { t } = useLanguage();

  const ranked = getRankedSchemes();

  const categories = useMemo(
    () => ['All', ...new Set(ranked.map((r) => r.scheme.category))],
    [ranked]
  );

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = ranked.filter(({ scheme }) => {
    const matchesQuery =
      !query.trim() ||
      scheme.name.toLowerCase().includes(query.toLowerCase()) ||
      scheme.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      category === 'All' || scheme.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        {t('governmentSchemes')}
      </h1>

      <p className="text-sm text-gray-500 mb-2">
        {t('schemesPrototypeDescription')}
      </p>

      <p className="text-xs text-gray-400 mb-6">
        {t('eligibilityEstimateDescription')}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchSchemes')}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? t('all') : c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={t('noSchemesFound')}
          description={t('tryDifferentSearch')}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(({ scheme, match }) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              match={match}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}