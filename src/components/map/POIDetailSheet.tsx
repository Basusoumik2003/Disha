import React from 'react';
import { X, MapPin, Compass, Tag, ArrowRight } from 'lucide-react';
import { PointOfInterest } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

interface POIDetailSheetProps {
  poi: PointOfInterest | null;
  onClose: () => void;
}

export const POIDetailSheet: React.FC<POIDetailSheetProps> = ({ poi, onClose }) => {
  if (!poi) return null;

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 max-w-lg mx-auto transition-all animate-in slide-in-from-bottom duration-300">
      <GlassCard variant="elevated" className="p-5 relative border-brand-saffron/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-text-tertiary hover:text-text-primary rounded-full hover:bg-bg-surface transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-brand-saffron flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="saffron" size="sm" icon={<Compass className="w-3 h-3" />}>
                {poi.type.toUpperCase()}
              </Badge>
              <span className="text-xs font-mono text-text-secondary">
                {poi.distanceFromTrainKm} km from train
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary leading-snug">
              {poi.name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          {poi.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
          {poi.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-bg-surface text-text-secondary px-2.5 py-1 rounded-full border border-border-subtle"
            >
              #{tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
