import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { ElevationProfile } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Mountain } from 'lucide-react';

interface ElevationChartProps {
  profile: ElevationProfile | null;
  currentKm: number;
}

export const ElevationChart: React.FC<ElevationChartProps> = ({ profile, currentKm }) => {
  if (!profile) return null;

  return (
    <GlassCard variant="default" className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-brand-blue rounded-xl">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Elevation Profile</h3>
            <p className="text-xs text-text-secondary">Route topography across Indian terrain</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-brand-saffron block">
            Peak: {profile.highestPointM}m
          </span>
          <span className="text-[11px] text-text-tertiary">{profile.highestPointLocation}</span>
        </div>
      </div>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={profile.points} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0066FF" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="distanceKm"
              tickFormatter={(v) => `${v}km`}
              stroke="#A0A0A0"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              unit="m"
              stroke="#A0A0A0"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-border-subtle shadow-lg text-xs">
                      <p className="font-semibold text-text-primary">{data.stationName || `${data.distanceKm} km`}</p>
                      <p className="text-brand-blue font-mono">Elevation: {data.elevationM}m</p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="elevationM"
              stroke="#0066FF"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#elevationGrad)"
            />

            {/* Current Train position reference line */}
            <ReferenceLine
              x={currentKm}
              stroke="#FF6B00"
              strokeWidth={2}
              strokeDasharray="4 4"
              label={{
                value: 'Live Train',
                fill: '#FF6B00',
                fontSize: 10,
                position: 'top',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
