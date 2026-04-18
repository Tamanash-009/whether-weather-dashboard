import {
  Droplets,
  Eye,
  Gauge,
  SunMedium,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from 'lucide-react';
import GlassCard from './GlassCard';
import {
  formatHumidity,
  formatNumericTemperature,
  formatPressure,
  formatUvIndex,
  formatVisibility,
  formatWindSpeed,
  formatTime,
} from '../utils/weather';

function DetailTile({ icon: Icon, label, value, tone }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/24 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-300/68">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: tone }}
        >
          <Icon size={15} />
        </span>
        {label}
      </div>
      <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default function WeatherDetailsPanel({ weather, unit, palette }) {
  const details = [
    {
      icon: Thermometer,
      label: 'Feels like',
      value: formatNumericTemperature(weather.current.feelsLike),
      tone: palette.accentSoft,
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: formatHumidity(weather.current.humidity),
      tone: 'rgba(56, 189, 248, 0.16)',
    },
    {
      icon: Wind,
      label: 'Wind speed',
      value: formatWindSpeed(weather.current.windSpeed, unit),
      tone: 'rgba(96, 165, 250, 0.16)',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: formatPressure(weather.current.pressure),
      tone: 'rgba(99, 102, 241, 0.16)',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: formatVisibility(weather.current.visibilityMeters),
      tone: 'rgba(125, 211, 252, 0.16)',
    },
    {
      icon: SunMedium,
      label: 'UV index',
      value: formatUvIndex(weather.current.uvIndex),
      tone: 'rgba(250, 204, 21, 0.16)',
    },
  ];

  return (
    <GlassCard className="h-full rounded-[36px] p-5 sm:p-6" delay={0.12}>
      <h2 className="section-heading">Conditions Panel</h2>
      <p className="section-subtitle">
        Compact atmospheric detail with a more device-like presentation.
      </p>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/22 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-slate-300/65">
            <Sunrise size={14} />
            Daylight
          </div>
          <div className="text-right text-[11px] uppercase tracking-[0.24em] text-slate-300/55">
            Solar cycle
          </div>
        </div>

        <div className="relative mt-6 h-20">
          <div className="absolute inset-x-3 bottom-2 h-12 rounded-t-full border-x border-t border-white/10" />
          <div
            className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full shadow-[0_0_24px_rgba(255,255,255,0.85)]"
            style={{ background: palette.accent }}
          />
          <div className="absolute left-0 bottom-0 flex items-center gap-2 text-sm text-slate-200">
            <Sunrise size={16} className="text-slate-300/75" />
            {formatTime(weather.astro.sunrise)}
          </div>
          <div className="absolute right-0 bottom-0 flex items-center gap-2 text-sm text-slate-200">
            {formatTime(weather.astro.sunset)}
            <Sunset size={16} className="text-slate-300/75" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {details.map((detail) => (
          <DetailTile
            key={detail.label}
            icon={detail.icon}
            label={detail.label}
            value={detail.value}
            tone={detail.tone}
          />
        ))}
      </div>
    </GlassCard>
  );
}
