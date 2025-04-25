// // app/api/recommend/route.js
// import { NextResponse } from 'next/server'

// export async function POST(request) {
//   try {
//     const preferences = await request.json()
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    
//     // Extract method and validate
//     const { method = 'hybrid' } = preferences
    
//     if (!['content', 'hybrid', 'popular'].includes(method)) {
//       throw new Error('Invalid recommendation method. Must be one of: content, hybrid, popular')
//     }

//     const endpoint = `${backendUrl}/api/recommend/${method}/`
    
//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.split(' ')[1]; // Get token from "Bearer <token>"


//     // Log request for debugging
//     console.log(`Sending request to: ${endpoint}`)
//     console.log('With preferences:', preferences)

//     const res = await fetch(endpoint, {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` })
//       },
//       body: JSON.stringify(preferences)
//     })

//     if (!res.ok) {
//       const errorData = await res.json().catch(() => ({}))
//       throw new Error(errorData.message || `Server responded with ${res.status}: ${res.statusText}`)
//     }

//     const data = await res.json()
    
//     // Store results in session storage for the results page
//     // (In a real app, you might use a more robust state management solution)
    
//     return NextResponse.json({
//       success: true,
//       recommendations: data.recommendations || [],
//       method_used: method,
//       generated_at: new Date().toISOString()
//     })

//   } catch (error) {
//     console.error('Recommendation API error:', error)
    
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Recommendation failed',
//         details: error.message,
//         timestamp: new Date().toISOString()
//       },
//       { status: 500 }
//     )
//   }
// }

// // Support GET for popular tours
// export async function GET() {
//   try {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
//     const res = await fetch(`${backendUrl}/api/recommend/popular/`)
    
//     if (!res.ok) {
//       const errorText = await res.text()
//       throw new Error(`Server responded with ${res.status}: ${errorText}`)
//     }
    
//     const data = await res.json()
//     return NextResponse.json(data)
    
//   } catch (error) {
//     console.error('Error fetching popular tours:', error)
    
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to fetch popular tours', 
//         details: error.message,
//         timestamp: new Date().toISOString()
//       },
//       { status: 500 }
//     )
//   }
// }






// app/api/recommend/route.js

import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const preferences = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

    // Validate recommendation method
    const { method = 'hybrid' } = preferences
    if (!['content', 'hybrid', 'popular'].includes(method)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid recommendation method. Must be one of: content, hybrid, popular',
        },
        { status: 400 }
      )
    }

    // Get token from client cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Get token from "Bearer <token>"


    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authorization token missing. Please login again.',
        },
        { status: 401 }
      )
    }

    const endpoint = `${backendUrl}/api/recommend/${method}/`

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferences),
    })

    if (res.status === 401) {
      return NextResponse.json(
        {
          success: false,
          error: 'Session expired. Please login again.',
        },
        { status: 401 }
      )
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || `Server error: ${res.statusText}`,
        },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json({
      success: true,
      recommendations: data.recommendations || [],
      method_used: method,
      generated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Recommendation API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong while processing your recommendation.',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${backendUrl}/api/recommend/popular/`)

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Server error: ${errorText}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching popular tours:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch popular tours.',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
