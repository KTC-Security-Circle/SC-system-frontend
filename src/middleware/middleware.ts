import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    return NextResponse.next();
  }
  const token = request.cookies.get('access_token');
  if (!token) {
    return NextResponse.redirect(new URL('http://localhost:3000/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/Chat*'], 
  exclude: ['/'],
};
