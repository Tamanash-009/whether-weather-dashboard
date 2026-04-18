import { motion } from 'framer-motion';
import weatherGrid from '../assets/weather-grid.svg';
import { getThemePalette } from '../utils/weather';

function RainLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-50">
      {Array.from({ length: 28 }).map((_, index) => (
        <span
          key={index}
          className="rain-drop absolute top-0 h-16 w-px rounded-full bg-gradient-to-b from-cyan-200/0 via-cyan-100/90 to-cyan-200/0"
          style={{
            left: `${(index * 17) % 100}%`,
            animationDuration: `${0.85 + (index % 7) * 0.12}s`,
            animationDelay: `${(index % 6) * 0.18}s`,
            opacity: 0.2 + (index % 5) * 0.08,
          }}
        />
      ))}
    </div>
  );
}

function SnowLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-55">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          key={index}
          className="snow-speck absolute top-0 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.45)]"
          style={{
            left: `${(index * 13) % 100}%`,
            width: `${2 + (index % 3)}px`,
            height: `${2 + (index % 3)}px`,
            animationDuration: `${6 + (index % 5) * 1.1}s`,
            animationDelay: `${(index % 8) * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

function CloudLayer() {
  return (
    <div className="absolute inset-x-0 top-0 h-[44vh] overflow-hidden opacity-55">
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className="cloud-wisp absolute rounded-full bg-white/10 blur-3xl"
          style={{
            top: `${10 + index * 14}%`,
            left: `${-6 + index * 18}%`,
            width: `${180 + index * 60}px`,
            height: `${70 + index * 18}px`,
            animationDuration: `${18 + index * 6}s`,
          }}
        />
      ))}
    </div>
  );
}

function StarLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-80">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          key={index}
          className="star-drift absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{
            top: `${8 + ((index * 11) % 60)}%`,
            left: `${5 + ((index * 17) % 90)}%`,
            width: `${1.5 + (index % 3) * 0.9}px`,
            height: `${1.5 + (index % 3) * 0.9}px`,
            animationDuration: `${8 + (index % 6) * 1.4}s`,
            animationDelay: `${(index % 5) * 0.45}s`,
            opacity: 0.16 + (index % 4) * 0.14,
          }}
        />
      ))}
    </div>
  );
}

export default function AnimatedBackground({ theme = 'clear' }) {
  const palette = getThemePalette(theme);
  const showRain = theme === 'rain' || theme === 'storm';
  const showSnow = theme === 'snow';
  const showStars = theme === 'clear' || theme === 'night' || theme === 'storm';
  const showClouds =
    theme === 'clouds' || theme === 'fog' || theme === 'night' || showSnow;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${palette.gradient}`}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="weather-aura absolute -left-24 top-0 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: palette.accentSoft }}
        animate={{ opacity: [0.28, 0.44, 0.28], scale: [0.96, 1.08, 0.96] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="weather-aura-delayed absolute -right-20 top-1/4 h-[360px] w-[360px] rounded-full blur-3xl"
        style={{ background: palette.border }}
        animate={{ opacity: [0.24, 0.38, 0.24], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="ambient-beam absolute inset-y-[-10%] left-[12%] w-[34%] rotate-[10deg] blur-3xl"
        style={{
          background: `linear-gradient(180deg, transparent, ${palette.accentSoft}, transparent)`,
        }}
      />
      <div
        className="weather-aura-fast absolute right-[14%] top-[12%] h-36 w-36 rounded-full blur-3xl"
        style={{ background: palette.accentSoft }}
      />
      <div
        className="grid-pulse absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${weatherGrid})`,
          backgroundSize: 'min(72vw, 760px)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right top',
        }}
      />
      <div className="grain-overlay absolute inset-0" />
      {showStars ? <StarLayer /> : null}
      {showClouds ? <CloudLayer /> : null}
      {showRain ? <RainLayer /> : null}
      {showSnow ? <SnowLayer /> : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.65)_100%)]" />
    </div>
  );
}
