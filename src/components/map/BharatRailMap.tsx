import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { LiveTrainStatus, RouteStation, StationStatus, PointOfInterest } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface BharatRailMapProps {
  liveStatus: LiveTrainStatus | null;
  stations: (RouteStation | StationStatus)[];
  pois: PointOfInterest[];
  onSelectPoi: (poi: PointOfInterest) => void;
}

export const BharatRailMap: React.FC<BharatRailMapProps> = ({
  liveStatus,
  stations,
  pois,
  onSelectPoi,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const trainMarkerRef = useRef<maplibregl.Marker | null>(null);

  const mapFollowTrain = useAppStore((state) => state.mapFollowTrain);
  const mapPitch = useAppStore((state) => state.mapPitch);
  const poiLayerVisible = useAppStore((state) => state.poiLayerVisible);

  // Initialize MapLibre GL instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const maptilerKey = import.meta.env.VITE_MAPTILER_API_KEY || '';
    const mapStyle = maptilerKey
      ? `https://api.maptiler.com/maps/dataviz-light/style.json?key=${maptilerKey}`
      : {
          version: 8 as const,
          sources: {
            'carto-light': {
              type: 'raster' as const,
              tiles: [
                'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
                'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
                'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
              ],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap &copy; CARTO',
            },
          },
          layers: [
            {
              id: 'carto-light-layer',
              type: 'raster' as const,
              source: 'carto-light',
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [78.9629, 20.5937], // Center of India
      zoom: 5.5,
      pitch: mapPitch,
      bearing: 0,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: false }), 'bottom-right');

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map pitch dynamically
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.easeTo({ pitch: mapPitch, duration: 600 });
    }
  }, [mapPitch]);

  // Render station coordinates, route polyline, and animated train marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || stations.length === 0 || !liveStatus) return;

    const coordinates = stations.map((s) => [s.lon, s.lat]);

    // Create GeoJSON route source if not exists
    const onMapLoad = () => {
      if (!map.getSource('route-line')) {
        map.addSource('route-line', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates,
            },
            properties: {},
          },
        });

        // Remaining Route layer (Muted Grey Dashed)
        map.addLayer({
          id: 'route-remaining',
          type: 'line',
          source: 'route-line',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#94a3b8',
            'line-width': 4,
            'line-dasharray': [2, 2],
          },
        });

        // Completed Route layer (Glowing Saffron / Amber)
        map.addSource('route-completed', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordinates.slice(
                0,
                Math.max(2, Math.floor(coordinates.length * (liveStatus.journeyStats.completionPercentage / 100)))
              ),
            },
            properties: {},
          },
        });

        map.addLayer({
          id: 'route-completed-glow',
          type: 'line',
          source: 'route-completed',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#FF6B00',
            'line-width': 10,
            'line-blur': 6,
            'line-opacity': 0.6,
          },
        });

        map.addLayer({
          id: 'route-completed-line',
          type: 'line',
          source: 'route-completed',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#FF6B00',
            'line-width': 4.5,
          },
        });
      } else {
        // Update line coordinates
        const compSource = map.getSource('route-completed') as maplibregl.GeoJSONSource;
        if (compSource) {
          const count = Math.max(2, Math.floor(coordinates.length * (liveStatus.journeyStats.completionPercentage / 100)));
          compSource.setData({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordinates.slice(0, count),
            },
            properties: {},
          });
        }
      }
    };

    if (map.isStyleLoaded()) {
      onMapLoad();
    } else {
      map.once('load', onMapLoad);
    }
  }, [stations, liveStatus?.journeyStats.completionPercentage]);

  // Train marker update & Camera Follow
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !liveStatus) return;

    const { latitude, longitude, bearingDegrees } = liveStatus.position;

    if (!trainMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'relative flex items-center justify-center cursor-pointer';
      el.innerHTML = `
        <div class="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping"></div>
        <div class="w-10 h-10 bg-brand-blue border-2 border-white rounded-full shadow-lg flex items-center justify-center text-white transform transition-transform duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2c-4 0-8 2-8 6v8c0 2 2 4 4 4h8c2 0 4-2 4-4V8c0-4-4-6-8-6z"/>
            <path d="M4 11h16"/>
            <path d="M8 15h.01"/>
            <path d="M16 15h.01"/>
          </svg>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .addTo(map);

      trainMarkerRef.current = marker;
    } else {
      trainMarkerRef.current.setLngLat([longitude, latitude]);
    }

    // Camera follow train if enabled
    if (mapFollowTrain) {
      map.easeTo({
        center: [longitude, latitude],
        zoom: Math.max(map.getZoom(), 8.5),
        bearing: bearingDegrees,
        duration: 800,
      });
    }
  }, [liveStatus?.position, mapFollowTrain]);

  // POI Layer markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers: maplibregl.Marker[] = [];

    if (poiLayerVisible && pois.length > 0) {
      pois.forEach((poi) => {
        const el = document.createElement('div');
        el.className = 'group cursor-pointer flex flex-col items-center';
        el.innerHTML = `
          <div class="px-2 py-1 bg-white/95 backdrop-blur-md text-[11px] font-semibold text-text-primary rounded-full shadow-md border border-border-subtle group-hover:scale-105 transition-transform flex items-center gap-1">
            <span>📍</span>
            <span>${poi.name}</span>
          </div>
        `;
        el.addEventListener('click', () => onSelectPoi(poi));

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([poi.lon, poi.lat])
          .addTo(map);

        markers.push(marker);
      });
    }

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [pois, poiLayerVisible, onSelectPoi]);

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden rounded-3xl">
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
