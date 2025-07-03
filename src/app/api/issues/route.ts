import { NextRequest, NextResponse } from 'next/server';
import { storeSessionData, generateSessionId } from '@/app/lib/sessionStorage';
import { authenticatedFetch } from '@/app/lib/auth';

// No local token cache or validation needed - imported from auth.ts

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
  const backendUrl = `${apiUrl}/api/v1/cases/?${searchParams.toString()}`;
  
  // Debug environment variables
  console.log('API Route - Environment variables:');
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'not set');
  console.log('Fetching from:', backendUrl);

  try {
    // Use the authenticatedFetch utility for automatic token management
    const response = await authenticatedFetch(backendUrl, {
      method: 'GET'
    });
    
    if (!response) {
      return NextResponse.json(
        { detail: 'Failed to make authenticated request' },
        { status: 500 }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
      return NextResponse.json({ detail: errorText }, { status: response.status });
    }

    const data = await response.json();
    
    // Generate a session ID for this result set
    const sessionId = generateSessionId();
    
    // Store the data in server-side session
    storeSessionData(sessionId, data);
    
    // Return the data along with the session ID
    return NextResponse.json({
      sessionId,
      data
    });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { detail: 'Failed to reach backend server' },
      { status: 500 }
    );
  }
}
