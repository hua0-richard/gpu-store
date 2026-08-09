"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart-context";
import { useToast } from "@/components/toast-context";
import { fetchWithAuth } from "@/lib/api";

const CPU_OPTIONS = [
  { value: 12, label: "12 vCPUs" },
  { value: 24, label: "24 vCPUs" },
  { value: 48, label: "48 vCPUs" },
  { value: 96, label: "96 vCPUs" },
];

const STORAGE_OPTIONS = [
  { value: 100, label: "100GB NVMe" },
  { value: 500, label: "500GB NVMe" },
  { value: 1000, label: "1TB NVMe" },
  { value: 2000, label: "2TB NVMe" },
];

const QUANTITY_OPTIONS = [1, 2, 4, 8];

interface GpuData {
  name: string;
  architecture: string;
  memory: string;
  memoryType?: string;
  [key: string]: any;
}

interface GpuConfigPageProps {
  gpu: GpuData | null | undefined;
  gpuId: string;
  pricingBase: Record<string, number>;
}

function Section({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="eyebrow">{label}</h2>
        {hint && (
          <span className="text-[12px] text-muted-foreground">{hint}</span>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-lg border px-3 py-2.5 text-left text-[13px] transition-colors",
        selected
          ? "border-foreground/30 bg-secondary text-foreground"
          : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-[13px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

export default function GpuConfigPage({
  gpu,
  gpuId,
  pricingBase,
}: GpuConfigPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [cpus, setCpus] = useState(24);
  const [storage, setStorage] = useState(500);
  const [hours, setHours] = useState(24);
  const { addItem } = useCart();
  const { toast } = useToast();

  const hourlyRate = useMemo(() => {
    const base = pricingBase[gpuId] || pricingBase.default || 3.0;
    const cpuCost = cpus * 0.05;
    const storageCost = storage * 0.001;
    return base * quantity + cpuCost + storageCost;
  }, [gpuId, quantity, cpus, storage, pricingBase]);

  const totalCost = hourlyRate * hours;

  if (!gpu) {
    return (
      <PageShell>
        <div className="max-w-sm space-y-4 py-10">
          <h1 className="text-subtitle">Configuration not found</h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            We could not find a GPU matching this address.
          </p>
          <Button variant="outline" asChild>
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <p className="eyebrow">{gpu.architecture}</p>
          <h1 className="text-subtitle mt-4">{gpu.name}</h1>

          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-y border-border py-5">
            {[
              { label: "Memory", value: gpu.memory },
              { label: "Bandwidth", value: gpu.memoryBandwidth || "N/A" },
              { label: "Power", value: gpu.power || "N/A" },
            ].map((spec) => (
              <div key={spec.label}>
                <dt className="eyebrow">{spec.label}</dt>
                <dd className="mt-1.5 font-mono text-[13px]">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 space-y-10">
            <Section label="GPU quantity">
              <div className="grid grid-cols-4 gap-2">
                {QUANTITY_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt}
                    selected={quantity === opt}
                    onClick={() => setQuantity(opt)}
                  >
                    <span className="font-mono">{opt}x</span>
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label="vCPU cores">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CPU_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    selected={cpus === opt.value}
                    onClick={() => setCpus(opt.value)}
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label="Storage">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {STORAGE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    selected={storage === opt.value}
                    onClick={() => setStorage(opt.value)}
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label="Duration" hint="Up to 168 hours">
              <div className="flex items-center gap-5">
                <input
                  type="range"
                  min="1"
                  max="168"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  aria-label="Duration in hours"
                  className="range-slider w-full cursor-pointer"
                />
                <span className="w-14 shrink-0 text-right font-mono text-[15px]">
                  {hours}h
                </span>
              </div>
            </Section>
          </div>
        </div>

        <div className="w-full lg:w-[320px]">
          <div className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-20">
            <h2 className="eyebrow">Summary</h2>

            <div className="mt-5 space-y-2.5">
              <SummaryRow
                label="GPU"
                value={`${quantity}x ${gpuId.toUpperCase()}`}
              />
              <SummaryRow label="Processor" value={`${cpus} vCPU`} />
              <SummaryRow label="Storage" value={`${storage} GB`} />
              <SummaryRow label="Duration" value={`${hours} h`} />
              <SummaryRow
                label="Hourly rate"
                value={`$${hourlyRate.toFixed(2)}`}
              />
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
              <span className="text-[13px] text-muted-foreground">
                Total estimate
              </span>
              <span className="font-mono text-[22px] leading-none">
                ${totalCost.toFixed(2)}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button
                className="group w-full"
                onClick={async () => {
                  try {
                    const res = await fetchWithAuth(`/checkout`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        items: [
                          {
                            name: gpu.name,
                            gpuId,
                            quantity,
                            cpus,
                            storage,
                            hours,
                            pricePerStep: hourlyRate,
                            architecture: gpu.architecture,
                            memory: gpu.memory,
                          },
                        ],
                      }),
                    });
                    if (!res.ok) {
                      const errorText = await res.text();
                      throw new Error(
                        `Checkout failed: ${res.status} ${errorText}`,
                      );
                    }
                    const { url } = await res.json();
                    window.location.href = url;
                  } catch (err: any) {
                    console.error(err);
                    toast(`Failed to start checkout: ${err.message}`, "error");
                  }
                }}
              >
                Deploy cluster
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  addItem({
                    name: gpu.name,
                    gpuId,
                    quantity,
                    cpus,
                    storage,
                    hours,
                    pricePerStep: hourlyRate,
                    totalPrice: totalCost,
                    architecture: gpu.architecture,
                    memory: gpu.memory,
                  });
                  toast("Added to cart", "success");
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
