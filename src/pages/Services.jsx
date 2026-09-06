import { useMemo, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ServiceCard from '../components/ServiceCard';
import EmptyState from '../components/EmptyState';
import { getServices } from '../services/serviceApi';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = getServices();

  const categories = useMemo(
    () => ['All', ...new Set(services.map((s) => s.category))],
    [services]
  );

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = services.filter((s) => {
    const matchesQuery =
      !query.trim() ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      category === 'All' || s.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        {t('digitalServices')}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {t('digitalServicesDescription')}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchDigitalServices')}
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
          title={t('noServicesFound')}
          description={t('tryDifferentSearch')}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}