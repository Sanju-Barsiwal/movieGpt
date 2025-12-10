import React from 'react';
import { LOGO_TEXT } from '@/utils/constants';
import { Film } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl gap-1.5',
    md: 'text-2xl sm:text-3xl gap-2',
    lg: 'text-3xl sm:text-4xl gap-2.5',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6 sm:w-8 sm:h-8',
    lg: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} font-outfit font-bold`}>
      <div className="relative">
        <Film className={`${iconSizes[size]} text-white`} />
        <div className="absolute inset-0 blur-lg bg-white/30 -z-10" />
      </div>
      <span className="text-white">
        {LOGO_TEXT}
      </span>
    </div>
  );
};

export default Logo;