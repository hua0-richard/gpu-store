"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, ShoppingBag, User } from "lucide-react";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Container } from "@/components/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth, useSetAuth } from "@/components/auth-context";
import { useCart } from "@/components/cart-context";
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
  const { cartCount } = useCart();
  const setAuth = useSetAuth();
  const router = useRouter();

  const logout = async () => {
    await fetch("/logout", { method: "POST", credentials: "include" });
    setAuth({ isAuthenticated: false, user: null, loading: false });
    router.replace("/");
  };

  // The cart is only reachable once signed in, so it stays out of the way
  // until it is either usable or already holding something.
  const showCart = isAuthenticated || cartCount > 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Menu">
                  <Menu className="size-[18px]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuItem asChild>
                  <Link href="/nvidia">NVIDIA</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/amd">AMD</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#pricing">Pricing</Link>
                </DropdownMenuItem>
                {isAuthenticated && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Clusters</Link>
                  </DropdownMenuItem>
                )}
                {/* The header only has room for "Sign up" on small screens. */}
                {!loading && !isAuthenticated && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/login">Log in</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Logo />

          <div className="ml-7 hidden md:block">
            <Navigation showClusters={isAuthenticated} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-1">
          <div className="mr-1">
            <ThemeSwitch size="sm" />
          </div>

          {showCart && (
            <Button variant="ghost" size="icon-sm" asChild className="relative">
              <Link href="/cart" aria-label="Cart" prefetch={false}>
                <ShoppingBag className="size-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[10px] text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          )}

          {loading ? (
            <Skeleton className="h-8 w-[70px] rounded-lg" />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Account menu"
                  className="ml-1 rounded-full bg-secondary text-[11px] uppercase"
                >
                  {user?.email?.[0] ?? <User className="size-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate p-2 pb-0 text-xs font-normal text-muted-foreground">
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User className="size-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="size-4" />
                    Clusters
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="ml-1 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:inline-flex"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
