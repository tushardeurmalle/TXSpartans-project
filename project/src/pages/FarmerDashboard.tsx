import React, { useState } from 'react';
import { User, Cog as Cow, TrendingUp, Calendar, Bell, Award, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const FarmerDashboard: React.FC = () => {
  const { translations } = useLanguage();
  const { user } = useAuth();

  const myAnimals = [
    {
      id: 'A001',
      name: 'गाय 1',
      breed: 'Gir',
      nativeBreed: 'ગીર',
      age: '5 years',
      milkYield: '12 L/day',
      lastVerified: '2 days ago',
      healthStatus: 'Healthy',
      nextVaccination: '15 Mar 2025',
      image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg'
    },
    {
      id: 'A002',
      name: 'गाय 2',
      breed: 'Sahiwal',
      nativeBreed: 'साहीवाल',
      age: '3 years',
      milkYield: '14 L/day',
      lastVerified: '1 week ago',
      healthStatus: 'Healthy',
      nextVaccination: '20 Mar 2025',
      image: 'https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2023/07/Top-Quality-Sahiwal-Cow-Supplier.webp?size=*:900'
    }
  ];

  const recommendations = [
    {
      type: 'nutrition',
      title: 'Improve Feed Quality',
      description: 'Consider adding protein supplements for better milk yield',
      priority: 'medium',
      icon: TrendingUp
    },
    {
      type: 'health',
      title: 'Vaccination Due',
      description: 'FMD vaccination due for Animal A001 in 3 days',
      priority: 'high',
      icon: Calendar
    },
    {
      type: 'breeding',
      title: 'Breeding Season',
      description: 'Optimal breeding time approaching for गाय 2',
      priority: 'low',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {translations.welcome || 'Welcome'}, {user?.name || 'किसान जी'}!
              </h1>
              <p className="opacity-90">
                {translations.farmerDashboardDesc || 'Manage your cattle and track their health and productivity'}
              </p>
              <div className="flex items-center space-x-2 mt-2 text-sm opacity-80">
                <MapPin size={16} />
                <span>{user?.region || 'Gujarat, India'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Cow className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{myAnimals.length}</p>
                <p className="text-sm text-gray-600">{translations.totalAnimals || 'Total Animals'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">26L</p>
                <p className="text-sm text-gray-600">{translations.dailyMilk || 'Daily Milk'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">{translations.upcomingEvents || 'Upcoming Events'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-gray-600">{translations.healthScore || 'Health Score'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Animals */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {translations.myAnimals || 'My Animals'}
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {translations.addAnimal || 'Add Animal'}
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {myAnimals.map((animal) => (
                  <div key={animal.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex space-x-4">
                      <img
                        src={animal.image}
                        alt={animal.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {animal.name} (#{animal.id})
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>{animal.breed}</span>
                              <span>•</span>
                              <span>{animal.nativeBreed}</span>
                              <span>•</span>
                              <span>{animal.age}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {animal.healthStatus}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">{translations.milkYield || 'Milk Yield'}</p>
                            <p className="font-semibold text-gray-900">{animal.milkYield}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600">{translations.lastVerified || 'Last Verified'}</p>
                            <p className="font-semibold text-gray-900">{animal.lastVerified}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600">{translations.nextVaccination || 'Next Vaccination'}</p>
                            <p className="font-semibold text-gray-900">{animal.nextVaccination}</p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                            {translations.viewDetails || 'View Details'}
                          </button>
                          <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                            {translations.updateRecord || 'Update Record'}
                          </button>
                          <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
                            {translations.healthCheck || 'Health Check'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  {translations.recommendations || 'Recommendations'}
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        rec.priority === 'high' ? 'bg-red-100' :
                        rec.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <rec.icon className={`w-4 h-4 ${
                          rec.priority === 'high' ? 'text-red-600' :
                          rec.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {rec.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {rec.description}
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
                  <div className="font-medium">{translations.identifyNewBreed || 'Identify New Breed'}</div>
                  <div className="text-sm opacity-75">{translations.uploadImageForId || 'Upload image for identification'}</div>
                </button>
                
                <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-left">
                  <div className="font-medium">{translations.recordMilkData || 'Record Milk Data'}</div>
                  <div className="text-sm opacity-75">{translations.dailyMilkTracking || 'Daily milk production tracking'}</div>
                </button>
                
                <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-left">
                  <div className="font-medium">{translations.scheduleVetVisit || 'Schedule Vet Visit'}</div>
                  <div className="text-sm opacity-75">{translations.bookVetAppointment || 'Book veterinary appointment'}</div>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900">
                    {translations.helpSupport || 'Help & Support'}
                  </h4>
                </div>
              </div>
              <p className="text-sm text-green-800 mb-3">
                {translations.needAssistance || 'Need assistance with breed identification or animal care?'}
              </p>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  {translations.callHelpline || 'Call Helpline: 1800-XXX-XXXX'}
                </button>
                <button className="w-full px-3 py-2 bg-white text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-sm">
                  {translations.chatSupport || 'Chat Support'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;