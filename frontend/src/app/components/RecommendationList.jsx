import { useState, useMemo } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react"; // Make sure lucide-react is installed

export default function RecommendationList({ tours = [] }) {
  const [bookmarkedTours, setBookmarkedTours] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Toggle bookmark functionality
  const toggleBookmark = (id) => {
    setBookmarkedTours((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  // Sorting logic
  const sortedTours = useMemo(() => {
    if (!tours) return [];

    const copied = [...tours];

    switch (sortBy) {
      case "priceLow":
        return copied.sort((a, b) => a.price_per_person - b.price_per_person);
      case "priceHigh":
        return copied.sort((a, b) => b.price_per_person - a.price_per_person);
      case "match":
        return copied.sort(
          (a, b) => (b.match_score || 0) - (a.match_score || 0)
        );
      case "duration":
        return copied.sort((a, b) => (a.duration || 0) - (b.duration || 0));
      default:
        return copied;
    }
  }, [sortBy, tours]);

  if (!tours || tours.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg border">
        <p className="text-gray-500 text-lg">
          No tours found matching your preferences.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="match">Match Score</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      {/* Tour Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border relative"
          >
            {/* Bookmark Button */}
            <button
              onClick={() => toggleBookmark(tour.id)}
              className="absolute top-3 right-3 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-md"
            >
              {bookmarkedTours.includes(tour.id) ? (
                <BookmarkCheck className="w-5 h-5 text-blue-600" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* Image */}
            {tour.image ? (
              <img
                src={tour.image}
                alt={tour.title}
                loading="lazy"
                className="w-full h-48 object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {/* Details */}
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Company:</span>{" "}
                {tour.company || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Location:</span> {tour.location}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Type:</span>{" "}
                {tour.tour_type || "General"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Duration:</span>{" "}
                {tour.duration ? `${tour.duration} days` : "Flexible"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Price:</span> $
                {tour.price_per_person || tour.price || "TBD"}
              </p>

              {tour.match_score && (
                <div className="mt-2">
                  <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                    {Math.round(tour.match_score * 100)}% match
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
