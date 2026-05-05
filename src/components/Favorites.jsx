function Favorites({ entries, partnerName, onChoose }) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Saved inspiration</p>
          <h2>Favorite prompts</h2>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet.</p>
          <span>Save the prompts you want to revisit for {partnerName}.</span>
        </div>
      ) : (
        <ul className="library-list">
          {entries.map((prompt) => (
            <li key={prompt.id}>
              <strong>{prompt.category}</strong>
              <span className="list-tone">{prompt.tone}</span>
              <p>{prompt.text.replaceAll('{{partner}}', partnerName)}</p>
              <button
                className="text-button"
                type="button"
                onClick={() => onChoose(prompt.id)}
              >
                Make this today&apos;s prompt
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Favorites;
