# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js flashcard generator application that allows users to upload images, extract and translate text using OCR, and create flashcards for language learning. The app is configured for static export and GitHub Pages deployment.

## Development Commands

```bash
# Development server
npm run dev

# Build for production (static export)
npm run build

# Start production server (for local testing)
npm start

# Lint code
npm run lint
```

## Architecture

### Core Components

- **src/app/page.js**: Main application component that orchestrates the flashcard creation workflow
  - Manages image upload state and OpenAI API calls
  - Handles flashcard collection and TSV/CSV/JSON export functionality
  - Uses OpenAI Responses API for OCR and translation

- **src/app/UploadImage.js**: Image upload component using `react-images-uploading`
  - Provides drag-and-drop image upload interface
  - Displays original and translated text side-by-side
  - Handles adding flashcards to the collection

- **src/app/CurrentStack.js**: Displays the current collection of flashcards
  - Shows preview of all created flashcard pairs
  - Provides visual feedback for the flashcard stack

- **src/services/openai.js**: OpenAI integration service
  - Handles image-to-base64 conversion
  - Performs OCR and translation in a single API call using GPT-5-mini
  - Auto-detects source language and translates to English
  - Returns structured JSON with original and translated text

- **src/hooks/useImageUpload.js**: Custom React hook
  - Manages image upload state and processing
  - Handles OpenAI API communication
  - Returns extracted and translated text

### Technology Stack

- **Frontend**: Next.js 14 with React 18
- **UI Library**: Material-UI (MUI) for components and styling
- **Image Upload**: react-images-uploading library
- **AI/Vision**: OpenAI SDK with Responses API and GPT-5-mini model
- **Deployment**: Static export to GitHub Pages

### Key Features

1. **Image Processing**: Users upload images containing text
2. **OCR & Translation**: OpenAI's vision API extracts text, auto-detects language, and translates to English
3. **Flashcard Creation**: Users can add extracted text pairs to a flashcard collection
4. **Export**: Download flashcard collection in multiple formats (TSV, CSV, JSON, Anki, Quizlet)

## Configuration

### Static Export Setup
- **next.config.js**: Configured for static export with `/upload-image` basePath for GitHub Pages
- **package.json**: Standard Next.js scripts for development and production

### GitHub Actions
- **publish.yml**: Automated deployment to GitHub Pages on main branch pushes
- Uses Next.js static export to generate files in `/out` directory

### Path Aliases
- **jsconfig.json**: Configured with `@/*` alias mapping to `./src/*` for cleaner imports

## External Dependencies

- **OpenAI API**: Uses OpenAI's Responses API with GPT-5-mini for vision capabilities (OCR and translation)
  - Both OCR and translation occur in a single API call for efficiency
  - Requires `NEXT_PUBLIC_OPENAI_API_KEY` environment variable
  - Get API key from https://platform.openai.com/api-keys
  - Exposed to client-side code (NEXT_PUBLIC_ prefix) for browser-based processing
- **GitHub Pages**: Deployment target with automatic CI/CD via GitHub Actions

## Development Notes

- The app uses client-side rendering (`'use client'` directive in page.js)
- Images are converted to base64 and processed by OpenAI's vision API, not stored locally
- OCR and translation happen entirely on the client-side using OpenAI's API
- Flashcard data is managed in React state and exported as multiple file formats
- The basePath configuration means the app runs at `/upload-image` when deployed

## Environment Setup

To run this application locally:

1. Create a `.env.local` file based on `.env.example`
2. Add your OpenAI API key: `NEXT_PUBLIC_OPENAI_API_KEY=sk-...`
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Visit `http://localhost:3000/upload-image` in your browser