import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message, onRetry, onLoadDefault }) {
  return (
    <div className="glass-panel mt-8 rounded-[32px] p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-rose-400/20 bg-rose-500/10 text-rose-200">
        <AlertCircle size={24} />
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold text-white">
        Weather feed unavailable
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">
        {message}
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-100"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={onLoadDefault}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Load default city
        </button>
      </div>
    </div>
  );
}
