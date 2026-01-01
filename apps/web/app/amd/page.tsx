import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useCatalogData } from "../_hooks/useCatalogData";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";

// app/pricing/page.tsx
export default function PricingPage() {
  const gpus = useCatalogData().gpuData.amd;
  return <div className="flex justify-center items-center w-full px-16">
    <main className="flex max-w-7xl flex-col items-start justify-start bg-white dark:bg-black">
      <div>
        <Navigation></Navigation>
      </div>
      <h1 className="py-16 text-7xl">Select GPU</h1>
      <div className="flex flex-wrap gap-8">
        {Object.values(gpus).map((gpu) => (
        <Card key={gpu.name} className="max-w-lg px-8">
          <CardTitle className="font-mono text-xl">{gpu.name}</CardTitle>
          <CardDescription>
            Choose the plan that best fits your needs.
          </CardDescription>
          <CardContent>
            <img src="amd-gpu.png"></img>
            <div className="flex flex-col justify-start">
              <div>
                <span className="font-mono font-semibold">Architecture: </span>{gpu.architecture}
              </div>
              <div>
                <span className="font-mono font-semibold">Memory: </span>{gpu.memory}
              </div>
              <div>
                <span className="font-mono font-semibold">Bandwidth: </span>{gpu.memoryBandwidth}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button><ArrowRight></ArrowRight></Button>
          </CardFooter>     
        </Card>))}
      </div>
      <Footer></Footer>
    </main>
  </div>
} 
