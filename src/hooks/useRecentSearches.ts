import { useState, useEffect, useCallback } from 'react';
import { RecentSearch } from '../types';

const STORAGE_KEY = 'bharat_rail_recents';

const DEFAULT_RECENTS: RecentSearch[] = [
  { query: '12621', trainNumber: '12621', trainName: 'Tamil Nadu Express', searchedAt: new Date().toISOString() },
  { query: 'Rajdhani', trainNumber: '12951', trainName: 'Mumbai Rajdhani', searchedAt: new Date().toISOString() },
  { query: 'Vande Bharat', trainNumber: '20901', trainName: 'Vande Bharat Express', searchedAt: new Date().toISOString() }
];

export function useRecentSearches() {
  const [recents, setRecents] = useState<RecentSearch[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_RECENTS;
    } catch {
      return DEFAULT_RECENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recents));
    } catch (e) {
      console.error('Failed to save recents to localStorage', e);
    }
  }, [recents]);

  const addRecent = useCallback((search: Omit<RecentSearch, 'searchedAt'>) => {
    setRecents((prev) => {
      const filtered = prev.filter(
        (r) => (r.trainNumber && r.trainNumber === search.trainNumber) || r.query.toLowerCase() === search.query.toLowerCase()
      );
      const newRecent: RecentSearch = { ...search, searchedAt: new Date().toISOString() };
      return [newRecent, ...filtered].slice(0, 10);
    });
  }, []);

  const removeRecent = useCallback((queryOrNumber: string) => {
    setRecents((prev) => prev.filter((r) => r.query !== queryOrNumber && r.trainNumber !== queryOrNumber));
  }, []);

  const clearRecents = useCallback(() => {
    setRecents([]);
  }, []);

  return { recents, addRecent, removeRecent, clearRecents };
}
