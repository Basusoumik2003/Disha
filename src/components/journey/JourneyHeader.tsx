import React from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Map, 
  BarChart3, 
  CloudSun, 
  Compass, 
  RefreshCw,
  Star
} from 'lucide-react';
import { LiveTrainStatus } from '../../types';
import { useAppStore, ActiveTab } from '../../store/useAppStore';
import { Badge } from '../ui/Badge';
import { useFavorites } from '../../hooks/useFavorites';

interface JourneyHeaderProps {
  liveStatus: LiveTrainStatus | null;
  onBack: () => void;
}

export const JourneyHeader: React.FC<JourneyHeaderProps> = ({ liveStatus, onBack }) => {
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);
  const setShareModalOpen = useAppStore((state) => state.setShareModalOpen);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (!liveStatus) return null;

  const favorited = isFavorite(liveStatus.trainNumber);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(liveStatus.trainNumber);
    } else {
      addFavorite({
        trainNumber: liveStatus.trainNumber,
        trainName: liveStatus.trainName,
        origin: liveStatus.previousStation?.name || 'Origin',
        destination: liveStatus.nextStation?.name || 'Destination',
      });
    }
  };

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'map', label: 'Live Map', icon: <Map className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'weather', label: 'Weather', icon: <CloudSun className="w-4 h-4" /> },
    { id: 'companion', label: 'Companion', icon: <Compass className="w-4 h-4" /> },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-xl border-b border-border-subtle sticky top-0 z-30 px-4 py-3 shadow-card transition-all">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Main Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-bg-surface transition-colors"
              title="Back to Search"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm bg-blue-50 text-brand-blue px-2 py-0.5 rounded-md border border-blue-200/50">
                  {liveStatus.trainNumber}
                </span>
                <h1 className="font-semibold text-base sm:text-lg text-text-primary leading-tight">
                  {liveStatus.trainName}
                </h1>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-secondary mt-0.5">
                <span>{liveStatus.previousStation?.name || 'Origin'}</span>
                <span>→</span>
                <span>{liveStatus.nextStation?.name || 'Destination'}</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Badge
              variant={liveStatus.journeyStats.totalDelayMinutes > 15 ? 'delayed' : 'onTime'}
              size="sm"
            >
              {liveStatus.journeyStats.totalDelayMinutes === 0
                ? 'On Time'
                : `+${liveStatus.journeyStats.totalDelayMinutes} min`}
            </Badge>

            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full transition-colors ${
                favorited
                  ? 'text-amber-500 bg-amber-50'
                  : 'text-text-tertiary hover:text-text-secondary hover:bg-bg-surface'
              }`}
              title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Star className={`w-5 h-5 ${favorited ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="p-2 text-text-secondary hover:text-brand-blue rounded-full hover:bg-blue-50 transition-colors"
              title="Share Live Journey"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-brand-blue text-white shadow-card'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
