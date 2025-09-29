import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, Clock, Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CommunityValidation: React.FC = () => {
  const { translations } = useLanguage();
  const [activeTab, setActiveTab] = useState('pending');

  const pendingValidations = [
    {
      id: 'V001',
      animalId: 'A001',
      farmerName: 'राम शर्मा',
      location: 'Ahmedabad, Gujarat',
      aiSuggestion: 'Gir',
      confidence: 0.92,
      submittedAt: '2 hours ago',
      validators: 3,
      requiredValidators: 5,
      images: [
        'https://girorganic.com/cdn/shop/articles/what-is-gir-cow-453725.jpg?v=1673547600',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmB-rZIdZlZGBnpbukJNDpzg-rnqfWjEx1pgkopLll9schFl_mRBfrP47AFlqsMRzu6ls&usqp=CAU'
      ],
      culturalMarkers: ['Bell', 'Tilak', 'Gujarat Style'],
      audioAvailable: true
    },
    {
      id: 'V002',
      animalId: 'A002',
      farmerName: 'प्रिया पटेल',
      location: 'Ludhiana, Punjab',
      aiSuggestion: 'Sahiwal',
      confidence: 0.76,
      submittedAt: '5 hours ago',
      validators: 1,
      requiredValidators: 5,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWmiHxb6YaEhkqHjM7uUsPfaXslpRB1mkAM6rRIzjmUtAs6BoS9E8927_DbnoYROY1K6Q&usqp=CAU'
      ],
      culturalMarkers: ['Necklace', 'Punjab Style'],
      audioAvailable: false
    }
  ];

  const completedValidations = [
    {
      id: 'V003',
      animalId: 'A003',
      farmerName: 'सुरेश कुमार',
      location: 'Jaipur, Rajasthan',
      aiSuggestion: 'Tharparkar',
      finalBreed: 'Tharparkar',
      confidence: 0.95,
      validators: 5,
      consensus: 100,
      completedAt: '1 day ago',
      status: 'verified'
    },
    {
      id: 'V004',
      animalId: 'A004',
      farmerName: 'लक्ष्मी देवी',
      location: 'Nashik, Maharashtra',
      aiSuggestion: 'Gir',
      finalBreed: 'Red Sindhi',
      confidence: 0.68,
      validators: 5,
      consensus: 80,
      completedAt: '2 days ago',
      status: 'corrected'
    }
  ];

  const renderPendingCard = (validation: any) => (
    <div key={validation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {translations.animal || 'Animal'} #{validation.animalId}
          </h3>
          <p className="text-gray-600">{validation.farmerName} • {validation.location}</p>
          <p className="text-sm text-gray-500">{validation.submittedAt}</p>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold text-blue-600 mb-1">
            {validation.aiSuggestion}
          </div>
          <div className="text-sm text-gray-600">
            {Math.round(validation.confidence * 100)}% {translations.confidence || 'Confidence'}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {validation.images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`Animal view ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Cultural Markers */}
      {validation.culturalMarkers && validation.culturalMarkers.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">{translations.culturalMarkers || 'Cultural Markers'}:</p>
          <div className="flex flex-wrap gap-2">
            {validation.culturalMarkers.map((marker: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {marker}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {translations.validationProgress || 'Validation Progress'}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {validation.validators}/{validation.requiredValidators}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(validation.validators / validation.requiredValidators) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
          <CheckCircle size={16} />
          <span>{translations.validate || 'Validate'}</span>
        </button>
        
        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
          <XCircle size={16} />
          <span>{translations.dispute || 'Dispute'}</span>
        </button>
        
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Eye size={16} />
        </button>
        
        {validation.audioAvailable && (
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            <MessageCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );

  const renderCompletedCard = (validation: any) => (
    <div key={validation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {translations.animal || 'Animal'} #{validation.animalId}
          </h3>
          <p className="text-gray-600">{validation.farmerName} • {validation.location}</p>
          <p className="text-sm text-gray-500">{validation.completedAt}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {validation.status === 'verified' ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {translations.verified || 'Verified'}
            </span>
          ) : (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {translations.corrected || 'Corrected'}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">{translations.aiSuggestion || 'AI Suggestion'}</p>
          <p className="font-semibold text-gray-900">{validation.aiSuggestion}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">{translations.finalBreed || 'Final Breed'}</p>
          <p className="font-semibold text-gray-900">{validation.finalBreed}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">{translations.validators || 'Validators'}</p>
          <p className="font-semibold text-gray-900">{validation.validators}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">{translations.consensus || 'Consensus'}</p>
          <p className="font-semibold text-gray-900">{validation.consensus}%</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations.communityValidation || 'Community Validation'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translations.communityValidationDesc || 'Help verify breed identifications through community wisdom and local expertise'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{pendingValidations.length}</p>
                <p className="text-sm text-gray-600">{translations.pending || 'Pending'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">247</p>
                <p className="text-sm text-gray-600">{translations.verified || 'Verified'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-gray-600">{translations.validators || 'Validators'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-sm text-gray-600">{translations.accuracy || 'Accuracy'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {translations.pendingValidations || 'Pending Validations'} ({pendingValidations.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {translations.completed || 'Completed'} ({completedValidations.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'pending' && (
              <div className="space-y-6">
                {pendingValidations.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {pendingValidations.map(renderPendingCard)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {translations.noPendingValidations || 'No pending validations'}
                    </h3>
                    <p className="text-gray-600">
                      {translations.allCaughtUp || 'You\'re all caught up! Check back later for new validations.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-6">
                {completedValidations.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {completedValidations.map(renderCompletedCard)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {translations.noCompletedValidations || 'No completed validations'}
                    </h3>
                    <p className="text-gray-600">
                      {translations.startValidating || 'Start validating to see your completed work here.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            {translations.howItWorks || 'How Community Validation Works'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-blue-900 mb-2">
                {translations.step1 || 'Step 1: Review'}
              </h4>
              <p className="text-sm text-blue-800">
                {translations.reviewDesc || 'Examine animal images, cultural markers, and AI suggestions'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-blue-900 mb-2">
                {translations.step2 || 'Step 2: Validate'}
              </h4>
              <p className="text-sm text-blue-800">
                {translations.validateDesc || 'Use your local knowledge to confirm or correct breed identification'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-blue-900 mb-2">
                {translations.step3 || 'Step 3: Consensus'}
              </h4>
              <p className="text-sm text-blue-800">
                {translations.consensusDesc || 'Final breed determination based on community consensus'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityValidation;