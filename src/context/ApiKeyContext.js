'use client';

import React, { createContext, useContext } from 'react';

const ApiKeyContext = createContext();

/**
 * ApiKeyProvider - Simplified version since API key is now managed by backend
 * This context is kept for backwards compatibility with existing components
 * but no longer manages OpenAI API keys
 */
export function ApiKeyProvider({ children }) {
  // Provide dummy values for backwards compatibility
  // API key is now handled by the backend via environment variables
  const contextValue = {
    apiKey: 'backend-managed', // Dummy value to prevent null checks from failing
    setUserApiKey: () => {}, // No-op
    clearApiKey: () => {}, // No-op
    loading: false, // Always loaded since no key management needed
  };

  return (
    <ApiKeyContext.Provider value={contextValue}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within ApiKeyProvider');
  }
  return context;
}
