'use client';

import React from 'react';
import { Stack, Typography, Button, Alert } from '@mui/material';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Stack
          gap={2}
          padding={2}
          sx={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <Alert severity="error">
            <Typography variant="h6">Something went wrong</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              {this.state.error?.message ||
                'An unexpected error occurred. Please try again.'}
            </Typography>
          </Alert>
          <Button variant="contained" onClick={this.resetError}>
            Try Again
          </Button>
        </Stack>
      );
    }

    return this.props.children;
  }
}
