import React, { useEffect, useState } from 'react';
import { LiveTrainStatus, RouteStation, ElevationProfile, PointOfInterest, WeatherForecast } from '../types';
import { RailRadarService } from '../services/railRadarService';
import { useAppStore } from '../store/useAppStore';
import { JourneyHeader } from '../components/journey/JourneyHeader';
import { BharatRailMap } from '../components/map/BharatRailMap';
import { MapControls } from '../components/map/MapControls';
import { POIDetailSheet } from '../components/map/POIDetailSheet';
import { StationTimeline } from '../components/journey/StationTimeline';
import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';
import { WeatherView } from '../components/weather/WeatherView';
import { AlongRouteCompanion } from '../components/companion/AlongRouteCompanion';
import { ShareModal } from '../components/journey/ShareModal';
import { GlassCard } from '../components/ui/GlassCard';
import { ProgressBar } from '../components/ui/ProgressBar';

interface LiveJourneyPageProps {
  trainNumber: string;
  onBackToSearch: () => void;
}

export const LiveJourneyPage: React.FC<LiveJourneyPageProps> = ({ trainNumber, onBackToSearch }) => {
  const activeTab = useAppStore((state) => state.activeTab);

  const [liveStatus, setLiveStatus] = useState<LiveTrainStatus | null>(null);
  const [elevationProfile, setElevationProfile] = useState<ElevationProfile | null>(null);
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch and simulate real-time live data loop (every 5 seconds simulation update)
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [status, elev, poiData, weatherData] = await Promise.all([
          RailRadarService.getLiveStatus(trainNumber),
          RailRadarService.getElevationProfile(trainNumber),
          RailRadarService.getPOIs(trainNumber),
          RailRadarService.getWeather(trainNumber),
        ]);

        if (isMounted) {
          setLiveStatus(status);
          setElevationProfile(elev);
          setPois(poiData);
          setWeather(weatherData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load train live data', err);
      }
    };

    fetchData();

    // 5s real-time tick for train movement & speed fluctuation
    const interval = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [trainNumber]);

  if (isLoading || !liveStatus) {
    return (
      <div className="min-h-screen bg-bg-surface flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-brand-blue border-t-transparent animate-spin mb-4" />
        <h3 className="font-semibold text-text-primary text-base">Connecting to RailRadar Network...</h3>
        <p className="text-xs text-text-secondary mt-1">Syncing live telemetry for Train #{trainNumber}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-surface flex flex-col">
      {/* Sticky Header */}
      <JourneyHeader liveStatus={liveStatus} onBack={onBackToSearch} />

      {/* Progress Bar under header */}
      <ProgressBar progressPercentage={liveStatus.journeyStats.completionPercentage} heightPx={3} />

      {/* Main Tab Content Area */}
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-140px)]">
            {/* Map Container (Left 8 cols on desktop) */}
            <div className="lg:col-span-8 relative h-full min-h-[420px] rounded-3xl overflow-hidden shadow-card border border-border-subtle">
              <BharatRailMap
                liveStatus={liveStatus}
                stations={liveStatus.allStations}
                pois={pois}
                onSelectPoi={(poi) => setSelectedPoi(poi)}
              />
              <MapControls />

              {/* Station summary overlay on map bottom */}
              <div className="absolute left-4 right-16 bottom-4 z-20">
                <GlassCard variant="elevated" className="p-3.5 flex items-center justify-between border-brand-blue/30">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                      Next Station
                    </span>
                    <h4 className="font-bold text-sm text-text-primary">
                      {liveStatus.nextStation?.name || 'Destination'}
                    </h4>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-base font-bold text-brand-saffron">
                      ETA {liveStatus.nextStation?.etaMinutes}m
                    </span>
                    <span className="text-xs text-text-secondary block">
                      {liveStatus.nextStation?.distanceKm} km remaining
                    </span>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Timeline Panel (Right 4 cols on desktop) */}
            <div className="lg:col-span-4 h-full overflow-y-auto pr-1">
              <StationTimeline
                stations={liveStatus.allStations}
                currentKm={liveStatus.journeyStats.distanceCoveredKm}
              />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            liveStatus={liveStatus}
            elevationProfile={elevationProfile}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherView weather={weather} />
        )}

        {activeTab === 'companion' && (
          <AlongRouteCompanion
            pois={pois}
            onSelectPoi={(poi) => setSelectedPoi(poi)}
          />
        )}
      </main>

      {/* POI detail slide sheet */}
      <POIDetailSheet poi={selectedPoi} onClose={() => setSelectedPoi(null)} />

      {/* Share Modal */}
      <ShareModal />
    </div>
  );
};
