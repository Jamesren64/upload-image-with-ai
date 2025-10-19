'use client'

import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, Alert } from '@mui/material';
import UploadImage from './UploadImage';
import CurrentStack from './CurrentStack';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useFlashcardCollection } from '@/hooks/useFlashcardCollection';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  const { images, setImages, text, translatedText, isLoading, error, setError } = useImageUpload();
  const { rows, addFlashcard, exportToTSV, clearFlashcards } = useFlashcardCollection();
  const [localError, setLocalError] = React.useState(null);

  const handleAddFlashcards = () => {
    try {
      if (!text || !translatedText) {
        throw new Error('Please upload an image first');
      }
      addFlashcard(translatedText, text);
      setLocalError(null);
    } catch (err) {
      setLocalError(err.message);
      console.error('Error adding flashcard:', err);
    }
  };

  const handleExport = () => {
    try {
      exportToTSV('my_data.tsv');
      setLocalError(null);
    } catch (err) {
      setLocalError(err.message);
      console.error('Error exporting flashcards:', err);
    }
  };

  return (
    <ErrorBoundary>
      <Stack gap={2}>
        <Stack alignItems={'center'}>
          <Typography variant="h4" marginTop={1}>
            Flashcard Generator
          </Typography>
          <Typography variant="body1">
            Upload an image to translate and make into a flashcard.
          </Typography>
        </Stack>

        {/* Display errors */}
        {(error || localError) && (
          <Alert severity="error" sx={{ margin: '0 auto', maxWidth: '600px' }}>
            {error || localError}
          </Alert>
        )}

        {/* Main content */}
        <Stack
          className="OUTER_DIV"
          gap={15}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'row'}
          height={'100%'}
        >
          <Stack
            className="OUTER_STACK1"
            flexDirection={'column'}
            width={'50%'}
            gap={4}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <UploadImage
              images={images}
              setImages={setImages}
              addFlashcards={handleAddFlashcards}
              text={text}
              translatedText={translatedText}
              isLoading={isLoading}
            />
          </Stack>

          <Stack className="OUTER_STACK2">
            <Stack
              height={547.5}
              justifyContent={'flex-start'}
              alignItems={'center'}
            >
              <CurrentStack rows={rows} />
            </Stack>

            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ minHeight: '100%' }}
            >
              <Button
                sx={{ width: 200, marginTop: 3 }}
                variant="contained"
                onClick={handleExport}
                disabled={rows.length === 0}
              >
                Export To CSV
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
}