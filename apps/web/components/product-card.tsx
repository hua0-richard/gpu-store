"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type ProductCardProps = {
  computeProvider: "NVIDIA" | "AMD";
  href: string;
};

export function ProductCard({
  computeProvider,
  href,
}: ProductCardProps) {
  return (
    <Link href={href} className="group relative w-full md:w-1/2">
      <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-white/20 dark:hover:shadow-white/5">

        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60">
          {/* Dot Grid Pattern - Dual Mode */}
          <div
            className="absolute inset-0 bg-[radial-gradient(#00000040_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff40_1px,transparent_1px)]"
            style={{ backgroundSize: '24px 24px' }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-zinc-950/80" />
        </div>

        {/* Brand/Product Highlight Glow */}
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-zinc-900/5 blur-3xl transition-all duration-700 group-hover:bg-zinc-900/10 dark:bg-white/5 dark:group-hover:bg-white/10"
        />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-10">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-600 backdrop-blur-md transition-colors group-hover:bg-zinc-100 group-hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:group-hover:bg-white/10 dark:group-hover:text-white">
                {computeProvider} Series
              </div>
              <div>
                <h3 className="font-sans text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {computeProvider}
                </h3>
                <span className="text-lg font-light text-zinc-500 dark:text-zinc-400">Infrastructure</span>
              </div>
            </div>

            <Button
              size="icon"
              className="h-14 w-14 rounded-full border border-black/10 bg-black/5 text-black backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-black hover:text-white group-hover:rotate-[-45deg] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Footer / Description */}
          <div className="space-y-4">
            <p className="max-w-[90%] text-lg font-light leading-relaxed text-zinc-600 group-hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:group-hover:text-zinc-300">
              Deploy high-performance {computeProvider} clusters for LLM training and scale-out inference.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
