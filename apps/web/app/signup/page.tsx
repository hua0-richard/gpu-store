"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { ThemeSwitch } from "@/components/theme-switch";
import { useSetAuth } from "@/components/auth-context";

export default function Signup() {
  const router = useRouter();
  const setAuth = useSetAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const canSubmit = email.trim().length > 0 && password.length > 0;

  async function handleSignup() {
    if (!canSubmit) return;

    startTransition(async () => {
      try {
        setError("");
        const res = await fetch("/signup/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            pass: password,
          }),
        });

        if (!res.ok) {
          throw new Error("signup failed");
        }

        const data = await res.json();

        if (data) {
          setAuth({
            isAuthenticated: true,
            user: data.user,
            loading: false,
          });
          router.push("/");
        }
      } catch (err) {
        console.error(err);
        setError("We could not create that account. Try another email.");
      }
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-5 py-16">
      <Logo />

      <div className="w-full max-w-[368px] space-y-6 rounded-xl border border-border bg-card p-7">
        <div className="space-y-1.5">
          <h1 className="text-[19px] tracking-[-0.025em]">Create an account</h1>
          <p className="text-[13px] text-muted-foreground">
            Start deploying GPU clusters in minutes.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[13px] font-normal">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSignup();
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[13px] font-normal">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSignup();
              }}
            />
          </div>

          {error && <p className="text-[13px] text-destructive">{error}</p>}

          <Button
            type="button"
            className="w-full"
            onClick={handleSignup}
            disabled={!canSubmit || isPending}
          >
            {isPending ? "Creating account…" : "Create account"}
          </Button>
        </div>

        <p className="text-center text-[13px] text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* These pages render no footer, so the theme control lives here. */}
      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to home
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
}
