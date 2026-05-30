const CurrentWeather = ({ data, location }) => {
  if (!data || !location) return null;

  const localTime = new Date(location.localtime).toLocaleString([], {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="current-weather glass-panel">
      <div className="current-main">
        <div className="current-location">
          <p className="eyebrow">Current conditions</p>
          <h2>
            {location.name}
            <span>, {location.country}</span>
          </h2>
          <p className="local-time">{localTime}</p>
        </div>

        <div className="current-hero">
          <img
            className="weather-icon-lg"
            src={`https:${data.condition.icon}`}
            alt={data.condition.text}
          />
          <div className="temperature-block">
            <p className="temperature">{Math.round(data.temp_c)}°</p>
            <p className="condition-text">{data.condition.text}</p>
            <p className="feels-like">Feels like {Math.round(data.feelslike_c)}°</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Low / High</span>
          <span className="stat-value">
            {Math.round(data.mintemp_c)}° / {Math.round(data.maxtemp_c)}°
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{data.humidity}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Wind</span>
          <span className="stat-value">{Math.round(data.wind_kph)} km/h</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">UV Index</span>
          <span className="stat-value">{data.uv}</span>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
