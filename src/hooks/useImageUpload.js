import { useState, useEffect } from 'react';
import { processImageWithOCRAndTranslation } from '@/services/openai';

/**
 * Custom hook for handling image uploads and text extraction
 * Uses OpenAI's vision API for OCR and translation
 * @param {string} apiKey - OpenAI API key
 */
export function useImageUpload(apiKey) {
  const [images, setImages] = useState([]);
  const [text, setText] = useState(undefined);
  const [translatedText, setTranslatedText] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      const processImage = async () => {
        try {
          setIsLoading(true);
          setError(null);

          // Process the first uploaded image with OpenAI
          const result = await processImageWithOCRAndTranslation(images[0].file, apiKey);
          setText(result.text);
          setTranslatedText(result.translatedText);
        } catch (err) {
          const errorMessage =
            err.message || 'Failed to process image. Please try again.';
          setError(errorMessage);
          console.error('Image processing error:', err);
        } finally {
          setIsLoading(false);
        }
      };

      processImage();
    } else {
      // Clear text when no images are selected
      setText(undefined);
      setTranslatedText(undefined);
      setError(null);
    }
  }, [images, apiKey]);

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
