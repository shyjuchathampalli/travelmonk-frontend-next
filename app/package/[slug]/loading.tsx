export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 animate-pulse">
      <div className="grid lg:grid-cols-5 gap-10">

        {/* RIGHT SIDE */}
        <div className="lg:col-span-3 space-y-6">

          {/* Form Skeleton */}
          <div className="bg-gray-200 h-64 rounded-2xl" />

          {/* Day Plan Skeleton */}
          <div className="space-y-4">
            <div className="bg-gray-200 h-10 rounded-lg" />
            <div className="bg-gray-200 h-10 rounded-lg" />
            <div className="bg-gray-200 h-10 rounded-lg" />
          </div>

        </div>

        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="bg-gray-200 h-80 rounded-2xl" />
        </div>

      </div>
    </div>
  );
}