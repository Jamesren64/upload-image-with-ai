'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

/**
 * Confirmation dialog component for destructive actions
 */
export function ConfirmDialog({
  open = false,
  title = 'Confirm Action',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
