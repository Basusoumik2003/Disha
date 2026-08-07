import React, { useState } from 'react';
import { X, Copy, Check, Share2, Smartphone } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { GlassCard } from '../ui/GlassCard';

export const ShareModal: React.FC = () => {
  const isOpen = useAppStore((state) => state.isShareModalOpen);
  const setOpen = useAppStore((state) => state.setShareModalOpen);
  const activeTrainNumber = useAppStore((state) => state.activeTrainNumber);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/#journey-${activeTrainNumber}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Track Train #${activeTrainNumber} on Bharat Rail`,
          text: `Follow live location, delay status, weather and analytics for Train #${activeTrainNumber} on Bharat Rail.`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <GlassCard variant="elevated" className="w-full max-w-md p-6 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-text-tertiary hover:text-text-primary rounded-full hover:bg-bg-surface transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Share Live Journey Link
        </h3>
        <p className="text-xs text-text-secondary mb-5">
          Send a direct live-tracking link to family & friends. Anyone with the link can follow the live train location without logging in.
        </p>

        <div className="flex items-center gap-2 p-2 bg-bg-surface rounded-xl border border-border-subtle mb-4">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent text-xs font-mono text-text-secondary px-2 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-text-primary font-medium text-xs rounded-lg border border-border-subtle shadow-sm hover:bg-bg-surface transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full py-3 bg-brand-blue text-white font-medium text-sm rounded-xl shadow-card hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            <span>Share via Phone Apps</span>
          </button>
        )}
      </GlassCard>
    </div>
  );
};
