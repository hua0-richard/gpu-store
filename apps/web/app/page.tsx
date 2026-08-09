import Link from "next/link";
import { ArrowRight, CreditCard, Cpu, Zap } from "lucide-react";

import { PlatformCell } from "@/components/product-card";
import { PricingTable } from "@/components/pricing-table";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { Cell, CellGrid, Frame, GUTTER } from "@/components/layout";

const STATS = [
  { value: "7", label: "GPU models" },
  { value: "288GB", label: "Max VRAM" },
  { value: "8 TB/s", label: "Bandwidth" },
  { value: "$2.50", label: "From / hour" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Live in minutes",
    description:
      "Pick a configuration, deploy, and get SSH access to a running cluster without a sales call.",
  },
  {
    icon: CreditCard,
    title: "Hourly billing",
    description:
      "Pay for the hours you reserve. No contracts, no minimum spend, no idle capacity to carry.",
  },
  {
    icon: Cpu,
    title: "NVIDIA and AMD",
    description:
      "Hopper, Ampere, and CDNA accelerators side by side, so you can match silicon to workload.",
  },
];

const CONSOLE_LINES = [
  { prompt: true, text: "tensor deploy --gpu h100 --count 8 --hours 72" },
  { text: "Reserving 8x H100 · 640GB HBM3" },
  { text: "Attaching 48 vCPU · 1TB NVMe" },
  { text: "Cluster ready in 94s", accent: true },
  { prompt: true, text: "ssh root@203.0.113.24" },
];

function ConsolePanel() {
  return (
    <div className="max-w-2xl overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1 font-mono text-[11px] text-muted-foreground">
          tensor — deploy
        </span>
      </div>

      <div className="space-y-2 p-5 font-mono text-[12.5px] leading-5 md:p-6">
        {CONSOLE_LINES.map((line) => (
          <p
            key={line.text}
            className={
              line.prompt
                ? "text-foreground"
                : line.accent
                  ? "text-success"
                  : "text-muted-foreground"
            }
          >
            <span className="select-none text-muted-foreground/50">
              {line.prompt ? "$ " : line.accent ? "✓ " : "· "}
            </span>
            {line.text}
          </p>
        ))}
        <p>
          <span className="select-none text-muted-foreground/50">$ </span>
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-foreground/60" />
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />

      <Frame>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]"
          />
          <div className={`relative pb-14 pt-20 md:pb-16 md:pt-28 ${GUTTER}`}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1.5 pr-3">
              <span className="rounded-full bg-secondary px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-secondary-foreground">
                New
              </span>
              <span className="text-xs text-muted-foreground">
                H200 and MI355X clusters
              </span>
            </span>

            <h1 className="text-display mt-7 max-w-[46rem]">
              GPU accelerated infrastructure{" "}
              <span className="text-muted-foreground">
                for training, inference, and scale.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Reserve enterprise-grade NVIDIA and AMD compute by the hour, and
              deploy it in minutes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start building
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#pricing">View pricing</Link>
              </Button>
            </div>

            <div className="mt-16 md:mt-20">
              <ConsolePanel />
            </div>
          </div>
        </section>

        <CellGrid className="grid-cols-2 border-t border-border md:grid-cols-4">
          {STATS.map((stat) => (
            <Cell key={stat.label} className="md:py-8">
              <p className="eyebrow">{stat.label}</p>
              <p className="mt-2 font-mono text-[26px] leading-none tracking-tight">
                {stat.value}
              </p>
            </Cell>
          ))}
        </CellGrid>

        <CellGrid className="border-t border-border md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Cell key={feature.title} className="md:py-12">
              <feature.icon className="size-4 text-muted-foreground" />
              <h2 className="mt-5 text-[15px]">{feature.title}</h2>
              <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Cell>
          ))}
        </CellGrid>

        <section className="border-t border-border">
          <div className={`max-w-xl pb-10 pt-20 md:pt-24 ${GUTTER}`}>
            <p className="eyebrow">Platforms</p>
            <h2 className="text-title mt-4">Choose your accelerator</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Both platforms share the same network, storage, and billing — pick
              the silicon that fits your stack.
            </p>
          </div>

          <CellGrid className="border-t border-border md:grid-cols-2">
            <PlatformCell
              computeProvider="NVIDIA"
              href="/nvidia"
              description="Hopper and Ampere accelerators for LLM training and scale-out inference."
              models={["A100", "H100", "H200"]}
              startingPrice="$3.50"
            />
            <PlatformCell
              computeProvider="AMD"
              href="/amd"
              description="CDNA accelerators with up to 288GB of HBM3E memory per GPU."
              models={["MI250X", "MI300X", "MI325X", "MI355X"]}
              startingPrice="$2.50"
            />
          </CellGrid>
        </section>

        <section id="pricing" className="scroll-mt-14 border-t border-border">
          <div className={`max-w-xl pb-10 pt-20 md:pt-24 ${GUTTER}`}>
            <p className="eyebrow">Pricing</p>
            <h2 className="text-title mt-4">Transparent hourly rates</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Rates shown are for the lowest vCPU and storage configuration.
              Every instance is billed per hour reserved.
            </p>
          </div>

          <PricingTable />
        </section>

        <section className="border-t border-border">
          <div
            className={`flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-end md:py-24 ${GUTTER}`}
          >
            <div className="max-w-sm">
              <h2 className="text-title">Ready to scale up?</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Deploy your first cluster in minutes. Simple setup, no long-term
                commitments.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/signup">
                Start building
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
      </Frame>
    </div>
  );
}
