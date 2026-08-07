import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GlassCard } from '../ui/GlassCard';
import { Gauge, Clock } from 'lucide-react';

export const SpeedDelayCharts: React.FC = () => {
  const speedData = [
    { time: '08:00', speed: 0 },
    { time: '09:00', speed: 85 },
    { time: '10:00', speed: 105 },
    { time: '11:00', speed: 92 },
    { time: '12:00', speed: 110 },
    { time: '13:00', speed: 65 },
    { time: '14:00', speed: 98 },
  ];

  const delayData = [
    { time: '08:00', delay: 0 },
    { time: '09:00', delay: 4 },
    { time: '10:00', delay: 8 },
    { time: '11:00', delay: 15 },
    { time: '12:00', delay: 12 },
    { time: '13:00', delay: 10 },
    { time: '14:00', delay: 12 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Speed Chart */}
      <GlassCard variant="default" className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-orange-50 text-brand-saffron rounded-xl">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Speed Analytics</h3>
            <p className="text-xs text-text-secondary">Cruising speed in km/h over time</p>
          </div>
        </div>

        <div className="w-full h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={speedData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF6B00" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#A0A0A0" fontSize={11} tickLine={false} />
              <YAxis stroke="#A0A0A0" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="speed" stroke="#FF6B00" strokeWidth={2} fill="url(#speedGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Delay Chart */}
      <GlassCard variant="default" className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Live Delay Trend</h3>
            <p className="text-xs text-text-secondary">Station delay in minutes</p>
          </div>
        </div>

        <div className="w-full h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={delayData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="time" stroke="#A0A0A0" fontSize={11} tickLine={false} />
              <YAxis stroke="#A0A0A0" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="delay" stroke="#FF9500" strokeWidth={2.5} dot={{ r: 4, fill: '#FF9500' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
