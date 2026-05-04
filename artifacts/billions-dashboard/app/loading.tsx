export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Hero skeleton */}
      <section className="flex flex-col items-center text-center gap-8 pt-8 pb-12">
        <div className="skeleton h-6 w-40 rounded-full" />
        <div className="space-y-3 w-full max-w-lg">
          <div className="skeleton h-12 w-3/4 mx-auto rounded-lg" />
          <div className="skeleton h-10 w-1/2 mx-auto rounded-lg" />
        </div>
        <div className="skeleton h-4 w-80 rounded" />
        <div className="flex gap-4 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton rounded-lg" style={{ width: 80, height: 100 }} />
          ))}
        </div>
      </section>
      {/* Card skeleton */}
      <div className="skeleton h-48 rounded-2xl" />
    </div>
  );
}
