import React, { createContext, useContext, useState, useEffect } from 'react';

interface DraftCase {
  id: string;
  timestamp: string;
  type: 'HEALTH_CASE' | 'WATER_QUALITY';
  data: any;
}

interface OfflineContextType {
  isOnline: boolean;
  drafts: DraftCase[];
  saveDraft: (type: 'HEALTH_CASE' | 'WATER_QUALITY', data: any) => void;
  removeDraft: (id: string) => void;
  clearDrafts: () => void;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [drafts, setDrafts] = useState<DraftCase[]>(() => {
    const saved = localStorage.getItem('field_drafts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('field_drafts', JSON.stringify(drafts));
  }, [drafts]);

  const saveDraft = (type: 'HEALTH_CASE' | 'WATER_QUALITY', data: any) => {
    const newDraft: DraftCase = {
      id: 'draft-' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      data,
    };
    setDrafts((prev) => [newDraft, ...prev]);
  };

  const removeDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const clearDrafts = () => {
    setDrafts([]);
  };

  return (
    <OfflineContext.Provider value={{ isOnline, drafts, saveDraft, removeDraft, clearDrafts }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
