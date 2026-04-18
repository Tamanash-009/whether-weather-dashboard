import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import GlassCard from './GlassCard';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-white/10 bg-slate-950/85 px-4 py-3 text-sm text-white shadow-glass backdrop-blur-xl">
      <p className="font-semibold">{label}</p>
      <p className="mt-1 text-slate-300">
        {payload[0].value}
        &deg;
      </p>
    </div>
  );
}

export default function TemperatureChart({ hourly, palette }) {
  const chartData = hourly.slice(0, 12).map((entry) => ({
    name: entry.label,
    temperature: entry.temperature,
  }));
  const currentValue = chartData[0]?.temperature ?? '--';

  return (
    <GlassCard className="rounded-[34px] p-6" delay={0.1}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="section-heading">Temperature Curve</h2>
          <p className="section-subtitle">
            The next 12 hours, smoothed into a premium signal line.
          </p>
        </div>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-[24px] border border-white/10 bg-slate-950/20 px-4 py-3"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300/65">
            Current point
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {currentValue}
            &deg;
          </p>
        </motion.div>
      </div>

      <div className="relative mt-6 h-[280px] w-full">
        <div
          className="float-gentle absolute right-4 top-4 h-16 w-16 rounded-full blur-2xl"
          style={{ background: palette.accentSoft }}
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
          >
            <defs>
              <linearGradient id="temperatureFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={palette.chartStart}
                  stopOpacity={0.45}
                />
                <stop
                  offset="100%"
                  stopColor={palette.chartEnd}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(226, 232, 240, 0.72)', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(226, 232, 240, 0.48)', fontSize: 12 }}
              width={36}
            />
            <Tooltip content={<ChartTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="temperature"
              fill="url(#temperatureFill)"
              stroke="none"
              isAnimationActive
              animationDuration={1400}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke={palette.chartStart}
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 0, fill: palette.chartEnd }}
              isAnimationActive
              animationDuration={1600}
              animationEasing="ease-out"
              activeDot={{
                r: 5,
                fill: palette.chartEnd,
                stroke: palette.chartStart,
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
