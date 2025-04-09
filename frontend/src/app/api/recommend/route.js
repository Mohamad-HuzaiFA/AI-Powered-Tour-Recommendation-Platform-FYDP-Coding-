// app/api/recommend/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const preferences = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    
    // Extract method and validate
    const { method = 'hybrid' } = preferences
    
    if (!['content', 'hybrid', 'popular'].includes(method)) {
      throw new Error('Invalid recommendation method. Must be one of: content, hybrid, popular')
    }

    const endpoint = `${backendUrl}/api/recommend/${method}/`
    const token = request.cookies.get('token')?.value

    // Log request for debugging
    console.log(`Sending request to: ${endpoint}`)
    console.log('With preferences:', preferences)

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(preferences)
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.message || `Server responded with ${res.status}: ${res.statusText}`)
    }

    const data = await res.json()
    
    // Store results in session storage for the results page
    // (In a real app, you might use a more robust state management solution)
    
    return NextResponse.json({
      success: true,
      recommendations: data.recommendations || [],
      method_used: method,
      generated_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('Recommendation API error:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Recommendation failed',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Support GET for popular tours
export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${backendUrl}/api/recommend/popular/`)
    
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Server responded with ${res.status}: ${errorText}`)
    }
    
    const data = await res.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Error fetching popular tours:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch popular tours', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}