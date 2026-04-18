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
    <GlassCard className="rounded-[34px] p-5 sm:p-6" delay={0.24}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="section-heading">Favorites</h2>

        <button
          type="button"
          onClick={onToggleFavorite}
          disabled={!currentCity}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
            isFavorite
              ? 'border border-rose-300/30 bg-rose-400/15 text-rose-100'
              : 'border border-white/10 bg-slate-950/20 text-white hover:bg-white/10'
          }`}
        >
          {isFavorite ? <Heart size={14} className="fill-current" /> : <Plus size={14} />}
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {favorites.length ? (
          favorites.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onSelect(city)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                city.toLowerCase() === currentCity?.toLowerCase()
                  ? 'border-sky-300/30 bg-sky-300/14 text-sky-100'
                  : 'border-white/10 bg-slate-950/20 text-slate-200 hover:bg-white/10'
              }`}
            >
              {city}
            </button>
          ))
        ) : (
          <p className="text-sm text-slate-400">
            No saved cities yet
          </p>
        )}
      </div>
    </GlassCard>
  );
}
