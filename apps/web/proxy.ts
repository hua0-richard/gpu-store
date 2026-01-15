import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  const hasRefresh = request.cookies.has("refresh");

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/amd");

  if (isProtectedRoute && !hasSession && hasRefresh) {
    console.log("here")
    const refreshRes = await fetch(new URL("/api/auth/refresh", request.url), {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    if (!refreshRes.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = NextResponse.next();
    const setCookie = refreshRes.headers.get("set-cookie");
    if (setCookie) response.headers.set("set-cookie", setCookie);
    return response;
  } else if (isProtectedRoute && !hasSession && !hasRefresh) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}