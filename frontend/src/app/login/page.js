// "use client";
// import React, { useState, useCallback } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// // import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
// import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
// // import { Eye, EyeOff } from "lucide-react"; // or use Font Awesome if preferred
// import Image from "next/image";


// const Login = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);  
//   const [showPassword, setShowPassword] = useState(false);
//   // const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For signup only
  


//   const handleChange = useCallback((e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   }, []);
   

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);
//     setIsLoading(true);
//     try {
    
//       // console.log("Sending request to:", `${process.env.NEXT_PUBLIC_API_URL}/api/login/`);
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, formData);
//       const { access, refresh } = response.data;
//       localStorage.setItem("accessToken", access);
//       localStorage.setItem("refreshToken", refresh);
//       setMessage("Login successful!");
//       router.push("/recommendations/preferences");
//     } catch (err) {
//       const msg = err.response?.data?.detail || "Login failed. Try again.";
//       setError(msg);
//     } finally{
//       setIsLoading(false);

//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative px-4">
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/assets/images/bglogin.jpg"
//           alt="Login Background"
//           layout="fill"
//           objectFit="cover"
//           quality={60}
//           priority
//         />
//       </div>

//       <div className="relative w-full max-w-sm bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-lg p-8">
//         <h2 className="text-center text-2xl font-bold mb-4">Log In</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email */}
//           <div className="relative">
//             <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com"
//               className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500" />
//           </div>

//           {/* Password */}
//           <div className="relative">
//   <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//   <input
//     type={showPassword ? "text" : "password"}
//     name="password"
//     value={formData.password}
//     onChange={handleChange}
//     required
//     placeholder="Enter password"
//     className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
//   />
//   <button
//     type="button"
//     onClick={() => setShowPassword(!showPassword)}
//     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//   >
//     {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//   </button>
// </div>

//           {error && <div className="flex items-center p-3 text-sm text-red-600 bg-red-200 rounded-md"><FaExclamationCircle className="mr-2" /> {error}</div>}
//           {message && <div className="flex items-center p-3 text-sm text-green-600 bg-green-200 rounded-md"><FaCheckCircle className="mr-2" /> {message}</div>}

//           <button
//   type="submit"
//   disabled={isLoading}
//   className={`w-full py-2 rounded-md text-white font-semibold ${
//     isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//   }`}
// >
//   {isLoading ? "Logging in..." : "Log In"}
// </button>
//         </form>

//         <div className="text-center mt-4 text-sm">
//           <p>New Here? <button onClick={() => router.push("/signup")} className="text-blue-400 hover:underline">Sign Up</button></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






"use client";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Image from "next/image";


const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, formData);
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Set the success message
      setMessage("Login successful!");

      // Use a small setTimeout to allow the message to render briefly
      // and ensure router.push happens after any potential state updates finish.
      // 100ms is usually sufficient, adjust if needed.
      // This is often a workaround for timing issues in client components.
      setTimeout(() => {
        router.push("/recommendations/preferences");
      }, 100); // Give it a short delay

    } catch (err) {
      console.error("Login error:", err); // Log the full error for debugging
      const msg = err.response?.data?.detail || "Login failed. Please check your credentials."; // More specific error message
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/bglogin.jpg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          quality={60}
          priority
        />
      </div>

      <div className="relative w-full max-w-sm bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold mb-4">Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com"
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Password */}
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {error && <div className="flex items-center p-3 text-sm text-red-600 bg-red-200 rounded-md"><FaExclamationCircle className="mr-2" /> {error}</div>}
          {message && <div className="flex items-center p-3 text-sm text-green-600 bg-green-200 rounded-md"><FaCheckCircle className="mr-2" /> {message}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>New Here? <button onClick={() => router.push("/signup")} className="text-blue-400 hover:underline">Sign Up</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;