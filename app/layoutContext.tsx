"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";

export interface LayoutOptions {
  title?: string;
  showBackButton?: boolean;
  featuredTag?: string; // New option for showing a feature tag below header
}

interface LayoutContextType {
  options: LayoutOptions;
  setOptions: (options: LayoutOptions) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<LayoutOptions>({
    title: undefined,
    showBackButton: true,
    featuredTag: undefined,
  });

  return (
    <ApiKeyProvider>
      <LayoutContext.Provider value={{ options, setOptions }}>
        {children}
      </LayoutContext.Provider>
    </ApiKeyProvider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
