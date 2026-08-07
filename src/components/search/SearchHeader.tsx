import React, { useState, useEffect } from 'react';
import { Search, X, Train as TrainIcon, Sparkles } from 'lucide-react';
import { SearchSuggestion } from '../../types';
import { RailRadarService } from '../../services/railRadarService';
import { SuggestionList } from './SuggestionList';
import { useAppStore } from '../../store/useAppStore';

interface SearchHeaderProps {
  onSelectTrain: (trainNumber: string) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ onSelectTrain }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isSearchFocused = useAppStore((state) => state.isSearchFocused);
  const setSearchFocused = useAppStore((state) => state.setSearchFocused);

  // Debounced autocomplete search
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      const results = await RailRadarService.searchTrains(query);
      setSuggestions(results);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl mx-auto z-40">
      {/* Search Input Bar */}
      <div className="relative flex items-center bg-white/95 backdrop-blur-2xl rounded-full shadow-raised border border-border-subtle focus-within:border-brand-blue focus-within:ring-4 focus-within:ring-brand-blue/15 transition-all">
        <div className="pl-4 text-text-tertiary">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          placeholder="Search train by number or name (e.g. 12621 or Rajdhani)..."
          className="w-full py-4 px-3 bg-transparent text-sm sm:text-base font-medium text-text-primary placeholder:text-text-tertiary focus:outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1.5 mr-2 text-text-tertiary hover:text-text-primary rounded-full hover:bg-bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestion Dropdown List */}
      {isSearchFocused && query.length >= 2 && (
        <SuggestionList
          suggestions={suggestions}
          isLoading={isLoading}
          onSelect={(trainNum) => {
            onSelectTrain(trainNum);
            setQuery('');
            setSearchFocused(false);
          }}
        />
      )}
    </div>
  );
};
