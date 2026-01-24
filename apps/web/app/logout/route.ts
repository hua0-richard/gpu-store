import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST() {
  const baseUrl = process.env.SERVER_URL;
  const res = NextResponse.json({ ok: true });

  res.cookies.set("session", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  const cookieHeader = (await headers()).get("cookie") ?? "";

  await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      cookie: cookieHeader,
    },
  });

  res.cookies.set("refresh", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
