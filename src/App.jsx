import { useEffect, useState } from 'react';
import CategoryFilter from './components/CategoryFilter';
import BrandMark from './components/BrandMark';
import CustomPromptForm from './components/CustomPromptForm';
import Favorites from './components/Favorites';
import History from './components/History';
import Onboarding from './components/Onboarding';
import PromptCard from './components/PromptCard';
import ProgressCalendar from './components/ProgressCalendar';
import Settings from './components/Settings';
import Stats from './components/Stats';
import { categories, prompts } from './data/prompts';
import {
  clearAppStorage,
  loadCustomPrompts,
  loadFavorites,
  loadFeaturedPromptState,
  loadHistory,
  loadSettings,
  saveCustomPrompts,
  saveFavorites,
  saveFeaturedPromptState,
  saveHistory,
  saveSettings,
} from './utils/storage';
import { getCurrentStreak, getLastCompletedDate } from './utils/streaks';

const toneLabels = {
  gentle: 'Gentle nudge',
  playful: 'Playful push',
  direct: 'Direct reminder',
};
const toneOptions = ['gentle', 'playful', 'direct'];

function formatDateLabel(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function formatDateTimeLabel(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function stableIndex(seed, length) {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 2147483647;
  }

  return Math.abs(hash) % length;
}

function pickPrompt(availablePrompts, seed) {
  if (availablePrompts.length === 0) {
    return null;
  }

  return availablePrompts[stableIndex(seed, availablePrompts.length)];
}

function App() {
  const [settings, setSettings] = useState(() => loadSettings());
  const [history, setHistory] = useState(() => loadHistory());
  const [favorites, setFavorites] = useState(() => loadFavorites());
  const [customPrompts, setCustomPrompts] = useState(() => loadCustomPrompts());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredPromptId, setFeaturedPromptId] = useState(null);
  const [reflectionDraft, setReflectionDraft] = useState('');
  const availablePrompts = [...prompts, ...customPrompts];

  const filteredPrompts = (() => {
    const categoryMatches =
      selectedCategory === 'All'
        ? availablePrompts
        : availablePrompts.filter((prompt) => prompt.category === selectedCategory);

    if (!settings) {
      return categoryMatches;
    }

    const toneMatches = categoryMatches.filter(
      (prompt) => prompt.tone === settings.reminderStyle,
    );

    return toneMatches.length > 0 ? toneMatches : categoryMatches;
  })();

  const featuredPrompt =
    filteredPrompts.find((prompt) => prompt.id === featuredPromptId) ?? null;

  useEffect(() => {
    if (!settings) {
      return;
    }

    const stored = loadFeaturedPromptState();
    const currentKey = todayKey();
    const promptStillVisible = filteredPrompts.some((prompt) => prompt.id === stored?.promptId);

    if (
      stored &&
      stored.dateKey === currentKey &&
      stored.category === selectedCategory &&
      promptStillVisible
    ) {
      setFeaturedPromptId(stored.promptId);
      return;
    }

    const nextPrompt = pickPrompt(
      filteredPrompts,
      `${currentKey}-${settings.partnerName}-${settings.reminderStyle}-${selectedCategory}`,
    );

    if (nextPrompt) {
      setFeaturedPromptId(nextPrompt.id);
      saveFeaturedPromptState({
        promptId: nextPrompt.id,
        dateKey: currentKey,
        category: selectedCategory,
      });
    }
  }, [filteredPrompts, selectedCategory, settings]);

  function handleSaveSettings(nextSettings) {
    setSettings(nextSettings);
    saveSettings(nextSettings);
  }

  function handleResetSettings() {
    clearAppStorage();
    setSettings(null);
    setHistory([]);
    setSelectedCategory('All');
    setFeaturedPromptId(null);
  }

  function handleRefreshPrompt() {
    if (filteredPrompts.length === 0) {
      return;
    }

    const currentIndex = filteredPrompts.findIndex((prompt) => prompt.id === featuredPromptId);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % filteredPrompts.length;
    const nextPrompt = filteredPrompts[nextIndex];

    setFeaturedPromptId(nextPrompt.id);
    setReflectionDraft('');
    saveFeaturedPromptState({
      promptId: nextPrompt.id,
      dateKey: todayKey(),
      category: selectedCategory,
    });
  }

  function handleCompletePrompt() {
    if (!featuredPrompt || !settings) {
      return;
    }

    const completedAt = new Date().toISOString();
    const note = reflectionDraft.trim();
    const nextHistory = [
      {
        id: `${featuredPrompt.id}-${completedAt}`,
        promptId: featuredPrompt.id,
        category: featuredPrompt.category,
        text: featuredPrompt.text.replaceAll('{{partner}}', settings.partnerName),
        note,
        completedAt,
        dateKey: todayKey(),
      },
      ...history,
    ];

    setHistory(nextHistory);
    setReflectionDraft('');
    saveHistory(nextHistory);
  }

  function handleToggleFavorite() {
    if (!featuredPrompt) {
      return;
    }

    const alreadySaved = favorites.some((entry) => entry.id === featuredPrompt.id);
    const nextFavorites = alreadySaved
      ? favorites.filter((entry) => entry.id !== featuredPrompt.id)
      : [...favorites, featuredPrompt];

    setFavorites(nextFavorites);
    saveFavorites(nextFavorites);
  }

  function handleChooseFavorite(promptId) {
    setFeaturedPromptId(promptId);
    setReflectionDraft('');
    saveFeaturedPromptState({
      promptId,
      dateKey: todayKey(),
      category: selectedCategory,
    });
  }

  function handleCreateCustomPrompt(promptInput) {
    const prompt = {
      id: `custom-${Date.now()}`,
      ...promptInput,
      isCustom: true,
    };

    const nextCustomPrompts = [prompt, ...customPrompts];
    setCustomPrompts(nextCustomPrompts);
    saveCustomPrompts(nextCustomPrompts);
    setFeaturedPromptId(prompt.id);
    setReflectionDraft('');
    saveFeaturedPromptState({
      promptId: prompt.id,
      dateKey: todayKey(),
      category: selectedCategory,
    });
  }

  function handleDeleteCustomPrompt(promptId) {
    const nextCustomPrompts = customPrompts.filter((prompt) => prompt.id !== promptId);
    const nextFavorites = favorites.filter((prompt) => prompt.id !== promptId);

    setCustomPrompts(nextCustomPrompts);
    setFavorites(nextFavorites);
    saveCustomPrompts(nextCustomPrompts);
    saveFavorites(nextFavorites);

    if (featuredPromptId === promptId) {
      setFeaturedPromptId(null);
      setReflectionDraft('');
    }
  }

  if (!settings) {
    return <Onboarding onSave={handleSaveSettings} />;
  }

  const totalCompleted = history.length;
  const currentStreak = getCurrentStreak(history);
  const lastCompleted = getLastCompletedDate(history);
  const completionTarget = 30;
  const completionPercent = Math.min(
    100,
    Math.round((totalCompleted / completionTarget) * 100),
  );
  const recentCategories = [...new Set(history.slice(0, 4).map((entry) => entry.category))];
  const todayPromptCount = filteredPrompts.length;
  const momentumMessage =
    totalCompleted === 0
      ? 'Your first act of kindness will set the tone.'
      : currentStreak > 1
        ? `You have kept this going for ${currentStreak} days in a row.`
        : 'You are back in motion. One more kind act keeps the rhythm alive.';
  const historyEntries = history.slice(0, 12).map((entry) => ({
    ...entry,
    completedLabel: formatDateTimeLabel(entry.completedAt),
  }));

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <BrandMark compact subtitle={false} />
        </div>
        <div className="topbar-meta">
          <p className="eyebrow">Daily kindness practice</p>
          <p className="topbar-copy">
            Small, thoughtful gestures for {settings.partnerName}, tracked gently.
          </p>
        </div>
      </header>

      <main className="dashboard">
        <section className="intro card stage-card">
          <div className="intro-copy">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h2>Show up with care, one small act at a time.</h2>
            </div>
            <p className="section-copy">
              Your prompts are tuned to a {settings.reminderStyle} style so the
              habit feels more natural and sustainable.
            </p>
          </div>

          <div className="intro-grid">
            <article className="mini-panel">
              <span className="mini-label">Today&apos;s mode</span>
              <strong>{titleCase(settings.reminderStyle)}</strong>
              <p>{todayPromptCount} prompts ready in your current view.</p>
            </article>

            <article className="mini-panel">
              <span className="mini-label">Momentum</span>
              <strong>{completionPercent}%</strong>
              <p>{momentumMessage}</p>
            </article>

            <article className="mini-panel">
              <span className="mini-label">Recent focus</span>
              <strong>
                {recentCategories.length > 0 ? recentCategories[0] : 'Ready to begin'}
              </strong>
              <p>
                {recentCategories.length > 0
                  ? `${recentCategories.length} categories touched recently.`
                  : 'Your completed acts will shape this space.'}
              </p>
            </article>
          </div>
        </section>

        <Stats
          totalCompleted={totalCompleted}
          currentStreak={currentStreak}
          lastCompletedLabel={lastCompleted ? formatDateLabel(lastCompleted) : 'Not yet'}
        />

        <div className="content-grid">
          <div className="primary-column">
            <PromptCard
              prompt={featuredPrompt}
              partnerName={settings.partnerName}
              reminderLabel={toneLabels[settings.reminderStyle]}
              onComplete={handleCompletePrompt}
              onRefresh={handleRefreshPrompt}
              completionCount={totalCompleted}
              reflection={reflectionDraft}
              onReflectionChange={setReflectionDraft}
              isFavorite={favorites.some((entry) => entry.id === featuredPrompt?.id)}
              onToggleFavorite={handleToggleFavorite}
            />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <ProgressCalendar history={history} />
            <History entries={historyEntries} />
          </div>

          <div className="secondary-column">
            <Settings
              settings={settings}
              onSave={handleSaveSettings}
              onReset={handleResetSettings}
            />

            <section className="card">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Prompt library</p>
                  <h2>{filteredPrompts.length} available prompts</h2>
                </div>
              </div>

              {filteredPrompts.length === 0 ? (
                <div className="empty-state">
                  <p>No prompts in this view yet.</p>
                  <span>Choose another category and we will refill the library.</span>
                </div>
              ) : (
                <ul className="library-list">
                  {filteredPrompts.slice(0, 8).map((prompt) => (
                    <li key={prompt.id}>
                      <strong>{prompt.category}</strong>
                      <span className="list-tone">{titleCase(prompt.tone)}</span>
                      {prompt.isCustom ? <span className="custom-badge">Custom</span> : null}
                      <p>{prompt.text.replaceAll('{{partner}}', settings.partnerName)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <CustomPromptForm
              categories={categories}
              tones={toneOptions}
              partnerName={settings.partnerName}
              entries={customPrompts}
              onCreate={handleCreateCustomPrompt}
              onUsePrompt={handleChooseFavorite}
              onDeletePrompt={handleDeleteCustomPrompt}
            />

            <Favorites
              entries={favorites}
              partnerName={settings.partnerName}
              onChoose={handleChooseFavorite}
            />

            <section className="card encouragement-card">
              <p className="eyebrow">Why it works</p>
              <h2>Consistency beats intensity.</h2>
              <p className="section-copy">
                The best relationship habits are small enough to repeat. This
                app keeps the emotional bar clear, personal, and doable.
              </p>

              <div className="progress-meter" aria-hidden="true">
                <div
                  className="progress-meter-fill"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>

              <p className="support-copy">
                Portfolio note: this interface uses local state, persistent
                storage, adaptive filtering, and motion-first CSS polish without
                relying on a backend.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
