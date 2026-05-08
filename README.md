# Be Kind to Your Partner

Be Kind to Your Partner is a polished React + Vite web app that helps users build a consistent relationship-kindness habit through personalized daily prompts, category-based inspiration, and lightweight progress tracking stored entirely in `localStorage`.

## Screenshots

### Onboarding

![Onboarding experience](./docs/screenshots/onboarding.png)

### Dashboard

![Dashboard experience](./docs/screenshots/dashboard.png)

### Mobile

![Mobile dashboard](./docs/screenshots/mobile-dashboard.png)

## Why this project

This project was designed as a portfolio-ready frontend case study with emotional clarity, clean component boundaries, and a product concept that feels both practical and human. It focuses on thoughtful UX, persistence without a backend, and a warm interface that feels supportive on both mobile and desktop.

## Features

- Personalized onboarding with partner name and reminder style preferences
- Daily featured kindness prompt customized with the partner name
- Prompt rotation with category filtering across six relationship-focused areas
- Progress dashboard with total completed acts, current streak, last completed date, and momentum context
- Monthly calendar-style progress view for visual habit tracking
- Completion history log for recent acts of kindness
- Reflection notes attached to completed kindness acts
- Favorite prompts for saving the ideas you want to revisit
- Custom prompt creator so users can add their own relationship rituals and gestures
- Prompt library with 60 curated prompts stored in `src/data/prompts.js`
- Responsive, accessible UI with soft cards, gradients, empty states, and friendly microcopy
- Motion-aware UI polish with staged card reveals, ambient background movement, and animated progress states
- Custom favicon, web manifest, and social preview metadata for a more polished shared-link experience
- `localStorage` persistence for settings, prompt state, and progress history

## Tech stack

- React 18
- Vite 5
- Plain CSS
- Browser `localStorage`
- Playwright for generating README screenshots

## Portfolio highlights

- Built a complete single-page product experience from onboarding through progress tracking with no backend dependency
- Structured the app into reusable React components with focused utility helpers for persistence and streak calculations
- Designed a warm UI system with subtle gradients, animation, responsive behavior, and supportive empty states
- Used browser automation to produce accurate product screenshots for GitHub presentation
- Prepared the app for static deployment with SPA-friendly hosting config

## Project structure

```text
src/
  App.jsx
  main.jsx
  styles.css
  data/prompts.js
  components/
    Onboarding.jsx
    PromptCard.jsx
    Stats.jsx
    History.jsx
    Settings.jsx
    CategoryFilter.jsx
  utils/
    storage.js
    streaks.js
docs/
  screenshots/
public/
  favicon.svg
  og-preview.svg
  site.webmanifest
vercel.json
netlify.toml
```

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   This app uses a fixed dev port at `http://127.0.0.1:4317`.

3. Create a production build:

   ```bash
   npm run build
   ```

4. Optionally preview the production build locally:

   ```bash
   npm run preview
   ```

   The preview server runs on `http://127.0.0.1:4318`.

5. Regenerate the README screenshots:

   ```bash
   npm run screenshots
   ```

## Deployment

This project is ready for static hosting.

### Vercel

1. Import the GitHub repository into Vercel.
2. Keep the detected Vite settings, or confirm:
   Build command: `npm run build`
   Output directory: `dist`
3. Deploy.

### Netlify

1. Import the GitHub repository into Netlify.
2. Confirm:
   Build command: `npm run build`
   Publish directory: `dist`
3. Deploy.

Both [vercel.json](./vercel.json) and [netlify.toml](./netlify.toml) include SPA-friendly routing back to `index.html`.

## Future improvements

- Add a lightweight export/share view for completed acts and reflections
- Support exporting history as a shareable or printable summary
- Offer soft in-browser reminder scheduling without requiring a backend
- Add richer analytics like category trends and favorite prompt usage

## Resume bullet

"Built a responsive React application that encourages relationship kindness through personalized daily prompts, localStorage persistence, category filtering, streak tracking, and reusable component architecture."
