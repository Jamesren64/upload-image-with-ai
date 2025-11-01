import * as React from 'react';
import ImageUploading from 'react-images-uploading';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, CircularProgress, Box, Chip, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

// Max images allowed per session
const MAX_IMAGES = 69;

export default function UploadImage({
  images,
  setImages,
  addFlashcards,
  text,
  translatedText,
  isLoading,
}) {
  console.log('[UploadImage] Component rendered, images.length:', images.length, 'isLoading:', isLoading);

  const onChange = (imageList) => {
    console.log('[UploadImage] onChange triggered');
    console.log('[UploadImage] imageList:', imageList);
    console.log('[UploadImage] imageList length:', imageList.length);
    if (imageList.length > 0) {
      console.log('[UploadImage] First image:', {
        fileName: imageList[0].file?.name,
        fileSize: imageList[0].file?.size,
        fileType: imageList[0].file?.type,
        hasDataUrl: !!imageList[0].data_url
      });
    }
    setImages(imageList);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={MAX_IMAGES}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => {
        console.log('[UploadImage] Render function called');
        console.log('[UploadImage] onImageUpload type:', typeof onImageUpload);
        console.log('[UploadImage] onImageUpload value:', onImageUpload);
        console.log('[UploadImage] isDragging:', isDragging);

        return (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          height={'100%'}
          gap={2}
        >
          <Stack className="CARDS" width={'100%'} gap={2}>
            {/* Image Upload Area */}
            <Box
              className="OUTER_STACK"
              sx={{
                width: '100%',
                minHeight: { xs: '200px', md: '300px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                border: isDragging ? '3px dashed' : '2px dashed',
                borderColor: isDragging ? 'primary.main' : 'divider',
                borderRadius: 2,
                bgcolor: isDragging ? 'primary.light' : 'background.paper',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                },
              }}
            >
              {isLoading && (
                <Stack
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', zIndex: 2 }}
                  gap={2}
                >
                  <CircularProgress size={50} />
                  <Typography variant="body2" color="primary">
                    Processing image...
                  </Typography>
                  <LinearProgress sx={{ width: '60%' }} />
                </Stack>
              )}

              {images.length === 0 ? (
                <Stack alignItems="center" gap={2} p={3}>
                  <Box {...dragProps} sx={{ textAlign: 'center', width: '100%' }}>
                    <CloudUploadIcon sx={{ fontSize: 64, color: isDragging ? 'primary.main' : 'action.disabled' }} />
                    <Typography variant="h6" color={isDragging ? 'primary' : 'text.secondary'}>
                      {isDragging ? 'Drop your image here' : 'Upload an Image'}
                    </Typography>
                    <Typography variant="body2" color="text.disabled" textAlign="center">
                      Drag and drop an image here, or click to browse
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ImageIcon />}
                    onClick={(e) => {
                      console.log('[UploadImage] Browse Files button clicked');
                      console.log('[UploadImage] isLoading:', isLoading);
                      console.log('[UploadImage] onImageUpload function:', typeof onImageUpload);
                      e.stopPropagation();
                      onImageUpload();
                    }}
                    disabled={isLoading}
                    size="large"
                    sx={{ pointerEvents: 'auto' }}
                  >
                    Browse Files
                  </Button>
                </Stack>
              ) : (
                <Stack width={'100%'} p={2} gap={1}>
                  {imageList.map((image, index) => (
                    <Box key={index}>
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <ImageIcon color="primary" />
                        <Typography variant="body2" fontWeight="bold">
                          {image.file?.name || 'Uploaded Image'}
                        </Typography>
                        <Chip
                          label={formatFileSize(image.file?.size)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Stack>
                      <Box
                        sx={{
                          maxHeight: { xs: '150px', md: '200px' },
                          overflow: 'auto',
                          borderRadius: 1,
                          border: 1,
                          borderColor: 'divider',
                        }}
                      >
                        <img
                          src={image['data_url']}
                          alt="uploaded"
                          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>

            {/* Text Display Area */}
            <Stack
              flexDirection={{ xs: 'column', md: 'row' }}
              width={'100%'}
              gap={2}
            >
              <Box flex={1} minWidth={0}>
                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: 'secondary.main',
                    }}
                  >
                    Original Text
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    minHeight: { xs: '120px', md: '150px' },
                    maxHeight: { xs: '200px', md: '250px' },
                    padding: 2,
                    border: 1,
                    borderColor: 'secondary.main',
                    borderLeft: 4,
                    borderRadius: 2,
                    overflowY: 'auto',
                    bgcolor: 'secondary.light',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 2,
                    },
                  }}
                >
                  {text ? (
                    <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
                      {text}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: 'text.disabled', fontStyle: 'italic' }} variant="body2">
                      Upload image to see original text
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box flex={1} minWidth={0}>
                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: 'primary.main',
                    }}
                  >
                    Translated Text
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    minHeight: { xs: '120px', md: '150px' },
                    maxHeight: { xs: '200px', md: '250px' },
                    padding: 2,
                    border: 1,
                    borderColor: 'primary.main',
                    borderLeft: 4,
                    borderRadius: 2,
                    overflowY: 'auto',
                    bgcolor: 'primary.light',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 2,
                    },
                  }}
                >
                  {translatedText ? (
                    <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
                      {translatedText}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: 'text.disabled', fontStyle: 'italic' }} variant="body2">
                      Upload image to see translation
                    </Typography>
                  )}
                </Box>
              </Box>
            </Stack>
          </Stack>

          {/* Action Buttons */}
          <Stack
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={1.5}
            width={'100%'}
            sx={{ maxWidth: { xs: '100%', sm: '500px' } }}
          >
            <Button
              sx={{ flex: 1, minWidth: { xs: '100%', sm: '150px' } }}
              variant="outlined"
              color="primary"
              startIcon={<AddCardIcon />}
              onClick={addFlashcards}
              disabled={isLoading || !text || !translatedText}
              size="large"
            >
              Add Flashcard
            </Button>
            <Button
              sx={{ flex: 1, minWidth: { xs: '100%', sm: '150px' } }}
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => {
                if (images.length > 0) {
                  onImageRemove(0);
                }
              }}
              disabled={isLoading || images.length === 0}
              size="large"
            >
              Delete Image
            </Button>
          </Stack>
        </Stack>
        );
      }}
    </ImageUploading>
  );
}