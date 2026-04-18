import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import WeatherIcon from './WeatherIcon';

export default function HourlyForecast({ hourly }) {
  return (
    <GlassCard className="rounded-[34px] p-6" delay={0.18}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="section-heading">24-Hour Forecast</h2>
          <p className="section-subtitle">
            Designed as a smooth horizontal weather ribbon.
          </p>
        </div>
      </div>

      <div className="weather-scroll mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-3">
          {hourly.map((entry, index) => (
            <motion.div
              key={`${entry.time}-${entry.label}`}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.44,
                delay: 0.08 + index * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`min-w-[124px] rounded-[28px] border px-4 py-5 transition ${
                index === 0
                  ? 'border-sky-300/35 bg-sky-300/12 shadow-glow'
                  : 'border-white/10 bg-slate-950/18 hover:bg-white/8'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">{entry.label}</p>
                <span className="h-2 w-2 rounded-full bg-white/50" />
              </div>
              <WeatherIcon
                icon={entry.icon}
                size={28}
                className="mt-6 text-white/90"
              />
              <p className="mt-4 text-2xl font-semibold text-white">
                {entry.temperature}
                &deg;
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-slate-300/60">
                {entry.condition}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
