import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, pass } = await req.json();

  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { message: "SERVER_URL is not set" },
      { status: 500 }
    );
  }

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password: pass }),
    cache: "no-store",
  });

  if (!res.ok) {
    let msg = "Login failed";
    try {
      const err = await res.json();
      msg = err?.message ?? msg;
    } catch {}
    return NextResponse.json({ message: msg }, { status: res.status });
  }

  const data: { user: {email: string, name: string | null}, access_token?: string } = await res.json();
  const accessToken = data.access_token;

  if (!accessToken) {
    return NextResponse.json(
      { message: "No token returned from server" },
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

  return NextResponse.json({ user: data.user});
}