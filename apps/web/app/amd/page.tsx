"use client";

import { useCatalogData } from "../_hooks/useCatalogData";
import GpuCatalogPage from "@/components/gpu-catalog-page";

export default function AmdPage() {
  const gpus = useCatalogData().gpuData.amd;
  return (
    <GpuCatalogPage
      eyebrow="AMD"
      title="Instinct accelerators"
      description="CDNA accelerators with up to 288GB of HBM3E memory per GPU."
      gpus={gpus}
      basePath="/amd/config"
    />
  );
}
