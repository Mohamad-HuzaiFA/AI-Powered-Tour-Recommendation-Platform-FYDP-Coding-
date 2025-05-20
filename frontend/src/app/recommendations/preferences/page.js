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
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RecommendationForm from '@/app/components/recommendationForm'

export default function PreferencePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.push('/login')
    } else {
      setAccessToken(token)
    }
  }, [router])

  const handleSubmit = async (preferences) => {
    setLoading(true)
    setError(null)

    try {
      // **--- START: Save Preferences to Django Backend ---**
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const savePrefsEndpoint = `${backendUrl}/api/user/preferences/`;

      const savePrefsRes = await fetch(savePrefsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preferences),
      });

      if (!savePrefsRes.ok) {
        const errorData = await savePrefsRes.json().catch(() => ({}));
        setError(errorData.error || `Failed to save preferences: ${savePrefsRes.statusText}`);
        setLoading(false);
        return;
      }
      // **--- END: Save Preferences ---**

      // **--- START: Get Recommendations ---**
      const res = await fetch('/api/recommend', { // This will hit your Next.js /api/recommend route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preferences),
      });

      if (res.status === 401) {
        localStorage.removeItem('accessToken');
        sessionStorage.clear();
        router.push('/login');
        return;
      }

      const contentType = res.headers.get('content-type');
      let data = contentType?.includes('application/json')
        ? await res.json()
        : { success: false, error: 'Unexpected response' };

      if (res.ok && data.success) {
        sessionStorage.setItem('tourRecommendations', JSON.stringify(data.recommendations));
        router.push('/recommendations/results');
      } else {
        setError(data.error || 'Failed to get recommendations');
      }
      // **--- END: Get Recommendations ---**

    } catch (error) {
      console.error('Error during form submission:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Travel Preferences</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
          <p>Processing your preferences...</p>
        </div>
      )}

      <RecommendationForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}