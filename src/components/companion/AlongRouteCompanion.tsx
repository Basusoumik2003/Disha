import React from 'react';
import { PointOfInterest } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { MapPin, Compass, Waves, Mountain, Landmark } from 'lucide-react';

interface AlongRouteCompanionProps {
  pois: PointOfInterest[];
  onSelectPoi: (poi: PointOfInterest) => void;
}

export const AlongRouteCompanion: React.FC<AlongRouteCompanionProps> = ({
  pois,
  onSelectPoi,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'river':
      case 'lake':
        return <Waves className="w-5 h-5 text-blue-600" />;
      case 'mountain':
      case 'ghat':
        return <Mountain className="w-5 h-5 text-emerald-600" />;
      case 'heritage':
      case 'tourist_attraction':
        return <Landmark className="w-5 h-5 text-amber-600" />;
      default:
        return <MapPin className="w-5 h-5 text-brand-saffron" />;
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Along-Route Travel Companion</h2>
          <p className="text-xs text-text-secondary">Geofenced landmarks, rivers, mountains & historic viaducts along your journey</p>
        </div>
        <Badge variant="saffron">{pois.length} Landmarks Discovered</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pois.map((poi) => (
          <GlassCard
            key={poi.id}
            variant="interactive"
            onClick={() => onSelectPoi(poi)}
            className="p-5 flex items-start gap-4 border-l-4 border-l-brand-saffron"
          >
            <div className="w-12 h-12 rounded-2xl bg-bg-surface flex items-center justify-center flex-shrink-0 shadow-sm border border-border-subtle">
              {getIcon(poi.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-brand-saffron uppercase tracking-wider">
                  {poi.type}
                </span>
                <span className="text-xs font-mono text-text-tertiary">
                  {poi.distanceFromTrainKm} km away
                </span>
              </div>

              <h3 className="text-base font-bold text-text-primary mb-1">{poi.name}</h3>
              <p className="text-xs text-text-secondary line-clamp-2 mb-3">{poi.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {poi.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-bg-surface text-text-secondary px-2 py-0.5 rounded-full border border-border-subtle"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
