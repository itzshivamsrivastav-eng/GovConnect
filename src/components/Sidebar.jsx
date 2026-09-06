import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    // Navbar
    home: 'Home',
    digitalServices: 'Digital Services',
    schemes: 'Schemes',
    trackApplications: 'Track Applications',
    login: 'Login',
    accessibility: 'Accessibility',
    english: 'English',
    hindi: 'हिंदी',
    language: 'Language',

    // Common
    oneProfile: 'One Profile. Every Government Service.',
    oneProfileShort: 'One Profile',
    multipleServices: 'Multiple Services',
    smarterTomorrow: 'A Smarter Tomorrow',
    getStarted: 'Get Started',
    browseServices: 'Browse Services',
    searchServices: 'Search services or schemes...',

    dashboard: 'Dashboard',
    profile: 'Profile',
    applications: 'Applications',
    consent: 'Consent',
    grievances: 'Grievances',
    help: 'Help',

    governmentServicesPortal: 'Digital Government Services Portal',

    // Landing Hero
    yourDigitalPortal: 'Your Digital Portal to every',
    governmentService: 'Government Service.',
    landingDescription:
      'Discover government services and schemes, manage your information once, and track your applications from one place.',

    // Landing Cards
    oneProfileDashboard: 'One Profile Dashboard',
    oneProfileDashboardDescription:
      'Manage your information once and use it across government services and schemes.',

    schemeExplorer: 'Scheme Explorer',
    schemeExplorerDescription:
      'Discover government schemes and understand which ones may be relevant to you.',

    serviceTracker: 'Service Tracker',
    serviceTrackerDescription:
      'Track applications from different government services and schemes in one place.',

    helpSupportCenter: 'Help & Support Center',
    helpSupportCenterDescription:
      'Get guidance and support while navigating government services and applications.',

    explore: 'Explore',

    // Landing Information
    smarterCitizenExperience: 'A smarter citizen experience',
    oneProfileHeading: 'One profile.',
    multipleGovernmentServices: 'Multiple government services.',
    govconnectDescription:
      'GovConnect brings discovery, eligibility, applications and tracking together into one simple citizen-centric experience.',

    // Footer
    aboutGovConnect: 'About GovConnect',
    dataPrivacy: 'Data Privacy',
    helpSupport: 'Help & Support',

    copyright: 'GovConnect — Smart India Hackathon prototype.',

    demoPrototype:
      'Demo prototype. No real Aadhaar, DigiLocker, or government database integration is performed. Data shown is simulated.',
  },

  hi: {
    // Navbar
    home: 'होम',
    digitalServices: 'डिजिटल सेवाएँ',
    schemes: 'योजनाएँ',
    trackApplications: 'आवेदन ट्रैक करें',
    login: 'लॉगिन',
    accessibility: 'सुलभता',
    english: 'English',
    hindi: 'हिंदी',
    language: 'भाषा',

    // Common
    oneProfile: 'एक प्रोफ़ाइल। हर सरकारी सेवा।',
    oneProfileShort: 'एक प्रोफ़ाइल',
    multipleServices: 'कई सेवाएँ',
    smarterTomorrow: 'एक बेहतर कल',
    getStarted: 'शुरू करें',
    browseServices: 'सेवाएँ देखें',
    searchServices: 'सेवाएँ या योजनाएँ खोजें...',

    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफ़ाइल',
    applications: 'आवेदन',
    consent: 'सहमति',
    grievances: 'शिकायतें',
    help: 'सहायता',

    governmentServicesPortal: 'डिजिटल सरकारी सेवा पोर्टल',

    // Landing Hero
    yourDigitalPortal: 'हर',
    governmentService: 'सरकारी सेवा के लिए आपका डिजिटल पोर्टल।',
    landingDescription:
      'सरकारी सेवाएँ और योजनाएँ खोजें, अपनी जानकारी एक बार प्रबंधित करें और अपने सभी आवेदनों को एक ही स्थान से ट्रैक करें।',

    // Landing Cards
    oneProfileDashboard: 'एक प्रोफ़ाइल डैशबोर्ड',
    oneProfileDashboardDescription:
      'अपनी जानकारी एक बार प्रबंधित करें और इसे सरकारी सेवाओं और योजनाओं में उपयोग करें।',

    schemeExplorer: 'योजना खोजक',
    schemeExplorerDescription:
      'सरकारी योजनाएँ खोजें और जानें कि आपके लिए कौन-सी योजनाएँ उपयोगी हो सकती हैं।',

    serviceTracker: 'सेवा ट्रैकर',
    serviceTrackerDescription:
      'विभिन्न सरकारी सेवाओं और योजनाओं के आवेदनों को एक ही स्थान पर ट्रैक करें।',

    helpSupportCenter: 'सहायता और समर्थन केंद्र',
    helpSupportCenterDescription:
      'सरकारी सेवाओं और आवेदनों का उपयोग करते समय मार्गदर्शन और सहायता प्राप्त करें।',

    explore: 'जानें',

    // Landing Information
    smarterCitizenExperience: 'एक बेहतर नागरिक अनुभव',
    oneProfileHeading: 'एक प्रोफ़ाइल।',
    multipleGovernmentServices: 'कई सरकारी सेवाएँ।',
    govconnectDescription:
      'GovConnect योजनाओं की खोज, पात्रता, आवेदन और ट्रैकिंग को एक सरल नागरिक-केंद्रित अनुभव में एक साथ लाता है।',

    // Footer
    aboutGovConnect: 'GovConnect के बारे में',
    dataPrivacy: 'डेटा गोपनीयता',
    helpSupport: 'सहायता और समर्थन',

    copyright: 'GovConnect — स्मार्ट इंडिया हैकाथॉन प्रोटोटाइप।',

    demoPrototype:
      'डेमो प्रोटोटाइप। वास्तविक आधार, DigiLocker या सरकारी डेटाबेस से कोई एकीकरण नहीं किया गया है। दिखाया गया डेटा केवल सिम्युलेटेड है।',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('govconnect_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('govconnect_language', language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((current) => {
      return current === 'en' ? 'hi' : 'en';
    });
  }

  function t(key) {
    return translations[language]?.[key] || translations.en[key] || key;
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