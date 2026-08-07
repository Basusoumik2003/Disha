import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from '../components/ui/GlassCard';
import { Settings, ArrowLeft, RefreshCw, Gauge, Thermometer, ShieldCheck } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);

  return (
    <div className="min-h-screen bg-bg-surface p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Settings className="w-6 h-6 text-brand-blue" />
              <span>Application Settings</span>
            </h1>
            <p className="text-xs text-text-secondary">Customize units, refresh loops, and map performance</p>
          </div>
        </div>

        <GlassCard variant="default" className="p-6 space-y-6 divide-y divide-border-subtle">
          {/* Refresh Loop Interval */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-brand-blue" />
              <div>
                <h4 className="font-semibold text-sm text-text-primary">Auto Refresh Interval</h4>
                <p className="text-xs text-text-secondary">Frequency of live train coordinate telemetry sync</p>
              </div>
            </div>

            <select
              value={settings.autoRefreshIntervalSeconds}
              onChange={(e) =>
                updateSettings({
                  autoRefreshIntervalSeconds: Number(e.target.value) as 15 | 30 | 60,
                })
              }
              className="bg-bg-surface border border-border-subtle rounded-xl px-3 py-1.5 text-xs font-semibold text-text-primary focus:outline-none"
            >
              <option value={15}>15 Seconds</option>
              <option value={30}>30 Seconds (Default)</option>
              <option value={60}>60 Seconds</option>
            </select>
          </div>

          {/* Distance Units */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-brand-saffron" />
              <div>
                <h4 className="font-semibold text-sm text-text-primary">Distance & Speed Units</h4>
                <p className="text-xs text-text-secondary">Metric (Kilometers/hour) vs Imperial (Miles/hour)</p>
              </div>
            </div>

            <div className="flex bg-bg-surface p-1 rounded-xl border border-border-subtle">
              <button
                onClick={() => updateSettings({ distanceUnit: 'km' })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  settings.distanceUnit === 'km' ? 'bg-white text-brand-blue shadow-sm' : 'text-text-secondary'
                }`}
              >
                KM
              </button>
              <button
                onClick={() => updateSettings({ distanceUnit: 'miles' })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  settings.distanceUnit === 'miles' ? 'bg-white text-brand-blue shadow-sm' : 'text-text-secondary'
                }`}
              >
                Miles
              </button>
            </div>
          </div>

          {/* Temperature Units */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-red-500" />
              <div>
                <h4 className="font-semibold text-sm text-text-primary">Temperature Units</h4>
                <p className="text-xs text-text-secondary">Celsius vs Fahrenheit for weather companion</p>
              </div>
            </div>

            <div className="flex bg-bg-surface p-1 rounded-xl border border-border-subtle">
              <button
                onClick={() => updateSettings({ temperatureUnit: 'C' })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  settings.temperatureUnit === 'C' ? 'bg-white text-brand-blue shadow-sm' : 'text-text-secondary'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => updateSettings({ temperatureUnit: 'F' })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  settings.temperatureUnit === 'F' ? 'bg-white text-brand-blue shadow-sm' : 'text-text-secondary'
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="text-center text-xs text-text-tertiary font-mono pt-4">
          Bharat Rail Enterprise v1.0.0 • React + MapLibre GL
        </div>
      </div>
    </div>
  );
};
