
// // // src/app/book-tour/page.js
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import axios from "axios";
// // // Assuming you have a component for loading states, e.g., <TourInfoSkeleton />
// // // import TourInfoSkeleton from '../tour_info/[id]/TourInfoSkeleton'; // Adjust path as needed

// // export default function BookTourPage() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const tourId = searchParams.get("tourId"); // Get tourId from query params

// //   const [tour, setTour] = useState(null);
// //   const [bookingDate, setBookingDate] = useState("");
// //   const [numberOfAdults, setNumberOfAdults] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [tourLoading, setTourLoading] = useState(true);

// //   // Fetch tour details to display on this booking confirmation page
// //   useEffect(() => {
// //     if (tourId) {
// //       const fetchTourDetails = async () => {
// //         try {
// //           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/`);
// //           setTour(response.data);
// //           // Set a default booking date (e.g., today or a future date)
// //           setBookingDate(new Date().toISOString().split('T')[0]);
// //         } catch (err) {
// //           console.error("Failed to fetch tour details:", err);
// //           setError("Failed to load tour details. Please try again later.");
// //         } finally {
// //           setTourLoading(false);
// //         }
// //       };
// //       fetchTourDetails();
// //     } else {
// //         setError("No tour ID provided. Please select a tour first.");
// //         setTourLoading(false);
// //     }
// //   }, [tourId]);

// //   const handleConfirmBooking = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);

// //     if (!tourId || !bookingDate || numberOfAdults < 1) {
// //         setError("Please fill all required booking details.");
// //         setLoading(false);
// //         return;
// //     }

// //     try {
// //       // API call to your backend to create the booking
// //       const response = await axios.post(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/create/`, // Adjust your API endpoint
// //         {
// //           tour_id: tourId,
// //           booking_date: bookingDate,
// //           number_of_adults: numberOfAdults,
// //           // Add any other details your backend expects, e.g., user_id (if logged in)
// //         }
// //       );

// //       const { booking_id } = response.data; // Ensure your backend returns { booking_id: '...' }

// //       if (booking_id) {
// //         // Redirect to the payment page using the received booking_id
// //         router.push(`/bookings/${booking_id}/payment`);
// //       } else {
// //         setError("Booking created, but no booking ID received for payment. Please contact support.");
// //       }
// //     } catch (err) {
// //       console.error("Booking creation failed:", err.response?.data || err.message);
// //       setError(err.response?.data?.message || "Failed to create booking. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (tourLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         {/* You can replace this with a skeleton loader */}
// //         <p className="text-gray-600">Loading tour details...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <p className="text-red-600 font-semibold">{error}</p>
// //       </div>
// //     );
// //   }

// //   if (!tour) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <p className="text-gray-600">Tour not found or invalid ID.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
// //       <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">Confirm Your Booking</h1>

// //       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10">
// //         <h2 className="text-2xl font-bold text-gray-800 mb-4">{tour.title}</h2>
// //         <p className="text-gray-600 mb-6">{tour.description}</p>

// //         <form onSubmit={handleConfirmBooking} className="space-y-6">
// //           <div>
// //             <label htmlFor="bookingDate" className="block text-gray-700 text-sm font-semibold mb-2">
// //               Select Your Preferred Date:
// //             </label>
// //             <input
// //               type="date"
// //               id="bookingDate"
// //               value={bookingDate}
// //               onChange={(e) => setBookingDate(e.target.value)}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="numberOfAdults" className="block text-gray-700 text-sm font-semibold mb-2">
// //               Number of Adults:
// //             </label>
// //             <input
// //               type="number"
// //               id="numberOfAdults"
// //               value={numberOfAdults}
// //               onChange={(e) => setNumberOfAdults(parseInt(e.target.value) || 1)}
// //               min="1"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
// //               required
// //             />
// //           </div>

// //           <div className="text-xl font-bold text-gray-800">
// //             Estimated Price: <span className="text-orange-600">${(tour.price_per_person * numberOfAdults).toFixed(2)}</span>
// //           </div>

// //           <button
// //             type="submit"
// //             className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-lg ${
// //               loading ? "opacity-50 cursor-not-allowed" : ""
// //             }`}
// //             disabled={loading}
// //           >
// //             {loading ? "Confirming Booking..." : "Confirm Booking & Proceed to Payment"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }




// // src/app/book-tour/page.js
// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@/hooks/useAuth"; // Import your useAuth hook

// export default function BookTourPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const tourId = searchParams.get("tourId");

//   const { user, isLoggedIn, loading: authLoading } = useAuth(); // Destructure from useAuth

//   const [tour, setTour] = useState(null);
//   const [bookingDate, setBookingDate] = useState("");
//   const [numberOfAdults, setNumberOfAdults] = useState(1);
//   const [loading, setLoading] = useState(false); // For booking submission loading
//   const [error, setError] = useState(null);
//   const [tourLoading, setTourLoading] = useState(true);

//   // Fetch tour details to display on this booking confirmation page
//   useEffect(() => {
//     if (tourId) {
//       const fetchTourDetails = async () => {
//         try {
//           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/`);
//           setTour(response.data);
//           // Set a default booking date (e.g., today or a future date)
//           setBookingDate(new Date().toISOString().split('T')[0]);
//         } catch (err) {
//           console.error("Failed to fetch tour details:", err);
//           setError("Failed to load tour details. Please try again later.");
//         } finally {
//           setTourLoading(false);
//         }
//       };
//       fetchTourDetails();
//     } else {
//         setError("No tour ID provided. Please select a tour first.");
//         setTourLoading(false);
//     }
//   }, [tourId]);

//   const handleConfirmBooking = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!isLoggedIn) {
//         setError("You must be logged in to book a tour. Please log in first.");
//         setLoading(false);
//         return;
//     }

//     if (!tourId || !bookingDate || numberOfAdults < 1) { // This check is good
//         setError("Please fill all required booking details.");
//         setLoading(false);
//         return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/create/`,
//         {
//           // Make sure these match the serializer's expected field names and types
//           tour: tourId, // Changed from tour_id to tour (as per previous fix)
//           booking_date: bookingDate, // Frontend state already provides 'YYYY-MM-DD'
//           number_of_adults: numberOfAdults, // Frontend state already provides an integer
//         },
//         {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             }
//         }
//       );


//       const { booking_id } = response.data;

//       if (booking_id) {
//         router.push(`/bookings/${booking_id}/payment`);
//       } else {
//         setError("Booking created, but no booking ID received for payment. Please contact support.");
//       }
//     } catch (err) {
//       console.error("Booking creation failed:", err.response?.data || err.message);
//       // Improve error message if it's specifically an unauthorized error (401)
//       if (err.response?.status === 401) {
//           setError("Session expired or not logged in. Please log in again.");
//       } else {
//           setError(err.response?.data?.message || "Failed to create booking. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- NEW: Loading state for authentication ---
//   if (authLoading || tourLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }
//   // --- END NEW ---

//   if (error) {
//     // Check if the error is due to not being logged in
//     const isLoginRequiredError = error.includes("You must be logged in") || error.includes("Session expired");

//     return (
//       <div className="flex flex-col items-center justify-center h-screen p-4">
//         <p className="text-red-600 font-semibold text-lg text-center mb-4">{error}</p>
//         {isLoginRequiredError && (
//           <button
//             onClick={() => router.push('/login')} // Assuming your login page is at /login
//             className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//           >
//             Go to Login
//           </button>
//         )}
//         {!isLoginRequiredError && (
//           <button
//             onClick={() => router.back()} // Or router.push('/') to go home
//             className="px-6 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mt-4"
//           >
//             Go Back
//           </button>
//         )}
//       </div>
//     );
//   }

//   if (!tourId || !tour) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-gray-600">No tour selected or tour not found.</p>
//         <button
//           onClick={() => router.push('/')}
//           className="mt-4 px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-300"
//         >
//           Browse Tours
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">Confirm Your Booking</h1>

//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">{tour.title}</h2>
//         <p className="text-gray-600 mb-6">{tour.description}</p>

//         <form onSubmit={handleConfirmBooking} className="space-y-6">
//           <div>
//             <label htmlFor="bookingDate" className="block text-gray-700 text-sm font-semibold mb-2">
//               Select Your Preferred Date:
//             </label>
//             <input
//               type="date"
//               id="bookingDate"
//               value={bookingDate}
//               onChange={(e) => setBookingDate(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="numberOfAdults" className="block text-gray-700 text-sm font-semibold mb-2">
//               Number of Adults:
//             </label>
//             <input
//               type="number"
//               id="numberOfAdults"
//               value={numberOfAdults}
//               onChange={(e) => setNumberOfAdults(parseInt(e.target.value) || 1)}
//               min="1"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//               required
//             />
//           </div>

//           <div className="text-xl font-bold text-gray-800">
//             Estimated Price: <span className="text-orange-600">${(tour.price_per_person * numberOfAdults).toFixed(2)}</span>
//           </div>

//           <button
//             type="submit"
//             className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-lg ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading || authLoading} // Disable if auth is still loading
//           >
//             {loading
//               ? "Confirming Booking..."
//               : isLoggedIn
//               ? "Confirm Booking & Proceed to Payment"
//               : "Login to Book"} {/* Dynamic button text */}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }










// src/app/book-tour/page.js
// src/app/book-tour/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function BookTourPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");

  const { user, isLoggedIn, loading: authLoading } = useAuth();

  const [tour, setTour] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [loading, setLoading] = useState(false); // For booking submission loading
  const [error, setError] = useState(null);
  const [tourLoading, setTourLoading] = useState(true);

  // Fetch tour details to display on this booking confirmation page
  useEffect(() => {
    if (tourId) {
      const fetchTourDetails = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/`);
          setTour(response.data);
          setBookingDate(new Date().toISOString().split('T')[0]);
        } catch (err) {
          console.error("Failed to fetch tour details:", err);
          setError("Failed to load tour details. Please try again later.");
        } finally {
          setTourLoading(false);
        }
      };
      fetchTourDetails();
    } else {
        setError("No tour ID provided. Please select a tour first.");
        setTourLoading(false);
    }
  }, [tourId]);

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isLoggedIn) {
      setError("You must be logged in to book a tour. Please log in first.");
      setLoading(false);
      return;
    }

    if (!tourId || !bookingDate || numberOfAdults < 1) {
      setError("Please fill all required booking details.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create the Booking
      const bookingResponse = await axios.post( // Renamed 'response' to 'bookingResponse' for clarity
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/create/`,
        {
          tour: tourId,
          booking_date: bookingDate,
          number_of_adults: numberOfAdults,
        },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
      );

      const { id: booking_id } = bookingResponse.data; // Get the booking ID from the response

      if (!booking_id) {
        setError("Booking created, but no booking ID received. Please contact support.");
        setLoading(false);
        return;
      }

      // Calculate the total amount for the payment based on tour price and number of adults
      // Ensure tour.price_per_person exists and is a number
      const totalAmount = tour && tour.price_per_person
                          ? (tour.price_per_person * numberOfAdults).toFixed(2)
                          : "0.00"; // Default to 0.00 if price isn't available

      // 2. Create the Payment record immediately after booking creation
      // This sends the data to your Django backend's /api/payments/ endpoint
      console.log("Creating payment for booking ID:", booking_id, "Amount:", totalAmount);
      const paymentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/`, // This is your make-payment endpoint
        {
          booking: booking_id, // Use the ID from the newly created booking
          amount: parseFloat(totalAmount), // Ensure amount is a number for Django
          method: "manual_transfer", // Or "bank_transfer", "cash", etc. Choose a method that fits your instructions.
                                     // This should match a choice defined in your Django Payment model.
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json' // Essential for sending JSON body
          }
        }
      );

      console.log("Payment creation successful:", paymentResponse.data);

      // 3. Redirect to the payment receipt upload page using the booking ID
      router.push(`/bookings/${booking_id}/payment`);

    } catch (err) {
      console.error("Booking or Payment creation failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
          setError("Session expired or not logged in. Please log in again.");
      } else if (err.response?.data) {
        // More specific error handling for backend validation errors
        if (err.response.data.non_field_errors) {
          setError(err.response.data.non_field_errors.join(", "));
        } else if (typeof err.response.data === 'object') {
          // If the error object has field-specific errors, flatten them
          const fieldErrors = Object.values(err.response.data)
                                    .flat()
                                    .filter(item => typeof item === 'string') // Filter out non-string items
                                    .join(", ");
          setError(fieldErrors || "An unexpected error occurred during booking or payment creation.");
        } else {
          setError(err.response.data || "An unexpected error occurred during booking or payment creation.");
        }
      } else {
        setError("Failed to create booking or payment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || tourLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    const isLoginRequiredError = error.includes("You must be logged in") || error.includes("Session expired");

    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <p className="text-red-600 font-semibold text-lg text-center mb-4">{error}</p>
        {isLoginRequiredError && (
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Go to Login
          </button>
        )}
        {!isLoginRequiredError && (
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mt-4"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  if (!tourId || !tour) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No tour selected or tour not found.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Browse Tours
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">Confirm Your Booking</h1>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{tour.title}</h2>
        <p className="text-gray-600 mb-6">{tour.description}</p>

        <form onSubmit={handleConfirmBooking} className="space-y-6">
          <div>
            <label htmlFor="bookingDate" className="block text-gray-700 text-sm font-semibold mb-2">
              Select Your Preferred Date:
            </label>
            <input
              type="date"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="numberOfAdults" className="block text-gray-700 text-sm font-semibold mb-2">
              Number of Adults:
            </label>
            <input
              type="number"
              id="numberOfAdults"
              value={numberOfAdults}
              onChange={(e) => setNumberOfAdults(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>

          <div className="text-xl font-bold text-gray-800">
            Estimated Price: <span className="text-orange-600">${(tour.price_per_person * numberOfAdults).toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || authLoading}
          >
            {loading
              ? "Confirming Booking..."
              : isLoggedIn
              ? "Confirm Booking & Proceed to Payment"
              : "Login to Book"}
          </button>
        </form>
      </div>
    </div>
  );
}