import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Mic, Volume2, MapPin, Clock, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ImageCapture from '../components/Identification/ImageCapture';
import AudioCapture from '../components/Identification/AudioCapture';
import ResultsDisplay from '../components/Identification/ResultsDisplay';
import CulturalMarkers from '../components/Identification/CulturalMarkers';
import BiometricCapture from '../components/Identification/BiometricCapture';

interface IdentificationData {
  image?: File;
  audio?: Blob;
  location?: { lat: number; lng: number };
  culturalMarkers?: string[];
  biometrics?: {
    earPattern?: File;
    hornGeometry?: File;
    muzzlePattern?: File;
  };
  metadata?: {
    age?: string;
    sex?: string;
    health?: string;
  };
}

const BreedIdentification: React.FC = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [identificationData, setIdentificationData] = useState<IdentificationData>({});
  const [results, setResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const steps = [
    { id: 'image', title: translations.captureImage || 'Capture Image', icon: Camera },
    { id: 'cultural', title: translations.culturalMarkers || 'Cultural Markers', icon: MapPin },
    { id: 'audio', title: translations.recordSound || 'Record Sound', icon: Mic },
    { id: 'biometric', title: translations.biometricCapture || 'Biometric Details', icon: Zap },
    { id: 'results', title: translations.results || 'Results', icon: Clock }
  ];

  const handleImageCapture = useCallback((imageFile: File) => {
    setIdentificationData(prev => ({ ...prev, image: imageFile }));
    // Auto-advance to next step
    setTimeout(() => setCurrentStep(1), 500);
  }, []);

  const handleAudioCapture = useCallback((audioBlob: Blob) => {
    setIdentificationData(prev => ({ ...prev, audio: audioBlob }));
  }, []);

  const handleCulturalMarkers = useCallback((markers: string[]) => {
    setIdentificationData(prev => ({ ...prev, culturalMarkers: markers }));
  }, []);

  const handleBiometricCapture = useCallback((biometrics: any) => {
    setIdentificationData(prev => ({ ...prev, biometrics }));
  }, []);

  const processIdentification = async () => {
    setIsProcessing(true);
    setCurrentStep(4);
    
    try {
      // Simulate AI processing with multiple stages
      const stages = [
        { stage: 'Image Analysis', progress: 20 },
        { stage: 'Cultural Recognition', progress: 40 },
        { stage: 'Audio Processing', progress: 60 },
        { stage: 'Biometric Matching', progress: 80 },
        { stage: 'Breed Classification', progress: 100 }
      ];

      for (const stage of stages) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setConfidence(stage.progress);
      }

      // Mock AI results
      const mockResults = {
        topBreeds: [
          {
            name: 'Gir',
            confidence: 0.92,
            nativeName: 'ગીર',
            region: 'Gujarat',
            characteristics: ['Distinctive forehead', 'Drooping ears', 'White/red coat'],
            culturalScore: 0.85,
            audioScore: 0.88,
            biometricScore: 0.94
          },
          {
            name: 'Sahiwal',
            confidence: 0.76,
            nativeName: 'साहीवाल',
            region: 'Punjab/Haryana',
            characteristics: ['Large size', 'Reddish-brown coat', 'Long ears'],
            culturalScore: 0.65,
            audioScore: 0.72,
            biometricScore: 0.81
          },
          {
            name: 'Red Sindhi',
            confidence: 0.68,
            nativeName: 'रेड सिंधी',
            region: 'Sindh/Rajasthan',
            characteristics: ['Deep red coat', 'Compact body', 'Heat tolerance'],
            culturalScore: 0.58,
            audioScore: 0.69,
            biometricScore: 0.77
          }
        ],
        explanation: {
          primaryFactors: ['Horn shape matches Gir pattern', 'Ear configuration typical of Zebu breeds', 'Cultural markers indicate Gujarat region'],
          confidence: 0.92,
          certainty: 'High'
        },
        recommendations: {
          breeding: 'Excellent for milk production in hot climates',
          nutrition: 'High protein feed recommended',
          health: 'Regular vaccination schedule advised'
        }
      };

      setResults(mockResults);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <ImageCapture onImageCapture={handleImageCapture} />;
      case 1:
        return <CulturalMarkers onMarkersSelect={handleCulturalMarkers} onNext={() => setCurrentStep(2)} />;
      case 2:
        return <AudioCapture onAudioCapture={handleAudioCapture} onNext={() => setCurrentStep(3)} />;
      case 3:
        return <BiometricCapture onBiometricCapture={handleBiometricCapture} onNext={processIdentification} />;
      case 4:
        return <ResultsDisplay results={results} isProcessing={isProcessing} confidence={confidence} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations.breedIdentification || 'Cattle Breed Identification'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translations.identificationDesc || 'Upload or capture images of your cattle for AI-powered breed identification with cultural and biometric analysis'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <step.icon size={20} />
                </div>
                <span className={`text-sm font-medium ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block h-1 w-20 mt-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        {currentStep > 0 && currentStep < 4 && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {translations.back || 'Back'}
            </button>
            {currentStep < 3 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {translations.next || 'Next'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedIdentification;