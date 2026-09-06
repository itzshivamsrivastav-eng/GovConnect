import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getProfile, setProfile } from '../services/profileApi';
import { getCurrentUser } from '../services/authApi';
import { useToast } from '../components/ToastContext';
import { useLanguage } from '../context/LanguageContext';

const EMPTY_PROFILE = {
  fullName: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: '',
  mobile: '',
  email: '',

  address: '',
  state: '',
  district: '',
  city: '',
  pincode: '',

  educationLevel: '',
  institutionName: '',
  course: '',
  studentStatus: '',

  occupation: '',
  employmentType: '',

  annualIncome: '',
  incomeCategory: '',

  category: '',
  maritalStatus: '',
};

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
      />
    </div>
  );
}

function Select({ label, options, optionLabels, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <select
        {...props}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
      >
        <option value="">{optionLabels?.select || 'Select'}</option>

        {options.map((option, index) => (
          <option key={option} value={option}>
            {optionLabels?.options?.[index] || option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 mb-5">
      <h3 className="font-heading font-semibold text-navy-900 mb-4">
        {title}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  const { t } = useLanguage();

  const currentUser = getCurrentUser();
  const savedProfile = getProfile();

  /*
    Profile normally comes from localStorage.

    If no profile exists, create a blank profile and
    auto-fill only the information entered during login.
  */

  const initialProfile = savedProfile || {
    ...EMPTY_PROFILE,
    fullName: currentUser?.name || '',
    mobile: currentUser?.mobile || '',
    email: currentUser?.email || '',
  };

  const [form, setForm] = useState({
    ...EMPTY_PROFILE,
    ...initialProfile,
  });

  const { showToast } = useToast();

  function update(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setProfile(form);

    showToast(t('profileSavedMessage'));
  }

  const genderOptions = ['Male', 'Female', 'Other'];

  const educationOptions = [
    'Below Class 10',
    'Class 10',
    'Class 12',
    'ITI',
    'Diploma',
    'Undergraduate',
    'Graduate',
    'Postgraduate',
  ];

  const studentStatusOptions = ['Yes', 'No'];

  const employmentOptions = [
    'Not Employed',
    'Salaried',
    'Self-Employed',
    'Business Owner',
    'Farmer',
    'Other',
  ];

  const incomeOptions = [
    'Below ₹2.5 Lakh',
    '₹2.5-5 Lakh',
    '₹5-10 Lakh',
    'Above ₹10 Lakh',
  ];

  const categoryOptions = [
    'General',
    'OBC',
    'SC',
    'ST',
    'EWS',
  ];

  const maritalOptions = [
    'Unmarried',
    'Married',
    'Widowed',
    'Divorced',
  ];

  return (
    <DashboardLayout>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        {t('myProfile')}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {t('profileDescription')}
      </p>

      <form onSubmit={handleSubmit}>
        {/* PERSONAL INFORMATION */}
        <Section title={t('personalInformation')}>
          <Field
            label={t('fullName')}
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
          />

          <Field
            label={t('fatherName')}
            value={form.fatherName}
            onChange={(e) => update('fatherName', e.target.value)}
          />

          <Field
            label={t('motherName')}
            value={form.motherName}
            onChange={(e) => update('motherName', e.target.value)}
          />

          <Field
            label={t('dateOfBirth')}
            type="date"
            value={form.dob}
            onChange={(e) => update('dob', e.target.value)}
          />

          <Select
            label={t('gender')}
            options={genderOptions}
            optionLabels={{
              select: t('select'),
              options: [
                t('male'),
                t('female'),
                t('other'),
              ],
            }}
            value={form.gender}
            onChange={(e) => update('gender', e.target.value)}
          />

          <Field
            label={t('mobileNumber')}
            value={form.mobile}
            onChange={(e) => update('mobile', e.target.value)}
          />

          <Field
            label={t('email')}
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </Section>

        {/* ADDRESS */}
        <Section title={t('address')}>
          <Field
            label={t('address')}
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
          />

          <Field
            label={t('state')}
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
          />

          <Field
            label={t('district')}
            value={form.district}
            onChange={(e) => update('district', e.target.value)}
          />

          <Field
            label={t('cityVillage')}
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
          />

          <Field
            label={t('pinCode')}
            value={form.pincode}
            onChange={(e) => update('pincode', e.target.value)}
          />
        </Section>

        {/* EDUCATION */}
        <Section title={t('education')}>
          <Select
            label={t('educationLevel')}
            options={educationOptions}
            optionLabels={{
              select: t('select'),
              options: [
                t('belowClass10'),
                t('class10'),
                t('class12'),
                t('iti'),
                t('diploma'),
                t('undergraduate'),
                t('graduate'),
                t('postgraduate'),
              ],
            }}
            value={form.educationLevel}
            onChange={(e) =>
              update('educationLevel', e.target.value)
            }
          />

          <Field
            label={t('institutionName')}
            value={form.institutionName}
            onChange={(e) =>
              update('institutionName', e.target.value)
            }
          />

          <Field
            label={t('courseClass')}
            value={form.course}
            onChange={(e) => update('course', e.target.value)}
          />

          <Select
            label={t('studentStatus')}
            options={studentStatusOptions}
            optionLabels={{
              select: t('select'),
              options: [t('yes'), t('no')],
            }}
            value={form.studentStatus}
            onChange={(e) =>
              update('studentStatus', e.target.value)
            }
          />
        </Section>

        {/* EMPLOYMENT */}
        <Section title={t('employment')}>
          <Field
            label={t('occupation')}
            value={form.occupation}
            onChange={(e) =>
              update('occupation', e.target.value)
            }
          />

          <Select
            label={t('employmentType')}
            options={employmentOptions}
            optionLabels={{
              select: t('select'),
              options: [
                t('notEmployed'),
                t('salaried'),
                t('selfEmployed'),
                t('businessOwner'),
                t('farmer'),
                t('other'),
              ],
            }}
            value={form.employmentType}
            onChange={(e) =>
              update('employmentType', e.target.value)
            }
          />
        </Section>

        {/* FINANCIAL */}
        <Section title={t('financial')}>
          <Field
            label={t('annualFamilyIncome')}
            type="number"
            value={form.annualIncome}
            onChange={(e) =>
              update('annualIncome', e.target.value)
            }
          />

          <Select
            label={t('incomeCategory')}
            options={incomeOptions}
            optionLabels={{
              select: t('select'),
              options: [
                t('below25Lakh'),
                t('income25To5Lakh'),
                t('income5To10Lakh'),
                t('above10Lakh'),
              ],
            }}
            value={form.incomeCategory}
            onChange={(e) =>
              update('incomeCategory', e.target.value)
            }
          />
        </Section>

        {/* OTHER */}
        <Section title={t('other')}>
          <Select
            label={t('category')}
            options={categoryOptions}
            optionLabels={{
              select: t('select'),
              options: [
                t('general'),
                t('obc'),
                t('sc'),
                t('st'),
                t('ews'),
              ],
            }}
            value={form.category}
            onChange={(e) =>
              update('category', e.target.value)
            }
          />

          <Select
            label={t('maritalStatus')}
            options={maritalOptions}
            optionLabels={{
              select: t('select'),
              options: [
                t('unmarried'),
                t('married'),
                t('widowed'),
                t('divorced'),
              ],
            }}
            value={form.maritalStatus}
            onChange={(e) =>
              update('maritalStatus', e.target.value)
            }
          />
        </Section>

        <button
          type="submit"
          className="rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-6 py-2.5 min-h-[44px]"
        >
          {t('saveProfile')}
        </button>
      </form>
    </DashboardLayout>
  );
}