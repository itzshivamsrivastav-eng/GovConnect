import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getProfile, setProfile } from '../services/profileApi';
import { getCurrentUser } from '../services/authApi';
import { useToast } from '../components/ToastContext';

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

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <select
        {...props}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
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

    showToast(
      'Profile saved. Scheme recommendations have been updated.'
    );
  }

  return (
    <DashboardLayout>

      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-1">
        My Profile
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Your profile information is used to provide personalized scheme
        recommendations.
      </p>

      <form onSubmit={handleSubmit}>

        {/* PERSONAL INFORMATION */}
        <Section title="Personal Information">

          <Field
            label="Full Name"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
          />

          <Field
            label="Father's Name"
            value={form.fatherName}
            onChange={(e) => update('fatherName', e.target.value)}
          />

          <Field
            label="Mother's Name"
            value={form.motherName}
            onChange={(e) => update('motherName', e.target.value)}
          />

          <Field
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={(e) => update('dob', e.target.value)}
          />

          <Select
            label="Gender"
            options={['Male', 'Female', 'Other']}
            value={form.gender}
            onChange={(e) => update('gender', e.target.value)}
          />

          <Field
            label="Mobile Number"
            value={form.mobile}
            onChange={(e) => update('mobile', e.target.value)}
          />

          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />

        </Section>

        {/* ADDRESS */}
        <Section title="Address">

          <Field
            label="Address"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
          />

          <Field
            label="State"
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
          />

          <Field
            label="District"
            value={form.district}
            onChange={(e) => update('district', e.target.value)}
          />

          <Field
            label="City / Village"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
          />

          <Field
            label="PIN Code"
            value={form.pincode}
            onChange={(e) => update('pincode', e.target.value)}
          />

        </Section>

        {/* EDUCATION */}
        <Section title="Education">

          <Select
            label="Education Level"
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
            value={form.educationLevel}
            onChange={(e) =>
              update('educationLevel', e.target.value)
            }
          />

          <Field
            label="Institution Name"
            value={form.institutionName}
            onChange={(e) =>
              update('institutionName', e.target.value)
            }
          />

          <Field
            label="Course / Class"
            value={form.course}
            onChange={(e) => update('course', e.target.value)}
          />

          <Select
            label="Student Status"
            options={['Yes', 'No']}
            value={form.studentStatus}
            onChange={(e) =>
              update('studentStatus', e.target.value)
            }
          />

        </Section>

        {/* EMPLOYMENT */}
        <Section title="Employment">

          <Field
            label="Occupation"
            value={form.occupation}
            onChange={(e) =>
              update('occupation', e.target.value)
            }
          />

          <Select
            label="Employment Type"
            options={[
              'Not Employed',
              'Salaried',
              'Self-Employed',
              'Business Owner',
              'Farmer',
              'Other',
            ]}
            value={form.employmentType}
            onChange={(e) =>
              update('employmentType', e.target.value)
            }
          />

        </Section>

        {/* FINANCIAL */}
        <Section title="Financial">

          <Field
            label="Annual Family Income (₹)"
            type="number"
            value={form.annualIncome}
            onChange={(e) =>
              update('annualIncome', e.target.value)
            }
          />

          <Select
            label="Income Category"
            options={[
              'Below ₹2.5 Lakh',
              '₹2.5-5 Lakh',
              '₹5-10 Lakh',
              'Above ₹10 Lakh',
            ]}
            value={form.incomeCategory}
            onChange={(e) =>
              update('incomeCategory', e.target.value)
            }
          />

        </Section>

        {/* OTHER */}
        <Section title="Other">

          <Select
            label="Category"
            options={[
              'General',
              'OBC',
              'SC',
              'ST',
              'EWS',
            ]}
            value={form.category}
            onChange={(e) =>
              update('category', e.target.value)
            }
          />

          <Select
            label="Marital Status"
            options={[
              'Unmarried',
              'Married',
              'Widowed',
              'Divorced',
            ]}
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
          Save Profile
        </button>

      </form>
    </DashboardLayout>
  );
}