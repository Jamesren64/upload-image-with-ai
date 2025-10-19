import { createTheme } from '@mui/material/styles';

// Custom theme with softer color theme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#3d6fa3', // Darker blue
      light: '#e3f2fd', // Very light blue for backgrounds
      contrastText: '#1e3a5f', // Dark blue for text
    },
    secondary: {
      main: '#7d5a8a', // Darker purple
      light: '#f3e5f5', // Very light purple
      contrastText: '#4a2c5f', // Dark purple for text
    },
    success: {
      main: '#66bb6a', // Softer green
      light: '#e8f5e9',
    },
    error: {
      main: '#ef5350', // Softer red
      light: '#ffebee',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
      disabled: '#90a4ae',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});
