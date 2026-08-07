import { useState, useEffect, useCallback } from 'react';
import { FavoriteTrain } from '../types';

const STORAGE_KEY = 'bharat_rail_favorites';

const DEFAULT_FAVORITES: FavoriteTrain[] = [
  {
    trainNumber: '12621',
    trainName: 'Tamil Nadu Express',
    origin: 'Chennai Central',
    destination: 'New Delhi',
    savedAt: new Date().toISOString(),
  },
  {
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani Express',
    origin: 'Mumbai Central',
    destination: 'New Delhi',
    savedAt: new Date().toISOString(),
  },
  {
    trainNumber: '20901',
    trainName: 'Vande Bharat Express',
    origin: 'Mumbai Central',
    destination: 'Gandhinagar',
    savedAt: new Date().toISOString(),
  },
];

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteTrain[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_FAVORITES;
    } catch {
      return DEFAULT_FAVORITES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const addFavorite = useCallback((train: Omit<FavoriteTrain, 'savedAt'>) => {
    setFavorites((prev) => {
      const filtered = prev.filter((f) => f.trainNumber !== train.trainNumber);
      const newFav: FavoriteTrain = { ...train, savedAt: new Date().toISOString() };
      return [newFav, ...filtered].slice(0, 20); // max 20
    });
  }, []);

  const removeFavorite = useCallback((trainNumber: string) => {
    setFavorites((prev) => prev.filter((f) => f.trainNumber !== trainNumber));
  }, []);

  const isFavorite = useCallback(
    (trainNumber: string) => {
      return favorites.some((f) => f.trainNumber === trainNumber);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
