import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

  const data: { user: {email: string, name: string | null}, access_token?: string } = await res.json();
  const token = data.access_token;
  console.log(token);
  if (!token) {
    throw new Error("No token returned from server");
  }

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/", // allow all routes including /api/*
    maxAge: 60 * 5, // 5 minutes
  });
  redirect("/");
}
