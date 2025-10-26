'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const ApiKeyContext = createContext();

export function ApiKeyProvider({ children }) {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for API key in environment variables first
    const envKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (envKey) {
      setApiKey(envKey);
      setLoading(false);
    } else {
      // Check localStorage for user-provided key
      const storedKey = localStorage.getItem('openai_api_key');
      if (storedKey) {
        setApiKey(storedKey);
      }
      setLoading(false);
    }
  }, []);

  const setUserApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('openai_api_key', key);
    } else {
      localStorage.removeItem('openai_api_key');
    }
  };

  const clearApiKey = () => {
    setApiKey(null);
    localStorage.removeItem('openai_api_key');
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setUserApiKey, clearApiKey, loading }}>
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
