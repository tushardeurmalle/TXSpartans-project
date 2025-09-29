import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Database, Users, Shield, Zap, Globe, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { translations } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of hero image URLs - REPLACE THESE WITH YOUR ACTUAL IMAGE LINKS
  const heroImages = [
    'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb3RDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4536627aa21611d60920cfc299f11ae2b1ef7c0a/Photo%20Credit_Char%20Livlihoods%20Program%20.jpg', // Replace with your image URL 1
    'https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/english-betterindia/media/post_attachments/uploads/2021/01/Shraddha-1.jpg', // Replace with your image URL 2
    'https://www.jordbrukare.com/wp-content/uploads/2021/02/20.jpg', // Replace with your image URL 3
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhvY07i3wAM6xRf414c_b-wzXL1a5ARGRww&s'  // Replace with your image URL 4
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const features = [
    {
      icon: Camera,
      title: translations.aiIdentification || 'AI Breed Identification',
      description: translations.aiIdentificationDesc || 'Advanced computer vision to identify 50+ indigenous cattle breeds with 95%+ accuracy'
    },
    {
      icon: Globe,
      title: translations.multiLanguage || 'Multi-Language Support',
      description: translations.multiLanguageDesc || 'Available in 22 Indian languages with voice recognition and local dialect support'
    },
    {
      icon: Database,
      title: translations.comprehensiveDatabase || 'Comprehensive Database',
      description: translations.comprehensiveDatabaseDesc || 'Extensive breed information with cultural markers, regional traits, and growth patterns'
    },
    {
      icon: Shield,
      title: translations.blockchainValidation || 'Blockchain Validation',
      description: translations.blockchainValidationDesc || 'Community-verified breed records with tamper-proof blockchain technology'
    },
    {
      icon: Users,
      title: translations.communityIntegration || 'Community Integration',
      description: translations.communityIntegrationDesc || 'Farmer knowledge integration with veterinary expertise for accurate identification'
    },
    {
      icon: Zap,
      title: translations.offlineMode || 'Offline Functionality',
      description: translations.offlineModeDesc || 'Complete offline operation for rural areas with automatic sync when connected'
    }
  ];

  const stats = [
    { number: '50+', label: translations.indigenousBreeds || 'Indigenous Breeds' },
    { number: '95%', label: translations.accuracy || 'Accuracy Rate' },
    { number: '22', label: translations.languages || 'Languages' },
    { number: '100%', label: translations.offline || 'Offline Capable' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Carousel */}
      <section className="relative text-white py-28 h-screen max-h-[800px] overflow-hidden">
        {/* Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={imageUrl}
                alt={`PashuNetra Hero ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback in case image fails to load
                  e.currentTarget.src = `https://via.placeholder.com/1200x800/1e40af/ffffff?text=PashuNetra+${index + 1}`;
                }}
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {translations.heroTitle || 'PashuNetra'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {translations.heroSubtitle || 'AI-Powered Cattle Breed Identification System for Bharat'}
            </p>
            <p className="text-lg mb-12 max-w-4xl mx-auto opacity-90">
              {translations.heroDescription || 'Empowering farmers and field workers with accurate breed identification through advanced AI, cultural awareness, and community wisdom.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/identify"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                {translations.identifyBreed || 'Identify Breed Now'}
              </Link>
              <Link
                to="/database"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border border-white/30"
              >
                {translations.exploreDatabase || 'Explore Database'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your existing code remains the same */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translations.keyFeatures || 'Key Features'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {translations.keyFeaturesDesc || 'Advanced technology meets traditional wisdom to revolutionize cattle breed identification'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {translations.realWorldImpact || 'Real-World Impact'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {translations.impactDescription || 'Transforming livestock management across rural India with measurable benefits'}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      {translations.increasedIncome || 'Increased Farmer Income'}
                    </h4>
                    <p className="opacity-80">
                      {translations.increasedIncomeDesc || 'Better breed identification leads to improved breeding decisions and higher milk yields'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      {translations.reducedFraud || 'Reduced Subsidy Fraud'}
                    </h4>
                    <p className="opacity-80">
                      {translations.reducedFraudDesc || 'Blockchain validation ensures accurate breed records and prevents misclassification'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      {translations.improvedPolicy || 'Better Policy Making'}
                    </h4>
                    <p className="opacity-80">
                      {translations.improvedPolicyDesc || 'Accurate data enables government to make informed decisions for livestock development'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">
                {translations.getStarted || 'Get Started Today'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <span>{translations.step1 || 'Upload or capture cattle image'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <span>{translations.step2 || 'AI analyzes breed characteristics'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <span>{translations.step3 || 'Get results with community validation'}</span>
                </div>
              </div>
              <Link
                to="/identify"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center px-6 py-3 rounded-lg font-semibold mt-6 transition-colors"
              >
                {translations.tryNow || 'Try Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translations.govIntegration || 'Government Integration'}
            </h2>
            <p className="text-xl text-gray-600">
              {translations.govIntegrationDesc || 'Seamlessly integrated with official government systems'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {translations.bpaSync || 'BPA Sync'}
              </h3>
              <p className="text-gray-600">
                {translations.bpaSyncDesc || 'Direct integration with Bharat Pashudhan App for seamless data flow'}
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {translations.secureData || 'Secure Data'}
              </h3>
              <p className="text-gray-600">
                {translations.secureDataDesc || 'Bank-level security with encrypted storage and blockchain verification'}
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {translations.multiStakeholder || 'Multi-Stakeholder'}
              </h3>
              <p className="text-gray-600">
                {translations.multiStakeholderDesc || 'Supports farmers, FLWs, veterinarians, and government officials'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;