import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Security headers
  const securityHeaders = {
    // Content Security Policy - Updated for Sumsub compatibility
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.sumsub.com https://api.sumsub.com https://vercel.live https://static.sumsub.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://apis.sumsub.com https://api.sumsub.com",
      "font-src 'self' https://fonts.gstatic.com https://apis.sumsub.com https://api.sumsub.com",
      "img-src 'self' data: https: blob: https://apis.sumsub.com https://api.sumsub.com https://static.sumsub.com",
      "connect-src 'self' https://apis.sumsub.com https://api.sumsub.com https://static.sumsub.com wss: https:",
      "frame-src 'self' https://apis.sumsub.com https://api.sumsub.com https://static.sumsub.com",
      "media-src 'self' blob: https://apis.sumsub.com https://api.sumsub.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),

    // Other security headers
    "X-Frame-Options": "SAMEORIGIN", // Changed from DENY to allow Sumsub iframes
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "origin-when-cross-origin",
    "X-XSS-Protection": "1; mode=block",
    // Updated Permissions Policy to allow camera and microphone for KYC verification
    "Permissions-Policy":
      'camera=(self "https://apis.sumsub.com" "https://api.sumsub.com"), microphone=(self "https://apis.sumsub.com" "https://api.sumsub.com"), geolocation=()',
  };

  const response = NextResponse.next();

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
