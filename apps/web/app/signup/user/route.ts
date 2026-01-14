import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, pass } = await req.json();

  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    throw new Error("SERVER_URL is not set");
  }

  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: pass, name: "" }),
    cache: "no-store",
  });

  if (!res.ok) {
    // Optional: pull backend error message
    let msg = "Login failed";
    try {
      const err = await res.json();
      msg = err?.message ?? msg;
    } catch {}
    throw new Error(msg);
  }

  const data: { user: {email: string, name: string | null}, access_token?: string, refresh_token?: string } = await res.json();
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;

  if (!accessToken) {
    return NextResponse.json(
      { message: "No access token returned from server" },
      { status: 500 }
    );
  }

  if (!refreshToken) {
    return NextResponse.json(
      { message: "No refresh token returned from server" },
      { status: 500 }
    );
  }

  (await cookies()).set("session", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 5,
  });

  (await cookies()).set("refresh", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return NextResponse.json({ user: data.user});
}
