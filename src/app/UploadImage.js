import * as React from 'react';
import ImageUploading from 'react-images-uploading';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, CircularProgress } from '@mui/material';
import { API_CONFIG } from '@/config/api';

export default function UploadImage({
  images,
  setImages,
  addFlashcards,
  text,
  translatedText,
  isLoading,
}) {
  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={API_CONFIG.MAX_IMAGES}
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
      }) => (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          height={'100%'}
          gap={2}
        >
          <Stack className="CARDS" width={'100%'} gap={2}>
            {/* Image Upload Area */}
            <Stack
              className="OUTER_STACK"
              width={'100%'}
              overflow="auto"
              sx={{
                border: 1,
                borderColor: 'gray',
                borderRadius: '8px',
                minHeight: { xs: '200px', md: '300px' },
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
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
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}
                >
                  <CircularProgress />
                </Stack>
              )}

              <Stack flexDirection={'row'} marginTop={0}>
                {images.length === 0 && (
                  <Button
                    variant="text"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    disabled={isLoading}
                  >
                    Add Image
                  </Button>
                )}
                &nbsp;
              </Stack>

              {imageList.map((image, index) => (
                <Stack
                  key={index}
                  className="image-item"
                  padding={1}
                  width={'100%'}
                  sx={{ maxHeight: { xs: '150px', md: '250px' }, overflow: 'auto' }}
                >
                  <img src={image['data_url']} alt="uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                </Stack>
              ))}
            </Stack>

            {/* Text Display Area */}
            <Stack
              flexDirection={{ xs: 'column', md: 'row' }}
              width={'100%'}
              gap={2}
            >
              <Stack flexDirection={'column'} flex={1} minWidth={0}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Original Text
                </Typography>
                <Stack
                  width={'100%'}
                  sx={{
                    minHeight: { xs: '120px', md: '150px' },
                    padding: 1,
                    border: 1,
                    borderColor: 'gray',
                    borderRadius: '8px',
                    overflowY: 'auto',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  {text ? (
                    <Typography variant="body2">{text}</Typography>
                  ) : (
                    <Typography sx={{ color: 'gray' }} variant="body2">
                      Upload image to see flashcard
                    </Typography>
                  )}
                </Stack>
              </Stack>

              <Stack flexDirection={'column'} flex={1} minWidth={0}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Translated Text
                </Typography>
                <Stack
                  width={'100%'}
                  sx={{
                    minHeight: { xs: '120px', md: '150px' },
                    padding: 1,
                    border: 1,
                    borderColor: 'gray',
                    borderRadius: '8px',
                    overflowY: 'auto',
                    backgroundColor: '#fafafa',
                  }}
                >
                  {translatedText ? (
                    <Typography variant="body2">{translatedText}</Typography>
                  ) : (
                    <Typography sx={{ color: 'gray' }} variant="body2">
                      Upload image to see flashcard
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Action Buttons */}
          <Stack
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={1}
            width={'100%'}
            sx={{ maxWidth: { xs: '100%', sm: '450px' } }}
          >
            <Button
              sx={{ flex: 1, minWidth: { xs: '100%', sm: '150px' } }}
              variant="contained"
              onClick={addFlashcards}
              disabled={isLoading || !text || !translatedText}
            >
              Add Flashcards
            </Button>
            <Button
              sx={{ flex: 1, minWidth: { xs: '100%', sm: '150px' } }}
              variant="outlined"
              onClick={() => {
                if (images.length > 0) {
                  onImageRemove(0);
                }
              }}
              disabled={isLoading || images.length === 0}
            >
              Delete Image
            </Button>
          </Stack>
        </Stack>
      )}
    </ImageUploading>
  );
}