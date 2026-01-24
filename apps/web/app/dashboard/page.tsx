"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-context";
import { fetchWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Terminal, Circle, Power, Link as LinkIcon, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { robotoMono } from "@/app/fonts";
import { useToast } from "@/components/toast-context";

interface Instance {
    id: string;
    name: string;
    type: string;
    status: string;
    ipAddress: string | null;
    region: string;
    createdAt: string;
}

export default function DashboardPage() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [instances, setInstances] = useState<Instance[]>([]);
    const { toast } = useToast();

    // Fetch instances on mount and poll every 5 seconds
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
            return;
        }

        if (isAuthenticated) {
            const fetchInstances = () => {
                fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/instances`)
                    .then(res => res.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            setInstances(data);
                        }
                    })
                    .catch(console.error);
            };

            fetchInstances();
            const interval = setInterval(fetchInstances, 5000); // Poll for simulation updates
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, loading, router]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast("Copied SSH command", "info");
    };

    if (loading) return null;

    return (
        <div className="flex min-h-screen w-full justify-center font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col items-start justify-start bg-white px-4 dark:bg-black md:px-8">
                <div className="w-full mb-10 md:mb-16">
                    <NavigationBar />
                </div>

                <div className="w-full mb-16 gap-10 flex flex-col">
                    <div className="flex flex-col gap-4 mb-4">
                        <h1 className="text-5xl font-bold tracking-tighter">Cluster Dashboard</h1>
                        <p className="text-muted-foreground text-lg">Manage your active GPU instances.</p>
                    </div>

                    {instances.length === 0 ? (
                        <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                            <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
                                <Server className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                                <h3 className="text-xl font-medium">No Active Instances</h3>
                                <p className="text-muted-foreground">Purchase a GPU configuration to see it here.</p>
                                <Button onClick={() => router.push('/')} variant="outline">Browse GPUs</Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {instances.map((instance) => (
                                <Card key={instance.id} className="relative overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-lg">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-50" />

                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-1">
                                                <CardTitle className={cn("text-lg font-mono", robotoMono.className)}>{instance.name}</CardTitle>
                                                <CardDescription className="uppercase text-xs font-semibold tracking-wider">{instance.type}</CardDescription>
                                            </div>
                                            <div className={cn(
                                                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border",
                                                instance.status === 'RUNNING'
                                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                            )}>
                                                <Circle className={cn("h-1.5 w-1.5 fill-current animate-pulse")} />
                                                {instance.status}
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4 pb-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-xs text-muted-foreground uppercase">Region</span>
                                                <div className="font-medium">{instance.region}</div>
                                            </div>
                                            <div>
                                                <span className="text-xs text-muted-foreground uppercase">IP Address</span>
                                                <div className={cn("font-medium font-mono", robotoMono.className)}>
                                                    {instance.ipAddress || "Assigning..."}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-2 flex gap-3">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 gap-2 text-xs"
                                            disabled={!instance.ipAddress}
                                            onClick={() => copyToClipboard(`ssh root@${instance.ipAddress}`)}
                                        >
                                            <Terminal className="h-3.5 w-3.5" />
                                            SSH
                                        </Button>
                                        <Button size="sm" variant="ghost" className="px-3 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
                                            <Power className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full mt-auto">
                    <Footer />
                </div>
            </main>
        </div>
    );
}
