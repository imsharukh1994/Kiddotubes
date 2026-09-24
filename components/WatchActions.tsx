'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Share2, Check } from 'lucide-react';
import { VideoItem } from '@/types/youtube';
import { isFavorite, toggleFavorite } from '@/lib/storage';

interface WatchActionsProps {
  video: VideoItem;
}

export default function WatchActions({ video }: WatchActionsProps) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setFavorite(isFavorite(video.id));
    const handleStorageUpdate = () => {
      setFavorite(isFavorite(video.id));
    };
    window.addEventListener('kiddotube_favorites_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('kiddotube_favorites_updated', handleStorageUpdate);
    };
  }, [video.id]);

  const handleFavoriteToggle = () => {
    const newStatus = toggleFavorite(video);
    setFavorite(newStatus);
  };

  const handleShare = async () => {
    const shareData = {
      title: video.title,
      text: `Watch ${video.title} on KiddoTube!`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if share dialog was cancelled or unsupported
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Save / Favorite Button */}
      <button
        onClick={handleFavoriteToggle}
        type="button"
        aria-label={favorite ? 'Remove video from saved favorites' : 'Save video to favorites'}
        className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm ${
          favorite
            ? 'bg-rose-600 text-white border-rose-600 hover:bg-rose-700 shadow-rose-200'
            : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50'
        }`}
      >
        <Heart className={`w-4 h-4 transition-transform ${favorite ? 'fill-current scale-110' : ''}`} />
        <span>{favorite ? 'Saved to Favorites' : 'Save'}</span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        type="button"
        aria-label="Share video link"
        className="px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700">Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
}
