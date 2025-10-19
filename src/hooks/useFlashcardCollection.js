import { useState } from 'react';

/**
 * Custom hook for managing flashcard collection
 * Handles adding flashcards and exporting to TSV format
 */
export function useFlashcardCollection() {
  const [rows, setRows] = useState([]);

  /**
   * Sanitize text by removing newlines, tabs, and HTML entities
   */
  const sanitizeText = (text) => {
    return text
      .replaceAll('\n', ' ')
      .replaceAll('\t', ' ')
      .replaceAll('&#39;', "'");
  };

  /**
   * Add a new flashcard to the collection
   */
  const addFlashcard = (translatedText, originalText) => {
    if (!translatedText || !originalText) {
      throw new Error('Both original and translated text are required');
    }

    const sanitizedRow = [
      sanitizeText(translatedText),
      sanitizeText(originalText),
    ];

    setRows((prevRows) => [...prevRows, sanitizedRow]);
  };

  /**
   * Remove a flashcard by index
   */
  const removeFlashcard = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  /**
   * Export flashcards as TSV file
   */
  const exportToTSV = (filename = 'my_data.tsv') => {
    if (rows.length === 0) {
      throw new Error('No flashcards to export');
    }

    const tabJoined = rows.map((row) => row.join('\t'));
    const newlineJoined = tabJoined.join('\n');
    const tsvContent = `data:text/tab-separated-values;charset=utf-8,${newlineJoined}`;

    const encodedUri = encodeURI(tsvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  /**
   * Clear all flashcards
   */
  const clearFlashcards = () => {
    setRows([]);
  };

  /**
   * Get the count of flashcards
   */
  const getFlashcardCount = () => {
    return rows.length;
  };

  return {
    rows,
    setRows,
    addFlashcard,
    removeFlashcard,
    exportToTSV,
    clearFlashcards,
    getFlashcardCount,
  };
}
