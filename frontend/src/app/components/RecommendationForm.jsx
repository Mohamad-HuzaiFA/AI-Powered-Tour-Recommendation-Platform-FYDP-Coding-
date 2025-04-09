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
    { value: "party", label: "Party" },
    { value: "family", label: "Family" },
    { value: "dj_night", label: "DJ Night" },
    { value: "classical", label: "Classical" },
  ];

  const locations = [
    { value: "Brazil", label: "Brazil" },
    { value: "Argentina", label: "Argentina" },
    { value: "USA", label: "USA" },
    { value: "Japan", label: "Japan" },
    { value: "Thailand", label: "Thailand" },
    { value: "Morocco", label: "Morocco" },
    { value: "Australia", label: "Australia" },
    { value: "Canada", label: "Canada" },
    { value: "Denmark", label: "Denmark" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Greece", label: "Greece" },
    { value: "Egypt", label: "Egypt" },
    { value: "China", label: "China" },
    { value: "Netherlands", label: "Netherlands" },
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

  const handleMultiSelect = (e) => {
    const options = [...e.target.selectedOptions];
    const values = options.map((option) => option.value);
    setPrefs((prev) => ({ ...prev, [e.target.name]: values }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(preferences);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md"
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
            <label key={type.value} className="flex items-center gap-2 text-sm">
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
        <select
          name="locations"
          multiple
          value={preferences.locations}
          onChange={handleMultiSelect}
          className="border rounded-lg p-2 w-full"
          size={5}
        >
          {locations.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl (or Cmd) to select multiple.
        </p>
        {errors.locations && (
          <p className="text-sm text-red-500">{errors.locations}</p>
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
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Get Recommendations"}
      </button>
    </form>
  );
}
