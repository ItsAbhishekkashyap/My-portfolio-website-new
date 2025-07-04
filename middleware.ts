import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

// Utility: Check for public file types like .js, .css, .png etc.
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip static files and Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const isProtectedRoute = pathname.startsWith("/admin")
  const token = req.cookies.get("token")?.value

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jwtVerify(token, secret)

      // Optional: check if the role is admin
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      return NextResponse.next()
    } catch (err) {
      console.error("JWT verification failed:", err)
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // For non-admin and non-static routes, allow
  return NextResponse.next()
}

// Match only admin paths
export const config = {
  matcher: ["/admin/:path*"],
}

