"use client";
import { useState } from "react";

const BuildPackageForm = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [destination, setDestination] = useState("");
  const [accommodationSelected, setAccommodationSelected] = useState(false);
  const [error, setError] = useState("");

  const handleActivityToggle = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

const handleSubmit = async () => {
  // Check for required fields
  if (!destination.trim()) {
    alert("Please enter a destination.");
    return;
  }

  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  // Date logic: End date should not be before start date
  if (new Date(endDate) < new Date(startDate)) {
    alert("End date cannot be earlier than start date.");
    return;
  }

  if (!guests) {
    alert("Please select the number of guests.");
    return;
  }

  // You can optionally check if at least one activity is selected
  // if (selectedActivities.length === 0) {
  //   alert("Please select at least one activity.");
  //   return;
  // }

  const payload = {
    destination,
    startDate,
    endDate,
    guests,
    activities: selectedActivities,
    accommodation: accommodationSelected,
  };

  try {
    const response = await fetch(
      "http://localhost:8000/api/tour-packages/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Package built successfully!");
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    alert("Request failed: " + error.message);
  }
};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
        >
          Build Your Own Package
        </h1>

        {error && (
          <div
            style={{ color: "red", marginBottom: "20px", fontWeight: "500" }}
          >
            {error}
          </div>
        )}

        {/* Destination */}
        <div style={{ marginBottom: "25px" }}>
          <p style={{ marginBottom: "10px", fontWeight: "500" }}>
            Enter destination (country, region or city){" "}
            <span style={{ color: "red" }}>*</span>
          </p>
          <input
            type="text"
            value={destination}
            placeholder="Enter destination"
            onChange={(e) => setDestination(e.target.value)}
            style={{
              backgroundColor: "#f8f9fa",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
              outline: "none",
            }}
          />
        </div>

        {/* Date & Guests */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: "8px", fontWeight: "500" }}>
              Start Date <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "100%",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: "8px", fontWeight: "500" }}>
              End Date <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Guests */}
        <div style={{ marginBottom: "25px" }}>
          <p style={{ marginBottom: "8px", fontWeight: "500" }}>
            Guests <span style={{ color: "red" }}>*</span>
          </p>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "100%",
              backgroundColor: "#f8f9fa",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <option key={g} value={g}>{`${g} adult${
                g > 1 ? "s" : ""
              }`}</option>
            ))}
          </select>
        </div>

        {/* Activities */}
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}
        >
          Activities preferences (optional)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
          {[
            "Culture",
            "Outdoors",
            "Relaxing",
            "Wildlife",
            "Romantic",
            "Religious",
            "Hiking",
            "Musical",
            "Shopping",
            "Business",
            "Museums",
            "Party",
            "Traditions",
            "Walks",
            "Fishing",
            "Cruise",
            "Guide",
            "Healthcare",
          ].map((activity) => (
            <label
              key={activity}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={selectedActivities.includes(activity)}
                onChange={() => handleActivityToggle(activity)}
                style={{ marginRight: "8px" }}
              />
              {activity}
            </label>
          ))}
        </div>

        {/* Accommodation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={accommodationSelected}
              onChange={(e) => setAccommodationSelected(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            <label htmlFor="accommodation">Accommodation</label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Build Package
        </button>
      </div>
    </div>
  );
};

export default BuildPackageForm;
