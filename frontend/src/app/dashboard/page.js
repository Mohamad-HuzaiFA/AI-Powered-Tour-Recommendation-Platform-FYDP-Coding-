
// "use client";
// import Link from "next/link";

// export default function CompanyDashboard() {
//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex flex-col items-center justify-center p-6"
//       style={{
//         backgroundImage: 'url("/assets/images/dashboard.jpg")', // Replace with your image URL
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <h1 className="text-4xl font-bold text-white mb-10">Company Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
//         {/* Add Packages */}
//         <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:scale-105 transition">
//           <h2 className="text-2xl font-semibold mb-3">Add Packages</h2>
//           <p className="mb-4 text-gray-600">
//             Create exciting travel packages for your customers.
//           </p>
//           <Link
//             href="/add_package"
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Add
//           </Link>
//         </div>

//         {/* Manage Packages */}
//         <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:scale-105 transition">
//           <h2 className="text-2xl font-semibold mb-3">Manage Packages</h2>
//           <p className="mb-4 text-gray-600">
//             View, search and manage all your packages.
//           </p>
//           <Link
//             href="/managePackages"
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Manage
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import Link from "next/link";
// import {
//   PlusCircleIcon,
//   BriefcaseIcon,
//   ChartBarIcon,
//   CogIcon,
// } from "@heroicons/react/24/outline"; // Modern icons

// export default function CompanyDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-semibold text-gray-800">
//               Company Dashboard
//             </h1>
//             <p className="text-gray-500">Manage your travel packages efficiently.</p>
//           </div>
//           {/* Optional: User Profile or Notifications */}
//           <div className="flex items-center space-x-4">
//             {/* <button className="text-gray-600 hover:text-gray-800">
//               <BellIcon className="h-6 w-6" />
//             </button> */}
//             {/* <div className="relative">
//               <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-300">
//                 <svg className="h-full w-full text-gray-600" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 20.993C24 17.921 18.618 15 12 15S0 17.921 0 20.993V24h24v-3.007zM12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
//                 </svg>
//               </span>
//             </div> */}
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Add Packages Card */}
//           <Link
//             href="/add_package"
//             className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center justify-center text-center"
//           >
//             <PlusCircleIcon className="h-10 w-10 text-blue-500 mb-3" />
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Add Packages
//             </h2>
//             <p className="text-gray-500 text-sm mb-4">
//               Create new and exciting travel experiences.
//             </p>
//             <span className="bg-blue-100 text-blue-500 py-2 px-4 rounded-full text-xs font-medium hover:bg-blue-200">
//               Get Started
//             </span>
//           </Link>

//           {/* Manage Packages Card */}
//           <Link
//             href="/managePackages"
//             className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center justify-center text-center"
//           >
//             <BriefcaseIcon className="h-10 w-10 text-green-500 mb-3" />
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Manage Packages
//             </h2>
//             <p className="text-gray-500 text-sm mb-4">
//               View, edit, and organize your existing packages.
//             </p>
//             <span className="bg-green-100 text-green-500 py-2 px-4 rounded-full text-xs font-medium hover:bg-green-200">
//               Go to Management
//             </span>
//           </Link>

//           {/* Analytics/Reports (Example - Add more cards as needed) */}
//           <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center justify-center text-center">
//             <ChartBarIcon className="h-10 w-10 text-indigo-500 mb-3" />
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Analytics & Reports
//             </h2>
//             <p className="text-gray-500 text-sm mb-4">
//               Track performance and analyze your package data.
//             </p>
//             <span className="bg-indigo-100 text-indigo-500 py-2 px-4 rounded-full text-xs font-medium hover:bg-indigo-200">
//               View Reports
//             </span>
//           </div>

//           {/* Settings (Example) */}
//           <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center justify-center text-center">
//             <CogIcon className="h-10 w-10 text-yellow-500 mb-3" />
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Settings
//             </h2>
//             <p className="text-gray-500 text-sm mb-4">
//               Configure your dashboard and manage company settings.
//             </p>
//             <span className="bg-yellow-100 text-yellow-500 py-2 px-4 rounded-full text-xs font-medium hover:bg-yellow-200">
//               Edit Settings
//             </span>
//           </div>

//           {/* You can add more cards here for other functionalities */}
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircleIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CogIcon,
  HomeIcon, // Add Home Icon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function CompanyDashboard() {
  const [companyName, setCompanyName] = useState("Your Company"); // Replace with actual data
  const router = useRouter();

  // Example of fetching company data (replace with your actual API call)
  useEffect(() => {
    // Simulate fetching company name
    setTimeout(() => {
      setCompanyName("Awesome Travel Inc.");
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome, {companyName}!
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your travel packages and grow your business.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <HomeIcon className="h-5 w-5 mr-2 text-gray-500" />
              Website Home
            </Link>
            {/* Optional: User Profile or Notifications (More modern approach) */}
            {/* <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center rounded-full overflow-hidden bg-gray-200 h-8 w-8">
                <span className="sr-only">Open user menu</span>
                <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993C24 17.921 18.618 15 12 15S0 17.921 0 20.993V24h24v-3.007zM12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </Menu.Button>
              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/profile" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={() => console.log("Logout")} className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}>
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> */}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Packages Card */}
          <Link
            href="/add_package"
            className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center text-center">
              <PlusCircleIcon className="h-10 w-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Add Packages
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Create new and exciting travel experiences.
              </p>
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200">
                Get Started
              </span>
            </div>
          </Link>

          {/* Manage Packages Card */}
          <Link
            href="/managePackages"
            className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center text-center">
              <BriefcaseIcon className="h-10 w-10 text-green-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Manage Packages
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                View, edit, and organize your existing packages.
              </p>
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full bg-green-100 text-green-500 hover:bg-green-200">
                Go to Management
              </span>
            </div>
          </Link>

          {/* Analytics/Reports Card */}
          <div className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center text-center">
              <ChartBarIcon className="h-10 w-10 text-indigo-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics & Reports
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Track performance and analyze your package data.
              </p>
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full bg-indigo-100 text-indigo-500 hover:bg-indigo-200">
                View Reports
              </span>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center text-center">
              <CogIcon className="h-10 w-10 text-yellow-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Settings
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Configure your dashboard and manage company settings.
              </p>
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full bg-yellow-100 text-yellow-500 hover:bg-yellow-200">
                Edit Settings
              </span>
            </div>
          </div>

          {/* Add more cards here for other functionalities */}
        </div>
      </div>
    </div>
  );
}

// Utility function for conditional class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}








// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   PlusCircleIcon,
//   BriefcaseIcon,
//   ChartBarIcon,
//   CogIcon,
//   HomeIcon,
//   TicketIcon,
//   ArrowPathIcon,
// } from "@heroicons/react/24/outline";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../hooks/useAuth"; // Assuming the path is correct

// export default function CompanyDashboard() {
//   const [companyName, setCompanyName] = useState("Your Company");
//   const [toursOrBookings, setToursOrBookings] = useState([]);
//   const [isLoadingData, setIsLoadingData] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   // Updated to destructure `accessToken` and `loading` (from useAuth)
//   const { accessToken, isLoggedIn, loading: isLoadingAuth } = useAuth();

//   useEffect(() => {
//     // Simulate fetching company name
//     setTimeout(() => {
//       setCompanyName("Awesome Travel Inc.");
//     }, 500);

//     const fetchCompanyData = async () => {
//       // Wait for auth state to finish loading
//       if (isLoadingAuth) {
//         console.log("Auth is still loading, delaying data fetch.");
//         return;
//       }

//       // Now check if user is logged in AND has an access token
//       if (!isLoggedIn || !accessToken) {
//         console.log("User not logged in or access token missing. Redirecting.");
//         setError("User not authenticated. Please log in.");
//         setIsLoadingData(false);
//         router.push('/login');
//         return;
//       }

//       setIsLoadingData(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/company/`, // Use the correct endpoint for company bookings
//           {
//             headers: {
//               // IMPORTANT: Use Bearer for JWT
//               Authorization: `Bearer ${accessToken}`, // <--- Use accessToken here!
//             },
//           }
//         );
//         setToursOrBookings(response.data);
//       } catch (err) {
//         console.error("Error fetching company data:", err);
//         setError("Failed to load company bookings. Please try again later.");
//         if (err.response && err.response.status === 401) {
//             console.log("Received 401, redirecting to login.");
//             router.push('/login');
//         }
//       } finally {
//         setIsLoadingData(false);
//       }
//     };

//     fetchCompanyData();
//   }, [accessToken, isLoggedIn, isLoadingAuth, router]); // Dependencies updated

//   // Display initial loading state for authentication
//   if (isLoadingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <ArrowPathIcon className="h-10 w-10 animate-spin text-indigo-500" />
//         <p className="ml-3 text-lg text-gray-700">Loading authentication...</p>
//       </div>
//     );
//   }

//   // If after loading, the user is still not logged in, this block technically won't be reached
//   // because the useEffect above will redirect. But it's a good conceptual check.
//   if (!isLoggedIn || !accessToken) {
//     return null; // Or a simple message like "Access Denied" if you don't want an immediate redirect here.
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-6">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-semibold text-gray-900">
//               Welcome, {companyName}!
//             </h1>
//             <p className="text-gray-600 text-sm">
//               Manage your travel packages and grow your business.
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link
//               href="/"
//               className="inline-flex items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               <HomeIcon className="h-5 w-5 mr-2 text-gray-500" />
//               Website Home
//             </Link>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Add Packages Card */}
//           <Link
//             href="/add_package"
//             className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
//           >
//             <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center text-center">
//               <PlusCircleIcon className="h-10 w-10 text-blue-500 mb-3" />
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">
//                 Add Packages
//               </h2>
//               <p className="text-gray-600 text-sm mb-4">
//                 Create new and exciting travel experiences.
//               </p>
//               <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200">
//                 Get Started
//               </span>
//             </div>
//           </Link>

//           {/* Manage Packages Card */}
//           <Link
//             href="/managePackages"
//             className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
//           >
//             <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center text-center">
//               <BriefcaseIcon className="h-10 w-10 text-green-500 mb-3" />
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">
//                 Manage Packages
//               </h2>
//               <p className="text-gray-600 text-sm mb-4">
//                 View, edit, and organize your existing packages.
//               </p>
//               <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full bg-green-100 text-green-500 hover:bg-green-200">
//                 Go to Management
//               </span>
//             </div>
//           </Link>

//           {/* Analytics/Reports Card - NOW DISPLAYS DATA */}
//           <div className="bg-white shadow overflow-hidden rounded-lg">
//             <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
//               <div className="flex items-center justify-center mb-3">
//                 <ChartBarIcon className="h-10 w-10 text-indigo-500" />
//                 <h2 className="text-xl font-semibold text-gray-900 ml-3">
//                   Bookings & Reports
//                 </h2>
//               </div>
//               <p className="text-gray-600 text-sm mb-4 text-center">
//                 Overview of your company's tours and bookings.
//               </p>

//               <div className="flex-grow overflow-auto p-2 bg-gray-50 rounded-md border border-gray-200">
//                 {isLoadingData ? (
//                   <div className="flex items-center justify-center h-full text-indigo-500">
//                     <ArrowPathIcon className="h-6 w-6 animate-spin mr-2" />
//                     Loading bookings...
//                   </div>
//                 ) : error ? (
//                   <div className="text-red-600 text-center py-4">
//                     <p>{error}</p>
//                     {error.includes("authenticated") && (
//                       <button
//                         onClick={() => router.push('/login')}
//                         className="mt-2 text-sm text-blue-600 hover:underline"
//                       >
//                         Login to view reports
//                       </button>
//                     )}
//                   </div>
//                 ) : toursOrBookings.length === 0 ? (
//                   <div className="text-gray-500 text-center py-4">
//                     No bookings found for your company yet.
//                   </div>
//                 ) : (
//                   <ul className="divide-y divide-gray-200">
//                     {toursOrBookings.map((booking) => (
//                       <li key={booking.id} className="py-2 flex items-center justify-between text-sm">
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium text-gray-900 truncate">
//                             <TicketIcon className="h-4 w-4 inline-block mr-1 text-gray-500" />
//                             Booking #{booking.id} for {booking.tour.title}
//                           </p>
//                           <p className="text-gray-500">
//                             Booked by: {booking.user.username}
//                           </p>
//                           <p className="text-gray-500">
//                             Amount: ${booking.amount} ({booking.status})
//                           </p>
//                           <p className="text-gray-500">
//                             Adults: {booking.number_of_adults}
//                           </p>
//                         </div>
//                         <Link href={`/bookings/${booking.id}`} className="ml-4 text-sm text-indigo-600 hover:underline">
//                             View
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               <span className="inline-flex items-center justify-center mt-4 px-3 py-2 text-sm font-medium rounded-full bg-indigo-100 text-indigo-500 hover:bg-indigo-200 cursor-pointer">
//                 Full Report (Coming Soon!)
//               </span>
//             </div>
//           </div>


//           {/* Settings Card */}
//           <div className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
//             <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center text-center">
//               <CogIcon className="h-10 w-10 text-yellow-500 mb-3" />
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">
//                 Settings
//               </h2>
//               <p className="text-gray-600 text-sm mb-4">
//                 Configure your dashboard and manage company settings.
//               </p>
//               <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full bg-yellow-100 text-yellow-500 hover:bg-yellow-200">
//                 Edit Settings
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }