"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const services = [
  {
    title: "Tour Recommendations",
    description:
      "Get curated travel suggestions based on your interests like adventure, nature, culture, and more.",
    icon: "🧭",
  },
  {
    title: "Trip Planning Guide",
    description:
      "Access sample itineraries, travel tips, and budget planning to make your tour stress-free.",
    icon: "🧳",
  },
  {
    title: "Accommodation Advice",
    description:
      "Find the best places to stay — from affordable hostels to luxurious resorts.",
    icon: "🏨",
  },
  {
    title: "Transport Guidance",
    description:
      "Navigate local travel easily with advice on public transport, car rentals, and more.",
    icon: "🚗",
  },
  {
    title: "Local Experiences",
    description:
      "Discover unique local activities, food tours, cultural festivals, and hidden gems.",
    icon: "🌍",
  },
  {
    title: "24/7 Travel Support",
    description:
      "Reach out to us anytime for help with your trip — we’re just a message away.",
    icon: "📞",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Add padding top to push content below fixed navbar */}
      <div className="min-h-screen pt-20 px-6 py-12 bg-white text-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Our Services</h1>
          <p className="text-lg text-center mb-12">
            Explore the services we offer to make your travel experience smooth
            and memorable.
          </p>

          {/* Services Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-5xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to plan your next adventure?
            </h2>
            <Link href="/">
              <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition cursor-pointer">
                Start Planning
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
