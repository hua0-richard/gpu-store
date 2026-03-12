import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  const hasRefresh = request.cookies.has("refresh");

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/cart");

  // Only hard-redirect when the user has no auth cookies at all.
  // If a refresh cookie exists, let the request through — the client-side
  // auth context will validate and refresh the session as needed.
  if (isProtectedRoute && !hasSession && !hasRefresh) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
