# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js-based flashcard generator application that processes uploaded images, extracts text using OCR, translates it, and allows users to create flashcards for export. The app is configured for static export and deployment to GitHub Pages.

## Architecture

- **Frontend Framework**: Next.js 14 with App Router (client-side components)
- **UI Library**: Material-UI (MUI) for consistent component design
- **Image Processing**: `react-images-uploading` for file uploads
- **API Integration**: Axios for HTTP requests to external translation service
- **Deployment**: Static export to GitHub Pages with automated CI/CD

### Key Components Structure

- `page.js` - Main application component managing state and orchestrating image upload, text extraction, and flashcard creation
- `UploadImage.js` - Handles image upload UI, displays original/translated text
- `CurrentStack.js` - Displays the current collection of flashcards before export
- `layout.js` - Root layout with metadata and font configuration

### Data Flow

1. User uploads image via `UploadImage` component
2. Image sent to external API (james-image-translation-d10e77b3ae74.herokuapp.com) for OCR and translation
3. Extracted and translated text displayed in separate panels
4. Users can add text pairs as flashcards to the current stack
5. Flashcards exported as TSV file for import into flashcard applications

## Common Commands

### Development
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build application for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality checks
```

### Dependencies
```bash
npm install          # Install all dependencies
npm ci              # Clean install (preferred for CI/CD)
```

### Deployment
The project uses automated GitHub Pages deployment via GitHub Actions. Push to `main` branch triggers:
1. Node.js 20 setup with dependency caching
2. Next.js build with static export
3. Deployment to GitHub Pages

## Key Configuration

- **Base Path**: `/upload-image` (configured for GitHub Pages subdirectory)
- **Static Export**: Enabled via `output: "export"` in next.config.js
- **External API**: Hardcoded endpoint for image processing service
- **File Exports**: TSV format for flashcard data

## Development Notes

- All components use `'use client'` directive (client-side rendering)
- State management handled via React hooks (no external state library)
- Styling primarily through MUI components with minimal custom CSS
- Image uploads processed immediately on selection
- Flashcard data temporarily stored in component state until export