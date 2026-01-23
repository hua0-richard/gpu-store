"use client"
import { ProductCard } from "@/components/product-card";
import { robotoMono } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { TableDemo } from "@/components/table";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-start bg-white px-4 dark:bg-black sm:items-start md:px-8">
        <div className="w-full mb-16 md:mb-24">
          <NavigationBar />
        </div>

        <div className="w-full mb-16 md:mb-24">
          <div className="max-w-7xl">
            <h1 className="mb-8 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:mb-12 md:text-7xl">
              <span className="font-bold">GPU</span>{" "}
              <span className="italic">Accelerated</span>{" "}
              <span className="font-semibold">
                infrastructure for training, inference, and scale.
              </span>
            </h1>
            <p
              className={`mb-12 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400 md:mb-16 ${robotoMono.className}`}
            >
              Accelerate{" "}
              <span className="font-medium text-foreground">
                AI development and deployment
              </span>{" "}
              with{" "}
              <span className="font-medium text-foreground">
                enterprise-grade GPU compute
              </span>
              .
            </p>

            <p
              className={`mt-4 text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 ${robotoMono.className}`}
            >
              Available across{" "}
              <span className="font-semibold text-foreground">NVIDIA</span> and{" "}
              <span className="font-semibold text-foreground">AMD</span>{" "}
              workstation platforms
            </p>
          </div>
        </div>

        <div className="w-full mb-16 md:mb-24">
          <div className="flex flex-col gap-6 md:flex-row">
            <ProductCard
              computeProvider="NVIDIA"
              href="/nvidia"
            />
            <ProductCard
              computeProvider="AMD"
              href="/amd"
            />
          </div>
        </div>

        <div className="mb-16 w-full md:mb-24">
          <h1 className="text-5xl font-semibold">Pricing</h1>
        </div>

        <div className="mb-16 w-full overflow-x-auto md:mb-24">
          <div className="min-w-max">
            <TableDemo />
          </div>
        </div>

        <div className="mb-16 w-full md:mb-24">
          <div className="relative overflow-hidden px-6 py-16 md:px-16 md:py-24">
            {/* Background Abstract Pattern - Subtle & Blended */}
            <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-1000 dark:opacity-0" />

            {/* Simple Divider Line Top/Bottom to define section slightly without box */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-white/10" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-white/10" />

            <div className="relative z-10 flex w-full flex-col items-start justify-between gap-12 md:flex-row md:items-center md:gap-0">
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-6xl">
                  Ready to <br className="hidden md:block" />
                  <span className="text-zinc-400 dark:text-zinc-500">Scale Up?</span>
                </h2>
              </div>

              <div className="flex w-full flex-col items-start justify-end gap-8 md:w-1/2 md:items-end">
                <p className={`max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-right ${robotoMono.className}`}>
                  Deploy enterprise-grade GPU compute in minutes.
                  Simple setup. No complexity. No long-term commitments.
                </p>

                <Button
                  className={`
                    group
                    relative overflow-hidden
                    rounded-full
                    bg-zinc-900 text-white
                    px-8 py-6
                    text-lg font-medium
                    transition-all duration-300
                    hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-500/10
                    dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:hover:shadow-white/10
                    ${robotoMono.className}
                  `}
                >
                  <span className="flex items-center gap-3">
                    START BUILDING
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Footer />
        </div>
      </main>
    </div>
  );
}

