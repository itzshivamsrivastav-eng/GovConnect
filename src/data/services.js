const services = [
  {
    id: 'passport',
    name: 'Passport Application',
    department: 'Ministry of External Affairs',
    category: 'Identity & Travel',
    description:
      'Apply for a new passport or passport-related services through the official government portal.',
    requirements: [
      'Applicant must provide valid personal information.',
      'Applicant must provide required identity and address documents.',
      'Passport-size photograph may be required.',
    ],
    documents: [
      {
        id: 'passport-id-proof',
        name: 'Aadhaar / ID Proof',
        description:
          'Aadhaar Card, Voter ID, PAN Card or another accepted identity proof.',
        required: true,
      },
      {
        id: 'passport-address-proof',
        name: 'Address Proof',
        description:
          'Accepted proof of current residential address.',
        required: true,
      },
      {
        id: 'passport-photo',
        name: 'Passport-size Photograph',
        description:
          'Recent passport-size photograph as required by the portal.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'dob',
      'address',
      'mobile',
      'email',
    ],
    officialUrl: 'https://www.passportindia.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'pan-card',
    name: 'PAN Card Application',
    department: 'Income Tax Department',
    category: 'Identity & Tax',
    description:
      'Apply for a new PAN card or related PAN services.',
    requirements: [
      'Applicant must provide valid identity details.',
      'Applicant must provide address details.',
      'Required supporting documents must be submitted.',
    ],
    documents: [
      {
        id: 'pan-id-proof',
        name: 'ID Proof',
        description:
          'Aadhaar Card, Voter ID or another accepted identity proof.',
        required: true,
      },
      {
        id: 'pan-address-proof',
        name: 'Address Proof',
        description:
          'Valid proof of residential address.',
        required: true,
      },
      {
        id: 'pan-photo',
        name: 'Photograph',
        description:
          'Recent photograph as required for PAN application.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'dob',
      'address',
    ],
    officialUrl: 'https://www.incometax.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'voter-id',
    name: 'Voter ID Registration',
    department: 'Election Commission of India',
    category: 'Identity',
    description:
      'Register as a voter and apply for a Voter ID through the official election services portal.',
    requirements: [
      'Applicant must meet the required age criteria.',
      'Applicant must provide valid identity and address information.',
    ],
    documents: [
      {
        id: 'voter-age-proof',
        name: 'Age Proof',
        description:
          'Birth certificate, school certificate or another accepted age proof.',
        required: true,
      },
      {
        id: 'voter-address-proof',
        name: 'Address Proof',
        description:
          'Valid proof of residential address.',
        required: true,
      },
      {
        id: 'voter-photo',
        name: 'Photograph',
        description:
          'Recent photograph as required by the election portal.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'dob',
      'address',
      'state',
      'district',
    ],
    officialUrl: 'https://voters.eci.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'driving-licence',
    name: 'Driving Licence',
    department: 'Ministry of Road Transport & Highways',
    category: 'Transport',
    description:
      'Apply for learner or driving licence related services.',
    requirements: [
      'Applicant must provide valid personal information.',
      'Required identity and address documents must be submitted.',
      'Medical certificate may be required in applicable cases.',
    ],
    documents: [
      {
        id: 'dl-id-proof',
        name: 'ID Proof',
        description:
          'Aadhaar Card, Voter ID or another accepted identity proof.',
        required: true,
      },
      {
        id: 'dl-address-proof',
        name: 'Address Proof',
        description:
          'Valid proof of residential address.',
        required: true,
      },
      {
        id: 'dl-photo',
        name: 'Photograph',
        description:
          'Recent photograph.',
        required: true,
      },
      {
        id: 'dl-medical',
        name: 'Medical Certificate',
        description:
          'Required where applicable based on the licence category.',
        required: false,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'dob',
      'address',
      'mobile',
    ],
    officialUrl: 'https://parivahan.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'vehicle-registration',
    name: 'Vehicle Registration',
    department: 'Ministry of Road Transport & Highways',
    category: 'Transport',
    description:
      'Access vehicle registration and related transport services.',
    requirements: [
      'Vehicle ownership details must be provided.',
      'Required vehicle and applicant documents must be submitted.',
    ],
    documents: [
      {
        id: 'vehicle-id-proof',
        name: 'ID Proof',
        description:
          'Valid identity proof of the vehicle owner.',
        required: true,
      },
      {
        id: 'vehicle-address-proof',
        name: 'Address Proof',
        description:
          'Valid residential address proof.',
        required: true,
      },
      {
        id: 'vehicle-invoice',
        name: 'Vehicle Invoice',
        description:
          'Invoice or purchase document for the vehicle.',
        required: true,
      },
      {
        id: 'vehicle-insurance',
        name: 'Insurance Copy',
        description:
          'Valid vehicle insurance document.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'address',
    ],
    officialUrl: 'https://parivahan.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'digilocker',
    name: 'DigiLocker',
    department: 'Ministry of Electronics & Information Technology',
    category: 'Digital Services',
    description:
      'Access and manage digitally issued government documents.',
    requirements: [
      'A valid mobile number is required for verification.',
      'Identity details may be required for account verification.',
    ],
    documents: [
      {
        id: 'digilocker-mobile',
        name: 'Mobile Verification',
        description:
          'Mobile number used for account verification.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'mobile',
    ],
    officialUrl: 'https://www.digilocker.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'epfo',
    name: 'EPFO Services',
    department: 'Employees Provident Fund Organisation',
    category: 'Employment & Pension',
    description:
      'Access EPFO services including provident fund and employment-related services.',
    requirements: [
      'UAN and employment information may be required.',
      'Bank account details may be required for applicable services.',
    ],
    documents: [
      {
        id: 'epfo-uan',
        name: 'UAN Details',
        description:
          'Universal Account Number details.',
        required: true,
      },
      {
        id: 'epfo-bank',
        name: 'Bank Account Details',
        description:
          'Bank account information required for applicable services.',
        required: true,
      },
      {
        id: 'epfo-id-proof',
        name: 'ID Proof',
        description:
          'Valid identity proof.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'mobile',
    ],
    officialUrl: 'https://www.epfindia.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'income-tax-efiling',
    name: 'Income Tax e-Filing',
    department: 'Income Tax Department',
    category: 'Taxation',
    description:
      'Access income tax return filing and other income tax services.',
    requirements: [
      'PAN information is required.',
      'Income-related information must be provided.',
      'Supporting financial documents may be required.',
    ],
    documents: [
      {
        id: 'tax-pan',
        name: 'PAN Card',
        description:
          'Valid PAN card or PAN document.',
        required: true,
      },
      {
        id: 'tax-form16',
        name: 'Form 16',
        description:
          'Form 16 or applicable income statement.',
        required: false,
      },
      {
        id: 'tax-bank',
        name: 'Bank Statement',
        description:
          'Bank statement where applicable.',
        required: false,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'annualIncome',
    ],
    officialUrl: 'https://www.incometax.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'gst-registration',
    name: 'GST Registration',
    department: 'Goods and Services Tax Network',
    category: 'Business',
    description:
      'Register a business under the Goods and Services Tax system.',
    requirements: [
      'Applicant must provide PAN details.',
      'Business address information is required.',
      'Banking details may be required.',
    ],
    documents: [
      {
        id: 'gst-pan',
        name: 'PAN Card',
        description:
          'PAN of the applicant or business.',
        required: true,
      },
      {
        id: 'gst-address',
        name: 'Business Address Proof',
        description:
          'Valid proof of business address.',
        required: true,
      },
      {
        id: 'gst-bank',
        name: 'Bank Account Details',
        description:
          'Bank account proof or applicable banking details.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'address',
    ],
    officialUrl: 'https://www.gst.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'udyam-registration',
    name: 'Udyam Registration',
    department: 'Ministry of Micro, Small & Medium Enterprises',
    category: 'Business',
    description:
      'Register a micro, small or medium enterprise through the Udyam portal.',
    requirements: [
      'Aadhaar information is required.',
      'PAN information may be required.',
      'Bank details may be required.',
    ],
    documents: [
      {
        id: 'udyam-aadhaar',
        name: 'Aadhaar Card',
        description:
          'Valid Aadhaar document.',
        required: true,
      },
      {
        id: 'udyam-pan',
        name: 'PAN Card',
        description:
          'Valid PAN document.',
        required: true,
      },
      {
        id: 'udyam-bank',
        name: 'Bank Account Details',
        description:
          'Bank account information.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'address',
    ],
    officialUrl: 'https://udyamregistration.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    department: 'Registrar of Births & Deaths',
    category: 'Certificates',
    description:
      'Apply for birth certificate related services.',
    requirements: [
      'Birth details must be provided.',
      'Required identity documents must be submitted.',
    ],
    documents: [
      {
        id: 'birth-proof',
        name: 'Proof of Birth',
        description:
          'Hospital record or another accepted proof of birth.',
        required: true,
      },
      {
        id: 'birth-parent-id',
        name: 'Parents ID Proof',
        description:
          'Identity proof of parent(s) where applicable.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'dob',
    ],
    officialUrl: 'https://crsorgi.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'death-certificate',
    name: 'Death Certificate',
    department: 'Registrar of Births & Deaths',
    category: 'Certificates',
    description:
      'Access death certificate registration and related services.',
    requirements: [
      'Details of the deceased must be provided.',
      'Required medical and identity documents must be submitted.',
    ],
    documents: [
      {
        id: 'death-medical',
        name: 'Medical Certificate',
        description:
          'Medical or hospital certificate where applicable.',
        required: true,
      },
      {
        id: 'death-id-proof',
        name: 'ID Proof',
        description:
          'Valid identity document as required.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'address',
    ],
    officialUrl: 'https://crsorgi.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'income-certificate',
    name: 'Income Certificate',
    department: 'State Revenue Department',
    category: 'Certificates',
    description:
      'Apply for an income certificate used for government schemes, scholarships and other services.',
    requirements: [
      'Applicant must provide valid personal information.',
      'Income details must be provided.',
      'Identity, address and income-related documents may be required.',
    ],
    documents: [
      {
        id: 'income-id-proof',
        name: 'Aadhaar / ID Proof',
        description:
          'Aadhaar Card, Voter ID, PAN Card or another accepted identity proof.',
        required: true,
      },
      {
        id: 'income-address-proof',
        name: 'Address Proof',
        description:
          'Valid proof of residential address.',
        required: true,
      },
      {
        id: 'income-proof',
        name: 'Income Proof',
        description:
          'Salary slip, income declaration, Form 16 or another accepted income document.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'address',
      'annualIncome',
      'state',
      'district',
    ],
    officialUrl: 'https://services.india.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'domicile-certificate',
    name: 'Domicile Certificate',
    department: 'State Revenue Department',
    category: 'Certificates',
    description:
      'Apply for a domicile or residence certificate.',
    requirements: [
      'Applicant must provide residence information.',
      'Proof of address and residence duration may be required.',
    ],
    documents: [
      {
        id: 'domicile-id-proof',
        name: 'ID Proof',
        description:
          'Valid identity proof.',
        required: true,
      },
      {
        id: 'domicile-address-proof',
        name: 'Address Proof',
        description:
          'Valid proof of residential address.',
        required: true,
      },
      {
        id: 'domicile-residence-proof',
        name: 'Residence Duration Proof',
        description:
          'Document showing required period of residence.',
        required: true,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'address',
      'state',
      'district',
    ],
    officialUrl: 'https://services.india.gov.in/',
    supportsMockPortal: true,
  },

  {
    id: 'grievance-cpgrams',
    name: 'Public Grievance — CPGRAMS',
    department: 'Department of Administrative Reforms & Public Grievances',
    category: 'Citizen Services',
    description:
      'Submit and track grievances related to government departments and services.',
    requirements: [
      'Applicant contact information is required.',
      'Details of the grievance must be provided.',
      'Supporting documents may be attached where applicable.',
    ],
    documents: [
      {
        id: 'grievance-supporting-docs',
        name: 'Supporting Documents',
        description:
          'Any document supporting the grievance, if applicable.',
        required: false,
      },
    ],
    profileFieldsUsed: [
      'fullName',
      'mobile',
      'email',
    ],
    officialUrl: 'https://pgportal.gov.in/',
    supportsMockPortal: true,
  },
];

export default services;