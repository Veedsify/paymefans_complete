import { NextResponse, type NextRequest } from "next/server";

// middleware is applied to all routes, use conditionals to select
export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const token = cookies.get("token")?.value;
  req.headers.set("Authorization", `Bearer ${token}`);
  if (token && token.length > 0) {
    if (req.nextUrl.pathname.includes("/login")) {
      return NextResponse.redirect(new URL("/mix", req.url));
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/mix/:path*", "/hookup/:path*"],
};
