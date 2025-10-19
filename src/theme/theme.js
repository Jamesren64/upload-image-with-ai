import { createTheme } from '@mui/material/styles';

// Custom theme with enhanced design system
export const theme = createTheme({
  palette: {
    primary: {
      main: '#3d6fa3', // Darker blue
      light: '#e3f2fd', // Very light blue for backgrounds
      lighter: '#f0f7ff', // Even lighter for subtle backgrounds
      contrastText: '#1e3a5f', // Dark blue for text
    },
    secondary: {
      main: '#7d5a8a', // Darker purple
      light: '#f3e5f5', // Very light purple
      lighter: '#faf7fc', // Even lighter for subtle backgrounds
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
    h4: {
      letterSpacing: '0.5px',
      fontWeight: 700,
    },
    h6: {
      letterSpacing: '0.3px',
      fontWeight: 600,
    },
    subtitle2: {
      letterSpacing: '0.2px',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.08)',
    '0 4px 8px rgba(0, 0, 0, 0.1)',
    '0 6px 12px rgba(0, 0, 0, 0.12)',
    '0 8px 16px rgba(0, 0, 0, 0.14)',
    '0 10px 20px rgba(0, 0, 0, 0.16)',
    ...Array(20)
      .fill(null)
      .map((_, i) => `0 ${10 + i * 2}px ${20 + i * 4}px rgba(0, 0, 0, ${0.15 + i * 0.01})`),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #3d6fa3 0%, #2a4f7f 100%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2a4f7f 0%, #1a3d5f 100%)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          },
        },
        outlined: {
          borderWidth: 2,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        colorPrimary: {
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f7ff 100%)',
          color: '#3d6fa3',
        },
      },
    },
  },
});
