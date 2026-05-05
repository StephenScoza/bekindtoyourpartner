# Be Kind to Your Partner

Be Kind to Your Partner is a polished React + Vite web app that helps users build a consistent relationship kindness habit through personalized daily prompts, category-based inspiration, and lightweight progress tracking stored entirely in `localStorage`.

## Why this project

This project was designed as a portfolio-quality frontend app with emotional clarity, clean component boundaries, and a practical product concept. It focuses on thoughtful UX, persistence without a backend, and a warm interface that feels supportive on both mobile and desktop.

## Features

- Personalized onboarding with partner name and reminder style preferences
- Daily featured kindness prompt customized with the partner name
- Prompt rotation with category filtering across six relationship-focused areas
- Progress dashboard with total completed acts, current streak, and last completed date
- Completion history log for recent acts of kindness
- Prompt library with 60 curated prompts stored in `src/data/prompts.js`
- Responsive, accessible UI with soft cards, gradients, empty states, and friendly microcopy
- `localStorage` persistence for settings, prompt state, and progress history

## Tech stack

- React 18
- Vite 5
- Plain CSS
- Browser `localStorage`

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

“Built a responsive React application that encourages relationship kindness through personalized daily prompts, localStorage persistence, category filtering, streak tracking, and reusable component architecture.”
