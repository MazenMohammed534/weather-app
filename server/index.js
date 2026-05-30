const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || !isProduction || allowedOrigins.length === 0) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

const isValidCity = (city) => {
  if (typeof city !== "string") return false;

  const trimmed = city.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/weather", async (req, res) => {
  try {
    const { city } = req.query;

    if (!isValidCity(city)) {
      return res.status(400).json({ error: "Please provide a valid city name." });
    }

    if (!process.env.API_KEY) {
      console.error("API_KEY is missing");
      return res.status(500).json({ error: "Weather service is not configured." });
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${encodeURIComponent(city.trim())}&days=7`,
    );

    if (!response.ok) {
      console.error(`Weather API error: ${response.status}`);

      if (response.status === 400) {
        return res.status(404).json({ error: "City not found." });
      }

      return res.status(502).json({ error: "Failed to fetch weather data." });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

if (isProduction) {
  const clientDist = path.join(__dirname, "../frontend/dist");

  app.use(express.static(clientDist));

  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${isProduction ? "production" : "development"})`);
});
