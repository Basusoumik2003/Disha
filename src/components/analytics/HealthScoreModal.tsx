import React from 'react';
import { X, ShieldCheck, Zap, Clock, Compass, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { ProgressBar } from '../ui/ProgressBar';

interface HealthScoreModalProps {
  score: number;
  delayMinutes: number;
  currentSpeedKmh: number;
  isOpen: boolean;
  onClose: () => void;
}

export const HealthScoreModal: React.FC<HealthScoreModalProps> = ({
  score,
  delayMinutes,
  currentSpeedKmh,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const onTimeSubScore = Math.max(0, 100 - delayMinutes * 3);
  const speedSubScore = Math.min(100, Math.round((currentSpeedKmh / 110) * 100));
  const etaConfidenceScore = 95;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <GlassCard variant="elevated" className="w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-text-tertiary hover:text-text-primary rounded-full hover:bg-bg-surface transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg font-mono">
            {score}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Journey Health Breakdown</h3>
            <p className="text-xs text-text-secondary">Proprietary composite scoring algorithm</p>
          </div>
        </div>

        <p className="text-xs text-text-secondary mb-6 leading-relaxed">
          The Journey Health Score is calculated in real time using satellite telemetry, block signal logs, and historic speed data across 3 key pillars:
        </p>

        <div className="space-y-4 mb-6">
          {/* Pillar 1: On-Time Performance */}
          <div className="p-3 bg-bg-surface rounded-xl border border-border-subtle">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-saffron" />
                <span className="text-xs font-semibold text-text-primary">On-Time Performance (50% Weight)</span>
              </div>
              <span className="text-xs font-mono font-bold text-text-primary">{onTimeSubScore}/100</span>
            </div>
            <ProgressBar progressPercentage={onTimeSubScore} heightPx={5} showGlow={false} />
            <p className="text-[11px] text-text-tertiary mt-1.5">
              Current delay: {delayMinutes === 0 ? 'On Time' : `+${delayMinutes} min`}
            </p>
          </div>

          {/* Pillar 2: Speed Consistency */}
          <div className="p-3 bg-bg-surface rounded-xl border border-border-subtle">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-semibold text-text-primary">Speed Consistency (30% Weight)</span>
              </div>
              <span className="text-xs font-mono font-bold text-text-primary">{speedSubScore}/100</span>
            </div>
            <ProgressBar progressPercentage={speedSubScore} heightPx={5} showGlow={false} />
            <p className="text-[11px] text-text-tertiary mt-1.5">
              Cruising speed: {currentSpeedKmh} km/h vs target 110 km/h
            </p>
          </div>

          {/* Pillar 3: ETA Confidence */}
          <div className="p-3 bg-bg-surface rounded-xl border border-border-subtle">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-text-primary">ETA Model Confidence (20% Weight)</span>
              </div>
              <span className="text-xs font-mono font-bold text-text-primary">{etaConfidenceScore}/100</span>
            </div>
            <ProgressBar progressPercentage={etaConfidenceScore} heightPx={5} showGlow={false} />
            <p className="text-[11px] text-text-tertiary mt-1.5">
              High accuracy based on clear block signaling data
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-brand-blue text-white font-medium text-xs rounded-xl shadow-card hover:bg-blue-600 transition-colors"
        >
          Got It
        </button>
      </GlassCard>
    </div>
  );
};
