import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glass = true,
  padding = 'md',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={[
        'rounded-xl border',
        glass
          ? 'bg-white/5 border-white/10 backdrop-blur-sm'
          : 'bg-gray-900 border-gray-800',
        paddingClasses[padding],
        onClick ? 'cursor-pointer hover:bg-white/10 transition-colors duration-200' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default Card;
