const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildCalendarDays(entriesByDate) {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const leadingDays = monthStart.getDay();
  const days = [];

  for (let index = 0; index < leadingDays; index += 1) {
    days.push({ type: 'empty', key: `empty-start-${index}` });
  }

  for (let day = 1; day <= monthEnd.getDate(); day += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const dateKey = date.toISOString().slice(0, 10);
    const count = entriesByDate[dateKey] ?? 0;
    const isToday = day === today.getDate();

    days.push({
      type: 'day',
      key: dateKey,
      label: day,
      count,
      isToday,
    });
  }

  return {
    monthLabel: new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(today),
    days,
  };
}

function ProgressCalendar({ history }) {
  const entriesByDate = history.reduce((accumulator, entry) => {
    accumulator[entry.dateKey] = (accumulator[entry.dateKey] ?? 0) + 1;
    return accumulator;
  }, {});

  const { monthLabel, days } = buildCalendarDays(entriesByDate);

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Consistency view</p>
          <h2>{monthLabel}</h2>
        </div>
      </div>

      <div className="calendar-grid" aria-label="Monthly completion calendar">
        {weekdayLabels.map((label) => (
          <span key={label} className="calendar-weekday">
            {label}
          </span>
        ))}

        {days.map((day) =>
          day.type === 'empty' ? (
            <span key={day.key} className="calendar-day calendar-day-empty" />
          ) : (
            <div
              key={day.key}
              className={`calendar-day ${
                day.count > 0 ? 'calendar-day-complete' : ''
              } ${day.isToday ? 'calendar-day-today' : ''}`}
              title={
                day.count > 0
                  ? `${day.count} completed act${day.count === 1 ? '' : 's'}`
                  : 'No completed acts'
              }
            >
              <span>{day.label}</span>
              {day.count > 0 ? <small>{day.count}</small> : null}
            </div>
          ),
        )}
      </div>

      <p className="support-copy calendar-copy">
        Filled days show how often kindness happened this month, not just
        whether it happened once.
      </p>
    </section>
  );
}

export default ProgressCalendar;
