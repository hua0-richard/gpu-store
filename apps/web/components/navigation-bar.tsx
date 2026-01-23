"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { useAuth, useSetAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
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
    <div className="flex flex-row w-full justify-between items-center py-6 border-b border-zinc-200 dark:border-white/10 mb-8 md:mb-12">
      <div className="flex items-center gap-4">
        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
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

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-0">
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* External Moving Glow - "Casting Light" */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#0ea5e9_120deg,transparent_180deg,#d946ef_300deg,transparent_360deg)] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_8s_linear_infinite]" />

            {/* Layer 1: Cyan Tensor Plane (Clockwise) */}
            <div className="absolute z-10 w-3.5 h-3.5 rounded-[3px] border-[1.5px] border-cyan-500/40 bg-black/40 shadow-[0_0_10px_rgba(14,165,233,0.3)] animate-[spin_6s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] will-change-transform backface-visibility-hidden" />

            {/* Layer 2: Fuchsia Tensor Plane (Counter-Clockwise - Out of Phase) */}
            <div className="absolute z-10 w-3.5 h-3.5 rounded-[3px] border-[1.5px] border-fuchsia-500/40 shadow-[0_0_10px_rgba(217,70,239,0.3)] animate-[spin_8s_linear_infinite_reverse] group-hover:animate-[spin_6s_linear_infinite_reverse] will-change-transform backface-visibility-hidden" />

            {/* Core: Stability Point */}
            <div className="absolute z-20 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="text-xl font-bold tracking-tighter transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">tensor</span>
        </Link>
      </div>

      <div className="hidden md:block">
        <Navigation></Navigation>
      </div>

      <div className="flex items-center gap-1">
        <ModeToggle></ModeToggle>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </Button>

        {loading ? (
          <Button variant="ghost" disabled className="w-10 px-0">
            <Spinner />
          </Button>
        ) : isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 ml-2">
                <div className="h-6 w-6 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-sm">
                  <User className="h-3 w-3" />
                </div>
                <span className="max-w-[100px] truncate text-xs font-medium hidden md:block">{user?.email?.split('@')[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-0">
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
          <Button variant="ghost" asChild>
            <Link href="/login" className="flex items-center gap-2">
              Log in
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
