import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session');
    if (session) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            const decodedToken = await jose.jwtVerify<any>(session.value, secret);

            if (request.nextUrl.pathname === '/login') {
                return NextResponse.redirect(new URL('/', request.url));
            } else {
                const requestHeaders = new Headers(request.headers);
                const headerPayload = {
                    email: decodedToken.payload.email,
                    uid: decodedToken.payload.uid,
                    authority: decodedToken.payload.authority,
                }
                requestHeaders.set('x-MLTP-Auth', JSON.stringify(headerPayload));
                return NextResponse.next({
                    headers: requestHeaders
                });
            }
        } catch (error) {
            request.cookies.delete('session');
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        if (request.nextUrl.pathname !== '/login') {
            return NextResponse.redirect(new URL('/login', request.url));
        } else return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
};