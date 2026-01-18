"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { Card, CardFooter } from "@/components/ui/card";

type navigationProps = {
  imgResource: string;
  computeProvider: string;
  href: string;
};

export function ProductCard({ imgResource, computeProvider, href }: navigationProps) {
  return (
    <Link href={href} className="w-full md:w-1/2 h-auto">
      <Card
        className="
    group relative
    flex flex-col justify-between
    overflow-hidden

    rounded-2xl border border-border bg-card text-card-foreground shadow-sm
    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
    hover:-translate-y-1 hover:shadow-md
    bg-cover bg-center
  "
        style={{ backgroundImage: `url(${imgResource})` }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-background/55 dark:bg-background/35" />
          <div
            className="absolute inset-0 opacity-[0.10] dark:opacity-[0.14] mix-blend-multiply dark:mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.35) 1px, transparent 1.8px)",
              backgroundSize: "7px 7px",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06] dark:opacity-[0.10]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 6px)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-background/25 via-transparent to-foreground/10 dark:from-background/10 dark:to-foreground/20" />
        </div>

        <div className="relative z-10 p-6">
          <div className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2 backdrop-blur-sm">
            {/* <span className="font-mono text-muted-foreground">$</span> */}
            <h3 className="font-mono text-xl md:text-2xl font-semibold tracking-tight text-center md:text-left">
              Get {computeProvider} Compute
            </h3>
          </div>
        </div>

        <CardFooter className="relative z-10 p-6 pt-0">
          <Button
            size="icon"
            variant="outline"
            className="
        rounded-xl
        bg-background/60 backdrop-blur-sm
        border-border/60
      "
          >
            <ArrowRight className="transition-transform duration-700 group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
