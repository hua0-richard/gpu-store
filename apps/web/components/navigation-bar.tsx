"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

import {
  useAuth,
} from "@/components/auth-context";

export default function NavigationBar() {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="flex w-full justify-between py-8 mb-16">
      <Navigation></Navigation>
      <div className="flex gap-2">
        <ModeToggle></ModeToggle>
        <Button variant="outline">
          <ShoppingBag></ShoppingBag>
        </Button>
        <Button variant="outline" asChild>
          {isAuthenticated ?
            <Link href="/login">
              <User className="mr-2" />
              {user?.username}
            </Link> : <Link href="/login">Log in</Link>}
        </Button>
      </div>
    </div>
  );
}
