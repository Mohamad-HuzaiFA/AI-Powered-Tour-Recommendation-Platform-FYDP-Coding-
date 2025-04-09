// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
// import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// const Login = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     try {
//       await axios.post("http://127.0.0.1:8000/api/login/", formData);
//       setMessage("Login successful! Redirecting...");
//       setTimeout(() => {
//         router.push("/dashboard"); // Redirect to dashboard after login
//       }, 2000);
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side (Hidden on mobile) */}
//       <div className="lg:flex w-1/2 min-h-screen relative">
//         <div
//           className="absolute inset-0 bg-cover bg-center z-0 bg-gradient-to-b from-blue-500/80 to-blue-700/80"
//           style={{ backgroundImage: "url('/assets/images/leftForm.jpg')" }}
//         ></div>
//         <div className="relative z-10 text-white text-center px-8 flex items-center justify-center w-full h-full">
//           <div className="max-w-2xl p-8">
//             <h1 className="text-4xl font-bold mb-4 animate-fade-in-up">
//               Welcome Back
//             </h1>

//             {/* ✅ Scrolling Text Below "Welcome Back" */}
//             <div className="scrolling-text-container">
//   <div className="scrolling-text text-lg font-semibold text-yellow-300">
//     Welcome to Our Platform - Enjoy the Experience! &nbsp; • &nbsp; Welcome to Our Platform - Enjoy the Experience! &nbsp; • &nbsp;
//   </div>
// </div>          </div>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 py-12 px-6">
//         <div className="w-full max-w-md h-auto border border-gray-200 rounded-2xl p-10 shadow-2xl bg-white">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
//             <p className="text-gray-500 mt-2">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => router.push("/signup")}
//                 className="text-blue-600 cursor-pointer hover:text-blue-500 font-semibold"
//               >
//                 Sign up
//               </button>
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-2">
//             {/* Email Field */}
//             <div>
//               <label className="block text-base font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <div className="relative">
//                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800">
//                   <AiOutlineMail />
//                 </span>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="ml-8 w-full max-w-sm pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-100 hover:bg-white"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-base font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800">
//                   <AiOutlineLock />
//                 </span>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="ml-8 w-full max-w-sm pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-100 hover:bg-white"
//                 />
//               </div>
//             </div>

//             {/* Error & Success Messages */}
//             {error && (
//               <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
//                 <FaExclamationCircle className="flex-shrink-0 mr-3 w-5 h-5" />
//                 <span>{error}</span>
//               </div>
//             )}
//             {message && (
//               <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
//                 <FaCheckCircle className="flex-shrink-0 mr-3 w-5 h-5" />
//                 <span>{message}</span>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="ml-6 max-w-sm cursor-pointer w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all focus:ring-2 focus:ring-blue-500 shadow-lg"
//             >
//               Log In
//             </button>
//           </form>
//         </div>
//       </div>

//       <style jsx>{`
//   .scrolling-text-container {
//     width: 100%; /* Ensures it spans the full width */
//     overflow: hidden;
//     position: relative;
//     white-space: nowrap;
//     display: flex;
//     align-items: center;
//   }

//   .scrolling-text {
//     display: flex;
//     white-space: nowrap;
//     animation: scrollText 10s linear infinite;
//   }

//   @keyframes scrollText {
//     0% {
//       transform: translateX(100%);
//     }
//     100% {
//       transform: translateX(-100%);
//     }
//   }
// `}</style>

//     </div>
//   );
// };

// export default Login;

"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await axios.post("http://127.0.0.1:8000/api/login/", formData);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/recommendations/preferences");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/assets/images/bglogin.jpg')",
        backgroundPosition: "center center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Form Container */}
      <div className="relative w-full max-w-sm bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold mb-4">Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-sm">Email</label>
            <div className="relative">
              <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-sm">Password</label>
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="flex items-center p-3 text-sm text-red-600 bg-red-200 rounded-md">
              <FaExclamationCircle className="mr-2" /> {error}
            </div>
          )}
          {message && (
            <div className="flex items-center p-3 text-sm text-green-600 bg-green-200 rounded-md">
              <FaCheckCircle className="mr-2" /> {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            New Here?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* Scrolling Text */}
      <div className="absolute bottom-5 w-full overflow-hidden">
        <div className="scrolling-text text-yellow-300 text-sm font-semibold">
          Welcome to Our Platform - Enjoy the Experience! &nbsp; • &nbsp; Welcome to Our Platform - Enjoy the Experience! &nbsp; • &nbsp;
        </div>
      </div>

      <style jsx>{`
        .scrolling-text {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
          animation: scrollText 10s linear infinite;
        }
        @keyframes scrollText {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
