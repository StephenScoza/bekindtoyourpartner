import { useState } from 'react';

const labels = {
  gentle: 'Gentle',
  playful: 'Playful',
  direct: 'Direct',
};

function Settings({ settings, onSave, onReset }) {
  const [isEditing, setIsEditing] = useState(false);
  const [partnerName, setPartnerName] = useState(settings.partnerName);
  const [reminderStyle, setReminderStyle] = useState(settings.reminderStyle);

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
    setIsEditing(false);
  }

  function handleCancel() {
    setPartnerName(settings.partnerName);
    setReminderStyle(settings.reminderStyle);
    setIsEditing(false);
  }

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your setup</p>
          <h2>Settings</h2>
        </div>
        {!isEditing && (
          <button className="ghost-button" type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form className="settings-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Partner&apos;s name</span>
            <input
              type="text"
              value={partnerName}
              onChange={(event) => setPartnerName(event.target.value)}
              maxLength={40}
              required
            />
          </label>

          <label className="field">
            <span>Reminder style</span>
            <select
              value={reminderStyle}
              onChange={(event) => setReminderStyle(event.target.value)}
            >
              {Object.entries(labels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="button-row">
            <button className="primary-button" type="submit">
              Save changes
            </button>
            <button className="secondary-button" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="settings-summary">
          <p>
            Partner: <strong>{settings.partnerName}</strong>
          </p>
          <p>
            Style: <strong>{labels[settings.reminderStyle]}</strong>
          </p>
          <button className="text-button" type="button" onClick={onReset}>
            Start onboarding again
          </button>
        </div>
      )}
    </section>
  );
}

export default Settings;
