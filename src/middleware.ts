import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  // Define public paths that don't require authentication
  const publicPaths = ['/admin/login', '/admin/register'];

  // Check if the user is trying to access a protected route
  if (pathname.startsWith('/admin') || pathname.startsWith('/super-admin')) {
    // If the path is public, let them through.
    if (publicPaths.includes(pathname)) {
      // If authenticated and trying to access login, redirect to dashboard
      if (token && pathname === '/admin/login') {
        const user = await verifyToken(token);
        if (user) {
          const targetDashboard = user.role === 'superadmin' ? '/super-admin/dashboard' : '/admin/dashboard';
          return NextResponse.redirect(new URL(targetDashboard, request.url));
        }
      }
      return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const user = await verifyToken(token);

    // If token is invalid, redirect to login and clear cookie
    if (!user) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('authToken');
      return response;
    }

    // Super-admin access control
    if (pathname.startsWith('/super-admin') && user.role !== 'superadmin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/super-admin/:path*'],
};


