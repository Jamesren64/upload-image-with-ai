'use client';

// Backend API endpoint
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function processImageWithOCRAndTranslation(imageFile, apiKey) {
  try {
    // Note: apiKey parameter is kept for backwards compatibility but not used
    // Backend handles the OpenAI API key via environment variables

    // Create FormData to send image to backend
    const formData = new FormData();
    formData.append('file', imageFile);

    console.log('[openai] Sending image to backend:', BACKEND_URL);

    // Call backend API
    const response = await fetch(`${BACKEND_URL}/uploadfile-openai/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Backend error: ${response.status}`);
    }

    const result = await response.json();
    console.log('[openai] Backend response:', result);

    // Backend returns { filename, text, translatedText, sourceLanguage }
    if (!result.text || !result.translatedText) {
      console.error('Incomplete response from backend:', result);
      throw new Error('Backend returned incomplete data');
    }

    return {
      text: result.text,
      translatedText: result.translatedText,
    };
  } catch (error) {
    console.error('Error processing image with backend:', error);
    throw error;
  }
}
