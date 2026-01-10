"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function submitLogin(formData: FormData) {
  const user = String(formData.get("email") ?? "");
  const pass = String(formData.get("password") ?? "");

  if (!user || !pass) {
    throw new Error("Missing credentials");
  }

  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    throw new Error("SERVER_URL is not set");
  }

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass }),
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

  const data: any = await res.json();
  const token: string | undefined = data?.access_token
  console.log(token)
  if (!token) {
    throw new Error("No token returned from server");
  }

(await cookies()).set("session", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",          // allow all routes including /api/*
  maxAge: 60 * 5,     // 5 minutes
});

  redirect("/");
}