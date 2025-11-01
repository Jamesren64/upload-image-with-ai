'use client';

import React from 'react';

/**
 * ApiKeyModal - No longer needed since API key is managed by backend
 * This component is kept for backwards compatibility but renders nothing
 * The backend handles OpenAI API keys via environment variables
 */
export default function ApiKeyModal() {
  // API key is now managed by the backend, so this modal is no longer needed
  // Returning null to prevent the modal from ever showing
  return null;
}
