"use client";

import { useAuth, useSetAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AccountPage() {
    const { user, isAuthenticated, loading } = useAuth();
    const setAuth = useSetAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

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
        return null;
    }

    // Placeholder data
    const purchaseHistory = [
        { id: "ORD-001", date: "2023-10-15", item: "NVIDIA A100 Cluster", amount: "$5,250.00", status: "Completed" },
        { id: "ORD-002", date: "2023-11-02", item: "AMD MI250X Cluster", amount: "$3,750.00", status: "Active" },
    ];

    const computeHours = [
        { type: "NVIDIA A100", hours: 42.5 },
        { type: "NVIDIA H100", hours: 0 },
        { type: "AMD MI250X", hours: 128.0 },
        { type: "AMD MI300X", hours: 10.0 },
    ];

    return (
        <div className="flex min-h-screen w-full flex-col items-center font-sans dark:bg-black">
            <div className="w-full max-w-7xl">
                <NavigationBar />
            </div>
            <main className="flex w-full max-w-7xl flex-col items-start justify-start px-6 py-10 lg:px-8 gap-10">

                <div className="flex w-full justify-between items-center">
                    <h1 className="text-3xl font-semibold">My Account</h1>
                    <Button onClick={logout} variant="outline" size="sm">
                        Log Out
                    </Button>
                </div>

                {/* User Info & Compute Hours */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {/* User Profile */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <label className="text-sm text-muted-foreground block mb-1">Email Address</label>
                                <div className="text-lg font-medium truncate" title={user?.email || ""}>{user?.email}</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Compute Hours */}
                    <Card className="col-span-1 md:col-span-2">
                        <CardHeader>
                            <CardTitle>Available Compute Hours</CardTitle>
                            <CardDescription>Remaining time on your active configurations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {computeHours.map((gpu) => (
                                    <div key={gpu.type} className="flex flex-col p-4 bg-secondary/50 rounded-lg border border-border/50">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{gpu.type}</span>
                                        <span className="text-2xl font-mono font-medium">{gpu.hours}h</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Purchase History */}
                <div className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Purchase History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {purchaseHistory.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.item}</TableCell>
                                            <TableCell>
                                                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${order.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-secondary text-secondary-foreground"
                                                    }`}>
                                                    {order.status}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{order.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

            </main>
            <div className="w-full max-w-7xl mt-auto">
                <Footer />
            </div>
        </div>
    );
}
