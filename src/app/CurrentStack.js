import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';

export default function CurrentStack({ rows }) {
  return (
    <Stack
      className="CURRENT_STACK"
      gap={2}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
      }}
    >
      {rows.length === 0 ? (
        <Stack
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%', height: '100%', color: 'gray' }}
        >
          <Typography variant="body1">No flashcards yet</Typography>
          <Typography variant="caption">Upload an image and add flashcards to see them here</Typography>
        </Stack>
      ) : (
        rows.map((row, index) => (
        <Box key={row[0]} sx={{ width: '100%' }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'bold' }}>
            Card {index + 1}
          </Typography>

          <Box
            sx={{
              border: 1,
              borderColor: 'gray',
              padding: 1,
              borderRadius: '8px',
              minHeight: { xs: '80px', md: '100px' },
              mb: 1,
              overflowY: 'auto',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Typography variant="body2">{row[0]}</Typography>
          </Box>

          <Box
            sx={{
              border: 1,
              borderColor: 'gray',
              padding: 1,
              borderRadius: '8px',
              minHeight: { xs: '80px', md: '100px' },
              overflowY: 'auto',
              backgroundColor: '#fafafa',
            }}
          >
            <Typography variant="body2">{row[1]}</Typography>
          </Box>
        </Box>
        ))
      )}
    </Stack>
  );
}