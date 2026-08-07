import React from 'react';
import { FavoriteTrain } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Star, Train, ArrowRight } from 'lucide-react';

interface FavoritesRailProps {
  favorites: FavoriteTrain[];
  onSelectTrain: (trainNumber: string) => void;
}

export const FavoritesRail: React.FC<FavoritesRailProps> = ({
  favorites,
  onSelectTrain,
}) => {
  if (favorites.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Favorite Trains</span>
        </h3>
        <span className="text-xs text-text-tertiary">{favorites.length} saved</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
        {favorites.map((fav) => (
          <GlassCard
            key={fav.trainNumber}
            variant="interactive"
            onClick={() => onSelectTrain(fav.trainNumber)}
            className="p-3.5 min-w-[240px] max-w-[260px] flex-shrink-0 border-l-4 border-l-brand-blue"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50">
                #{fav.trainNumber}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-text-tertiary group-hover:text-brand-blue" />
            </div>

            <h4 className="font-semibold text-sm text-text-primary truncate mb-1">
              {fav.trainName}
            </h4>

            <p className="text-xs text-text-secondary truncate">
              {fav.origin} → {fav.destination}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
