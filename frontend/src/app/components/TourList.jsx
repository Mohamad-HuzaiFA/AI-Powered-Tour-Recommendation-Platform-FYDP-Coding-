// "use client";

// import React, { useState, useMemo, useCallback } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import {
//   FaCalendarAlt,
//   FaSortAmountDown,
//   FaSortAmountUp,
//   FaSortAlphaDown,
//   FaStar,
// } from "react-icons/fa";
// import "@/app/packages/packages.css";
// import TourListSkeletons from "./TourListSkeletons";

// const ITEMS_PER_PAGE = 9; // Or 12 - ensure consistency with your backend's default

// export default function TourList({ initialTours = [], initialCount = 0 }) {
//   const router = useRouter();
//   const [page, setPage] = useState(1);
//   const [sortOption, setSortOption] = useState(null);

//   const {
//     data: pagedData = { results: [], next: null, previous: null, count: 0 },
//     isLoading,
//   } = useQuery({
//     queryKey: ["tours", page, sortOption],
//     queryFn: () =>
//       axios
//         .get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/`, {
//           params: { page, limit: ITEMS_PER_PAGE, sort: sortOption },
//         })
//         .then((res) => res.data),
//     initialData: page === 1 ? initialTours : undefined,
//     keepPreviousData: true,
//     staleTime: 1000 * 60 * 5,
//   });

//   const sortTours = useCallback((list = [], option) => {
//     const arr = Array.isArray(list) ? [...list] : [];
//     switch (option) {
//       case "date":
//         return arr.sort(
//           (a, b) => new Date(a.date || 0) - new Date(b.date || 0)
//         );
//       case "priceHigh":
//         return arr.sort((a, b) => b.price_per_person - a.price_per_person);
//       case "priceLow":
//         return arr.sort((a, b) => a.price_per_person - b.price_per_person);
//       case "nameAZ":
//         return arr.sort((a, b) => a.title.localeCompare(b.title));
//       default:
//         return arr;
//     }
//   }, []);

//   const displayedTours = useMemo(
//     () => sortTours(pagedData.results || [], sortOption),
//     [pagedData.results, sortOption, sortTours]
//   );

//   //   const totalPages = useMemo(() => {
//   //     return Math.ceil(pagedData.count / ITEMS_PER_PAGE);
//   //   }, [pagedData.count]);

//   const totalPages = Math.ceil(pagedData.count / ITEMS_PER_PAGE);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const handleSortChange = (newSortOption) => {
//     setSortOption(newSortOption);
//     setPage(1);
//   };

//   const truncateDescription = (text, maxLength) => {
//     if (!text || text.length <= maxLength) return text;
//     const truncated = text.slice(0, maxLength);
//     const lastSpace = truncated.lastIndexOf(" ");
//     return lastSpace !== -1
//       ? `${truncated.slice(0, lastSpace)}...`
//       : `${truncated}...`;
//   };

//   return (
//     <div className="secondPart py-12 bg-gray-100">
//       {/* Sorting Buttons */}
//       <div className="myOptions flex flex-wrap justify-center gap-4 py-6 px-4 md:px-10">
//         {[
//           { label: "Date", value: "date", icon: <FaCalendarAlt /> },
//           {
//             label: "Price H→L",
//             value: "priceHigh",
//             icon: <FaSortAmountDown />,
//           },
//           { label: "Price L→H", value: "priceLow", icon: <FaSortAmountUp /> },
//           { label: "Name A→Z", value: "nameAZ", icon: <FaSortAlphaDown /> },
//         ].map((item, idx) => (
//           <button
//             key={idx}
//             onClick={() => handleSortChange(item.value)}
//             className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-md transition duration-300 cursor-pointer ${
//               sortOption === item.value
//                 ? "bg-red-600 text-white shadow-md"
//                 : "bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow-sm"
//             }`}
//           >
//             {item.icon} {item.label}
//           </button>
//         ))}
//       </div>

//       {/* Tour Cards */}
//       <div className="main-part container mx-auto mt-8">
//         {isLoading ? (
//           <TourListSkeletons />
//         ) : (
//           <div className="ImagesCard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
//             {displayedTours.map((tour) => (
//               <div
//                 key={tour.id}
//                 onClick={() => router.push(`/tour_info/${tour.id}`)}
//                 className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg"
//               >
//                 <div className="relative">
//                   <img
//                     loading="lazy"
//                     src={tour.main_image}
//                     alt={tour.title}
//                     className="w-full h-64 object-cover"
//                   />
//                   <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md z-10">
//                     ${tour.price_per_person}
//                   </span>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
//                     {tour.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4 line-clamp-3">
//                     {truncateDescription(tour.description, 80)}
//                   </p>
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="flex items-center text-yellow-500">
//                       <FaStar className="mr-1" /> {tour.rating || "N/A"}
//                     </span>
//                     <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-4 py-8">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={!pagedData.previous}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
//         >
//           ← Prev
//         </button>
//         <span className="text-gray-700">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={!pagedData.next}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSortAlphaDown,
  FaStar,
  FaSearch,
} from "react-icons/fa";
import "@/app/packages/packages.css";
import TourListSkeletons from "./TourListSkeletons";
import { debounce } from "lodash"; // Import debounce

const ITEMS_PER_PAGE = 9; // Or 12

export default function TourList({ initialTours = [], initialCount = 0 }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: pagedData = { results: [], next: null, previous: null, count: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tours", page, sortOption, searchQuery], // Include searchQuery in the key
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/`, {
          params: {
            page,
            limit: ITEMS_PER_PAGE,
            sort: sortOption,
            search: searchQuery,
          }, // Send search query
        })
        .then((res) => res.data),
    initialData:
      page === 1 && !searchQuery // Only use initialTours if it's the first page and no search
        ? initialTours
        : undefined,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const sortTours = useCallback((list = [], option) => {
    const arr = Array.isArray(list) ? [...list] : [];
    switch (option) {
      case "date":
        return arr.sort(
          (a, b) => new Date(a.date || 0) - new Date(b.date || 0)
        );
      case "priceHigh":
        return arr.sort((a, b) => b.price_per_person - a.price_per_person);
      case "priceLow":
        return arr.sort((a, b) => a.price_per_person - b.price_per_person);
      case "nameAZ":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return arr;
    }
  }, []);

  const displayedTours = useMemo(
    () => sortTours(pagedData.results || [], sortOption),
    [pagedData.results, sortOption, sortTours]
  );

  const totalPages = Math.ceil(pagedData.count / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setPage(1);
  };

  const handleSearchChange = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPage(1); // Reset page on new search
    }, 300), // 300ms debounce delay
    []
  );

  const truncateDescription = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace !== -1
      ? `${truncated.slice(0, lastSpace)}...`
      : `${truncated}...`;
  };

  return (
    <div className="secondPart py-12 bg-gray-100">
      {/* Search Input */}
      <div className="my-6 px-4 md:px-10 flex justify-center">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            id="search-tour"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            placeholder="Search for tours..."
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Sorting Buttons */}
      <div className="myOptions flex flex-wrap justify-center gap-4 py-6 px-4 md:px-10">
        {[
          { label: "Date", value: "date", icon: <FaCalendarAlt /> },
          {
            label: "Price H→L",
            value: "priceHigh",
            icon: <FaSortAmountDown />,
          },
          { label: "Price L→H", value: "priceLow", icon: <FaSortAmountUp /> },
          { label: "Name A→Z", value: "nameAZ", icon: <FaSortAlphaDown /> },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSortChange(item.value)}
            className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-md transition duration-300 cursor-pointer ${
              sortOption === item.value
                ? "bg-red-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow-sm"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* Tour Cards */}
      <div className="main-part container mx-auto mt-8">
        {isLoading ? (
          <TourListSkeletons />
        ) : (
          <div className="ImagesCard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {displayedTours.map((tour) => (
              <div
                key={tour.id}
                onClick={() => router.push(`/tour_info/${tour.id}`)}
                className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    loading="lazy"
                    src={tour.main_image}
                    alt={tour.title}
                    className="w-full h-64 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md z-10">
                    ${tour.price_per_person}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateDescription(tour.description, 80)}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" /> {tour.rating || "N/A"}
                    </span>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 py-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!pagedData.previous}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          ← Prev
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!pagedData.next}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
