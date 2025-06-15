
"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useParams, useRouter } from "next/navigation";
import Image from 'next/image';
import { FaMapMarkerAlt, FaListAlt, FaInfoCircle, FaClock, FaUsers, FaTag } from 'react-icons/fa'; // Removed FaImage as Gallery tab is removed
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import "@/app/tour_info/tour_info.css";
// import GalleryContent from "@/app/components/GalleryContent"; // GalleryContent is no longer directly used in tabs
import TourPlanContent from "@/app/components/TourPlanContent";

const MapContent = dynamic(() => import("@/app/components/MapContent"), {
  ssr: false,
});

// Updated tab configuration: 'Information' is back, 'Gallery' is removed.
const tabConfig = [
  { id: "information", label: "Information", icon: <FaInfoCircle /> }, // Restored Information tab
  { id: "tourplan", label: "Tour Plan", icon: <FaListAlt /> },
  { id: "location", label: "Location", icon: <FaMapMarkerAlt /> },
  // { id: "gallery", label: "Gallery", icon: <FaImage /> }, // Gallery tab commented out/removed
];

export default function TourInfo() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("information"); // Default to Information tab
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined.");
      setError("Application configuration error: API URL missing.");
      setLoading(false);
      return;
    }

    const fetchTourDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/tours/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setTour(data);
      } catch (err) {
        console.error("Failed to fetch tour details:", err);
        setError("Failed to load tour details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTourDetails();
    }
  }, [id, API_URL, router]);

  const handleBookNowClick = () => {
    router.push(`/booking/${id}`);
  };

  if (loading) return <div className="text-center py-10">Loading tour details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error} <button onClick={() => router.refresh()} className="underline">Try again</button></div>;
  if (!tour) return null; // Or a "Tour not found" message

  const renderTabContent = () => {
    switch (activeTab) {
      case "information":
        return (
          <>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{tour.title}</h1>
            <p className="text-2xl text-red-500 font-semibold mb-6">
              From ${tour.dynamic_price || tour.price_per_person} / per person
              {tour.dynamic_price && tour.dynamic_price !== tour.price_per_person && (
                <span className="text-sm text-gray-500 ml-2">(Base: ${tour.price_per_person})</span>
              )}
            </p>
            <div className="relative rounded-2xl shadow-2xl border border-gray-200 overflow-hidden aspect-video">
              <Image
                src={tour.main_image}
                alt={tour.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            {/* The detailed description and other quick facts are now in the right sidebar (Overview) */}
            <p className="text-gray-600 mt-8">
                {tour.description || "A brief introduction to this amazing tour."}
            </p>
          </>
        );

      case "location":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Location</h2>
            {tour.latitude && tour.longitude ? (
              <MapContent
                latitude={tour.latitude}
                longitude={tour.longitude}
                locationName={tour.location}
              />
            ) : (
              <p className="text-gray-500">Location data not available.</p>
            )}
            <p className="mt-2 text-gray-600">Location: {tour.location}</p>
          </div>
        );

      // Removed 'gallery' case:
      // case "gallery":
      //   return (
      //     <div>
      //       <h2 className="text-xl font-semibold text-gray-700 mb-4">Gallery</h2>
      //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      //         <GalleryContent tourId={id} mainImage={tour.main_image} />
      //       </div>
      //     </div>
      //   );

      case "tourplan":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Tour Plan</h2>
            <TourPlanContent tourId={id} />
          </div>
        );

      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <>
      <div>
        <Navbar />

        {/* Hero Section - now just a colored banner for the title */}
        <section
          className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center text-white firstContent bg-gradient-to-r from-red-500 to-red-700"
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-widest mb-2">Explore This Tour</p>
            <h1 className="text-5xl md:text-6xl font-semibold font-[Great Vibes] drop-shadow-lg">{tour.title}</h1>
          </div>
        </section>

        {/* Tab buttons below the main image banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center mt-8 px-4 max-w-7xl mx-auto">
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex flex-col items-center justify-center gap-2 px-4 py-3 text-lg font-semibold rounded transition duration-300 cursor-pointer
                ${activeTab === tab.id
                  ? "text-red-600 underline"
                  : "text-gray-700 hover:text-red-500 hover:bg-gray-100"
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 px-6 max-w-7xl mx-auto my-16">
          {/* Main content area (left for tabs) */}
          <div className="w-full lg:w-2/3 space-y-6">
            {renderTabContent()}
          </div>

          {/* Overview content (right sidebar) - remains the same */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white p-6 shadow-lg rounded-lg sticky top-20">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
              <p className="text-2xl text-red-500 font-semibold mb-6">
                From ${tour.dynamic_price || tour.price_per_person} / per person
                {tour.dynamic_price && tour.dynamic_price !== tour.price_per_person && (
                  <span className="text-sm text-gray-500 ml-2">(Base: ${tour.price_per_person})</span>
                )}
              </p>
              {/* This description is more for the "overview" context */}
              <div className="mt-8 space-y-4">
                <p className="text-gray-600">{tour.description || "No detailed overview available."}</p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock /> Duration: {tour.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt /> Location: {tour.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers /> Group Size: {tour.min_group_size}-{tour.max_group_size}
                </div>
                {tour.tour_type && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTag /> Type: {tour.tour_type}
                  </div>
                )}
                {tour.season && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTag /> Season: {tour.season}
                  </div>
                )}
                {tour.tags && tour.tags.length > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTag /> Tags: {tour.tags.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Book Now Button at the very bottom, full width of the content area */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
            <button
              onClick={handleBookNowClick}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Now
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">
                Proceed to securely book your tour.
            </p>
        </div>

        <FooterSection />
      </div>
    </>
  );
}












