"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function AddTourPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm();
  const [mainImage, setMainImage] = useState(null);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTagUUIDs, setSelectedTagUUIDs] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const watchedTags = watch("tags"); // Watch the 'tags' field

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags/`);
        if (res.ok) {
          const data = await res.json();
          setAvailableTags(Array.isArray(data.results) ? data.results : data);
        } else {
          console.error("Failed to fetch tags.");
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    fetchTags();
  }, []);

  const onSubmit = async (data) => {
    setSubmissionError("");
    setSubmissionSuccess(false);
  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price_per_person", data.price_per_person);
    formData.append("duration", data.duration);
    formData.append("location", data.location);
    formData.append("season", data.season);
    formData.append("tour_type", data.tourType);
    formData.append("availability", data.availability);
    formData.append("min_group_size", data.min_group_size);
    formData.append("max_group_size", data.max_group_size);
    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tagId) => formData.append("tags", tagId));
    }
    const keywordsArray = data.ai_keywords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    keywordsArray.forEach((keyword) => formData.append("ai_keywords", keyword));
    if (mainImage) formData.append("main_image", mainImage);
  
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      setSubmissionError("Authentication required. Please log in.");
      return;
    }
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (res.ok) {
        const createdTour = await res.json(); // ✅ capture created tour data
        const tourId = createdTour.id; // assumes 'id' is UUID in the response
  
        // ✅ Upload gallery images if present
        if (galleryImages.length > 0) {
          const imageFormData = new FormData();
          galleryImages.forEach((image) => {
            imageFormData.append("images", image); // your backend should handle multiple files with the same field name
          });
  
          const imageRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/upload-images/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imageFormData,
          });
  
          if (!imageRes.ok) {
            const errorText = await imageRes.text();
            console.error("Gallery image upload failed:", errorText);
            setSubmissionError("Tour saved, but gallery image upload failed.");
            return;
          }
        }
  
        setSubmissionSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        const errorData = await res.text();
        console.error("Failed to save tour", errorData);
        setSubmissionError(`Failed to save tour: ${errorData}`);
      }
    } catch (err) {
      console.error(err);
      setSubmissionError("An unexpected error occurred.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Tour Package</h2>

        {submissionSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Tour saved successfully. Redirecting...</span>
          </div>
        )}

        {submissionError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{submissionError}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`w-full border rounded px-3 py-2 ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price per Person</label>
            <input
              type="number"
              step="0.01"
              {...register("price_per_person", { required: "Price is required", valueAsNumber: true })}
              className={`w-full border rounded px-3 py-2 ${errors.price_per_person ? "border-red-500" : ""}`}
            />
            {errors.price_per_person && (
              <p className="text-red-500 text-xs italic">{errors.price_per_person.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration (days)</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className={`w-full border rounded px-3 py-2 ${errors.location ? "border-red-500" : ""}`}
          />
          {errors.location && <p className="text-red-500 text-xs italic">{errors.location.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Season</label>
            <select
              {...register("season")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="monsoon">Monsoon</option>
              <option value="spring">Spring</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tour Type</label>
            <select
              {...register("tourType")}
              className="w-full border rounded px-3 py-2"
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
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Available Spots</label>
            <input
              type="number"
              {...register("availability", { valueAsNumber: true })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Min Group Size</label>
            <input
              type="number"
              {...register("min_group_size", { valueAsNumber: true, min: 1 })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Group Size</label>
            <input
              type="number"
              {...register("max_group_size", { valueAsNumber: true, min: 1 })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(availableTags) && availableTags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={tag.id}
                  {...register("tags")}
                />
                <span className="text-sm">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">AI Keywords (comma-separated)</label>
          <input
            type="text"
            {...register("ai_keywords")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="mainImage"
              className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Choose Image
            </label>
            {mainImage && <span className="text-sm text-gray-600">{mainImage.name}</span>}
          </div>
          <input
            type="file"
            id="mainImage"
            className="hidden"
            onChange={(e) => setMainImage(e.target.files[0])}
          />
        </div>

        <div>
  <label className="block text-sm font-medium mb-1">Gallery Images (up to 5)</label>
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => {
      const files = Array.from(e.target.files).slice(0, 5);
      setGalleryImages(files);
    }}
    className="w-full border rounded px-3 py-2 cursor-pointer"
  />
</div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Tour"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}