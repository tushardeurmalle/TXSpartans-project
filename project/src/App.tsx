import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import BreedIdentification from './pages/BreedIdentification';
import BreedDatabase from './pages/BreedDatabase';
import VeterinaryPortal from './pages/VeterinaryPortal';
import FarmerDashboard from './pages/FarmerDashboard';
import CommunityValidation from './pages/CommunityValidation';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/globals.css';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PashuNetra...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Header isOffline={isOffline} />
      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/identify" element={<BreedIdentification />} />
          <Route path="/database" element={<BreedDatabase />} />
          <Route path="/veterinary" element={<VeterinaryPortal />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/validation" element={<CommunityValidation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;