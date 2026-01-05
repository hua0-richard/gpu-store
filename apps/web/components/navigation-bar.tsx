"use client";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

import {
  getAuth,
  useAuthenticated,
  useSetAuthenticated,
} from "@/components/auth-context";
import { useEffect } from "react";

export default function NavigationBar() {
  const setAuthenticated = useSetAuthenticated();
  useEffect(() => {
    getAuth(setAuthenticated);
  }, []);
  return (
    <div className="flex w-full justify-between py-8 mb-16">
      <Navigation></Navigation>
      <div className="flex gap-2">
        <ModeToggle></ModeToggle>
        <Button variant="outline">
          <ShoppingBag></ShoppingBag>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">
            <User></User>
          </Link>
        </Button>
        <Button onClick={() => getAuth(setAuthenticated)}>Click Me!</Button>
      </div>
    </div>
  );
}
