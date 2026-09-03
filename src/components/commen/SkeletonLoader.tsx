// src/components/commen/SkeletonLoader.tsx
interface SkeletonLoaderProps {
  variant?: "page" | "sidebar" | "card" | "table" | "text";
  rows?: number;
}

export default function SkeletonLoader({ variant = "page", rows = 4 }: SkeletonLoaderProps) {
  const shimmer = "animate-pulse bg-gray-200 rounded-lg";

  if (variant === "page") {
    return (
      <div className="w-screen h-screen flex bg-linear-to-bl from-green-800 via-green-300 to-green-900 overflow-hidden">
        {/* Sidebar skeleton */}
        <div className="hidden md:flex flex-col gap-4 p-2 w-60 h-full">
          <div className={`${shimmer} w-full h-15 bg-green-200/60`} />
          <div className="flex flex-col gap-2 w-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`${shimmer} w-full h-13 bg-green-200/60`} />
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex flex-col w-full h-full min-w-0">
          <div className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-6">
            <div className={`${shimmer} w-32 h-6 bg-white/40`} />
            <div className={`${shimmer} w-9 h-9 rounded-full bg-white/40`} />
          </div>
          <div className="w-full h-full bg-white rounded-tl-3xl p-6">
            <div className={`${shimmer} w-40 h-6 mb-6`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`${shimmer} w-full h-32`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="flex flex-col gap-2 w-full p-2">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className={`${shimmer} w-full h-13`} />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className={`${shimmer} w-full h-32`} />
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="flex flex-col gap-3 w-full">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className={`${shimmer} w-full h-10`} />
        ))}
      </div>
    );
  }

  // variant === "text"
  return (
    <div className="flex flex-col gap-2 w-full">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className={`${shimmer} h-4`}
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
}