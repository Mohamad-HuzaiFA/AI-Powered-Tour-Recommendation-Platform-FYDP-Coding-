"use client";

export default function TourListSkeletons() {
  return (
    <div className="ImagesCard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white animate-pulse rounded-xl shadow-md p-6 flex flex-col"
        >
          <div className="h-64 bg-gray-300 mb-4" />
          <div className="h-6 bg-gray-300 rounded mb-2" />
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="mt-auto h-4 bg-gray-300 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
