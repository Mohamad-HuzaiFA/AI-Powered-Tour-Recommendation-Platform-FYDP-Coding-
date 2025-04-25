"use client";
import React, { useState } from "react";
import "@/app/book_tour/book_tour.css";

const PlanTour = () => {
    const [value, setValue] = useState(15);
    
  return (
    <>
      <h2 className="text-2xl font-bold text-blue-800">Plan Your Trip</h2>
      <p className="text-gray-600 my-3">
        Book now to explore stunning landscapes and breathtaking views.
      </p>

      <input
        type="text"
        placeholder="🔍 Search Tour"
        className="w-full p-2 border rounded-lg my-2 focus:ring-2 focus:ring-red-500"
      />
      <input
        type="text"
        placeholder="📍 Where To?"
        className="w-full p-2 border rounded-lg my-2 focus:ring-2 focus:ring-red-500"
      />
      <input
        type="date"
        className="w-full p-2 border rounded-lg my-2 focus:ring-2 focus:ring-red-500"
      />

      <div className="my-4">
        <p className="text-gray-700 font-semibold">Filter By Price</p>
        <input
          type="range"
          min="15"
          max="10000"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full my-2"
        />
        <p className="text-gray-600">Price: ${value}</p>
      </div>

      <button className="bg-red-500 text-white w-full py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300">
        Book Now
      </button>
    </>
  );
};

export default PlanTour;
