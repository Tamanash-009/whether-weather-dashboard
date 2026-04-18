import GlassCard from './GlassCard';
import WeatherIcon from './WeatherIcon';

export default function DailyForecast({ daily }) {
  return (
    <GlassCard className="rounded-[34px] p-6" delay={0.24}>
      <h2 className="section-heading">7-Day Forecast</h2>
      <p className="section-subtitle">
        A sharper weekly outlook with more hierarchy and less clutter.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {daily.map((entry) => (
          <div
            key={entry.time}
            className="flex items-center justify-between gap-4 rounded-[26px] border border-white/10 bg-slate-950/20 px-4 py-4 transition hover:bg-white/8"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{entry.day}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-300/65">
                {entry.date}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <WeatherIcon
                icon={entry.icon}
                size={26}
                className="text-white/90"
              />
              <div className="text-right">
                <p className="text-sm text-slate-200">{entry.condition}</p>
                <p className="mt-1 text-base font-semibold text-white">
                  {entry.max}&deg; <span className="text-slate-400">/ {entry.min}&deg;</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
