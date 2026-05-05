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
- Completion history log for recent acts of kindness
- Prompt library with 60 curated prompts stored in `src/data/prompts.js`
- Responsive, accessible UI with soft cards, gradients, empty states, and friendly microcopy
- Motion-aware UI polish with staged card reveals, ambient background movement, and animated progress states
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

3. Create a production build:

   ```bash
   npm run build
   ```

4. Optionally preview the production build locally:

   ```bash
   npm run preview
   ```

## Future improvements

- Add calendar-style progress visualization for completed kindness acts
- Introduce optional daily reflection notes after completing a prompt
- Support exporting history as a shareable or printable summary
- Add prompt favoriting and custom prompt creation
- Offer soft in-browser reminder scheduling without requiring a backend

## Resume bullet

"Built a responsive React application that encourages relationship kindness through personalized daily prompts, localStorage persistence, category filtering, streak tracking, and reusable component architecture."
