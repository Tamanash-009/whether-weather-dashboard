import { AnimatePresence, motion } from 'framer-motion';
import { CloudSun, Compass, Radar, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import DailyForecast from '../components/DailyForecast';
import ErrorState from '../components/ErrorState';
import FavoritesPanel from '../components/FavoritesPanel';
import HourlyForecast from '../components/HourlyForecast';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SearchBar from '../components/SearchBar';
import StatusBanner from '../components/StatusBanner';
import TemperatureChart from '../components/TemperatureChart';
import UnitToggle from '../components/UnitToggle';
import WeatherDetailsPanel from '../components/WeatherDetailsPanel';
import { useWeather } from '../hooks/useWeather';
import { getThemePalette } from '../utils/weather';

const revealContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const revealRow = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WeatherDashboard() {
  const {
    weather,
    loading,
    status,
    unit,
    setUnit,
    favorites,
    toggleFavorite,
    lastSearchedCity,
    searchByCity,
    detectLocation,
    clearStatus,
  } = useWeather();
  const [searchValue, setSearchValue] = useState(lastSearchedCity);

  useEffect(() => {
    setSearchValue(lastSearchedCity ?? '');
  }, [lastSearchedCity]);

  const currentCity = weather?.location?.city ?? '';
  const isFavorite = favorites.some(
    (city) => city.toLowerCase() === currentCity.toLowerCase(),
  );
  const theme = weather?.meta?.theme ?? 'clear';
  const palette = getThemePalette(theme);

  function handleSubmit(event) {
    event.preventDefault();
    searchByCity(searchValue);
  }

  return (
    <div className="app-shell relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground theme={theme} />

      <main className="relative z-10 mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <motion.header
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-100/90">
              <Sparkles size={14} />
              Premium weather system
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10"
                style={{ boxShadow: `0 0 0 1px ${palette.border}` }}
              >
                <CloudSun size={22} />
              </div>
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Whether
                </p>
                <p className="mt-1 text-sm text-slate-300/80">
                  A more cinematic, mobile-inspired weather dashboard with real-time atmosphere and polished detail.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[26px] border border-white/10 bg-white/6 px-4 py-3">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-300/65">
                <Radar size={14} />
                Data source
              </div>
              <p className="mt-2 text-sm font-semibold text-white">
                {weather?.meta?.source === 'fallback' ? 'Smart demo forecast' : 'Live forecast feed'}
              </p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-white/6 px-4 py-3">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-300/65">
                <Compass size={14} />
                Units
              </div>
              <div className="mt-3">
                <UnitToggle unit={unit} onChange={setUnit} />
              </div>
            </div>
          </div>
        </motion.header>

        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handleSubmit}
          onDetectLocation={detectLocation}
          loading={loading}
        />

        <StatusBanner status={status} onDismiss={clearStatus} />

        {!weather && loading ? <LoadingSkeleton /> : null}

        {!weather && !loading && status ? (
          <ErrorState
            message={status.message}
            onRetry={() => searchByCity(searchValue || lastSearchedCity || 'New York')}
            onLoadDefault={() => searchByCity(lastSearchedCity || 'New York')}
          />
        ) : null}

        <AnimatePresence mode="wait">
          {weather ? (
            <motion.div
              key={`${weather.location.city}-${unit}-${weather.meta.source}`}
              variants={revealContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 space-y-6"
            >
              <motion.div
                variants={revealRow}
                className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]"
              >
                <CurrentWeatherCard
                  weather={weather}
                  palette={palette}
                  isFavorite={isFavorite}
                  hourly={weather.hourly}
                  onToggleFavorite={() => toggleFavorite(weather.location.city)}
                />
                <WeatherDetailsPanel
                  weather={weather}
                  unit={unit}
                  palette={palette}
                />
              </motion.div>

              <motion.div
                variants={revealRow}
                className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]"
              >
                <TemperatureChart hourly={weather.hourly} palette={palette} />
                <DailyForecast daily={weather.daily} />
              </motion.div>

              <motion.div
                variants={revealRow}
                className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]"
              >
                <HourlyForecast hourly={weather.hourly} />
                <FavoritesPanel
                  favorites={favorites}
                  currentCity={weather.location.city}
                  isFavorite={isFavorite}
                  onSelect={(city) => {
                    setSearchValue(city);
                    searchByCity(city);
                  }}
                  onToggleFavorite={() => toggleFavorite(weather.location.city)}
                />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
