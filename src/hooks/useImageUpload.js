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
    console.log('[useImageUpload] Effect triggered, images:', images);
    console.log('[useImageUpload] images.length:', images.length);

    if (images.length > 0) {
      console.log('[useImageUpload] Processing image...');
      const processImage = async () => {
        try {
          setIsLoading(true);
          setError(null);
          console.log('[useImageUpload] Starting OpenAI processing');
          console.log('[useImageUpload] Image file:', images[0].file);
          console.log('[useImageUpload] API key present:', !!apiKey);

          // Process the first uploaded image with OpenAI
          const result = await processImageWithOCRAndTranslation(images[0].file, apiKey);
          console.log('[useImageUpload] OpenAI result:', result);
          setText(result.text);
          setTranslatedText(result.translatedText);
        } catch (err) {
          const errorMessage =
            err.message || 'Failed to process image. Please try again.';
          setError(errorMessage);
          console.error('[useImageUpload] Image processing error:', err);
        } finally {
          setIsLoading(false);
          console.log('[useImageUpload] Processing complete');
        }
      };

      processImage();
    } else {
      console.log('[useImageUpload] No images, clearing text');
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
