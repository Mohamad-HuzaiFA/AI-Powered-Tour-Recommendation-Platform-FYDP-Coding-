// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // For programmatic navigation after logout
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
//   ChevronDownIcon,
//   ArrowRightOnRectangleIcon, // Logout icon
//   UserPlusIcon, // Register icon (optional)
//   UserIcon, // Login icon (optional)
// } from "@heroicons/react/24/outline";

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Modern practice: Check for an authentication token in a secure cookie or localStorage
//     const token = localStorage.getItem("accessToken"); // Or check cookies
//     setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
//   }, []);

//   const handleLogout = () => {
//     // Modern practice: Clear authentication token and any user session data
//     localStorage.removeItem("accessToken"); // Or clear cookies
//     setIsLoggedIn(false);
//     router.push("/"); // Redirect to the home page after logout
//     // Optionally, you might want to call an API endpoint to invalidate the session on the server
//   };

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
//                   href="/destinations"
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
//                 {/* Conditional rendering of auth buttons/logout */}
//                 {!isLoggedIn ? (
//                   <>
//                     <Link
//                       href="/login"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       href="/register"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     >
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <button
//                     onClick={handleLogout}
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <ArrowRightOnRectangleIcon className="h-5 w-5" />
//                     Logout
//                   </button>
//                 )}
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
//               href="/packages"
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
//               href="/packages"
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
//             {/* Conditional rendering for mobile */}
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   href="/login"
//                   className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
//                 >
//                   <UserIcon className="h-5 w-5" /> Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
//                 >
//                   <UserPlusIcon className="h-5 w-5" /> Register
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
//               >
//                 <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
//               </button>
//             )}
//             {/* Add more mobile-specific options if needed */}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;

// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // For programmatic navigation after logout
// import { useAuth } from "../../hooks/useAuth"; // Import the useAuth hook
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
//   ChevronDownIcon,
//   ArrowRightOnRectangleIcon, // Logout icon
//   UserPlusIcon, // Register icon (optional)
//   UserIcon, // Login icon (optional)
//   SparklesIcon, // Recommendation icon
// } from "@heroicons/react/24/outline";

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { isLoggedIn, logout } = useAuth(); // Use the useAuth hook for auth state
//   const router = useRouter();

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
//           {isLoggedIn && (
//             <li>
//               <Link
//                 href="/recommendations/results"
//                 className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1"
//               >
//                 <SparklesIcon className="h-5 w-5" /> Recommended
//               </Link>
//             </li>
//           )}
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
//                   href="/destinations"
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
//                   href="/pricing" // Changed from /packages to /pricing for clarity
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Pricing
//                 </Link>
//                 <hr className="border-t border-gray-200 my-1" />
//                 {isLoggedIn && (
//                   <Link
//                     href="/dashboard"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </Link>
//                 )}
//                 {isLoggedIn && (
//                   <Link
//                     href="/recommendations/preferences"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Adjust Preferences
//                   </Link>
//                 )}
//                 {/* Conditional rendering of auth buttons/logout */}
//                 {!isLoggedIn ? (
//                   <>
//                     <Link
//                       href="/login"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       href="/register"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     >
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <button
//                     onClick={logout}
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <ArrowRightOnRectangleIcon className="h-5 w-5" />
//                     Logout
//                   </button>
//                 )}
//                 {/* Add more options here */}
//               </div>
//             )}
//           </li>
//         </ul>
//       </nav>

//       {/* Call to Action Button */}
//       <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
//           <Link
//                       href="/signup">
//                          Get in Touch
//                     </Link>

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
//               href="/packages"
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
//               href="/pricing" // Changed from /packages to /pricing for clarity
//               className="font-medium hover:text-indigo-600 transition-colors duration-300"
//             >
//               Pricing
//             </Link>
//             {isLoggedIn && (
//               <Link
//                 href="/recommendations/results"
//                 className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1"
//               >
//                 <SparklesIcon className="h-5 w-5" /> Recommended
//               </Link>
//             )}
//             {isLoggedIn && (
//               <Link
//                 href="/recommendations/preferences"
//                 className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
//               >
//                 <CogIcon className="h-5 w-5" /> Adjust Preferences
//               </Link>
//             )}
//             <hr className="border-t border-gray-200 w-48 my-2" />
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   href="/login"
//                   className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
//                 >
//                   <UserIcon className="h-5 w-5" /> Login
//                 </Link>
//                 <Link
//                   href="/signup"
//                   className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
//                 >
//                   <UserPlusIcon className="h-5 w-5" /> Register
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={logout}
//                 className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
//               >
//                 <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
//               </button>
//             )}
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
import { useState } from "react"; // No need for useEffect here for this functionality
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth"; // Import the useAuth hook
import {
  Bars3Icon,
  XMarkIcon, // Still useful if you plan to implement a mobile menu close button
  CogIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon, // Logout icon
  UserPlusIcon, // Register icon
  UserIcon, // Login icon
  SparklesIcon, // Recommendation icon
} from "@heroicons/react/24/outline";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // Redirect to home or login page after logout
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
          {isLoggedIn && (
            <li>
              <Link
                href="/recommendations/results"
                className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1"
              >
                <SparklesIcon className="h-5 w-5" /> Recommended
              </Link>
            </li>
          )}
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
                  href="/pricing"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Pricing
                </Link>
                <hr className="border-t border-gray-200 my-1" />
                {isLoggedIn && (
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                )}
                {isLoggedIn && (
                  <Link
                    href="/recommendations/preferences"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Adjust Preferences
                  </Link>
                )}
                {/* No need for auth buttons here anymore as they are now outside the dropdown */}
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Dynamic Auth Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link href="/login" passHref>
              <button className="bg-transparent text-indigo-600 px-4 py-2 rounded-full border border-indigo-600 hover:bg-indigo-50 transition duration-300 flex items-center gap-2">
                <UserIcon className="h-5 w-5" /> Login
              </button>
            </Link>
            <Link href="/signup" passHref>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center gap-2">
                <UserPlusIcon className="h-5 w-5" /> Register
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center gap-2"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Re-using isDropdownOpen for mobile menu toggle
        className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors duration-300"
      >
        {isDropdownOpen ? (
          <XMarkIcon className="h-6 w-6" /> // Close icon when open
        ) : (
          <Bars3Icon className="h-6 w-6" /> // Menu icon when closed
        )}
      </button>

      {/* Mobile Dropdown/Side Panel (now acts as mobile menu) */}
      {isDropdownOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-30 py-4 animate-slide-down">
          {" "}
          {/* Added animate-slide-down for a smoother transition */}
          <nav className="flex flex-col items-center space-y-3">
            <Link
              href="/"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)} // Close menu on click
            >
              Home
            </Link>
            <Link
              href="/about_us"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/destinations"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="/packages"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Tours & Packages
            </Link>
            <Link
              href="/contact"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/pricing"
              className="font-medium hover:text-indigo-600 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Pricing
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/recommendations/results"
                  className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <SparklesIcon className="h-5 w-5" /> Recommended
                </Link>
                <Link
                  href="/recommendations/preferences"
                  className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <CogIcon className="h-5 w-5" /> Adjust Preferences
                </Link>
                <Link
                  href="/dashboard"
                  className="font-medium hover:text-indigo-600 transition-colors duration-300"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
            <hr className="border-t border-gray-200 w-48 my-2" />
            {/* Auth buttons for mobile */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <UserIcon className="h-5 w-5" /> Login
                </Link>
                <Link
                  href="/signup"
                  className="font-medium hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <UserPlusIcon className="h-5 w-5" /> Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsDropdownOpen(false); // Close menu on logout
                }}
                className="font-medium hover:text-red-500 text-red-600 transition-colors duration-300 flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
