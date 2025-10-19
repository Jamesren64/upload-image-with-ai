'use client';

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Toast notification component for displaying temporary messages
 * Automatically closes after a set duration
 */
export function Toast({
  open = false,
  message = '',
  severity = 'info',
  duration = 3000,
  onClose = () => {},
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
