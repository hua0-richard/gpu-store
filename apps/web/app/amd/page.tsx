"use client";

import { useCatalogData } from "../_hooks/useCatalogData";
import GpuCatalogPage from "@/components/gpu-catalog-page";

export default function AmdPage() {
  const gpus = useCatalogData().gpuData.amd;
  return (
    <GpuCatalogPage
      title="AMD GPUs"
      gpus={gpus}
      basePath="/amd/config"
    />
  );
}
