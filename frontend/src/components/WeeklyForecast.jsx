const WeeklyForecast = ({ data }) => {
  if (!data?.length) return null;

  const globalMax = Math.max(...data.map((d) => d.day.maxtemp_c));
  const globalMin = Math.min(...data.map((d) => d.day.mintemp_c));
  const range = globalMax - globalMin || 1;

  return (
    <section className="weekly-forecast glass-panel">
      <div className="section-head">
        <h3>7-Day Outlook</h3>
        <p>Extended forecast</p>
      </div>

      <div className="weekly-list">
        {data.map((day) => {
          const lowPct = ((day.day.mintemp_c - globalMin) / range) * 100;
          const highPct = ((day.day.maxtemp_c - globalMin) / range) * 100;

          return (
            <article key={day.date} className="weekly-item">
              <div className="weekly-day">
                <p className="day-name">
                  {new Date(day.date).toLocaleDateString([], {
                    weekday: "short",
                  })}
                </p>
                <p className="day-date">
                  {new Date(day.date).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="weekly-condition">
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                />
                <p>{day.day.condition.text}</p>
              </div>

              <div className="weekly-temps">
                <span className="temp-low">{Math.round(day.day.mintemp_c)}°</span>
                <div className="temp-bar" aria-hidden="true">
                  <span
                    className="temp-bar-fill"
                    style={{
                      left: `${lowPct}%`,
                      width: `${Math.max(highPct - lowPct, 8)}%`,
                    }}
                  />
                </div>
                <span className="temp-high">{Math.round(day.day.maxtemp_c)}°</span>
              </div>

              <p className="weekly-rain">{day.day.daily_chance_of_rain}% rain</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WeeklyForecast;
