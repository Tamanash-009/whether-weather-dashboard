export default function LoadingSkeleton() {
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
      <div className="space-y-6">
        <div className="glass-panel animate-pulse rounded-[32px] p-8">
          <div className="h-6 w-44 rounded-full bg-white/10" />
          <div className="mt-6 h-14 w-2/3 rounded-full bg-white/10" />
          <div className="mt-4 h-5 w-40 rounded-full bg-white/10" />
          <div className="mt-10 h-24 w-48 rounded-[28px] bg-white/10" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="h-24 rounded-[24px] bg-white/10" />
            <div className="h-24 rounded-[24px] bg-white/10" />
          </div>
        </div>
        <div className="glass-panel animate-pulse rounded-[32px] p-6">
          <div className="h-6 w-40 rounded-full bg-white/10" />
          <div className="mt-6 h-[260px] rounded-[24px] bg-white/10" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel animate-pulse rounded-[32px] p-6">
          <div className="h-6 w-36 rounded-full bg-white/10" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-28 rounded-[24px] bg-white/10" />
            ))}
          </div>
        </div>
        <div className="glass-panel animate-pulse rounded-[32px] p-6">
          <div className="h-6 w-36 rounded-full bg-white/10" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-20 rounded-[24px] bg-white/10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
