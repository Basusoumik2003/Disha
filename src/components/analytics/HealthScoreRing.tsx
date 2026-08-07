import React, { useState } from 'react';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ShieldCheck, Info } from 'lucide-react';
import { HealthScoreModal } from './HealthScoreModal';

interface HealthScoreRingProps {
  score: number; // 0 - 100
  delayMinutes?: number;
  currentSpeedKmh?: number;
}

export const HealthScoreRing: React.FC<HealthScoreRingProps> = ({
  score,
  delayMinutes = 12,
  currentSpeedKmh = 85,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#34C759'; // green
  if (score < 50) strokeColor = '#FF3B30'; // red
  else if (score < 80) strokeColor = '#FF9500'; // amber

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col items-center justify-center relative p-4 cursor-pointer group"
      >
        <div className="relative w-36 h-36 flex items-center justify-center group-hover:scale-105 transition-transform">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#E8E8E6"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={strokeColor}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <AnimatedCounter
            value={score}
            durationMs={1200}
            className="text-3xl font-bold tracking-tight text-text-primary"
          />
          <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
            Health Score
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-text-secondary group-hover:text-brand-blue transition-colors">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Tap for score breakdown & pillars</span>
      </div>
    </div>

    <HealthScoreModal
      score={score}
      delayMinutes={delayMinutes}
      currentSpeedKmh={currentSpeedKmh}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
};
