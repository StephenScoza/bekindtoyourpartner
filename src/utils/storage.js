const STORAGE_KEYS = {
  settings: 'bktyp-settings',
  history: 'bktyp-history',
  featuredPrompt: 'bktyp-featured-prompt',
};

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadSettings() {
  return readJson(STORAGE_KEYS.settings, null);
}

export function saveSettings(settings) {
  writeJson(STORAGE_KEYS.settings, settings);
}

export function loadHistory() {
  return readJson(STORAGE_KEYS.history, []);
}

export function saveHistory(history) {
  writeJson(STORAGE_KEYS.history, history);
}

export function loadFeaturedPromptState() {
  return readJson(STORAGE_KEYS.featuredPrompt, null);
}

export function saveFeaturedPromptState(state) {
  writeJson(STORAGE_KEYS.featuredPrompt, state);
}

export function clearAppStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    window.localStorage.removeItem(key);
  });
}
