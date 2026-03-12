import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    return NextResponse.json({ message: "SERVER_URL is not set" }, { status: 500 });
  }

  const jar = await cookies();
  const session = jar.get("session")?.value;

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const res = await fetch(`${baseUrl}/orders`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let msg = "Failed to fetch orders";
    try {
      const err = await res.json();
      msg = err?.message ?? msg;
    } catch {}
    return NextResponse.json({ message: msg }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
