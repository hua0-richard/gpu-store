import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const backend = process.env.SERVER_URL;
  if (!backend) {
    return NextResponse.json({ message: "SERVER_URL missing" }, { status: 500 });
  }
  const cookieHeader = request.headers.get("cookie") ?? "";

  const upstream = await fetch(`${backend}/auth/refresh`, {
    method: "POST",
    headers: {
      cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
  }

  const data: { access_token?: string; refresh_token?: string } =
    await upstream.json();

  const accessToken = data.access_token;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Refresh response missing tokens" },
      { status: 500 }
    );
  }

  const jar = await cookies();

  jar.set("session", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 20,
  });

  return new NextResponse(null, { status: 204 });
}