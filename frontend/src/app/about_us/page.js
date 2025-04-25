"use client";
import React from "react";
import Image from "next/image";
import Promotion from "@/app/components/Promotion";
import VideoComponent from "@/app/components/VideoComponent";
import TourPackages from "@/app/components/TourPackages";
import Reviews from "@/app/components/Reviews";
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";


const AboutUs = () => {
  return (
    <div className="bg-white about-us">
      {/* Hero Section with Image */}
      <div className="relative w-full h-screen">
        {/* Next.js Optimized Image */}
        <Image
  src="/assets/images/Beach.jpg"
  alt="Beach"
  fill
  style={{ objectFit: "cover" }}
  sizes="(max-width: 768px) 100vw, 33vw"
/>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>

        {/* Hero Content */}
        <section className="relative z-20 flex flex-col justify-center items-center text-center h-full text-white px-4">
          <p className="text-sm uppercase tracking-wider">READ</p>
          <h1 className="text-5xl md:text-6xl font-semibold font-cursive">About Us</h1>
        </section>
      </div>

      {/* Other Components */}
      <Promotion />
      <VideoComponent />
      <TourPackages />
      <Reviews />
      <FooterSection />
    </div>
  );
};

export default AboutUs;
