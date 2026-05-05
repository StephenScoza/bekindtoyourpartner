import { useState } from 'react';

const reminderOptions = [
  {
    value: 'gentle',
    title: 'Gentle',
    description: 'Soft, steady nudges that feel calming and warm.',
  },
  {
    value: 'playful',
    title: 'Playful',
    description: 'Lighter prompts with wit, charm, and a little spark.',
  },
  {
    value: 'direct',
    title: 'Direct',
    description: 'Clear encouragement that gets straight to the kind act.',
  },
];

function Onboarding({ onSave }) {
  const [partnerName, setPartnerName] = useState('');
  const [reminderStyle, setReminderStyle] = useState('gentle');

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedName = partnerName.trim();

    if (!cleanedName) {
      return;
    }

    onSave({
      partnerName: cleanedName,
      reminderStyle,
    });
  }

  return (
    <main className="welcome-shell">
      <section className="hero-panel">
        <p className="eyebrow">Be Kind to Your Partner</p>
        <h1>Practice small acts of love that actually stick.</h1>
        <p className="hero-copy">
          Build a simple daily rhythm of appreciation, support, repair, and
          connection with prompts that feel personal instead of preachy.
        </p>
        <div className="hero-note">
          Kindness is rarely one big gesture. It is the steady little things.
        </div>
      </section>

      <section className="card onboarding-card">
        <h2>Start your kindness rhythm</h2>
        <p className="section-copy">
          A few quick details and we will tailor the daily prompts around your
          relationship.
        </p>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Partner&apos;s name</span>
            <input
              type="text"
              placeholder="Alex"
              value={partnerName}
              onChange={(event) => setPartnerName(event.target.value)}
              maxLength={40}
              required
            />
          </label>

          <fieldset className="field">
            <legend>Preferred reminder style</legend>
            <div className="option-grid">
              {reminderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-card ${
                    reminderStyle === option.value ? 'option-card-active' : ''
                  }`}
                  onClick={() => setReminderStyle(option.value)}
                >
                  <strong>{option.title}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <button className="primary-button" type="submit">
            Save and begin
          </button>
        </form>
      </section>
    </main>
  );
}

export default Onboarding;
