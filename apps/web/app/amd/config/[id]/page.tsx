"use client";

import { useCatalogData } from "@/app/_hooks/useCatalogData";
import GpuConfigPage from "@/components/gpu-config-page";
import { useParams } from "next/navigation";

// Mock pricing data for AMD
const PRICING_BASE = {
  mi250x: 2.50,
  mi300x: 3.75,
  mi325x: 4.50,
  mi355x: 6.00,
  default: 3.00,
};

export default function AmdConfigPage() {
    const params = useParams();
  const { gpuData } = useCatalogData();

  const gpuId = Array.isArray(params.id) ? params.id[0] : params.id!;
  const gpuKey = gpuId as keyof typeof gpuData.amd;
  const gpu = gpuData.amd[gpuKey];

  return (
    <GpuConfigPage
      gpu={gpu}
      gpuId={gpuId}
      pricingBase={PRICING_BASE}
    />
  );
}
