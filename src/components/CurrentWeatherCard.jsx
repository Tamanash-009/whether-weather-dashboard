import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { Droplets, Heart, Sparkles, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import WeatherIcon from './WeatherIcon';
import {
  formatDateTime,
  formatHumidity,
  formatNumericTemperature,
  formatWindSpeed,
} from '../utils/weather';

function QuickStat({ icon: Icon, label, value, accent }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="rounded-[26px] border border-white/10 bg-slate-950/24 px-4 py-3 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-300/65">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: accent }}
        >
          <Icon size={14} />
        </span>
        {label}
      </div>
      <p className="mt-3 text-lg font-semibold text-white sm:text-xl">{value}</p>
    </motion.div>
  );
}

function AnimatedTemperature({ value }) {
  const motionValue = useMotionValue(value);
  const [displayValue, setDisplayValue] = useState(value);

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [motionValue, value]);

  return (
    <>
      {displayValue}
      <span className="align-top text-4xl font-medium sm:text-5xl">&deg;</span>
    </>
  );
}

export default function CurrentWeatherCard({
  weather,
  palette,
  isFavorite,
  onToggleFavorite,
  hourly,
}) {
  const previewHours = hourly.slice(0, 5);

  return (
    <GlassCard className="overflow-hidden rounded-[36px] p-5 sm:p-7" delay={0.05}>
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 22% 0%, ${palette.accentSoft}, transparent 32%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,15,31,0) 0%, rgba(4,15,31,0.18) 36%, rgba(4,15,31,0.56) 100%)',
        }}
      />

      <motion.div
        className="absolute -right-6 top-10 opacity-[0.18] sm:right-0"
        animate={{ y: [0, -10, 0], rotate: [0, 3, -2, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <WeatherIcon
          icon={weather.current.icon}
          size={190}
          strokeWidth={1.1}
          className="text-white"
        />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-100/90">
              <Sparkles size={14} />
              Live atmosphere
            </div>
            <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {weather.location.city}
            </h1>
            <p className="mt-1 text-sm text-slate-300 sm:text-base">
              {weather.location.region || weather.location.country || 'Live conditions'}
            </p>
            <p className="mt-3 text-sm text-slate-300/78">
              {formatDateTime(weather.current.time)} / {weather.meta.timezone}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleFavorite}
            className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isFavorite
                ? 'border-rose-300/35 bg-rose-400/15 text-rose-100'
                : 'border-white/10 bg-white/8 text-white hover:bg-white/12'
            }`}
          >
            <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
            {isFavorite ? 'Saved' : 'Favorite'}
          </button>
        </motion.div>

        <div className="mt-9">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-end gap-5"
          >
            <div className="min-w-[210px]">
              <p className="text-[96px] font-semibold leading-[0.9] text-white sm:text-[118px]">
                <AnimatedTemperature value={weather.current.temperature} />
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white"
                >
                  {weather.current.condition}
                </motion.span>
                <span className="text-sm text-slate-300/85">
                  Feels like {formatNumericTemperature(weather.current.feelsLike)}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-300/78">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span
                    className="pulse-ring absolute h-3 w-3 rounded-full"
                    style={{ background: palette.accentSoft }}
                  />
                  <span
                    className="relative z-10 h-2.5 w-2.5 rounded-full"
                    style={{ background: palette.accent }}
                  />
                </span>
                Motion tuned for live updates
              </div>
            </div>
          </motion.div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <QuickStat
              icon={Sparkles}
              label="Range"
              value={`${weather.current.high}\u00B0 / ${weather.current.low}\u00B0`}
              accent={palette.accentSoft}
            />
            <QuickStat
              icon={Droplets}
              label="Humidity"
              value={formatHumidity(weather.current.humidity)}
              accent="rgba(56, 189, 248, 0.16)"
            />
            <QuickStat
              icon={Wind}
              label="Wind"
              value={formatWindSpeed(weather.current.windSpeed, weather.meta.unit)}
              accent="rgba(96, 165, 250, 0.16)"
            />
          </div>

          <div className="mt-7 rounded-[30px] border border-white/10 bg-slate-950/22 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-slate-300/62">
                  Next hours
                </p>
                <p className="mt-2 text-sm text-slate-300/80">
                  A compact look ahead designed to feel closer to a native weather app.
                </p>
              </div>
            </div>

            <div className="weather-scroll mt-4 overflow-x-auto pb-1">
              <div className="flex min-w-max gap-3">
                {previewHours.map((entry, index) => (
                  <motion.div
                    key={`${entry.time}-${entry.label}`}
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.12 + index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className={`flex min-w-[82px] flex-col items-center rounded-[999px] border px-3 py-4 text-center ${
                      index === 0
                        ? 'border-white/18 bg-white/12 shadow-glow'
                        : 'border-white/10 bg-white/6'
                    }`}
                  >
                    <p className="text-xs font-medium text-slate-300/85">
                      {entry.label}
                    </p>
                    <WeatherIcon
                      icon={entry.icon}
                      size={21}
                      className="mt-3 text-white"
                    />
                    <p className="mt-3 text-lg font-semibold text-white">
                      {entry.temperature}
                      &deg;
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
