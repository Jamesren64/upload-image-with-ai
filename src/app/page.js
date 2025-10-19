'use client'

import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, Alert, Container, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Badge, RadioGroup, FormControlLabel, Radio, Card } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import StyleIcon from '@mui/icons-material/Style';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import UploadImage from './UploadImage';
import CurrentStack from './CurrentStack';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useFlashcardCollection } from '@/hooks/useFlashcardCollection';
import { useToast } from '@/hooks/useToast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toast } from '@/components/Toast';
import { ConfirmDialog } from '@/components/ConfirmDialog';

const EXPORT_FORMATS = [
  {
    id: 'tsv',
    name: 'TSV',
    extension: '.tsv',
  },
  {
    id: 'csv',
    name: 'CSV',
    extension: '.csv',
  },
  {
    id: 'json',
    name: 'JSON',
    extension: '.json',
  },
];

export default function Home() {
  const { images, setImages, text, translatedText, isLoading, error, setError } = useImageUpload();
  const { rows, addFlashcard, updateFlashcard, exportToTSV, exportToCSV, exportToJSON, clearFlashcards } = useFlashcardCollection();
  const { toastState, closeToast, showSuccess, showError, showWarning } = useToast();

  const [localError, setLocalError] = React.useState(null);
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [exportFilename, setExportFilename] = React.useState('my_data');
  const [selectedFormat, setSelectedFormat] = React.useState('tsv');
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
      const format = EXPORT_FORMATS.find((f) => f.id === selectedFormat);
      const fullFilename = `${filename}${format.extension}`;

      const exportFunctions = {
        tsv: exportToTSV,
        csv: exportToCSV,
        json: exportToJSON,
      };

      exportFunctions[selectedFormat](fullFilename);
      setLocalError(null);
      setExportDialogOpen(false);
      setExportFilename('my_data');
      setSelectedFormat('tsv');
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

  const handleUpdateFlashcard = (index, translatedText, originalText) => {
    try {
      updateFlashcard(index, translatedText, originalText);
      showSuccess('Flashcard updated successfully!');
    } catch (err) {
      showError(err.message);
      console.error('Error updating flashcard:', err);
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack gap={4}>
          {/* Enhanced Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #f0f7ff 0%, #faf7fc 100%)',
              borderRadius: 3,
              p: 4,
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(61, 111, 163, 0.08)',
              border: '1px solid rgba(61, 111, 163, 0.1)',
            }}
          >
            <Stack alignItems={'center'} gap={2}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <StyleIcon
                  sx={{
                    fontSize: 40,
                    color: 'primary.main',
                  }}
                />
                <Typography variant="h4" sx={{ letterSpacing: '0.5px' }}>
                  Flashcard Generator
                </Typography>
              </Box>
              <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 500 }}>
                Upload an image to extract text, translate it, and create beautiful flashcards for language learning.
              </Typography>
            </Stack>
          </Box>

          {/* Display errors */}
          {(error || localError) && (
            <Alert severity="error" sx={{ margin: '0 auto', maxWidth: '100%' }}>
              {error || localError}
            </Alert>
          )}

          {/* Main content - Responsive Grid */}
          <Stack
            className="OUTER_DIV"
            gap={{ xs: 3, md: 4 }}
            justifyContent={'flex-start'}
            alignItems={{ xs: 'stretch', md: 'flex-start' }}
            flexDirection={{ xs: 'column', md: 'row' }}
            sx={{ minHeight: '70vh' }}
          >
            {/* Upload section with card styling */}
            <Box
              className="OUTER_STACK1"
              sx={{
                flex: { xs: 1, md: 1 },
                maxWidth: { md: '50%' },
                width: '100%',
                minHeight: { xs: 'auto', md: '600px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
                borderRadius: 3,
                p: 3,
                boxShadow: '0 2px 8px rgba(61, 111, 163, 0.06)',
                border: '1px solid rgba(61, 111, 163, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(61, 111, 163, 0.1)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" gap={1.5} mb={2.5} width="100%">
                <CloudUploadIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ letterSpacing: '0.3px' }}>
                  Upload Image
                </Typography>
              </Stack>
              <UploadImage
                images={images}
                setImages={setImages}
                addFlashcards={handleAddFlashcards}
                text={text}
                translatedText={translatedText}
                isLoading={isLoading}
              />
            </Box>

            {/* Flashcard stack section with card styling */}
            <Stack
              className="OUTER_STACK2"
              gap={2.5}
              sx={{
                flex: { xs: 1, md: 1 },
                maxWidth: { md: '50%' },
                width: '100%',
                minHeight: { xs: 'auto', md: '600px' },
                background: 'linear-gradient(135deg, #ffffff 0%, #faf7fc 100%)',
                borderRadius: 3,
                p: 3,
                boxShadow: '0 2px 8px rgba(125, 90, 138, 0.06)',
                border: '1px solid rgba(125, 90, 138, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(125, 90, 138, 0.1)',
                },
              }}
            >
              {/* Card count header */}
              <Stack direction="row" alignItems="center" gap={1.5} justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <AutoStoriesIcon color="primary" sx={{ fontSize: 28 }} />
                  <Typography variant="h6" sx={{ letterSpacing: '0.3px' }}>
                    Your Flashcards
                  </Typography>
                </Stack>
                <Chip
                  label={`${rows.length} card${rows.length !== 1 ? 's' : ''}`}
                  color="primary"
                  sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}
                />
              </Stack>

              <Stack
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  minHeight: { xs: '300px', md: '450px' },
                  justifyContent: rows.length === 0 ? 'center' : 'flex-start',
                  alignItems: 'center',
                  borderRadius: 2,
                  p: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(61, 111, 163, 0.05)',
                  transition: 'all 0.3s ease',
                }}
              >
                <CurrentStack rows={rows} onUpdateFlashcard={handleUpdateFlashcard} />
              </Stack>

              {/* Action buttons with enhanced styling */}
              <Stack
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={2}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ flexWrap: 'wrap', pt: 1 }}
              >
                <Button
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: 160,
                    background: 'linear-gradient(135deg, #3d6fa3 0%, #2a4f7f 100%)',
                    boxShadow: '0 4px 8px rgba(61, 111, 163, 0.2)',
                  }}
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleExportClick}
                  disabled={rows.length === 0}
                  size="large"
                >
                  Export
                </Button>
                <Button
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: 160,
                  }}
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteSweepIcon />}
                  onClick={handleClearClick}
                  disabled={rows.length === 0}
                  size="large"
                >
                  Clear All
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Export Dialog with Format Options */}
        <Dialog open={exportDialogOpen} onClose={handleExportCancel} maxWidth="xs" fullWidth>
          <DialogTitle>Export Flashcards</DialogTitle>
          <DialogContent sx={{ pt: 2, overflow: 'visible' }}>
            {/* Filename Input */}
            <Stack gap={2}>
              <TextField
                autoFocus
                fullWidth
                label="Filename"
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value)}
                variant="outlined"
                placeholder="my_data"
                InputLabelProps={{ shrink: true }}
              />

              <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                File will be saved as: <strong>{exportFilename || 'my_data'}{EXPORT_FORMATS.find(f => f.id === selectedFormat)?.extension}</strong>
              </Typography>

              {/* Format Selection */}
              <Stack gap={1.5} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Select Export Format
                </Typography>
                <RadioGroup value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
                  <Stack gap={1}>
                    {EXPORT_FORMATS.map((format) => (
                      <Card
                        key={format.id}
                        sx={{
                          p: 1,
                          cursor: 'pointer',
                          border: selectedFormat === format.id ? 2 : 1,
                          borderColor: selectedFormat === format.id ? 'primary.main' : 'divider',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover',
                          },
                        }}
                        onClick={() => setSelectedFormat(format.id)}
                      >
                        <FormControlLabel
                          value={format.id}
                          control={<Radio />}
                          label={
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {format.name}
                            </Typography>
                          }
                          sx={{ width: '100%', m: 0 }}
                        />
                      </Card>
                    ))}
                  </Stack>
                </RadioGroup>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleExportCancel}>Cancel</Button>
            <Button onClick={handleExportConfirm} variant="contained" color="primary">
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