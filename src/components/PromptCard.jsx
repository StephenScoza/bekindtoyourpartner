function PromptCard({
  prompt,
  partnerName,
  reminderLabel,
  onComplete,
  onRefresh,
  completionCount,
}) {
  if (!prompt) {
    return (
      <section className="card prompt-card empty-card">
        <h2>No prompt matches this filter yet</h2>
        <p>
          Try another category and we&apos;ll bring a fresh kindness idea back
          into view.
        </p>
      </section>
    );
  }

  const personalizedText = prompt.text.replaceAll('{{partner}}', partnerName);

  return (
    <section className="card prompt-card">
      <div className="prompt-header">
        <div>
          <p className="eyebrow">Today&apos;s featured act</p>
          <h2>{prompt.category}</h2>
        </div>
        <span className="tone-pill">{reminderLabel}</span>
      </div>

      <p className="prompt-text">{personalizedText}</p>

      <p className="support-copy">
        {completionCount > 0
          ? `You have logged ${completionCount} kind acts so far. Keep the warmth going.`
          : 'Start small. Tiny acts done consistently matter more than perfect plans.'}
      </p>

      <div className="button-row">
        <button className="primary-button" type="button" onClick={onComplete}>
          I did this ❤️
        </button>
        <button className="secondary-button" type="button" onClick={onRefresh}>
          New prompt
        </button>
      </div>
    </section>
  );
}

export default PromptCard;
