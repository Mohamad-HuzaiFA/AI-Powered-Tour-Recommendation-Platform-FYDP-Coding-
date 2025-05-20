// "use client";
// import React from "react";
// import Link from "next/link";
// import Navbar from "../components/Navbar";

// const services = [
//   {
//     title: "Tour Recommendations",
//     description:
//       "Get curated travel suggestions based on your interests like adventure, nature, culture, and more.",
//     icon: "🧭",
//   },
//   {
//     title: "Trip Planning Guide",
//     description:
//       "Access sample itineraries, travel tips, and budget planning to make your tour stress-free.",
//     icon: "🧳",
//   },
//   {
//     title: "Accommodation Advice",
//     description:
//       "Find the best places to stay — from affordable hostels to luxurious resorts.",
//     icon: "🏨",
//   },
//   {
//     title: "Transport Guidance",
//     description:
//       "Navigate local travel easily with advice on public transport, car rentals, and more.",
//     icon: "🚗",
//   },
//   {
//     title: "Local Experiences",
//     description:
//       "Discover unique local activities, food tours, cultural festivals, and hidden gems.",
//     icon: "🌍",
//   },
//   {
//     title: "24/7 Travel Support",
//     description:
//       "Reach out to us anytime for help with your trip — we’re just a message away.",
//     icon: "📞",
//   },
// ];

// export default function ServicesPage() {
//   return (
//     <>
//       <Navbar />

//       {/* Add padding top to push content below fixed navbar */}
//       <div className="min-h-screen pt-20 px-6 py-12 bg-white text-gray-800">
//         <div className="max-w-5xl mx-auto">
//           <h1 className="text-4xl font-bold mb-6 text-center">Our Services</h1>
//           <p className="text-lg text-center mb-12">
//             Explore the services we offer to make your travel experience smooth
//             and memorable.
//           </p>

//           {/* Services Grid */}
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 border rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
//               >
//                 <div className="text-5xl mb-4 text-center">{service.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2 text-center">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 text-center">
//                   {service.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Call to Action */}
//           <div className="text-center mt-12">
//             <h2 className="text-2xl font-semibold mb-4">
//               Ready to plan your next adventure?
//             </h2>
//             <Link href="/">
//               <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition cursor-pointer">
//                 Start Planning
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }







"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { FaCompass, FaSuitcase, FaHotel, FaCar, FaGlobe, FaPhone } from "react-icons/fa"; // Example icons

const enhancedServices = [
  {
    title: "Tour Recommendations",
    description:
      "Get curated travel suggestions based on your interests like adventure, nature, culture, and more. Imagine finding the perfect hiking trip...",
    icon: <FaCompass size={40} />,
    learnMoreLink: "/recommendations",
    callToAction: "Explore Recommendations",
  },
  {
    title: "Trip Planning Guide",
    description:
      "Access sample itineraries, travel tips, and budget planning to make your tour stress-free. Download our guide...",
    icon: <FaSuitcase size={40} />,
    learnMoreLink: "/trip-planning",
    callToAction: "Download Guide",
  },
  {
    title: "Accommodation Advice",
    description:
      "Find the best places to stay — from affordable hostels to luxurious resorts. Browse our curated list...",
    icon: <FaHotel size={40} />,
    learnMoreLink: "/accommodation",
    callToAction: "Browse Stays",
  },
  {
    title: "Transport Guidance",
    description:
      "Navigate local travel easily with advice on public transport, car rentals, and more. Get tips for your destination...",
    icon: <FaCar size={40} />,
    learnMoreLink: "/transport",
    callToAction: "Get Transport Info",
  },
  {
    title: "Local Experiences",
    description:
      "Discover unique local activities, food tours, cultural festivals, and hidden gems. Uncover authentic experiences...",
    icon: <FaGlobe size={40} />,
    learnMoreLink: "/local-experiences",
    callToAction: "Find Local Activities",
  },
  {
    title: "24/7 Travel Support",
    description:
      "Reach out to us anytime for help with your trip — we’re just a message away. Contact our support team now...",
    icon: <FaPhone size={40} />,
    learnMoreLink: "/contact",
    callToAction: "Contact Support",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 px-6 py-12 bg-white text-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Our Services</h1>
          <p className="text-lg text-center mb-12">
            Explore the services we offer to make your travel experience smooth
            and memorable.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {enhancedServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
              >
                <div className="text-5xl mb-4 text-blue-500">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description.substring(0, 100)}...</p> {/* Shortened description */}
                <Link href={service.learnMoreLink}>
                  <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition cursor-pointer mb-2">
                    Learn More
                  </span>
                </Link>
                {service.callToAction && (
                  <Link href={service.learnMoreLink}>
                    <span className="inline-block text-blue-500 hover:text-blue-600 transition cursor-pointer font-semibold">
                      {service.callToAction}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

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