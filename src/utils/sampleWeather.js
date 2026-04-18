import { transformWeatherData } from './weather';

function hashString(value) {
  return Array.from(value).reduce(
    (hash, character) => character.charCodeAt(0) + ((hash << 5) - hash),
    0,
  );
}

function padNumber(value) {
  return String(value).padStart(2, '0');
}

function isoLocalString(date) {
  return [
    date.getUTCFullYear(),
    padNumber(date.getUTCMonth() + 1),
    padNumber(date.getUTCDate()),
  ].join('-') +
    `T${padNumber(date.getUTCHours())}:${padNumber(date.getUTCMinutes())}`;
}

function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const WEATHER_VARIANTS = {
  clear: [0, 1, 2],
  clouds: [2, 3, 45],
  rain: [61, 63, 80],
  snow: [71, 73, 85],
};

export function createFallbackWeatherData(city = 'New York', unit = 'celsius') {
  const seed = Math.abs(hashString(city || 'Weather'));
  const variantKeys = ['clear', 'clouds', 'rain', 'snow'];
  const selectedVariant = variantKeys[seed % variantKeys.length];
  const variantCodes = WEATHER_VARIANTS[selectedVariant];
  const baseDate = new Date();
  const now = new Date(
    Date.UTC(
      baseDate.getUTCFullYear(),
      baseDate.getUTCMonth(),
      baseDate.getUTCDate(),
      baseDate.getUTCHours(),
      0,
      0,
      0,
    ),
  );
  const baseTemp = unit === 'fahrenheit' ? 66 + (seed % 10) : 17 + (seed % 8);
  const humidityBase = 46 + (seed % 25);
  const windBase = unit === 'fahrenheit' ? 8 + (seed % 7) : 12 + (seed % 10);
  const pressureBase = 1008 + (seed % 12);

  const hourlyTimes = Array.from({ length: 48 }, (_, index) =>
    isoLocalString(addHours(now, index)),
  );
  const hourlyTemps = hourlyTimes.map((_, index) => {
    const wave = Math.sin((index / 24) * Math.PI * 2) * (unit === 'fahrenheit' ? 8 : 4);
    const drift = ((seed % 5) - 2) * 0.35;
    return clamp(baseTemp + wave + drift, unit === 'fahrenheit' ? 24 : -6, unit === 'fahrenheit' ? 102 : 39);
  });
  const hourlyCodes = hourlyTimes.map((_, index) => variantCodes[index % variantCodes.length]);
  const hourlyUv = hourlyTimes.map((_, index) => {
    const sunPeak = Math.max(0, Math.sin(((index % 24) - 6) / 12 * Math.PI));
    return Number((sunPeak * 7.5).toFixed(1));
  });

  const dailyTimes = Array.from({ length: 7 }, (_, index) =>
    isoLocalString(addDays(now, index)).slice(0, 10),
  );
  const dailyHighs = dailyTimes.map((_, index) =>
    clamp(baseTemp + 3 + Math.sin(index * 0.7) * (unit === 'fahrenheit' ? 4 : 2.4), unit === 'fahrenheit' ? 28 : -3, unit === 'fahrenheit' ? 104 : 40),
  );
  const dailyLows = dailyHighs.map((value, index) =>
    value - (unit === 'fahrenheit' ? 8 + (index % 3) : 4 + (index % 3)),
  );

  const forecast = {
    timezone: 'Demo',
    timezone_abbreviation: 'DEMO',
    current: {
      time: hourlyTimes[0],
      temperature_2m: hourlyTemps[0],
      apparent_temperature: hourlyTemps[0] - (unit === 'fahrenheit' ? 2 : 1),
      weather_code: hourlyCodes[0],
      relative_humidity_2m: humidityBase,
      wind_speed_10m: windBase,
      pressure_msl: pressureBase,
      visibility: 9200,
      is_day: 1,
    },
    hourly: {
      time: hourlyTimes,
      temperature_2m: hourlyTemps,
      weather_code: hourlyCodes,
      uv_index: hourlyUv,
    },
    daily: {
      time: dailyTimes,
      weather_code: Array.from({ length: 7 }, (_, index) => variantCodes[index % variantCodes.length]),
      temperature_2m_max: dailyHighs,
      temperature_2m_min: dailyLows,
      sunrise: dailyTimes.map((date) => `${date}T06:18`),
      sunset: dailyTimes.map((date) => `${date}T18:42`),
      uv_index_max: Array.from({ length: 7 }, (_, index) => Number((4.4 + (index % 3) * 1.2).toFixed(1))),
    },
  };

  const transformed = transformWeatherData({
    forecast,
    location: {
      name: city,
      admin1: 'Demo Forecast',
      country: 'Offline',
      latitude: 0,
      longitude: 0,
    },
    unit,
  });

  return {
    ...transformed,
    meta: {
      ...transformed.meta,
      source: 'fallback',
    },
  };
}
