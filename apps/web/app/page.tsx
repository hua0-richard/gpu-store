import { ProductCard } from "@/components/product-card";
import { robotoMono } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { TableDemo } from "@/components/table";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center font-sans dark:bg-black">
      <main className="flex h-screen max-w-7xl flex-col items-center justify-start bg-white dark:bg-black sm:items-start">
        <NavigationBar></NavigationBar>
        
        <div className="mb-16">
          <div className="max-w-7xl">
            <h1 className="text-7xl font-semibold tracking-tight leading-[1.05] text-foreground mb-16">
              <span className="font-bold">GPU</span>{" "}
              <span className="italic">Accelerated</span>{" "}
              <span className="font-semibold">
                infrastructure for training, inference, and scale.
              </span>
            </h1>
            <p
              className={`max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400 mb-16 ${robotoMono.className}`}
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

        <div className="w-full flex justify-start items-center gap-6 mt-10 pb-16 mb-16">
          <ProductCard
            computeProvider="NVIDIA"
            imgResource="nvidia.png"
          ></ProductCard>
          <ProductCard
            computeProvider="AMD"
            imgResource="amd.png"
          ></ProductCard>
        </div>

        <div className="w-full flex justify-start items-center mb-16">
          <h1 className="font-semibold text-5xl">Pricing</h1>
        </div>

        <div className="w-full flex justify-start items-center mb-16">
          <TableDemo></TableDemo>
        </div>

        <div className="w-full px-14 flex justify-start items-center bg-secondary mb-16">
          <div className="w-full h-full py-24">
            <div className="w-1/2 flex flex-row items-center justify-between w-full">
              <div className="px-2 py-2 bg-primary text-secondary w-auto">
                <h1 className="font-semibold text-5xl">Get Started Today</h1>
              </div>
              <div className="w-1/2 flex-col space-between h-full">
                <div className={`pb-8 ${robotoMono.className}`}>
                  GPU compute in minutes. Simple setup. No complexity. No
                  long-term commitments.
                </div>
                <Button
                  className={`
                    group
                    ${robotoMono.className}
                    px-5 py-4
                    flex items-center gap-3
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
        <Footer></Footer>
      </main>
    </div>
  );
}
