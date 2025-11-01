# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js flashcard generator application that allows users to upload images, extract and translate text using OCR, and create flashcards for language learning. The app connects to a Python FastAPI backend (image-translation) that handles OpenAI API integration for OCR and translation.

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
  - Manages image upload state and backend API calls
  - Handles flashcard collection and TSV/CSV/JSON export functionality
  - Sends images to backend for OCR and translation processing

- **src/app/UploadImage.js**: Image upload component using `react-images-uploading`
  - Provides drag-and-drop image upload interface
  - Displays original and translated text side-by-side
  - Handles adding flashcards to the collection

- **src/app/CurrentStack.js**: Displays the current collection of flashcards
  - Shows preview of all created flashcard pairs
  - Provides visual feedback for the flashcard stack

- **src/services/openai.js**: Backend API integration service
  - Sends images to the Python FastAPI backend
  - Backend performs OCR and translation using OpenAI's GPT-5-mini model
  - Auto-detects source language and translates to English
  - Returns structured JSON with original and translated text

- **src/hooks/useImageUpload.js**: Custom React hook
  - Manages image upload state and processing
  - Handles backend API communication
  - Returns extracted and translated text

### Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Backend**: Python FastAPI (image-translation project)
- **UI Library**: Material-UI (MUI) for components and styling
- **Image Upload**: react-images-uploading library
- **AI/Vision**: Backend uses OpenAI SDK with Responses API and GPT-5-mini model
- **Deployment**: Frontend can be deployed to GitHub Pages or any static host

### Key Features

1. **Image Processing**: Users upload images containing text
2. **Backend Processing**: Images are sent to Python FastAPI backend
3. **OCR & Translation**: Backend uses OpenAI's GPT-5-mini to extract text, auto-detect language, and translate to English
4. **Flashcard Creation**: Users can add extracted text pairs to a flashcard collection
5. **Export**: Download flashcard collection in multiple formats (TSV, CSV, JSON, Anki, Quizlet)

## Configuration

### Backend Configuration
- **Backend Repository**: image-translation (Python FastAPI)
- **Backend Endpoint**: `/uploadfile-openai/` for OCR and translation
- **Backend Port**: 8000 (default)
- **CORS**: Backend allows requests from `http://localhost:3001` for this frontend

### Frontend Configuration
- **next.config.js**: Configured for Next.js app
- **package.json**: Standard Next.js scripts for development and production
- **Environment Variables**: `NEXT_PUBLIC_BACKEND_URL` for backend API URL

### Path Aliases
- **jsconfig.json**: Configured with `@/*` alias mapping to `./src/*` for cleaner imports

## External Dependencies

- **Backend API (image-translation)**: Python FastAPI backend that provides:
  - OpenAI integration with GPT-5-mini for OCR and translation
  - Image processing and text extraction
  - Requires `OPENAI_API_KEY` environment variable on backend
  - Get API key from https://platform.openai.com/api-keys
- **Material-UI**: Component library for UI elements

## Development Notes

- The app uses client-side rendering (`'use client'` directive in page.js)
- Images are sent to the backend API for processing
- OCR and translation happen on the backend using OpenAI's API
- Flashcard data is managed in React state and exported as multiple file formats
- Backend handles all OpenAI API key management for security

## Environment Setup

To run this application locally:

### Backend Setup (Required)
1. Navigate to the `image-translation` directory
2. Install dependencies: `pip install -r requirements.txt`
3. Create a `.env` file and add your OpenAI API key: `OPENAI_API_KEY=sk-...`
4. Start the backend: `uvicorn main:app --reload --port 8000`

### Frontend Setup
1. Create a `.env.local` file based on `.env.example`
2. Set the backend URL: `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000`
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server (will run on port 3001)
5. Visit `http://localhost:3001` in your browser

**Important**: Make sure the backend is running before starting the frontend!