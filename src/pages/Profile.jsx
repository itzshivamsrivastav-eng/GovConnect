import { useState } from 'react';
import {
  User,
  Pencil,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Home,
  Building2,
  GraduationCap,
  BriefcaseBusiness,
  Wallet,
  Users,
  ShieldCheck,
  Landmark,
} from 'lucide-react';

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

function getInitials(name) {
  if (!name) return 'U';

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatDate(date) {
  if (!date) return '';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
        <Icon
          size={16}
          className="text-blue-700"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] text-gray-400 font-medium mb-0.5">
          {label}
        </p>

        <p className="text-sm font-medium text-gray-800 break-words">
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-5">
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon
            size={17}
            className="text-blue-700"
          />
        </div>

        <h2 className="font-heading text-base font-semibold text-navy-900">
          {title}
        </h2>
      </div>

      <div className="px-5 sm:px-6 py-2">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
      />
    </div>
  );
}

function Select({
  label,
  options,
  ...props
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
      </label>

      <select
        {...props}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Profile() {
  const currentUser = getCurrentUser();
  const savedProfile = getProfile();

  const initialProfile =
    savedProfile || {
      ...EMPTY_PROFILE,
      fullName:
        currentUser?.name || '',
      mobile:
        currentUser?.mobile || '',
      email:
        currentUser?.email || '',
    };

  const [form, setForm] = useState({
    ...EMPTY_PROFILE,
    ...initialProfile,
  });

  const [editing, setEditing] =
    useState(false);

  const { showToast } =
    useToast();

  const { t } =
    useLanguage();

  function update(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setProfile(form);
    setEditing(false);

    showToast(
      t('profileSavedMessage') ||
        'Profile saved. Scheme recommendations have been updated.'
    );
  }

  const initials = getInitials(
    form.fullName
  );

  if (editing) {
    return (
      <DashboardLayout>

        {/* PAGE HEADER */}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <User
              size={22}
              className="text-blue-700"
            />

            <h1 className="font-heading text-2xl font-bold text-navy-900">
              {t('myProfile') ||
                'My Profile'}
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            {t('profileDescription') ||
              'Manage your personal information once and reuse it across government services and schemes.'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
        >

          {/* PERSONAL INFORMATION */}

          <Section
            icon={User}
            title={
              t(
                'personalInformation'
              ) ||
              'Personal Information'
            }
          >
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <Field
                label={
                  t('fullName') ||
                  'Full Name'
                }
                value={
                  form.fullName
                }
                onChange={(e) =>
                  update(
                    'fullName',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('fatherName') ||
                  "Father's Name"
                }
                value={
                  form.fatherName
                }
                onChange={(e) =>
                  update(
                    'fatherName',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('motherName') ||
                  "Mother's Name"
                }
                value={
                  form.motherName
                }
                onChange={(e) =>
                  update(
                    'motherName',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('dateOfBirth') ||
                  'Date of Birth'
                }
                type="date"
                value={form.dob}
                onChange={(e) =>
                  update(
                    'dob',
                    e.target.value
                  )
                }
              />

              <Select
                label={
                  t('gender') ||
                  'Gender'
                }
                options={[
                  'Male',
                  'Female',
                  'Other',
                ]}
                value={form.gender}
                onChange={(e) =>
                  update(
                    'gender',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('mobileNumber') ||
                  'Mobile Number'
                }
                value={form.mobile}
                onChange={(e) =>
                  update(
                    'mobile',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('email') ||
                  'Email'
                }
                type="email"
                value={form.email}
                onChange={(e) =>
                  update(
                    'email',
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* ADDRESS */}

          <Section
            icon={MapPin}
            title={
              t('address') ||
              'Address'
            }
          >
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <Field
                label={
                  t('address') ||
                  'Address'
                }
                value={
                  form.address
                }
                onChange={(e) =>
                  update(
                    'address',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('state') ||
                  'State'
                }
                value={
                  form.state
                }
                onChange={(e) =>
                  update(
                    'state',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('district') ||
                  'District'
                }
                value={
                  form.district
                }
                onChange={(e) =>
                  update(
                    'district',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('cityVillage') ||
                  'City / Village'
                }
                value={
                  form.city
                }
                onChange={(e) =>
                  update(
                    'city',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('pinCode') ||
                  'PIN Code'
                }
                value={
                  form.pincode
                }
                onChange={(e) =>
                  update(
                    'pincode',
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* EDUCATION */}

          <Section
            icon={GraduationCap}
            title={
              t('education') ||
              'Education'
            }
          >
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <Select
                label={
                  t(
                    'educationLevel'
                  ) ||
                  'Education Level'
                }
                options={[
                  'Below Class 10',
                  'Class 10',
                  'Class 12',
                  'ITI',
                  'Diploma',
                  'Undergraduate',
                  'Graduate',
                  'Postgraduate',
                ]}
                value={
                  form.educationLevel
                }
                onChange={(e) =>
                  update(
                    'educationLevel',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t(
                    'institutionName'
                  ) ||
                  'Institution Name'
                }
                value={
                  form.institutionName
                }
                onChange={(e) =>
                  update(
                    'institutionName',
                    e.target.value
                  )
                }
              />

              <Field
                label={
                  t('courseClass') ||
                  'Course / Class'
                }
                value={
                  form.course
                }
                onChange={(e) =>
                  update(
                    'course',
                    e.target.value
                  )
                }
              />

              <Select
                label={
                  t(
                    'studentStatus'
                  ) ||
                  'Student Status'
                }
                options={[
                  'Yes',
                  'No',
                ]}
                value={
                  form.studentStatus
                }
                onChange={(e) =>
                  update(
                    'studentStatus',
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* EMPLOYMENT */}

          <Section
            icon={
              BriefcaseBusiness
            }
            title={
              t('employment') ||
              'Employment'
            }
          >
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <Field
                label={
                  t('occupation') ||
                  'Occupation'
                }
                value={
                  form.occupation
                }
                onChange={(e) =>
                  update(
                    'occupation',
                    e.target.value
                  )
                }
              />

              <Select
                label={
                  t(
                    'employmentType'
                  ) ||
                  'Employment Type'
                }
                options={[
                  'Not Employed',
                  'Salaried',
                  'Self-Employed',
                  'Business Owner',
                  'Farmer',
                  'Other',
                ]}
                value={
                  form.employmentType
                }
                onChange={(e) =>
                  update(
                    'employmentType',
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* FINANCIAL */}

          <Section
            icon={Wallet}
            title={
              t('financial') ||
              'Financial'
            }
          >
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <Field
                label={
                  t(
                    'annualFamilyIncome'
                  ) ||
                  'Annual Family Income (₹)'
                }
                type="number"
                value={
                  form.annualIncome
                }
                onChange={(e) =>
                  update(
                    'annualIncome',
                    e.target.value
                  )
                }
              />

              <Select
                label={
                  t(
                    'incomeCategory'
                  ) ||
                  'Income Category'
                }
                options={[
                  'Below ₹2.5 Lakh',
                  '₹2.5-5 Lakh',
                  '₹5-10 Lakh',
                  'Above ₹10 Lakh',
                ]}
                value={
                  form.incomeCategory
                }
                onChange={(e) =>
                  update(
                    'incomeCategory',
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* OTHER */}

          <Section
            icon={Users}
            title={
              t('other') ||
              'Other'
            }
          >
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <Select
                label={
                  t('category') ||
                  'Category'
                }
                options={[
                  'General',
                  'OBC',
                  'SC',
                  'ST',
                  'EWS',
                ]}
                value={
                  form.category
                }
                onChange={(e) =>
                  update(
                    'category',
                    e.target.value
                  )
                }
              />

              <Select
                label={
                  t(
                    'maritalStatus'
                  ) ||
                  'Marital Status'
                }
                options={[
                  'Unmarried',
                  'Married',
                  'Widowed',
                  'Divorced',
                ]}
                value={
                  form.maritalStatus
                }
                onChange={(e) =>
                  update(
                    'maritalStatus',
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* ACTIONS */}

          <div className="flex items-center gap-3 pb-6">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold px-6 py-2.5 min-h-[44px]"
            >
              <ShieldCheck
                size={16}
              />

              {t('saveProfile') ||
                'Save Profile'}
            </button>

            <button
              type="button"
              onClick={() =>
                setEditing(false)
              }
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 min-h-[44px]"
            >
              {t('cancel') ||
                'Cancel'}
            </button>
          </div>

        </form>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* PAGE HEADER */}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <User
            size={23}
            className="text-blue-700"
          />

          <h1 className="font-heading text-2xl font-bold text-navy-900">
            {t('myProfile') ||
              'My Profile'}
          </h1>
        </div>

        <p className="text-sm text-gray-500">
          {t('profileDescription') ||
            'Manage your personal information once and reuse it across government services and schemes.'}
        </p>
      </div>

      {/* PROFILE HERO */}

      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-sm mb-6">

        {/* Decorative background */}

        <div className="absolute right-0 top-0 w-72 h-full opacity-40 pointer-events-none">
          <div className="absolute right-8 top-10 w-28 h-28 rounded-full bg-blue-200 blur-2xl" />
          <div className="absolute right-24 bottom-0 w-40 h-40 rounded-full bg-indigo-200 blur-3xl" />
        </div>

        <div className="relative px-5 sm:px-7 py-5 sm:py-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              {/* AVATAR */}

              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-md">
                  {initials}
                </div>

                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                  <Pencil
                    size={13}
                    className="text-blue-700"
                  />
                </div>
              </div>

              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy-900">
                  {form.fullName ||
                    currentUser?.name ||
                    'Citizen'}
                </h2>

                <div className="inline-flex items-center gap-1.5 mt-1 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-800">
                  <User
                    size={12}
                  />
                  {t('citizen') ||
                    'Citizen'}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                  {form.gender && (
                    <span className="flex items-center gap-1.5">
                      <User
                        size={13}
                      />
                      {form.gender}
                    </span>
                  )}

                  {form.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail
                        size={13}
                      />
                      {form.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* EDIT */}

            <button
              type="button"
              onClick={() =>
                setEditing(true)
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white/80 hover:bg-white text-blue-700 font-semibold text-sm px-4 py-2.5 min-h-[42px] transition-colors"
            >
              <Pencil
                size={15}
              />

              {t('editProfile') ||
                'Edit Profile'}
            </button>

          </div>
        </div>
      </section>

      {/* PERSONAL INFORMATION */}

      <Section
        icon={User}
        title={
          t(
            'personalInformation'
          ) ||
          'Personal Information'
        }
      >
        <div className="grid sm:grid-cols-2 gap-x-8">

          <InfoItem
            icon={User}
            label={
              t('fullName') ||
              'Full Name'
            }
            value={
              form.fullName
            }
          />

          <InfoItem
            icon={User}
            label={
              t('fatherName') ||
              "Father's Name"
            }
            value={
              form.fatherName
            }
          />

          <InfoItem
            icon={User}
            label={
              t('motherName') ||
              "Mother's Name"
            }
            value={
              form.motherName
            }
          />

          <InfoItem
            icon={Calendar}
            label={
              t('dateOfBirth') ||
              'Date of Birth'
            }
            value={formatDate(
              form.dob
            )}
          />

          <InfoItem
            icon={User}
            label={
              t('gender') ||
              'Gender'
            }
            value={
              form.gender
            }
          />

          <InfoItem
            icon={Phone}
            label={
              t(
                'mobileNumber'
              ) ||
              'Mobile Number'
            }
            value={
              form.mobile
            }
          />

          <InfoItem
            icon={Mail}
            label={
              t('email') ||
              'Email'
            }
            value={
              form.email
            }
          />

        </div>
      </Section>

      {/* ADDRESS */}

      <Section
        icon={MapPin}
        title={
          t('address') ||
          'Address'
        }
      >
        <div className="grid sm:grid-cols-2 gap-x-8">

          <InfoItem
            icon={Home}
            label={
              t('address') ||
              'Address'
            }
            value={
              form.address
            }
          />

          <InfoItem
            icon={Building2}
            label={
              t('state') ||
              'State'
            }
            value={
              form.state
            }
          />

          <InfoItem
            icon={MapPin}
            label={
              t('district') ||
              'District'
            }
            value={
              form.district
            }
          />

          <InfoItem
            icon={Building2}
            label={
              t(
                'cityVillage'
              ) ||
              'City / Village'
            }
            value={
              form.city
            }
          />

          <InfoItem
            icon={MapPin}
            label={
              t('pinCode') ||
              'PIN Code'
            }
            value={
              form.pincode
            }
          />

        </div>
      </Section>

      {/* EDUCATION */}

      <Section
        icon={GraduationCap}
        title={
          t('education') ||
          'Education'
        }
      >
        <div className="grid sm:grid-cols-2 gap-x-8">

          <InfoItem
            icon={GraduationCap}
            label={
              t(
                'educationLevel'
              ) ||
              'Education Level'
            }
            value={
              form.educationLevel
            }
          />

          <InfoItem
            icon={Landmark}
            label={
              t(
                'institutionName'
              ) ||
              'Institution Name'
            }
            value={
              form.institutionName
            }
          />

          <InfoItem
            icon={GraduationCap}
            label={
              t('courseClass') ||
              'Course / Class'
            }
            value={
              form.course
            }
          />

          <InfoItem
            icon={User}
            label={
              t(
                'studentStatus'
              ) ||
              'Student Status'
            }
            value={
              form.studentStatus
            }
          />

        </div>
      </Section>

      {/* EMPLOYMENT */}

      <Section
        icon={
          BriefcaseBusiness
        }
        title={
          t('employment') ||
          'Employment'
        }
      >
        <div className="grid sm:grid-cols-2 gap-x-8">

          <InfoItem
            icon={
              BriefcaseBusiness
            }
            label={
              t('occupation') ||
              'Occupation'
            }
            value={
              form.occupation
            }
          />

          <InfoItem
            icon={
              BriefcaseBusiness
            }
            label={
              t(
                'employmentType'
              ) ||
              'Employment Type'
            }
            value={
              form.employmentType
            }
          />

        </div>
      </Section>

      {/* FINANCIAL */}

      <Section
        icon={Wallet}
        title={
          t('financial') ||
          'Financial'
        }
      >
        <div className="grid sm:grid-cols-2 gap-x-8">

          <InfoItem
            icon={Wallet}
            label={
              t(
                'annualFamilyIncome'
              ) ||
              'Annual Family Income'
            }
            value={
              form.annualIncome
                ? `₹${form.annualIncome}`
                : ''
            }
          />

          <InfoItem
            icon={Wallet}
            label={
              t(
                'incomeCategory'
              ) ||
              'Income Category'
            }
            value={
              form.incomeCategory
            }
          />

        </div>
      </Section>

      {/* OTHER */}

      <Section
        icon={Users}
        title={
          t('other') ||
          'Other'
        }
      >
        <div className="grid sm:grid-cols-2 gap-x-8">

          <InfoItem
            icon={Users}
            label={
              t('category') ||
              'Category'
            }
            value={
              form.category
            }
          />

          <InfoItem
            icon={Users}
            label={
              t(
                'maritalStatus'
              ) ||
              'Marital Status'
            }
            value={
              form.maritalStatus
            }
          />

        </div>
      </Section>

    </DashboardLayout>
  );
}