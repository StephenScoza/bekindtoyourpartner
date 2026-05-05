function History({ entries }) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Progress log</p>
          <h2>Completion history</h2>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>No completed acts yet.</p>
          <span>Your first check-in will show up here with the prompt you chose.</span>
        </div>
      ) : (
        <ul className="history-list">
          {entries.map((entry) => (
            <li key={entry.id} className="history-item">
              <div>
                <strong>{entry.category}</strong>
                <p>{entry.text}</p>
                {entry.note ? <span className="history-note">“{entry.note}”</span> : null}
              </div>
              <time dateTime={entry.completedAt}>{entry.completedLabel}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default History;
