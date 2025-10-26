'use client';
import OpenAI from 'openai';

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function processImageWithOCRAndTranslation(imageFile, apiKey) {
  try {
    if (!apiKey) {
      throw new Error('API key is required. Please provide your OpenAI API key.');
    }

    const client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Required for client-side usage
    });

    const base64 = await fileToBase64(imageFile);

    const response = await client.responses.create({
      model: 'gpt-5-mini',
      input: [
        {
          role: 'user',
          type: 'message',
          content: [
            {
              type: 'input_text',
              text:
                'Please extract all text from this image and translate it to English. ' +
                'Return the response in JSON format with two fields: "original" (the extracted text) ' +
                'and "translated" (the English translation). Auto-detect the source language. ' +
                'Return ONLY the JSON, nothing else.',
            },
            {
              type: 'input_image',
              image_url: `data:image/jpeg;base64,${base64}`,
            },
          ],
        },
      ],
    });

    // --- ✅ Robust output parsing ---
    const messageBlock = response.output?.find((o) => o.type === 'message');
    const outputText =
      messageBlock?.content?.find((c) => c.type === 'output_text')?.text || '';

    if (!outputText) {
      console.error('Full response for debugging:', response);
      throw new Error('No output_text found in response.');
    }

    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch {
      console.error('Could not parse JSON:', outputText);
      throw new Error('Invalid JSON returned by model');
    }

    if (!parsed.original || !parsed.translated) {
      console.error('Incomplete JSON:', parsed);
      throw new Error('Missing expected fields (original, translated)');
    }

    return {
      text: parsed.original,
      translatedText: parsed.translated,
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}
