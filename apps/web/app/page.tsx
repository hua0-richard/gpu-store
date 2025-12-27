import { ModeToggle } from "@/components/theme-toggle";
import { ProductCard } from "@/components/product-card";
import { NavigationMenuDemo } from "@/components/navigation";
import { robotoMono } from "@/app/fonts";
import { Button } from "@/components/ui/button";

import { ShoppingBag } from "lucide-react";
import { TableDemo } from "@/components/table";
import { User } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center font-sans dark:bg-black">
      <main className="flex h-screen w-auto flex-col items-center justify-start bg-white dark:bg-black sm:items-start">

        <div className="flex w-full items-center justify-between py-8 px-16 mb-16">
          <NavigationMenuDemo></NavigationMenuDemo>
          <div className="flex gap-2">
            <ModeToggle></ModeToggle>
            <Button variant="outline"><ShoppingBag></ShoppingBag></Button>
            <Button variant="outline"><User></User></Button>
          </div>
        </div>

        <div className="px-16 mb-16">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground mb-16">
              <span className="font-bold">GPU</span>{" "}
              <span className="italic">Accelerated</span>{" "}
              <span className="font-semibold">
                infrastructure for training, inference, and scale.
              </span>
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400 ${robotoMono.className}`}
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

        <div className="w-full flex justify-start items-center gap-6 mt-10 px-16 pb-16 mb-16">
          <ProductCard computeProvider="NVIDIA" imgResource="nvidia.png"></ProductCard>
          <ProductCard computeProvider="AMD" imgResource="amd.png"></ProductCard>
        </div>

        <div className="w-full flex justify-start items-center px-16 mb-16">
          <h1 className="font-semibold text-5xl">Pricing</h1>
        </div>
        <div className="w-full flex justify-start items-center px-16">
          <TableDemo></TableDemo>
        </div>
      </main>
    </div>
  );
}
