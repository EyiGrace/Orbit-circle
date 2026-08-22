// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// --- Configuration ------------------------------------------------------

// Public routes (no auth required)
const PUBLIC_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/privacy-terms',
  '/new-password',
  '/password-updated',
  '/onboarding',
  '/',
];

// Static assets that bypass auth
const STATIC_PATHS = [
  '/_next/',
  '/image/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

// Routes that are mentor‑only (or mentor home)
const MENTOR_ROUTES = [ '/mentor-page'];

// Routes that are student‑only (or student home)
const STUDENT_ROUTES = ['/home', '/dashboard', '/saved', '/quiz', '/result'];

// --- Middleware ---------------------------------------------------------

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass static assets
  if (STATIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 2. Allow public routes without checks
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 3. Get token from cookie or Authorization header
  const token =
    request.cookies.get('careermap_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    // Redirect to login, preserving the original URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Simple token presence check - role-based protection will be handled on the backend
  // This avoids Edge Runtime compatibility issues with JWT verification
  try {
    // Just check if token exists and is not expired (basic check)
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode payload without verification (basic check only)
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp;
    
    if (exp && Date.now() >= exp * 1000) {
      throw new Error('Token expired');
    }

    const role = payload.role as string;
    const isMentor = role === 'mentor';
    const isStudent = role === 'student';

    // 5. Role‑based routing restrictions
    // If a mentor tries to access a student‑only route → redirect to /mentor
    if (isMentor && STUDENT_ROUTES.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/mentor-page', request.url));
    }

    // If a student tries to access a mentor‑only route → redirect to /home
    if (isStudent && MENTOR_ROUTES.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    // All good – proceed
    return NextResponse.next();
  } catch (error) {
    // Invalid token → clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('careermap_token');
    return response;
  }
}

// --- Matcher config (keep your existing one) ----------------------------
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
