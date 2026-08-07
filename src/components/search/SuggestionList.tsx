import React from 'react';
import { SearchSuggestion } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { Train, ArrowRight } from 'lucide-react';

interface SuggestionListProps {
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  onSelect: (trainNumber: string) => void;
}

export const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestions,
  isLoading,
  onSelect,
}) => {
  return (
    <div className="absolute left-0 right-0 top-full mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <GlassCard variant="elevated" className="p-2 overflow-hidden max-h-96 overflow-y-auto border-brand-blue/30">
        {isLoading ? (
          <div className="p-4 text-center text-xs text-text-secondary animate-pulse">
            Searching Indian Railways database...
          </div>
        ) : suggestions.length === 0 ? (
          <div className="p-4 text-center text-xs text-text-secondary">
            No trains found. Try searching by number like <span className="font-mono font-bold">12621</span> or <span className="font-bold">Rajdhani</span>.
          </div>
        ) : (
          <div className="space-y-1">
            {suggestions.map((item) => (
              <div
                key={item.trainNumber}
                onClick={() => onSelect(item.trainNumber)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/70 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-blue-50 text-brand-blue px-2 py-0.5 rounded border border-blue-200/50">
                        {item.trainNumber}
                      </span>
                      <h4 className="font-semibold text-sm text-text-primary group-hover:text-brand-blue transition-colors">
                        {item.trainName}
                      </h4>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {item.origin} → {item.destination}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="onTime" size="sm">Live Track</Badge>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};
