import {
  getItem,
  setItem,
  removeItem,
  STORAGE_KEYS,
} from '../utils/storage';

import demoProfile from '../data/demoProfile';
import mockApplications from '../data/mockApplications';

import { setProfile } from './profileApi';
import { seedApplicationsIfEmpty } from './applicationApi';

const DEMO_USER = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  mobile: '9876543210',
  identifier: 'aarav.sharma@example.com',
};

export function getCurrentUser() {
  return getItem(STORAGE_KEYS.AUTH, null);
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

/*
  Alias used by pages that need to check whether
  the citizen is currently logged in.
*/
export function isLoggedIn() {
  return !!getCurrentUser();
}

export function login({
  name,
  identifier,
  password,
}) {
  if (!name || !name.trim()) {
    return {
      success: false,
      error: 'Please enter your full name.',
    };
  }

  if (!identifier || !identifier.trim()) {
    return {
      success: false,
      error: 'Please enter your email or mobile number.',
    };
  }

  if (!password || !password.trim()) {
    return {
      success: false,
      error: 'Please enter your password.',
    };
  }

  const cleanName = name.trim();
  const cleanIdentifier = identifier.trim();

  const isEmail = cleanIdentifier.includes('@');

  const user = {
    name: cleanName,
    identifier: cleanIdentifier,

    email: isEmail
      ? cleanIdentifier
      : '',

    mobile: isEmail
      ? ''
      : cleanIdentifier,
  };

  setItem(
    STORAGE_KEYS.AUTH,
    user
  );

  const existingProfile = getItem(
    `${STORAGE_KEYS.PROFILE}_${cleanIdentifier
      .toLowerCase()
      .replace(/[^a-z0-9@._-]/g, '_')}`,
    null
  );

  if (!existingProfile) {
    setProfile({
      fullName: cleanName,

      fatherName: '',
      motherName: '',
      dob: '',
      gender: '',

      mobile: isEmail
        ? ''
        : cleanIdentifier,

      email: isEmail
        ? cleanIdentifier
        : '',

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
    });
  }

  return {
    success: true,
    user,
  };
}

export function loginDemo() {
  setItem(
    STORAGE_KEYS.AUTH,
    DEMO_USER
  );

  setProfile(demoProfile);

  seedApplicationsIfEmpty(
    mockApplications
  );

  return {
    success: true,
    user: DEMO_USER,
  };
}

export function logout() {
  removeItem(STORAGE_KEYS.AUTH);
}