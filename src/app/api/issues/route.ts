import { NextRequest, NextResponse } from 'next/server';
import { storeSessionData, generateSessionId } from '@/app/lib/sessionStorage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
  const backendUrl = `${apiUrl}/issues/?${searchParams.toString()}`;
  
  // Debug environment variables
  console.log('API Route - Environment variables:');
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'not set');
  console.log('API_TOKEN present:', process.env.API_TOKEN ? 'yes (first 5 chars: ' + process.env.API_TOKEN?.substring(0, 5) + '...)' : 'no');
  console.log('Fetching from:', backendUrl);

  try {
    // Use the correct token from the curl example
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1MDk0NDEzM30.hNUP35v6siWStuHdXY4WPaF__Rd36C9ImB_tQOoMaHI';
    
    console.log('API Route: Using Bearer token authentication with correct token');
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    });

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
