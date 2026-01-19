"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

import Link from "next/link"; // Added import

interface GpuData {
    name: string;
    architecture: string;
    memory: string;
    memoryBandwidth: string;
    id?: string; // Added optional id
    [key: string]: any;
}

interface GpuCatalogPageProps {
    title?: string;
    gpus: Record<string, GpuData> | GpuData[];
    imageSrc: string;
    basePath: string; // Added basePath
}

export default function GpuCatalogPage({
    title = "Select GPU",
    gpus,
    imageSrc,
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
                    <h1 className="font-semibold text-5xl mb-12">{title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gpuList.map((gpu) => {
                            // Use explicit ID or fallback to name-based ID if needed (though key-based is better)
                            const linkId = gpu.id || gpu.name.toLowerCase().replace(/ /g, '-');

                            return (
                                <Card key={gpu.name} className="w-full flex flex-col justify-between">
                                    <div className="p-6 pb-0">
                                        <CardTitle className="font-mono text-xl mb-2">{gpu.name}</CardTitle>
                                        <CardDescription>
                                            Choose the plan that best fits your needs.
                                        </CardDescription>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="aspect-[4/3] relative mb-6 flex items-center justify-center overflow-hidden rounded-md bg-secondary/20">
                                            <img src={imageSrc} alt={`${gpu.name} image`} className="object-contain h-full w-full p-4" />
                                        </div>
                                        <div className="flex flex-col justify-start space-y-2">
                                            <div>
                                                <span className="font-mono font-semibold">
                                                    Architecture:{" "}
                                                </span>
                                                {gpu.architecture}
                                            </div>
                                            <div>
                                                <span className="font-mono font-semibold">Memory: </span>
                                                {gpu.memory}
                                            </div>
                                            <div>
                                                <span className="font-mono font-semibold">Bandwidth: </span>
                                                {gpu.memoryBandwidth}
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
