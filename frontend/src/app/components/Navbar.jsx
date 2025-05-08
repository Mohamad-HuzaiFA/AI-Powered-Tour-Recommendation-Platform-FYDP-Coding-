// // "use client";
// // import Link from "next/link";
// // import { useState } from "react";
// // import {
// //   Bars3Icon, // Hamburger icon for smaller screens or side panel trigger
// //   XMarkIcon, // Close icon for side panel (if you want a close button)
// //   HomeIcon,
// //   InformationCircleIcon,
// //   BriefcaseIcon,
// //   ChatBubbleLeftRightIcon,
// //   CogIcon,
// //   PhotoIcon,
// //   MapPinIcon,
// //   CurrencyDollarIcon,
// // } from "@heroicons/react/24/outline"; // Modern icons

// // function Navbar() {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <>
// //       {/* Main Navbar */}
// //       <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 px-6 sm:px-10 flex items-center justify-between text-gray-800">
// //         {/* Logo */}
// //         <Link
// //           href="/"
// //           className="text-xl sm:text-2xl font-bold text-indigo-600"
// //         >
// //           TravelGo {/* Replace with your logo component or image */}
// //         </Link>

// //         {/* Desktop Navigation */}
// //         <nav className="hidden md:block">
// //           <ul className="flex gap-4 sm:gap-6 list-none">
// //             <li>
// //               <Link
// //                 href="/"
// //                 className="font-medium hover:text-indigo-600 transition-colors duration-300"
// //               >
// //                 Home
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 href="/about_us"
// //                 className="font-medium hover:text-indigo-600 transition-colors duration-300"
// //               >
// //                 About
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 href="/services"
// //                 className="font-medium hover:text-indigo-600 transition-colors duration-300"
// //               >
// //                 Services
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 href="/destinations"
// //                 className="font-medium hover:text-indigo-600 transition-colors duration-300"
// //               >
// //                 Destinations
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 href="/contact"
// //                 className="font-medium hover:text-indigo-600 transition-colors duration-300"
// //               >
// //                 Contact
// //               </Link>
// //             </li>
// //           </ul>
// //         </nav>

// //         {/* Call to Action Button */}
// //         <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
// //           Get in Touch
// //         </button>

// //         {/* Mobile Menu Button (will trigger the side panel on smaller screens) */}
// //         <button
// //           onClick={toggleSidebar}
// //           className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors duration-300"
// //         >
// //           <Bars3Icon className="h-6 w-6" />
// //         </button>
// //       </header>

// //       {/* Hoverable Side Panel */}
// //       <aside
// //         onMouseEnter={() => setIsSidebarOpen(true)}
// //         onMouseLeave={() => setIsSidebarOpen(false)}
// //         className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 w-64 transition-transform duration-300 ease-in-out transform ${
// //           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
// //         }`}
// //       >
// //         <div className="p-6 flex flex-col h-full">
// //           {/* Logo inside the sidebar */}
// //           <Link href="/" className="text-xl font-bold text-indigo-600 mb-6">
// //             TravelGo
// //           </Link>

// //           {/* Sidebar Navigation Links */}
// //           <nav className="flex-grow">
// //             <ul className="space-y-3">
// //               <li>
// //                 <Link
// //                   href="/"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <HomeIcon className="h-5 w-5" />
// //                   Home
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/about_us"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <InformationCircleIcon className="h-5 w-5" />
// //                   About Us
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/services"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <BriefcaseIcon className="h-5 w-5" />
// //                   Services
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/destinations"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <MapPinIcon className="h-5 w-5" />
// //                   Destinations
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/tours"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <PhotoIcon className="h-5 w-5" />
// //                   Tours & Packages
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/contact"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <ChatBubbleLeftRightIcon className="h-5 w-5" />
// //                   Contact Us
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/pricing"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <CurrencyDollarIcon className="h-5 w-5" />
// //                   Pricing
// //                 </Link>
// //               </li>
// //               {/* Add more necessary options here */}
// //               <hr className="my-4 border-t border-gray-200" />
// //               <li>
// //                 <Link
// //                   href="/dashboard"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   <CogIcon className="h-5 w-5" />
// //                   Dashboard
// //                 </Link>
// //               </li>
// //               {/* Authentication links (adjust based on your setup) */}
// //               <li>
// //                 <Link
// //                   href="/login"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   {/* <UserIcon className="h-5 w-5" /> */}
// //                   Login
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/register"
// //                   className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
// //                 >
// //                   {/* <UserPlusIcon className="h-5 w-5" /> */}
// //                   Register
// //                 </Link>
// //               </li>
// //             </ul>
// //           </nav>

// //           {/* Optional: Footer for the sidebar */}
// //           <div className="mt-auto py-4 border-t border-gray-200 text-center text-sm text-gray-500">
// //             © {new Date().getFullYear()} TravelGo
// //           </div>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // }

// // export default Navbar;

// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   HomeIcon,
//   InformationCircleIcon,
//   BriefcaseIcon,
//   ChatBubbleLeftRightIcon,
//   CogIcon,
//   PhotoIcon,
//   MapPinIcon,
//   CurrencyDollarIcon,
//   ChevronDownIcon, // Icon for the "More" dropdown
// } from "@heroicons/react/24/outline";

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 px-6 sm:px-10 flex items-center justify-between text-gray-800">
//       {/* Logo */}
//       <Link href="/" className="text-xl sm:text-2xl font-bold text-indigo-600">
//         TravelGo
//       </Link>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:block">
//         <ul className="flex gap-4 sm:gap-6 list-none">
//           <li>
//             <Link
//               href="/"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/about_us"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/services"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Services
//             </Link>
//           </li>
//           {/* "More" dropdown trigger */}
//           <li
//             onMouseEnter={() => setIsDropdownOpen(true)}
//             onMouseLeave={() => setIsDropdownOpen(false)}
//             className="relative"
//           >
//             <button className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1">
//               More <ChevronDownIcon className="h-4 w-4" />
//             </button>

//             {/* Dropdown/Side Panel */}
//             {isDropdownOpen && (
//               <div
//                 className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 py-2 w-48 transition-all duration-300 ease-in-out transform origin-top scale-100"
//                 onMouseEnter={() => setIsDropdownOpen(true)}
//                 onMouseLeave={() => setIsDropdownOpen(false)}
//               >
//                 <Link
//                   href="/packages"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Destinations
//                 </Link>
//                 <Link
//                   href="/packages"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Tours & Packages
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Contact Us
//                 </Link>
//                 <Link
//                   href="/packages"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Pricing
//                 </Link>
//                 <hr className="border-t border-gray-200 my-1" />
//                 <Link
//                   href="/dashboard"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="/login"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/signup"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Register
//                 </Link>
//                 {/* Add more options here */}
//               </div>
//             )}
//           </li>
//         </ul>
//       </nav>

//       {/* Call to Action Button */}
//       <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
//         Get in Touch
//       </button>

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors duration-300"
//       >
//         <Bars3Icon className="h-6 w-6" />
//       </button>

//       {/* Mobile Dropdown/Side Panel */}
//       {isDropdownOpen && (
//         <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-30 py-4">
//           <nav className="flex flex-col items-center space-y-3">
//             <Link
//               href="/"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Home
//             </Link>
//             <Link
//               href="/about_us"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               About
//             </Link>
//             <Link
//               href="/services"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Services
//             </Link>
//             <Link
//               href="/destinations"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Destinations
//             </Link>
//             <Link
//               href="/tours"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Tours & Packages
//             </Link>
//             <Link
//               href="/contact"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Contact Us
//             </Link>
//             <Link
//               href="/pricing"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Pricing
//             </Link>
//             <hr className="border-t border-gray-200 w-48 my-2" />
//             <Link
//               href="/dashboard"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Dashboard
//             </Link>
//             <Link
//               href="/login"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Login
//             </Link>
//             <Link
//               href="/register"
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Register
//             </Link>
//             {/* Add more mobile-specific options if needed */}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation after logout
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  PhotoIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon, // Logout icon
  UserPlusIcon, // Register icon (optional)
  UserIcon, // Login icon (optional)
} from "@heroicons/react/24/outline";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Modern practice: Check for an authentication token in a secure cookie or localStorage
    const token = localStorage.getItem("accessToken"); // Or check cookies
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
  }, []);

  const handleLogout = () => {
    // Modern practice: Clear authentication token and any user session data
    localStorage.removeItem("accessToken"); // Or clear cookies
    setIsLoggedIn(false);
    router.push("/"); // Redirect to the home page after logout
    // Optionally, you might want to call an API endpoint to invalidate the session on the server
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 px-6 sm:px-10 flex items-center justify-between text-gray-800">
      {/* Logo */}
      <Link href="/" className="text-xl sm:text-2xl font-bold text-indigo-600">
        TravelGo
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-4 sm:gap-6 list-none">
          <li>
            <Link
              href="/"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about_us"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Services
            </Link>
          </li>
          {/* "More" dropdown trigger */}
          <li
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className="relative"
          >
            <button className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1">
              More <ChevronDownIcon className="h-4 w-4" />
            </button>

            {/* Dropdown/Side Panel */}
            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 py-2 w-48 transition-all duration-300 ease-in-out transform origin-top scale-100"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  href="/destinations"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Destinations
                </Link>
                <Link
                  href="/packages"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Tours & Packages
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Contact Us
                </Link>
                <Link
                  href="/packages"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Pricing
                </Link>
                <hr className="border-t border-gray-200 my-1" />
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                {/* Conditional rendering of auth buttons/logout */}
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Logout
                  </button>
                )}
                {/* Add more options here */}
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Call to Action Button */}
      <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
        Get in Touch
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors duration-300"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Mobile Dropdown/Side Panel */}
      {isDropdownOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-30 py-4">
          <nav className="flex flex-col items-center space-y-3">
            <Link
              href="/"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about_us"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/services"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              href="/destinations"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Destinations
            </Link>
            <Link
              href="/packages"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Tours & Packages
            </Link>
            <Link
              href="/contact"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/packages"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Pricing
            </Link>
            <hr className="border-t border-gray-200 w-48 my-2" />
            <Link
              href="/dashboard"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
            >
              Dashboard
            </Link>
            {/* Conditional rendering for mobile */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <UserIcon className="h-5 w-5" /> Login
                </Link>
                <Link
                  href="/register"
                  className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <UserPlusIcon className="h-5 w-5" /> Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
              </button>
            )}
            {/* Add more mobile-specific options if needed */}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
