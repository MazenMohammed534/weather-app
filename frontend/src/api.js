const API_BASE = import.meta.env.VITE_API_URL ?? "";

export const getWeatherData = async (cityName) => {
  const response = await fetch(
    `${API_BASE}/api/weather?city=${encodeURIComponent(cityName)}`,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch weather data");
  }

  return response.json();
};
