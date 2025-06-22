import { NextRequest, NextResponse } from 'next/server';
import { getSessionData } from './app/lib/sessionStorage';

/**
 * Kanon middleware
 * Handles request logging, security headers, and basic auth checks
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Log incoming requests
  console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);
  
  // Get response
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Check for protected routes
  if (pathname.startsWith('/api/') && !pathname.includes('/api/session')) {
    // Extract session ID from request headers or cookies
    const sessionId = request.headers.get('x-session-id') || request.cookies.get('session-id')?.value;
    
    // If no session ID is provided, return unauthorized
    if (!sessionId) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized - No session ID provided' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Verify session exists
    try {
      const sessionData = getSessionData(sessionId);
      if (!sessionData) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized - Invalid session' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      
      // Add session info to request headers for downstream handlers
      response.headers.set('x-session-verified', '1');
    } catch (error) {
      console.error('Error verifying session:', error);
      return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  
  return response;
}

// Configure which paths this middleware will run on
export const config = {
  // Run on all paths except for static files, images, etc.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
