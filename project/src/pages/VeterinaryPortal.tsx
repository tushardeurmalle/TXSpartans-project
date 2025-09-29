import React, { useState } from 'react';
import { Stethoscope, FileText, TrendingUp, Calendar, Users, Shield, Bell, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const VeterinaryPortal: React.FC = () => {
  const { translations } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const veterinaryFeatures = [
    {
      id: 'verification',
      title: translations.breedVerification || 'Breed Verification',
      description: translations.breedVerificationDesc || 'Review and verify AI breed classifications with professional expertise',
      icon: Shield,
      color: 'blue'
    },
    {
      id: 'health',
      title: translations.healthMonitoring || 'Health Monitoring',
      description: translations.healthMonitoringDesc || 'Track animal health, vaccination schedules, and disease alerts',
      icon: Stethoscope,
      color: 'green'
    },
    {
      id: 'nutrition',
      title: translations.nutritionPlanning || 'Nutrition Planning',
      description: translations.nutritionPlanningDesc || 'Create customized feeding plans based on breed and production goals',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      id: 'advisory',
      title: translations.farmerAdvisory || 'Farmer Advisory',
      description: translations.farmerAdvisoryDesc || 'Provide expert guidance and recommendations to farmers',
      icon: Users,
      color: 'purple'
    }
  ];

  const pendingVerifications = [
    {
      id: '1',
      farmerId: 'F001',
      farmerName: 'राम शर्मा',
      animalId: 'A001',
      aiSuggestion: 'Gir',
      confidence: 0.92,
      culturalScore: 0.85,
      location: 'Ahmedabad, Gujarat',
      timestamp: '2 hours ago',
      images: 3
    },
    {
      id: '2',
      farmerId: 'F002',
      farmerName: 'प्रिया पटेल',
      animalId: 'A002',
      aiSuggestion: 'Sahiwal',
      confidence: 0.76,
      culturalScore: 0.68,
      location: 'Ludhiana, Punjab',
      timestamp: '5 hours ago',
      images: 2
    }
  ];

  const healthAlerts = [
    {
      id: '1',
      type: 'vaccination',
      severity: 'medium',
      message: 'FMD vaccination due for 15 animals in Mehsana district',
      location: 'Mehsana, Gujarat',
      count: 15
    },
    {
      id: '2',
      type: 'outbreak',
      severity: 'high',
      message: 'Lumpy skin disease reported in nearby villages',
      location: 'Sabarkantha, Gujarat',
      count: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {translations.veterinaryPortal || 'Veterinary Portal'}
              </h1>
              <p className="text-gray-600">
                {translations.welcomeVet || `Welcome, Dr. ${user?.name || 'Veterinarian'}`}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">{translations.pendingVerifications || 'Pending Verifications'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">847</p>
                <p className="text-sm text-gray-600">{translations.animalsMonitored || 'Animals Monitored'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">{translations.healthAlerts || 'Health Alerts'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">{translations.activeFarmers || 'Active Farmers'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Breed Verifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {translations.pendingVerifications || 'Pending Breed Verifications'}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {pendingVerifications.length} {translations.pending || 'Pending'}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {pendingVerifications.map((verification) => (
                  <div key={verification.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {translations.animal || 'Animal'} #{verification.animalId}
                          </h3>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            {Math.round(verification.confidence * 100)}% {translations.confidence || 'Confidence'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {translations.farmer || 'Farmer'}: {verification.farmerName} • {verification.location}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {verification.timestamp}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600 mb-1">
                          {verification.aiSuggestion}
                        </div>
                        <div className="text-sm text-gray-600">
                          {verification.images} {translations.images || 'images'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">AI Confidence</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${verification.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Cultural Score</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${verification.culturalScore * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        {translations.verify || 'Verify'}
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        {translations.viewDetails || 'View Details'}
                      </button>
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                        {translations.needsCorrection || 'Needs Correction'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Veterinary Features */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {translations.veterinaryServices || 'Veterinary Services'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {veterinaryFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-4 border-2 border-gray-200 rounded-lg hover:border-${feature.color}-300 transition-colors cursor-pointer`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-${feature.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <feature.icon className={`w-5 h-5 text-${feature.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  {translations.healthAlerts || 'Health Alerts'}
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {healthAlerts.map((alert) => (
                  <div key={alert.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-600">
                          {alert.location} • {alert.count} {translations.affected || 'affected'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  {translations.quickActions || 'Quick Actions'}
                </h3>
              </div>
              
              <div className="p-4 space-y-3">
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <FileText size={20} />
                    <div>
                      <div className="font-medium">{translations.generateReport || 'Generate Report'}</div>
                      <div className="text-sm opacity-75">{translations.monthlyHealthReport || 'Monthly health report'}</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} />
                    <div>
                      <div className="font-medium">{translations.scheduleVisit || 'Schedule Visit'}</div>
                      <div className="text-sm opacity-75">{translations.farmVisitScheduling || 'Farm visit scheduling'}</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <Bell size={20} />
                    <div>
                      <div className="font-medium">{translations.sendAlert || 'Send Alert'}</div>
                      <div className="text-sm opacity-75">{translations.farmersAlert || 'Alert to farmers'}</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                {translations.needHelp || 'Need Help?'}
              </h4>
              <p className="text-sm text-blue-800 mb-4">
                {translations.contactSupport || 'Contact our technical support team for assistance'}
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                {translations.contactSupport || 'Contact Support'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeterinaryPortal;