import React, { useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { useRecentSearches } from './hooks/useRecentSearches';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { LandingSearchPage } from './pages/LandingSearchPage';
import { LiveJourneyPage } from './pages/LiveJourneyPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { Train, Star, Settings, Search, WifiOff } from 'lucide-react';

type AppView = 'landing' | 'journey' | 'favorites' | 'settings';

export const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const activeTrainNumber = useAppStore((state) => state.activeTrainNumber);
  const setActiveTrainNumber = useAppStore((state) => state.setActiveTrainNumber);

  const isOnline = useOnlineStatus();
  const { addRecent } = useRecentSearches();

  const handleSelectTrain = (trainNum: string) => {
    setActiveTrainNumber(trainNum);
    addRecent({ query: trainNum, trainNumber: trainNum });
    setView('journey');
  };

  return (
    <div className="min-h-screen bg-bg-primary font-sans text-text-primary flex flex-col">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-white px-4 py-1.5 text-xs font-semibold text-center flex items-center justify-center gap-2 z-50 animate-in fade-in">
          <WifiOff className="w-4 h-4" />
          <span>You're Offline — Showing Last Cached Train Telemetry</span>
        </div>
      )}
      {/* Top Floating App Navbar */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-border-subtle sticky top-0 z-40 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            onClick={() => setView('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-card group-hover:scale-105 transition-transform">
              <Train className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-text-primary group-hover:text-brand-blue transition-colors">
              Bharat Rail
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setView('landing')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                view === 'landing' ? 'bg-blue-50 text-brand-blue' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              onClick={() => setView('favorites')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                view === 'favorites' ? 'bg-amber-50 text-amber-700' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Favorites</span>
            </button>

            <button
              onClick={() => setView('settings')}
              className={`p-2 rounded-full text-xs font-semibold transition-colors ${
                view === 'settings' ? 'bg-bg-surface text-brand-blue' : 'text-text-secondary hover:text-text-primary'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main View Router */}
      <div className="flex-1">
        {view === 'landing' && (
          <LandingSearchPage onSelectTrain={handleSelectTrain} />
        )}

        {view === 'journey' && (
          <LiveJourneyPage
            trainNumber={activeTrainNumber}
            onBackToSearch={() => setView('landing')}
          />
        )}

        {view === 'favorites' && (
          <FavoritesPage
            onSelectTrain={handleSelectTrain}
            onBack={() => setView('landing')}
          />
        )}

        {view === 'settings' && (
          <SettingsPage onBack={() => setView('landing')} />
        )}
      </div>
    </div>
  );
};

export default App;
