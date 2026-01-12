'use client';

import { createContext, useContext, useState } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used inside LoadingProvider');
  return ctx;
}
