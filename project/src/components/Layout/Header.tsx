import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wifi, WifiOff, Globe, User, Bell } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../Common/Logo';

interface HeaderProps {
  isOffline: boolean;
}

const Header: React.FC<HeaderProps> = ({ isOffline }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, setLanguage, translations } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', key: 'home' },
    { path: '/identify', key: 'identify' },
    { path: '/database', key: 'database' },
    { path: '/veterinary', key: 'veterinary' },
    { path: '/dashboard', key: 'dashboard' },
    { path: '/validation', key: 'validation' },
    { path: '/analytics', key: 'analytics' }
  ];

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title - Left Side */}
          <div className="flex items-center space-x-3">
            <Logo size="medium" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                PashuNetra
              </h1>
              <p className="text-xs text-gray-600">
                {translations.tagline || ''}
              </p>
            </div>
          </div>

          {/* Navigation and Right Side Content */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  {translations[item.key] || item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                </Link>
              ))}
            </nav>

            {/* Status Indicators and User Menu */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {isOffline ? (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    <WifiOff size={14} />
                    <span>{translations.offline || 'Offline'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Wifi size={14} />
                    <span>{translations.online || 'Online'}</span>
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Globe size={16} />
                  <span className="text-sm font-medium">
                    {languages.find(l => l.code === language)?.native}
                  </span>
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                          language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{lang.native}</span>
                        <span className="text-sm text-gray-500 ml-2">({lang.name})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Menu */}
              {user && (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <Bell size={18} />
                  </button>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <User size={16} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    {translations.logout || 'Logout'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translations[item.key] || item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                </Link>
              ))}
            </div>
            
            {/* Mobile Status and Language */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                {isOffline ? (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                    <WifiOff size={12} />
                    <span>Offline</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    <Wifi size={12} />
                    <span>Online</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                <Globe size={12} />
                <span>{languages.find(l => l.code === language)?.native}</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;