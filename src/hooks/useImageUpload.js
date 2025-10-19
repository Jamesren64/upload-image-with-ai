import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUploadUrl } from '@/config/api';

/**
 * Custom hook for handling image uploads and text extraction
 * Manages the API communication for uploading images and getting translated text
 */
export function useImageUpload() {
  const [images, setImages] = useState([]);
  const [text, setText] = useState(undefined);
  const [translatedText, setTranslatedText] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      const uploadImage = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const formData = new FormData();
          formData.append('file', images[0].file);

          const response = await axios.post(getUploadUrl(), formData);
          setText(response.data.text);
          setTranslatedText(response.data.translatedText);
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            'Failed to process image. Please try again.';
          setError(errorMessage);
          console.error('Image upload error:', err);
        } finally {
          setIsLoading(false);
        }
      };

      uploadImage();
    } else {
      // Clear text when no images are selected
      setText(undefined);
      setTranslatedText(undefined);
      setError(null);
    }
  }, [images]);

  return {
    images,
    setImages,
    text,
    translatedText,
    isLoading,
    error,
    setError,
  };
}
