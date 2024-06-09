import { NextResponse, type NextRequest } from "next/server";

// middleware is applied to all routes, use conditionals to select
export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const token = cookies.get("token")?.value;
  req.headers.set("Authorization", `Bearer ${token}`);
  if (token && token.length > 0) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.nextUrl))
}

export const config = {
  matcher: [
    "/",
    "/hookup/:path*",
    "/profile/:path*",
    "/models/:path*",
    "/subscribe/:path*",
    "/settings/:path*",
    "/verification/:path*",
    "/wallet/:path*",
    "/posts/:path*",
    // "/search/:path*",
    // "/notifications/:path*",
    "/messages/:path*",
    // "/support/:path*",
    // "/terms/:path*",
    "/chats/:path*",
    "/live/:path*",
    "/points/:path*",
  ],
};
