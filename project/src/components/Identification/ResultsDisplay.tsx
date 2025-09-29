import React, { useState } from 'react';
import { Check, X, Share, Download, AlertTriangle, Info, Map, Volume2, Eye } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BreedResult {
  name: string;
  confidence: number;
  nativeName: string;
  region: string;
  characteristics: string[];
  culturalScore: number;
  audioScore: number;
  biometricScore: number;
}

interface Results {
  topBreeds: BreedResult[];
  explanation: {
    primaryFactors: string[];
    confidence: number;
    certainty: string;
  };
  recommendations: {
    breeding: string;
    nutrition: string;
    health: string;
  };
}

interface ResultsDisplayProps {
  results: Results | null;
  isProcessing: boolean;
  confidence: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isProcessing, confidence }) => {
  const { translations } = useLanguage();
  const [selectedBreed, setSelectedBreed] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  if (isProcessing || !results) {
    return (
      <div className="text-center py-12">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-blue-100 rounded-full"></div>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            style={{
              clipPath: `polygon(0 0, ${confidence}% 0, ${confidence}% 100%, 0 100%)`
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-700">{confidence}%</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {translations.analyzing || 'Analyzing Breed...'}
        </h2>
        <p className="text-gray-600">
          {translations.processingDesc || 'AI is analyzing image, cultural markers, audio, and biometric data'}
        </p>
        
        <div className="mt-6 space-y-2">
          <div className="text-sm text-blue-600">
            {confidence <= 20 && (translations.stageImageAnalysis || 'Image Analysis')}
            {confidence > 20 && confidence <= 40 && (translations.stageCulturalRecognition || 'Cultural Recognition')}
            {confidence > 40 && confidence <= 60 && (translations.stageAudioProcessing || 'Audio Processing')}
            {confidence > 60 && confidence <= 80 && (translations.stageBiometricMatching || 'Biometric Matching')}
            {confidence > 80 && (translations.stageBreedClassification || 'Breed Classification')}
          </div>
        </div>
      </div>
    );
  }

  const topBreed = results.topBreeds[0];

  return (
    <div className="space-y-8">
      {/* Main Result */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
          <Check size={20} />
          <span className="font-medium">
            {translations.identificationComplete || 'Identification Complete'}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {topBreed.name}
        </h1>
        <p className="text-xl text-gray-600 mb-1">
          {topBreed.nativeName}
        </p>
        <p className="text-lg text-blue-600 font-medium">
          {topBreed.region} • {Math.round(topBreed.confidence * 100)}% {translations.confidence || 'Confidence'}
        </p>
      </div>

      {/* Confidence Breakdown */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Eye className="mr-2" size={20} />
          {translations.analysisBreakdown || 'Analysis Breakdown'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round(topBreed.culturalScore * 100)}%
            </div>
            <div className="text-sm text-gray-600">
              {translations.culturalMarkers || 'Cultural Markers'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Math.round(topBreed.audioScore * 100)}%
            </div>
            <div className="text-sm text-gray-600">
              {translations.audioAnalysis || 'Audio Analysis'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round(topBreed.biometricScore * 100)}%
            </div>
            <div className="text-sm text-gray-600">
              {translations.biometricMatch || 'Biometric Match'}
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Results */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {translations.topMatches || 'Top Matches'}
        </h3>
        
        <div className="space-y-3">
          {results.topBreeds.map((breed, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedBreed === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedBreed(index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-900">{breed.name}</h4>
                    <span className="text-sm text-gray-500">{breed.nativeName}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {breed.region}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {breed.characteristics.map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {Math.round(breed.confidence * 100)}%
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${breed.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <Info size={20} />
          <span>
            {showExplanation 
              ? (translations.hideExplanation || 'Hide Explanation')
              : (translations.showExplanation || 'Show Explanation')
            }
          </span>
        </button>
        
        {showExplanation && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              {translations.whyThisBreed || 'Why This Breed?'}
            </h4>
            <ul className="text-blue-800 space-y-1">
              {results.explanation.primaryFactors.map((factor, index) => (
                <li key={index}>• {factor}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-4">
          {translations.recommendations || 'Recommendations'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-green-800 mb-1">
              {translations.breeding || 'Breeding'}
            </h4>
            <p className="text-green-700">{results.recommendations.breeding}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-green-800 mb-1">
              {translations.nutrition || 'Nutrition'}
            </h4>
            <p className="text-green-700">{results.recommendations.nutrition}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-green-800 mb-1">
              {translations.health || 'Health'}
            </h4>
            <p className="text-green-700">{results.recommendations.health}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Share size={20} />
          <span>{translations.shareResults || 'Share Results'}</span>
        </button>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download size={20} />
          <span>{translations.downloadReport || 'Download Report'}</span>
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <X size={20} />
          <span>{translations.newIdentification || 'New Identification'}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;