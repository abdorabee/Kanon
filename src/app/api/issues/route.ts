import { NextRequest, NextResponse } from 'next/server';
import { storeSessionData, generateSessionId } from '@/app/lib/sessionStorage';

// Function to get a fresh token by logging in
async function getAccessToken() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
  const loginUrl = `${apiUrl}/token`;
  
  try {
    console.log('Attempting to get a fresh token...');
    
    // Default credentials
    const username = 'admin';
    const password = 'admin_kanony_MEDA';
    
    // Form data for login
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData.toString(),
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Login failed: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('Successfully obtained new access token');
    return data.access_token;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
  const backendUrl = `${apiUrl}/issues/?${searchParams.toString()}`;
  
  // Debug environment variables
  console.log('API Route - Environment variables:');
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'not set');
  console.log('Fetching from:', backendUrl);

  try {
    // Get a fresh token by logging in
    const token = await getAccessToken();
    
    if (!token) {
      return NextResponse.json(
        { detail: 'Failed to obtain authentication token' },
        { status: 500 }
      );
    }
    
    console.log('API Route: Using fresh Bearer token');
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // Don't use cache to ensure fresh requests
      cache: 'no-store',
      // Add credentials inclusion
      credentials: 'include',
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
