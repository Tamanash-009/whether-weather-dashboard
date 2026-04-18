import { Heart, Plus } from 'lucide-react';
import GlassCard from './GlassCard';

export default function FavoritesPanel({
  favorites,
  currentCity,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  return (
    <GlassCard className="rounded-[34px] p-6" delay={0.28}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="section-heading">Favorite Cities</h2>
          <p className="section-subtitle">
            Curate a personal weather deck for quick mood checks.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          disabled={!currentCity}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            isFavorite
              ? 'border border-rose-300/30 bg-rose-400/15 text-rose-100'
              : 'border border-white/10 bg-slate-950/20 text-white hover:bg-white/10'
          }`}
        >
          {isFavorite ? <Heart size={16} className="fill-current" /> : <Plus size={16} />}
          {isFavorite ? 'Remove' : 'Add'}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {favorites.length ? (
          favorites.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onSelect(city)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                city.toLowerCase() === currentCity?.toLowerCase()
                  ? 'border-sky-300/30 bg-sky-300/14 text-sky-100'
                  : 'border-white/10 bg-slate-950/20 text-slate-200 hover:bg-white/10'
              }`}
            >
              {city}
            </button>
          ))
        ) : (
          <p className="text-sm text-slate-300/80">
            Save a city to build your own personal forecast deck.
          </p>
        )}
      </div>
    </GlassCard>
  );
}
