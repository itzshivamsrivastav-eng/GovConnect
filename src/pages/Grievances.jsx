import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatusBadge from '../components/StatusBadge';
import { getGrievances, addGrievance } from '../services/grievanceApi';
import { getCurrentUser } from '../services/authApi';
import { useToast } from '../components/ToastContext';
import { formatDate } from '../utils/format';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES = [
  {
    value: 'Incorrect Information',
    labelKey: 'incorrectInformation',
  },
  {
    value: 'Portal Access Issue',
    labelKey: 'portalAccessIssue',
  },
  {
    value: 'Custom',
    labelKey: 'custom',
  },
];

export default function Grievances() {
  const user = getCurrentUser();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [list, setList] = useState(() => getGrievances());

  const [form, setForm] = useState({
    name: user?.name || '',
    category: 'Incorrect Information',
    customCategory: '',
    description: '',
  });

  function handleSubmit(e) {
    e.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      showToast(t('enterFullNameError'));
      return;
    }

    if (form.category === 'Custom' && !form.customCategory.trim()) {
      showToast(t('customCategoryRequired'));
      return;
    }

    if (!description) {
      showToast(t('descriptionRequired'));
      return;
    }

    const finalCategory =
      form.category === 'Custom'
        ? form.customCategory.trim()
        : form.category;

    const grievance = addGrievance({
      name,
      category: finalCategory,
      description,
    });

    if (!grievance) {
      showToast(t('grievanceSubmitError'));
      return;
    }

    setList((prev) => [grievance, ...prev]);

    setForm((prev) => ({
      ...prev,
      description: '',
      customCategory: '',
    }));

    showToast(t('grievanceFiledSuccessfully'));
  }

  function getCategoryLabel(category) {
    const predefined = CATEGORIES.find(
      (item) => item.value === category
    );

    if (predefined) {
      return t(predefined.labelKey);
    }

    return category;
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
        {/* My Grievances */}
        <div className="lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold text-navy-900 mb-3">
            {t('myGrievances')}
          </h2>

          {list.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-sm text-gray-500">
                {t('noGrievancesYet')}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {list.map((g) => (
                <div
                  key={g.id}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <p className="text-sm font-medium text-navy-900">
                      {getCategoryLabel(g.category)}
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
          )}
        </div>

        {/* File Grievance */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 h-fit">
          <h3 className="font-heading font-semibold text-navy-900 mb-3">
            {t('fileGrievance')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('name')}
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                placeholder={t('enterFullName')}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('category')}
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                    customCategory:
                      e.target.value === 'Custom'
                        ? prev.customCategory
                        : '',
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              >
                {CATEGORIES.map((category) => (
                  <option
                    key={category.value}
                    value={category.value}
                  >
                    {t(category.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Category */}
            {form.category === 'Custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('customCategory')}
                </label>

                <input
                  type="text"
                  value={form.customCategory}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      customCategory: e.target.value,
                    }))
                  }
                  placeholder={t('enterCustomCategory')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('description')}
              </label>

              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your grievance..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 resize-none"
              />
            </div>

            {/* Submit */}
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