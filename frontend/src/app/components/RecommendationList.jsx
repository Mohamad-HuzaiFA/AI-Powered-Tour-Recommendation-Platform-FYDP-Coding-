export default function RecommendationList({ tours = [] }) {
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No tours found matching your preferences.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tours.map(tour => (
        <div key={tour.id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg">{tour.title}</h3>
          <div className="mt-2 space-y-1">
            <p><span className="font-medium">Location:</span> {tour.location}</p>
            <p><span className="font-medium">Price:</span> ${tour.price_per_person || tour.price}</p>
            <p><span className="font-medium">Type:</span> <span className="capitalize">{tour.tour_type}</span></p>
            {tour.duration && (
              <p><span className="font-medium">Duration:</span> {tour.duration} days</p>
            )}
            {tour.match_score && (
              <p className="mt-2">
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {Math.round(tour.match_score * 100)}% match
                </span>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}