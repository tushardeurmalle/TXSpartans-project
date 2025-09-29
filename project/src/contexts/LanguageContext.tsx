import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    identify: 'Identify Breed',
    database: 'Breed Database',
    veterinary: 'Veterinary Portal',
    dashboard: 'Dashboard',
    validation: 'Community Validation',
    analytics: 'Analytics',
    settings: 'Settings',
    
    // Common
    online: 'Online',
    offline: 'Offline Mode',
    logout: 'Logout',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    region: 'Region',
    role: 'Role',
    farmer: 'Farmer',
    flw: 'Field Worker',
    veterinarian: 'Veterinarian',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create Account',
    signInWithGoogle: 'Sign in with Google',
    signUpWithGoogle: 'Sign up with Google',
    processing: 'Processing...',
    or: 'or',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    enterFullName: 'Enter your full name',
    confirmYourPassword: 'Confirm your password',
    selectRegion: 'Select your region',
    loginSubtitle: 'AI-Powered Cattle Breed Identification',
    governmentOfIndia: 'Government of India',
    ministryOfAnimalHusbandry: 'Ministry of Animal Husbandry',
    secureLogin: 'Secure login powered by advanced encryption',
    tagline: '',
    
    // Home Page
    heroTitle: 'PashuNetra',
    heroSubtitle: 'AI-Powered Cattle Breed Identification System for Bharat',
    heroDescription: 'Empowering farmers and field workers with accurate breed identification through advanced AI, cultural awareness, and community wisdom.',
    identifyBreed: 'Identify Breed Now',
    exploreDatabase: 'Explore Database',
    
    // Stats
    indigenousBreeds: 'Indigenous Breeds',
    accuracy: 'Accuracy Rate',
    languages: 'Languages',
    offline: 'Offline Capable',
    
    // Features
    keyFeatures: 'Key Features',
    keyFeaturesDesc: 'Advanced technology meets traditional wisdom to revolutionize cattle breed identification',
    aiIdentification: 'AI Breed Identification',
    aiIdentificationDesc: 'Advanced computer vision to identify 50+ indigenous cattle breeds with 95%+ accuracy',
    multiLanguage: 'Multi-Language Support',
    multiLanguageDesc: 'Available in 22 Indian languages with voice recognition and local dialect support',
    comprehensiveDatabase: 'Comprehensive Database',
    comprehensiveDatabaseDesc: 'Extensive breed information with cultural markers, regional traits, and growth patterns',
    blockchainValidation: 'Blockchain Validation',
    blockchainValidationDesc: 'Community-verified breed records with tamper-proof blockchain technology',
    communityIntegration: 'Community Integration',
    communityIntegrationDesc: 'Farmer knowledge integration with veterinary expertise for accurate identification',
    offlineMode: 'Offline Functionality',
    offlineModeDesc: 'Complete offline operation for rural areas with automatic sync when connected',
    
    // Identification Process
    breedIdentification: 'Cattle Breed Identification',
    identificationDesc: 'Upload or capture images of your cattle for AI-powered breed identification with cultural and biometric analysis',
    captureImage: 'Capture Image',
    culturalMarkers: 'Cultural Markers',
    recordSound: 'Record Sound',
    biometricCapture: 'Biometric Details',
    results: 'Results',
    
    // Image Capture
    captureAnimalImage: 'Capture Animal Image',
    captureInstructions: 'Take a clear photo showing the full animal, including head, body, and distinctive features',
    startCamera: 'Start Camera',
    capture: 'Capture',
    uploadImage: 'Upload Image',
    retake: 'Retake',
    confirm: 'Confirm & Continue',
    quality: 'Quality',
    
    // Audio Capture
    recordAnimalSound: 'Record Animal Sound',
    audioInstructions: 'Record 5-10 seconds of the animal\'s natural vocalizations (mooing, bellowing) for breed-specific audio analysis',
    
    // Results
    analyzing: 'Analyzing Breed...',
    processingDesc: 'AI is analyzing image, cultural markers, audio, and biometric data',
    identificationComplete: 'Identification Complete',
    confidence: 'Confidence',
    analysisBreakdown: 'Analysis Breakdown',
    audioAnalysis: 'Audio Analysis',
    biometricMatch: 'Biometric Match',
    topMatches: 'Top Matches',
    
    // Footer
    quickLinks: 'Quick Links',
    resources: 'Resources',
    government: 'Government',
    ministry: 'Ministry of Animal Husbandry',
    bpa: 'Bharat Pashudhan App',
    policies: 'Policies',
    guidelines: 'Guidelines',
    footerDescription: 'Empowering farmers and field workers with accurate cattle breed identification through advanced AI technology.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    accessibility: 'Accessibility'
  },
  hi: {
    // Navigation
    home: 'मुख्य पृष्ठ',
    identify: 'नस्ल की पहचान',
    database: 'नस्ल डेटाबेस',
    veterinary: 'पशु चिकित्सक पोर्टल',
    dashboard: 'डैशबोर्ड',
    validation: 'सामुदायिक सत्यापन',
    analytics: 'विश्लेषण',
    settings: 'सेटिंग्स',
    
    // Common
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन मोड',
    logout: 'लॉगआउट',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    fullName: 'पूरा नाम',
    phoneNumber: 'फोन नंबर',
    region: 'क्षेत्र',
    role: 'भूमिका',
    farmer: 'किसान',
    flw: 'फील्ड वर्कर',
    veterinarian: 'पशु चिकित्सक',
    forgotPassword: 'पासवर्ड भूल गए?',
    createAccount: 'खाता बनाएं',
    signInWithGoogle: 'Google के साथ साइन इन करें',
    signUpWithGoogle: 'Google के साथ साइन अप करें',
    processing: 'प्रसंस्करण...',
    or: 'या',
    enterEmail: 'अपना ईमेल दर्ज करें',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    enterFullName: 'अपना पूरा नाम दर्ज करें',
    confirmYourPassword: 'अपने पासवर्ड की पुष्टि करें',
    selectRegion: 'अपना क्षेत्र चुनें',
    loginSubtitle: 'AI-संचालित गोवंश नस्ल पहचान',
    governmentOfIndia: 'भारत सरकार',
    ministryOfAnimalHusbandry: 'पशुपालन मंत्रालय',
    secureLogin: 'उन्नत एन्क्रिप्शन द्वारा संचालित सुरक्षित लॉगिन',
    tagline: 'AI-संचालित गोवंश नस्ल पहचान',
    
    // Home Page
    heroTitle: 'पशुनेत्र',
    heroSubtitle: 'भारत के लिए AI-संचालित गोवंश नस्ल पहचान प्रणाली',
    heroDescription: 'उन्नत AI, सांस्कृतिक जागरूकता और समुदायिक ज्ञान के माध्यम से किसानों और फील्ड वर्करों को सटीक नस्ल पहचान के साथ सशक्त बनाना।',
    identifyBreed: 'अभी नस्ल की पहचान करें',
    exploreDatabase: 'डेटाबेस देखें',
    
    // Features
    keyFeatures: 'मुख्य विशेषताएं',
    aiIdentification: 'AI नस्ल पहचान',
    multiLanguage: 'बहु-भाषा समर्थन',
    comprehensiveDatabase: 'व्यापक डेटाबेस',
    blockchainValidation: 'ब्लॉकचेन सत्यापन',
    communityIntegration: 'समुदायिक एकीकरण',
    offlineMode: 'ऑफलाइन कार्यक्षमता'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('pashunetra-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('pashunetra-language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        translations: translations[language as keyof typeof translations] || translations.en
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};