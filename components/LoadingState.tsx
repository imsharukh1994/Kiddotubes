'use client';

import React from 'react';

interface LoadingStateProps {
  count?: number;
  title?: string;
}

export default function LoadingState({ count = 8, title }: LoadingStateProps) {
  return (
    <div className="my-6">
      {title && (
        <div className="h-8 w-64 bg-slate-200 rounded-xl animate-pulse mb-6" />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 p-4 shadow-sm space-y-3 animate-pulse"
          >
            <div className="w-full aspect-video bg-slate-200 rounded-2xl" />
            <div className="h-4 bg-slate-200 rounded-lg w-5/6" />
            <div className="h-3 bg-slate-200 rounded-lg w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
