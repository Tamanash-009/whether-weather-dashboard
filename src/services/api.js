import axios from 'axios';

const geocodingApi = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1',
  timeout: 10000,
});

const forecastApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
});

const FORECAST_FIELDS = {
  current: [
    'temperature_2m',
    'apparent_temperature',
    'weather_code',
    'relative_humidity_2m',
    'pressure_msl',
    'visibility',
    'wind_speed_10m',
    'is_day',
  ].join(','),
  hourly: ['temperature_2m', 'weather_code', 'uv_index'].join(','),
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'sunrise',
    'sunset',
    'uv_index_max',
  ].join(','),
};

export async function searchCity(cityName) {
  const { data } = await geocodingApi.get('/search', {
    params: {
      name: cityName,
      count: 1,
      language: 'en',
      format: 'json',
    },
  });

  const result = data?.results?.[0];

  if (!result) {
    const error = new Error(`No city found for "${cityName}"`);
    error.code = 'CITY_NOT_FOUND';
    throw error;
  }

  return result;
}

export async function fetchWeatherForecast({
  latitude,
  longitude,
  unit = 'celsius',
}) {
  const { data } = await forecastApi.get('/forecast', {
    params: {
      latitude,
      longitude,
      timezone: 'auto',
      forecast_days: 7,
      temperature_unit: unit,
      wind_speed_unit: unit === 'fahrenheit' ? 'mph' : 'kmh',
      ...FORECAST_FIELDS,
    },
  });

  return data;
}

export async function fetchWeatherByCity(cityName, unit = 'celsius') {
  const location = await searchCity(cityName);
  const forecast = await fetchWeatherForecast({
    latitude: location.latitude,
    longitude: location.longitude,
    unit,
  });

  return {
    location,
    forecast,
  };
}

export async function fetchWeatherByCoordinates({
  latitude,
  longitude,
  label = 'Your location',
  unit = 'celsius',
}) {
  const forecast = await fetchWeatherForecast({
    latitude,
    longitude,
    unit,
  });

  return {
    location: {
      name: label,
      admin1: '',
      country: '',
      latitude,
      longitude,
      isUserLocation: true,
    },
    forecast,
  };
}
