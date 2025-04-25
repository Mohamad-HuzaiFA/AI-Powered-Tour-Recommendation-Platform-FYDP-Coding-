"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import "@/app/book_tour/book_tour.css";
import PlanTour from "@/app/components/plan_tour"; // ✅ Capitalization fix

const Booktour = () => {
  const router = useRouter();
  const [sortOption, setSortOption] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tours")
      .then((res) => res.json())
      .then((data) => {
        const tourList = Array.isArray(data) ? data : [];
        setTours(sortTours(tourList, sortOption));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tours:", err);
        setLoading(false);
      });
  }, [sortOption]);

  return (
    <>
      <div>
        {/* Background Section */}
        <div className="relative w-full min-h-screen bg-[url('/assets/images/background.jpg')] bg-no-repeat bg-center bg-cover">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
          <Navbar />

          <section className="relative z-10 flex flex-col items-center justify-center h-[90vh] text-center text-white">
            <p className="text-sm uppercase tracking-wider text-gray-300">
              Explore the world
            </p>
            <h1 className="text-6xl md:text-7xl font-extrabold font-[Great Vibes] drop-shadow-lg">
              Travel with us
            </h1>
            <span className="mt-4 text-lg text-gray-200">
              Unforgettable adventures await
            </span>
          </section>
        </div>

        <div className="secondPart">
          {/* Sorting Buttons */}
          <div className="myOptions flex space-x-4 gap-8 py-6 px-4 md:px-10">
            {[
              { label: "📅 Date", value: "date" },
              { label: "⬆️ Price High To Low", value: "priceHigh" },
              { label: "⬇️ Price Low To High", value: "priceLow" },
              { label: "🔤 Name (A-Z)", value: "nameAZ" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setSortOption(item.value)}
                className={`flex items-center gap-2 font-semibold transition duration-300 ${
                  sortOption === item.value
                    ? "text-red-600 underline"
                    : "hover:text-red-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Tour Cards or Loading */}
          <div className="main-part">
            {loading ? (
              <p className="text-center text-gray-500 py-10">
                Loading tours...
              </p>
            ) : (
              <div className="ImagesCard col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-10">
                {tours.map((tour, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(`/tour_info/${tour.id}`)}
                    className="cursor-pointer bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.03] hover:shadow-2xl transition duration-300"
                  >
                    <img
                      loading="lazy"
                      src={tour.main_image}
                      alt={tour.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mt-4 mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Book now to experience lush valleys, lakes, and majestic
                        mountains.
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-lg font-bold text-red-600">
                          ${tour.price_per_person}
                        </span>
                        <span className="text-yellow-500">{tour.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Booking Form */}
            <div className="bookPart bg-white p-6 shadow-lg rounded-lg my-10 mx-4 md:mx-10">
              <PlanTour />
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
};

export default Booktour;

// Sorting Logic
const sortTours = (tours, option) => {
  const sorted = [...tours]; // clone to avoid mutation
  switch (option) {
    case "date":
      return sorted.sort(
        (a, b) => new Date(a?.date || 0) - new Date(b?.date || 0)
      );
    case "priceHigh":
      return sorted.sort((a, b) => b.price_per_person - a.price_per_person);
    case "priceLow":
      return sorted.sort((a, b) => a.price_per_person - b.price_per_person);
    case "nameAZ":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return tours;
  }
};
