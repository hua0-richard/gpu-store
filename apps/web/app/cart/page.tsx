"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, ArrowRight } from "lucide-react";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { robotoMono } from "@/app/fonts";
import { cn } from "@/lib/utils";

import { fetchWithAuth } from "@/lib/api";
import { useCart } from "@/components/cart-context";
import { useToast } from "@/components/toast-context";

export default function CartPage() {
  const { items, removeItem } = useCart();
  const { toast } = useToast();

  const subtotal = items.reduce(
    (acc, item) => acc + item.totalPrice,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="flex min-h-screen w-full flex-col font-sans dark:bg-black">
      <div className="flex w-full flex-col items-center">
        <div className="relative z-50 w-full max-w-7xl px-4 md:px-8">
          <NavigationBar />
        </div>

        <main className="flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-8 lg:flex-row">
          {/* LEFT COLUMN - CART ITEMS */}
          <div className="flex flex-1 flex-col gap-6">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Shopping Cart
            </h1>

            <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/60">
                    <TableHead className="w-[100px] pl-6">Product</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-[50px] pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow className="hover:bg-transparent border-border/60">
                      <TableCell colSpan={5} className="h-24 text-center">
                        Your cart is empty.
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => (
                      <TableRow key={item.id} className="hover:bg-transparent border-border/60">
                        <TableCell className="py-4 pl-6">
                          <div className="relative w-16 h-16 bg-secondary rounded-md overflow-hidden flex items-center justify-center border border-border/50">
                            <span className={cn("text-[10px] text-muted-foreground", robotoMono.className)}>
                              IMG
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium h-full py-4">
                          <span className="text-base">{item.quantity}x {item.name}</span>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.cpus} vCPUs • {item.storage}GB Storage • {item.hours} Hours
                          </div>
                          <div className={cn("text-xs text-muted-foreground md:hidden mt-1", robotoMono.className)}>
                            ${item.totalPrice.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className={cn("text-sm", robotoMono.className)}>{item.quantity}</span>
                        </TableCell>
                        <TableCell className={cn("text-right py-4 text-sm font-medium", robotoMono.className)}>
                          ${item.totalPrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="py-4 pr-6">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* RIGHT COLUMN - SUMMARY */}
          <div className="w-full lg:w-[360px]">
            <div className="lg:sticky lg:top-8">
              <Card className="border border-border/60 shadow-none bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-medium">Order Summary</CardTitle>
                  <CardDescription>Review your total before checkout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className={cn("font-medium", robotoMono.className)}>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className={cn("font-medium", robotoMono.className)}>${tax.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-border/50" />

                  <div className="flex justify-between items-end pt-2">
                    <span className="text-base font-medium">Total</span>
                    <span className={cn("text-2xl font-semibold tracking-tight text-primary", robotoMono.className)}>
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button
                    onClick={async () => {
                      try {
                        console.log("Checking out with items:", items);
                        if (items.length === 0) {
                          toast("Your cart is empty", "error");
                          return;
                        }
                        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/webhooks/stripe/checkout`, {
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
                      }
                    }}
                    className="w-full h-11 text-base font-medium tracking-wide group rounded-md"
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>

        <div className="w-full max-w-7xl px-4 md:px-8 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
