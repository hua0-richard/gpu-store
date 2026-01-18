"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"
import { useAuth, useSetAuth } from "@/components/auth-context";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  const setAuth = useSetAuth();

  const canSubmit = email.trim().length > 0 && password.length > 0;

  async function handleSignup() {
    if (!canSubmit) return;

    startTransition(async () => {
      try {
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
          })
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="w-screen h-full flex items-center justify-center bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSignup();
                  }}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
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

              <Button
                type="button"
                className="w-full"
                onClick={handleSignup}
                disabled={!canSubmit || isPending}
              >
                {isPending ? "Signing up…" : "Sign Up"}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/login")}>
                Login
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
