"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, Cpu, HardDrive, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { robotoMono } from "@/app/fonts";

const CPU_OPTIONS = [
    { value: 12, label: "12 vCPUs" },
    { value: 24, label: "24 vCPUs" },
    { value: 48, label: "48 vCPUs" },
    { value: 96, label: "96 vCPUs" },
];

const STORAGE_OPTIONS = [
    { value: 100, label: "100GB NVMe" },
    { value: 500, label: "500GB NVMe" },
    { value: 1000, label: "1TB NVMe" },
    { value: 2000, label: "2TB NVMe" },
];

const QUANTITY_OPTIONS = [1, 2, 4, 8];

interface GpuData {
    name: string;
    architecture: string;
    memory: string;
    memoryType?: string;
    [key: string]: any;
}

interface GpuConfigPageProps {
    gpu: GpuData | null | undefined;
    gpuId: string;
    pricingBase: Record<string, number>;
}

export default function GpuConfigPage({
    gpu,
    gpuId,
    pricingBase,
}: GpuConfigPageProps) {
    const [quantity, setQuantity] = useState(1);
    const [cpus, setCpus] = useState(24);
    const [storage, setStorage] = useState(500);
    const [hours, setHours] = useState(24);

    const hourlyRate = useMemo(() => {
        const base = pricingBase[gpuId] || pricingBase.default || 3.00;
        const cpuCost = cpus * 0.05;
        const storageCost = storage * 0.001;
        return (base * quantity) + cpuCost + storageCost;
    }, [gpuId, quantity, cpus, storage, pricingBase]);

    const totalCost = hourlyRate * hours;

    if (!gpu) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center font-sans">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">GPU Configuration Not Found</h1>
                    <Link href="/">
                        <Button>Return Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full justify-center font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col items-start justify-start bg-white px-4 dark:bg-black md:px-8">
                <div className="w-full mb-16 md:mb-24">
                    <NavigationBar />
                </div>

                <div className="flex w-full flex-col gap-10 lg:flex-row mb-16">
                    {/* LEFT COLUMN - CONFIGURATION */}
                    <div className="flex flex-1 flex-col gap-10">
                        {/* Header */}
                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Configure {gpu.name}
                            </h1>
                            <p className={cn("text-lg text-muted-foreground leading-relaxed max-w-2xl", robotoMono.className)}>
                                {gpu.architecture} Architecture / {gpu.memory} {gpu.memoryType}
                            </p>
                        </div>

                        <div className="h-px w-full bg-border" />

                        {/* Quantity Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <LayoutGrid className="h-4 w-4 text-primary" />
                                <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">GPU Quantity</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {QUANTITY_OPTIONS.map((opt) => (
                                    <div
                                        key={opt}
                                        onClick={() => setQuantity(opt)}
                                        className={cn(
                                            "cursor-pointer rounded-lg border p-4 text-center transition-all duration-300",
                                            quantity === opt
                                                ? "border-primary bg-secondary"
                                                : "border-border/60 bg-transparent hover:bg-secondary/50"
                                        )}
                                    >
                                        <div className={cn("text-2xl font-medium", robotoMono.className)}>
                                            {opt}x
                                        </div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium">
                                            GPUS
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* vCPU Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Cpu className="h-4 w-4 text-muted-foreground" />
                                <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">vCPU Cores</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {CPU_OPTIONS.map((opt) => (
                                    <div
                                        key={opt.value}
                                        onClick={() => setCpus(opt.value)}
                                        className={cn(
                                            "relative cursor-pointer rounded-lg border p-3 transition-all duration-300",
                                            cpus === opt.value
                                                ? "border-primary bg-secondary"
                                                : "border-border/60 bg-transparent hover:bg-secondary/50"
                                        )}
                                    >
                                        <div className="font-medium text-sm">{opt.label}</div>
                                        {cpus === opt.value && (
                                            <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Storage Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <HardDrive className="h-4 w-4 text-muted-foreground" />
                                <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Storage</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {STORAGE_OPTIONS.map((opt) => (
                                    <div
                                        key={opt.value}
                                        onClick={() => setStorage(opt.value)}
                                        className={cn(
                                            "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-all duration-300",
                                            storage === opt.value
                                                ? "border-primary bg-secondary"
                                                : "border-border/60 bg-transparent hover:bg-secondary/50"
                                        )}
                                    >
                                        <span className="font-medium text-sm">{opt.label}</span>
                                        {storage === opt.value && <Check className="h-3.5 w-3.5 text-primary" />}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Duration Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <h2 className="text-lg font-medium tracking-wide uppercase text-muted-foreground">Duration</h2>
                            </div>
                            <div className="rounded-lg border border-border/60 p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <input
                                        type="range"
                                        min="1"
                                        max="168"
                                        value={hours}
                                        onChange={(e) => setHours(Number(e.target.value))}
                                        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
                                    />
                                    <div className={cn("w-24 text-right text-2xl font-medium", robotoMono.className)}>
                                        {hours}h
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Drag to adjust duration. Max 1 week (168 hours).
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN - SUMMARY */}
                    <div className="w-full lg:w-[360px]">
                        <div className="sticky top-8">
                            <Card className="border border-border/60 shadow-none bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-medium">Summary</CardTitle>
                                    <CardDescription>Estimated cost breakdown</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Items List */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">GPU Model</span>
                                            <span className="font-medium">{quantity}x {gpu.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Processor</span>
                                            <span className="font-medium">{cpus} vCPUs</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Storage</span>
                                            <span className="font-medium">{storage} GB NVMe</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Duration</span>
                                            <span className="font-medium">{hours} Hours</span>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-border/50" />

                                    {/* Pricing */}
                                    <div className="space-y-1 pt-1">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs text-muted-foreground">Hourly Rate</span>
                                            <span className={cn("text-lg font-medium", robotoMono.className)}>
                                                ${hourlyRate.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end mt-4">
                                            <span className="text-base font-medium">Total Estimated</span>
                                            <span className={cn("text-3xl font-semibold tracking-tight text-primary", robotoMono.className)}>
                                                ${totalCost.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-2 pb-6">
                                    <Button className="w-full h-11 text-base font-medium tracking-wide group rounded-md">
                                        Deploy Cluster
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-auto">
                    <Footer />
                </div>
            </main>
        </div>
    );
}
