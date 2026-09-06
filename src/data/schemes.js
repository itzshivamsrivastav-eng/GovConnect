// Demo schemes used to showcase GovConnect's scheme discovery,
// eligibility matching and application tracking experience.
// These are prototype/demo schemes, not official government schemes.

const schemes = [
  {
    id: 'student-education-support',
    name: 'Student Education Support Scheme',
    category: 'Education',
    isDemoScheme: true,
    department: 'Department of School Education (Demo)',
    description:
      'Financial assistance for students from low- and middle-income families to support continuation of education.',
    benefits:
      'Annual education support grant and fee reimbursement assistance.',
    officialUrl: 'https://scholarships.gov.in/',
    requirements: [
      'Applicant must satisfy the age criteria.',
      'Applicant should be currently studying.',
      'Family income should be within the prescribed limit.',
      'Applicant must satisfy the required education level.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Income Certificate',
      'Education Certificate',
      'Bank Account Details',
    ],
    eligibilityRules: {
      minAge: 15,
      maxAge: 25,
      studentRequired: true,
      maxIncome: 300000,
      educationLevels: [
        'Class 10',
        'Class 12',
        'Undergraduate',
        'Postgraduate',
      ],
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'educationLevel',
      'studentStatus',
      'state',
    ],
  },

  {
    id: 'digital-skills-scholarship',
    name: 'Digital Skills Scholarship',
    category: 'Skill Development',
    isDemoScheme: true,
    department: 'Ministry of Skill Development (Demo)',
    description:
      'Scholarship supporting students pursuing digital and IT skill certifications alongside their regular education.',
    benefits:
      'Course fee waiver for approved digital skill certifications.',
    officialUrl: 'https://www.skillindia.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age range.',
      'Applicant should be a student.',
      'Family income must be within the prescribed limit.',
      'Applicant should have the required education level.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Income Certificate',
      'Education Certificate',
      'Student ID',
    ],
    eligibilityRules: {
      minAge: 18,
      maxAge: 30,
      studentRequired: true,
      maxIncome: 150000,
      educationLevels: ['Undergraduate', 'Graduate'],
      states: [
        'Uttar Pradesh',
        'Delhi',
        'Maharashtra',
        'Bihar',
        'Rajasthan',
      ],
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'educationLevel',
      'studentStatus',
      'state',
    ],
  },

  {
    id: 'youth-employment-assistance',
    name: 'Youth Employment Assistance Scheme',
    category: 'Employment',
    isDemoScheme: true,
    department: 'Ministry of Labour & Employment (Demo)',
    description:
      'Assistance for job-seeking youth including placement support and a one-time employment stipend.',
    benefits:
      'Placement assistance and stipend for first 3 months of employment.',
    officialUrl: 'https://www.ncs.gov.in/',
    requirements: [
      'Applicant must fall within the prescribed age range.',
      'Applicant should meet the required education criteria.',
      'Family income should be within the applicable limit.',
      'Applicant should be eligible for employment assistance.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Education Certificate',
      'Address Proof',
      'Bank Account Details',
    ],
    eligibilityRules: {
      minAge: 18,
      maxAge: 35,
      studentRequired: false,
      maxIncome: 250000,
      educationLevels: [
        'Undergraduate',
        'Graduate',
        'ITI',
        'Diploma',
      ],
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'educationLevel',
      'occupation',
      'state',
    ],
  },

  {
    id: 'women-entrepreneurship-support',
    name: 'Women Entrepreneurship Support Scheme',
    category: 'Women Entrepreneurship',
    isDemoScheme: true,
    department: 'Ministry of MSME (Demo)',
    description:
      'Support for women starting or scaling small businesses, including subsidised loans and mentorship.',
    benefits:
      'Interest subsidy on business loans and mentorship access.',
    officialUrl: 'https://www.msme.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age criteria.',
      'Applicant must meet the applicable gender criteria.',
      'Annual income should be within the prescribed limit.',
      'Applicant should satisfy the scheme-specific business conditions.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'PAN Card',
      'Address Proof',
      'Bank Account Details',
      'Business-related Documents',
    ],
    eligibilityRules: {
      minAge: 21,
      maxAge: 55,
      gender: 'Female',
      studentRequired: false,
      maxIncome: 500000,
      educationLevels: 'any',
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'gender',
      'annualIncome',
      'occupation',
      'state',
    ],
  },

  {
    id: 'rural-skill-development',
    name: 'Rural Skill Development Scheme',
    category: 'Skill Development',
    isDemoScheme: true,
    department: 'Ministry of Rural Development (Demo)',
    description:
      'Vocational training programme for rural youth to improve employability.',
    benefits:
      'Free vocational training and certification.',
    officialUrl: 'https://kaushalbharat.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age range.',
      'Applicant should meet the required education criteria.',
      'Family income should be within the prescribed limit.',
      'Applicant must satisfy applicable location or residence conditions.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Address Proof',
      'Education Certificate',
      'Income Certificate',
    ],
    eligibilityRules: {
      minAge: 16,
      maxAge: 35,
      studentRequired: null,
      maxIncome: 200000,
      educationLevels: ['Class 10', 'Class 12', 'ITI'],
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'educationLevel',
      'state',
      'district',
    ],
  },

  {
    id: 'student-laptop-assistance',
    name: 'Student Laptop Assistance Scheme',
    category: 'Education',
    isDemoScheme: true,
    department: 'Department of Higher Education (Demo)',
    description:
      'One-time assistance for meritorious students from economically weaker sections to purchase a laptop.',
    benefits:
      'One-time subsidy towards laptop purchase.',
    officialUrl: 'https://www.education.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age criteria.',
      'Applicant should be a student.',
      'Family income must be within the prescribed limit.',
      'Applicant should meet the required education criteria.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Income Certificate',
      'Education Certificate',
      'Bank Account Details',
    ],
    eligibilityRules: {
      minAge: 17,
      maxAge: 25,
      studentRequired: true,
      maxIncome: 100000,
      educationLevels: ['Undergraduate', 'Postgraduate'],
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'educationLevel',
      'studentStatus',
      'state',
    ],
  },

  {
    id: 'small-business-startup-support',
    name: 'Small Business Startup Support Scheme',
    category: 'Small Business',
    isDemoScheme: true,
    department: 'Ministry of MSME (Demo)',
    description:
      'Seed support and low-interest loans for first-time small business owners.',
    benefits:
      'Collateral-free loan up to a demo ceiling amount.',
    officialUrl: 'https://www.msme.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age criteria.',
      'Applicant should meet the applicable business conditions.',
      'Annual income should be within the prescribed limit.',
      'Applicant should satisfy the scheme-specific requirements.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'PAN Card',
      'Address Proof',
      'Bank Account Details',
      'Business Plan',
    ],
    eligibilityRules: {
      minAge: 21,
      maxAge: 60,
      studentRequired: false,
      maxIncome: 600000,
      educationLevels: 'any',
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'occupation',
      'address',
      'state',
    ],
  },

  {
    id: 'farmer-technology-assistance',
    name: 'Farmer Technology Assistance Scheme',
    category: 'Agriculture',
    isDemoScheme: true,
    department: 'Ministry of Agriculture & Farmers Welfare (Demo)',
    description:
      'Subsidy for farmers adopting modern farm equipment and irrigation technology.',
    benefits:
      'Subsidy on approved farm equipment purchases.',
    officialUrl: 'https://agriwelfare.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age criteria.',
      'Applicant should meet the applicable farmer criteria.',
      'Annual income should be within the prescribed limit.',
      'Applicant must satisfy scheme-specific conditions.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Address Proof',
      'Land / Farmer Records',
      'Bank Account Details',
    ],
    eligibilityRules: {
      minAge: 21,
      maxAge: 65,
      studentRequired: false,
      maxIncome: 400000,
      educationLevels: 'any',
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'occupation',
      'address',
      'state',
      'district',
    ],
  },

  {
    id: 'healthcare-support-assistance',
    name: 'Healthcare Support Assistance Scheme',
    category: 'Healthcare',
    isDemoScheme: true,
    department: 'Ministry of Health & Family Welfare (Demo)',
    description:
      'Assistance towards essential medical treatment costs for low-income families.',
    benefits:
      'Partial reimbursement of approved treatment expenses.',
    officialUrl: 'https://www.mohfw.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed income criteria.',
      'Applicant must meet the applicable healthcare conditions.',
      'Required identity and income documents must be available.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Income Certificate',
      'Address Proof',
      'Medical Documents',
    ],
    eligibilityRules: {
      minAge: 0,
      maxAge: 100,
      studentRequired: null,
      maxIncome: 150000,
      educationLevels: 'any',
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'address',
      'state',
    ],
  },

  {
    id: 'housing-assistance',
    name: 'Housing Assistance Scheme',
    category: 'Housing',
    isDemoScheme: true,
    department: 'Ministry of Housing & Urban Affairs (Demo)',
    description:
      'Financial assistance for construction or purchase of a first home for eligible families.',
    benefits:
      'Interest subsidy on home loans.',
    officialUrl: 'https://pmaymis.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age criteria.',
      'Annual income must fall within the applicable category.',
      'Applicant should satisfy first-home or housing conditions.',
      'Required identity and address documents must be available.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Income Certificate',
      'Address Proof',
      'Bank Account Details',
      'Property-related Documents',
    ],
    eligibilityRules: {
      minAge: 21,
      maxAge: 60,
      studentRequired: false,
      maxIncome: 600000,
      educationLevels: 'any',
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'address',
      'state',
      'district',
    ],
  },

  {
    id: 'senior-citizen-support',
    name: 'Senior Citizen Support Scheme',
    category: 'Senior Citizens',
    isDemoScheme: true,
    department: 'Ministry of Social Justice & Empowerment (Demo)',
    description:
      'Monthly financial support and healthcare assistance for senior citizens.',
    benefits:
      'Monthly support stipend and healthcare access support.',
    officialUrl: 'https://socialjustice.gov.in/',
    requirements: [
      'Applicant must satisfy the senior citizen age criteria.',
      'Annual income must be within the prescribed limit.',
      'Applicant should satisfy the applicable residence conditions.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Age Proof',
      'Income Certificate',
      'Address Proof',
      'Bank Account Details',
    ],
    eligibilityRules: {
      minAge: 60,
      maxAge: 100,
      studentRequired: false,
      maxIncome: 300000,
      educationLevels: 'any',
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'address',
      'state',
      'district',
    ],
  },

  {
    id: 'vocational-training-scholarship',
    name: 'Vocational Training Scholarship',
    category: 'Skill Development',
    isDemoScheme: true,
    department: 'Ministry of Skill Development (Demo)',
    description:
      'Scholarship for students enrolling in recognised vocational training courses.',
    benefits:
      'Course fee scholarship for vocational training programmes.',
    officialUrl: 'https://www.skillindia.gov.in/',
    requirements: [
      'Applicant must satisfy the prescribed age criteria.',
      'Applicant should meet the required education criteria.',
      'Applicant should be a student or trainee where applicable.',
      'Family income must be within the prescribed limit.',
    ],
    documents: [
      'Aadhaar / ID Proof',
      'Income Certificate',
      'Education Certificate',
      'Training / Course Proof',
    ],
    eligibilityRules: {
      minAge: 16,
      maxAge: 28,
      studentRequired: true,
      maxIncome: 200000,
      educationLevels: [
        'Class 10',
        'Class 12',
        'ITI',
        'Diploma',
      ],
      states: 'any',
    },
    profileFieldsUsed: [
      'fullName',
      'dob',
      'annualIncome',
      'educationLevel',
      'studentStatus',
      'state',
    ],
  },
];

export default schemes;