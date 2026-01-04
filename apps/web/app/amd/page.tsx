import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useCatalogData } from "../_hooks/useCatalogData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

// app/pricing/page.tsx
export default function PricingPage() {
  const gpus = useCatalogData().gpuData.amd;
  return (
    <div className="flex justify-center items-center w-full px-16">
      <main className="flex max-w-7xl flex-col items-start justify-start bg-white dark:bg-black">
        <div className="w-full">
          <NavigationBar></NavigationBar>
        </div>
        <h1 className="font-semibold text-5xl pb-16">Select GPU</h1>
        <div className="flex flex-wrap gap-8">
          {Object.values(gpus).map((gpu) => (
            <Card key={gpu.name} className="max-w-sm px-8">
              <CardTitle className="font-mono text-xl">{gpu.name}</CardTitle>
              <CardDescription>
                Choose the plan that best fits your needs.
              </CardDescription>
              <CardContent>
                <img src="amd-gpu.png"></img>
                <div className="flex flex-col justify-start">
                  <div>
                    <span className="font-mono font-semibold">
                      Architecture:{" "}
                    </span>
                    {gpu.architecture}
                  </div>
                  <div>
                    <span className="font-mono font-semibold">Memory: </span>
                    {gpu.memory}
                  </div>
                  <div>
                    <span className="font-mono font-semibold">Bandwidth: </span>
                    {gpu.memoryBandwidth}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <ArrowRight></ArrowRight>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Footer></Footer>
      </main>
    </div>
  );
}
