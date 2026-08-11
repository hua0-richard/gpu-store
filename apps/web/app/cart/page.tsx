"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchWithAuth } from "@/lib/api";
import { useCart } from "@/components/cart-context";
import { useToast } from "@/components/toast-context";

export default function CartPage() {
  const { items, removeItem, hydrated } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const checkout = async () => {
    if (isCheckingOut) return;
    try {
      if (items.length === 0) {
        toast("Your cart is empty", "error");
        return;
      }
      setIsCheckingOut(true);
      const res = await fetchWithAuth(`/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Checkout failed: ${res.status} ${errorText}`);
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: any) {
      console.error(err);
      toast(`Failed to start checkout: ${err.message}`, "error");
      setIsCheckingOut(false);
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="Cart"
        description={
          items.length > 0
            ? `${items.length} configuration${items.length > 1 ? "s" : ""} ready to deploy`
            : undefined
        }
      />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="flex-1">
          {!hydrated ? (
            <ul className="divide-y divide-border border-y border-border">
              {[0, 1].map((row) => (
                <li
                  key={row}
                  className="flex items-start justify-between gap-4 py-5"
                >
                  <div className="space-y-2.5">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-56" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </li>
              ))}
            </ul>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-6 py-16 text-center">
              <ShoppingBag className="size-5 text-muted-foreground" />
              <div className="space-y-1.5">
                <p className="text-[14px]">Your cart is empty</p>
                <p className="text-[13px] text-muted-foreground">
                  Configure a GPU cluster to get started.
                </p>
              </div>
              <Button variant="outline" asChild className="mt-1">
                <Link href="/nvidia">Browse GPUs</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-4 py-5"
                >
                  <div className="min-w-0">
                    <p className="text-[14px]">
                      <span className="font-mono">{item.quantity}x</span>{" "}
                      {item.name}
                    </p>
                    <p className="mt-1.5 font-mono text-[12px] text-muted-foreground">
                      {item.cpus} vCPU · {item.storage}GB NVMe · {item.hours}h
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="font-mono text-[14px]">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full lg:w-[320px]">
          <div className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-20">
            <h2 className="eyebrow">Order summary</h2>

            <div className="mt-5 space-y-2.5 text-[13px]">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                {hydrated ? (
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                ) : (
                  <Skeleton className="h-3 w-16" />
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Tax (10%)</span>
                {hydrated ? (
                  <span className="font-mono">${tax.toFixed(2)}</span>
                ) : (
                  <Skeleton className="h-3 w-14" />
                )}
              </div>
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
              <span className="text-[13px] text-muted-foreground">Total</span>
              {hydrated ? (
                <span className="font-mono text-[22px] leading-none">
                  ${total.toFixed(2)}
                </span>
              ) : (
                <Skeleton className="h-4 w-28" />
              )}
            </div>

            <Button
              onClick={checkout}
              disabled={!hydrated || items.length === 0 || isCheckingOut}
              className="group mt-6 w-full"
            >
              {isCheckingOut ? "Starting checkout…" : "Checkout"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
