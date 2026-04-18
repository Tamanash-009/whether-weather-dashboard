const WEATHER_CODES = {
  0: { label: 'Clear sky', theme: 'clear', icon: 'clear' },
  1: { label: 'Mainly clear', theme: 'clear', icon: 'partly-cloudy' },
  2: { label: 'Partly cloudy', theme: 'clouds', icon: 'partly-cloudy' },
  3: { label: 'Overcast', theme: 'clouds', icon: 'clouds' },
  45: { label: 'Fog', theme: 'fog', icon: 'fog' },
  48: { label: 'Rime fog', theme: 'fog', icon: 'fog' },
  51: { label: 'Light drizzle', theme: 'rain', icon: 'drizzle' },
  53: { label: 'Drizzle', theme: 'rain', icon: 'drizzle' },
  55: { label: 'Dense drizzle', theme: 'rain', icon: 'drizzle' },
  56: { label: 'Freezing drizzle', theme: 'snow', icon: 'sleet' },
  57: { label: 'Freezing drizzle', theme: 'snow', icon: 'sleet' },
  61: { label: 'Light rain', theme: 'rain', icon: 'rain' },
  63: { label: 'Rain', theme: 'rain', icon: 'rain' },
  65: { label: 'Heavy rain', theme: 'rain', icon: 'rain' },
  66: { label: 'Freezing rain', theme: 'snow', icon: 'sleet' },
  67: { label: 'Freezing rain', theme: 'snow', icon: 'sleet' },
  71: { label: 'Light snow', theme: 'snow', icon: 'snow' },
  73: { label: 'Snow', theme: 'snow', icon: 'snow' },
  75: { label: 'Heavy snow', theme: 'snow', icon: 'snow' },
  77: { label: 'Snow grains', theme: 'snow', icon: 'snow' },
  80: { label: 'Rain showers', theme: 'rain', icon: 'rain' },
  81: { label: 'Rain showers', theme: 'rain', icon: 'rain' },
  82: { label: 'Violent rain', theme: 'storm', icon: 'storm' },
  85: { label: 'Snow showers', theme: 'snow', icon: 'snow' },
  86: { label: 'Heavy snow showers', theme: 'snow', icon: 'snow' },
  95: { label: 'Thunderstorm', theme: 'storm', icon: 'storm' },
  96: { label: 'Thunderstorm hail', theme: 'storm', icon: 'storm' },
  99: { label: 'Thunderstorm hail', theme: 'storm', icon: 'storm' },
};

export const THEME_STYLES = {
  clear: {
    gradient: 'from-[#0b1339] via-[#2451ff] to-[#1c0b4d]',
    accent: '#f8d56d',
    accentSoft: 'rgba(248, 213, 109, 0.28)',
    chartStart: '#7dd3fc',
    chartEnd: '#fde68a',
    border: 'rgba(147, 197, 253, 0.26)',
  },
  night: {
    gradient: 'from-[#050816] via-[#112258] to-[#17062d]',
    accent: '#c4b5fd',
    accentSoft: 'rgba(196, 181, 253, 0.28)',
    chartStart: '#a5b4fc',
    chartEnd: '#67e8f9',
    border: 'rgba(167, 139, 250, 0.22)',
  },
  clouds: {
    gradient: 'from-[#101f3f] via-[#2a4677] to-[#100f32]',
    accent: '#bae6fd',
    accentSoft: 'rgba(186, 230, 253, 0.24)',
    chartStart: '#c4b5fd',
    chartEnd: '#93c5fd',
    border: 'rgba(191, 219, 254, 0.2)',
  },
  fog: {
    gradient: 'from-[#0f172a] via-[#334155] to-[#111827]',
    accent: '#d8dee9',
    accentSoft: 'rgba(216, 222, 233, 0.2)',
    chartStart: '#e2e8f0',
    chartEnd: '#93c5fd',
    border: 'rgba(226, 232, 240, 0.14)',
  },
  rain: {
    gradient: 'from-[#081329] via-[#123865] to-[#09091b]',
    accent: '#67e8f9',
    accentSoft: 'rgba(103, 232, 249, 0.22)',
    chartStart: '#38bdf8',
    chartEnd: '#67e8f9',
    border: 'rgba(103, 232, 249, 0.18)',
  },
  snow: {
    gradient: 'from-[#091425] via-[#29507a] to-[#121d3d]',
    accent: '#e0f2fe',
    accentSoft: 'rgba(224, 242, 254, 0.22)',
    chartStart: '#e0f2fe',
    chartEnd: '#bae6fd',
    border: 'rgba(224, 242, 254, 0.22)',
  },
  storm: {
    gradient: 'from-[#050816] via-[#241440] to-[#05060f]',
    accent: '#f9a8d4',
    accentSoft: 'rgba(249, 168, 212, 0.2)',
    chartStart: '#a78bfa',
    chartEnd: '#f472b6',
    border: 'rgba(196, 181, 253, 0.18)',
  },
};

function parseDateParts(value) {
  if (!value) {
    return null;
  }

  const [datePart, timePart = '00:00'] = value.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour = 0, minute = 0] = timePart.split(':').map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

function getHourFromDateString(value) {
  if (!value || !value.includes('T')) {
    return 12;
  }

  const [, timePart = '12:00'] = value.split('T');
  const [hour = 12] = timePart.split(':').map(Number);

  return hour;
}

function roundValue(value) {
  return Math.round(Number(value));
}

export function getWeatherDescriptor(code, isDay = true) {
  const descriptor = WEATHER_CODES[code] ?? WEATHER_CODES[0];

  if (!isDay && (descriptor.theme === 'clear' || descriptor.theme === 'clouds')) {
    return {
      ...descriptor,
      theme: 'night',
      icon: descriptor.theme === 'clear' ? 'night-clear' : 'night-clouds',
    };
  }

  return descriptor;
}

export function formatTemperature(value, unit = 'celsius') {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '--';
  }

  return `${roundValue(value)}\u00B0${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

export function formatNumericTemperature(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '--';
  }

  return `${roundValue(value)}\u00B0`;
}

export function formatTime(value) {
  const parsed = parseDateParts(value);
  if (!parsed) {
    return '--';
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(parsed);
}

export function formatDateTime(value) {
  const parsed = parseDateParts(value);
  if (!parsed) {
    return '--';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(parsed);
}

export function formatShortDay(value) {
  const parsed = parseDateParts(value);
  if (!parsed) {
    return '--';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(parsed);
}

export function formatMonthDay(value) {
  const parsed = parseDateParts(value);
  if (!parsed) {
    return '--';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

export function formatVisibility(valueInMeters) {
  if (valueInMeters === null || valueInMeters === undefined) {
    return '--';
  }

  return `${(Number(valueInMeters) / 1000).toFixed(1)} km`;
}

export function formatWindSpeed(value, unit = 'celsius') {
  if (value === null || value === undefined) {
    return '--';
  }

  return `${roundValue(value)} ${unit === 'fahrenheit' ? 'mph' : 'km/h'}`;
}

export function formatPressure(value) {
  if (value === null || value === undefined) {
    return '--';
  }

  return `${roundValue(value)} hPa`;
}

export function formatHumidity(value) {
  if (value === null || value === undefined) {
    return '--';
  }

  return `${roundValue(value)}%`;
}

export function formatUvIndex(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '--';
  }

  return Number(value).toFixed(1);
}

export function getThemePalette(theme) {
  return THEME_STYLES[theme] ?? THEME_STYLES.clear;
}

export function transformWeatherData({ forecast, location, unit }) {
  const currentTime = forecast?.current?.time;
  const currentIndex = Math.max(
    0,
    forecast?.hourly?.time?.indexOf(currentTime) ?? 0,
  );
  const descriptor = getWeatherDescriptor(
    forecast.current.weather_code,
    Boolean(forecast.current.is_day),
  );
  const theme = descriptor.theme;
  const hourlySlice = forecast.hourly.time.slice(currentIndex, currentIndex + 24);
  const timezoneLabel =
    forecast.timezone_abbreviation || forecast.timezone || 'Local time';
  const currentUv =
    forecast.hourly?.uv_index?.[currentIndex] ??
    forecast.daily?.uv_index_max?.[0] ??
    null;

  return {
    location: {
      city: location.name,
      region: location.admin1 || location.country || '',
      country: location.country || '',
      latitude: location.latitude,
      longitude: location.longitude,
      label: [location.name, location.admin1, location.country]
        .filter(Boolean)
        .join(', '),
    },
    current: {
      city: location.name,
      temperature: roundValue(forecast.current.temperature_2m),
      feelsLike: roundValue(forecast.current.apparent_temperature),
      condition: descriptor.label,
      icon: descriptor.icon,
      weatherCode: forecast.current.weather_code,
      isDay: Boolean(forecast.current.is_day),
      humidity: roundValue(forecast.current.relative_humidity_2m),
      windSpeed: roundValue(forecast.current.wind_speed_10m),
      pressure: roundValue(forecast.current.pressure_msl),
      visibility: Math.round(Number(forecast.current.visibility) / 100) / 10,
      visibilityMeters: Number(forecast.current.visibility),
      uvIndex: currentUv,
      time: currentTime,
      high: roundValue(forecast.daily.temperature_2m_max?.[0]),
      low: roundValue(forecast.daily.temperature_2m_min?.[0]),
    },
    hourly: hourlySlice.map((time, index) => {
      const absoluteIndex = currentIndex + index;
      const hour = getHourFromDateString(time);
      const hourlyDescriptor = getWeatherDescriptor(
        forecast.hourly.weather_code[absoluteIndex],
        hour >= 6 && hour < 18,
      );

      return {
        time,
        label: index === 0 ? 'Now' : formatTime(time),
        temperature: roundValue(forecast.hourly.temperature_2m[absoluteIndex]),
        weatherCode: forecast.hourly.weather_code[absoluteIndex],
        icon: hourlyDescriptor.icon,
        condition: hourlyDescriptor.label,
        uvIndex: forecast.hourly.uv_index?.[absoluteIndex] ?? null,
      };
    }),
    daily: forecast.daily.time.slice(0, 7).map((time, index) => {
      const dailyDescriptor = getWeatherDescriptor(
        forecast.daily.weather_code[index],
      );

      return {
        time,
        day: index === 0 ? 'Today' : formatShortDay(time),
        date: formatMonthDay(time),
        weatherCode: forecast.daily.weather_code[index],
        icon: dailyDescriptor.icon,
        condition: dailyDescriptor.label,
        min: roundValue(forecast.daily.temperature_2m_min[index]),
        max: roundValue(forecast.daily.temperature_2m_max[index]),
      };
    }),
    astro: {
      sunrise: forecast.daily.sunrise?.[0] ?? null,
      sunset: forecast.daily.sunset?.[0] ?? null,
    },
    meta: {
      theme,
      source: 'live',
      timezone: timezoneLabel,
      unit,
      updatedAt: currentTime,
      isUserLocation: Boolean(location.isUserLocation),
    },
  };
}
