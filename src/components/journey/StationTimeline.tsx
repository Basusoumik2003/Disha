import React from 'react';
import { StationStatus } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface StationTimelineProps {
  stations: StationStatus[];
  currentKm: number;
}

export const StationTimeline: React.FC<StationTimelineProps> = ({ stations, currentKm }) => {
  return (
    <GlassCard variant="default" className="p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center justify-between">
        <span>Station Arrival Timeline</span>
        <span className="text-xs font-normal text-text-tertiary">{stations.length} Stops</span>
      </h3>

      <div className="relative pl-6 space-y-6">
        {/* Timeline Connecting Line */}
        <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-border-subtle" />

        {stations.map((st, idx) => {
          const isPassed = currentKm >= st.kmFromOrigin;
          const isCurrent = Math.abs(currentKm - st.kmFromOrigin) < 30;

          return (
            <div key={st.code} className="relative flex items-start justify-between text-sm">
              {/* Timeline Icon Node */}
              <div className="absolute -left-6 top-0.5">
                {isPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-brand-blue bg-white rounded-full" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full bg-brand-saffron ring-4 ring-orange-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-text-tertiary bg-white rounded-full" />
                )}
              </div>

              {/* Station Info */}
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">{st.name}</span>
                  <span className="font-mono text-xs text-text-tertiary">({st.code})</span>
                </div>
                <span className="text-xs text-text-secondary font-mono">{st.kmFromOrigin} km</span>
              </div>

              {/* Arrival Schedule */}
              <div className="text-right flex flex-col items-end">
                <span className="font-mono text-xs font-medium text-text-primary">
                  {st.actualArrival || st.scheduledArrival}
                </span>

                {st.delayMinutes > 0 ? (
                  <Badge variant="delayed" size="sm" className="mt-1">
                    +{st.delayMinutes}m
                  </Badge>
                ) : (
                  <span className="text-[11px] text-emerald-600 font-medium mt-1">On Time</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
