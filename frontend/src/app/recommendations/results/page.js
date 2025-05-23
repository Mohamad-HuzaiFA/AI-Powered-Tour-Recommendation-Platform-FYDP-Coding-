// 'use client'
// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import RecommendationList from '@/app/components/RecommendationList'

// export default function ResultsPage() {
//   const [recommendations, setRecs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchRecommendations() {
//       try {
//         // First check if we have recommendations in sessionStorage
//         const storedRecs = sessionStorage.getItem('tourRecommendations')
        
//         if (storedRecs) {
//           setRecs(JSON.parse(storedRecs))
//           setLoading(false)
//           return
//         }
        
//         // If not, fetch from API
//         const res = await fetch('/api/recommend/popular')
//         if (!res.ok) {
//           const data = await res.json().catch(() => ({}))
//           throw new Error(data.details || 'Failed to fetch recommendations')
//         }
        
//         const data = await res.json()
//         setRecs(data.recommendations || [])
//       } catch (err) {
//         console.error("Error loading recommendations:", err)
//         setError(err.message || 'An error occurred while loading recommendations')
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchRecommendations()
//   }, [])

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-pulse text-gray-600">Loading recommendations...</div>
//     </div>
//   )

//   if (error) return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="p-4 bg-red-100 text-red-700 rounded-md">
//         <h2 className="font-bold">Error fetching recommendations</h2>
//         <p>{error}</p>
//         <Link href="/recommendations/preferences">
//           <button className="mt-2 bg-red-500 text-white p-2 rounded">
//             Try Again
//           </button>
//         </Link>
//       </div>
//     </div>
//   )

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Your Perfect Tours</h1>
//         <Link href="/recommendations/preferences">
//           <button className="bg-blue-500 text-white p-2 rounded">
//             Adjust Preferences
//           </button>
//         </Link>
//       </div>
      
//       <RecommendationList tours={recommendations} />
//     </div>
//   )
// }


'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import RecommendationList from '@/app/components/RecommendationList'

export default function ResultsPage() {
  const [recommendations, setRecs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const storedRecs = sessionStorage.getItem('tourRecommendations')
        if (storedRecs) {
          setRecs(JSON.parse(storedRecs))
          setLoading(false)
          return
        }

        const res = await fetch('/api/recommend/popular')
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.details || 'Failed to fetch recommendations')
        }

        const data = await res.json()
        setRecs(data.recommendations || [])
      } catch (err) {
        console.error('Error loading recommendations:', err)
        setError(err.message || 'An error occurred while loading recommendations')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-600 text-lg">Loading recommendations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4">
          <h2 className="font-bold text-lg mb-1">Error fetching recommendations</h2>
          <p>{error}</p>
          <Link href="/recommendations/preferences">
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Recommended Tours for You</h1>
        <Link href="/recommendations/preferences">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Adjust Preferences
          </button>
        </Link>
      </div>

      <RecommendationList tours={recommendations} />
    </div>
  )
}
