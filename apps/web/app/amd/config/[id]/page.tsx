import { useCatalogData } from "@/app/_hooks/useCatalogData";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function ConfigPage() {
  const gpus = useCatalogData().gpuData.amd;
  return (
    <div className="w-full flex justify-center">
    <div className="max-w-7xl">
      <div className="w-full">
        <NavigationBar></NavigationBar>
      </div>
      <div className="flex justify-center items-center w-full px-16">
        <div className="flex w-3/4 flex-col items-start justify-start bg-white dark:bg-black">
          <h1 className="font-semibold text-5xl pb-16">Select Configuration</h1>
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
                      <span className="font-mono font-semibold">
                        Bandwidth:{" "}
                      </span>
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
        </div>
        <div className="h-screen w-1/4 flex flex-col justify-start items-center">
          <div>Your Selection</div>
        </div>
      </div>
    </div>
    </div>
  );
}
