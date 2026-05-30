const HourlyForecast = ({ data }) => {
  if (!data?.length) return null;

  const now = Date.now();
  const upcoming = data.filter((hour) => hour.time_epoch * 1000 >= now - 3600000);

  return (
    <section className="hourly-forecast glass-panel">
      <div className="section-head">
        <h3>Hourly</h3>
        <p>Next {upcoming.length} hours</p>
      </div>

      <div className="hourly-list">
        {upcoming.map((hour) => (
          <article key={hour.time_epoch} className="hourly-item">
            <time dateTime={hour.time}>
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            <img
              src={`https:${hour.condition.icon}`}
              alt={hour.condition.text}
            />
            <p className="hourly-temp">{Math.round(hour.temp_c)}°</p>
            <p className="hourly-rain">{hour.chance_of_rain}%</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HourlyForecast;
