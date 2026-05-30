# Weather App

Full-stack weather app built with React (Vite) and Express.

## Prerequisites

- Node.js 18+
- [WeatherAPI](https://www.weatherapi.com/) key

## Local development

### 1. Backend

```bash
cd server
cp .env.example .env
# Add your API_KEY to .env
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend proxies `/api` to `http://localhost:5000` during development.

## Production build

```bash
cd frontend
npm install
npm run build

cd ../server
npm install
# Set NODE_ENV=production, API_KEY, and CLIENT_URL in .env
npm start
```

In production, the Express server:

- serves the built React app from `frontend/dist`
- exposes `/api/weather` and `/api/health`

## Environment variables

| Variable | Where | Description |
|----------|-------|-------------|
| `API_KEY` | server | WeatherAPI key (required) |
| `PORT` | server | Server port (default: 5000) |
| `NODE_ENV` | server | Set to `production` when deploying |
| `CLIENT_URL` | server | Allowed frontend origin(s), comma-separated |
| `VITE_API_URL` | frontend | Optional API base URL for split deployments |

## Security checklist

- Never commit `.env` files
- Rotate your API key if it was shared publicly
- Set `CLIENT_URL` in production
- Keep dependencies updated

## Deploying

Works on Render, Railway, Fly.io, or any Node host:

1. Build the frontend (`npm run build` in `frontend`)
2. Deploy the `server` folder with `NODE_ENV=production`
3. Set environment variables in the host dashboard
4. Ensure the start command is `npm start`
