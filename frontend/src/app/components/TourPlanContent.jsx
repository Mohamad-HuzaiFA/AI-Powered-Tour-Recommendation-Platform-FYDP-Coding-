"use client"; // Added this directive

import React from "react";

const samplePlan = [
  {
    day: 1,
    title: "Arrival & Check-in",
    description:
      "Arrive at the destination, transfer to hotel, and relax after your journey.",
  },
  {
    day: 2,
    title: "Local Sightseeing",
    description:
      "Explore top tourist attractions including historical landmarks and local markets.",
  },
  {
    day: 3,
    title: "Adventure Activities",
    description:
      "Engage in outdoor activities like hiking, boating, or jeep safari.",
  },
  {
    day: 4,
    title: "Departure",
    description:
      "Pack up and transfer to the airport or departure point with memories.",
  },
];

function TourPlanContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tour Itinerary</h2>
      <ul className="space-y-6">
        {samplePlan.map((item) => (
          <li key={item.day} className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-semibold text-red-600">
              Day {item.day}: {item.title}
            </h3>
            <p className="text-gray-700 mt-1">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TourPlanContent;
