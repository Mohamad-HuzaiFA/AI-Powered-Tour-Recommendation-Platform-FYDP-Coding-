
// "use client";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function ManagePackages() {
//   const router = useRouter();
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchTours();
//   }, []);

//   const fetchTours = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('accessToken'); // Or however you store your token
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/company/tours/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Assuming you're using JWT Bearer authentication
//           },
//         }
//       );
//       setTours(response.data);
//     } catch (err) {
//       console.error("Error fetching tours:", err);
//       setError("Failed to load tours.");
//       toast.error("Failed to load tours.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (tourId) => {
//     if (!window.confirm("Are you sure you want to delete this tour?")) return;
//     try {
//       const token = localStorage.getItem('accessToken'); // Or however you store your token
//       await axios.delete(`http://127.0.0.1:8000/api/tours/${tourId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Assuming JWT Bearer authentication
//         },
//       });
//       toast.success("Tour deleted successfully!");
//       fetchTours();
//     } catch (err) {
//       console.error("Error deleting tour:", err);
//       toast.error("Failed to delete tour.");
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8 flex justify-between items-center">
//           <h2 className="text-3xl font-semibold text-gray-800">
//             Manage Tour Packages
//           </h2>
//           <Link
//             href="/add_package"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Add New Package
//           </Link>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-600 py-6">Loading tours...</p>
//         ) : error ? (
//           <div className="text-red-500">{error}</div>
//         ) : tours.length === 0 ? (
//           <p className="text-gray-600 text-center py-6">No tours available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tours.map((tour) => (
//               <div
//                 key={tour.id}
//                 className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
//               >
//                 {tour.main_image && (
//                   <img
//                     src={`${tour.main_image}`}
//                     alt={tour.title}
//                     className="w-full h-64 object-cover"
//                   />
//                 )}
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     {tour.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                     {tour.description}
//                   </p>
//                   <p className="font-bold text-indigo-600 mb-3">
//                     Price: ${tour.price_per_person}
//                   </p>
//                   <div className="flex justify-end gap-2">
//                     <Link
//                       href={`/update_package/${tour.id}`}
//                       className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm font-semibold focus:outline-none focus:shadow-outline"
//                     >
//                       <PencilIcon className="h-5 w-5 inline-block mr-1" />
//                       Update
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(tour.id)}
//                       className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-semibold focus:outline-none focus:shadow-outline"
//                     >
//                       <TrashIcon className="h-5 w-5 inline-block mr-1" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {/* Toast container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// }

// export default ManagePackages;





"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import TourListSkeletons from "@/app/components/TourListSkeletons";


export default function ManagePackages() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1) Fetch company tours via React Query
  const { data: tours = [], isLoading, isError } = useQuery({
    queryKey: ["companyTours"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/company/tours/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,    // cache for 5 minutes
    refetchOnWindowFocus: false, // don’t refetch when window gains focus
    onError: () => {
      toast.error("Failed to load tours.");
    },
  });

  // 2) Mutation to delete a tour, with invalidation
  const deleteMutation = useMutation({
    mutationFn: async (tourId) => {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Tour deleted successfully!");
      queryClient.invalidateQueries(["companyTours"]);
    },
    onError: () => {
      toast.error("Failed to delete tour.");
    },
  });

  const handleDelete = useCallback(
    (tourId) => {
      if (!window.confirm("Are you sure you want to delete this tour?")) return;
      deleteMutation.mutate(tourId);
    },
    [deleteMutation]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Manage Tour Packages
          </h2>
          <Link
            href="/add_package"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Package
          </Link>
        </div>

        {isLoading ? (
          <TourListSkeletons />
        ) : isError ? (
          <div className="text-center text-red-500 py-6">
            Failed to load tours.
          </div>
        ) : tours.length === 0 ? (
          <p className="text-gray-600 text-center py-6">No tours available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
              >
                {tour.main_image && (
                  <img
                    src={tour.main_image}
                    alt={tour.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {tour.description}
                  </p>
                  <p className="font-bold text-indigo-600 mb-3">
                    Price: ${tour.price_per_person}
                  </p>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/update_package/${tour.id}`}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm font-semibold"
                    >
                      <PencilIcon className="h-5 w-5 inline-block mr-1" />
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-semibold"
                    >
                      <TrashIcon className="h-5 w-5 inline-block mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </div>
  );
}
