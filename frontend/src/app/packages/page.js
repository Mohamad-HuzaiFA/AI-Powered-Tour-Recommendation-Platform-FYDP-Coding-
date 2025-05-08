// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { FaCalendarAlt, FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown, FaStar } from "react-icons/fa";
// import FooterSection from "@/app/components/FooterSection";
// import Navbar from "@/app/components/Navbar";
// import "@/app/packages/packages.css";

// const Booktour = () => {
//   const router = useRouter();
//   const [sortOption, setSortOption] = useState(null);
//   const [allTours, setAllTours] = useState([]); // Store the initially fetched tours
//   const [displayedTours, setDisplayedTours] = useState([]); // Store the sorted and displayed tours
//   const [loading, setLoading] = useState(true);

//   const sortTours = useCallback((toursToSort, option) => {
//     const sorted = [...toursToSort]; // clone to avoid mutation
//     switch (option) {
//       case "date":
//         return sorted.sort(
//           (a, b) => new Date(a?.date || 0) - new Date(b?.date || 0)
//         );
//       case "priceHigh":
//         return sorted.sort((a, b) => b.price_per_person - a.price_per_person);
//       case "priceLow":
//         return sorted.sort((a, b) => a.price_per_person - b.price_per_person);
//       case "nameAZ":
//         return sorted.sort((a, b) => a.title.localeCompare(b.title));
//       default:
//         return toursToSort;
//     }
//   }, []);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/`);
//         const data = response.data;
//         const tourList = Array.isArray(data) ? data : [];
//         setAllTours(tourList);
//         setDisplayedTours(sortTours(tourList, sortOption)); // Initial sort
//       } catch (error) {
//         console.error("Failed to fetch tours:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTours();
//   }, [sortTours]); // Removed sortOption from dependency array

//   useEffect(() => {
//     // Sort the displayed tours whenever the sortOption changes
//     setDisplayedTours(sortTours(allTours, sortOption));
//   }, [sortOption, allTours, sortTours]);

//   return (
//     <>
//       <div>
//         {/* Background Section */}
//         <div className="relative w-full min-h-screen bg-[url('/assets/images/background.jpg')] bg-no-repeat bg-center bg-cover">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
//           <Navbar />

//           <section className="relative z-10 flex flex-col items-center justify-center h-[90vh] text-center text-white">
//             <p className="text-sm uppercase tracking-wider text-gray-300">
//               Explore the world
//             </p>
//             <h1 className="text-6xl md:text-7xl font-extrabold font-[Great Vibes] drop-shadow-lg">
//               Travel with us
//             </h1>
//             <span className="mt-4 text-lg text-gray-200">
//               Unforgettable adventures await
//             </span>
//           </section>
//         </div>

//         <div className="secondPart py-12 bg-gray-100">
//           {/* Sorting Buttons */}
//           <div className="myOptions flex flex-wrap justify-center space-x-4 gap-4 py-6 px-4 md:px-10">
//             {[
//               { label: "Date", value: "date", icon: <FaCalendarAlt /> },
//               { label: "Price (High to Low)", value: "priceHigh", icon: <FaSortAmountDown /> },
//               { label: "Price (Low to High)", value: "priceLow", icon: <FaSortAmountUp /> },
//               { label: "Name (A-Z)", value: "nameAZ", icon: <FaSortAlphaDown /> },
//             ].map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSortOption(item.value)}
//                 className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-md transition duration-300 cursor-pointer ${
//                   sortOption === item.value
//                     ? "bg-red-600 text-white shadow-md"
//                     : "bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow-sm"
//                 }`}
//               >
//                 {item.icon}
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* Tour Cards or Loading */}
//           <div className="main-part container mx-auto mt-8">
//             {loading ? (
//               <p className="text-center text-gray-500 py-10">
//                 Loading tours...
//               </p>
//             ) : (
//               <div className="ImagesCard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
//                 {displayedTours.map((tour, index) => (
//                   <div
//                     key={index}
//                     onClick={() => router.push(`/tour_info/${tour.id}`)}
//                     className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg"
//                   >
//                     <div className="relative">
//                       <img
//                         loading="lazy"
//                         src={tour.main_image}
//                         alt={tour.title}
//                         className="w-full h-64 object-cover"
//                       />
//                       <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md z-10">
//                         ${tour.price_per_person}
//                       </span>
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-800 line-clamp-2">
//                         {tour.title}
//                       </h3>
//                       <p className="text-gray-600 mb-4 line-clamp-3">
//                         {tour.description && tour.description.substring(0, 100)}...
//                       </p>
//                       <div className="flex justify-between items-center mt-4">
//                         <span className="flex items-center text-yellow-500">
//                           <FaStar className="mr-1" /> {tour.rating || "N/A"}
//                         </span>
//                         <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Booking Form Placeholder - You can add a booking form component here */}
//           {/* <div className="container mx-auto mt-12 px-4 md:px-0">
//             <h2>Book Your Adventure</h2>
//             {/* Add your booking form here */}
//           {/* </div> */}
//         </div>

//         <FooterSection />
//       </div>
//     </>
//   );
// };

// export default Booktour;






import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";
import TourList from "@/app/components/TourList";

export const revalidate = 60; // ISR: cache page for 60s

export default async function PackagesPage() {
  // Server‑side fetch (cached by Next.js)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tours/`,
    { next: { revalidate: 60 } }
  );
  // const initialTours = await res.json();
  const data = await res.json();
  const initialTours = {
    results: Array.isArray(data.results) ? data.results : [],
    count: data.count || 0,
    next: data.next || null,
    previous: data.previous || null,
  };
  
  return (
    <>
      {/* ——— Hero / Background Section (unchanged) ——— */}
      <div className="relative w-full min-h-screen bg-[url('/assets/images/background.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        <Navbar />
        <section className="relative z-10 flex flex-col items-center justify-center h-[90vh] text-center text-white">
          <p className="text-sm uppercase tracking-wider text-gray-300">
            Explore the world
          </p>
          <h1 className="text-6xl md:text-7xl font-extrabold font-[Great Vibes] drop-shadow-lg">
            Travel with us
          </h1>
          <span className="mt-4 text-lg text-gray-200">
            Unforgettable adventures await
          </span>
        </section>
      </div>

      {/* ——— Client‑side TourList (sorting, caching, skeletons) ——— */}
      <TourList initialTours={initialTours} 
// initialCount={initialCount}      
      />

      <FooterSection />
    </>
  );
}


