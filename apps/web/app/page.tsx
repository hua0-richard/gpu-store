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
              imgResource="nvidia.png"
              href="/nvidia"
            />
            <ProductCard
              computeProvider="AMD"
              imgResource="amd.png"
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

        <div className="mb-16 w-full bg-secondary md:mb-24">
          <div className="h-full w-full px-4 py-16 md:px-14 md:py-24">
            <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
              <div className="w-full bg-primary px-2 py-2 text-secondary md:w-1/2">
                <h1 className="text-3xl font-semibold md:text-5xl">Get Started Today</h1>
              </div>
              <div className="flex h-full w-full flex-col justify-between pl-0 md:w-1/2 md:pl-8">
                <div className={`pb-8 ${robotoMono.className}`}>
                  GPU compute in minutes. Simple setup. No complexity. No
                  long-term commitments.
                </div>
                <Button
                  className={`
                    group
                    ${robotoMono.className}
                    flex items-center gap-3
                    px-5 py-4
                    transition-all duration-300
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:-translate-y-[1px]
                  `}
                >
                  <span className="transition-opacity duration-300 group-hover:opacity-90">
                    START BUILDING
                  </span>
                  <ArrowRight
                    className="
                      transition-transform duration-300
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:translate-x-1
                    "
                  />
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

