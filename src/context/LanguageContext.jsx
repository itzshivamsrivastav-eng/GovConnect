import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    // =========================
    // COMMON / NAVBAR
    // =========================
    home: 'Home',
    digitalServices: 'Digital Services',
    schemes: 'Schemes',
    trackApplications: 'Track Applications',
    login: 'Login',
    accessibility: 'Accessibility',
    english: 'English',
    hindi: 'हिंदी',
    language: 'Language',

    dashboard: 'Dashboard',
    profile: 'Profile',
    applications: 'Applications',
    consent: 'Consent',
    grievances: 'Grievances',
    help: 'Help',

    governmentServicesPortal: 'Digital Government Services Portal',
    myProfile: 'My Profile',
    governmentSchemes: 'Government Schemes',
    myApplications: 'My Applications',
    myDocuments: 'My Documents',
    consentCenter: 'Consent Center',
    helpSupportNav: 'Help & Support',
    citizenServices: 'Citizen Services',
    assistance: 'Assistance',
    logout: 'Logout',
    secureTrusted: 'Secure & Trusted',
    dataProtected: 'Your data stays protected',
    citizenPortal: 'Citizen Portal',

    // =========================
    // LANDING
    // =========================
    oneProfile: 'One Profile. Every Government Service.',
    oneProfileShort: 'One Profile',
    multipleServices: 'Multiple Services',
    smarterTomorrow: 'A Smarter Tomorrow',

    getStarted: 'Get Started',
    browseServices: 'Browse Services',
    searchServices: 'Search services or schemes...',

    yourDigitalPortal: 'Your Digital Portal to',
    governmentService: 'every Government Service.',
    landingDescription:
      'Discover government services and schemes, manage your information once, and track your applications from one place.',

    oneProfileDashboard: 'One Profile Dashboard',
    oneProfileDashboardDescription:
      'Manage your information once and reuse it across government services.',

    schemeExplorer: 'Scheme Explorer',
    schemeExplorerDescription:
      'Find government schemes matched to your profile and needs.',

    serviceTracker: 'Service Tracker',
    serviceTrackerDescription:
      'Track applications and status updates from one dashboard.',

    helpSupportCenter: 'Help & Support Center',
    helpSupportCenterDescription:
      'Get guidance whenever you need help using GovConnect.',

    explore: 'Explore',
    smarterCitizenExperience: 'A smarter citizen experience',
    oneProfileHeading: 'One profile. Multiple government services.',
    multipleGovernmentServices: 'Multiple government services',

    govconnectDescription:
      'GovConnect brings government services, schemes, applications and support together in one simple digital experience.',

    aboutGovConnect: 'About GovConnect',
    dataPrivacy: 'Data & Privacy',
    helpSupport: 'Help & Support',
    copyright:
      '© 2026 GovConnect. Demo prototype for Smart India Hackathon.',
    demoPrototype: 'Demo Prototype',

    // =========================
    // DASHBOARD LAYOUT
    // =========================
    governmentServicesSchemes: 'Government Services & Schemes',
    discoverApplyTrack:
      'Discover, apply and track government services from one place.',

    notifications: 'Notifications',
    notification: 'Notification',
    applicationUpdated: 'Application Updated',
    applicationApproved: 'Application Approved',
    applicationSubmitted: 'Application Submitted',
    applicationUpdate: 'Application Update',
    new: 'new',
    updatesApplications: 'Updates on your applications',
    markAllRead: 'Mark all read',
    noNotifications: 'No notifications',
    noApplicationUpdates:
      "You don't have any application updates yet.",
    viewAllApplications: 'View all applications',
    recently: 'Recently',
    viewProfile: 'View Profile',

    // =========================
    // DASHBOARD
    // =========================
    citizenDashboard: 'Citizen Dashboard',
    welcomeBack: 'Welcome back,',
    citizen: 'Citizen',
    manageServices:
      'Manage your services, schemes and applications from one place.',
    manageServicesSchemes:
      'Manage your services, schemes and applications from one place.',
    viewMyProfile: 'View My Profile',

    accessGovernmentServices: 'Access government services',
    findEligibleSchemes: 'Find schemes you may be eligible for',
    trackApplicationsAction: 'Track Applications',
    trackAllApplications: 'Track all your applications',
    manageDataSharing: 'Manage your data sharing',

    myApplicationsTitle: 'My Applications',
    trackRecentApplications: 'Track your recent applications',
    noApplicationsYet: 'No applications yet',
    applyToTrack:
      'Apply for a digital service or scheme to start tracking it here.',
    startTracking:
      'Apply for a digital service or scheme to start tracking it here.',
    browseDigitalServices: 'Browse Digital Services',

    applicationOverview: 'Application Overview',
    currentApplicationStatus: 'Your current application status',
    manage: 'Manage',

    completed: 'Completed',
    approvedApplications: 'Approved applications',
    pending: 'Pending',
    submittedProcessing: 'Submitted or processing',
    likelyEligible: 'Likely Eligible',
    schemeMatches: 'Scheme matches',
    available: 'Available',
    schemesInGovConnect: 'Schemes in GovConnect',

    profileCompletion: 'Profile Completion',
    improveRecommendations: 'Improve your scheme recommendations',
    completeProfileBetter:
      'Complete your profile to get better scheme recommendations.',
    completeProfileDescription:
      'Complete your profile to get better scheme recommendations.',
    completeProfile: 'Complete Profile',
    profileComplete: 'Your profile is complete.',

    recentActivity: 'Recent Activity',
    latestUpdatesApplications: 'Latest updates from your applications',
    latest: 'Latest',
    noRecentActivity: 'No recent activity.',

    recommendedSchemes: 'Recommended Schemes',
    basedOnProfile: 'Based on your profile',
    viewAll: 'View All',

    applicationsLabel: 'Applications',
    demoScheme: 'Demo Scheme',
    match: 'Match',
    viewScheme: 'View Scheme',

    // =========================
    // DASHBOARD ACTIVITY
    // =========================
    applicationSubmittedActivity: 'application was submitted',
    documentsReceivedActivity: 'Documents received for',
    underVerificationActivity: 'is under verification',
    beingProcessedActivity: 'is being processed',
    applicationApprovedActivity: 'application was approved',
    applicationRejectedActivity: 'application was rejected',
    finalDecisionUpdatedActivity: 'final decision was updated',
    statusUpdatedActivity: 'status was updated',

    // =========================
    // UNIFIED TRACKING
    // =========================
    unifiedTracking: 'Unified Tracking — Everything in One Place',
    unifiedTrackingDescription:
      'Track applications from multiple government services and schemes through a single dashboard.',
    applicationId: 'Application ID:',
    applicationIdLabel: 'Application ID',
    submitted: 'Submitted:',
    trackApplicationsButton: 'Track Applications',

    scheme: 'SCHEME',
    digitalService: 'DIGITAL SERVICE',

    statusSubmitted: 'Submitted',
    statusProcessing: 'Processing',
    statusUnderReview: 'Under Review',
    statusActionRequired: 'Action Required',
    statusApproved: 'Approved',
    statusRejected: 'Rejected',

    // =========================
    // SERVICES
    // =========================
    digitalServicesDescription:
      'Discover real government digital services. Applications are submitted on the official government website — GovConnect helps you discover and track them.',
    searchDigitalServices: 'Search digital services...',
    all: 'All',
    noServicesFound: 'No services found',
    tryDifferentSearch:
      'Try a different search term or category.',

    // =========================
    // SCHEMES
    // =========================
    schemesPrototypeDescription:
      'Prototype/fictional schemes used to demonstrate rule-based eligibility matching, ranked by match percentage.',
    eligibilityEstimateDescription:
      'Eligibility shown by GovConnect is an estimate based on the information provided. Final eligibility is determined by the concerned authority.',
    searchSchemes: 'Search schemes...',
    noSchemesFound: 'No schemes found',

    // =========================
    // APPLICATIONS
    // =========================
    allStatus: 'All Status',
    trackApplicationsDescription:
      'Track the status and latest updates of your government service and scheme applications.',
    lastUpdated: 'Last Updated',
    name: 'Name',
    type: 'Type',
    department: 'Department',
    date: 'Date',
    status: 'Status',

    // =========================
    // APPLICATION DETAIL
    // =========================
    applicationNotFound: 'Application not found.',
    backToMyApplications: 'Back to My Applications',
    applicationDetails: 'Application details and current status.',
    progressTimeline: 'Progress Timeline',
    submissionDate: 'Submission Date',
    currentStatus: 'Current Status',

    // =========================
    // PROFILE
    // =========================
    profileDescription:
      'Manage your personal information once and reuse it across government services and schemes.',

    personalInformation: 'Personal Information',
    address: 'Address',
    education: 'Education',
    employment: 'Employment',
    financial: 'Financial',
    other: 'Other',

    fullName: 'Full Name',
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    mobileNumber: 'Mobile Number',
    email: 'Email',
    state: 'State',
    district: 'District',
    cityVillage: 'City / Village',
    pinCode: 'PIN Code',

    educationLevel: 'Education Level',
    institutionName: 'Institution Name',
    courseClass: 'Course / Class',
    studentStatus: 'Student Status',

    occupation: 'Occupation',
    employmentType: 'Employment Type',

    annualFamilyIncome: 'Annual Family Income',
    incomeCategory: 'Income Category',
    category: 'Category',
    maritalStatus: 'Marital Status',

    saveProfile: 'Save Profile',
    select: 'Select',
    profileSavedMessage: 'Profile saved successfully.',

    male: 'Male',
    female: 'Female',

    belowClass10: 'Below Class 10',
    class10: 'Class 10',
    class12: 'Class 12',
    iti: 'ITI',
    diploma: 'Diploma',
    undergraduate: 'Undergraduate',
    graduate: 'Graduate',
    postgraduate: 'Postgraduate',

    yes: 'Yes',
    no: 'No',

    notEmployed: 'Not Employed',
    salaried: 'Salaried',
    selfEmployed: 'Self Employed',
    businessOwner: 'Business Owner',
    farmer: 'Farmer',

    below25Lakh: 'Below ₹2.5 Lakh',
    income25To5Lakh: '₹2.5–5 Lakh',
    income5To10Lakh: '₹5–10 Lakh',
    above10Lakh: 'Above ₹10 Lakh',

    general: 'General',
    obc: 'OBC',
    sc: 'SC',
    st: 'ST',
    ews: 'EWS',

    unmarried: 'Unmarried',
    married: 'Married',
    widowed: 'Widowed',
    divorced: 'Divorced',

    // =========================
    // CONSENT
    // =========================
    consentGranted: 'Consent granted successfully.',
    consentRequestDeclined: 'Consent request declined.',
    consentRevoked: 'Consent revoked successfully.',

    consentDescription:
      'Manage which applications and services can access your profile information.',

    pendingConsentRequests: 'Pending Consent Requests',
    noPendingRequests: 'No pending requests',
    noPendingConsentRequests:
      'There are no pending consent requests.',

    duration: 'Duration',
    grantConsent: 'Grant Consent',
    decline: 'Decline',

    activeConsents: 'Active Consents',
    noActiveConsents: 'No active consents',
    noActiveConsentDescription:
      'You have not granted access to any application or service yet.',

    grantedOn: 'Granted On',
    revokeThisConsent: 'Revoke this consent',
    yesRevoke: 'Yes, Revoke',
    cancel: 'Cancel',
    revoke: 'Revoke',

    consentHistory: 'Consent History',
    noHistoryYet: 'No consent history yet',
    noHistoryDescription:
      'Your consent activity will appear here.',

    // =========================
    // GRIEVANCES
    // =========================
    grievancesDescription:
      'Raise and track grievances related to government services and applications.',

    myGrievances: 'My Grievances',
    fileGrievance: 'File Grievance',
    description: 'Description',

    applicationDelay: 'Application Delay',
    incorrectInformation: 'Incorrect Information',
    portalAccessIssue: 'Portal Access Issue',
    documentIssue: 'Document Issue',

    grievanceFiledSuccessfully:
      'Grievance filed successfully.',

    // =========================
    // HELP
    // =========================
    faqDescription:
      'Find answers to common questions about GovConnect and government services.',

    contactSupport: 'Contact Support',
    mockSupportDescription:
      'For this prototype, support is represented as a demo experience.',

    faqWhatIsGovConnect: 'What is GovConnect?',
    faqWhatIsGovConnectAnswer:
      'GovConnect is a unified digital platform that helps citizens discover government services and schemes, manage their profile, and track applications.',

    faqDoesSubmitApplications:
      'Does GovConnect submit applications?',
    faqDoesSubmitApplicationsAnswer:
      'No. GovConnect helps you discover services and schemes and provides tracking and autofill assistance. Applications are submitted through the official government portal.',

    faqAadhaarDigiLocker:
      'How does Aadhaar / DigiLocker integration work?',
    faqAadhaarDigiLockerAnswer:
      'The prototype demonstrates how verified information and documents could be reused with appropriate user consent.',

    faqApplicationTracking:
      'How does application tracking work?',
    faqApplicationTrackingAnswer:
      'You can add applications to GovConnect and monitor their status and timeline from a single dashboard.',

    faqSchemeMatching:
      'How does scheme matching work?',
    faqSchemeMatchingAnswer:
      'GovConnect compares your profile information with scheme eligibility criteria and provides an estimated match percentage.',

    faqConsentManagement:
      'What is Consent Management?',
    faqConsentManagementAnswer:
      'Consent Management lets you control when your profile information can be shared with participating services.',

    faqRealGrievance:
      'Can I file a real grievance here?',
    faqRealGrievanceAnswer:
      'No. The grievance feature in this prototype is for demonstration purposes only.',

    // =========================
    // SERVICE DETAIL
    // =========================
    serviceNotFound: 'Service not found.',
    enterApplicationId: 'Please enter an application ID.',
    applicationAddedForTracking:
      'Application added for tracking successfully.',

    requirements: 'Requirements',
    requiredDocuments: 'Required Documents',
    requiredDocumentsDescription:
      'The following documents may be required for this service.',
    optional: 'Optional',

    informationAvailableFromProfile:
      'Information available from your profile',
    availableFromProfile: 'Available from Profile',

    addApplicationForTracking: 'Add Application for Tracking',
    addApplicationForTrackingDescription:
      'Enter your application details to track its status through GovConnect.',

    service: 'Service',
    applicationDate: 'Application Date',

    applyOnOfficialWebsite: 'Apply on Official Website',
    officialApplicationDescription:
      'Applications are submitted through the official government website.',

    fillWithGovConnect: 'Fill with GovConnect',
    fillWithGovConnectDescription:
      'Use your saved profile information to simplify the application process.',

    govConnectAssistance: 'GovConnect Assistance',
    reuseProfileInformation:
      'Reuse your saved profile information',
    attachDocumentsDescription:
      'Attach required documents from your available documents.',

    trackApplicationDescription:
      'Track your application status and updates from your GovConnect dashboard.',

    // =========================
    // SCHEME DETAIL
    // =========================
    schemeNotFound: 'Scheme not found.',
    officialWebsiteLinkUnavailable:
      'Official website link is currently unavailable.',
    schemeApplicationAddedForTracking:
      'Scheme application added for tracking successfully.',

    benefits: 'Benefits',
    eligibilityCriteria: 'Eligibility Criteria',

    govConnectEligibilityEstimate:
      'GovConnect Eligibility Estimate',
    checkOfficialPortalRequirements:
      'Please check the official portal for final requirements.',
    checkOfficialPortalDocuments:
      'Please verify the required documents on the official government portal.',

    noProfileInformationConfigured:
      'No profile information has been configured yet.',

    important: 'Important',
    eligibilityDisclaimer:
      'Eligibility shown by GovConnect is only an estimate. Final eligibility is determined by the concerned authority.',

    schemeTrackingDescription:
      'Add your scheme application to GovConnect to track its status and updates.',

    govConnectMatch: 'GovConnect Match',
    profileMatchesCriteria: 'Your profile matches the criteria',
    someCriteriaMayNotMatch:
      'Some criteria may not match your profile',
    eligibilityNeedsReview: 'Eligibility Needs Review',
    eligibilitySummary: 'Eligibility Summary',

    schemeAutofillDescription:
      'Use your saved profile information to simplify the application process.',

    schemeInformation: 'Scheme Information',
    application: 'Application',
    officialGovernmentPortal: 'Official Government Portal',

    // =========================
    // MOCK PORTAL
    // =========================
    demoPortalNotFound: 'Demo portal not found.',
    requestedServiceSchemeNotFound:
      'The requested service or scheme could not be found.',

    back: 'Back',

    applicationSubmittedSuccessfully:
      'Application submitted successfully.',
    applicationRecordedSuccessfully:
      'Your application has been recorded successfully.',

    generating: 'Generating...',
    copyId: 'Copy ID',

    governmentDepartment: 'Government Department',
    submittedOn: 'Submitted On',
    currentStatus: 'Current Status',

    prototypeSubmissionNotice:
      'This is a prototype submission for demonstration purposes.',
    backToDetails: 'Back to Details',
    submitAnotherApplication: 'Submit Another Application',

    mockPortalNoticeBefore:
      'You are entering a simulated government application portal for',
    mockGovernmentPortal: 'Mock Government Portal',
    mockPortalNoticeAfter:
      'This portal is for demonstration purposes only.',

    applicationFormDemoGovernmentPortal:
      'Application form demo for a government portal',

    applicantInformation: 'Applicant Information',
    enterRequiredInformation:
      'Enter the required information below.',

    emailAddress: 'Email Address',
    autoFilledFromProfile: 'Auto-filled from your profile',

    submitApplication: 'Submit Application',
    demoSubmissionOnly:
      'This is a demo submission. No real government application will be submitted.',

    govConnectAutofillDescription:
      'GovConnect can use your saved profile information to fill supported fields.',

    govConnectAutofill: 'GovConnect Autofill',
    profileInformation: 'Profile Information',
    profileDataAvailable: 'Profile data available',

    applicationInformation: 'Application Information',
    governmentScheme: 'Government Scheme',
    portal: 'Portal',
    governmentPortal: 'Government Portal',

    openOfficialWebsite: 'Open Official Website',
    useGovConnectAutofill: 'Use GovConnect Autofill',
    reviewBeforeFilling: 'Review Before Filling',

    govConnectWillUseProfile:
      'GovConnect will use your saved profile information.',
    informationToBeUsed: 'Information to be used',

    consentAutofillSimulated:
      'Consent and autofill are simulated for this prototype.',

    allowAndFill: 'Allow & Fill',

    // =========================
    // LOGIN
    // =========================
    welcome: 'Welcome',
    demoLoginSuccess: 'Demo login successful.',
    loginDescription:
      'Sign in to access your personalized government services dashboard.',
    enterFullName: 'Enter your full name',
    emailOrMobile: 'Email or Mobile Number',
    password: 'Password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    or: 'OR',
    useDemoAccount: 'Use Demo Account',
    demoAccountDescription:
      'Use the demo account to explore the GovConnect prototype.',

    // =========================
    // OFFICER
    // =========================
    totalApplications: 'Total Applications',
    openGrievances: 'Open Grievances',
    officerDashboard: 'Officer Dashboard',
    citizenView: 'Citizen View',
    officerDashboardDescription:
      'Monitor applications and demonstrate interoperability across government systems.',

    citizen: 'Citizen',
    mockIntegrationStatus: 'Mock Integration Status',

    identityRegistry: 'Identity Registry',
    educationRegistry: 'Education Registry',
    incomeSystem: 'Income System',
    departmentSystem: 'Department System',

    mockConnected: 'Mock Connected',
    mockProcessing: 'Mock Processing',

    dataMappingDemo: 'Data Mapping Demo',
    applicantName: 'Applicant Name',
    beneficiaryName: 'Beneficiary Name',
    citizenName: 'Citizen Name',

    yearlyIncome: 'Yearly Income',
    familyIncome: 'Family Income',
    annualEarnings: 'Annual Earnings',

    residentialAddress: 'Residential Address',
    permanentAddress: 'Permanent Address',
    domicileAddress: 'Domicile Address',

    interoperabilityFlow: 'Interoperability Flow',
    interoperabilityFlowDescription:
      'GovConnect demonstrates how information could move securely between connected government systems.',
    govConnect: 'GovConnect',
    interoperabilityLayer: 'Interoperability Layer',
  },

  // ==========================================================
  // HINDI
  // ==========================================================
  hi: {
    // =========================
    // COMMON / NAVBAR
    // =========================
    home: 'होम',
    digitalServices: 'डिजिटल सेवाएँ',
    schemes: 'योजनाएँ',
    trackApplications: 'आवेदन ट्रैक करें',
    login: 'लॉगिन',
    accessibility: 'सुलभता',
    english: 'English',
    hindi: 'हिंदी',
    language: 'भाषा',

    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफ़ाइल',
    applications: 'आवेदन',
    consent: 'सहमति',
    grievances: 'शिकायतें',
    help: 'सहायता',

    governmentServicesPortal: 'डिजिटल सरकारी सेवा पोर्टल',
    myProfile: 'मेरी प्रोफ़ाइल',
    governmentSchemes: 'सरकारी योजनाएँ',
    myApplications: 'मेरे आवेदन',
    myDocuments: 'मेरे दस्तावेज़',
    consentCenter: 'सहमति केंद्र',
    helpSupportNav: 'सहायता और समर्थन',
    citizenServices: 'नागरिक सेवाएँ',
    assistance: 'सहायता',
    logout: 'लॉगआउट',
    secureTrusted: 'सुरक्षित और विश्वसनीय',
    dataProtected: 'आपका डेटा सुरक्षित रहता है',
    citizenPortal: 'नागरिक पोर्टल',

    // =========================
    // LANDING
    // =========================
    oneProfile: 'एक प्रोफ़ाइल। हर सरकारी सेवा।',
    oneProfileShort: 'एक प्रोफ़ाइल',
    multipleServices: 'कई सेवाएँ',
    smarterTomorrow: 'एक बेहतर कल',

    getStarted: 'शुरू करें',
    browseServices: 'सेवाएँ देखें',
    searchServices: 'सेवाएँ या योजनाएँ खोजें...',

    yourDigitalPortal: 'हर सरकारी सेवा के लिए आपका डिजिटल पोर्टल',
    governmentService: '',
    landingDescription:
      'सरकारी सेवाएँ और योजनाएँ खोजें, अपनी जानकारी एक बार प्रबंधित करें और अपने आवेदनों को एक ही स्थान से ट्रैक करें।',

    oneProfileDashboard: 'एक प्रोफ़ाइल डैशबोर्ड',
    oneProfileDashboardDescription:
      'अपनी जानकारी एक बार प्रबंधित करें और सरकारी सेवाओं में दोबारा उपयोग करें।',

    schemeExplorer: 'योजना एक्सप्लोरर',
    schemeExplorerDescription:
      'अपनी प्रोफ़ाइल और जरूरतों के अनुसार सरकारी योजनाएँ खोजें।',

    serviceTracker: 'सेवा ट्रैकर',
    serviceTrackerDescription:
      'एक ही डैशबोर्ड से आवेदनों और उनके स्टेटस अपडेट को ट्रैक करें।',

    helpSupportCenter: 'सहायता केंद्र',
    helpSupportCenterDescription:
      'GovConnect का उपयोग करते समय जरूरत पड़ने पर मार्गदर्शन प्राप्त करें।',

    explore: 'देखें',
    smarterCitizenExperience: 'बेहतर नागरिक अनुभव',
    oneProfileHeading: 'एक प्रोफ़ाइल। कई सरकारी सेवाएँ।',
    multipleGovernmentServices: 'कई सरकारी सेवाएँ',

    govconnectDescription:
      'GovConnect सरकारी सेवाओं, योजनाओं, आवेदनों और सहायता को एक सरल डिजिटल अनुभव में एक साथ लाता है।',

    aboutGovConnect: 'GovConnect के बारे में',
    dataPrivacy: 'डेटा और गोपनीयता',
    helpSupport: 'सहायता और समर्थन',
    copyright:
      '© 2026 GovConnect. स्मार्ट इंडिया हैकाथॉन के लिए डेमो प्रोटोटाइप।',
    demoPrototype: 'डेमो प्रोटोटाइप',

    // =========================
    // DASHBOARD LAYOUT
    // =========================
    governmentServicesSchemes: 'सरकारी सेवाएँ और योजनाएँ',
    discoverApplyTrack:
      'एक ही स्थान से सरकारी सेवाएँ खोजें, आवेदन करें और ट्रैक करें।',

    notifications: 'सूचनाएँ',
    notification: 'सूचना',
    applicationUpdated: 'आवेदन अपडेट हुआ',
    applicationApproved: 'आवेदन स्वीकृत',
    applicationSubmitted: 'आवेदन जमा हुआ',
    applicationUpdate: 'आवेदन अपडेट',
    new: 'नई',
    updatesApplications: 'आपके आवेदनों के अपडेट',
    markAllRead: 'सभी को पढ़ा हुआ करें',
    noNotifications: 'कोई सूचना नहीं',
    noApplicationUpdates:
      'अभी आपके किसी आवेदन का अपडेट नहीं है।',
    viewAllApplications: 'सभी आवेदन देखें',
    recently: 'हाल ही में',
    viewProfile: 'प्रोफ़ाइल देखें',

    // =========================
    // DASHBOARD
    // =========================
    citizenDashboard: 'नागरिक डैशबोर्ड',
    welcomeBack: 'वापसी पर स्वागत है,',
    citizen: 'नागरिक',
    manageServices:
      'अपनी सेवाओं, योजनाओं और आवेदनों को एक ही स्थान से प्रबंधित करें।',
    manageServicesSchemes:
      'अपनी सेवाओं, योजनाओं और आवेदनों को एक ही स्थान से प्रबंधित करें।',
    viewMyProfile: 'मेरी प्रोफ़ाइल देखें',

    accessGovernmentServices: 'सरकारी सेवाओं तक पहुँचें',
    findEligibleSchemes:
      'वे योजनाएँ खोजें जिनके लिए आप पात्र हो सकते हैं',
    trackApplicationsAction: 'आवेदन ट्रैक करें',
    trackAllApplications: 'अपने सभी आवेदन ट्रैक करें',
    manageDataSharing: 'अपने डेटा साझा करने को प्रबंधित करें',

    myApplicationsTitle: 'मेरे आवेदन',
    trackRecentApplications: 'अपने हाल के आवेदनों को ट्रैक करें',
    noApplicationsYet: 'अभी कोई आवेदन नहीं है',
    applyToTrack:
      'ट्रैकिंग शुरू करने के लिए किसी डिजिटल सेवा या योजना के लिए आवेदन करें।',
    startTracking:
      'ट्रैकिंग शुरू करने के लिए किसी डिजिटल सेवा या योजना के लिए आवेदन करें।',
    browseDigitalServices: 'डिजिटल सेवाएँ देखें',

    applicationOverview: 'आवेदन का विवरण',
    currentApplicationStatus: 'आपके वर्तमान आवेदन की स्थिति',
    manage: 'प्रबंधित करें',

    completed: 'पूर्ण',
    approvedApplications: 'स्वीकृत आवेदन',
    pending: 'लंबित',
    submittedProcessing: 'जमा या प्रक्रिया में',
    likelyEligible: 'संभावित रूप से पात्र',
    schemeMatches: 'योजना मिलान',
    available: 'उपलब्ध',
    schemesInGovConnect: 'GovConnect में योजनाएँ',

    profileCompletion: 'प्रोफ़ाइल पूर्णता',
    improveRecommendations: 'अपनी योजना सिफारिशों को बेहतर करें',
    completeProfileBetter:
      'बेहतर योजना सिफारिशों के लिए अपनी प्रोफ़ाइल पूरी करें।',
    completeProfileDescription:
      'बेहतर योजना सिफारिशों के लिए अपनी प्रोफ़ाइल पूरी करें।',
    completeProfile: 'प्रोफ़ाइल पूरी करें',
    profileComplete: 'आपकी प्रोफ़ाइल पूरी है।',

    recentActivity: 'हाल की गतिविधि',
    latestUpdatesApplications: 'आपके आवेदनों के नवीनतम अपडेट',
    latest: 'नवीनतम',
    noRecentActivity: 'हाल की कोई गतिविधि नहीं।',

    recommendedSchemes: 'अनुशंसित योजनाएँ',
    basedOnProfile: 'आपकी प्रोफ़ाइल के आधार पर',
    viewAll: 'सभी देखें',

    applicationsLabel: 'आवेदन',
    demoScheme: 'डेमो योजना',
    match: 'मिलान',
    viewScheme: 'योजना देखें',

    // =========================
    // DASHBOARD ACTIVITY
    // =========================
    applicationSubmittedActivity: 'आवेदन जमा हुआ',
    documentsReceivedActivity: 'के दस्तावेज़ प्राप्त हुए',
    underVerificationActivity: 'सत्यापन के अंतर्गत है',
    beingProcessedActivity: 'प्रक्रिया में है',
    applicationApprovedActivity: 'आवेदन स्वीकृत हुआ',
    applicationRejectedActivity: 'आवेदन अस्वीकृत हुआ',
    finalDecisionUpdatedActivity: 'अंतिम निर्णय अपडेट हुआ',
    statusUpdatedActivity: 'स्थिति अपडेट हुई',

    // =========================
    // UNIFIED TRACKING
    // =========================
    unifiedTracking: 'एकीकृत ट्रैकिंग — सब कुछ एक ही स्थान पर',
    unifiedTrackingDescription:
      'कई सरकारी सेवाओं और योजनाओं के आवेदनों को एक ही डैशबोर्ड से ट्रैक करें।',
    applicationId: 'आवेदन आईडी:',
    applicationIdLabel: 'आवेदन आईडी',
    submitted: 'जमा किया गया:',
    trackApplicationsButton: 'आवेदन ट्रैक करें',

    scheme: 'योजना',
    digitalService: 'डिजिटल सेवा',

    statusSubmitted: 'जमा किया गया',
    statusProcessing: 'प्रक्रिया में',
    statusUnderReview: 'समीक्षा में',
    statusActionRequired: 'कार्रवाई आवश्यक',
    statusApproved: 'स्वीकृत',
    statusRejected: 'अस्वीकृत',

    // =========================
    // SERVICES
    // =========================
    digitalServicesDescription:
      'वास्तविक सरकारी डिजिटल सेवाएँ खोजें। आवेदन आधिकारिक सरकारी वेबसाइट पर जमा किए जाते हैं — GovConnect आपको उन्हें खोजने और ट्रैक करने में मदद करता है।',
    searchDigitalServices: 'डिजिटल सेवाएँ खोजें...',
    all: 'सभी',
    noServicesFound: 'कोई सेवा नहीं मिली',
    tryDifferentSearch:
      'कोई दूसरा खोज शब्द या श्रेणी आज़माएँ।',

    // =========================
    // SCHEMES
    // =========================
    schemesPrototypeDescription:
      'ये प्रोटोटाइप/काल्पनिक योजनाएँ नियम-आधारित पात्रता मिलान प्रदर्शित करने के लिए उपयोग की गई हैं और मिलान प्रतिशत के आधार पर रैंक की गई हैं।',
    eligibilityEstimateDescription:
      'GovConnect द्वारा दिखाई गई पात्रता दी गई जानकारी के आधार पर एक अनुमान है। अंतिम पात्रता संबंधित प्राधिकरण द्वारा निर्धारित की जाती है।',
    searchSchemes: 'योजनाएँ खोजें...',
    noSchemesFound: 'कोई योजना नहीं मिली',

    // =========================
    // APPLICATIONS
    // =========================
    allStatus: 'सभी स्थिति',
    trackApplicationsDescription:
      'अपने सरकारी सेवा और योजना आवेदनों की स्थिति और नवीनतम अपडेट ट्रैक करें।',
    lastUpdated: 'अंतिम अपडेट',
    name: 'नाम',
    type: 'प्रकार',
    department: 'विभाग',
    date: 'तारीख',
    status: 'स्थिति',

    // =========================
    // APPLICATION DETAIL
    // =========================
    applicationNotFound: 'आवेदन नहीं मिला।',
    backToMyApplications: 'मेरे आवेदनों पर वापस जाएँ',
    applicationDetails: 'आवेदन का विवरण और वर्तमान स्थिति।',
    progressTimeline: 'प्रगति टाइमलाइन',
    submissionDate: 'जमा करने की तारीख',
    currentStatus: 'वर्तमान स्थिति',

    // =========================
    // PROFILE
    // =========================
    profileDescription:
      'अपनी व्यक्तिगत जानकारी एक बार प्रबंधित करें और सरकारी सेवाओं तथा योजनाओं में दोबारा उपयोग करें।',

    personalInformation: 'व्यक्तिगत जानकारी',
    address: 'पता',
    education: 'शिक्षा',
    employment: 'रोज़गार',
    financial: 'वित्तीय',
    other: 'अन्य',

    fullName: 'पूरा नाम',
    fatherName: 'पिता का नाम',
    motherName: 'माता का नाम',
    dateOfBirth: 'जन्म तिथि',
    gender: 'लिंग',
    mobileNumber: 'मोबाइल नंबर',
    email: 'ईमेल',
    state: 'राज्य',
    district: 'जिला',
    cityVillage: 'शहर / गाँव',
    pinCode: 'पिन कोड',

    educationLevel: 'शिक्षा का स्तर',
    institutionName: 'संस्थान का नाम',
    courseClass: 'कोर्स / कक्षा',
    studentStatus: 'छात्र स्थिति',

    occupation: 'व्यवसाय',
    employmentType: 'रोज़गार का प्रकार',

    annualFamilyIncome: 'वार्षिक पारिवारिक आय',
    incomeCategory: 'आय वर्ग',
    category: 'श्रेणी',
    maritalStatus: 'वैवाहिक स्थिति',

    saveProfile: 'प्रोफ़ाइल सहेजें',
    select: 'चुनें',
    profileSavedMessage: 'प्रोफ़ाइल सफलतापूर्वक सहेजी गई।',

    male: 'पुरुष',
    female: 'महिला',

    belowClass10: 'कक्षा 10 से नीचे',
    class10: 'कक्षा 10',
    class12: 'कक्षा 12',
    iti: 'आईटीआई',
    diploma: 'डिप्लोमा',
    undergraduate: 'स्नातक स्तर',
    graduate: 'स्नातक',
    postgraduate: 'स्नातकोत्तर',

    yes: 'हाँ',
    no: 'नहीं',

    notEmployed: 'रोज़गार नहीं',
    salaried: 'वेतनभोगी',
    selfEmployed: 'स्वरोज़गार',
    businessOwner: 'व्यवसाय मालिक',
    farmer: 'किसान',

    below25Lakh: '₹2.5 लाख से कम',
    income25To5Lakh: '₹2.5–5 लाख',
    income5To10Lakh: '₹5–10 लाख',
    above10Lakh: '₹10 लाख से अधिक',

    general: 'सामान्य',
    obc: 'ओबीसी',
    sc: 'एससी',
    st: 'एसटी',
    ews: 'ईडब्ल्यूएस',

    unmarried: 'अविवाहित',
    married: 'विवाहित',
    widowed: 'विधवा/विधुर',
    divorced: 'तलाकशुदा',

    // =========================
    // CONSENT
    // =========================
    consentGranted: 'सहमति सफलतापूर्वक प्रदान की गई।',
    consentRequestDeclined: 'सहमति अनुरोध अस्वीकार किया गया।',
    consentRevoked: 'सहमति सफलतापूर्वक वापस ली गई।',

    consentDescription:
      'प्रबंधित करें कि कौन से आवेदन और सेवाएँ आपकी प्रोफ़ाइल जानकारी तक पहुँच सकती हैं।',

    pendingConsentRequests: 'लंबित सहमति अनुरोध',
    noPendingRequests: 'कोई लंबित अनुरोध नहीं है',
    noPendingConsentRequests:
      'कोई लंबित सहमति अनुरोध नहीं है।',

    duration: 'अवधि',
    grantConsent: 'सहमति दें',
    decline: 'अस्वीकार करें',

    activeConsents: 'सक्रिय सहमतियाँ',
    noActiveConsents: 'कोई सक्रिय सहमति नहीं',
    noActiveConsentDescription:
      'आपने अभी तक किसी आवेदन या सेवा को पहुँच प्रदान नहीं की है।',

    grantedOn: 'प्रदान की गई तारीख',
    revokeThisConsent: 'इस सहमति को वापस लें',
    yesRevoke: 'हाँ, वापस लें',
    cancel: 'रद्द करें',
    revoke: 'वापस लें',

    consentHistory: 'सहमति इतिहास',
    noHistoryYet: 'अभी कोई सहमति इतिहास नहीं है',
    noHistoryDescription:
      'आपकी सहमति गतिविधि यहाँ दिखाई देगी।',

    // =========================
    // GRIEVANCES
    // =========================
    grievancesDescription:
      'सरकारी सेवाओं और आवेदनों से संबंधित शिकायतें दर्ज करें और ट्रैक करें।',

    myGrievances: 'मेरी शिकायतें',
    fileGrievance: 'शिकायत दर्ज करें',
    description: 'विवरण',

    applicationDelay: 'आवेदन में देरी',
    incorrectInformation: 'गलत जानकारी',
    portalAccessIssue: 'पोर्टल एक्सेस समस्या',
    documentIssue: 'दस्तावेज़ समस्या',

    grievanceFiledSuccessfully:
      'शिकायत सफलतापूर्वक दर्ज की गई।',

    // =========================
    // HELP
    // =========================
    faqDescription:
      'GovConnect और सरकारी सेवाओं से संबंधित सामान्य प्रश्नों के उत्तर खोजें।',

    contactSupport: 'सहायता से संपर्क करें',
    mockSupportDescription:
      'इस प्रोटोटाइप में सहायता को एक डेमो अनुभव के रूप में दिखाया गया है।',

    faqWhatIsGovConnect: 'GovConnect क्या है?',
    faqWhatIsGovConnectAnswer:
      'GovConnect एक एकीकृत डिजिटल प्लेटफ़ॉर्म है जो नागरिकों को सरकारी सेवाएँ और योजनाएँ खोजने, अपनी प्रोफ़ाइल प्रबंधित करने और आवेदनों को ट्रैक करने में मदद करता है।',

    faqDoesSubmitApplications:
      'क्या GovConnect आवेदन जमा करता है?',
    faqDoesSubmitApplicationsAnswer:
      'नहीं। GovConnect सेवाओं और योजनाओं को खोजने तथा ट्रैकिंग और ऑटोफिल सहायता प्रदान करता है। आवेदन आधिकारिक सरकारी पोर्टल के माध्यम से जमा किए जाते हैं।',

    faqAadhaarDigiLocker:
      'आधार / DigiLocker एकीकरण कैसे काम करता है?',
    faqAadhaarDigiLockerAnswer:
      'यह प्रोटोटाइप दिखाता है कि उचित उपयोगकर्ता सहमति के साथ सत्यापित जानकारी और दस्तावेज़ों का दोबारा उपयोग कैसे किया जा सकता है।',

    faqApplicationTracking:
      'आवेदन ट्रैकिंग कैसे काम करती है?',
    faqApplicationTrackingAnswer:
      'आप GovConnect में आवेदन जोड़ सकते हैं और एक ही डैशबोर्ड से उसकी स्थिति तथा टाइमलाइन देख सकते हैं।',

    faqSchemeMatching:
      'योजना मिलान कैसे काम करता है?',
    faqSchemeMatchingAnswer:
      'GovConnect आपकी प्रोफ़ाइल जानकारी की तुलना योजना की पात्रता शर्तों से करता है और अनुमानित मिलान प्रतिशत प्रदान करता है।',

    faqConsentManagement:
      'सहमति प्रबंधन क्या है?',
    faqConsentManagementAnswer:
      'सहमति प्रबंधन आपको यह नियंत्रित करने देता है कि आपकी प्रोफ़ाइल जानकारी कब संबंधित सेवाओं के साथ साझा की जा सकती है।',

    faqRealGrievance:
      'क्या मैं यहाँ वास्तविक शिकायत दर्ज कर सकता हूँ?',
    faqRealGrievanceAnswer:
      'नहीं। इस प्रोटोटाइप की शिकायत सुविधा केवल प्रदर्शन के लिए है।',

    // =========================
    // SERVICE DETAIL
    // =========================
    serviceNotFound: 'सेवा नहीं मिली।',
    enterApplicationId: 'कृपया आवेदन आईडी दर्ज करें।',
    applicationAddedForTracking:
      'आवेदन सफलतापूर्वक ट्रैकिंग के लिए जोड़ा गया।',

    requirements: 'आवश्यकताएँ',
    requiredDocuments: 'आवश्यक दस्तावेज़',
    requiredDocumentsDescription:
      'इस सेवा के लिए निम्नलिखित दस्तावेज़ आवश्यक हो सकते हैं।',
    optional: 'वैकल्पिक',

    informationAvailableFromProfile:
      'आपकी प्रोफ़ाइल से उपलब्ध जानकारी',
    availableFromProfile: 'प्रोफ़ाइल से उपलब्ध',

    addApplicationForTracking: 'ट्रैकिंग के लिए आवेदन जोड़ें',
    addApplicationForTrackingDescription:
      'GovConnect के माध्यम से स्थिति ट्रैक करने के लिए अपने आवेदन का विवरण दर्ज करें।',

    service: 'सेवा',
    applicationDate: 'आवेदन की तारीख',

    applyOnOfficialWebsite: 'आधिकारिक वेबसाइट पर आवेदन करें',
    officialApplicationDescription:
      'आवेदन आधिकारिक सरकारी वेबसाइट के माध्यम से जमा किए जाते हैं।',

    fillWithGovConnect: 'GovConnect से भरें',
    fillWithGovConnectDescription:
      'आवेदन प्रक्रिया को आसान बनाने के लिए अपनी सहेजी गई प्रोफ़ाइल जानकारी का उपयोग करें।',

    govConnectAssistance: 'GovConnect सहायता',
    reuseProfileInformation:
      'अपनी सहेजी गई प्रोफ़ाइल जानकारी का दोबारा उपयोग करें',
    attachDocumentsDescription:
      'उपलब्ध दस्तावेज़ों में से आवश्यक दस्तावेज़ जोड़ें।',

    trackApplicationDescription:
      'अपने GovConnect डैशबोर्ड से आवेदन की स्थिति और अपडेट ट्रैक करें।',

    // =========================
    // SCHEME DETAIL
    // =========================
    schemeNotFound: 'योजना नहीं मिली।',
    officialWebsiteLinkUnavailable:
      'आधिकारिक वेबसाइट का लिंक अभी उपलब्ध नहीं है।',
    schemeApplicationAddedForTracking:
      'योजना का आवेदन सफलतापूर्वक ट्रैकिंग के लिए जोड़ा गया।',

    benefits: 'लाभ',
    eligibilityCriteria: 'पात्रता मानदंड',

    govConnectEligibilityEstimate:
      'GovConnect पात्रता अनुमान',
    checkOfficialPortalRequirements:
      'अंतिम आवश्यकताओं के लिए आधिकारिक पोर्टल देखें।',
    checkOfficialPortalDocuments:
      'आवश्यक दस्तावेज़ों की पुष्टि आधिकारिक सरकारी पोर्टल पर करें।',

    noProfileInformationConfigured:
      'अभी कोई प्रोफ़ाइल जानकारी कॉन्फ़िगर नहीं की गई है।',

    important: 'महत्वपूर्ण',
    eligibilityDisclaimer:
      'GovConnect द्वारा दिखाई गई पात्रता केवल एक अनुमान है। अंतिम पात्रता संबंधित प्राधिकरण द्वारा निर्धारित की जाती है।',

    schemeTrackingDescription:
      'स्थिति और अपडेट ट्रैक करने के लिए अपने योजना आवेदन को GovConnect में जोड़ें।',

    govConnectMatch: 'GovConnect मिलान',
    profileMatchesCriteria:
      'आपकी प्रोफ़ाइल मानदंड से मेल खाती है',
    someCriteriaMayNotMatch:
      'कुछ मानदंड आपकी प्रोफ़ाइल से मेल नहीं खा सकते',
    eligibilityNeedsReview: 'पात्रता की समीक्षा आवश्यक',
    eligibilitySummary: 'पात्रता सारांश',

    schemeAutofillDescription:
      'आवेदन प्रक्रिया को आसान बनाने के लिए अपनी सहेजी गई प्रोफ़ाइल जानकारी का उपयोग करें।',

    schemeInformation: 'योजना की जानकारी',
    application: 'आवेदन',
    officialGovernmentPortal: 'आधिकारिक सरकारी पोर्टल',

    // =========================
    // MOCK PORTAL
    // =========================
    demoPortalNotFound: 'डेमो पोर्टल नहीं मिला।',
    requestedServiceSchemeNotFound:
      'अनुरोधित सेवा या योजना नहीं मिली।',

    back: 'वापस',

    applicationSubmittedSuccessfully:
      'आवेदन सफलतापूर्वक जमा किया गया।',
    applicationRecordedSuccessfully:
      'आपका आवेदन सफलतापूर्वक रिकॉर्ड किया गया है।',

    generating: 'बनाया जा रहा है...',
    copyId: 'आईडी कॉपी करें',

    governmentDepartment: 'सरकारी विभाग',
    submittedOn: 'जमा करने की तारीख',
    currentStatus: 'वर्तमान स्थिति',

    prototypeSubmissionNotice:
      'यह केवल प्रदर्शन के लिए एक प्रोटोटाइप आवेदन है।',
    backToDetails: 'विवरण पर वापस जाएँ',
    submitAnotherApplication: 'एक और आवेदन जमा करें',

    mockPortalNoticeBefore:
      'आप एक सिम्युलेटेड सरकारी आवेदन पोर्टल में प्रवेश कर रहे हैं:',
    mockGovernmentPortal: 'डेमो सरकारी पोर्टल',
    mockPortalNoticeAfter:
      'यह पोर्टल केवल प्रदर्शन के लिए है।',

    applicationFormDemoGovernmentPortal:
      'सरकारी पोर्टल के लिए आवेदन फॉर्म डेमो',

    applicantInformation: 'आवेदक की जानकारी',
    enterRequiredInformation:
      'नीचे आवश्यक जानकारी दर्ज करें।',

    emailAddress: 'ईमेल पता',
    autoFilledFromProfile: 'आपकी प्रोफ़ाइल से स्वतः भरा गया',

    submitApplication: 'आवेदन जमा करें',
    demoSubmissionOnly:
      'यह एक डेमो आवेदन है। कोई वास्तविक सरकारी आवेदन जमा नहीं किया जाएगा।',

    govConnectAutofillDescription:
      'GovConnect आपकी सहेजी गई प्रोफ़ाइल जानकारी का उपयोग समर्थित फ़ील्ड भरने के लिए कर सकता है।',

    govConnectAutofill: 'GovConnect ऑटोफिल',
    profileInformation: 'प्रोफ़ाइल जानकारी',
    profileDataAvailable: 'प्रोफ़ाइल डेटा उपलब्ध',

    applicationInformation: 'आवेदन की जानकारी',
    governmentScheme: 'सरकारी योजना',
    portal: 'पोर्टल',
    governmentPortal: 'सरकारी पोर्टल',

    openOfficialWebsite: 'आधिकारिक वेबसाइट खोलें',
    useGovConnectAutofill: 'GovConnect ऑटोफिल का उपयोग करें',
    reviewBeforeFilling: 'भरने से पहले समीक्षा करें',

    govConnectWillUseProfile:
      'GovConnect आपकी सहेजी गई प्रोफ़ाइल जानकारी का उपयोग करेगा।',
    informationToBeUsed: 'उपयोग की जाने वाली जानकारी',

    consentAutofillSimulated:
      'इस प्रोटोटाइप में सहमति और ऑटोफिल सिम्युलेटेड हैं।',

    allowAndFill: 'अनुमति दें और भरें',

    // =========================
    // LOGIN
    // =========================
    welcome: 'स्वागत है',
    demoLoginSuccess: 'डेमो लॉगिन सफल रहा।',
    loginDescription:
      'अपने व्यक्तिगत सरकारी सेवा डैशबोर्ड तक पहुँचने के लिए लॉगिन करें।',
    enterFullName: 'अपना पूरा नाम दर्ज करें',
    emailOrMobile: 'ईमेल या मोबाइल नंबर',
    password: 'पासवर्ड',
    showPassword: 'पासवर्ड दिखाएँ',
    hidePassword: 'पासवर्ड छिपाएँ',
    or: 'या',
    useDemoAccount: 'डेमो अकाउंट का उपयोग करें',
    demoAccountDescription:
      'GovConnect प्रोटोटाइप को देखने के लिए डेमो अकाउंट का उपयोग करें।',

    // =========================
    // OFFICER
    // =========================
    totalApplications: 'कुल आवेदन',
    openGrievances: 'खुली शिकायतें',
    officerDashboard: 'अधिकारी डैशबोर्ड',
    citizenView: 'नागरिक दृश्य',
    officerDashboardDescription:
      'आवेदनों की निगरानी करें और सरकारी प्रणालियों के बीच इंटरऑपरेबिलिटी प्रदर्शित करें।',

    mockIntegrationStatus: 'डेमो एकीकरण स्थिति',

    identityRegistry: 'पहचान रजिस्ट्री',
    educationRegistry: 'शिक्षा रजिस्ट्री',
    incomeSystem: 'आय प्रणाली',
    departmentSystem: 'विभागीय प्रणाली',

    mockConnected: 'डेमो कनेक्टेड',
    mockProcessing: 'डेमो प्रोसेसिंग',

    dataMappingDemo: 'डेटा मैपिंग डेमो',
    applicantName: 'आवेदक का नाम',
    beneficiaryName: 'लाभार्थी का नाम',
    citizenName: 'नागरिक का नाम',

    yearlyIncome: 'वार्षिक आय',
    familyIncome: 'पारिवारिक आय',
    annualEarnings: 'वार्षिक कमाई',

    residentialAddress: 'निवास का पता',
    permanentAddress: 'स्थायी पता',
    domicileAddress: 'डोमिसाइल पता',

    interoperabilityFlow: 'इंटरऑपरेबिलिटी फ्लो',
    interoperabilityFlowDescription:
      'GovConnect यह प्रदर्शित करता है कि कनेक्टेड सरकारी प्रणालियों के बीच जानकारी सुरक्षित रूप से कैसे साझा की जा सकती है।',
    govConnect: 'GovConnect',
    interoperabilityLayer: 'इंटरऑपरेबिलिटी लेयर',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('govconnect_language') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('govconnect_language', language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((current) => (current === 'en' ? 'hi' : 'en'));
  }

  function t(key) {
    return (
      translations[language]?.[key] ??
      translations.en[key] ??
      key
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    );
  }

  return context;
}