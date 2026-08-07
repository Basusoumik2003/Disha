import React from 'react';
import { WeatherForecast } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { CloudSun, Thermometer, Wind, Droplets, Eye, CloudRain } from 'lucide-react';

interface WeatherViewProps {
  weather: WeatherForecast | null;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ weather }) => {
  if (!weather) return null;

  const { current, hourly } = weather;

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-10">
      {/* Current Station Weather Card */}
      <GlassCard variant="default" className="p-6 bg-gradient-to-br from-blue-50/50 via-white to-orange-50/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CloudSun className="w-5 h-5 text-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Current Station Weather
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary">{current.stationName}</h2>
            <p className="text-sm text-text-secondary mt-0.5">{current.condition}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-6xl font-extrabold font-mono text-text-primary tracking-tighter">
              {Math.round(current.temperature)}°
            </span>
            <div className="text-xs text-text-secondary space-y-0.5 border-l border-border-subtle pl-4">
              <p>Feels like {Math.round(current.feelsLike)}°C</p>
              <p>Visibility {current.visibilityKm} km</p>
            </div>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border-subtle">
          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-border-subtle">
            <Thermometer className="w-5 h-5 text-brand-saffron" />
            <div>
              <span className="text-[11px] text-text-tertiary block">Temperature</span>
              <span className="text-sm font-semibold text-text-primary">{current.temperature}°C</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-border-subtle">
            <Droplets className="w-5 h-5 text-brand-blue" />
            <div>
              <span className="text-[11px] text-text-tertiary block">Humidity</span>
              <span className="text-sm font-semibold text-text-primary">{current.humidity}%</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-border-subtle">
            <Wind className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-[11px] text-text-tertiary block">Wind Speed</span>
              <span className="text-sm font-semibold text-text-primary">{current.windSpeed} km/h</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-border-subtle">
            <Eye className="w-5 h-5 text-purple-600" />
            <div>
              <span className="text-[11px] text-text-tertiary block">Condition</span>
              <span className="text-sm font-semibold text-text-primary truncate">{current.condition}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Hourly Forecast */}
      <GlassCard variant="default" className="p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-brand-blue" />
          <span>Along-Route Rain & Weather Forecast</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {hourly.map((h, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-3 bg-bg-surface/80 rounded-2xl border border-border-subtle text-center"
            >
              <span className="text-xs font-mono font-medium text-text-secondary">{h.time}</span>
              <CloudSun className="w-6 h-6 text-brand-saffron my-2" />
              <span className="text-base font-bold text-text-primary font-mono">{Math.round(h.temperature)}°</span>

              {h.rainProbabilityPercentage > 0 && (
                <span className="mt-1 text-[10px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-full">
                  💧 {h.rainProbabilityPercentage}%
                </span>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
