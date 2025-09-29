import React, { useState } from 'react';
import { Camera, Upload, Eye, Zap, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BiometricCaptureProps {
  onBiometricCapture: (biometrics: any) => void;
  onNext: () => void;
}

const BiometricCapture: React.FC<BiometricCaptureProps> = ({ onBiometricCapture, onNext }) => {
  const { translations } = useLanguage();
  const [currentCapture, setCurrentCapture] = useState<'ear' | 'horn' | 'muzzle' | 'complete'>('ear');
  const [capturedImages, setCapturedImages] = useState<{
    ear?: File;
    horn?: File;
    muzzle?: File;
  }>({});
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const captureSteps = [
    {
      id: 'ear' as const,
      title: translations.earPattern || 'Ear Pattern',
      description: translations.earPatternDesc || 'Capture clear image of the ear showing unique patterns and shape',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 'horn' as const,
      title: translations.hornGeometry || 'Horn Geometry',
      description: translations.hornGeometryDesc || 'Photograph horn shape and curvature for geometric analysis',
      icon: Zap,
      color: 'green'
    },
    {
      id: 'muzzle' as const,
      title: translations.muzzlePattern || 'Muzzle Pattern',
      description: translations.muzzlePatternDesc || 'Close-up of muzzle showing unique texture patterns',
      icon: Camera,
      color: 'purple'
    }
  ];

  const handleImageCapture = (file: File, type: 'ear' | 'horn' | 'muzzle') => {
    const updated = { ...capturedImages, [type]: file };
    setCapturedImages(updated);
    
    // Simulate biometric analysis
    setTimeout(() => {
      analyzeBiometric(file, type);
    }, 1000);

    // Move to next step
    const currentIndex = captureSteps.findIndex(step => step.id === type);
    if (currentIndex < captureSteps.length - 1) {
      setCurrentCapture(captureSteps[currentIndex + 1].id);
    } else {
      setCurrentCapture('complete');
      performFinalAnalysis(updated);
    }
  };

  const analyzeBiometric = (file: File, type: string) => {
    // Mock biometric analysis
    const mockAnalysis = {
      [type]: {
        quality: Math.floor(Math.random() * 20) + 80,
        uniquePoints: Math.floor(Math.random() * 50) + 100,
        confidence: Math.random() * 0.3 + 0.7,
        patterns: [
          'Distinctive ridge patterns detected',
          'Unique geometric markers identified',
          'High-contrast feature points mapped'
        ]
      }
    };
    
    setAnalysisResults(prev => ({ ...prev, ...mockAnalysis }));
  };

  const performFinalAnalysis = (images: any) => {
    setTimeout(() => {
      const finalAnalysis = {
        overallQuality: 92,
        biometricScore: 0.94,
        uniqueIdentifiers: 347,
        matchProbability: 0.89,
        recommendations: [
          'Excellent biometric capture quality',
          'Strong unique identifier patterns',
          'Suitable for fraud prevention database'
        ]
      };
      
      setAnalysisResults(prev => ({ ...prev, final: finalAnalysis }));
      onBiometricCapture({ images, analysis: { ...analysisResults, final: finalAnalysis } });
    }, 2000);
  };

  const renderCaptureInterface = (step: typeof captureSteps[0]) => {
    const hasImage = capturedImages[step.id];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className={`w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <step.icon className={`w-8 h-8 text-${step.color}-600`} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {step.title}
          </h3>
          <p className="text-gray-600">
            {step.description}
          </p>
        </div>

        {!hasImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Camera size={48} className="text-gray-400 mx-auto mb-4" />
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  // Simulate image capture
                  const mockFile = new File(['mock'], `${step.id}.jpg`, { type: 'image/jpeg' });
                  handleImageCapture(mockFile, step.id);
                }}
                className={`w-full px-6 py-3 bg-${step.color}-600 text-white rounded-lg hover:bg-${step.color}-700 transition-colors font-medium`}
              >
                {translations.captureImage || 'Capture Image'}
              </button>
              
              <div className="flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  {translations.or || 'or'}
                </span>
              </div>
              
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageCapture(file, step.id);
                  }}
                />
                <span className="cursor-pointer px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium inline-block">
                  <Upload className="inline mr-2" size={16} />
                  {translations.uploadImage || 'Upload Image'}
                </span>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-green-700 mb-2">
                <Check size={20} />
                <span className="font-medium">
                  {translations.captureComplete || 'Capture Complete'}
                </span>
              </div>
              
              {analysisResults?.[step.id] && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {analysisResults[step.id].quality}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {translations.quality || 'Quality'}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {analysisResults[step.id].uniquePoints}
                    </div>
                    <div className="text-sm text-gray-600">
                      {translations.uniquePoints || 'Unique Points'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCompletionScreen = () => {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check size={32} className="text-green-600" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {translations.biometricComplete || 'Biometric Capture Complete'}
          </h3>
          <p className="text-gray-600">
            {translations.biometricAnalyzing || 'Analyzing biometric patterns and creating unique signature...'}
          </p>
        </div>

        {analysisResults?.final ? (
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-4">
              {translations.finalAnalysis || 'Final Analysis'}
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">
                  {analysisResults.final.overallQuality}%
                </div>
                <div className="text-sm text-gray-600">
                  {translations.overallQuality || 'Overall Quality'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">
                  {Math.round(analysisResults.final.biometricScore * 100)}%
                </div>
                <div className="text-sm text-gray-600">
                  {translations.biometricScore || 'Biometric Score'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">
                  {analysisResults.final.uniqueIdentifiers}
                </div>
                <div className="text-sm text-gray-600">
                  {translations.uniqueIdentifiers || 'Unique ID Points'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">
                  {Math.round(analysisResults.final.matchProbability * 100)}%
                </div>
                <div className="text-sm text-gray-600">
                  {translations.matchAccuracy || 'Match Accuracy'}
                </div>
              </div>
            </div>

            <div className="text-left">
              <h5 className="font-medium text-gray-800 mb-2">
                {translations.analysisResults || 'Analysis Results'}
              </h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {analysisResults.final.recommendations.map((rec: string, index: number) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>{translations.processing || 'Processing...'}</span>
          </div>
        )}
      </div>
    );
  };

  const currentStep = captureSteps.find(step => step.id === currentCapture);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {translations.biometricCapture || 'Biometric Capture'}
        </h2>
        <p className="text-gray-600">
          {translations.biometricDesc || 'Capture detailed biometric features for unique animal identification and fraud prevention'}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-4">
        {captureSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              capturedImages[step.id] 
                ? 'bg-green-500 text-white'
                : currentCapture === step.id
                ? `bg-${step.color}-500 text-white`
                : 'bg-gray-200 text-gray-500'
            }`}>
              {capturedImages[step.id] ? <Check size={16} /> : index + 1}
            </div>
            {index < captureSteps.length - 1 && (
              <div className={`w-8 h-1 mx-2 ${
                capturedImages[step.id] ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {currentCapture === 'complete' ? (
          renderCompletionScreen()
        ) : currentStep ? (
          renderCaptureInterface(currentStep)
        ) : null}
      </div>

      {/* Navigation */}
      {currentCapture === 'complete' && analysisResults?.final && (
        <div className="text-center">
          <button
            onClick={onNext}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {translations.proceedToResults || 'Proceed to Results'}
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              {translations.biometricSecurity || 'Biometric Security'}
            </h4>
            <p className="text-sm text-blue-800">
              {translations.biometricSecurityDesc || 'Biometric data is encrypted and used only for animal identification. This prevents duplicate registrations and fraud in subsidy programs.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricCapture;