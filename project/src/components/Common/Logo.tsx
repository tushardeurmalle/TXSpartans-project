import React from 'react';
import { Eye, Heart } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', variant = 'default', showText = false }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  const iconColor = variant === 'white' ? 'text-white' : 'text-orange-100';
  const heartColor = variant === 'white' ? 'text-orange-400' : 'text-black';
  const textColor = variant === 'white' ? 'text-white' : 'text-gray-900';

  return (
    <div className="flex items-center space-x-2">
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg`}>
        <Eye className={`${iconColor} w-2/3 h-2/3`} />
        <Heart className={`absolute -bottom-1 -right-1 ${heartColor} w-1/3 h-1/3`} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizes[size]} ${textColor}`}>
          PashuNetra
        </span>
      )}
    </div>
  );
};

export default Logo;