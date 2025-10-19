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
        >
          <Stack className="CARDS" width={'100%'}>
            <Stack
              className="OUTER_STACK"
              width={'100%'}
              overflow="auto"
              sx={{ border: 1, borderColor: 'gray', borderRadius: '8px' }}
              height={300}
              alignItems={'center'}
              justifyContent={'center'}
              position="relative"
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
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
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
                <Stack key={index} className="image-item" padding={2} width={'100%'}>
                  <img src={image['data_url']} alt="" />
                </Stack>
              ))}
            </Stack>

            <Stack flexDirection={'row'} width={'100%'} gap={2} marginTop={2}>
              <Stack flexDirection={'column'} width={'50%'}>
                <Typography variant="h7">Original Text</Typography>
                <Stack
                  width={'100%'}
                  height={200}
                  padding={0.5}
                  sx={{ border: 1, borderColor: 'gray', borderRadius: '8px' }}
                  overflow={'scroll'}
                >
                  {text ? (
                    <Typography>{text}</Typography>
                  ) : (
                    <Typography sx={{ color: 'gray' }}>
                      Upload image to see flashcard
                    </Typography>
                  )}
                </Stack>
              </Stack>

              <Stack flexDirection={'column'} width={'50%'}>
                <Typography variant="h7">Translated Text</Typography>
                <Stack
                  width={'100%'}
                  height={200}
                  padding={0.5}
                  sx={{ border: 1, borderColor: 'gray', borderRadius: '8px' }}
                  overflow={'scroll'}
                >
                  {translatedText ? (
                    <Typography>{translatedText}</Typography>
                  ) : (
                    <Typography sx={{ color: 'gray' }}>
                      Upload image to see flashcard
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack flexDirection={'row'} gap={1} marginTop={3}>
            <Button
              sx={{ width: 200 }}
              variant="contained"
              onClick={addFlashcards}
              disabled={isLoading || !text || !translatedText}
            >
              Add Flashcards
            </Button>
            <Button
              sx={{ width: 200 }}
              variant="contained"
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