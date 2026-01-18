import { robotoMono } from "@/app/fonts";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableDemo() {
  const gpus = [
    {
      model: "NVIDIA A100",
      vram: "80GB HBM2e",
      architecture: "Ampere",
      price: "$3.50",
    },
    {
      model: "NVIDIA H100",
      vram: "80GB HBM3",
      architecture: "Hopper",
      price: "$4.75",
    },
    {
      model: "NVIDIA H200",
      vram: "141GB HBM3e",
      architecture: "Hopper",
      price: "$5.50",
    },
    {
      model: "AMD MI250X",
      vram: "128GB HBM3",
      architecture: "CDNA3",
      price: "$2.50",
    },
    {
      model: "AMD MI300X",
      vram: "192GB HBM3",
      architecture: "CDNA3",
      price: "$3.75",
    },
    {
      model: "AMD MI325X",
      vram: "256GB HBM3E",
      architecture: "CDNA3",
      price: "$4.50",
    },
    {
      model: "AMD MI355X",
      vram: "288GB HBM3E",
      architecture: "CDNA4",
      price: "$6.00",
    },
  ];

  return (
    <Table>
      <TableCaption className="text-left mt-4 text-muted-foreground">
        * Prices shown are for the lowest vCPU and storage configuration.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-xl font-semibold">Model</TableHead>
          <TableHead className="text-xl">VRAM</TableHead>
          <TableHead className="text-xl">Architecture</TableHead>
          <TableHead className="text-xl text-right">Hourly Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gpus.map((gpu) => (
          <TableRow key={gpu.model} className={`pb-8 ${robotoMono.className}`}>
            <TableCell className="text-xl font-medium py-6">
              {gpu.model}
            </TableCell>
            <TableCell className="text-lg text-muted-foreground">{gpu.vram}</TableCell>
            <TableCell className="text-lg text-muted-foreground">{gpu.architecture}</TableCell>
            <TableCell className="text-lg font-semibold text-right">{gpu.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
