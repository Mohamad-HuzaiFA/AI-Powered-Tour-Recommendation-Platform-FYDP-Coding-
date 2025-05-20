// // src/components/CompareTray.jsx
// "use client";

// import React from "react";
// import { useComparison } from "@/context/comparisonContext";
// import Link from "next/link";

// const CompareTray = () => {
//   const { comparedTours, removeFromCompare } = useComparison();

//   if (comparedTours.length === 0) {
//     return null; // Don't show the tray if no tours are selected
//   }

//   return (
//     <div className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200 p-4 shadow-md z-50">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           {/* Will display selected tour previews here */}
//           {comparedTours.map((tourId) => (
//             <div
//               key={tourId}
//               className="flex items-center border rounded-md p-2"
//             >
//               {/* Placeholder for thumbnail */}
//               <div className="w-10 h-10 bg-gray-300 rounded-sm mr-2"></div>
//               <span>Tour ID: {tourId}</span>
//               <button
//                 onClick={() => removeFromCompare(tourId)}
//                 className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>
//         {comparedTours.length >= 2 && (
//           <Link href="/compare-tours">
//             <span className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 cursor-pointer">
//               Compare ({comparedTours.length})
//             </span>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompareTray;

// src/components/CompareTray.jsx
// "use client";

// import React from "react";
// import { useComparison } from "@/hooks/comparisonContext";
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { FaTimes } from "react-icons/fa"; // For the remove button

// const CompareTray = () => {
//   const { comparedTours, removeFromCompare } = useComparison();

//   // Fetch details for all compared tours
//   const {
//     data: comparedTourDetails,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["comparedToursDetails", comparedTours],
//     queryFn: async () => {
//       if (comparedTours.length > 0) {
//         const requests = comparedTours.map((tourId) =>
//           axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/`)
//         );
//         const responses = await Promise.all(requests);
//         return responses.map((res) => res.data);
//       }
//       return [];
//     },
//     enabled: comparedTours.length > 0, // Only fetch if there are tours to compare
//     staleTime: Infinity, // Data doesn't change often
//   });

//   if (comparedTours.length === 0) {
//     return null; // Don't show the tray if no tours are selected
//   }

//   if (isLoading) {
//     return (
//       <div className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200 p-4 shadow-md z-50">
//         Loading comparison tray...
//       </div>
//     );
//   }

//   if (isError) {
//     console.error("Error fetching compared tour details:", error);
//     return (
//       <div className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200 p-4 shadow-md z-50 text-red-500">
//         Error loading comparison tray.
//       </div>
//     );
//   }

//   return (
//     <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-md z-50">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="flex items-center space-x-4 overflow-x-auto">
//           {comparedTourDetails &&
//             comparedTourDetails.map((tour) => (
//               <div
//                 key={tour.id}
//                 className="flex items-center border rounded-md p-2 shadow-sm bg-gray-50"
//               >
//                 <div className="w-12 h-12 rounded-sm mr-2 overflow-hidden">
//                   <img
//                     loading="lazy"
//                     src={tour.main_image}
//                     alt={tour.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <span className="text-sm font-semibold line-clamp-1">
//                   {tour.title}
//                 </span>
//                 <button
//                   onClick={() => removeFromCompare(tour.id)}
//                   className="ml-2 text-red-500 hover:text-red-700 cursor-pointer focus:outline-none"
//                 >
//                   <FaTimes size={14} />
//                 </button>
//               </div>
//             ))}
//         </div>
//         {comparedTours.length >= 2 && (
//           <Link href="/compare-tours">
//             <span className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 cursor-pointer focus:outline-none">
//               Compare ({comparedTours.length})
//             </span>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompareTray;

"use client";

import React, { useState } from "react";
import { useComparison } from "@/hooks/comparisonContext";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTimes, FaChevronUp, FaChevronDown } from "react-icons/fa"; // Import icons

const CompareTray = () => {
  const { comparedTours, removeFromCompare } = useComparison();
  const [isMinimized, setIsMinimized] = useState(false);

  // Fetch details for all compared tours (same as before)
  const {
    data: comparedTourDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comparedToursDetails", comparedTours],
    queryFn: async () => {
      if (comparedTours.length > 0) {
        const requests = comparedTours.map((tourId) =>
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/`)
        );
        const responses = await Promise.all(requests);
        return responses.map((res) => res.data);
      }
      return [];
    },
    enabled: comparedTours.length > 0,
    staleTime: Infinity,
  });

  if (comparedTours.length === 0) {
    return null;
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 transition-all duration-300 ${
        isMinimized ? "py-1" : "p-4" // Reduced vertical padding when minimized
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={toggleMinimize}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label={
            isMinimized ? "Expand compare tray" : "Minimize compare tray"
          }
        >
          {isMinimized ? (
            <FaChevronUp size={16} />
          ) : (
            <FaChevronDown size={16} />
          )}
        </button>

        {!isMinimized && (
          <div className="flex items-center space-x-4 overflow-x-auto">
            {isLoading && <div>Loading...</div>}
            {isError && <div className="text-red-500">Error loading tray.</div>}
            {comparedTourDetails &&
              comparedTourDetails.map((tour) => (
                <div
                  key={tour.id}
                  className="flex items-center border rounded-md p-2 shadow-sm bg-gray-50"
                >
                  <div className="w-12 h-12 rounded-sm mr-2 overflow-hidden">
                    <img
                      loading="lazy"
                      src={tour.main_image}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold line-clamp-1">
                    {tour.title}
                  </span>
                  <button
                    onClick={() => removeFromCompare(tour.id)}
                    className="ml-2 text-red-500 hover:text-red-700 cursor-pointer focus:outline-none"
                    aria-label={`Remove ${tour.title} from comparison`}
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
          </div>
        )}

        {comparedTours.length >= 2 && (
          <Link href="/compare-tours">
            <span className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 cursor-pointer focus:outline-none">
              Compare ({comparedTours.length})
            </span>
          </Link>
        )}
      </div>
      {isMinimized && comparedTours.length > 0 && (
        <div className="container mx-auto text-center text-xs text-gray-600 py-0.5">
          {" "}
          {/* Reduced padding and smaller font */}
          Comparing {comparedTours.length} tours.
        </div>
      )}
    </div>
  );
};

export default CompareTray;
