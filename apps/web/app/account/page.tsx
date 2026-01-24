"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth, useSetAuth } from "@/components/auth-context";
import { fetchWithAuth } from "@/lib/api";
import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AccountPage() {
    const { user, isAuthenticated, loading } = useAuth();
    const setAuth = useSetAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { clearCart } = useCart();

    // Orders State - Moved to top level
    const [orders, setOrders] = useState<any[]>([]);

    // Calculate Compute Hours from Orders
    const computeHours = useMemo(() => {
        const totals: Record<string, number> = {};

        orders.forEach(order => {
            // Only count successful orders
            if (order.status === 'succeeded' || order.status === 'complete' || order.status === 'paid') {
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

        // Convert to array
        const result = Object.entries(totals).map(([type, hours]) => ({ type, hours }));
        if (result.length === 0) {
            return [
                { type: "No Active Compute", hours: 0 },
            ];
        }
        return result;
    }, [orders]);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

    // Handle success from Stripe
    useEffect(() => {
        const successParam = searchParams.get("success");
        console.log("AccountPage URL Params:", successParam);

        if (successParam === "true") {
            console.log("Success param detected. Clearing cart...");
            clearCart();
            // Optional: Remove query param without reload
            router.replace("/account");
        }
    }, [searchParams, clearCart, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/orders`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch");
                    return res.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data);
                    } else {
                        console.error("Orders data is not an array:", data);
                        setOrders([]);
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch orders", err);
                    setOrders([]);
                });
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

    if (loading) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center font-sans dark:bg-black">
                <div>Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Or return loading state or empty div while redirecting
    }

    return (
        <div className="flex min-h-screen w-full justify-center font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col items-start justify-start bg-white px-4 dark:bg-black md:px-8">
                <div className="w-full mb-16 md:mb-24">
                    <NavigationBar />
                </div>

                <div className="w-full mb-16 gap-10 flex flex-col">
                    <div className="flex w-full justify-between items-end mb-8">
                        <h1 className="text-6xl font-bold tracking-tighter">My Account</h1>
                        <Button onClick={logout} variant="outline" size="sm">
                            Log Out
                        </Button>
                    </div>

                    {/* User Info & Compute Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {/* User Profile */}
                        <Card className="col-span-1 relative overflow-hidden bg-white transition-all duration-500 hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-white/20 dark:hover:shadow-white/5 group">
                            {/* Abstract Background Pattern */}
                            <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none">
                                <div
                                    className="absolute inset-0 bg-[radial-gradient(#00000040_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff40_1px,transparent_1px)]"
                                    style={{ backgroundSize: '24px 24px' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-zinc-950/80" />
                            </div>
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-zinc-900/5 blur-3xl transition-all duration-700 group-hover:bg-zinc-900/10 dark:bg-white/5 dark:group-hover:bg-white/10 pointer-events-none" />

                            <div className="relative z-10">
                                <CardHeader>
                                    <CardTitle>Profile</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4">
                                        <label className="text-sm text-muted-foreground block mb-1">Email Address</label>
                                        <div className="text-lg font-medium truncate" title={user?.email || ""}>{user?.email}</div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>

                        {/* Compute Hours */}
                        <Card className="col-span-1 md:col-span-2 relative overflow-hidden bg-white transition-all duration-500 hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-white/20 dark:hover:shadow-white/5 group">
                            {/* Abstract Background Pattern */}
                            <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none">
                                <div
                                    className="absolute inset-0 bg-[radial-gradient(#00000040_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff40_1px,transparent_1px)]"
                                    style={{ backgroundSize: '24px 24px' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-zinc-950/80" />
                            </div>
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-zinc-900/5 blur-3xl transition-all duration-700 group-hover:bg-zinc-900/10 dark:bg-white/5 dark:group-hover:bg-white/10 pointer-events-none" />

                            <div className="relative z-10">
                                <CardHeader>
                                    <CardTitle>Available Compute Hours</CardTitle>
                                    <CardDescription>Remaining time on your active configurations.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {computeHours.map((gpu) => (
                                            <div key={gpu.type} className="flex flex-col p-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-border/50 hover:bg-white/80 dark:hover:bg-white/5 transition-colors">
                                                <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{gpu.type}</span>
                                                <span className="text-2xl font-mono font-medium">{gpu.hours}h</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </div>

                    {/* Purchase History */}
                    <div className="w-full">
                        <Card className="relative overflow-hidden bg-white transition-all duration-500 hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-white/20 dark:hover:shadow-white/5 group">
                            {/* Abstract Background Pattern */}
                            <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none">
                                <div
                                    className="absolute inset-0 bg-[radial-gradient(#00000040_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff40_1px,transparent_1px)]"
                                    style={{ backgroundSize: '24px 24px' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-zinc-950/80" />
                            </div>
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-zinc-900/5 blur-3xl transition-all duration-700 group-hover:bg-zinc-900/10 dark:bg-white/5 dark:group-hover:bg-white/10 pointer-events-none" />

                            <div className="relative z-10">
                                <CardHeader>
                                    <CardTitle>Purchase History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Item</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <TableRow key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                                    <TableCell className="font-medium font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell>
                                                        {order.items?.map((item: any) => (
                                                            <div key={item.id}>
                                                                {item.quantity}x {item.name}
                                                            </div>
                                                        ))}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${order.status === "complete" || order.status === "succeeded" || order.status === "paid" // Stripe statuses vary
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                                                            : "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-800"
                                                            }`}>
                                                            {order.status}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono">
                                                        ${(order.amount / 100).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="w-full mt-auto">
                    <Footer />
                </div>
            </main>
        </div>
    );
}
