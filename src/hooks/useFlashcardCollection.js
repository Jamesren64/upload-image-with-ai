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
   * Update a flashcard by index
   */
  const updateFlashcard = (index, translatedText, originalText) => {
    if (!translatedText || !originalText) {
      throw new Error('Both original and translated text are required');
    }

    const sanitizedRow = [
      sanitizeText(translatedText),
      sanitizeText(originalText),
    ];

    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = sanitizedRow;
      return newRows;
    });
  };

  /**
   * Remove a flashcard by index
   */
  const removeFlashcard = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  /**
   * Helper to download file
   */
  const downloadFile = (content, filename, mimeType = 'text/plain') => {
    const encodedUri = encodeURI(content);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

    downloadFile(tsvContent, filename);
  };

  /**
   * Export flashcards as CSV file
   */
  const exportToCSV = (filename = 'my_data.csv') => {
    if (rows.length === 0) {
      throw new Error('No flashcards to export');
    }

    const escapeCSV = (field) => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    const csvRows = rows.map((row) => row.map(escapeCSV).join(','));
    const csvContent = csvRows.join('\n');
    const dataUri = `data:text/csv;charset=utf-8,${csvContent}`;

    downloadFile(dataUri, filename);
  };

  /**
   * Export flashcards as JSON
   */
  const exportToJSON = (filename = 'my_data.json') => {
    if (rows.length === 0) {
      throw new Error('No flashcards to export');
    }

    const jsonData = rows.map((row) => ({
      front: row[0],
      back: row[1],
    }));

    const jsonContent = JSON.stringify(jsonData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${jsonContent}`;

    downloadFile(dataUri, filename);
  };

  /**
   * Export flashcards in Anki format (JSON)
   */
  const exportToAnki = (filename = 'my_data.json') => {
    if (rows.length === 0) {
      throw new Error('No flashcards to export');
    }

    const ankiData = rows.map((row, index) => ({
      id: Date.now() + index,
      fields: [row[0], row[1]],
      tags: ['imported'],
      type: 0,
    }));

    const jsonContent = JSON.stringify(ankiData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${jsonContent}`;

    downloadFile(dataUri, filename);
  };

  /**
   * Export flashcards in Quizlet format (JSON)
   */
  const exportToQuizlet = (filename = 'my_data.json') => {
    if (rows.length === 0) {
      throw new Error('No flashcards to export');
    }

    const quizletData = {
      name: 'Imported Flashcards',
      terms: rows.map((row) => ({
        term: row[0],
        definition: row[1],
      })),
    };

    const jsonContent = JSON.stringify(quizletData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${jsonContent}`;

    downloadFile(dataUri, filename);
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
    updateFlashcard,
    removeFlashcard,
    exportToTSV,
    exportToCSV,
    exportToJSON,
    exportToAnki,
    exportToQuizlet,
    clearFlashcards,
    getFlashcardCount,
  };
}
