import { NextRequest, NextResponse } from 'next/server';
import { getSessionData } from '@/app/lib/sessionStorage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = params.id;
  
  try {
    // Retrieve data from session storage
    const data = getSessionData(sessionId);
    
    if (!data) {
      console.error(`Session not found: ${sessionId}`);
      return NextResponse.json(
        { error: 'Session not found or expired' },
        { status: 404 }
      );
    }
    
    console.log(`Session data retrieved for ${sessionId}:`, typeof data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error retrieving session data for ${sessionId}:`, error);
    return NextResponse.json(
      { error: 'Error retrieving session data' },
      { status: 500 }
    );
  }
}
