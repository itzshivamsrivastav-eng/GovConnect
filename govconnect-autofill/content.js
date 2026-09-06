const GOVCONNECT_DOMAINS = [
  'vercel.app',
  'localhost'
];

const FIELD_MAP = {
  fullName: [
    'full name',
    'fullname',
    'name',
    'applicant name',
    'applicantname'
  ],

  dob: [
    'date of birth',
    'dob',
    'birth date',
    'birthdate'
  ],

  mobile: [
    'mobile',
    'mobile number',
    'phone',
    'phone number',
    'contact number'
  ],

  email: [
    'email',
    'email address',
    'e-mail'
  ],

  address: [
    'address',
    'residential address',
    'permanent address',
    'correspondence address'
  ],

  state: [
    'state',
    'state name'
  ],

  district: [
    'district',
    'district name'
  ],

  city: [
    'city',
    'town'
  ],

  pincode: [
    'pincode',
    'pin code',
    'postal code',
    'zip code'
  ],

  fatherName: [
    "father's name",
    'father name',
    'fathers name',
    'fathername'
  ],

  motherName: [
    "mother's name",
    'mother name',
    'mothers name',
    'mothername'
  ],

  gender: [
    'gender',
    'sex'
  ],

  occupation: [
    'occupation',
    'profession'
  ]
};

let profile = null;
let autofillButton = null;

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isGovConnectPage() {
  const hostname = window.location.hostname;

  return (
    hostname === 'localhost' ||
    hostname.endsWith('.vercel.app') ||
    hostname.includes('govconnect')
  );
}

function getElementText(element) {
  const parts = [];

  if (element.getAttribute('name')) {
    parts.push(element.getAttribute('name'));
  }

  if (element.getAttribute('id')) {
    parts.push(element.getAttribute('id'));
  }

  if (element.getAttribute('placeholder')) {
    parts.push(element.getAttribute('placeholder'));
  }

  if (element.getAttribute('aria-label')) {
    parts.push(element.getAttribute('aria-label'));
  }

  const parent = element.parentElement;

  if (parent) {
    const label = parent.querySelector('label');

    if (label) {
      parts.push(label.textContent);
    }
  }

  const closestLabel = element.closest('label');

  if (closestLabel) {
    parts.push(closestLabel.textContent);
  }

  return normalize(parts.join(' '));
}

function findProfileKey(element) {
  const text = getElementText(element);

  for (const [profileKey, aliases] of Object.entries(FIELD_MAP)) {
    const matched = aliases.some((alias) => {
      return text.includes(normalize(alias));
    });

    if (matched) {
      return profileKey;
    }
  }

  return null;
}

function setNativeValue(element, value) {
  if (!element || value === undefined || value === null) {
    return false;
  }

  const stringValue = String(value);

  const prototype =
    element.tagName === 'TEXTAREA'
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;

  const descriptor = Object.getOwnPropertyDescriptor(
    prototype,
    'value'
  );

  if (descriptor?.set) {
    descriptor.set.call(element, stringValue);
  } else {
    element.value = stringValue;
  }

  element.dispatchEvent(
    new Event('input', {
      bubbles: true
    })
  );

  element.dispatchEvent(
    new Event('change', {
      bubbles: true
    })
  );

  element.dispatchEvent(
    new Event('blur', {
      bubbles: true
    })
  );

  return true;
}

function findFormFields() {
  return Array.from(
    document.querySelectorAll(
      'input:not([type="hidden"]):not([type="file"]), textarea, select'
    )
  );
}

function getAutofillableFields() {
  return findFormFields()
    .map((element) => {
      const profileKey = findProfileKey(element);

      return {
        element,
        profileKey
      };
    })
    .filter(
      (item) =>
        item.profileKey &&
        profile &&
        profile[item.profileKey] !== undefined &&
        profile[item.profileKey] !== ''
    );
}

function autofillForm() {
  if (!profile) {
    showMessage(
      'No GovConnect profile found. Open GovConnect first and sync your profile.'
    );

    return;
  }

  const fields = getAutofillableFields();

  if (fields.length === 0) {
    showMessage(
      'No matching form fields were detected on this page.'
    );

    return;
  }

  let filled = 0;

  fields.forEach(({ element, profileKey }) => {
    const value = profile[profileKey];

    if (value === undefined || value === null || value === '') {
      return;
    }

    if (element.tagName === 'SELECT') {
      const option = Array.from(element.options).find(
        (item) =>
          normalize(item.value) === normalize(value) ||
          normalize(item.textContent) === normalize(value)
      );

      if (option) {
        element.value = option.value;

        element.dispatchEvent(
          new Event('change', {
            bubbles: true
          })
        );

        filled += 1;
      }

      return;
    }

    if (setNativeValue(element, value)) {
      filled += 1;
    }
  });

  showMessage(
    filled > 0
      ? `✓ ${filled} field${filled > 1 ? 's' : ''} filled with GovConnect`
      : 'No matching fields could be filled.'
  );
}

function createButton() {
  if (autofillButton) {
    return;
  }

  autofillButton = document.createElement('button');

  autofillButton.type = 'button';
  autofillButton.id = 'govconnect-autofill-button';
  autofillButton.textContent = '⚡ Fill with GovConnect';

  autofillButton.addEventListener('click', () => {
    autofillForm();
  });

  document.body.appendChild(autofillButton);
}

function showMessage(message) {
  const existing = document.getElementById(
    'govconnect-autofill-message'
  );

  if (existing) {
    existing.remove();
  }

  const messageBox = document.createElement('div');

  messageBox.id = 'govconnect-autofill-message';
  messageBox.textContent = message;

  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.remove();
  }, 3500);
}

function syncProfileFromGovConnect() {
  if (!isGovConnectPage()) {
    return;
  }

  try {
    const authRaw = localStorage.getItem('govconnect_auth');

    if (!authRaw) {
      return;
    }

    const auth = JSON.parse(authRaw);

    const identifier =
      auth?.identifier ||
      auth?.mobile ||
      auth?.email;

    if (!identifier) {
      return;
    }

    const safeIdentifier = String(identifier)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9@._-]/g, '_');

    const profileKey = `govconnect_profile_${safeIdentifier}`;

    const profileRaw = localStorage.getItem(profileKey);

    if (!profileRaw) {
      return;
    }

    const savedProfile = JSON.parse(profileRaw);

    chrome.runtime.sendMessage({
      type: 'SAVE_PROFILE',
      profile: savedProfile
    });
  } catch (error) {
    console.error(
      'GovConnect profile sync failed:',
      error
    );
  }
}

function loadProfileForExternalPage() {
  if (isGovConnectPage()) {
    return;
  }

  chrome.runtime.sendMessage(
    {
      type: 'GET_PROFILE'
    },
    (response) => {
      if (chrome.runtime.lastError) {
        return;
      }

      if (response?.success && response.profile) {
        profile = response.profile;
        createButton();
      }
    }
  );
}

function initialize() {
  syncProfileFromGovConnect();
  loadProfileForExternalPage();
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initialize
  );
} else {
  initialize();
}

const observer = new MutationObserver(() => {
  if (
    !isGovConnectPage() &&
    !autofillButton &&
    profile
  ) {
    createButton();
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});