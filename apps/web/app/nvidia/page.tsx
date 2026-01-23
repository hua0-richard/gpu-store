"use client";

import { useCatalogData } from "../_hooks/useCatalogData";
import GpuCatalogPage from "@/components/gpu-catalog-page";

export default function NvidiaPage() {
  const gpus = useCatalogData().gpuData.nvidia;
  return (
    <GpuCatalogPage
      title="NVIDIA GPUs"
      gpus={gpus}
      basePath="/nvidia/config"
    />
  );
}
