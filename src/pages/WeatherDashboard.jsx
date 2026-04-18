import { AnimatePresence, motion } from 'framer-motion';
import { CloudSun, Compass, Sparkles } from 'lucide-react';
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
import UnitToggle from '../components/UnitToggle';
import WeatherDetailsPanel from '../components/WeatherDetailsPanel';
import { useWeather } from '../hooks/useWeather';
import { getThemePalette } from '../utils/weather';

const revealContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const revealRow = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10"
                style={{ boxShadow: `0 0 0 1px ${palette.border}` }}
              >
                <CloudSun size={20} />
              </div>
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Whether
                </h1>
                <p className="text-sm text-slate-400">
                  {weather?.meta?.source === 'fallback' ? 'Demo mode' : 'Live weather'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Compass size={16} />
              <UnitToggle unit={unit} onChange={setUnit} />
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
                className="grid gap-6 xl:grid-cols-[1fr_1fr]"
              >
                <DailyForecast daily={weather.daily} />
                <HourlyForecast hourly={weather.hourly} />
              </motion.div>

              <motion.div
                variants={revealRow}
                className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]"
              >
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
