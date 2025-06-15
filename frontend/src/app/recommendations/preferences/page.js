// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import RecommendationForm from '@/app/components/recommendationForm'

// export default function PreferencePage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [accessToken, setAccessToken] = useState(null)

//   // Get access token on mount
//   useEffect(() => {
//     const token = localStorage.getItem('accessToken')
//     if (!token) {
//       router.push('/login')
//     } else {
//       setAccessToken(token)
//     }
//   }, [router])

//   // Handle form submission
//   const handleSubmit = async (preferences) => {
//     setLoading(true)
//     setError(null)
  
//     try {
//       const res = await fetch('/api/recommend', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(preferences),
//       })
  
//       if (res.status === 401) {
//         localStorage.removeItem('accessToken')
//         sessionStorage.clear()
//         router.push('/login')
//         return
//       }
  
//       const contentType = res.headers.get('content-type')
//       let data = contentType?.includes('application/json')
//         ? await res.json()
//         : { success: false, error: 'Unexpected response' }
  
//       if (res.ok && data.success) {
//         sessionStorage.setItem('tourRecommendations', JSON.stringify(data.recommendations))
//         router.push('/recommendations/results')
//       } else {
//         setError(data.error || 'Failed to get recommendations')
//       }
//     } catch (error) {
//       console.error('Error saving preferences:', error)
//       setError(error.message || 'An unexpected error occurred')
//     } finally {
//       setLoading(false)
//     }
//   }
  
//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Your Travel Preferences</h1>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//           <p>{error}</p>
//         </div>
//       )}

//       {loading && (
//         <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
//           <p>Processing your preferences...</p>
//         </div>
//       )}

//       <RecommendationForm 
//         onSubmit={handleSubmit} 
//         loading={loading}
//       />
//     </div>
//   )
// }



// recommendations/preferences/page.js
// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import RecommendationForm from '@/app/components/recommendationForm'

// export default function PreferencePage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [accessToken, setAccessToken] = useState(null)

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken')
//     if (!token) {
//       router.push('/login')
//     } else {
//       setAccessToken(token)
//     }
//   }, [router])

//   const handleSubmit = async (preferences) => {
//     setLoading(true)
//     setError(null)

//     try {
//       // **--- START: Save Preferences to Django Backend ---**
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
//       const savePrefsEndpoint = `${backendUrl}/api/user/preferences/`;

//       const savePrefsRes = await fetch(savePrefsEndpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(preferences),
//       });

//       if (!savePrefsRes.ok) {
//         const errorData = await savePrefsRes.json().catch(() => ({}));
//         setError(errorData.error || `Failed to save preferences: ${savePrefsRes.statusText}`);
//         setLoading(false);
//         return;
//       }
//       // **--- END: Save Preferences ---**

//       // **--- START: Get Recommendations ---**
//       const res = await fetch('/api/recommend', { // This will hit your Next.js /api/recommend route
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(preferences),
//       });

//       if (res.status === 401) {
//         localStorage.removeItem('accessToken');
//         sessionStorage.clear();
//         router.push('/login');
//         return;
//       }

//       const contentType = res.headers.get('content-type');
//       let data = contentType?.includes('application/json')
//         ? await res.json()
//         : { success: false, error: 'Unexpected response' };

//       if (res.ok && data.success) {
//         sessionStorage.setItem('tourRecommendations', JSON.stringify(data.recommendations));
//         router.push('/recommendations/results');
//       } else {
//         setError(data.error || 'Failed to get recommendations');
//       }
//       // **--- END: Get Recommendations ---**

//     } catch (error) {
//       console.error('Error during form submission:', error);
//       setError(error.message || 'An unexpected error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Your Travel Preferences</h1>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//           <p>{error}</p>
//         </div>
//       )}

//       {loading && (
//         <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
//           <p>Processing your preferences...</p>
//         </div>
//       )}

//       <RecommendationForm
//         onSubmit={handleSubmit}
//         loading={loading}
//       />
//     </div>
//   );
// }









"use client"; // This directive is crucial for client-side functionality

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Changed from 'react-router-dom'

// Revert to the Next.js alias for components
import RecommendationForm from '@/app/components/RecommendationForm'; // Corrected import path
import Navbar from '@/app/components/Navbar'; // Assuming Navbar is also in app/components
import FooterSection from '@/app/components/FooterSection'; // Assuming FooterSection is also in app/components

// Assuming useAuth is in ../../hooks/useAuth for access to user, loading, and accessToken
// If not, ensure you have a way to access accessToken here.
import { useAuth } from "@/hooks/useAuth"; // This path seems correct if useAuth is at src/hooks/useAuth.js

export default function PreferencePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { accessToken, isLoggedIn, loading: isLoadingAuth } = useAuth();


  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }

    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login from preferences.");
      router.push("/login");
    }
  }, [isLoggedIn, isLoadingAuth, router]);


  const handleSubmit = async (preferences) => {
    setLoading(true);
    setError(null);

    if (!accessToken) {
        setError("Authentication token missing. Please log in again.");
        setLoading(false);
        router.push("/login");
        return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        console.error("NEXT_PUBLIC_API_URL is not defined.");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }

      // **--- START: Save Preferences to Django Backend ---**
      const savePrefsEndpoint = `${API_URL}/api/user/preferences/`;

      const savePrefsRes = await fetch(savePrefsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preferences),
      });

      if (!savePrefsRes.ok) {
        const errorData = await savePrefsRes.json().catch(() => ({}));
        setError(errorData.error || `Failed to save preferences: ${savePrefsRes.statusText}`);
        setLoading(false);
        if (savePrefsRes.status === 401) {
            console.log("401 on saving preferences, redirecting to login.");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            sessionStorage.clear();
            router.push("/login");
        }
        return;
      }
      // **--- END: Save Preferences ---**

      // **--- START: Get Recommendations ---**
      // Note: You are making two API calls here.
      // 1. To save preferences to Django (direct to API_URL)
      // 2. To get recommendations (to Next.js /api/recommend endpoint)
      // Ensure your /api/recommend Next.js API route itself proxies to your Django backend.
      const res = await fetch('/api/recommend', { // This hits your Next.js /api/recommend route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Pass token to your Next.js API route
        },
        body: JSON.stringify(preferences),
      });

      if (res.status === 401) {
        console.log("401 on getting recommendations, redirecting to login.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.clear();
        router.push("/login");
        return;
      }

      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : { success: false, error: "Unexpected response format." };

      // Assuming your /api/recommend Next.js route returns { success: true, recommendations: [...] }
      if (res.ok && data.success) { // Check data.success if your Next.js API route returns it
        sessionStorage.setItem("tourRecommendations", JSON.stringify(data.recommendations));
        router.push("/recommendations/results");
      } else {
        setError(data.error || "Failed to get recommendations.");
      }
      // **--- END: Get Recommendations ---**

    } catch (error) {
      console.error("Error submitting preferences:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="ml-3 text-lg text-gray-700">Loading authentication...</p>
      </div>
    );
  }

  // The condition below ensures that the form is not rendered if not logged in
  // because the useEffect above would have already redirected.
  // This is more for clarity or if there's a slight delay in redirect.
  if (!isLoggedIn) {
      return null; // Or a simple message like "Access Denied"
  }


  return (
    <>
      <Navbar /> {/* Ensure Navbar is rendering correctly and has its own "use client" if needed */}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-6 py-12">
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-red-200">
          <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
            Your Travel Preferences
          </h1>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-700 border border-red-300 shadow-sm">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          {loading && (
            <div className="mb-4 p-4 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 shadow-sm">
              <p>Processing your preferences...</p>
            </div>
          )}

          <RecommendationForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>

      <FooterSection /> {/* Ensure FooterSection is rendering correctly */}
    </>
  );
}