function Stats({ totalCompleted, currentStreak, lastCompletedLabel }) {
  const items = [
    {
      label: 'Total completed acts',
      value: totalCompleted,
    },
    {
      label: 'Current streak',
      value: currentStreak === 1 ? '1 day' : `${currentStreak} days`,
    },
    {
      label: 'Last completed',
      value: lastCompletedLabel,
    },
  ];

  return (
    <section className="stats-grid" aria-label="Progress tracking">
      {items.map((item) => (
        <article className="card stat-card" key={item.label}>
          <p>{item.label}</p>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}

export default Stats;
