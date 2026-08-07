import React from 'react';
import { SearchHeader } from '../components/search/SearchHeader';
import { FavoritesRail } from '../components/search/FavoritesRail';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentSearches } from '../hooks/useRecentSearches';
import { GlassCard } from '../components/ui/GlassCard';
import { Train, Map, ShieldCheck, CloudSun, Mountain, History, Trash2, ArrowRight } from 'lucide-react';

interface LandingSearchPageProps {
  onSelectTrain: (trainNumber: string) => void;
}

export const LandingSearchPage: React.FC<LandingSearchPageProps> = ({ onSelectTrain }) => {
  const { favorites } = useFavorites();
  const { recents, removeRecent, clearRecents } = useRecentSearches();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-orange-50/20 px-4 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero Banner Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-brand-blue text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Train className="w-3.5 h-3.5" />
            <span>Next-Gen Rail Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-none">
            Track Every Train. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-brand-saffron">
              Experience India.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto">
            A premium real-time train companion featuring photorealistic interactive maps, live delay health scores, weather intelligence, and terrain elevation.
          </p>
        </div>

        {/* Hero Search Box */}
        <SearchHeader onSelectTrain={onSelectTrain} />

        {/* Saved Favorites Rail */}
        <FavoritesRail favorites={favorites} onSelectTrain={onSelectTrain} />

        {/* Recent Searches */}
        {recents.length > 0 && (
          <div className="w-full">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-text-tertiary" />
                <span>Recent Searches</span>
              </h3>
              <button
                onClick={clearRecents}
                className="text-xs text-text-tertiary hover:text-brand-red flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recents.map((r, idx) => (
                <GlassCard
                  key={idx}
                  variant="interactive"
                  onClick={() => onSelectTrain(r.trainNumber || r.query)}
                  className="p-3 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-bg-surface flex items-center justify-center text-text-secondary font-mono text-xs">
                      #{r.trainNumber || 'TR'}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-text-primary group-hover:text-brand-blue transition-colors">
                        {r.trainName || r.query}
                      </p>
                      <p className="text-[11px] text-text-tertiary font-mono">
                        {new Date(r.searchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-subtle">
          <GlassCard variant="default" className="p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-text-primary">Apple Maps UI</h4>
              <p className="text-[11px] text-text-secondary mt-0.5">Smooth animated train marker with route glow & 3D tilt controls.</p>
            </div>
          </GlassCard>

          <GlassCard variant="default" className="p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-saffron flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-text-primary">Health Score</h4>
              <p className="text-[11px] text-text-secondary mt-0.5">Composite metric combining speed consistency, delay trend & ETA accuracy.</p>
            </div>
          </GlassCard>

          <GlassCard variant="default" className="p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-text-primary">Route Topography</h4>
              <p className="text-[11px] text-text-secondary mt-0.5">Elevation profiles, mountain passes, rivers & landmark companion.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
