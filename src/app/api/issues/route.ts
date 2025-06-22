import { NextRequest, NextResponse } from 'next/server';
import { storeSessionData, generateSessionId } from '@/app/lib/sessionStorage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const backendUrl = `${apiUrl}/issues/?${searchParams.toString()}`;

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
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
