"use client";

import { useCatalogData } from "@/app/_hooks/useCatalogData";
import GpuConfigPage from "@/components/gpu-config-page";
import { useParams } from "next/navigation";

// Mock pricing data for NVIDIA
const PRICING_BASE = {
    a100: 3.50,
    h100: 4.75,
    h200: 5.50,
    default: 4.00,
};

export default function NvidiaConfigPage() {
    const params = useParams();
    const { gpuData } = useCatalogData();

    const gpuId = Array.isArray(params.id) ? params.id[0] : params.id!;
    const gpuKey = gpuId as keyof typeof gpuData.nvidia;
    const gpu = gpuData.nvidia[gpuKey];

    return (
        <GpuConfigPage
            gpu={gpu}
            gpuId={gpuId}
            pricingBase={PRICING_BASE}
        />
    );
}
