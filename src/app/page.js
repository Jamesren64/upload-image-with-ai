'use client'

import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, Alert, Container, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UploadImage from './UploadImage';
import CurrentStack from './CurrentStack';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useFlashcardCollection } from '@/hooks/useFlashcardCollection';
import { useToast } from '@/hooks/useToast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toast } from '@/components/Toast';
import { ConfirmDialog } from '@/components/ConfirmDialog';

export default function Home() {
  const { images, setImages, text, translatedText, isLoading, error, setError } = useImageUpload();
  const { rows, addFlashcard, exportToTSV, clearFlashcards } = useFlashcardCollection();
  const { toastState, closeToast, showSuccess, showError, showWarning } = useToast();

  const [localError, setLocalError] = React.useState(null);
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [exportFilename, setExportFilename] = React.useState('my_data');
  const [confirmClearOpen, setConfirmClearOpen] = React.useState(false);

  const handleAddFlashcards = () => {
    try {
      if (!text || !translatedText) {
        showWarning('Please upload an image first');
        return;
      }
      addFlashcard(translatedText, text);
      setLocalError(null);
      showSuccess('Flashcard added successfully!');
    } catch (err) {
      setLocalError(err.message);
      showError(err.message);
      console.error('Error adding flashcard:', err);
    }
  };

  const handleExportClick = () => {
    setExportDialogOpen(true);
  };

  const handleExportConfirm = () => {
    try {
      const filename = exportFilename.trim() || 'my_data';
      exportToTSV(`${filename}.tsv`);
      setLocalError(null);
      setExportDialogOpen(false);
      setExportFilename('my_data');
      showSuccess('Flashcards exported successfully!');
    } catch (err) {
      setLocalError(err.message);
      showError(err.message);
      console.error('Error exporting flashcards:', err);
    }
  };

  const handleExportCancel = () => {
    setExportDialogOpen(false);
  };

  const handleClearClick = () => {
    setConfirmClearOpen(true);
  };

  const handleClearConfirm = () => {
    clearFlashcards();
    setConfirmClearOpen(false);
    showWarning('All flashcards cleared');
  };

  const handleClearCancel = () => {
    setConfirmClearOpen(false);
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack gap={3}>
          {/* Header */}
          <Stack alignItems={'center'} textAlign={'center'}>
            <Typography variant="h4" marginTop={1} gutterBottom>
              Flashcard Generator
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Upload an image to translate and make into a flashcard.
            </Typography>
          </Stack>

          {/* Display errors */}
          {(error || localError) && (
            <Alert severity="error" sx={{ margin: '0 auto', maxWidth: '100%' }}>
              {error || localError}
            </Alert>
          )}

          {/* Main content - Responsive Grid */}
          <Stack
            className="OUTER_DIV"
            gap={{ xs: 2, md: 4 }}
            justifyContent={'center'}
            alignItems={{ xs: 'stretch', md: 'center' }}
            flexDirection={{ xs: 'column', md: 'row' }}
            sx={{ minHeight: '70vh' }}
          >
            {/* Upload section */}
            <Box
              className="OUTER_STACK1"
              sx={{
                flex: { xs: 1, md: '0 0 50%' },
                minHeight: { xs: 'auto', md: '600px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UploadImage
                images={images}
                setImages={setImages}
                addFlashcards={handleAddFlashcards}
                text={text}
                translatedText={translatedText}
                isLoading={isLoading}
              />
            </Box>

            {/* Flashcard stack section */}
            <Stack
              className="OUTER_STACK2"
              gap={2}
              sx={{
                flex: { xs: 1, md: '0 0 50%' },
                minHeight: { xs: 'auto', md: '600px' },
              }}
            >
              <Stack
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  minHeight: { xs: '300px', md: '500px' },
                  justifyContent: rows.length === 0 ? 'center' : 'flex-start',
                  alignItems: 'center',
                }}
              >
                <CurrentStack rows={rows} />
              </Stack>

              {/* Action buttons */}
              <Stack
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={2}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ flexWrap: 'wrap' }}
              >
                <Button
                  sx={{ width: { xs: '100%', sm: 200 } }}
                  variant="contained"
                  onClick={handleExportClick}
                  disabled={rows.length === 0}
                >
                  Export To CSV
                </Button>
                <Button
                  sx={{ width: { xs: '100%', sm: 200 } }}
                  variant="outlined"
                  color="error"
                  onClick={handleClearClick}
                  disabled={rows.length === 0}
                >
                  Clear All
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Export Filename Dialog */}
        <Dialog open={exportDialogOpen} onClose={handleExportCancel}>
          <DialogTitle>Export Flashcards</DialogTitle>
          <DialogContent sx={{ minWidth: '400px' }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter a filename for your flashcard export:
            </Typography>
            <TextField
              autoFocus
              fullWidth
              label="Filename"
              value={exportFilename}
              onChange={(e) => setExportFilename(e.target.value)}
              variant="outlined"
              placeholder="my_data"
              helperText="The .tsv extension will be added automatically"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleExportCancel}>Cancel</Button>
            <Button
              onClick={handleExportConfirm}
              variant="contained"
            >
              Export
            </Button>
          </DialogActions>
        </Dialog>

        {/* Clear Confirmation Dialog */}
        <ConfirmDialog
          open={confirmClearOpen}
          title="Clear All Flashcards?"
          message="This action will delete all flashcards. This cannot be undone."
          confirmText="Clear"
          cancelText="Cancel"
          onConfirm={handleClearConfirm}
          onCancel={handleClearCancel}
        />

        {/* Toast Notifications */}
        <Toast
          open={toastState.open}
          message={toastState.message}
          severity={toastState.severity}
          onClose={closeToast}
        />
      </Container>
    </ErrorBoundary>
  );
}