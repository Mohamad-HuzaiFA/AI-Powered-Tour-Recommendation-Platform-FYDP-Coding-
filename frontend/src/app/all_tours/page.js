"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";

const Booktour = () => {
  const router = useRouter();
  const [sortOption, setSortOption] = useState(null);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tours")
      .then((res) => res.json())
      .then((data) => {
        const tourList = Array.isArray(data) ? data : [];
        setTours(sortTours(tourList, sortOption));
      })
      .catch((err) => console.error("Failed to fetch tours:", err));
  }, [sortOption]);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />

        <div className="flex-grow px-4 sm:px-10 py-8">
          {/* Sorting Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { label: "📅 Date", value: "date" },
              { label: "⬆️ Price High To Low", value: "priceHigh" },
              { label: "⬇️ Price Low To High", value: "priceLow" },
              { label: "🔤 Name (A-Z)", value: "nameAZ" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setSortOption(item.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 border ${
                  sortOption === item.value
                    ? "bg-red-100 text-red-600 border-red-500"
                    : "bg-white hover:bg-red-50 text-gray-700 border-gray-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Tour Cards */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour, index) => (
              <div
                key={index}
                onClick={() => router.push(`/tour_info/${tour.id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <img
                  loading="lazy"
                  src={tour.main_image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Book now to experience lush valleys, lakes, and majestic
                    mountains.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-bold text-lg">
                      ${tour.price}
                    </span>
                    <span className="text-yellow-500 font-medium">
                      ⭐ {tour.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
};

export default Booktour;

const sortTours = (tours, option) => {
  const sorted = [...tours]; // clone to avoid mutation
  switch (option) {
    case "date":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "priceHigh":
      return sorted.sort((a, b) => b.price - a.price);
    case "priceLow":
      return sorted.sort((a, b) => a.price - b.price);
    case "nameAZ":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return tours;
  }
};
