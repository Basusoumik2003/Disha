import { create } from 'zustand';
import { UserSettings } from '../types';

export type ActiveTab = 'map' | 'analytics' | 'weather' | 'companion';

interface AppStoreState {
  // Active Journey state
  activeTrainNumber: string;
  setActiveTrainNumber: (trainNumber: string) => void;

  // Active View Tab
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Map Controls State
  mapFollowTrain: boolean;
  setMapFollowTrain: (follow: boolean) => void;
  toggleMapFollowTrain: () => void;

  mapPitch: number;
  setMapPitch: (pitch: number) => void;
  toggle3DPitch: () => void;

  poiLayerVisible: boolean;
  togglePOILayer: () => void;

  selectedPoiId: string | null;
  setSelectedPoiId: (poiId: string | null) => void;

  // Modals & UI Flags
  isShareModalOpen: boolean;
  setShareModalOpen: (open: boolean) => void;

  isSearchFocused: boolean;
  setSearchFocused: (focused: boolean) => void;

  // User Settings
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  activeTrainNumber: '12621', // Default: Tamil Nadu Express
  setActiveTrainNumber: (trainNumber) => set({ activeTrainNumber: trainNumber }),

  activeTab: 'map',
  setActiveTab: (tab) => set({ activeTab: tab }),

  mapFollowTrain: true,
  setMapFollowTrain: (follow) => set({ mapFollowTrain: follow }),
  toggleMapFollowTrain: () => set((state) => ({ mapFollowTrain: !state.mapFollowTrain })),

  mapPitch: 0,
  setMapPitch: (pitch) => set({ mapPitch: pitch }),
  toggle3DPitch: () => set((state) => ({ mapPitch: state.mapPitch === 0 ? 55 : 0 })),

  poiLayerVisible: true,
  togglePOILayer: () => set((state) => ({ poiLayerVisible: !state.poiLayerVisible })),

  selectedPoiId: null,
  setSelectedPoiId: (poiId) => set({ selectedPoiId: poiId }),

  isShareModalOpen: false,
  setShareModalOpen: (open) => set({ isShareModalOpen: open }),

  isSearchFocused: false,
  setSearchFocused: (focused) => set({ isSearchFocused: focused }),

  settings: {
    autoRefreshIntervalSeconds: 30,
    distanceUnit: 'km',
    temperatureUnit: 'C',
    reducedMotion: false,
    theme: 'white',
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));
