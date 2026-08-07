import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { GlassCard } from '../components/ui/GlassCard';
import { Star, Train, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

interface FavoritesPageProps {
  onSelectTrain: (trainNumber: string) => void;
  onBack: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onSelectTrain, onBack }) => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-bg-surface p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span>Saved Favorite Trains</span>
            </h1>
            <p className="text-xs text-text-secondary">Quick access to your most frequent routes</p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <GlassCard variant="default" className="p-8 text-center">
            <Train className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
            <h3 className="font-semibold text-text-primary text-base">No Saved Favorites</h3>
            <p className="text-xs text-text-secondary mt-1">Tap the star icon on any train journey to save it here for quick tracking.</p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav) => (
              <GlassCard
                key={fav.trainNumber}
                variant="interactive"
                onClick={() => onSelectTrain(fav.trainNumber)}
                className="p-4 flex items-center justify-between group border-l-4 border-l-brand-blue"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-mono font-bold text-sm">
                    #{fav.trainNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-primary group-hover:text-brand-blue transition-colors">
                      {fav.trainName}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {fav.origin} → {fav.destination}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(fav.trainNumber);
                    }}
                    className="p-2 text-text-tertiary hover:text-brand-red rounded-full hover:bg-red-50 transition-colors"
                    title="Remove Favorite"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
