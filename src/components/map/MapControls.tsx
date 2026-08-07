import React from 'react';
import { 
  Navigation, 
  Eye, 
  MapPin, 
  Box, 
  Compass 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MapControls: React.FC = () => {
  const mapFollowTrain = useAppStore((state) => state.mapFollowTrain);
  const toggleMapFollowTrain = useAppStore((state) => state.toggleMapFollowTrain);

  const mapPitch = useAppStore((state) => state.mapPitch);
  const toggle3DPitch = useAppStore((state) => state.toggle3DPitch);

  const poiLayerVisible = useAppStore((state) => state.poiLayerVisible);
  const togglePOILayer = useAppStore((state) => state.togglePOILayer);

  return (
    <div className="absolute right-4 top-20 sm:top-24 z-20 flex flex-col gap-2">
      {/* Camera Follow Toggle */}
      <button
        onClick={toggleMapFollowTrain}
        title={mapFollowTrain ? 'Camera Following Train' : 'Enable Camera Follow'}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-raised glass-panel ${
          mapFollowTrain
            ? 'bg-brand-blue text-white ring-2 ring-brand-blue/30'
            : 'bg-white/90 text-text-secondary hover:text-text-primary'
        }`}
      >
        <Navigation className={`w-5 h-5 ${mapFollowTrain ? 'rotate-45' : ''}`} />
      </button>

      {/* 3D Tilt Pitch Toggle */}
      <button
        onClick={toggle3DPitch}
        title={mapPitch > 0 ? 'Switch to 2D Top View' : 'Switch to 3D Tilt View'}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-raised glass-panel ${
          mapPitch > 0
            ? 'bg-brand-blue text-white ring-2 ring-brand-blue/30'
            : 'bg-white/90 text-text-secondary hover:text-text-primary'
        }`}
      >
        <Box className="w-5 h-5" />
      </button>

      {/* POI Layer Toggle */}
      <button
        onClick={togglePOILayer}
        title={poiLayerVisible ? 'Hide Along-Route POIs' : 'Show Along-Route POIs'}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-raised glass-panel ${
          poiLayerVisible
            ? 'bg-brand-saffron text-white ring-2 ring-brand-saffron/30'
            : 'bg-white/90 text-text-secondary hover:text-text-primary'
        }`}
      >
        <MapPin className="w-5 h-5" />
      </button>
    </div>
  );
};
