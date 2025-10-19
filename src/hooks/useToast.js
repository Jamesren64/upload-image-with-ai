import { useState } from 'react';

/**
 * Custom hook for managing toast notifications
 */
export function useToast() {
  const [toastState, setToastState] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showToast = (message, severity = 'info', duration = 3000) => {
    setToastState({
      open: true,
      message,
      severity,
    });

    // Auto-close after duration
    const timer = setTimeout(() => {
      setToastState((prev) => ({ ...prev, open: false }));
    }, duration);

    return timer;
  };

  const closeToast = () => {
    setToastState((prev) => ({ ...prev, open: false }));
  };

  const showSuccess = (message, duration = 3000) => {
    showToast(message, 'success', duration);
  };

  const showError = (message, duration = 5000) => {
    showToast(message, 'error', duration);
  };

  const showInfo = (message, duration = 3000) => {
    showToast(message, 'info', duration);
  };

  const showWarning = (message, duration = 4000) => {
    showToast(message, 'warning', duration);
  };

  return {
    toastState,
    showToast,
    closeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
