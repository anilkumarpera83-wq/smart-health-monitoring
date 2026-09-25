import React from 'react';

export const SkeletonLoader: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-4 w-full animate-pulse p-4">
      <div className="h-6 bg-slate-200 rounded w-1/3"></div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
};
