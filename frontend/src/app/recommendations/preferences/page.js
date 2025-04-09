// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import RecommendationForm from '@/app/components/recommendationForm'

// export default function PreferencePage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   // Handling form submission
//   const handleSubmit = async (preferences) => {
//     setLoading(true)
//     setError(null)
    
//     try {
//       // Send preferences data to backend API
//       const res = await fetch('/api/recommend', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(preferences)
//       })
      
//       const data = await res.json()
      
//       if (res.ok && data.success) {
//         // Store recommendations in sessionStorage to be used by results page
//         sessionStorage.setItem('tourRecommendations', JSON.stringify(data.recommendations))
//         // Redirect to recommendations page
//         router.push('/recommendations/results')
//       } else {
//         setError(data.details || 'Failed to get recommendations')
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
      
//       <RecommendationForm 
//         onSubmit={handleSubmit} 
//         loading={loading}
//       />
//     </div>
//   )
// }


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RecommendationForm from '@/app/components/recommendationForm'

export default function PreferencePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Handling form submission
  const handleSubmit = async (preferences) => {
    setLoading(true)
    setError(null)
    
    try {
      // Send preferences data to backend API
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      })
      
      const data = await res.json()
      
      if (res.ok && data.success) {


        
        // Store recommendations in sessionStorage to be used by results page
        sessionStorage.setItem('tourRecommendations', JSON.stringify(data.recommendations))
        // Redirect to recommendations page
        router.push('/recommendations/results')
      } else {
        setError(data.details || 'Failed to get recommendations')
      }
    } catch (error) {
      console.error('Error saving preferences:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Travel Preferences</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}
      
      <RecommendationForm 
        onSubmit={handleSubmit} 
        loading={loading}
      />
    </div>
  )
}