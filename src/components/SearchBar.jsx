import { LoaderCircle, MapPin, Search } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onDetectLocation,
  loading,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="glass-panel relative mt-8 flex flex-col gap-4 rounded-[34px] border-white/10 px-4 py-4 sm:px-5"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-300/65">
            Explore weather
          </p>
          <p className="mt-2 text-sm text-slate-300/78">
            Search any city or jump straight to your current location.
          </p>
        </div>

        <button
          type="button"
          onClick={onDetectLocation}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
        >
          <MapPin size={16} />
          Use my location
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-slate-400">
            <Search size={18} />
          </div>
          <label htmlFor="city-search" className="sr-only">
            Search by city
          </label>
          <input
            id="city-search"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search city, region, or escape to somewhere dramatic..."
            className="w-full rounded-[26px] border border-white/10 bg-slate-950/30 px-5 py-4 pl-12 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-sky-300/50 focus:bg-white/10"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-w-[148px] items-center justify-center gap-2 rounded-[24px] bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
          Search
        </button>
      </div>
    </form>
  );
}
