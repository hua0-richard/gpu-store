"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { useAuth, useSetAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavigationBar() {
  const { loading, isAuthenticated, user } = useAuth();
  const setAuth = useSetAuth();
  const router = useRouter();
  const logout = async () => {
    await fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  return (
    <div className="flex flex-row w-full justify-between items-center py-4 mb-4 md:mb-16">
      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link href="/" className="w-full">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/amd" className="w-full">AMD</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/nvidia" className="w-full">NVIDIA</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden md:block">
        <Navigation></Navigation>
      </div>

      <div className="flex gap-2">
        <ModeToggle></ModeToggle>
        <Button variant="outline" asChild>
          <Link href="/cart">
            <ShoppingBag />
          </Link>
        </Button>

        {loading ? (
          <Button variant="outline" disabled className="flex items-center gap-2 w-[140px] justify-between">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-[80px]" />
          </Button>
        ) : isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 w-auto md:w-[140px] justify-between">
                <User className="h-4 w-4" />
                <span className="w-[80px] truncate text-left hidden md:block">{user?.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account" className="cursor-pointer w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-500 focus:text-red-500"
                onClick={() => {
                  logout();
                  setAuth({ isAuthenticated: false, user: null, loading: false });
                  router.replace("/");
                }}
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" asChild>
            <Link href="/login" className="flex items-center gap-2">
              <User className="mr-2" />
              Log in
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
