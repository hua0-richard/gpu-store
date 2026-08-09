"use client";

import { useCatalogData } from "../_hooks/useCatalogData";
import GpuCatalogPage from "@/components/gpu-catalog-page";

export default function NvidiaPage() {
  const gpus = useCatalogData().gpuData.nvidia;
  return (
    <GpuCatalogPage
      eyebrow="NVIDIA"
      title="Tensor Core accelerators"
      description="Hopper and Ampere accelerators for LLM training and scale-out inference."
      gpus={gpus}
      basePath="/nvidia/config"
    />
  );
}
