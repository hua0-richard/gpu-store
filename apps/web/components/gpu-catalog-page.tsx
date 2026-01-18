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
        <div className="flex justify-center items-center w-full px-16">
            <main className="flex max-w-7xl flex-col items-start justify-start bg-white dark:bg-black">
                <div className="w-full">
                    <NavigationBar />
                </div>
                <h1 className="font-semibold text-5xl pb-16">{title}</h1>
                <div className="flex flex-wrap gap-8">
                    {gpuList.map((gpu) => {
                        // Use explicit ID or fallback to name-based ID if needed (though key-based is better)
                        const linkId = gpu.id || gpu.name.toLowerCase().replace(/ /g, '-');

                        return (
                            <Card key={gpu.name} className="max-w-sm px-8">
                                <CardTitle className="font-mono text-xl">{gpu.name}</CardTitle>
                                <CardDescription>
                                    Choose the plan that best fits your needs.
                                </CardDescription>
                                <CardContent>
                                    <img src={imageSrc} alt={`${gpu.name} image`} />
                                    <div className="flex flex-col justify-start">
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
                                <CardFooter>
                                    <Link href={`${basePath}/${linkId}`}>
                                        <Button>
                                            <ArrowRight />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
                <Footer />
            </main>
        </div>
    );
}
