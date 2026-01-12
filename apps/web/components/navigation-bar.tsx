"use client"

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { useAuth, useSetAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const { isAuthenticated, user } = useAuth();
  const setAuth = useSetAuth();
  const router = useRouter()
  const logout = async () => {
    await fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  return (
    <div className="flex w-full justify-between py-8 mb-16">
      {isAuthenticated ? <Button onClick={() => {
        logout()
        setAuth({ isAuthenticated: false, user: null, loading: false });
        router.replace("/")
      }}>Log Out</Button> : <></>}
      <Navigation></Navigation>
      <div className="flex gap-2">
        <ModeToggle></ModeToggle>
        <Button variant="outline">
          <ShoppingBag></ShoppingBag>
        </Button>
        <Button variant="outline" asChild>
          {isAuthenticated ? (
            <Link href="/login">
              <User className="mr-2" />
              {user?.email}
            </Link>
          ) : (
            <Link href="/login">Log in</Link>
          )}
        </Button>
      </div>
    </div>
  );
}
