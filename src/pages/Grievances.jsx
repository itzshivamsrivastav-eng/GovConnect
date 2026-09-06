import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatusBadge from '../components/StatusBadge';
import { getGrievances, addGrievance } from '../services/grievanceApi';
import { getCurrentUser } from '../services/authApi';
import { useToast } from '../components/ToastContext';
import { formatDate } from '../utils/format';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES = [
  { value: 'Application Delay', labelKey: 'applicationDelay' },
  { value: 'Incorrect Information', labelKey: 'incorrectInformation' },
  { value: 'Portal Access Issue', labelKey: 'portalAccessIssue' },
  { value: 'Document Issue', labelKey: 'documentIssue' },
  { value: 'Other', labelKey: 'other' },
];

export default function Grievances() {
  const { t } = useLanguage();

  const user = getCurrentUser();
  const [list, setList] = useState(getGrievances());
  const [form, setForm] = useState({
    name: user?.name || '',
    category: CATEGORIES[0].value,
    description: '',
  });

  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.description.trim()) return;

    const g = addGrievance(form);

    setList((prev) => [g, ...prev]);
    setForm((f) => ({ ...f, description: '' }));

    showToast(t('grievanceFiledSuccessfully'));
  }

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        {t('grievances')}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {t('grievancesDescription')}
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold text-navy-900 mb-3">
            {t('myGrievances')}
          </h2>

          <div className="space-y-3">
            {list.map((g) => (
              <div
                key={g.id}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <p className="text-sm font-medium text-navy-900">
                    {g.category}
                  </p>

                  <StatusBadge status={g.status} />
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  {g.description}
                </p>

                <p className="text-xs text-gray-400">
                  {g.id} · {formatDate(g.date)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 h-fit">
          <h3 className="font-heading font-semibold text-navy-900 mb-3">
            {t('fileGrievance')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('name')}
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('category')}
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {t(c.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('description')}
              </label>

              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    description: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-4 py-2.5 min-h-[44px]"
            >
              {t('fileGrievance')}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}