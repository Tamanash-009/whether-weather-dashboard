# Whether

A premium animated weather dashboard built with React, Vite, Tailwind CSS, Framer Motion, Recharts, and the Open-Meteo APIs.

## Features

- City search with live weather data
- Automatic location detection
- Dynamic atmospheric backgrounds
- Animated current weather hero
- Hourly and 7-day forecasts
- Temperature chart and weather details
- Local fallback demo data when live requests fail
- Favorites and last searched city persistence

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Axios
- Open-Meteo Geocoding + Forecast APIs

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment Notes

- This app is ready for static deployment on Vercel.
- No API key is required because it uses Open-Meteo.
- The framework is Vite, so Vercel can auto-detect the correct build settings.

Recommended Vercel settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Project Structure

```text
src/
  assets/
  components/
  hooks/
  pages/
  services/
  utils/
```

## Status

Verified with:

```bash
npm run build
```
