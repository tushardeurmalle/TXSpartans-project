import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Globe, Bell, Shield, Database, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { translations, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: translations.profile || 'Profile', icon: User },
    { id: 'language', name: translations.language || 'Language', icon: Globe },
    { id: 'notifications', name: translations.notifications || 'Notifications', icon: Bell },
    { id: 'privacy', name: translations.privacy || 'Privacy', icon: Shield },
    { id: 'data', name: translations.data || 'Data', icon: Database },
    { id: 'help', name: translations.help || 'Help', icon: HelpCircle }
  ];

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {translations.personalInformation || 'Personal Information'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.fullName || 'Full Name'}
            </label>
            <input
              type="text"
              defaultValue={user?.name || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.email || 'Email'}
            </label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.phone || 'Phone Number'}
            </label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.region || 'Region'}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="gujarat">Gujarat</option>
              <option value="punjab">Punjab</option>
              <option value="haryana">Haryana</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="maharashtra">Maharashtra</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.address || 'Address'}
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={translations.enterAddress || 'Enter your complete address'}
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {translations.updateProfile || 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderLanguageTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {translations.languagePreferences || 'Language Preferences'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                language === lang.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setLanguage(lang.code)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{lang.native}</div>
                  <div className="text-sm text-gray-600">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {translations.voiceSettings || 'Voice Settings'}
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-900">
              {translations.enableVoiceInstructions || 'Enable voice instructions'}
            </span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-900">
              {translations.enableAudioFeedback || 'Enable audio feedback'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {translations.notificationSettings || 'Notification Settings'}
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              {translations.breedIdentification || 'Breed Identification'}
            </h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.identificationComplete || 'Identification complete'}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.validationRequests || 'Validation requests'}
                </span>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              {translations.healthAlerts || 'Health & Care'}
            </h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.vaccinationReminders || 'Vaccination reminders'}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.healthAlerts || 'Health alerts'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {translations.privacySettings || 'Privacy Settings'}
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              {translations.dataSharing || 'Data Sharing'}
            </h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.shareWithGovernment || 'Share data with government agencies'}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.shareWithCommunity || 'Share with community validators'}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.shareWithResearchers || 'Share anonymous data for research'}
                </span>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              {translations.biometricData || 'Biometric Data'}
            </h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.storeBiometrics || 'Store biometric patterns for identification'}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {translations.deleteAfterTime || 'Auto-delete after 2 years'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {translations.dataManagement || 'Data Management'}
        </h3>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-medium text-blue-900 mb-2">
              {translations.syncStatus || 'Sync Status'}
            </h4>
            <p className="text-blue-800 mb-4">
              {translations.lastSync || 'Last synced: 5 minutes ago'}
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {translations.syncNow || 'Sync Now'}
            </button>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-6">
            <h4 className="font-medium text-yellow-900 mb-2">
              {translations.offlineData || 'Offline Data'}
            </h4>
            <p className="text-yellow-800 mb-4">
              {translations.offlineDataDesc || 'Local storage: 247 MB of breed data and models'}
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                {translations.updateOfflineData || 'Update Offline Data'}
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                {translations.clearCache || 'Clear Cache'}
              </button>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-6">
            <h4 className="font-medium text-red-900 mb-2">
              {translations.dataExport || 'Data Export & Deletion'}
            </h4>
            <p className="text-red-800 mb-4">
              {translations.dataExportDesc || 'Export your data or request account deletion'}
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {translations.exportData || 'Export My Data'}
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                {translations.deleteAccount || 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {translations.helpSupport || 'Help & Support'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-blue-900 mb-2">
              {translations.userGuide || 'User Guide'}
            </h4>
            <p className="text-blue-800 mb-4">
              {translations.userGuideDesc || 'Step-by-step instructions for using PashuNetra'}
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {translations.viewGuide || 'View Guide'}
            </button>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-green-900 mb-2">
              {translations.contactSupport || 'Contact Support'}
            </h4>
            <p className="text-green-800 mb-4">
              {translations.contactSupportDesc || 'Get help from our technical support team'}
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              {translations.contactUs || 'Contact Us'}
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">
            {translations.frequentlyAsked || 'Frequently Asked Questions'}
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-1">
                {translations.faq1Q || 'How accurate is the AI breed identification?'}
              </h5>
              <p className="text-gray-600 text-sm">
                {translations.faq1A || 'Our AI achieves 94.2% accuracy across 50+ indigenous breeds, with community validation further improving precision.'}
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-1">
                {translations.faq2Q || 'Can I use the app offline?'}
              </h5>
              <p className="text-gray-600 text-sm">
                {translations.faq2A || 'Yes, PashuNetra works completely offline for rural areas with no internet connectivity.'}
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-1">
                {translations.faq3Q || 'Is my data secure and private?'}
              </h5>
              <p className="text-gray-600 text-sm">
                {translations.faq3A || 'We use bank-level encryption and blockchain technology to ensure your data is secure and tamper-proof.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'language': return renderLanguageTab();
      case 'notifications': return renderNotificationsTab();
      case 'privacy': return renderPrivacyTab();
      case 'data': return renderDataTab();
      case 'help': return renderHelpTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations.settings || 'Settings'}
          </h1>
          <p className="text-xl text-gray-600">
            {translations.settingsDesc || 'Customize your PashuNetra experience'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon size={20} />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;