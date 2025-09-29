import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Users, Calendar, MapPin, Award, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Analytics: React.FC = () => {
  const { translations } = useLanguage();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const kpiData = [
    {
      title: translations.totalIdentifications || 'Total Identifications',
      value: '12,847',
      change: '+23%',
      trend: 'up',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: translations.accuracy || 'AI Accuracy Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Award,
      color: 'green'
    },
    {
      title: translations.activeFarmers || 'Active Farmers',
      value: '3,456',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: translations.communityValidations || 'Community Validations',
      value: '8,923',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'orange'
    }
  ];

  const breedDistribution = [
    { breed: 'Gir', count: 2847, percentage: 22.1, color: '#3B82F6' },
    { breed: 'Sahiwal', count: 2134, percentage: 16.6, color: '#10B981' },
    { breed: 'Red Sindhi', count: 1876, percentage: 14.6, color: '#F59E0B' },
    { breed: 'Murrah', count: 1543, percentage: 12.0, color: '#8B5CF6' },
    { breed: 'Tharparkar', count: 1298, percentage: 10.1, color: '#EF4444' },
    { breed: 'Ongole', count: 1067, percentage: 8.3, color: '#6B7280' },
    { breed: 'Others', count: 2082, percentage: 16.2, color: '#9CA3AF' }
  ];

  const regionData = [
    { region: 'Gujarat', identifications: 3245, accuracy: 95.2 },
    { region: 'Punjab', identifications: 2876, accuracy: 93.8 },
    { region: 'Haryana', identifications: 2134, accuracy: 94.1 },
    { region: 'Rajasthan', identifications: 1987, accuracy: 92.7 },
    { region: 'Maharashtra', identifications: 1654, accuracy: 94.5 },
    { region: 'Uttar Pradesh', identifications: 951, accuracy: 91.3 }
  ];

  const monthlyTrends = [
    { month: 'Jan', identifications: 890, accuracy: 91.2 },
    { month: 'Feb', identifications: 1120, accuracy: 92.1 },
    { month: 'Mar', identifications: 1456, accuracy: 93.8 },
    { month: 'Apr', identifications: 1789, accuracy: 94.2 },
    { month: 'May', identifications: 2134, accuracy: 94.7 },
    { month: 'Jun', identifications: 2458, accuracy: 95.1 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {translations.analytics || 'Analytics & Insights'}
            </h1>
            <p className="text-gray-600 mt-2">
              {translations.analyticsDesc || 'Comprehensive insights into breed identification performance and usage patterns'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">{translations.last7Days || 'Last 7 days'}</option>
              <option value="30d">{translations.last30Days || 'Last 30 days'}</option>
              <option value="90d">{translations.last90Days || 'Last 90 days'}</option>
              <option value="1y">{translations.lastYear || 'Last year'}</option>
            </select>
            
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{translations.allRegions || 'All Regions'}</option>
              <option value="gujarat">Gujarat</option>
              <option value="punjab">Punjab</option>
              <option value="haryana">Haryana</option>
              <option value="rajasthan">Rajasthan</option>
            </select>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {kpi.value}
                  </p>
                  <div className={`flex items-center text-sm ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp size={16} className="mr-1" />
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-${kpi.color}-100 rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Breed Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {translations.breedDistribution || 'Breed Distribution'}
              </h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {breedDistribution.map((breed, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: breed.color }}
                  ></div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-gray-900">{breed.breed}</span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">{breed.count.toLocaleString()}</span>
                      <span className="text-sm text-gray-600 ml-2">({breed.percentage}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {translations.regionalPerformance || 'Regional Performance'}
              </h2>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {regionData.map((region, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{region.region}</span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">{region.identifications.toLocaleString()}</span>
                      <span className="text-sm text-gray-600 ml-2">IDs</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${region.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{region.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {translations.monthlyTrends || 'Monthly Trends'}
            </h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-6 gap-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="text-center">
                <div className="relative h-32 bg-gray-100 rounded-lg mb-2 flex items-end justify-center p-2">
                  <div
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${(month.identifications / 2500) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {month.month}
                </div>
                <div className="text-xs text-gray-600">
                  {month.identifications}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {month.accuracy}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Performing Breeds */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {translations.topPerformingBreeds || 'Top Performing Breeds'}
            </h3>
            <div className="space-y-3">
              {breedDistribution.slice(0, 5).map((breed, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-900">{breed.breed}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${95 + Math.random() * 5}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10">
                      {(95 + Math.random() * 5).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {translations.communityStats || 'Community Statistics'}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{translations.totalValidators || 'Total Validators'}</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{translations.avgResponseTime || 'Avg Response Time'}</span>
                <span className="font-semibold text-gray-900">2.3h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{translations.validationRate || 'Validation Rate'}</span>
                <span className="font-semibold text-gray-900">89.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{translations.consensusAccuracy || 'Consensus Accuracy'}</span>
                <span className="font-semibold text-gray-900">96.7%</span>
              </div>
            </div>
          </div>

          {/* Usage Patterns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {translations.usagePatterns || 'Usage Patterns'}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{translations.mobileApp || 'Mobile App'}</span>
                  <span className="font-semibold text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{translations.webPortal || 'Web Portal'}</span>
                  <span className="font-semibold text-gray-900">22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-sm text-gray-600 mb-1">{translations.peakHours || 'Peak Usage Hours'}</div>
                <div className="text-lg font-semibold text-gray-900">9 AM - 11 AM</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">{translations.avgSessionTime || 'Avg Session Time'}</div>
                <div className="text-lg font-semibold text-gray-900">8.4 min</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;