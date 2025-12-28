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

const gpus = [
  {
    gpu: "NVIDIA A100",
    vram: "24 GB",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    gpu: "NVIDIA H100",
    vram: "24 GB",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    gpu: "NVIDIA H200",
    vram: "24 GB",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    gpu: "AMD MI300X",
    vram: "24 GB",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    gpu: "AMD MI325X",
    vram: "24 GB",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    gpu: "AMD MI355X",
    vram: "24 GB",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    gpu: "AMD MI250X",
    vram: "24 GB",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-xl"></TableHead>
          <TableHead className="text-2xl my-8">VRAM</TableHead>
          <TableHead className="text-2xl">vCPU</TableHead>
          <TableHead className="text-2xl">RAM</TableHead>
          <TableHead className="text-2xl">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gpus.map((gpu) => (
          <TableRow key={gpu.gpu} className={`pb-8 ${robotoMono.className}`}>
            <TableCell className="text-2xl font-semibold py-8 w-[200px]">
              {gpu.gpu}
            </TableCell>
            <TableCell>{gpu.vram}</TableCell>
            <TableCell>{gpu.paymentMethod}</TableCell>
            <TableCell>{gpu.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
