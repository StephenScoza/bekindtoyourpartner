import { useState } from 'react';

function CustomPromptForm({
  categories,
  tones,
  partnerName,
  entries,
  onCreate,
  onUsePrompt,
  onDeletePrompt,
}) {
  const [category, setCategory] = useState(categories[0]);
  const [tone, setTone] = useState(tones[0]);
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    onCreate({
      category,
      tone,
      text: trimmedText,
    });

    setText('');
  }

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Make it yours</p>
          <h2>Create a custom prompt</h2>
        </div>
      </div>

      <p className="section-copy">
        Add your own kindness rituals for {partnerName}. You can write the name
        directly, or use <code>{'{{partner}}'}</code> to keep it dynamic.
      </p>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="option-grid option-grid-form">
          <label className="field">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Tone</span>
            <select value={tone} onChange={(event) => setTone(event.target.value)}>
              {tones.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="field">
          <span>Prompt text</span>
          <textarea
            rows="4"
            maxLength="220"
            placeholder={`Example: Leave ${partnerName} a voice note naming one thing you admire about them.`}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>

        <button className="primary-button" type="submit">
          Save custom prompt
        </button>
      </form>

      {entries.length === 0 ? (
        <div className="empty-state custom-empty-state">
          <p>No custom prompts yet.</p>
          <span>Your inside jokes, rituals, and favorite gestures can live here.</span>
        </div>
      ) : (
        <ul className="library-list custom-prompt-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.category}</strong>
              <span className="list-tone">{entry.tone}</span>
              <span className="custom-badge">Custom</span>
              <p>{entry.text.replaceAll('{{partner}}', partnerName)}</p>
              <div className="inline-actions">
                <button
                  className="text-button"
                  type="button"
                  onClick={() => onUsePrompt(entry.id)}
                >
                  Make this today&apos;s prompt
                </button>
                <button
                  className="text-button text-button-muted"
                  type="button"
                  onClick={() => onDeletePrompt(entry.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CustomPromptForm;
