import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../Common/Logo';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { translations } = useLanguage();

  const footerLinks = [
    {
      title: translations.quickLinks || 'Quick Links',
      links: [
        { name: translations.home || 'Home', href: '/' },
        { name: translations.identify || 'Breed Identification', href: '/identify' },
        { name: translations.database || 'Breed Database', href: '/database' },
        { name: translations.veterinary || 'Veterinary Portal', href: '/veterinary' }
      ]
    },
    {
      title: translations.resources || 'Resources',
      links: [
        { name: translations.userGuide || 'User Guide', href: '/guide' },
        { name: translations.training || 'Training Materials', href: '/training' },
        { name: translations.support || 'Support', href: '/support' },
        { name: translations.faq || 'FAQ', href: '/faq' }
      ]
    },
    {
      title: translations.government || 'Government',
      links: [
        { name: translations.ministry || 'Ministry of Animal Husbandry', href: 'https://dahd.nic.in' },
        { name: translations.bpa || 'Bharat Pashudhan App', href: 'https://bpa.gov.in' },
        { name: translations.policies || 'Policies', href: '/policies' },
        { name: translations.guidelines || 'Guidelines', href: '/guidelines' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size="medium" variant="white" />
              <div>
                <h3 className="text-xl font-bold">PashuNetra</h3>
                <p className="text-gray-400 text-sm">
                  {translations.tagline || 'AI-Powered Cattle Breed Identification'}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {translations.footerDescription || 'Empowering farmers and field workers with accurate cattle breed identification through advanced AI technology.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">support@pashunetra.gov.in</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Helpline</p>
                <p className="text-white">1800-11-5060</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">Ministry of Animal Husbandry, New Delhi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 PashuNetra. All rights reserved. Government of India.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              {translations.privacy || 'Privacy Policy'}
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              {translations.terms || 'Terms of Service'}
            </Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-white text-sm">
              {translations.accessibility || 'Accessibility'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;