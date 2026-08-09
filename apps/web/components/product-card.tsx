import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CELL } from "@/components/layout";
import { cn } from "@/lib/utils";

type PlatformCellProps = {
  computeProvider: "NVIDIA" | "AMD";
  href: string;
  description: string;
  models: string[];
  startingPrice: string;
};

export function PlatformCell({
  computeProvider,
  href,
  description,
  models,
  startingPrice,
}: PlatformCellProps) {
  return (
    <Link
      href={href}
      className={cn(
        CELL,
        "group flex flex-col justify-between gap-12 transition-colors hover:bg-card md:py-12",
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg tracking-[-0.025em]">{computeProvider}</h3>
          <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
        <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {models.map((model) => (
            <span
              key={model}
              className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {model}
            </span>
          ))}
        </div>
        <p className="text-[13px] text-muted-foreground">
          From{" "}
          <span className="font-mono text-foreground">{startingPrice}</span> per
          hour
        </p>
      </div>
    </Link>
  );
}
