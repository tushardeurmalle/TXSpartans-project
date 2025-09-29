import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Heart, Info, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Breed {
  id: string;
  name: string;
  nativeName: string;
  scientificName: string;
  origin: string;
  type: 'cattle' | 'buffalo';
  category: 'dairy' | 'draft' | 'dual-purpose';
  characteristics: string[];
  milkYield: string;
  bodyWeight: string;
  colors: string[];
  specialFeatures: string[];
  regions: string[];
  image: string;
  audioDescription?: string;
}

const BreedDatabase: React.FC = () => {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'cattle' | 'buffalo'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dairy' | 'draft' | 'dual-purpose'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const mockBreeds: Breed[] = [
    {
      id: '1',
      name: 'Gir',
      nativeName: 'ગીર',
      scientificName: 'Bos taurus indicus',
      origin: 'Gujarat, India',
      type: 'cattle',
      category: 'dairy',
      characteristics: ['Distinctive forehead', 'Drooping ears', 'Docile nature', 'Heat tolerant'],
      milkYield: '8-12 liters/day',
      bodyWeight: '300-400 kg (cow), 450-550 kg (bull)',
      colors: ['White', 'Red', 'Mixed'],
      specialFeatures: ['A2 milk production', 'Disease resistant', 'Long lactation period'],
      regions: ['Gujarat', 'Rajasthan', 'Maharashtra'],
      image: 'https://investment.amyrafarms.com/cdn/shop/files/WhatsApp_Image_2025-05-15_at_17.56.59.jpg?v=1747394716'
    },
    {
      id: '2',
      name: 'Sahiwal',
      nativeName: 'साहीवाल',
      scientificName: 'Bos taurus indicus',
      origin: 'Punjab/Haryana, India',
      type: 'cattle',
      category: 'dairy',
      characteristics: ['Large size', 'Long drooping ears', 'Loose skin', 'Good mothering ability'],
      milkYield: '10-16 liters/day',
      bodyWeight: '350-450 kg (cow), 450-600 kg (bull)',
      colors: ['Reddish-brown', 'Light red'],
      specialFeatures: ['High milk fat content', 'Tick resistant', 'Adaptable to various climates'],
      regions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
      image: 'https://esfqc9riepu.exactdn.com/wp-content/uploads/2019/12/sahiwal-cow.jpg'
    },
    {
      id: '3',
      name: 'Red Sindhi',
      nativeName: 'रेड सिंधी',
      scientificName: 'Bos taurus indicus',
      origin: 'Sindh (now Pakistan)',
      type: 'cattle',
      category: 'dairy',
      characteristics: ['Deep red coat', 'Compact body', 'Hardy constitution', 'Good udder'],
      milkYield: '6-10 liters/day',
      bodyWeight: '280-350 kg (cow), 400-500 kg (bull)',
      colors: ['Deep red', 'Dark red'],
      specialFeatures: ['Heat tolerance', 'Disease resistance', 'Good calving ease'],
      regions: ['Gujarat', 'Maharashtra', 'Karnataka'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKL22gV8sTdr5nlKJnRIjH6qfdSY5k4DJuFA&s'
    },
    {
      id: '4',
      name: 'Murrah',
      nativeName: 'मुर्राह',
      scientificName: 'Bubalus bubalis',
      origin: 'Haryana, India',
      type: 'buffalo',
      category: 'dairy',
      characteristics: ['Jet black color', 'Wall eyes', 'Large udder', 'Curled horns'],
      milkYield: '12-18 liters/day',
      bodyWeight: '450-650 kg (female), 550-800 kg (male)',
      colors: ['Jet black'],
      specialFeatures: ['Highest milk yield among buffaloes', 'High butterfat content', 'Long productive life'],
      regions: ['Haryana', 'Punjab', 'Uttar Pradesh'],
      image: 'https://i.pinimg.com/736x/a6/79/4e/a6794e8068e1c3fcd520c8c327b07c54.jpg'
    },
    {
      id: '5',
      name: 'Ongole',
      nativeName: 'ఓంగోలు',
      scientificName: 'Bos taurus indicus',
      origin: 'Andhra Pradesh, India',
      type: 'cattle',
      category: 'dual-purpose',
      characteristics: ['Large size', 'White/grey color', 'Prominent hump', 'Long legs'],
      milkYield: '4-8 liters/day',
      bodyWeight: '400-500 kg (cow), 500-650 kg (bull)',
      colors: ['White', 'Light grey'],
      specialFeatures: ['Excellent draught power', 'Heat resistant', 'Good walking ability'],
      regions: ['Andhra Pradesh', 'Tamil Nadu', 'Karnataka'],
      image: 'https://newsmeter.in/h-upload/2025/02/13/394744-ongole-breed-cow.webp'
    },
    {
      id: '6',
      name: 'Tharparkar',
      nativeName: 'थारपारकर',
      scientificName: 'Bos taurus indicus',
      origin: 'Rajasthan, India',
      type: 'cattle',
      category: 'dual-purpose',
      characteristics: ['White/grey coat', 'Medium size', 'Hardy nature', 'Good udder'],
      milkYield: '6-10 liters/day',
      bodyWeight: '300-400 kg (cow), 400-500 kg (bull)',
      colors: ['White', 'Light grey'],
      specialFeatures: ['Drought resistant', 'Low maintenance', 'Good fertility'],
      regions: ['Rajasthan', 'Gujarat', 'Haryana'],
      image: 'https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/08/Tharparkar-cow-5.jpg?size=*:900'
    }
  ];

  useEffect(() => {
    setBreeds(mockBreeds);
  }, []);

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.nativeName.includes(searchTerm) ||
                         breed.origin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || breed.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || breed.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || breed.regions.some(region => 
      region.toLowerCase().includes(selectedRegion.toLowerCase())
    );

    return matchesSearch && matchesType && matchesCategory && matchesRegion;
  });

  const regions = Array.from(new Set(breeds.flatMap(breed => breed.regions))).sort();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations.breedDatabase || 'Indigenous Breed Database'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translations.databaseDesc || 'Comprehensive information about 50+ indigenous cattle and buffalo breeds of India'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={translations.searchBreeds || 'Search breeds...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{translations.allTypes || 'All Types'}</option>
                <option value="cattle">{translations.cattle || 'Cattle'}</option>
                <option value="buffalo">{translations.buffalo || 'Buffalo'}</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{translations.allCategories || 'All Categories'}</option>
                <option value="dairy">{translations.dairy || 'Dairy'}</option>
                <option value="draft">{translations.draft || 'Draft'}</option>
                <option value="dual-purpose">{translations.dualPurpose || 'Dual Purpose'}</option>
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{translations.allRegions || 'All Regions'}</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {translations.showingResults || 'Showing'} <span className="font-semibold">{filteredBreeds.length}</span> {translations.breeds || 'breeds'}
          </p>
        </div>

        {/* Breeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map(breed => (
            <div key={breed.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{breed.name}</h3>
                    <div className="flex space-x-2">
                      {breed.type === 'cattle' ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {translations.cattle || 'Cattle'}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {translations.buffalo || 'Buffalo'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 font-medium">{breed.nativeName}</p>
                  <p className="text-sm text-gray-500">{breed.scientificName}</p>
                  
                  <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{breed.origin}</span>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{translations.category || 'Category'}:</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{breed.category.replace('-', ' ')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{translations.milkYield || 'Milk Yield'}:</span>
                    <span className="text-sm font-medium text-gray-900">{breed.milkYield}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{translations.bodyWeight || 'Body Weight'}:</span>
                    <span className="text-sm font-medium text-gray-900">{breed.bodyWeight}</span>
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">{translations.colors || 'Colors'}:</p>
                  <div className="flex flex-wrap gap-1">
                    {breed.colors.map((color, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Characteristics */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">{translations.keyCharacteristics || 'Key Characteristics'}:</p>
                  <div className="flex flex-wrap gap-1">
                    {breed.characteristics.slice(0, 3).map((char, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {char}
                      </span>
                    ))}
                    {breed.characteristics.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{breed.characteristics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Special Features */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">{translations.specialFeatures || 'Special Features'}:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {breed.specialFeatures.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-1">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    <Info size={16} />
                    <span>{translations.viewDetails || 'View Details'}</span>
                  </button>
                  
                  <button className="px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <Heart size={16} />
                  </button>
                  
                  {breed.audioDescription && (
                    <button className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBreeds.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {translations.noResults || 'No breeds found'}
            </h3>
            <p className="text-gray-600">
              {translations.noResultsDesc || 'Try adjusting your search terms or filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedDatabase;