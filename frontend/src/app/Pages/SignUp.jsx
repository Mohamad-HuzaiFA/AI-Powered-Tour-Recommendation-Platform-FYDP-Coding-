// "use client";

// import { useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import "../Styles/SignUp.css"; // Ensure this path is correct for your styles

// export default function Signup() {
//   // Manage form data with state
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     user_type: "tourist", // Default value
//   });
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Handle text input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle user type change (radio buttons)
//   const handleUserTypeChange = (e) => {
//     setFormData({ ...formData, user_type: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Clear any previous errors

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
//         username,
//         email,
//         password,
//         user_type, // Ensure this matches backend expectations
//       });

//       console.log("Signup successful:", response.data);
//       router.push("/login"); // Redirect after successful signup
//     } catch (err) {
//       console.error("Signup error:", err); // Log full error for debugging

//       // Check if response exists (server-side errors)
//       if (err.response) {
//         setError(err.response.data?.message || "Signup failed. Please try again.");
//       }
//       // Handle network errors
//       else if (err.request) {
//         setError("Network error. Please check your internet connection.");
//       }
//       // Handle unexpected errors
//       else {
//         setError("An unexpected error occurred. Please try again later.");
//       }
//     }
//   };

//     setError("");

//     // Prepare payload for the backend
//     const payload = {
//       username: formData.username,
//       email: formData.email,
//       password: formData.password,
//       user_type: formData.user_type,
//     };

//     try {
//       // Make POST request to Django's signup endpoint
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/signup/",
//         payload,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       setMessage("Signup successful. You can now log in.");
//       // Optionally, redirect the user to the login page:
//       // router.push("/login");
//     } catch (err) {
//       console.error("Signup error:", err.response);
//       // Provide a user-friendly error message
//       setError(
//         err.response?.data ||
//           "Signup failed. Please try again or check your inputs."
//       );
//     }
//   };

//   return (
//     <div className="body">
//       <div className="container">
//         <h1 className="title">Travel</h1>
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           {/* User Type: Radio Buttons */}
//           <div className="user-type">
//             <label>
//               <input
//                 type="radio"
//                 name="user_type"
//                 value="tourist"
//                 checked={formData.user_type === "tourist"}
//                 onChange={handleUserTypeChange}
//               />
//               Tourist
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="user_type"
//                 value="company"
//                 checked={formData.user_type === "company"}
//                 onChange={handleUserTypeChange}
//               />
//               Tourism Company
//             </label>
//           </div>

//           <button type="submit">Sign Up</button>
//         </form>

//         {error && <p className="error-message">{error}</p>}
//         {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
//         {message && <p style={{ color: "green" }}>{message}</p>}

//         <p className="already-account">
//           Already have an account? <Link href="/login">Log In</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// // import React from "react";
// // import "../Styles/SignUp.css"; // ✅ Fixed import path

// // const Signup = () => {
// //   return (
// //     <div className="body">
// //       <div className="container">
// //         <h1 className="title">Travel</h1>

// //         <form className="signup-form">
// //           <input type="text" placeholder="Name" />
// //           <input type="email" placeholder="Email" />
// //           <input type="password" placeholder="Password" />
// //           <input type="password" placeholder="Confirm Password" />
// //           <button type="submit">Sign Up</button>
// //         </form>

// //         <p className="already-account">Already have an account?</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation"; // Ensure you're using the correct router

// const SignUp = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     user_type: "tourist", // Default user type
//   });

//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle radio button change
//   const handleUserTypeChange = (e) => {
//     setFormData({ ...formData, user_type: e.target.value });
//   };

//   // ✅ Fix: Make function async
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     // Validate input (optional)
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     const payload = {
//       username: formData.username,
//       email: formData.email,
//       password: formData.password,
//       user_type: formData.user_type,
//     };

//     try {
//       // ✅ Fix: Ensure API URL is correct
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/signup/",
//         payload
//       );

//       setMessage("Signup successful! Redirecting...");
//       setTimeout(() => {
//         router.push("/login");
//       }, 2000); // Redirect after 2 seconds
//     } catch (err) {
//       console.error("Signup error:", err);

//       if (err.response) {
//         setError(
//           err.response.data?.message || "Signup failed. Please try again."
//         );
//       } else if (err.request) {
//         setError("Network error. Please check your internet connection.");
//       } else {
//         setError("An unexpected error occurred. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div className="body">
//       <div className="container">
//         <h1 className="title">Travel</h1>
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <div className="user-type flex gap-4">
//             <label
//               className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
//                     hover:border-blue-500 focus-within:border-blue-500
//                     bg-white shadow-md"
//             >
//               <input
//                 type="radio"
//                 name="user_type"
//                 value="tourist"
//                 checked={formData.user_type === "tourist"}
//                 onChange={handleUserTypeChange}
//                 className="hidden"
//               />
//               <div
//                 className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${
//                   formData.user_type === "tourist"
//                     ? "bg-blue-500 border-blue-500"
//                     : "border-gray-400"
//                 }`}
//               >
//                 {formData.user_type === "tourist" && (
//                   <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
//                 )}
//               </div>
//               <span className="text-gray-700 font-medium">Tourist</span>
//             </label>

//             <label
//               className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
//                     hover:border-blue-500 focus-within:border-blue-500
//                     bg-white shadow-md"
//             >
//               <input
//                 type="radio"
//                 name="user_type"
//                 value="company"
//                 checked={formData.user_type === "company"}
//                 onChange={handleUserTypeChange}
//                 className="hidden"
//               />
//               <div
//                 className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${
//                   formData.user_type === "company"
//                     ? "bg-blue-500 border-blue-500"
//                     : "border-gray-400"
//                 }`}
//               >
//                 {formData.user_type === "company" && (
//                   <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
//                 )}
//               </div>
//               <span className="text-gray-700 font-medium">Tourism Company</span>
//             </label>
//           </div>

//           <button type="submit">Sign Up</button>
//         </form>

//         {error && <p className="error-message">{error}</p>}
//         {message && <p className="success-message">{message}</p>}

//         <p className="already-account">
//           Already have an account? <a href="/login">Log In</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaCheckCircle, FaExclamationCircle, FaBuilding } from "react-icons/fa";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "tourist",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle radio button change
  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, user_type: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      user_type: formData.user_type,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", payload);
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 min-h-screen relative overflow-hidden">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-gradient-to-b from-blue-500/80 to-blue-700/80"
          style={{
            backgroundImage: "url('/assets/images/leftForm.jpg')",
            backgroundPosition: "center center",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 "></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-white text-center px-8 flex items-center justify-center w-full h-full">
          <div className="max-w-2xl p-8">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in-up">
              Start Your Journey
            </h1>
            <p className="text-xl opacity-90">
              Join thousands of travelers and companies already using our
              platform
            </p>
          </div>
        </div>
      </div>
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6 border border-gray-300 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 hover:border-blue-500">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Fields */}
            {[
              {
                label: "Username",
                name: "username",
                type: "text",
                icon: <AiOutlineUser />,
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                icon: <AiOutlineMail />,
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                icon: <AiOutlineLock />,
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                icon: <AiOutlineLock />,
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <div className="relative ml-5">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            ))}

            {/* User Type Selection */}
            <div className="space-y-2">
              <span className="block text-sm font-medium text-gray-700">
                Account Type
              </span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    type: "tourist",
                    label: "Tourist",
                    icon: <AiOutlineUser />,
                  },
                  {
                    type: "tourism_company",
                    label: "Company",
                    icon: <FaBuilding />,
                  },
                ].map((option) => (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, user_type: option.type })
                    }
                    className={`flex items-center justify-center p-4 rounded-lg border ${
                      formData.user_type === option.type
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    } transition-all`}
                  >
                    <span className="w-5 h-5 mr-2 text-blue-500">
                      {option.icon}
                    </span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                <FaExclamationCircle className="flex-shrink-0 mr-3 w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
                <FaCheckCircle className="flex-shrink-0 mr-3 w-5 h-5" />
                <span>{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
