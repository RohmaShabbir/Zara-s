export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] rounded-2xl bg-ink/10" />
          <div className="mt-4 h-4 w-3/4 rounded bg-ink/10" />
          <div className="mt-2 h-3 w-1/3 rounded bg-ink/10" />
          <div className="mt-3 h-4 w-1/4 rounded bg-ink/10" />
        </div>
      ))}
    </div>
  );
}