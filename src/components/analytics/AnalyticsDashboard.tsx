import React from 'react';
import { LiveTrainStatus, ElevationProfile } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { HealthScoreRing } from './HealthScoreRing';
import { ElevationChart } from './ElevationChart';
import { SpeedDelayCharts } from './SpeedDelayCharts';
import { Gauge, Activity, MapPin, Zap } from 'lucide-react';

interface AnalyticsDashboardProps {
  liveStatus: LiveTrainStatus | null;
  elevationProfile: ElevationProfile | null;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  liveStatus,
  elevationProfile,
}) => {
  if (!liveStatus) return null;

  const { journeyStats } = liveStatus;

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-10">
      {/* Top Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Health Score Card */}
        <GlassCard variant="default" className="flex items-center justify-center p-2">
          <HealthScoreRing
            score={journeyStats.journeyHealthScore}
            delayMinutes={journeyStats.totalDelayMinutes}
            currentSpeedKmh={journeyStats.currentSpeedKmh}
          />
        </GlassCard>

        {/* Journey Completion & Speed Stats */}
        <GlassCard variant="default" className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Journey Completion
            </span>
            <Activity className="w-4 h-4 text-brand-blue" />
          </div>

          <div className="my-2">
            <span className="text-4xl font-extrabold text-text-primary tracking-tight font-mono">
              {journeyStats.completionPercentage}%
            </span>
            <p className="text-xs text-text-secondary mt-1">
              {journeyStats.distanceCoveredKm} km covered of total route
            </p>
          </div>

          <div className="w-full bg-border-subtle h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-blue h-full rounded-full transition-all duration-500"
              style={{ width: `${journeyStats.completionPercentage}%` }}
            />
          </div>
        </GlassCard>

        {/* Speed & Delay Summary */}
        <GlassCard variant="default" className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Current Speed
            </span>
            <Zap className="w-4 h-4 text-brand-saffron" />
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-text-primary font-mono">
                {journeyStats.currentSpeedKmh}
              </span>
              <span className="text-sm font-semibold text-text-secondary">km/h</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Average journey speed: {journeyStats.averageSpeedKmh} km/h
            </p>
          </div>

          <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
            <span className="text-text-secondary">Delay Trend:</span>
            <span className="font-medium text-emerald-600 capitalize">
              {journeyStats.delayTrend}
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Speed & Delay Charts */}
      <SpeedDelayCharts />

      {/* Elevation Profile Chart */}
      <ElevationChart
        profile={elevationProfile}
        currentKm={journeyStats.distanceCoveredKm}
      />
    </div>
  );
};
