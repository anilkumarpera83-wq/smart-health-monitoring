import React from 'react';
import { useOffline } from '../../context/OfflineContext';
import { Wifi, WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, drafts } = useOffline();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${
          isOnline
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="h-3.5 w-3.5 text-emerald-600" />
            <span>🟢 Online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3.5 w-3.5 text-amber-600" />
            <span>🟠 Offline Mode</span>
          </>
        )}
      </div>

      {drafts.length > 0 && (
        <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-amber-400">
          {drafts.length} Field Draft{drafts.length > 1 ? 's' : ''} Saved
        </span>
      )}
    </div>
  );
};
