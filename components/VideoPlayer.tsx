'use client';

import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
}

export default function VideoPlayer({ videoId, title = 'KiddoTube Video Player' }: VideoPlayerProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <div className="relative w-full aspect-[16/9] max-h-[70vh] bg-slate-950 rounded-2xl overflow-hidden shadow-card border border-slate-800 flex items-center justify-center">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
