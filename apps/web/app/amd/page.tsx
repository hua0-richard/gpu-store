import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useCatalogData } from "../_hooks/useCatalogData";

// app/pricing/page.tsx
export default function PricingPage() {
  const gpus = useCatalogData().gpuData.amd;
  return <div>
    <h1></h1>
    {Object.values(gpus).map((gpu) => (
    <Card key={gpu.name} className="mb-8 w-full max-w-lg">
      <CardTitle>{gpu.name}</CardTitle>
      <CardDescription>
        Choose the plan that best fits your needs.
      </CardDescription>
      <CardContent>
        <img src="amd.png"></img>
        <ul className="space-y-4">
          <li>
            <h3 className="text-lg font-medium">{gpu.architecture}</h3>
            <p className="text-sm text-muted-foreground">$10/month - 100 compute hours</p>
          </li>
          <li>
            <h3 className="text-lg font-medium">Pro Plan</h3>
            <p className="text-sm text-muted-foreground">$30/month - 500 compute hours</p>
          </li>
          <li>
            <h3 className="text-lg font-medium">Enterprise Plan</h3>
            <p className="text-sm text-muted-foreground">Contact us for custom pricing and features</p>
          </li>
        </ul>
      </CardContent>     
    </Card>))}
  </div>
} 
