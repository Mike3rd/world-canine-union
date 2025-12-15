// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const AUTH_USER = process.env.BASIC_AUTH_USER || "admin";
  const AUTH_PASS = process.env.BASIC_AUTH_PASS || "password";

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pass] = Buffer.from(authValue, "base64").toString().split(":");

    if (user === AUTH_USER && pass === AUTH_PASS) {
      return NextResponse.next(); // allow access
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Only run middleware on all routes (or adjust pattern as needed)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // exclude Next.js internals
};
