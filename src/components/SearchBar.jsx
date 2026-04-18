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
      className="glass-panel relative mt-6 flex flex-col gap-3 rounded-[28px] border-white/10 px-4 py-3 sm:px-5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Search size={18} />
          </div>
          <label htmlFor="city-search" className="sr-only">
            Search city
          </label>
          <input
            id="city-search"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search city..."
            className="w-full rounded-[20px] border border-white/10 bg-slate-950/30 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:bg-white/10 focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDetectLocation}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-[18px] border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/12 disabled:opacity-50"
          >
            <MapPin size={16} />
            <span className="hidden sm:inline">Location</span>
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-[18px] bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Search size={17} />
            )}
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
