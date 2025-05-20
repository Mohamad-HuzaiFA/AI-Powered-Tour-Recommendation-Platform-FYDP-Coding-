"use client";

import { useState } from "react";

export default function RecommendationForm({ onSubmit, loading }) {
  const [preferences, setPrefs] = useState({
    budgetMin: 0,
    budgetMax: 1000,
    tourTypes: [],
    locations: [],
    groupSize: 1,
    method: "hybrid",
  });

  const [errors, setErrors] = useState({});

  const tourTypes = [
    { value: "adventure", label: "Adventure" },
    { value: "cultural", label: "Cultural Immersion" },
    { value: "historical", label: "Historical Exploration" },
    { value: "nature", label: "Nature & Wildlife" },
    { value: "beach", label: "Beach Getaway" },
    { value: "mountain", label: "Mountain Expedition" },
    { value: "city_tour", label: "City Sightseeing" },
    { value: "foodie", label: "Food & Culinary" },
    { value: "luxury", label: "Luxury Escape" },
    { value: "party", label: "Party" },
    { value: "family", label: "Family" },
    { value: "dj_night", label: "DJ Night" },
    { value: "classical", label: "Classical" },
  ];

  const locations = [
    { value: "islamabad", label: "Islamabad" },
    { value: "lahore", label: "Lahore" },
    { value: "karachi", label: "Karachi" },
    { value: "peshawar", label: "Peshawar" },
    { value: "quetta", label: "Quetta" },
    { value: "murree", label: "Murree" },
    { value: "nathiagali", label: "Nathiagali" },
    { value: "swat", label: "Swat Valley" },
    { value: "gilgit", label: "Gilgit" },
    { value: "hunza", label: "Hunza Valley" },
    { value: "skardu", label: "Skardu" },
    { value: "chitral", label: "Chitral" },
    { value: "mohenjo-daro", label: "Mohenjo-daro" },
    { value: "taxila", label: "Taxila" },
    { value: "kalam", label: "Kalam" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrefs((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(preferences);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!preferences.budgetMin || preferences.budgetMin < 0)
      newErrors.budgetMin = "Minimum budget is required.";
    if (
      !preferences.budgetMax ||
      preferences.budgetMax <= preferences.budgetMin
    )
      newErrors.budgetMax = "Maximum must be greater than minimum.";
    if (!preferences.tourTypes.length)
      newErrors.tourTypes = "At least one tour type must be selected.";
    if (!preferences.locations.length)
      newErrors.locations = "Select at least one location.";
    if (!preferences.groupSize || preferences.groupSize < 1)
      newErrors.groupSize = "Group size must be at least 1.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex justify-center">
      {" "}
      {/* Center the form horizontally */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-6" // Increased max-width and single column
      >
        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Budget Range ($)
          </label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="number"
                name="budgetMin"
                value={preferences.budgetMin}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                placeholder="Min"
              />
              {errors.budgetMin && (
                <p className="text-sm text-red-500">{errors.budgetMin}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="number"
                name="budgetMax"
                value={preferences.budgetMax}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                placeholder="Max"
              />
              {errors.budgetMax && (
                <p className="text-sm text-red-500">{errors.budgetMax}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tour Types */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tour Types</label>
          <div className="grid grid-cols-2 gap-2">
            {tourTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  name="tourTypes"
                  value={type.value}
                  checked={preferences.tourTypes.includes(type.value)}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors.tourTypes && (
            <p className="text-sm text-red-500 mt-1">{errors.tourTypes}</p>
          )}
        </div>

        {/* Locations */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Preferred Locations
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {locations.map((location) => (
              <label
                key={location.value}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  name="locations"
                  value={location.value}
                  checked={preferences.locations.includes(location.value)}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                {location.label}
              </label>
            ))}
          </div>
          {errors.locations && (
            <p className="text-sm text-red-500 mt-1">{errors.locations}</p>
          )}
        </div>

        {/* Group Size */}
        <div>
          <label className="block text-sm font-semibold mb-2">Group Size</label>
          <input
            type="number"
            name="groupSize"
            min="1"
            value={preferences.groupSize}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          {errors.groupSize && (
            <p className="text-sm text-red-500">{errors.groupSize}</p>
          )}
        </div>

        {/* Recommendation Method */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Recommendation Method
          </label>
          <select
            name="method"
            value={preferences.method}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          >
            <option value="hybrid">Hybrid (Content + Ratings)</option>
            <option value="content">Content-Based Only</option>
            <option value="popular">Popular Tours</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Get Recommendations"}
          </button>
        </div>
      </form>
    </div>
  );
}
