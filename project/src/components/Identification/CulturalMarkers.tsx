import React, { useState } from 'react';
import { Check, MapPin, Bell, Palette, Scissors } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CulturalMarkersProps {
  onMarkersSelect: (markers: string[]) => void;
  onNext: () => void;
}

const CulturalMarkers: React.FC<CulturalMarkersProps> = ({ onMarkersSelect, onNext }) => {
  const { translations } = useLanguage();
  const [selectedMarkers, setSelectedMarkers] = useState<string[]>([]);

  const culturalMarkers = [
    {
      category: translations.ornaments || 'Ornaments',
      icon: Bell,
      items: [
        { id: 'bell', name: translations.bell || 'Bell', description: 'Traditional neck bell' },
        { id: 'necklace', name: translations.necklace || 'Necklace', description: 'Decorative necklace' },
        { id: 'nose_ring', name: translations.noseRing || 'Nose Ring', description: 'Metal nose ring' },
        { id: 'ear_tag', name: translations.earTag || 'Ear Tag', description: 'Identification ear tag' }
      ]
    },
    {
      category: translations.markings || 'Markings',
      icon: Palette,
      items: [
        { id: 'tilak', name: translations.tilak || 'Tilak', description: 'Religious forehead marking' },
        { id: 'paint_marks', name: translations.paintMarks || 'Paint Marks', description: 'Colored identification marks' },
        { id: 'henna', name: translations.henna || 'Henna', description: 'Henna decorations' },
        { id: 'branded', name: translations.branded || 'Branded', description: 'Owner brand mark' }
      ]
    },
    {
      category: translations.grooming || 'Grooming',
      icon: Scissors,
      items: [
        { id: 'horn_shaped', name: translations.hornShaped || 'Horn Shaped', description: 'Artificially shaped horns' },
        { id: 'tail_styled', name: translations.tailStyled || 'Tail Styled', description: 'Styled tail' },
        { id: 'hair_trimmed', name: translations.hairTrimmed || 'Hair Trimmed', description: 'Trimmed hair pattern' },
        { id: 'decorated_rope', name: translations.decoratedRope || 'Decorated Rope', description: 'Colorful rope halter' }
      ]
    },
    {
      category: translations.regional || 'Regional Features',
      icon: MapPin,
      items: [
        { id: 'gujarat_style', name: translations.gujaratStyle || 'Gujarat Style', description: 'Gujarat regional markers' },
        { id: 'rajasthan_style', name: translations.rajasthanStyle || 'Rajasthan Style', description: 'Rajasthan regional markers' },
        { id: 'punjab_style', name: translations.punjabStyle || 'Punjab Style', description: 'Punjab regional markers' },
        { id: 'tamil_style', name: translations.tamilStyle || 'Tamil Style', description: 'Tamil Nadu regional markers' }
      ]
    }
  ];

  const toggleMarker = (markerId: string) => {
    setSelectedMarkers(prev => {
      const updated = prev.includes(markerId)
        ? prev.filter(id => id !== markerId)
        : [...prev, markerId];
      
      onMarkersSelect(updated);
      return updated;
    });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {translations.identifyCulturalMarkers || 'Identify Cultural Markers'}
        </h2>
        <p className="text-gray-600">
          {translations.culturalMarkersDesc || 'Select any cultural markers, ornaments, or regional features visible on the animal'}
        </p>
      </div>

      <div className="space-y-8">
        {culturalMarkers.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <category.icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {category.category}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMarkers.includes(item.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => toggleMarker(item.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    
                    {selectedMarkers.includes(item.id) && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Markers Summary */}
      {selectedMarkers.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            {translations.selectedMarkers || 'Selected Markers'} ({selectedMarkers.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedMarkers.map(markerId => {
              const marker = culturalMarkers
                .flatMap(cat => cat.items)
                .find(item => item.id === markerId);
              
              return marker ? (
                <span
                  key={markerId}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {marker.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Skip Option */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          {translations.noCulturalMarkersNote || 'No cultural markers visible? You can skip this step.'}
        </p>
        
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {selectedMarkers.length > 0 
            ? (translations.continueWithMarkers || 'Continue with Selected Markers')
            : (translations.skipStep || 'Skip This Step')
          }
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">
          {translations.helpTitle || 'What are Cultural Markers?'}
        </h4>
        <p className="text-sm text-yellow-800">
          {translations.culturalMarkersHelp || 'Cultural markers are human-added decorations, markings, or modifications that vary by region and community. They help our AI understand the local context and improve breed identification accuracy.'}
        </p>
      </div>
    </div>
  );
};

export default CulturalMarkers;