"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

import { robotoMono } from "@/app/fonts"; // Import font
import Link from "next/link";

interface GpuData {
    name: string;
    architecture: string;
    memory: string;
    memoryBandwidth: string;
    power?: string;
    id?: string;
    [key: string]: any;
}

interface GpuCatalogPageProps {
    title?: string;
    gpus: Record<string, GpuData> | GpuData[];
    basePath: string;
}

export default function GpuCatalogPage({
    title = "Select GPU",
    gpus,
    basePath,
}: GpuCatalogPageProps) {
    const gpuList = Array.isArray(gpus)
        ? gpus
        : Object.entries(gpus).map(([key, value]) => ({ ...value, id: key }));

    return (
        <div className="flex min-h-screen w-full justify-center font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col items-start justify-start bg-white px-4 dark:bg-black md:px-8">
                <div className="w-full mb-16 md:mb-24">
                    <NavigationBar />
                </div>

                <div className="w-full mb-16">
                    <h1 className="text-6xl font-bold tracking-tighter text-left mb-16">{title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gpuList.map((gpu) => {
                            // Use explicit ID or fallback to name-based ID if needed (though key-based is better)
                            const linkId = gpu.id || gpu.name.toLowerCase().replace(/ /g, '-');

                            return (
                                <Card key={gpu.name} className="group w-full relative overflow-hidden bg-white transition-all duration-500 hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-white/20 dark:hover:shadow-white/5">
                                    {/* Abstract Background Pattern */}
                                    <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none">
                                        <div
                                            className="absolute inset-0 bg-[radial-gradient(#00000040_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff40_1px,transparent_1px)]"
                                            style={{ backgroundSize: '24px 24px' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-zinc-950/80" />
                                    </div>

                                    {/* Brand/Product Highlight Glow */}
                                    <div
                                        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-zinc-900/5 blur-3xl transition-all duration-700 group-hover:bg-zinc-900/10 dark:bg-white/5 dark:group-hover:bg-white/10 pointer-events-none"
                                    />

                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div className="p-6 pb-0">
                                            <CardTitle className="font-mono text-xl mb-4">{gpu.name}</CardTitle>
                                        </div>
                                        <CardContent className="p-6 pt-0">
                                            {/* Technical Datasheet Visualization */}
                                            <div className="aspect-[4/3] relative mb-6 flex flex-col items-stretch overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/50">
                                                {/* Header: Architecture */}
                                                <div className="flex w-full items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                                        <span className={`text-[10px] font-semibold text-zinc-500 uppercase tracking-widest ${robotoMono.className}`}>
                                                            {gpu.architecture}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Body: VRAM Hero (w/ Dot Pattern) */}
                                                <div className="relative flex flex-1 flex-col items-center justify-center">
                                                    {/* Abstract Dot Pattern */}
                                                    <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
                                                        <div
                                                            className="absolute inset-0 bg-[radial-gradient(#00000040_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff40_1px,transparent_1px)]"
                                                            style={{ backgroundSize: '16px 16px' }}
                                                        />
                                                    </div>

                                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                                        <span className={`text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white ${robotoMono.className}`}>
                                                            {gpu.memory.split(' ')[0]}
                                                        </span>
                                                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                                                            {gpu.memory.split(' ').slice(1).join(' ') || 'VRAM'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Footer: Power & Bandwidth */}
                                                <div className="grid w-full grid-cols-2 divide-x divide-zinc-200 border-t border-zinc-200 dark:divide-white/10 dark:border-white/10">
                                                    <div className="flex flex-col items-center justify-center py-2">
                                                        <span className="text-[10px] font-medium text-zinc-400 uppercase">Power</span>
                                                        <span className={`text-xs font-semibold text-zinc-700 dark:text-zinc-300 ${robotoMono.className}`}>
                                                            {gpu.power || 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center py-2">
                                                        <span className="text-[10px] font-medium text-zinc-400 uppercase">Bandwidth</span>
                                                        <span className={`text-xs font-semibold text-zinc-700 dark:text-zinc-300 ${robotoMono.className}`}>
                                                            {gpu.memoryBandwidth.split(' ')[0]}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-6 pt-0">
                                            <Link href={`${basePath}/${linkId}`} className="w-full">
                                                <Button className="w-full group">
                                                    Configure Now
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                <div className="w-full mt-auto">
                    <Footer />
                </div>
            </main>
        </div>
    );
}
