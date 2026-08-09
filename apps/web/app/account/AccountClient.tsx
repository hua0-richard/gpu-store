"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth, useSetAuth } from "@/components/auth-context";
import { fetchWithAuth } from "@/lib/api";
import { useCart } from "@/components/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAID_STATUSES = ["succeeded", "complete", "paid"];

export default function AccountClient() {
  const { user, isAuthenticated, loading } = useAuth();
  const setAuth = useSetAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  const computeHours = useMemo(() => {
    const totals: Record<string, number> = {};

    orders.forEach((order) => {
      if (PAID_STATUSES.includes(order.status)) {
        order.items?.forEach((item: any) => {
          const hours = parseFloat(item.hours || "0");
          const qty = item.quantity || 1;
          const name = item.name || "Unknown GPU";

          if (hours > 0) {
            if (!totals[name]) totals[name] = 0;
            totals[name] += hours * qty;
          }
        });
      }
    });

    return Object.entries(totals).map(([type, hours]) => ({ type, hours }));
  }, [orders]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const successParam = searchParams.get("success");

    if (successParam === "true") {
      clearCart();
      router.replace("/account");
    }
  }, [searchParams, clearCart, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWithAuth(`/orders`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error("Orders data is not an array:", data);
            setOrders([]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch orders", err);
          setOrders([]);
        })
        .finally(() => setOrdersLoaded(true));
    }
  }, [isAuthenticated]);

  const logout = async () => {
    await fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuth({ isAuthenticated: false, user: null, loading: false });
    router.replace("/");
  };

  if (!loading && !isAuthenticated) {
    return null;
  }

  return (
    <PageShell>
      <PageHeader
        title="Account"
        description={
          loading ? <Skeleton className="my-1 h-4 w-52" /> : user?.email
        }
        action={
          !loading && (
            <Button onClick={logout} variant="outline" size="sm">
              Log out
            </Button>
          )
        }
      />

      <div className="space-y-14">
        <section>
          <h2 className="eyebrow">Compute hours</h2>
          {!ordersLoaded ? (
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
              {[0, 1, 2, 3].map((tile) => (
                <div key={tile} className="space-y-3 bg-card p-5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-12" />
                </div>
              ))}
            </div>
          ) : computeHours.length === 0 ? (
            <div className="mt-4 rounded-xl border border-border bg-card px-5 py-10 text-center text-[13px] text-muted-foreground">
              No compute hours yet. Purchased configurations appear here.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
              {computeHours.map((gpu) => (
                <div key={gpu.type} className="bg-card p-5">
                  <p
                    className="truncate text-[12px] text-muted-foreground"
                    title={gpu.type}
                  >
                    {gpu.type}
                  </p>
                  <p className="mt-2.5 font-mono text-[22px] leading-none">
                    {gpu.hours}h
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="eyebrow">Purchase history</h2>
          <div className="mt-4 border-t border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow h-11 pl-0 pr-4 font-normal">
                    Order
                  </TableHead>
                  <TableHead className="eyebrow h-11 px-4 font-normal">
                    Date
                  </TableHead>
                  <TableHead className="eyebrow h-11 px-4 font-normal">
                    Items
                  </TableHead>
                  <TableHead className="eyebrow h-11 px-4 font-normal">
                    Status
                  </TableHead>
                  <TableHead className="eyebrow h-11 pl-4 pr-0 text-right font-normal">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!ordersLoaded ? (
                  [0, 1, 2].map((row) => (
                    <TableRow key={row} className="border-border">
                      <TableCell className="py-4 pl-0 pr-4">
                        <Skeleton className="h-3 w-16" />
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Skeleton className="h-3 w-20" />
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Skeleton className="h-3 w-40" />
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </TableCell>
                      <TableCell className="flex justify-end py-4 pl-4 pr-0">
                        <Skeleton className="h-3 w-14" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : orders.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-[13px] text-muted-foreground"
                    >
                      No orders yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id} className="border-border">
                      <TableCell className="py-4 pl-0 pr-4 font-mono text-[12px] text-muted-foreground">
                        {order.id.slice(0, 8)}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[13px] text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[13px]">
                        {order.items?.map((item: any) => (
                          <div key={item.id}>
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Badge
                          variant={
                            PAID_STATUSES.includes(order.status)
                              ? "success"
                              : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 pl-4 pr-0 text-right font-mono text-[13px]">
                        ${(order.amount / 100).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
