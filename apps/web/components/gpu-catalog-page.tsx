"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { CELL, CellGrid, Frame, GUTTER } from "@/components/layout";
import { cn } from "@/lib/utils";

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
  eyebrow?: string;
  description?: string;
  gpus: Record<string, GpuData> | GpuData[];
  basePath: string;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5">
      <dt className="text-[13px] text-muted-foreground">{label}</dt>
      <dd className="font-mono text-[13px]">{value}</dd>
    </div>
  );
}

export default function GpuCatalogPage({
  title = "Select GPU",
  eyebrow,
  description,
  gpus,
  basePath,
}: GpuCatalogPageProps) {
  const gpuList: GpuData[] = Array.isArray(gpus)
    ? gpus
    : Object.entries(gpus).map(([key, value]) => ({ ...value, id: key }));

  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />

      <Frame>
        <div className={cn("max-w-xl pb-10 pt-14 md:pt-20", GUTTER)}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="text-title mt-4">{title}</h1>
          {description && (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <CellGrid className="border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {gpuList.map((gpu) => {
            const linkId = gpu.id || gpu.name.toLowerCase().replace(/ /g, "-");
            const [memorySize, ...memoryType] = gpu.memory.split(" ");

            return (
              <Link
                key={gpu.name}
                href={`${basePath}/${linkId}`}
                className={cn(
                  CELL,
                  "group block transition-colors hover:bg-card md:py-10",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="min-h-10 text-[14px] leading-snug text-muted-foreground">
                    {gpu.name}
                  </h2>
                  <span className="eyebrow shrink-0">{gpu.architecture}</span>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-mono text-[34px] leading-none tracking-tight">
                    {memorySize}
                  </span>
                  <span className="eyebrow">
                    {memoryType.join(" ") || "VRAM"}
                  </span>
                </div>

                <dl className="mt-8">
                  <SpecRow
                    label="Bandwidth"
                    value={gpu.memoryBandwidth || "N/A"}
                  />
                  <SpecRow label="Power" value={gpu.power || "N/A"} />
                  {gpu.formFactors && (
                    <SpecRow
                      label="Form factor"
                      value={gpu.formFactors.join(" / ")}
                    />
                  )}
                </dl>

                <p className="mt-7 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors group-hover:text-foreground">
                  Configure
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            );
          })}
        </CellGrid>

        <div className="flex-1" />

        <Footer />
      </Frame>
    </div>
  );
}
