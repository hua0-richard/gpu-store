"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardFooter,
} from "@/components/ui/card";

type navigationProps = {
  imgResource: string;
  computeProvider: string;
};

export function ProductCard({ imgResource, computeProvider }: navigationProps) {
  return (
    <Card
      className="
    group relative
    flex flex-col justify-between
    overflow-hidden
    rounded-2xl border
    shadow-sm transition-all duration-300
    hover:-translate-y-1 hover:shadow-lg

    w-[320px] h-[220px]
    md:w-[380px] md:h-[250px]

    bg-cover bg-center
  "
      style={{ backgroundImage: `url(${imgResource})` }}
    >
      {/* Simple overlay (does NOT block clicks) */}
      <div className="pointer-events-none absolute inset-0 bg-black/50" />

      {/* Title */}
      <div className="relative z-10 p-6">
        <div className="inline-block rounded-lg bg-black/60 px-4 py-2">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            Get {computeProvider} Compute
          </h3>
        </div>
      </div>

      {/* Footer / CTA */}
      <CardFooter className="relative z-10 p-6 pt-0">
        <Button
          size="icon"
          className="rounded-full bg-white/90 text-black hover:bg-white"
        >
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
