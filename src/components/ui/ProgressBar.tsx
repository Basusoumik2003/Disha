import React from 'react';

interface ProgressBarProps {
  progressPercentage: number; // 0-100
  heightPx?: number;
  showGlow?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
  heightPx = 6,
  showGlow = true,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progressPercentage));

  return (
    <div
      className={`w-full bg-border-subtle/60 rounded-full overflow-hidden relative ${className}`}
      style={{ height: `${heightPx}px` }}
    >
      <div
        className={`h-full bg-gradient-to-r from-brand-blue via-blue-500 to-brand-saffron rounded-full transition-all duration-700 ease-out ${
          showGlow ? 'shadow-[0_0_12px_rgba(255,107,0,0.6)]' : ''
        }`}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
