"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function UpdatePackage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("summer");
  const [tourType, setTourType] = useState("party");
  const [availability, setAvailability] = useState("");
  const [minGroupSize, setMinGroupSize] = useState("1");
  const [maxGroupSize, setMaxGroupSize] = useState("10");
  const [selectedTagUUIDs, setSelectedTagUUIDs] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [aiKeywords, setAiKeywords] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [galleryFiles, setGalleryFiles] = useState([]);


  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags/`);
        if (res.ok) {
          const data = await res.json();
          setAvailableTags(data);
        } else {
          console.error("Failed to fetch tags.");
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    async function fetchTour() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tours/${id}/`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || "");
          setDescription(data.description || "");
          setPricePerPerson(data.price_per_person || "");
          setDuration(data.duration || "");
          setLocation(data.location || "");
          setSeason(data.season || "summer");
          setTourType(data.tour_type || "party");
          setAvailability(data.availability || "");
          setMinGroupSize(data.min_group_size || "1");
          setMaxGroupSize(data.max_group_size || "10");
          setSelectedTagUUIDs(data.tags || []); // Assuming backend returns tag UUIDs
          setAiKeywords((data.ai_keywords || []).join(", "));
        } else {
          setError("Failed to load tour.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the tour.");
      }
    }

    fetchTags();
    if (id) fetchTour();
  }, [id]);

  const handleTagChange = (tagId) => {
    setSelectedTagUUIDs((prev) =>
      prev.includes(tagId)
        ? prev.filter((tag) => tag !== tagId)
        : [...prev, tagId]
    );
  };

  const handleGalleryChange = e => {
    // limit to 5 files max
    const files = Array.from(e.target.files).slice(0, 5);
    setGalleryFiles(files);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price_per_person", pricePerPerson);
    formData.append("duration", duration);
    formData.append("location", location);
    formData.append("season", season);
    formData.append("tour_type", tourType);
    formData.append("availability", availability);
    formData.append("min_group_size", minGroupSize);
    formData.append("max_group_size", maxGroupSize);
    selectedTagUUIDs.forEach((tagId) => formData.append("tags", tagId)); // Sending UUIDs
    aiKeywords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((keyword) => formData.append("ai_keywords", keyword));
    if (mainImage) formData.append("main_image", mainImage);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error("Authentication token not found. User might not be logged in.");
      setSubmissionError("Authentication required. Please log in.");
      setLoading(false);
      return; // Stop the submission
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tours/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      toast.success(`Tour Updated successfully!`);

    // 2️⃣ upload gallery images if any
    if (galleryFiles.length) {
      const galleryData = new FormData();
      galleryFiles.forEach(file => galleryData.append('image', file));

      const galRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tours/${id}/upload-images/`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: galleryData,
        }
      );

      if (!galRes.ok) {
        const text = await galRes.text();
        toast.error(`Gallery upload failed: ${text}`);
        setLoading(false);
        return;
      }

      toast.success('Gallery images uploaded!');
    }


      if (res.ok) {
        router.push("/managePackages");
        
      } else {
        const errorMsg = await res.text();
        console.error("Failed to update tour", errorMsg);
        toast.success("Failed to Update Tour!");
        setError("Update failed. " + errorMsg);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ✨ Update Tour Package
        </h2>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="number"
            placeholder="Price Per Person"
            value={pricePerPerson}
            onChange={(e) => setPricePerPerson(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="input-field"
          >
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="autumn">Autumn</option>
          </select>
          <select
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
            className="input-field"
          >
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural Immersion</option>
              <option value="historical">Historical Exploration</option>
              <option value="nature">Nature & Wildlife</option>
              <option value="beach">Beach Getaway</option>
              <option value="mountain">Mountain Expedition</option>
              <option value="city_tour">City Sightseeing</option>
              <option value="foodie">Food & Culinary</option>
              <option value="luxury">Luxury Escape</option>
              <option value="party">Party</option>
              <option value="family">Family</option>
              <option value="dj_night">DJ Night</option>
              <option value="classical">Classical</option>
          </select>
          <input
            type="text"
            placeholder="Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Min Group Size"
            value={minGroupSize}
            onChange={(e) => setMinGroupSize(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Max Group Size"
            value={maxGroupSize}
            onChange={(e) => setMaxGroupSize(e.target.value)}
            className="input-field"
          />
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />

        <input
          type="text"
          placeholder="AI Keywords (comma-separated)"
          value={aiKeywords}
          onChange={(e) => setAiKeywords(e.target.value)}
          className="input-field w-full"
        />

        <div>
          <label className="block font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-3">
            {availableTags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTagUUIDs.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                />
                <span className="text-sm">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Upload Main Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* New: gallery upload */}
        <div>
          <label className="block mb-1">
            Gallery Images (up to 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
          />
          {galleryFiles.length > 0 && (
            <p className="text-sm mt-1">
              {galleryFiles.length} file{galleryFiles.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 w-full"
        >
          {loading ? "Updating..." : "Update Tour"}
        </button>
      </form>

      {/* Tailwind CSS utility styles for reusable input */}
      <style jsx>{`
        .input-field {
          @apply w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500;
        }
      `}</style>

        {/* Toast container */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
    </div>
    
  );
}





