"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useParams } from "next/navigation";
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import PlanTour from "@/app/components/plan_tour";
import "@/app/tour_info/tour_info.css";
import GalleryContent from "@/app/components/GalleryContent";
import TourPlanContent from "@/app/components/TourPlanContent";

const MapContent = dynamic(() => import("@/app/components/MapContent"), {
  ssr: false,
});

export default function TourInfo() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("information");
  const [tour, setTour] = useState(null);
  const [value, setValue] = useState(15);

  useEffect(() => {
    const fetchTour = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/tours/${id}`);
      const data = await res.json();
      setTour(data);
    };

    fetchTour();
  }, [id]);

  if (!tour) return <div className="text-center py-10">Loading...</div>;

  // 🔄 Switch Tab Content Here
  const renderTabContent = () => {
    switch (activeTab) {
      case "information":
        return (
          <>
            <h1 className="text-4xl font-extrabold text-gray-800">
              {tour.title}
            </h1>
            <p className="text-2xl text-red-500 font-semibold">
              ${tour.price} / per couple
            </p>
            <img
              src={tour.main_image}
              alt={tour.title}
              className="rounded-2xl w-full h-[450px] object-cover shadow-2xl border border-gray-200"
            />
          </>
        );

      case "location":
        return (
          <div>
            <MapContent locationName={tour.location_name} />
          </div>
        );

      case "gallery":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GalleryContent/>
          </div>
        );

      case "tourplan":
        return (
          <div>
            <TourPlanContent/>
          </div>
        );

      default:
        return <p>Content not available.</p>;
    }
  };

  return (
    <>
      <div>
        <Navbar />

        {/* Hero section always shown */}
        <section className="w-full h-[60vh] flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 firstContent">
          <p className="text-sm uppercase tracking-widest">Search Tour</p>
          <h1 className="text-6xl font-semibold font-[Great Vibes]">
            Travel with us
          </h1>
        </section>

        {/* Tab Buttons */}
        <div className="myoptions flex flex-wrap gap-6 justify-center my-8">
          {["Information", "Tour Plan", "Location", "Gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
              className={`px-4 py-2 text-lg font-semibold rounded transition duration-300 ${
                activeTab === tab.toLowerCase().replace(" ", "")
                  ? "text-red-600 underline"
                  : "hover:text-red-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content: Dynamic Based on Tab */}
        <div className="flex flex-col lg:flex-row gap-10 px-6 max-w-7xl mx-auto my-16">
          {/* Left Content */}
          <div className="w-full lg:w-2/3 space-y-6">{renderTabContent()}</div>

          {/* Booking Form */}
          <div className="bookPart bg-white p-6 shadow-lg rounded-lg">
            <PlanTour />
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
}
