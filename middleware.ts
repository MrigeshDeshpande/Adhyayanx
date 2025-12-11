import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { REFRESH_COOKIE_NAME } from '@/lib/constants';

/**
 * Next.js Middleware for Authentication
 * 
 * Protects routes by checking for the presence of a refresh token cookie.
 * Redirects unauthenticated users to /auth and authenticated users away from /auth.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the refresh token from cookies - must match the cookie name set by login API
    const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME);
    const isAuthenticated = !!refreshToken;

    // Define public paths that don't require authentication
    const isAuthPage = pathname.startsWith('/auth');
    const isApiRoute = pathname.startsWith('/api');
    const isPublicFile = pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('.');

    // Allow API routes and public files
    if (isApiRoute || isPublicFile) {
        return NextResponse.next();
    }

    // Redirect authenticated users away from auth page to home
    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect unauthenticated users to auth page
    if (!isAuthenticated && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

/**
 * Matcher configuration
 * Specifies which routes this middleware should run on
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
