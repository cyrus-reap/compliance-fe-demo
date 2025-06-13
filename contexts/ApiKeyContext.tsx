/**
 * API Key Context - Manages user-provided API keys for compliance API calls
 *
 * Features:
 * - Toggle between system and user-provided API keys
 * - Session-only storage (no persistence)
 * - Security warnings for production keys
 * - Type-safe context with proper error handling
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

// API key configuration interface
export interface ApiKeyConfig {
  useCustomKey: boolean;
  customKey: string | null;
  isValid: boolean;
}

// Context type definition
interface ApiKeyContextType {
  config: ApiKeyConfig;
  setUseCustomKey: (use: boolean) => void;
  setCustomKey: (key: string) => void;
  clearCustomKey: () => void;
  getApiKey: () => string | undefined;
  validateKey: (key: string) => { isValid: boolean; warning?: string };
}

// Create the context
const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

// API key validation function
const validateApiKey = (
  key: string
): { isValid: boolean; warning?: string } => {
  // Basic validation - check if key exists and has reasonable length
  if (!key || key.trim().length < 10) {
    return { isValid: false };
  }

  // Warning for production-like keys (common patterns)
  const productionPatterns = [
    /prod/i,
    /live/i,
    /production/i,
    /pk_live/i,
    /sk_live/i,
  ];

  const hasProductionPattern = productionPatterns.some((pattern) =>
    pattern.test(key)
  );

  if (hasProductionPattern) {
    return {
      isValid: true,
      warning:
        "⚠️ This appears to be a production API key. Do not use your live production key here for security reasons.",
    };
  }

  return { isValid: true };
};

// Provider component
export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<ApiKeyConfig>({
    useCustomKey: false,
    customKey: null,
    isValid: false,
  });

  // Toggle between custom and system API key
  const setUseCustomKey = useCallback((use: boolean) => {
    setConfig((prev) => ({
      ...prev,
      useCustomKey: use,
      // If disabling custom key, clear the stored key for security
      customKey: use ? prev.customKey : null,
      isValid: use ? prev.isValid : true,
    }));
  }, []);

  // Set custom API key with validation
  const setCustomKey = useCallback((key: string) => {
    const validation = validateApiKey(key);
    setConfig((prev) => ({
      ...prev,
      customKey: key.trim(),
      isValid: validation.isValid,
    }));
  }, []);

  // Clear custom key (security measure)
  const clearCustomKey = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      customKey: null,
      isValid: false,
      useCustomKey: false,
    }));
  }, []);

  // Get the appropriate API key based on configuration
  const getApiKey = useCallback((): string | undefined => {
    if (config.useCustomKey && config.customKey && config.isValid) {
      return config.customKey;
    }
    // No fallback to system key on client side for security
    // System API key should only be used in server-side API routes
    return undefined;
  }, [config]);

  // Validate key function exposed to components
  const validateKey = useCallback((key: string) => {
    return validateApiKey(key);
  }, []);

  const contextValue: ApiKeyContextType = {
    config,
    setUseCustomKey,
    setCustomKey,
    clearCustomKey,
    getApiKey,
    validateKey,
  };

  return (
    <ApiKeyContext.Provider value={contextValue}>
      {children}
    </ApiKeyContext.Provider>
  );
};

// Custom hook to use the API key context
export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};
