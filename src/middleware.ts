import { NextRequest, NextResponse } from 'next/server';
import { getSessionData } from './app/lib/sessionStorage';

// Define supported locales
const locales = ['en', 'ar'];
const defaultLocale = 'en';

/**
 * Get the preferred locale from the request
 */
function getLocale(request: NextRequest): string {
  // Check if the locale is already in the URL
  const { pathname } = request.nextUrl;
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }

  // Check for locale in cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  // Check for locale in Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang) || locales.includes(lang.split('-')[0]));
    
    if (preferredLocale) {
      // If we find a match like 'ar-SA', use the base locale 'ar'
      const baseLocale = preferredLocale.includes('-') ? preferredLocale.split('-')[0] : preferredLocale;
      if (locales.includes(baseLocale)) {
        return baseLocale;
      }
    }
  }

  // Default to English
  return defaultLocale;
}

/**
 * Kanon middleware
 * Handles language detection, request logging, security headers, and basic auth checks
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Log incoming requests
  console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Redirect if there is no locale in the pathname
  if (!pathnameHasLocale && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }
  
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
