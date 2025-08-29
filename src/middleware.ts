import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostHeader = request.headers.get('host') || '';

  const [hostname, port] = hostHeader.split(':');
  const isAdminSubdomain = hostname?.toLowerCase().startsWith('admin.');
  const isAdminPort = port === '3002';

  // Never interfere with API routes
  if (url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Only handle admin subdomain/port if explicitly configured
  if (isAdminSubdomain || isAdminPort) {
    // On admin subdomain, ensure all routes are served from /admin
    if (url.pathname === '/') {
      const rewriteUrl = url.clone();
      rewriteUrl.pathname = '/admin/login';
      return NextResponse.rewrite(rewriteUrl);
    }
    if (!url.pathname.startsWith('/admin')) {
      const rewriteUrl = url.clone();
      rewriteUrl.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(rewriteUrl);
    }
    return NextResponse.next();
  }

  // Coming Soon rewrites for main site sections
  const comingSoonSections = [
    '/business-pulse',
    '/insight-center',
    '/economy-explained',
    '/opportunities',
    '/opprtunities',
  ];

  if (comingSoonSections.some((prefix) => url.pathname === prefix || url.pathname.startsWith(prefix + '/'))) {
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = '/coming-soon';
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};


