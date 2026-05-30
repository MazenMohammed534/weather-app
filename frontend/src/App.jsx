import { useEffect, useMemo, useState } from "react";
import { getWeatherData } from "./api";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";

const getWeatherTheme = (condition, isDay) => {
  const code = condition?.code ?? 1000;

  if (!isDay) return "theme-night";
  if (code === 1000) return "theme-sunny";
  if ([1003, 1006, 1009].includes(code)) return "theme-cloudy";
  if (
    [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)
  )
    return "theme-rain";
  if (
    [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(
      code,
    )
  )
    return "theme-snow";

  return "theme-default";
};

function App() {
  const [city, setCity] = useState("Cairo");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getWeatherData(city);

        const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day;
        setWeatherData({
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch weather data");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const theme = useMemo(() => {
    if (!weatherData?.current) return "theme-default";
    return getWeatherTheme(
      weatherData.current.condition,
      weatherData.current.is_day,
    );
  }, [weatherData]);

  return (
    <div className={`app ${theme}`}>
      <div className="app-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="container">
        <header className="app-header">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">
              ⛈
            </span>
            <div>
              <h1>Forecast & Furious</h1>
              <p>Live weather, zero drama</p>
            </div>
          </div>
          <SearchBar onSearch={setCity} loading={loading} />
        </header>

        {loading && !weatherData && (
          <div className="state-panel loading-panel" aria-live="polite">
            <div className="loader" />
            <p>Scanning the skies for {city}…</p>
          </div>
        )}

        {error && (
          <div className="state-panel error-panel" role="alert">
            <span className="error-icon" aria-hidden="true">
              ⚠
            </span>
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <main className={`dashboard ${loading ? "is-refreshing" : ""}`}>
            <CurrentWeather
              data={weatherData.current}
              location={weatherData.location}
            />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
