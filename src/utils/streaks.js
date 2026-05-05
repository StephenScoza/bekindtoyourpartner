function uniqueSortedDateKeys(history) {
  return [...new Set(history.map((entry) => entry.dateKey))].sort((a, b) =>
    a > b ? -1 : 1,
  );
}

export function getCurrentStreak(history) {
  const dateKeys = uniqueSortedDateKeys(history);
  const today = new Date();
  const todayDateKey = today.toISOString().slice(0, 10);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayDateKey = yesterday.toISOString().slice(0, 10);

  if (dateKeys.length === 0) {
    return 0;
  }

  if (dateKeys[0] !== todayDateKey && dateKeys[0] !== yesterdayDateKey) {
    return 0;
  }

  let streak = 1;
  let cursor = new Date(`${dateKeys[0]}T12:00:00`);

  for (let index = 1; index < dateKeys.length; index += 1) {
    const nextDate = new Date(`${dateKeys[index]}T12:00:00`);
    const diffDays = Math.round((cursor - nextDate) / 86400000);

    if (diffDays === 1) {
      streak += 1;
      cursor = nextDate;
    } else {
      break;
    }
  }

  return streak;
}

export function getLastCompletedDate(history) {
  if (history.length === 0) {
    return null;
  }

  const sorted = [...history].sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1));
  return sorted[0].completedAt;
}
