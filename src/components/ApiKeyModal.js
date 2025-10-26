'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
} from '@mui/material';
import { useApiKey } from '@/context/ApiKeyContext';

export default function ApiKeyModal() {
  const { apiKey, setUserApiKey } = useApiKey();
  const [localKey, setLocalKey] = useState('');
  const [error, setError] = useState('');

  const isOpen = !apiKey;

  const handleSave = () => {
    if (!localKey.trim()) {
      setError('API key cannot be empty');
      return;
    }

    if (!localKey.startsWith('sk-')) {
      setError('Invalid API key format. OpenAI keys start with "sk-"');
      return;
    }

    setUserApiKey(localKey);
    setError('');
    setLocalKey('');
  };

  const handleClose = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          OpenAI API Key Required
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="info">
            This app uses OpenAI's API to extract and translate text from images. You need to provide your own API key.
          </Alert>

          <Typography variant="body2" color="text.secondary">
            Don't have an API key?{' '}
            <Link
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ cursor: 'pointer' }}
            >
              Get one here
            </Link>
            {' '}(opens in new window)
          </Typography>

          <TextField
            fullWidth
            label="OpenAI API Key"
            type="password"
            placeholder="sk-..."
            value={localKey}
            onChange={(e) => {
              setLocalKey(e.target.value);
              setError('');
            }}
            error={!!error}
            helperText={error}
            variant="outlined"
            disabled={false}
          />

          <Typography variant="caption" color="text.secondary">
            Your API key is stored locally in your browser and is never sent to our servers. It's only used to communicate directly with OpenAI's API.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!localKey.trim()}
          fullWidth
        >
          Save API Key
        </Button>
      </DialogActions>
    </Dialog>
  );
}
