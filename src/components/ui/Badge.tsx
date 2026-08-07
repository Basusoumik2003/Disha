import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'onTime' | 'delayed' | 'early' | 'neutral' | 'saffron' | 'blue';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  icon,
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
  };

  const variantStyles = {
    onTime: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    delayed: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    early: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    neutral: 'bg-bg-surface text-text-secondary border border-border-subtle',
    saffron: 'bg-orange-50 text-brand-saffron border border-orange-200/60',
    blue: 'bg-blue-50 text-brand-blue border border-blue-200/60',
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {icon}
      {children}
    </span>
  );
};
